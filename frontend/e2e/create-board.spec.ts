import { test, expect } from '@playwright/test'
import path from 'path'
import { BoardsPage } from './pages'

import { fileURLToPath } from 'url'

// @ts-ignore
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const authFile = path.join(__dirname, '.auth/user.json')

const mockCreateBoardResponse = {
  _id: 'mock-board-id-123',
  title: 'Test Board',
  description: 'Test Description',
  type: 'public',
  slug: 'test-board',
  columnOrderIds: [],
  createdAt: new Date().toISOString(),
  updatedAt: null
}

test.describe('Create Board', () => {
  test.use({ storageState: authFile })

  test.beforeEach(async ({ page }) => {
    await page.route('**/v1/boards', async (route) => {
      if (route.request().method() === 'POST') {
        const requestBody = route.request().postDataJSON()
        
        if (!requestBody?.title) {
          await route.fulfill({
            status: 422,
            contentType: 'application/json',
            body: JSON.stringify({ detail: "Validation error" })
          })
          return
        }

        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({
            ...mockCreateBoardResponse,
            title: requestBody.title,
            description: requestBody.description || '',
            type: requestBody.boardType || 'public'
          })
        })
        return
      }
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({
          boardData: [],
          metadata: [{ totalCount: 0 }]
        })
      })
    })
  })

  test('should open create board modal when clicking Create New Board button', async ({ page }) => {
    const boardsPage = new BoardsPage(page)
    await boardsPage.goto()
    await boardsPage.waitForBoardsLoaded()

    await boardsPage.openCreateModal()
    await expect(boardsPage.createModal).toBeVisible()
    await expect(boardsPage.modalTitleInput).toBeVisible()
    await expect(boardsPage.modalDescriptionInput).toBeVisible()
    await expect(boardsPage.modalPublicRadio).toBeVisible()
    await expect(boardsPage.modalPrivateRadio).toBeVisible()
  })

  test('should close modal when clicking Cancel button', async ({ page }) => {
    const boardsPage = new BoardsPage(page)
    await boardsPage.goto()
    await boardsPage.waitForBoardsLoaded()

    await boardsPage.openCreateModal()
    await boardsPage.closeCreateModal()
    await expect(boardsPage.createModal).not.toBeVisible()
  })

  test('should create board with required fields only (title)', async ({ page }) => {
    const boardsPage = new BoardsPage(page)
    await boardsPage.goto()
    await boardsPage.waitForBoardsLoaded()

    await boardsPage.openCreateModal()
    await boardsPage.createBoard('My New Board')
    
    await expect(boardsPage.createModal).not.toBeVisible()
  })

  test('should create board with title and description', async ({ page }) => {
    const boardsPage = new BoardsPage(page)
    await boardsPage.goto()
    await boardsPage.waitForBoardsLoaded()

    await boardsPage.openCreateModal()
    await boardsPage.createBoard('My New Board', {
      description: 'This is a test board description'
    })
    
    await expect(boardsPage.createModal).not.toBeVisible()
  })

  test('should create private board when selecting private radio', async ({ page }) => {
    const boardsPage = new BoardsPage(page)
    await boardsPage.goto()
    await boardsPage.waitForBoardsLoaded()

    await boardsPage.openCreateModal()
    await boardsPage.createBoard('Private Board', {
      type: 'private'
    })
    
    await expect(boardsPage.createModal).not.toBeVisible()
  })

  test('should show validation error when title is empty', async ({ page }) => {
    const boardsPage = new BoardsPage(page)
    await boardsPage.goto()
    await boardsPage.waitForBoardsLoaded()

    await boardsPage.openCreateModal()
    await boardsPage.modalCreateButton.click()
    
    await expect(boardsPage.modalTitleInput).toBeVisible()
    const errorText = await page.getByText('Board title is required.')
    await expect(errorText).toBeVisible()
  })

  test('should show validation error when title is too short', async ({ page }) => {
    const boardsPage = new BoardsPage(page)
    await boardsPage.goto()
    await boardsPage.waitForBoardsLoaded()

    await boardsPage.openCreateModal()
    await boardsPage.modalTitleInput.fill('AB')
    await boardsPage.modalCreateButton.click()
    
    const errorText = await page.getByText('Min length is 3 characters')
    await expect(errorText).toBeVisible()
  })
})

test.describe('Create Board - API Mocking', () => {
  test.use({ storageState: authFile })

  test('should display created board after successful creation', async ({ page }) => {
    let capturedRequestBody: any = null

    await page.route('**/v1/boards', async (route) => {
      if (route.request().method() === 'POST') {
        capturedRequestBody = route.request().postDataJSON()
        
        await route.fulfill({
          status: 201,
          contentType: 'application/json',
          body: JSON.stringify({
            ...mockCreateBoardResponse,
            _id: `board-${Date.now()}`,
            title: capturedRequestBody.title,
            description: capturedRequestBody.description || '',
            type: capturedRequestBody.boardType || 'public'
          })
        })
        return
      }
      
      if (route.request().method() === 'GET') {
        const url = new URL(route.request().url())
        const pageParam = url.searchParams.get('page')
        
        if (pageParam === '2') {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              boardData: [],
              metadata: [{ totalCount: 1 }]
            })
          })
        } else {
          await route.fulfill({
            status: 200,
            contentType: 'application/json',
            body: JSON.stringify({
              boardData: [capturedRequestBody ? {
                _id: `board-${Date.now()}`,
                title: capturedRequestBody.title
              } : []],
              metadata: [{ totalCount: 1 }]
            })
          })
        }
        return
      }

      await route.continue()
    })

    const boardsPage = new BoardsPage(page)
    await boardsPage.goto()
    await boardsPage.waitForBoardsLoaded()

    await boardsPage.openCreateModal()
    await boardsPage.createBoard('API Test Board', {
      description: 'Testing API response'
    })

    await page.waitForTimeout(500)
    await expect(boardsPage.getBoardByTitle('API Test Board')).toBeVisible()
  })
})

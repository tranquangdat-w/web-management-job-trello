import { test, expect } from '@playwright/test'
import path from 'path'
import { BoardsPage } from './pages'

import { fileURLToPath } from 'url'

// @ts-ignore
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const authFile = path.join(__dirname, '.auth/user.json')

const generateBoards = (start: number, count: number) =>
  Array.from({ length: count }, (_, i) => ({
    _id: `board-${start + i}`,
    title: `Board ${String.fromCharCode(65 + ((start + i - 1) % 26))}${(start + i) > 26 ? Math.ceil((start + i) / 26) : ''}`
  }))

const mockBoardsPage1 = {
  boardData: generateBoards(1, 12),
  metadata: [{ totalCount: 24 }]
}

const mockBoardsPage2 = {
  boardData: generateBoards(13, 12),
  metadata: [{ totalCount: 24 }]
}

test.describe('Boards Page', () => {
  test.use({ storageState: authFile })

  test.beforeEach(async ({ page }) => {
    await page.route('**/v1/boards*', async (route) => {
      const url = new URL(route.request().url())
      const pageParam = url.searchParams.get('page')

      if (pageParam === '2') {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockBoardsPage2) })
      } else {
        await route.fulfill({ status: 200, contentType: 'application/json', body: JSON.stringify(mockBoardsPage1) })
      }
    })
  })

  test('should display boards list on page 1', async ({ page }) => {
    const boardsPage = new BoardsPage(page)
    await boardsPage.goto()

    await expect(boardsPage.getBoardByTitle('Board A')).toBeVisible()
    await expect(boardsPage.getBoardByTitle('Board B')).toBeVisible()
    await expect(boardsPage.getBoardByTitle('Board G')).toBeVisible()
    await expect(boardsPage.getBoardByTitle('Board Z')).not.toBeVisible()
  })

  test('should display pagination when there are multiple pages', async ({ page }) => {
    const boardsPage = new BoardsPage(page)
    await boardsPage.goto()

    await expect(boardsPage.pagination).toBeVisible()
    await expect(boardsPage.pagination).toContainText('1')
    await expect(boardsPage.pagination).toContainText('2')
  })

  test('should navigate to page 2 when clicking page 2', async ({ page }) => {
    const boardsPage = new BoardsPage(page)
    await boardsPage.goto()

    await boardsPage.clickPage(2)

    await page.waitForURL(/\/boards\?page=2/)
    //TODO fix this noob
    await expect(boardsPage.getBoardByTitle('Board A')).toBeVisible()
    await expect(boardsPage.getBoardByTitle('Board N')).toBeVisible()
    await expect(boardsPage.getBoardByTitle('Board O')).toBeVisible()
  })

  test('should navigate to board detail when clicking a board', async ({ page }) => {
    const boardsPage = new BoardsPage(page)
    await boardsPage.goto()

    await boardsPage.getBoardByTitle('Board A').click()

    await page.waitForURL(/\/boards\/board-1/)
  })

  test('should display create board button', async ({ page }) => {
    const boardsPage = new BoardsPage(page)
    await boardsPage.goto()

    await expect(boardsPage.createBoardButton).toBeVisible()
    await expect(boardsPage.createBoardButton).toHaveText('Create New Board')
  })

  test('should display empty state when no boards', async ({ page }) => {
    await page.route('**/v1/boards*', async (route) => {
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify({ boardData: [], metadata: [{ totalCount: 0 }] })
      })
    })

    const boardsPage = new BoardsPage(page)
    await boardsPage.goto()

    await expect(boardsPage.emptyState).toBeVisible()
    await expect(boardsPage.emptyState).toContainText('Not found any board')
  })

  test('should display loading state initially', async ({ page }) => {
    let requestCount = 0
    await page.route('**/v1/boards*', async (route) => {
      requestCount++
      if (requestCount === 1) {
        await new Promise(resolve => setTimeout(resolve, 100))
      }
      await route.fulfill({
        status: 200,
        contentType: 'application/json',
        body: JSON.stringify(mockBoardsPage1)
      })
    })

    const boardsPage = new BoardsPage(page)
    await boardsPage.goto()

    await expect(boardsPage.loadingState).toBeVisible()
    await expect(boardsPage.loadingState).toContainText('Loading page')
  })
})

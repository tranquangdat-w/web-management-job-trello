import { test, expect } from '@playwright/test'
import path from 'path'
import { BoardsPage, AdminUsersPage, NotFoundPage } from './pages'

import { fileURLToPath } from 'url'

// @ts-ignore
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const authFile = path.join(__dirname, '.auth/user.json')

test.describe('User', () => {
  test.use({ storageState: authFile })

  test('should access boards page', async ({ page }) => {
    const boardsPage = new BoardsPage(page)
    await boardsPage.goto()
    await expect(page).toHaveURL(/\/boards/)
  })

  test('should NOT see admin button in app bar', async ({ page }) => {
    const boardsPage = new BoardsPage(page)
    await boardsPage.goto()
    await expect(boardsPage.adminButton).not.toBeVisible()
  })

  test('should see 404 when accessing admin panel', async ({ page }) => {
    const adminUsersPage = new AdminUsersPage(page)
    const notFoundPage = new NotFoundPage(page)
    await adminUsersPage.goto()
    await expect(notFoundPage.heading).toBeVisible()
  })
})

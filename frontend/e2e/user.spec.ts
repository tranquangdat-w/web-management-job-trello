import { test, expect } from '@playwright/test'
import path from 'path'

const authFile = path.join(__dirname, '.auth/user.json')

test.use({ storageState: authFile })

test.describe('User', () => {
  test('should access boards page', async ({ page }) => {
    await page.goto('/boards')
    await expect(page).toHaveURL(/\/boards/)
  })

  test('should NOT see admin button in app bar', async ({ page }) => {
    await page.goto('/boards')
    await expect(page.getByRole('button', { name: /Admin/i })).not.toBeVisible()
  })

  test('should see 404 when accessing admin panel', async ({ page }) => {
    await page.goto('/admin/users')
    await expect(page.getByText('404 NOT FOUND')).toBeVisible()
  })
})

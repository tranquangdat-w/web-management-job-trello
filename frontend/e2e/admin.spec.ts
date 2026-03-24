import { test, expect } from '@playwright/test'
import path from 'path'

const authFile = path.join(__dirname, '.auth/admin.json')

test.use({ storageState: authFile })

test.describe('Admin', () => {
  test('should access admin panel', async ({ page }) => {
    await page.goto('/admin/users')
    await expect(page).toHaveURL(/\/admin\/users/)
  })

  test('should see admin button in app bar', async ({ page }) => {
    await page.goto('/boards')
    await expect(page.getByRole('button', { name: /Admin/i })).toBeVisible()
  })
})

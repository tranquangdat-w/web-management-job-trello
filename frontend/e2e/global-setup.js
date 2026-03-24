import { test as setup, expect } from '@playwright/test'

const BASE_URL = 'http://localhost:5173'

setup('authenticate as admin', async ({ page }) => {
  await page.goto(`${BASE_URL}/login`)
  await page.getByPlaceholder('Enter email').fill('admin')
  await page.getByPlaceholder('Enter password').fill('Admin@1234')
  await page.getByRole('button', { name: 'Log In' }).click()
  await page.waitForURL(/\/boards/, { timeout: 10000 })
  await page.context().storageState({ path: './e2e/.auth/admin.json' })
})

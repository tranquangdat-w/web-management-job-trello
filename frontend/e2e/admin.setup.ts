import { test as setup } from '@playwright/test'
import path from 'path'

const BASE_URL = 'http://localhost:5173'

// TODO: Update these credentials before running tests
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = 'Admin@1234'

const authFile = path.join(__dirname, '.auth/admin.json')

setup('authenticate as admin', async ({ page }) => {
  await page.goto(`${BASE_URL}/login`)
  await page.getByPlaceholder('Enter email').fill(ADMIN_USERNAME)
  await page.getByPlaceholder('Enter password').fill(ADMIN_PASSWORD)
  await page.getByRole('button', { name: 'Log In' }).click()
  await page.waitForURL(/\/boards/, { timeout: 15000 })
  await page.context().storageState({ path: authFile })
})

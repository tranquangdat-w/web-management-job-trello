import { test as setup } from '@playwright/test'
import path from 'path'

const BASE_URL = 'http://localhost:5173'

// TODO: Update these credentials before running tests
const USER_USERNAME = 'user'
const USER_PASSWORD = 'User@1234'

const authFile = path.join(__dirname, '.auth/user.json')

setup('authenticate as user', async ({ page }) => {
  await page.goto(`${BASE_URL}/login`)
  await page.getByPlaceholder('Enter email').fill(USER_USERNAME)
  await page.getByPlaceholder('Enter password').fill(USER_PASSWORD)
  await page.getByRole('button', { name: 'Log In' }).click()
  await page.waitForURL(/\/boards/, { timeout: 15000 })
  await page.context().storageState({ path: authFile })
})

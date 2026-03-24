import { test as setup } from '@playwright/test'
import path from 'path'
import { LoginPage } from './pages'

import { fileURLToPath } from 'url'

// @ts-ignore
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const adminAuthFile = path.join(__dirname, '.auth/admin.json')
const userAuthFile = path.join(__dirname, '.auth/user.json')

// TODO: Update these credentials before running tests
const ADMIN_USERNAME = 'admin'
const ADMIN_PASSWORD = '12345678a*'

const USER_USERNAME = 'user'
const USER_PASSWORD = '12345678a*'

setup('authenticate as admin', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login(ADMIN_USERNAME, ADMIN_PASSWORD)
  await loginPage.waitForRedirectToBoards()
  await page.context().storageState({ path: adminAuthFile })
})

setup('authenticate as user', async ({ page }) => {
  const loginPage = new LoginPage(page)
  await loginPage.goto()
  await loginPage.login(USER_USERNAME, USER_PASSWORD)
  await loginPage.waitForRedirectToBoards()
  await page.context().storageState({ path: userAuthFile })
})

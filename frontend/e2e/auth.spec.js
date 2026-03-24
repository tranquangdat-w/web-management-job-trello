import { test, expect } from '@playwright/test'
import { LoginPage, RegisterPage } from './pages'

const VALID_PASSWORD = 'Test@1234'

test.describe('Authentication', () => {
  test.describe('Register', () => {
    test.beforeEach(async ({ page }) => {
      const registerPage = new RegisterPage(page)
      await registerPage.goto()
    })

    test('should display register form with all required fields', async ({ page }) => {
      const registerPage = new RegisterPage(page)
      await expect(registerPage.title).toBeVisible()
      await expect(registerPage.usernameInput).toBeVisible()
      await expect(registerPage.emailInput).toBeVisible()
      await expect(registerPage.passwordInput).toBeVisible()
      await expect(registerPage.confirmPasswordInput).toBeVisible()
      await expect(registerPage.continueButton).toBeVisible()
    })

    test('should show validation errors for empty fields', async ({ page }) => {
      const registerPage = new RegisterPage(page)
      await registerPage.continueButton.click()
      await expect(page.locator('text=This field is required')).toHaveCount(4)
    })

    test('should show email validation error for invalid email', async ({ page }) => {
      const registerPage = new RegisterPage(page)
      await registerPage.usernameInput.fill('testuser')
      await registerPage.emailInput.fill('invalidemail')
      await registerPage.continueButton.click()
      await expect(page.locator('text=Email is invalid')).toBeVisible()
    })

    test('should show password validation error for weak password', async ({ page }) => {
      const registerPage = new RegisterPage(page)
      await registerPage.usernameInput.fill('testuser')
      await registerPage.emailInput.fill('test@test.com')
      await registerPage.passwordInput.fill('weak')
      await registerPage.continueButton.click()
      await expect(page.locator('text=Password must have at least 8 characters including letters and numbers, special symbols')).toBeVisible()
    })

    test('should show password mismatch error', async ({ page }) => {
      const registerPage = new RegisterPage(page)
      await registerPage.register('testuser', 'test@test.com', VALID_PASSWORD, 'Different@123')
      await expect(page.locator('text=Passwords do not match')).toBeVisible()
    })

    test('should show password validation error for password without special chars', async ({ page }) => {
      const registerPage = new RegisterPage(page)
      await registerPage.usernameInput.fill('testuser')
      await registerPage.emailInput.fill('test@test.com')
      await registerPage.passwordInput.fill('Test1234') // No special chars
      await registerPage.continueButton.click()
      await expect(page.locator('text=Password must have at least 8 characters including letters and numbers, special symbols')).toBeVisible()
    })
  })

  test.describe('Login', () => {
    test.beforeEach(async ({ page }) => {
      const loginPage = new LoginPage(page)
      await loginPage.goto()
    })

    test('should display login form with all required fields', async ({ page }) => {
      const loginPage = new LoginPage(page)
      await expect(loginPage.title).toBeVisible()
      await expect(loginPage.usernameInput).toBeVisible()
      await expect(loginPage.passwordInput).toBeVisible()
      await expect(loginPage.loginButton).toBeVisible()
    })

    test('should show validation errors for empty fields', async ({ page }) => {
      const loginPage = new LoginPage(page)
      await loginPage.loginButton.click()
      await expect(page.locator('text=This field is required')).toHaveCount(2)
    })
  })

  test.describe('Navigation', () => {
    test('should navigate from login to register', async ({ page }) => {
      const loginPage = new LoginPage(page)
      await loginPage.goto()
      await loginPage.clickSignUp()
      await expect(page).toHaveURL(/\/register/)
    })

    test('should navigate from register to login', async ({ page }) => {
      const registerPage = new RegisterPage(page)
      await registerPage.goto()
      await registerPage.clickAlreadyHaveAccount()
      await expect(page).toHaveURL(/\/login/)
    })

    test('should have working cant login link', async ({ page }) => {
      const loginPage = new LoginPage(page)
      await loginPage.goto()
      await expect(loginPage.cantLoginLink).toBeVisible()
    })
  })
})

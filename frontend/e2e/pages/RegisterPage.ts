import { Page, Locator } from '@playwright/test'

export class RegisterPage {
  readonly page: Page

  readonly usernameInput: Locator
  readonly emailInput: Locator
  readonly passwordInput: Locator
  readonly confirmPasswordInput: Locator
  readonly continueButton: Locator
  readonly alreadyHaveAccountLink: Locator
  readonly title: Locator
  readonly successMessage: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.getByPlaceholder('Enter username')
    this.emailInput = page.getByPlaceholder('Enter email')
    this.passwordInput = page.getByPlaceholder('Enter password', { exact: true })
    this.confirmPasswordInput = page.getByPlaceholder('Re-enter password')
    this.continueButton = page.getByRole('button', { name: 'Continue' })
    this.alreadyHaveAccountLink = page.getByText('Already have an account? Log In')
    this.title = page.getByText('Sign up for your account')
    this.successMessage = page.locator('[role="status"]')
    this.errorMessage = page.locator('[role="alert"]')
  }

  async goto() {
    await this.page.goto('/register')
  }

  async register(username: string, email: string, password: string, confirmPassword?: string) {
    await this.usernameInput.fill(username)
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.confirmPasswordInput.fill(confirmPassword || password)
    await this.continueButton.click()
  }

  async clickAlreadyHaveAccount() {
    await this.alreadyHaveAccountLink.click()
  }

  async isVisible(): Promise<boolean> {
    return this.title.isVisible()
  }

  async waitForRedirectToLogin() {
    await this.page.waitForURL(/\/login/, { timeout: 10000 })
  }

  async getSuccessMessage(): Promise<string> {
    return this.successMessage.textContent() ?? ''
  }
}
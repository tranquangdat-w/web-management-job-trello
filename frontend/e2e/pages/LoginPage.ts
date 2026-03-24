import { Page, Locator } from '@playwright/test'

export class LoginPage {
  readonly page: Page
  readonly url = '/login'

  readonly usernameInput: Locator
  readonly passwordInput: Locator
  readonly loginButton: Locator
  readonly signUpLink: Locator
  readonly cantLoginLink: Locator
  readonly title: Locator
  readonly errorMessage: Locator

  constructor(page: Page) {
    this.page = page
    this.usernameInput = page.getByPlaceholder('Enter email')
    this.passwordInput = page.getByPlaceholder('Enter password')
    this.loginButton = page.getByRole('button', { name: 'Log In' })
    this.signUpLink = page.getByText('Sign up for an account')
    this.cantLoginLink = page.getByText('Can\'t log in?')
    this.title = page.getByText('Log in to continue')
    this.errorMessage = page.locator('[role="alert"]')
  }

  async goto() {
    await this.page.goto(this.url)
  }

  async login(username: string, password: string) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }

  async clickSignUp() {
    await this.signUpLink.click()
  }

  async getErrorMessage(): Promise<string> {
    return this.errorMessage.textContent() ?? ''
  }

  async waitForRedirectToBoards() {
    await this.page.waitForURL(/\/boards/, { timeout: 10000 })
  }
}
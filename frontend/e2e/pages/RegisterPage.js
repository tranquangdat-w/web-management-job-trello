export class RegisterPage {
  constructor(page) {
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

  async register(username, email, password, confirmPassword) {
    await this.usernameInput.fill(username)
    await this.emailInput.fill(email)
    await this.passwordInput.fill(password)
    await this.confirmPasswordInput.fill(confirmPassword || password)
    await this.continueButton.click()
  }

  async clickAlreadyHaveAccount() {
    await this.alreadyHaveAccountLink.click()
  }

  async isVisible() {
    return this.title.isVisible()
  }

  async waitForRedirectToLogin() {
    await this.page.waitForURL(/\/login/, { timeout: 10000 })
  }

  async getSuccessMessage() {
    return this.successMessage.textContent()
  }
}

export class LoginPage {
  constructor(page) {
    this.page = page
    this.url = '/login'

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

  async login(username, password) {
    await this.usernameInput.fill(username)
    await this.passwordInput.fill(password)
    await this.loginButton.click()
  }

  async clickSignUp() {
    await this.signUpLink.click()
  }

  async getErrorMessage() {
    return this.errorMessage.textContent()
  }

  async isVisible() {
    return this.title.isVisible()
  }

  async waitForRedirectToBoards() {
    await this.page.waitForURL(/\/boards/, { timeout: 10000 })
  }
}

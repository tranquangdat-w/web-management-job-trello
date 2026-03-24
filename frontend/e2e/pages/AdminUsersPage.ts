import { Page, Locator } from '@playwright/test'

export class AdminUsersPage {
  readonly page: Page
  readonly url = '/admin/users'

  readonly heading: Locator
  readonly searchInput: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole('heading', { level: 4, name: 'User Management' })
    this.searchInput = page.getByPlaceholder('Search by username or email...')
  }

  async goto() {
    await this.page.goto(this.url)
  }
}

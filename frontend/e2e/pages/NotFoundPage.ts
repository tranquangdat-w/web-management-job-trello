import { Page, Locator } from '@playwright/test'

export class NotFoundPage {
  readonly page: Page
  
  readonly heading: Locator
  readonly subHeading: Locator
  readonly message: Locator
  readonly goHomeButton: Locator

  constructor(page: Page) {
    this.page = page
    this.heading = page.getByRole('heading', { level: 1, name: '404 NOT FOUND' })
    this.subHeading = page.getByRole('heading', { level: 4, name: 'Page Not Found' })
    this.message = page.getByText("We can't find the page you're looking for.")
    this.goHomeButton = page.getByRole('button', { name: 'Go to Trello Home' })
  }

  async isVisible(): Promise<boolean> {
    return this.heading.isVisible()
  }

  async clickHome() {
    await this.goHomeButton.click()
  }
}

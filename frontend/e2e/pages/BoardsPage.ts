import { Page, Locator, expect } from '@playwright/test'

export class BoardsPage {
  readonly page: Page
  readonly url = '/boards'

  readonly adminButton: Locator
  readonly createBoardButton: Locator
  readonly pagination: Locator
  readonly emptyState: Locator
  readonly loadingState: Locator
  readonly createModal: Locator
  readonly modalTitleInput: Locator
  readonly modalDescriptionInput: Locator
  readonly modalPublicRadio: Locator
  readonly modalPrivateRadio: Locator
  readonly modalCreateButton: Locator
  readonly modalCancelButton: Locator

  constructor(page: Page) {
    this.page = page
    this.adminButton = page.getByRole('button', { name: /Admin/i })
    this.createBoardButton = page.getByRole('button', { name: 'Create New Board' })
    this.pagination = page.getByRole('navigation', { name: 'Pagination' })
    this.emptyState = page.getByText('Not found any board')
    this.loadingState = page.getByText(/Loading page.*Please wait for a moment/)
    this.createModal = page.getByRole('dialog', { name: 'Create New Board' })
    this.modalTitleInput = page.getByRole('textbox', { name: 'Board Title' })
    this.modalDescriptionInput = page.getByRole('textbox', { name: 'Description (Optional)' })
    this.modalPublicRadio = page.getByRole('radio', { name: 'Public' })
    this.modalPrivateRadio = page.getByRole('radio', { name: 'Private' })
    this.modalCreateButton = this.createModal.getByRole('button', { name: 'Create', exact: true })
    this.modalCancelButton = this.createModal.getByRole('button', { name: 'Cancel' })
  }

  async goto() {
    await this.page.goto(`http://localhost:5173${this.url}`)
  }

  getBoardByTitle(title: string): Locator {
    return this.page.getByText(title, { exact: false }).first()
  }

  async clickPage(pageNumber: number) {
    await this.pagination.getByRole('button', { name: pageNumber.toString() }).click()
  }

  async openCreateModal() {
    await this.createBoardButton.click()
    await this.createModal.waitFor({ state: 'visible' })
  }

  async closeCreateModal() {
    await this.modalCancelButton.click()
    await this.createModal.waitFor({ state: 'hidden' })
  }

  async createBoard(title: string, options?: { description?: string; type?: 'public' | 'private' }) {
    await this.modalTitleInput.fill(title)
    if (options?.description) {
      await this.modalDescriptionInput.fill(options.description)
    }
    if (options?.type === 'private') {
      await this.modalPrivateRadio.click()
    }
    await this.modalCreateButton.click()
  }

  async waitForBoardsLoaded() {
    await expect(this.loadingState).not.toBeVisible({ timeout: 5000 }).catch(() => {})
    await this.page.waitForFunction(() => {
      const loading = document.querySelector('[class*="MuiLinearProgress"]')
      return !loading || loading.getAttribute('style')?.includes('visibility: hidden')
    }, { timeout: 5000 }).catch(() => {})
  }
}

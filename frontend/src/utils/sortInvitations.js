export const sortInvitations = (listInvitations) => {
  listInvitations.sort((a, b) => {
    // Ưu tiên trạng thái pending
    if (a.boardInvitation.status === 'pending' && b.boardInvitation.status !== 'pending') {
      return -1 // a lên trước
    }
    if (a.boardInvitation.status !== 'pending' && b.boardInvitation.status === 'pending') {
      return 1 // b lên trước
    }

    return b.createdAt - a.createdAt
  })
}

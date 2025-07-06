export const capitalizeFirstLetter = (val) => {
  return val ? `${val.charAt(0).toUpperCase()}${val.slice(1)}`: ''
}

// Chặn spam click với các elements có .interceptor-loading bằng cách thêm vào
export const intercepterLoadingElements = (calling) => {
  const elements = document.querySelectorAll('.interceptor-loading')

  // Lấy tất cả các phần tử có classname là interceptor-loading
  for (let i = 0; i < elements.length; i++) {
    // Nếu mà đang calling thì không có pointer nữa.
    if (calling) {
      elements[i].style.opacity = '0.5'
      elements[i].style.pointerEvents = 'none'
    } else {
      elements[i].style.opacity = 'initial'
      elements[i].style.pointerEvents = 'initial'
    }
  }
}

export const capitalizeFirstLetter = (val) => {
  return val ? `${val.charAt(0).toUpperCase()}${val.slice(1)}`: ''
}

export const intercepterLoadingElements = (calling) => {
  const elements = document.querySelectorAll('.interceptor-loading')

  for (let i = 0; i < elements.length; i++) {
    if (calling) {
      elements[i].style.opacity = '0.5'
      elements[i].style.pointerEvents = 'none'
    } else {
      elements[i].style.opacity = 'initial'
      elements[i].style.pointerEvents = 'initial'
    }
  }
}

const getUrlParams = (item: string, search = window.location.search) => {
  const params = new URLSearchParams(search)

  return params.get(item) || ''
}

export { getUrlParams }

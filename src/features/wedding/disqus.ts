// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck

export const disqus = ({ id, title, url }) => {
  window.page = {}
  window.disqus_config = function () {
    window.page.identifier = id
    window.page.url = url
    window.page.title = title
  }

  const disqus = document.createElement('script')

  disqus.src = import.meta.env.VITE_DISQUS_URL + '/embed.js'
  disqus.setAttribute('data-timestamp', `${+new Date()}`)

  document.body.appendChild(disqus)
}

export default disqus

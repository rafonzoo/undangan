// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-nocheck
import { onCleanup } from 'solid-js'

export const disqus = ({ identifier, title, url }) => {
  if (window && window.DISQUS && document.getElementById('disqus_script')) {
    window.DISQUS.reset({
      reload: true,
      config: function () {
        this.page.identifier = identifier
        this.page.url = url
        this.page.title = title
      },
    })
  } else {
    window.disqus_shortname = import.meta.env.VITE_DISQUS_URL
    window.disqus_config = function () {
      this.page.identifier = identifier
      this.page.url = url
      this.page.title = title
    }

    const disqus = document.createElement('script')

    disqus.src = `https://${import.meta.env.VITE_DISQUS_URL}.disqus.com/embed.js` // prettier-ignore
    disqus.id = 'disqus_script'
    disqus.setAttribute('data-timestamp', `${+new Date()}`)

    document.body.appendChild(disqus)
  }

  onCleanup(() => {
    const disqus_script = document.getElementById('disqus_script')

    if (disqus_script) {
      document.body.removeChild(disqus_script)
    }

    if (window && window.DISQUS) {
      window.DISQUS.reset({})
    }

    try {
      delete window.DISQUS
    } catch (error) {
      window.DISQUS = undefined
    }

    const disqusThread = document.getElementById('disqus_thread')

    if (disqusThread) {
      while (disqusThread.hasChildNodes()) {
        disqusThread.removeChild(disqusThread.firstChild)
      }
    }

    const disqusResources = document.querySelectorAll(
      [
        'link[href*="disquscdn.com/next/embed"]',
        'link[href*="disquscdn.com/next/recommendations"]',
        'link[href*="disqus.com/next/config.js"]',
        'script[src*="disqus.com/count-data.js"]',
        'iframe[title="Disqus"]',
      ].join(',')
    )

    disqusResources.forEach((el) => el.remove())
  })
}

export default disqus

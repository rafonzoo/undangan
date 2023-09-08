import { render } from 'solid-js/web'
import { Router } from '@solidjs/router'
import App from '@app/App'
import '@app/style.css'

render(
  () => <Router children={<App />} />,
  document.getElementById('root') as HTMLElement
)

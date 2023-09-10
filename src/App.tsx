import { type Component, lazy } from 'solid-js'
import { Route, Routes } from '@solidjs/router'

const Homepage = lazy(() => import('@app/page/Home'))
const WeddingCouplePage = lazy(() => import('@wedding/page/couple'))
const WeddingEditorPage = lazy(() => import('@wedding/page/editor'))
const AccountSigninPage = lazy(() => import('@account/page/Signin'))
const AccountSignupPage = lazy(() => import('@account/page/Signup'))
const NotFoundPage = lazy(() => import('@app/page/404'))

const App: Component = () => {
  return (
    <Routes>
      <Route path='/' component={Homepage} />
      <Route path='/wedding'>
        <Route path='/couple/:name' component={WeddingCouplePage} />
        <Route path='/editor/:wid' component={WeddingEditorPage} />
      </Route>
      <Route path='/account'>
        <Route path='/signin' component={AccountSigninPage} />
        <Route path='/signup' component={AccountSignupPage} />
      </Route>
      <Route path='/404' component={NotFoundPage} />
      <Route path='*' component={NotFoundPage} />
    </Routes>
  )
}

export default App

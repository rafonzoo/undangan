import { type Component, createEffect } from 'solid-js'
import { useLocation, useNavigate } from '@solidjs/router'
import Container from '@app/components/Container'

const NotFoundPage: Component = () => {
  const { pathname } = useLocation()
  const navigate = useNavigate()

  createEffect(() => {
    if (pathname !== '404') {
      navigate('/404', { replace: true })
    }
  })
  return (
    <Container>
      <h1>This is NotFoundPage</h1>
    </Container>
  )
}

export default NotFoundPage

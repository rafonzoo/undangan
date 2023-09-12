import { type Component, createEffect } from 'solid-js'
import { useNavigate } from '@solidjs/router'
import { wedding } from '@app/config/store'
import WeddingSwitcher from '@wedding/components/Switcher'
import Container from '@app/components/Container'

const WeddingCouplePage: Component = () => {
  const navigate = useNavigate()

  createEffect(() => {
    const coupleState = wedding.couple.current

    if (coupleState && coupleState.status !== 'paid') {
      return navigate('/404', { replace: true })
    }
  })

  return (
    <Container>
      <WeddingSwitcher />
    </Container>
  )
}

export default WeddingCouplePage

import { type Component, createEffect, onMount } from 'solid-js'
import { dummyUser } from '@wedding/dummy'
import { useNavigate } from '@solidjs/router'
import { authUserAction, user } from '@app/features/account/store/state'
import { wedding } from '@app/config/store'
import WeddingSwitcher from '@wedding/components/Switcher'
import Container from '@app/components/Container'

const WeddingEditorPage: Component = () => {
  const navigate = useNavigate()

  onMount(() => authUserAction(dummyUser))

  createEffect(() => {
    const editorState = wedding.editor.current

    if (!user.account) {
      return navigate('/account/signin', { replace: true })
    }

    if (editorState && editorState.uid !== user.account.id) {
      return navigate('/404', { replace: true })
    }
  })

  return (
    <Container>
      <WeddingSwitcher />
    </Container>
  )
}

export default WeddingEditorPage

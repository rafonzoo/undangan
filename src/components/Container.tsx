import { type Children } from '@app/types'
import { ErrorBoundary } from 'solid-js'

const Container: Children = (props) => {
  return (
    <ErrorBoundary
      fallback={(err, reset) => {
        console.log(err)

        return (
          <div onclick={reset}>
            {/* <code>{err.issues[0].message}</code> */}
          </div>
        )
      }}
    >
      {props.children}
    </ErrorBoundary>
  )
}

export default Container

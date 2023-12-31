import { type Child } from '@app/types'
import { ErrorBoundary } from 'solid-js'

const Container: Child = (props) => {
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
      <main>{props.children}</main>
    </ErrorBoundary>
  )
}

export default Container

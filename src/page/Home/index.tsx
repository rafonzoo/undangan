import type { Component } from 'solid-js'
import { A } from '@solidjs/router'
import { qstring } from '@app/helpers/utils'
import Container from '@app/components/Container'

const Homepage: Component = () => {
  return (
    <Container>
      <p>
        <A
          href={qstring('/wedding/couple/yossy-rafa', {
            to: encodeURI('(SMAN 38) Alif'),
          })}
        >
          Go to public page
        </A>
      </p>
      <p>
        <A
          href={qstring('/wedding/couple/claire-leon', {
            to: encodeURI('Jill'),
          })}
        >
          Go to public page 2
        </A>
      </p>
      <p>
        {/* UUID: 31129476-23e1-46f6-aed9-16905d4a7429 */}
        <A href='/wedding/editor/531baf87-ce9d-4447-958d-6e771d68bca9'>
          Go to editor
        </A>
      </p>
      <p>
        {/* UUID: 31129476-23e1-46f6-aed9-16905d4a7429 */}
        <A href='/wedding/editor/e82b26e0-4088-4d80-bf7c-addefd92d60e'>
          Go to editor 2
        </A>
      </p>
    </Container>
  )
}

export default Homepage

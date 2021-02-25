import React, { Suspense } from 'react'
import { Link, Route } from 'wouter'

const links = ['leva-minimal', 'leva-plugin-spring', 'leva-busy', 'leva-advanced-panels', 'leva-scroll', 'leva-ui']

const Example = ({ link }) => {
  const Lazy = React.lazy(() => import(/* @vite-ignore */ `./sandboxes/${link}/src/App`))
  return (
    <div>
      <Link href="/">
        {/*eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a
          style={{
            position: 'absolute',
            left: 10,
            top: 10,
            zIndex: 100,
            padding: 10,
            background: '#000',
            color: '#fff',
          }}>
          Back
        </a>
      </Link>
      <Suspense fallback={<div>loading...</div>}>
        <Lazy />
      </Suspense>
    </div>
  )
}

export default function App() {
  return (
    <>
      <Route path="/">
        <div style={{ display: 'flex', flexDirection: 'column' }}>
          {links.map((l) => (
            <Link key={l} href={`/${l}`}>
              {/*eslint-disable-next-line jsx-a11y/anchor-is-valid */}
              <a>{l}</a>
            </Link>
          ))}
        </div>
      </Route>
      <Route path="/:link">{(params) => <Example link={params.link} />}</Route>
    </>
  )
}

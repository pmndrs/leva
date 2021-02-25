import React, { Suspense } from 'react'
import { Link, Route } from 'wouter'

const links = ['leva-minimal', 'leva-plugin-spring', 'leva-busy', 'leva-advanced-panels', 'leva-scroll', 'leva-ui']

const Example = ({ link }) => {
  const Lazy = React.lazy(() => import(/* @vite-ignore */ `./sandboxes/${link}/src/App`))
  return (
    <Suspense fallback={<div>loading...</div>}>
      <Lazy />
    </Suspense>
  )
}

export default function App() {
  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      {links.map((l) => (
        <Link key={l} href={`/${l}`}>
          {/*eslint-disable-next-line jsx-a11y/anchor-is-valid */}
          <a className="link">{l}</a>
        </Link>
      ))}
      <Route path="/:link">{(params) => <Example link={params.link} />}</Route>
    </div>
  )
}

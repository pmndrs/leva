import React, { Suspense } from 'react'
import { Link, Route } from 'wouter'
import styles from './styles.module.css'

const links = [
  'leva-minimal',
  'leva-plugin-spring',
  'leva-busy',
  'leva-advanced-panels',
  'leva-scroll',
  'leva-ui',
  'leva-theme',
  'leva-custom-plugin',
]

const Example = ({ link }) => {
  const Lazy = React.lazy(() => import(/* @vite-ignore */ `./sandboxes/${link}/src/App`))
  return (
    <div>
      <Link href="/">
        {/*eslint-disable-next-line jsx-a11y/anchor-is-valid */}
        <a className={styles.back}>← Back</a>
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
        <div className={styles.page}>
          <h1 style={{ marginTop: '20vh' }}>Leva demos</h1>
          <h2>Sandboxes</h2>
          <div className={styles.linkList}>
            {links.map((l) => (
              <Link key={l} href={`/${l}`}>
                {/*eslint-disable-next-line jsx-a11y/anchor-is-valid */}
                <a className={styles.link}>{l}</a>
              </Link>
            ))}
          </div>
        </div>
      </Route>
      <Route path="/:link">{(params) => <Example link={params.link} />}</Route>
    </>
  )
}

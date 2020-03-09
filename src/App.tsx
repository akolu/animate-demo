import React, { ReactElement, useState } from 'react'
import css from './App.module.css'
import AnimatedList from './AnimatedList/AnimatedList'

const App = (): ReactElement => {

  const [list, setList] = useState([
    'Kisse',
    'Koiro',
    'Hevo',
    'Kärmes',
    'Kahru',
  ])

  const onListChanged = (updated: string[]): void => {
    setList(updated)
  }

  return (
    <div className={css.root}>
      <AnimatedList list={list} onListChanged={onListChanged} />
      <pre>{JSON.stringify(list, null, 2)}</pre>
    </div>
  )
}
export default App

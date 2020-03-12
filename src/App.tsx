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

  const shuffleList = () => {
    const shuffled = list.slice().sort(() => Math.random() - 0.5)
    setList(shuffled)
  }

  const deleteOneAtRandom = () => {
    const min = Math.ceil(0)
    const max = Math.floor(list.length)
    const targetIndex = Math.floor(Math.random() * (max - min)) + min //The maximum is exclusive and the minimum is inclusive
    const updated = [...list]
    updated.splice(targetIndex, 1)
    setList(updated)
  }

  return (
    <div className={css.root}>
      <input type="button" onClick={shuffleList} value="Shuffle" />
      <input type="button" onClick={deleteOneAtRandom} value="DeleteOne" />
      <AnimatedList list={list} onListChanged={onListChanged} />
      <pre>{JSON.stringify(list, null, 2)}</pre>
    </div>
  )
}
export default App

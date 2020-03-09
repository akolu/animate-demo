import React, { ReactElement } from 'react'
import css from './App.module.css'
import AnimatedList from './AnimatedList/AnimatedList'

const list = [
  'Kisse',
  'Koiro',
  'Hevo',
  'Kärmes',
  'Kahru',
]

const App = (): ReactElement => (
  <div className={css.root}>
    <AnimatedList list={list} />
  </div>
)

export default App

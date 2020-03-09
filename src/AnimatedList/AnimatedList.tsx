import React, { useState } from 'react'
import css from './AnimatedList.module.css'

interface Props {
  list: string[];
}

const AnimatedList: React.FC<Props> = ({ list }: Props) => {

  const [selected, setSelected] = useState<string>('')

  const swapAnimated = (a: string, b: string) => {
    if (a === b) {
      return
    }
    console.log(`swapping ${a} and ${b}...`) // TODO
  }

  const handleItemClick = (item: string) => {
    if (selected === '') {
      setSelected(item)
    } else {
      swapAnimated(selected, item)
      setSelected('')
    }
  }

  return (
    <ul className={css.root}>
      {list.map((item, index) => (
        <li
          key={`${item}-${index}`}
          onClick={(e: any) => handleItemClick(e.target.innerHTML)}
          className={`${item === selected ? css.selected : ''}`}
        >
          {item}
        </li>
      ))}
    </ul>
  )
}

export default AnimatedList

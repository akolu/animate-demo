import React, { useState } from 'react'
import css from './AnimatedList.module.css'

interface Props {
  list: string[];
  onListChanged: (updated: string[]) => void;
}

const ITEM_MARGIN = 5
const BORDER_HEIGHT = 1
const ITEM_HEIGHT = 20

const AnimatedList: React.FC<Props> = ({ list, onListChanged }: Props) => {

  const [selected, setSelected] = useState<string>('')

  const animate = (item: Element, targetOffset: number): Promise<any> => {
    return new Promise((res, rej) => {
      const animation = item.animate([
        // keyframes
        { transform: 'translateY(0px)' },
        { transform: `translateY(${targetOffset}px)` }
      ], {
        // timing options
        duration: 500,
        iterations: 1,
        fill: 'forwards',
        easing: 'cubic-bezier(0.39, 0, 0.45, 1.4)'
      })
      animation.onfinish = () => res()
    })
  }

  const swapAnimated = async (a: string, b: string) => {
    if (a === b) {
      return
    }

    const first = document.querySelector(`[data-item=${a}`)
    const second = document.querySelector(`[data-item=${b}`)
    if (!first || !second) {
      return
    }
    const indices = [first, second].map(i => parseInt(i.getAttribute('data-item-index') || '', 10) || 0)
    const moveDistance = (ITEM_HEIGHT + BORDER_HEIGHT) * 2 + ITEM_MARGIN

    // wait for animations to finish
    await Promise.all([
      animate(first, (indices[1] - indices[0]) * moveDistance),
      animate(second, (indices[0] - indices[1]) * moveDistance), 
    ])

    const updated = [ ...list ]
    updated[indices[0]] = b
    updated[indices[1]] = a
    onListChanged(updated)
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
          data-item={item}
          data-item-index={index}
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

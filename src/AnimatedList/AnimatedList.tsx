import React, { useState, useEffect } from 'react'
import css from './AnimatedList.module.css'
import usePrevious from '../hooks/usePrevious'

interface Props {
  list: string[];
  onListChanged: (updated: string[]) => void;
}

const ITEM_MARGIN = 5
const BORDER_HEIGHT = 1
const ITEM_HEIGHT = 20
const ITEM_DISTANCE = (ITEM_HEIGHT + BORDER_HEIGHT) * 2 + ITEM_MARGIN

const AnimatedList: React.FC<Props> = ({ list, onListChanged }: Props) => {

  const prev = usePrevious(list)
  const [current, setCurrent] = useState<string[]>(list)
  const [selected, setSelected] = useState<string>('')

  const animateMove = (item: Element, targetOffset: number): Promise<Animation> => {
    return new Promise((res) => {
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

  const animateDelete = (item: Element): Promise<Animation> => {
    return new Promise((res) => {
      const animation = item.animate([
        {
          opacity: 1,
          transform: 'translateX(0px)'
        },
        {
          opacity: 0,
          transform: 'translateX(500px)'
        }
      ], 750)
      animation.onfinish = () => res()
    })
  }

  useEffect(() => {
    // no previous state, nothing to animate
    if (!prev) {
      return
    }
    const animations = prev
      .reduce((acc, cur) => {
        const i = prev.indexOf(cur)
        const newIndex = list.indexOf(cur)
        // same position, do not animate
        if (newIndex === i) {
          return acc
        }
        const element = document.querySelector(`[data-item=${cur}`)
        // element not found in DOM, do not animate
        if (!element) {
          return acc
        }
        if (newIndex === -1) {
          return [...acc, animateDelete(element)]
        } else {
          return [...acc, animateMove(element, (newIndex - i) * ITEM_DISTANCE)]
        }
      }, [] as Promise<Animation>[])
    // wait for animations to finish
    Promise.all(animations).then(() => {
      setCurrent(list)
      setSelected('')
    })
  }, [list, prev])

  const handleItemClick = (item: string) => {
    if (selected === '') {
      setSelected(item)
    } else {
      const origIndex = current.indexOf(selected)
      const destIndex = current.indexOf(item)
      const updated = [...current]
      updated[origIndex] = item
      updated[destIndex] = selected
      onListChanged(updated)
    }
  }

  const getCSSClass = (item: string) => {
    if (!selected) {
      return ''
    } else if (item === selected) {
      return css.selected
    } else {
      return css.target
    }
  }

  return (
    <ul className={css.root}>
      {current.map((item, index) => {
        return (
          <li
            data-item={item}
            data-item-index={index}
            key={`${item}-${index}`}
            onClick={(e: any) => handleItemClick(e.target.innerHTML)}
            className={getCSSClass(item)}
          >
            {item}
          </li>
        )
      })}
    </ul>
  )
}

export default AnimatedList

import { data } from './data'
import './styles.css'
import { useState } from 'react'

type DataItem = {
  id: number
  question: string
  answer: string
}
const Accordian = () => {
  const [selected, setSelected] = useState<number | null>(null)
  const [enableMultiSelection, setEnableMultiSelection] = useState(false)
  const [multiple, setMultiple] = useState<number[]>([])

  function handleSingleSelection(getCurrentId: number) {
    setSelected(getCurrentId === selected ? null : getCurrentId)
  }

  function handleMultiSelection(getCurrentId: number) {
    let cpyMutiple: number[] = [...multiple]
    const findIndexOfCurrentId = cpyMutiple.indexOf(getCurrentId)
    console.log(findIndexOfCurrentId)
    if (findIndexOfCurrentId === -1) cpyMutiple.push(getCurrentId)
    else cpyMutiple.splice(findIndexOfCurrentId, 1)
    setMultiple(cpyMutiple)
  }

  return (
    <div className='acc-wrapper'>
      <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
        Enable Multi Selection
      </button>
      <div className='accordian'>
        {data && data.length > 0 ? (
          data.map((dataItem: DataItem) => (
            <div key={dataItem.id} className='item'>
              <div
                onClick={
                  enableMultiSelection
                    ? () => handleMultiSelection(dataItem.id)
                    : () => handleSingleSelection(dataItem.id)
                }
                className='title'
              >
                <h3>{dataItem.question}</h3>
                <span className='add'>+</span>
              </div>
              {enableMultiSelection
                ? multiple.indexOf(dataItem.id) !== -1 && (
                    <div className='acc-content'>{dataItem.answer}</div>
                  )
                : selected === dataItem.id && (
                    <div className='acc-content'>{dataItem.answer}</div>
                  )}
            </div>
          ))
        ) : (
          <div>No data found!</div>
        )}
      </div>
    </div>
  )
}

export default Accordian

import { useDispatch } from 'react-redux'
import { useState } from 'react'
import { deleteGoal } from '../features/goals/goalSlice'

function GoalItem({ goal }) {
  const dispatch = useDispatch()
  const [checked, setChecked] = useState(false)

  return (
    <div className='goal'>
      <div>{new Date(goal.createdAt).toLocaleString('en-US')}</div>
      {
        checked ? <strike><h2>{goal.text}</h2></strike> : <h2>{goal.text}</h2>
      }
      
      <input type='checkbox' onClick={() => setChecked(!checked)}  />
      <button onClick={() => dispatch(deleteGoal(goal._id))} className='close'>
        X
      </button>
    </div>
  )
}

export default GoalItem
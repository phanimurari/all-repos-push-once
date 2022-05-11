// Write your code here

import './index.css'

const TodoItem = props => {
  const {todoDetails, deleteTodo} = props
  const {id, title} = todoDetails

  const onDeleteTodo = () => {
    deleteTodo(id)
  }

  return (
    <li className="todo-Item">
      <p className="paragraph">{title}</p>
      <button className="delete-btn" onClick={onDeleteTodo} type="button">
        Delete
      </button>
    </li>
  )
}

export default TodoItem

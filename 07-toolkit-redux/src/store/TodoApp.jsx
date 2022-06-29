import { useState } from "react";

import { useGetTodoQuery, useGetTodosQuery } from "./api";

export const TodoApp = () => {
  // const { data: todos = [], isLoading } = useGetTodosQuery();

  const [todoId, setTodoId] = useState(1);
  const { data: todo, isLoading } = useGetTodoQuery(todoId);

  const prevTodo = () => setTodoId(todoId - 1);
  const nextTodo = () => setTodoId(todoId + 1);

  return (
    <>
      <h1>TodoApp</h1>
      <hr />
      <h4>isLoading; { isLoading ? 'true' : 'false' }</h4>

      <pre>{ JSON.stringify(todo) }</pre>

      <button onClick={ prevTodo }>
        Prev todo
      </button>
      <button onClick={ nextTodo }>
        Next todo
      </button>

      {/* <ul>
        {
          todos && todos.map(todo => (
            <li key={ todo.id }>
              <strong> { todo.completed ? 'Done' : 'Pending' } </strong>
              { todo.title }
            </li>
          ))
        }
      </ul> */}
    </>
  )
}

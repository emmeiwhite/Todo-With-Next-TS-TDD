import type { Todo } from './TaskManager'
import TodoItem from './TodoItem'

type TodoItemsType = {
  todoItems: Todo[]
  onDelete: (id: string) => void
  onToggle: (id: string) => void
  onEdit: (todo: Todo) => void
}

export default function TodoItems({ todoItems, onDelete, onToggle, onEdit }: TodoItemsType) {
  return (
    <div className="mt-4 px-4">
      <h1 className="mb-2 text-2xl text-center">TodoItems</h1>

      <div className="flex flex-col gap-5">
        {todoItems.map(todo => (
          <TodoItem
            key={todo.id}
            todo={todo}
            onDelete={onDelete}
            onToggle={onToggle}
            onEdit={onEdit}
          />
        ))}
      </div>
    </div>
  )
}

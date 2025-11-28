import React, { useState } from 'react';
import TodoItem from './TodoItem';
import Icon from '../../../components/AppIcon';

const TodoList = ({ todos, onToggleTodo, onEditTodo, onDeleteTodo, onReorderTodos }) => {
  const [draggedItem, setDraggedItem] = useState(null);
  const [dragOverIndex, setDragOverIndex] = useState(null);

  const handleDragStart = (todoId) => {
    setDraggedItem(todoId);
  };

  const handleDragEnd = () => {
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  const handleDragOver = (todoId) => {
    if (draggedItem && draggedItem !== todoId) {
      setDragOverIndex(todoId);
    }
  };

  const handleDrop = (targetId) => {
    if (draggedItem && draggedItem !== targetId) {
      const draggedIndex = todos.findIndex(todo => todo.id === draggedItem);
      const targetIndex = todos.findIndex(todo => todo.id === targetId);
      
      if (draggedIndex !== -1 && targetIndex !== -1) {
        const newTodos = [...todos];
        const [draggedTodo] = newTodos.splice(draggedIndex, 1);
        newTodos.splice(targetIndex, 0, draggedTodo);
        onReorderTodos(newTodos);
      }
    }
    setDraggedItem(null);
    setDragOverIndex(null);
  };

  if (todos.length === 0) {
    return (
      <div className="text-center py-12">
        <div className="w-16 h-16 bg-muted rounded-full flex items-center justify-center mx-auto mb-4">
          <Icon name="CheckSquare" size={24} className="text-muted-foreground" />
        </div>
        <h3 className="text-lg font-medium text-foreground mb-2">No tasks yet</h3>
        <p className="text-muted-foreground">
          Create your first task to get started with your productivity journey.
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {todos.map((todo) => (
        <TodoItem
          key={todo.uuid}
          todo={todo}
          onToggle={onToggleTodo}
          onEdit={onEditTodo}
          onDelete={onDeleteTodo}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
          onDragOver={handleDragOver}
          onDrop={handleDrop}
          isDragging={draggedItem === todo.id}
          dragOverIndex={dragOverIndex}
        />
      ))}
    </div>
  );
};

export default TodoList;
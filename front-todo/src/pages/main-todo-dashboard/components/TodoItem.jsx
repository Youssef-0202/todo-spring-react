import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TodoItem = ({ 
  todo, 
  onToggle, 
  onEdit, 
  onDelete, 
  onDragStart, 
  onDragEnd, 
  onDragOver, 
  onDrop,
  isDragging,
  dragOverIndex 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500 text-white';
      case 'high': return 'bg-orange-500 text-white';
      case 'medium': return 'bg-blue-500 text-white';
      case 'low': return 'bg-gray-400 text-white';
      default: return 'bg-gray-400 text-white';
    }
  };

  const getCategoryColor = (category) => {
    switch (category) {
      case 'work': return 'bg-purple-100 text-purple-800 border-purple-200';
      case 'personal': return 'bg-green-100 text-green-800 border-green-200';
      case 'shopping': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'health': return 'bg-red-100 text-red-800 border-red-200';
      case 'learning': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const formatDueDate = (dateString) => {
    if (!dateString) return null;
    const date = new Date(dateString);
    const today = new Date();
    const tomorrow = new Date(today);
    tomorrow.setDate(tomorrow.getDate() + 1);
    
    if (date.toDateString() === today.toDateString()) {
      return 'Today';
    } else if (date.toDateString() === tomorrow.toDateString()) {
      return 'Tomorrow';
    } else {
      return date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
    }
  };

  const isOverdue = (dateString) => {
    if (!dateString) return false;
    const dueDate = new Date(dateString);
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    dueDate.setHours(0, 0, 0, 0);
    return dueDate < today && !todo.completed;
  };

  const handleDragStart = (e) => {
    e.dataTransfer.effectAllowed = 'move';
    onDragStart?.(todo.id);
  };

  const handleDragEnd = () => {
    onDragEnd?.();
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = 'move';
    onDragOver?.(todo.id);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    onDrop?.(todo.id);
  };

  return (
    <div
      className={`group relative bg-card border border-border rounded-lg p-4 transition-all duration-200 ${
        isDragging ? 'opacity-50 scale-95' : 'hover:shadow-elevated'
      } ${dragOverIndex === todo.id ? 'border-primary border-2' : ''}`}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      draggable
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      onDragOver={handleDragOver}
      onDrop={handleDrop}
    >
      {/* Drag Handle */}
      <div className="absolute left-1 top-1/2 transform -translate-y-1/2 opacity-0 group-hover:opacity-100 transition-opacity cursor-grab active:cursor-grabbing">
        <Icon name="GripVertical" size={16} className="text-muted-foreground" />
      </div>

      <div className="flex items-start space-x-3 pl-4">
        {/* Checkbox */}
        <button
          onClick={() => onToggle(todo.id)}
          className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 mt-0.5 ${
            todo.completed
              ? 'bg-primary border-primary text-primary-foreground'
              : 'border-border hover:border-primary'
          }`}
        >
          {todo.completed && <Icon name="Check" size={12} strokeWidth={3} />}
        </button>

        {/* Content */}
        <div className="flex-1 min-w-0">
          {/* Title and Priority */}
          <div className="flex items-start justify-between mb-2">
            <h3
              className={`text-sm font-medium leading-5 ${
                todo.completed
                  ? 'text-muted-foreground line-through'
                  : 'text-foreground'
              }`}
            >
              {todo.title}
            </h3>
            {todo.priority && (
              <span
                className={`ml-2 px-2 py-1 text-xs font-medium rounded-full flex-shrink-0 ${getPriorityColor(
                  todo.priority
                )}`}
              >
                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1)}
              </span>
            )}
          </div>

          {/* Description */}
          {todo.description && (
            <p
              className={`text-sm mb-3 ${
                todo.completed ? 'text-muted-foreground' : 'text-secondary'
              }`}
            >
              {todo.description}
            </p>
          )}

          {/* Tags */}
          {todo.tags && todo.tags.length > 0 && (
            <div className="flex flex-wrap gap-1 mb-3">
              {todo.tags.map((tag, index) => (
                <span
                  key={index}
                  className="px-2 py-1 text-xs bg-muted text-muted-foreground rounded-md"
                >
                  #{tag}
                </span>
              ))}
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-2">
              {/* Category */}
              {todo.category && (
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-md border ${getCategoryColor(
                    todo.category
                  )}`}
                >
                  {todo.category.charAt(0).toUpperCase() + todo.category.slice(1)}
                </span>
              )}

              {/* Due Date */}
              {todo.dueDate && (
                <span
                  className={`px-2 py-1 text-xs font-medium rounded-md ${
                    isOverdue(todo.dueDate)
                      ? 'bg-red-100 text-red-800 border border-red-200' :'bg-blue-100 text-blue-800 border border-blue-200'
                  }`}
                >
                  <Icon name="Calendar" size={12} className="inline mr-1" />
                  {formatDueDate(todo.dueDate)}
                </span>
              )}
            </div>

            {/* Actions */}
            <div
              className={`flex items-center space-x-1 transition-opacity ${
                isHovered ? 'opacity-100' : 'opacity-0'
              }`}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onEdit(todo)}
                className="h-8 w-8"
                iconName="Edit2"
                iconSize={14}
              />
              <Button
                variant="ghost"
                size="icon"
                onClick={() => onDelete(todo.id)}
                className="h-8 w-8 text-destructive hover:text-destructive"
                iconName="Trash2"
                iconSize={14}
              />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoItem;
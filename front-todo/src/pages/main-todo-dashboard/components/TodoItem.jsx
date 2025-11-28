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
            case 'URGENT': return 'bg-red-500 text-white';
            case 'HIGH': return 'bg-orange-500 text-white';
            case 'MEDIUM': return 'bg-blue-500 text-white';
            case 'LOW': return 'bg-gray-400 text-white';
            default: return 'bg-gray-400 text-white';
        }
    };

    const getCategoryColor = (categoryName) => {
        switch (categoryName) {
            case 'Work': return 'bg-purple-100 text-purple-800 border-purple-200';
            case 'Personal': return 'bg-green-100 text-green-800 border-green-200';
            case 'Shopping': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
            case 'Health': return 'bg-red-100 text-red-800 border-red-200';
            case 'Learning': return 'bg-indigo-100 text-indigo-800 border-indigo-200';
            case 'Other': return 'bg-slate-100 text-slate-800 border-slate-200';
            default: return 'bg-gray-100 text-gray-800 border-gray-200';
        }
    };

    const getStatusColor = (status) => {
        switch (status) {
            case 'TODO': return 'bg-gray-100 text-gray-800 border-gray-200';
            case 'IN_PROGRESS': return 'bg-blue-100 text-blue-800 border-blue-200';
            case 'DONE': return 'bg-green-100 text-green-800 border-green-200';
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
        return dueDate < today && todo.status !== 'DONE';
    };

    const isCompleted = todo.completed

    const handleDragStart = (e) => {
        e.dataTransfer.effectAllowed = 'move';
        onDragStart?.(todo.uuid);
    };

    const handleDragEnd = () => {
        onDragEnd?.();
    };

    const handleDragOver = (e) => {
        e.preventDefault();
        e.dataTransfer.dropEffect = 'move';
        onDragOver?.(todo.uuid);
    };

    const handleDrop = (e) => {
        e.preventDefault();
        onDrop?.(todo.uuid);
    };

    return (
        <div
            className={`group relative bg-card border border-border rounded-lg p-4 transition-all duration-200 ${
                isDragging ? 'opacity-50 scale-95' : 'hover:shadow-elevated'
            } ${dragOverIndex === todo.uuid ? 'border-primary border-2' : ''}`}
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
                    onClick={() => onToggle(todo.uuid)}
                    className={`flex-shrink-0 w-5 h-5 rounded-full border-2 flex items-center justify-center transition-all duration-200 mt-0.5 ${
                        isCompleted
                            ? 'bg-primary border-primary text-primary-foreground'
                            : 'border-border hover:border-primary'
                    }`}
                >
                    {isCompleted && <Icon name="Check" size={12} strokeWidth={3} />}
                </button>

                {/* Content */}
                <div className="flex-1 min-w-0">
                    {/* Title and Priority */}
                    <div className="flex items-start justify-between mb-2">
                        <h3
                            className={`text-sm font-medium leading-5 ${
                                isCompleted
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
                {todo.priority.charAt(0).toUpperCase() + todo.priority.slice(1).toLowerCase()}
              </span>
                        )}
                    </div>

                    {/* Description */}
                    {todo.description && (
                        <p
                            className={`text-sm mb-3 ${
                                isCompleted ? 'text-muted-foreground' : 'text-secondary'
                            }`}
                        >
                            {todo.description}
                        </p>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between">
                        <div className="flex items-center space-x-2">
                            {/* Status */}
                            {todo.status && (
                                <span
                                    className={`px-2 py-1 text-xs font-medium rounded-md border ${getStatusColor(
                                        todo.status
                                    )}`}
                                >
                  {todo.status.replace('_', ' ').toLowerCase().replace(/\b\w/g, l => l.toUpperCase())}
                </span>
                            )}

                            {/* Category */}
                            {todo.categoryName && (
                                <span
                                    className={`px-2 py-1 text-xs font-medium rounded-md border ${getCategoryColor(
                                        todo.categoryName
                                    )}`}
                                >
                  {todo.categoryName}
                </span>
                            )}

                            {/* Due Date */}
                            {todo.dueDate && (
                                <span
                                    className={`px-2 py-1 text-xs font-medium rounded-md ${
                                        isOverdue(todo.dueDate)
                                            ? 'bg-red-100 text-red-800 border border-red-200'
                                            : 'bg-blue-100 text-blue-800 border border-blue-200'
                                    }`}
                                >
                  <Icon name="Calendar" size={12} className="inline mr-1" />
                                    {formatDueDate(todo.dueDate)}
                </span>
                            )}

                            {/* Reminder */}
                            {todo.reminderDateTime && (
                                <span className="px-2 py-1 text-xs font-medium rounded-md bg-amber-100 text-amber-800 border border-amber-200">
                  <Icon name="Bell" size={12} className="inline mr-1" />
                  Reminder
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
                                onClick={() => onDelete(todo.uuid)}
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
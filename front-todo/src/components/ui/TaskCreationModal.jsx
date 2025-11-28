import React, { useState, useEffect } from 'react';

import Button from './Button';
import Input from './Input';
import Select from './Select';
import TaskService from "../../services/TaskService";

const TaskCreationModal = ({ isOpen, onClose, task = null, onSave }) => {
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        priority: 'MEDIUM',
        categoryName: '',
        status: 'TODO',
        dueDate: '',
        reminderDateTime: ''
    });
    const [errors, setErrors] = useState({});
    const [isLoading, setIsLoading] = useState(false);

    const priorityOptions = [
        { value: 'LOW', label: 'Low Priority' },
        { value: 'MEDIUM', label: 'Medium Priority' },
        { value: 'HIGH', label: 'High Priority' },
        { value: 'URGENT', label: 'Urgent' }
    ];

    const categoryOptions = [
        { value: 'Work', label: 'Work' },
        { value: 'Personal', label: 'Personal' },
        { value: 'Shopping', label: 'Shopping' },
        { value: 'Health', label: 'Health' },
        { value: 'Learning', label: 'Learning' },
        { value: 'Other', label: 'Other' }
    ];

    const statusOptions = [
        { value: 'TODO', label: 'To Do' },
        { value: 'IN_PROGRESS', label: 'In Progress' },
        { value: 'DONE', label: 'Done' }
    ];

    useEffect(() => {
        if (task) {
            setFormData({
                title: task.title || '',
                description: task.description || '',
                priority: task.priority || 'MEDIUM',
                categoryName: task.categoryName || '',
                status: task.status || 'TODO',
                dueDate: task.dueDate ? new Date(task.dueDate).toISOString().split('T')[0] : '',
                reminderDateTime: task.reminderDateTime ? new Date(task.reminderDateTime).toISOString().slice(0, 16) : ''
            });
        } else {
            setFormData({
                title: '',
                description: '',
                priority: 'MEDIUM',
                categoryName: '',
                status: 'TODO',
                dueDate: '',
                reminderDateTime: ''
            });
        }
        setErrors({});
    }, [task, isOpen]);

    const handleInputChange = (field, value) => {
        setFormData(prev => ({
            ...prev,
            [field]: value
        }));

        if (errors[field]) {
            setErrors(prev => ({
                ...prev,
                [field]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Task title is required';
        }

        if (formData.title.length > 100) {
            newErrors.title = 'Title must be less than 100 characters';
        }

        if (formData.description.length > 500) {
            newErrors.description = 'Description must be less than 500 characters';
        }

        // Validate due date is not in the past (unless it's today)
        if (formData.dueDate) {
            const dueDate = new Date(formData.dueDate);
            const today = new Date();
            today.setHours(0, 0, 0, 0);
            dueDate.setHours(0, 0, 0, 0);

            if (dueDate < today) {
                newErrors.dueDate = 'Due date cannot be in the past';
            }
        }

        // Validate reminder date is not in the past
        if (formData.reminderDateTime) {
            const reminderDate = new Date(formData.reminderDateTime);
            const now = new Date();

            if (reminderDate < now) {
                newErrors.reminderDateTime = 'Reminder time cannot be in the past';
            }
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    const handleSave = async () => {
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const taskData = {
                uuid: task?.uuid || crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`,
                title: formData.title.trim(),
                description: formData.description.trim(),
                priority: formData.priority,
                categoryName: formData.categoryName,
                status: formData.status,
                dueDate: formData.dueDate || null,
                reminderDateTime: formData.reminderDateTime || null,
                createdAt: task?.createdAt || new Date().toISOString()
            };
            await TaskService.saveTask(taskData);
            onClose();
        } catch (error) {
            console.error('Error saving task:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleUpdate = async () => {
        if (!validateForm()) return;

        setIsLoading(true);

        try {
            const taskData = {
                uuid: task?.uuid || crypto.randomUUID?.() || `${Date.now()}-${Math.random()}`,
                title: formData.title.trim(),
                description: formData.description.trim(),
                priority: formData.priority,
                categoryName: formData.categoryName,
                status: formData.status,
                dueDate: formData.dueDate || null,
                reminderDateTime: formData.reminderDateTime || null,
                createdAt: task?.createdAt || new Date().toISOString()
            };
            await TaskService.updateByUuid(taskData);
            onClose();
        } catch (error) {
            console.error('Error saving task:', error);
        } finally {
            setIsLoading(false);
        }
    };

    const handleKeyDown = (e) => {
        if (e.key === 'Escape') {
            onClose();
        }
        if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) {
            handleSave();
        }
    };

    if (!isOpen) return null;

    return (
        <>
            {/* Backdrop */}
            <div
                className="fixed inset-0 z-backdrop bg-black/50 animate-fade-in"
                onClick={onClose}
            />

            {/* Modal */}
            <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
                <div
                    className="w-full max-w-lg bg-card rounded-lg shadow-elevated animate-scale-in max-h-[90vh] overflow-hidden"
                    onClick={(e) => e.stopPropagation()}
                    onKeyDown={handleKeyDown}
                >
                    {/* Header */}
                    <div className="flex items-center justify-between p-6 border-b border-border">
                        <h2 className="text-lg font-semibold text-card-foreground">
                            {task ? 'Edit Task' : 'Create New Task'}
                        </h2>
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={onClose}
                            iconName="X"
                            iconSize={20}
                        />
                    </div>

                    {/* Content */}
                    <div className="p-6 overflow-y-auto max-h-[calc(90vh-140px)]">
                        <div className="space-y-4">
                            {/* Title */}
                            <Input
                                label="Task Title"
                                type="text"
                                placeholder="Enter task title..."
                                value={formData.title}
                                onChange={(e) => handleInputChange('title', e.target.value)}
                                error={errors.title}
                                required
                                maxLength={100}
                            />

                            {/* Description */}
                            <div>
                                <label className="block text-sm font-medium text-foreground mb-2">
                                    Description
                                </label>
                                <textarea
                                    placeholder="Add task description..."
                                    value={formData.description}
                                    onChange={(e) => handleInputChange('description', e.target.value)}
                                    className="w-full px-3 py-2 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth resize-none"
                                    rows={3}
                                    maxLength={500}
                                />
                                {errors.description && (
                                    <p className="text-sm text-error mt-1">{errors.description}</p>
                                )}
                                <p className="text-xs text-muted-foreground mt-1">
                                    {formData.description.length}/500 characters
                                </p>
                            </div>

                            {/* Priority, Category, and Status Row */}
                            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                                <Select
                                    label="Priority"
                                    options={priorityOptions}
                                    value={formData.priority}
                                    onChange={(value) => handleInputChange('priority', value)}
                                />

                                <Select
                                    label="Category"
                                    options={categoryOptions}
                                    value={formData.categoryName}
                                    onChange={(value) => handleInputChange('categoryName', value)}
                                    placeholder="Select category"
                                />

                                <Select
                                    label="Status"
                                    options={statusOptions}
                                    value={formData.status}
                                    onChange={(value) => handleInputChange('status', value)}
                                />
                            </div>

                            {/* Due Date and Reminder */}
                            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                <div>
                                    <Input
                                        label="Due Date"
                                        type="date"
                                        value={formData.dueDate}
                                        onChange={(e) => handleInputChange('dueDate', e.target.value)}
                                        min={new Date().toISOString().split('T')[0]}
                                        error={errors.dueDate}
                                    />
                                </div>

                                <div>
                                    <Input
                                        label="Reminder"
                                        type="datetime-local"
                                        value={formData.reminderDateTime}
                                        onChange={(e) => handleInputChange('reminderDateTime', e.target.value)}
                                        min={new Date().toISOString().slice(0, 16)}
                                        error={errors.reminderDateTime}
                                    />
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-surface">
                        <Button
                            variant="outline"
                            onClick={onClose}
                            disabled={isLoading}
                        >
                            Cancel
                        </Button>
                        {task ?
                            <Button
                                variant="default"
                                onClick={handleUpdate}
                                loading={isLoading}
                                iconName="Save"
                                iconPosition="left"
                                iconSize={16}
                            >
                                Update Task
                            </Button> :
                            <Button
                                variant="default"
                                onClick={handleSave}
                                loading={isLoading}
                                iconName="Save"
                                iconPosition="left"
                                iconSize={16}
                            >
                                Create Task
                            </Button>
                        }
                    </div>
                </div>
            </div>
        </>
    );
};

export default TaskCreationModal;
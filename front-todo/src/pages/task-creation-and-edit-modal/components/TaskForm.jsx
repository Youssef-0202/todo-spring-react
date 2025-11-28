import React, { useState, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const TaskForm = ({ task = null, onSave, onCancel, isLoading = false }) => {
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    priority: 'medium',
    category: '',
    dueDate: '',
    dueTime: '',
    tags: [],
    isRecurring: false,
    reminderEnabled: false,
    reminderTime: '30'
  });
  const [errors, setErrors] = useState({});
  const [tagInput, setTagInput] = useState('');

  const priorityOptions = [
    { value: 'high', label: 'High Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'low', label: 'Low Priority' }
  ];

  const categoryOptions = [
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'health', label: 'Health & Fitness' },
    { value: 'learning', label: 'Learning & Education' },
    { value: 'finance', label: 'Finance' },
    { value: 'home', label: 'Home & Family' },
    { value: 'travel', label: 'Travel' },
    { value: 'other', label: 'Other' }
  ];

  const reminderOptions = [
    { value: '5', label: '5 minutes before' },
    { value: '15', label: '15 minutes before' },
    { value: '30', label: '30 minutes before' },
    { value: '60', label: '1 hour before' },
    { value: '1440', label: '1 day before' }
  ];

  useEffect(() => {
    if (task) {
      setFormData({
        title: task.title || '',
        description: task.description || '',
        priority: task.priority || 'medium',
        category: task.category || '',
        // dueDate: task.dueDate ? task.dueDate.split('T')[0] : '',
        // dueTime: task.dueDate ? task.dueDate.split('T')[1]?.substring(0, 5) || '' : '',
        tags: task.tags || [],
        isRecurring: task.isRecurring || false,
        reminderEnabled: task.reminderEnabled || false,
        reminderTime: task.reminderTime || '30'
      });
    }
  }, [task]);

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

  const handleAddTag = () => {
    if (tagInput.trim() && !formData.tags.includes(tagInput.trim())) {
      setFormData(prev => ({
        ...prev,
        tags: [...prev.tags, tagInput.trim()]
      }));
      setTagInput('');
    }
  };

  const handleRemoveTag = (tagToRemove) => {
    setFormData(prev => ({
      ...prev,
      tags: prev.tags.filter(tag => tag !== tagToRemove)
    }));
  };

  const validateForm = () => {
    const newErrors = {};
    
    if (!formData.title.trim()) {
      newErrors.title = 'Task title is required';
    } else if (formData.title.length > 100) {
      newErrors.title = 'Title must be less than 100 characters';
    }
    
    if (formData.description.length > 500) {
      newErrors.description = 'Description must be less than 500 characters';
    }
    
    if (formData.dueDate && formData.dueDate < new Date().toISOString().split('T')[0]) {
      newErrors.dueDate = 'Due date cannot be in the past';
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;
    
    const taskData = {
      ...formData,
      id: task?.id || Date.now(),
      dueDate: formData.dueDate && formData.dueTime 
        ? `${formData.dueDate}T${formData.dueTime}:00`
        : formData.dueDate ? `${formData.dueDate}T23:59:59` : null,
      createdAt: task?.createdAt || new Date().toISOString(),
      updatedAt: new Date().toISOString(),
      completed: task?.completed || false
    };
    
    onSave(taskData);
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 'high': return 'text-red-600 bg-red-50 border-red-200';
      case 'medium': return 'text-yellow-600 bg-yellow-50 border-yellow-200';
      case 'low': return 'text-green-600 bg-green-50 border-green-200';
      default: return 'text-gray-600 bg-gray-50 border-gray-200';
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Task Title */}
      <Input
        label="Task Title"
        type="text"
        placeholder="What needs to be done?"
        value={formData.title}
        onChange={(e) => handleInputChange('title', e.target.value)}
        error={errors.title}
        required
        maxLength={100}
        className="text-lg"
      />

      {/* Task Description */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Description
        </label>
        <textarea
          placeholder="Add more details about this task..."
          value={formData.description}
          onChange={(e) => handleInputChange('description', e.target.value)}
          className="w-full px-3 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth resize-none min-h-[100px]"
          rows={4}
          maxLength={500}
        />
        {errors.description && (
          <p className="text-sm text-error mt-1">{errors.description}</p>
        )}
        <p className="text-xs text-muted-foreground mt-1">
          {formData.description.length}/500 characters
        </p>
      </div>

      {/* Priority Selection */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-3">
          Priority Level
        </label>
        <div className="grid grid-cols-3 gap-3">
          {priorityOptions.map((option) => (
            <button
              key={option.value}
              type="button"
              onClick={() => handleInputChange('priority', option.value)}
              className={`p-3 border-2 rounded-lg transition-smooth text-center ${
                formData.priority === option.value
                  ? getPriorityColor(option.value)
                  : 'border-border bg-background text-muted-foreground hover:bg-muted'
              }`}
            >
              <div className="flex items-center justify-center space-x-2">
                <div className={`w-3 h-3 rounded-full ${
                  option.value === 'high' ? 'bg-red-500' :
                  option.value === 'medium' ? 'bg-yellow-500' : 'bg-green-500'
                }`} />
                <span className="text-sm font-medium">{option.label.split(' ')[0]}</span>
              </div>
            </button>
          ))}
        </div>
      </div>

      {/* Category and Due Date Row */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <Select
          label="Category"
          options={categoryOptions}
          value={formData.category}
          onChange={(value) => handleInputChange('category', value)}
          placeholder="Select a category"
        />
        
        <Input
          label="Due Date"
          type="date"
          value={formData.dueDate}
          onChange={(e) => handleInputChange('dueDate', e.target.value)}
          error={errors.dueDate}
          min={new Date().toISOString().split('T')[0]}
        />
      </div>

      {/* Due Time (if date is selected) */}
      {formData.dueDate && (
        <Input
          label="Due Time (Optional)"
          type="time"
          value={formData.dueTime}
          onChange={(e) => handleInputChange('dueTime', e.target.value)}
          description="Leave empty to set as end of day"
        />
      )}

      {/* Tags Section */}
      <div>
        <label className="block text-sm font-medium text-foreground mb-2">
          Tags
        </label>
        <div className="flex flex-wrap gap-2 mb-3">
          {formData.tags.map((tag, index) => (
            <span
              key={index}
              className="inline-flex items-center px-3 py-1 bg-primary/10 text-primary rounded-full text-sm"
            >
              {tag}
              <button
                type="button"
                onClick={() => handleRemoveTag(tag)}
                className="ml-2 text-primary hover:text-primary/70 transition-smooth"
              >
                <Icon name="X" size={14} />
              </button>
            </span>
          ))}
        </div>
        <div className="flex space-x-2">
          <Input
            type="text"
            placeholder="Add a tag..."
            value={tagInput}
            onChange={(e) => setTagInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === 'Enter') {
                e.preventDefault();
                handleAddTag();
              }
            }}
            className="flex-1"
          />
          <Button
            type="button"
            variant="outline"
            onClick={handleAddTag}
            disabled={!tagInput.trim()}
            iconName="Plus"
            iconSize={16}
          >
            Add
          </Button>
        </div>
      </div>

      {/* Additional Options */}
      <div className="space-y-4 pt-4 border-t border-border">
        <Checkbox
          label="Set reminder"
          description="Get notified before the due date"
          checked={formData.reminderEnabled}
          onChange={(e) => handleInputChange('reminderEnabled', e.target.checked)}
        />
        
        {formData.reminderEnabled && (
          <Select
            label="Reminder Time"
            options={reminderOptions}
            value={formData.reminderTime}
            onChange={(value) => handleInputChange('reminderTime', value)}
            className="ml-6"
          />
        )}
        
        <Checkbox
          label="Recurring task"
          description="This task repeats regularly"
          checked={formData.isRecurring}
          onChange={(e) => handleInputChange('isRecurring', e.target.checked)}
        />
      </div>

      {/* Action Buttons */}
      <div className="flex flex-col sm:flex-row gap-3 pt-6">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          disabled={isLoading}
          className="sm:flex-1"
        >
          Cancel
        </Button>
        <Button
          type="submit"
          variant="default"
          loading={isLoading}
          iconName="Save"
          iconPosition="left"
          iconSize={16}
          className="sm:flex-1"
        >
          {task ? 'Update Task' : 'Create Task'}
        </Button>
      </div>
    </form>
  );
};

export default TaskForm;
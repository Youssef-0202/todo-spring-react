import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const TaskDefaults = ({ settings, onSettingChange }) => {
  const priorityOptions = [
    { value: 'low', label: 'Low Priority' },
    { value: 'medium', label: 'Medium Priority' },
    { value: 'high', label: 'High Priority' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const categoryOptions = [
    { value: '', label: 'No Category' },
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'health', label: 'Health' },
    { value: 'learning', label: 'Learning' },
    { value: 'other', label: 'Other' }
  ];

  const archiveTimeOptions = [
    { value: '1', label: '1 day' },
    { value: '7', label: '1 week' },
    { value: '30', label: '1 month' },
    { value: '90', label: '3 months' },
    { value: '365', label: '1 year' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-6">Task Defaults</h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Default Priority"
            description="Priority level for new tasks"
            options={priorityOptions}
            value={settings.defaultPriority}
            onChange={(value) => onSettingChange('defaultPriority', value)}
          />
          
          <Select
            label="Default Category"
            description="Category for new tasks"
            options={categoryOptions}
            value={settings.defaultCategory}
            onChange={(value) => onSettingChange('defaultCategory', value)}
          />
        </div>
        
        <div className="space-y-4">
          <Checkbox
            label="Auto-archive completed tasks"
            description="Automatically move completed tasks to archive"
            checked={settings.autoArchive}
            onChange={(e) => onSettingChange('autoArchive', e.target.checked)}
          />
          
          <Checkbox
            label="Set due date by default"
            description="Automatically set due date for new tasks"
            checked={settings.defaultDueDate}
            onChange={(e) => onSettingChange('defaultDueDate', e.target.checked)}
          />
          
          <Checkbox
            label="Enable task templates"
            description="Save frequently used tasks as templates"
            checked={settings.taskTemplates}
            onChange={(e) => onSettingChange('taskTemplates', e.target.checked)}
          />
        </div>
        
        {settings.autoArchive && (
          <Select
            label="Archive after"
            description="Time before completed tasks are archived"
            options={archiveTimeOptions}
            value={settings.archiveTime}
            onChange={(value) => onSettingChange('archiveTime', value)}
          />
        )}
        
        {settings.defaultDueDate && (
          <Input
            label="Default due date (days from now)"
            type="number"
            min="0"
            max="365"
            value={settings.defaultDueDays}
            onChange={(e) => onSettingChange('defaultDueDays', parseInt(e.target.value))}
            description="Number of days from creation date"
          />
        )}
      </div>
    </div>
  );
};

export default TaskDefaults;
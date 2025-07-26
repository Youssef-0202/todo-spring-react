import React from 'react';
import Select from '../../../components/ui/Select';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';

const NotificationSettings = ({ settings, onSettingChange }) => {
  const reminderTimeOptions = [
    { value: '08:00', label: '8:00 AM' },
    { value: '09:00', label: '9:00 AM' },
    { value: '10:00', label: '10:00 AM' },
    { value: '12:00', label: '12:00 PM' },
    { value: '18:00', label: '6:00 PM' },
    { value: '20:00', label: '8:00 PM' }
  ];

  const summaryFrequencyOptions = [
    { value: 'daily', label: 'Daily' },
    { value: 'weekly', label: 'Weekly' },
    { value: 'never', label: 'Never' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-6">Notification Settings</h3>
      
      <div className="space-y-6">
        <div className="space-y-4">
          <Checkbox
            label="Due date reminders"
            description="Get notified when tasks are approaching their due date"
            checked={settings.dueDateReminders}
            onChange={(e) => onSettingChange('dueDateReminders', e.target.checked)}
          />
          
          <Checkbox
            label="Daily task summary"
            description="Receive a summary of your tasks each day"
            checked={settings.dailySummary}
            onChange={(e) => onSettingChange('dailySummary', e.target.checked)}
          />
          
          <Checkbox
            label="Completion celebrations"
            description="Show celebration animations when completing tasks"
            checked={settings.completionCelebrations}
            onChange={(e) => onSettingChange('completionCelebrations', e.target.checked)}
          />
          
          <Checkbox
            label="Browser notifications"
            description="Show notifications in your browser"
            checked={settings.browserNotifications}
            onChange={(e) => onSettingChange('browserNotifications', e.target.checked)}
          />
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Reminder Time"
            description="When to send daily reminders"
            options={reminderTimeOptions}
            value={settings.reminderTime}
            onChange={(value) => onSettingChange('reminderTime', value)}
            disabled={!settings.dueDateReminders}
          />
          
          <Select
            label="Summary Frequency"
            description="How often to send task summaries"
            options={summaryFrequencyOptions}
            value={settings.summaryFrequency}
            onChange={(value) => onSettingChange('summaryFrequency', value)}
            disabled={!settings.dailySummary}
          />
        </div>
        
        <Input
          label="Reminder advance time (minutes)"
          type="number"
          min="5"
          max="1440"
          value={settings.reminderAdvanceTime}
          onChange={(e) => onSettingChange('reminderAdvanceTime', parseInt(e.target.value))}
          description="How many minutes before due date to show reminders"
          disabled={!settings.dueDateReminders}
        />
      </div>
    </div>
  );
};

export default NotificationSettings;
import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const QuickActions = ({ onQuickAction, disabled = false }) => {
  const quickActions = [
    {
      id: 'work-meeting',
      label: 'Work Meeting',
      icon: 'Users',
      template: {
        title: 'Team Meeting',
        description: 'Weekly team sync meeting',
        priority: 'medium',
        category: 'work',
        reminderEnabled: true,
        reminderTime: '15'
      }
    },
    {
      id: 'personal-reminder',
      label: 'Personal Reminder',
      icon: 'Bell',
      template: {
        title: 'Personal Reminder',
        description: 'Don\'t forget to...',
        priority: 'low',
        category: 'personal',
        reminderEnabled: true,
        reminderTime: '30'
      }
    },
    {
      id: 'shopping-list',
      label: 'Shopping Item',
      icon: 'ShoppingCart',
      template: {
        title: 'Buy groceries',
        description: 'Weekly grocery shopping',
        priority: 'medium',
        category: 'shopping',
        tags: ['groceries']
      }
    },
    {
      id: 'deadline-task',
      label: 'Deadline Task',
      icon: 'Clock',
      template: {
        title: 'Important Deadline',
        description: 'Complete before due date',
        priority: 'high',
        category: 'work',
        reminderEnabled: true,
        reminderTime: '60'
      }
    }
  ];

  return (
    <div className="p-4 sm:p-6 border-b border-border bg-surface">
      <h3 className="text-sm font-medium text-foreground mb-3">Quick Templates</h3>
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
        {quickActions.map((action) => (
          <Button
            key={action.id}
            variant="outline"
            size="sm"
            onClick={() => onQuickAction(action.template)}
            disabled={disabled}
            className="flex flex-col items-center space-y-1 h-auto py-3 text-xs"
          >
            <Icon name={action.icon} size={16} />
            <span className="text-center leading-tight">{action.label}</span>
          </Button>
        ))}
      </div>
    </div>
  );
};

export default QuickActions;
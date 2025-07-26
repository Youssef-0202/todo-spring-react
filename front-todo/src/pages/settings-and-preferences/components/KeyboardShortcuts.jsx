import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const KeyboardShortcuts = ({ settings, onSettingChange }) => {
  const [isCustomizing, setIsCustomizing] = useState(false);
  const [editingShortcut, setEditingShortcut] = useState(null);

  const defaultShortcuts = [
    {
      id: 'new-task',
      action: 'Create New Task',
      shortcut: 'Ctrl + N',
      description: 'Open the new task creation modal',
      category: 'Task Management'
    },
    {
      id: 'search',
      action: 'Search Tasks',
      shortcut: 'Ctrl + F',
      description: 'Focus on the search input field',
      category: 'Navigation'
    },
    {
      id: 'toggle-complete',
      action: 'Toggle Task Complete',
      shortcut: 'Space',
      description: 'Mark selected task as complete/incomplete',
      category: 'Task Management'
    },
    {
      id: 'delete-task',
      action: 'Delete Task',
      shortcut: 'Delete',
      description: 'Delete the selected task',
      category: 'Task Management'
    },
    {
      id: 'edit-task',
      action: 'Edit Task',
      shortcut: 'Enter',
      description: 'Open edit modal for selected task',
      category: 'Task Management'
    },
    {
      id: 'filter-all',
      action: 'Show All Tasks',
      shortcut: 'Ctrl + 1',
      description: 'Filter to show all tasks',
      category: 'Filtering'
    },
    {
      id: 'filter-active',
      action: 'Show Active Tasks',
      shortcut: 'Ctrl + 2',
      description: 'Filter to show only active tasks',
      category: 'Filtering'
    },
    {
      id: 'filter-completed',
      action: 'Show Completed Tasks',
      shortcut: 'Ctrl + 3',
      description: 'Filter to show only completed tasks',
      category: 'Filtering'
    },
    {
      id: 'settings',
      action: 'Open Settings',
      shortcut: 'Ctrl + ,',
      description: 'Open the settings panel',
      category: 'Navigation'
    },
    {
      id: 'help',
      action: 'Show Help',
      shortcut: 'F1',
      description: 'Display help and shortcuts',
      category: 'Navigation'
    }
  ];

  const groupedShortcuts = defaultShortcuts.reduce((groups, shortcut) => {
    const category = shortcut.category;
    if (!groups[category]) {
      groups[category] = [];
    }
    groups[category].push(shortcut);
    return groups;
  }, {});

  const handleShortcutEdit = (shortcutId) => {
    setEditingShortcut(shortcutId);
  };

  const handleShortcutSave = (shortcutId, newShortcut) => {
    console.log(`Saving shortcut ${shortcutId}: ${newShortcut}`);
    setEditingShortcut(null);
  };

  const resetToDefaults = () => {
    if (window.confirm('Reset all keyboard shortcuts to default values?')) {
      console.log('Resetting shortcuts to defaults');
    }
  };

  const formatShortcut = (shortcut) => {
    return shortcut.split(' + ').map((key, index, array) => (
      <span key={key}>
        <kbd className="px-2 py-1 text-xs font-semibold text-foreground bg-surface border border-border rounded">
          {key}
        </kbd>
        {index < array.length - 1 && <span className="mx-1 text-muted-foreground">+</span>}
      </span>
    ));
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-lg font-semibold text-card-foreground">Keyboard Shortcuts</h3>
        <div className="flex items-center space-x-2">
          <Checkbox
            label="Enable shortcuts"
            checked={settings.keyboardShortcuts}
            onChange={(e) => onSettingChange('keyboardShortcuts', e.target.checked)}
          />
          <Button
            variant="outline"
            size="sm"
            onClick={() => setIsCustomizing(!isCustomizing)}
            iconName="Edit"
            iconPosition="left"
            iconSize={14}
          >
            {isCustomizing ? 'Done' : 'Customize'}
          </Button>
        </div>
      </div>
      
      <div className="space-y-6">
        {/* Quick Reference */}
        <div className="bg-surface rounded-lg p-4">
          <div className="flex items-center space-x-2 mb-3">
            <Icon name="Zap" size={16} className="text-primary" />
            <span className="text-sm font-medium text-foreground">Quick Reference</span>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">New Task:</span>
              <div className="flex items-center space-x-1">
                {formatShortcut('Ctrl + N')}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Search:</span>
              <div className="flex items-center space-x-1">
                {formatShortcut('Ctrl + F')}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Toggle Complete:</span>
              <div className="flex items-center space-x-1">
                {formatShortcut('Space')}
              </div>
            </div>
            <div className="flex items-center justify-between">
              <span className="text-muted-foreground">Settings:</span>
              <div className="flex items-center space-x-1">
                {formatShortcut('Ctrl + ,')}
              </div>
            </div>
          </div>
        </div>

        {/* Detailed Shortcuts by Category */}
        {Object.entries(groupedShortcuts).map(([category, shortcuts]) => (
          <div key={category} className="space-y-3">
            <h4 className="text-sm font-medium text-foreground border-b border-border pb-2">
              {category}
            </h4>
            <div className="space-y-2">
              {shortcuts.map((shortcut) => (
                <div
                  key={shortcut.id}
                  className="flex items-center justify-between p-3 bg-surface rounded-lg hover:bg-muted transition-smooth"
                >
                  <div className="flex-1">
                    <div className="flex items-center space-x-3">
                      <span className="text-sm font-medium text-foreground">
                        {shortcut.action}
                      </span>
                      {isCustomizing && (
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => handleShortcutEdit(shortcut.id)}
                          iconName="Edit2"
                          iconSize={12}
                        />
                      )}
                    </div>
                    <p className="text-xs text-muted-foreground mt-1">
                      {shortcut.description}
                    </p>
                  </div>
                  <div className="flex items-center space-x-2">
                    {editingShortcut === shortcut.id ? (
                      <div className="flex items-center space-x-2">
                        <Input
                          type="text"
                          defaultValue={shortcut.shortcut}
                          className="w-32 text-xs"
                          onKeyDown={(e) => {
                            if (e.key === 'Enter') {
                              handleShortcutSave(shortcut.id, e.target.value);
                            } else if (e.key === 'Escape') {
                              setEditingShortcut(null);
                            }
                          }}
                          autoFocus
                        />
                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => setEditingShortcut(null)}
                          iconName="X"
                          iconSize={12}
                        />
                      </div>
                    ) : (
                      <div className="flex items-center space-x-1">
                        {formatShortcut(shortcut.shortcut)}
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}

        {/* Customization Options */}
        {isCustomizing && (
          <div className="border-t border-border pt-6">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="text-sm font-medium text-foreground">Customization</h4>
                <p className="text-xs text-muted-foreground">
                  Click the edit icon next to any shortcut to customize it
                </p>
              </div>
              <Button
                variant="outline"
                size="sm"
                onClick={resetToDefaults}
                iconName="RotateCcw"
                iconPosition="left"
                iconSize={14}
              >
                Reset to Defaults
              </Button>
            </div>
          </div>
        )}

        {/* Additional Settings */}
        <div className="space-y-4">
          <Checkbox
            label="Show shortcut hints"
            description="Display keyboard shortcut hints in tooltips"
            checked={settings.showShortcutHints}
            onChange={(e) => onSettingChange('showShortcutHints', e.target.checked)}
          />
          
          <Checkbox
            label="Global shortcuts"
            description="Enable shortcuts even when input fields are focused"
            checked={settings.globalShortcuts}
            onChange={(e) => onSettingChange('globalShortcuts', e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default KeyboardShortcuts;
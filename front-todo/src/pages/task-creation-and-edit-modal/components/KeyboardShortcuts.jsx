import React, { useState } from 'react';

import Button from '../../../components/ui/Button';

const KeyboardShortcuts = () => {
  const [isVisible, setIsVisible] = useState(false);

  const shortcuts = [
    { key: 'Ctrl + Enter', action: 'Save task' },
    { key: 'Escape', action: 'Close modal' },
    { key: 'Ctrl + Shift + H', action: 'Set high priority' },
    { key: 'Ctrl + Shift + M', action: 'Set medium priority' },
    { key: 'Ctrl + Shift + L', action: 'Set low priority' },
    { key: 'Tab', action: 'Navigate between fields' },
    { key: 'Ctrl + D', action: 'Set due date to today' },
    { key: 'Ctrl + T', action: 'Focus on tags input' }
  ];

  if (!isVisible) {
    return (
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setIsVisible(true)}
        iconName="Keyboard"
        iconPosition="left"
        iconSize={14}
        className="text-xs text-muted-foreground"
      >
        Shortcuts
      </Button>
    );
  }

  return (
    <div className="fixed bottom-4 right-4 z-50 bg-card border border-border rounded-lg shadow-elevated p-4 max-w-xs animate-fade-in">
      <div className="flex items-center justify-between mb-3">
        <h4 className="text-sm font-medium text-foreground">Keyboard Shortcuts</h4>
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setIsVisible(false)}
          iconName="X"
          iconSize={14}
        />
      </div>
      <div className="space-y-2">
        {shortcuts.map((shortcut, index) => (
          <div key={index} className="flex items-center justify-between text-xs">
            <span className="text-muted-foreground">{shortcut.action}</span>
            <kbd className="px-2 py-1 bg-muted text-muted-foreground rounded text-xs font-mono">
              {shortcut.key}
            </kbd>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeyboardShortcuts;
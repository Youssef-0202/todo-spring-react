import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TodoStats = ({ todoCounts, onClearCompleted, onToggleAll, hasActiveTodos }) => {
  const completionPercentage = todoCounts.all > 0 
    ? Math.round((todoCounts.completed / todoCounts.all) * 100) 
    : 0;

  return (
    <div className="mt-6 space-y-4">
      {/* Progress Bar */}
      {todoCounts.all > 0 && (
        <div className="bg-surface rounded-lg p-4 border border-border">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Progress</span>
            <span className="text-sm text-muted-foreground">{completionPercentage}%</span>
          </div>
          <div className="w-full bg-muted rounded-full h-2">
            <div
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${completionPercentage}%` }}
            />
          </div>
          <div className="flex items-center justify-between mt-2 text-xs text-muted-foreground">
            <span>{todoCounts.completed} completed</span>
            <span>{todoCounts.active} remaining</span>
          </div>
        </div>
      )}

      {/* Action Bar */}
      <div className="flex items-center justify-between bg-surface rounded-lg p-4 border border-border">
        <div className="flex items-center space-x-4">
          {/* Task Count */}
          <div className="flex items-center space-x-2">
            <Icon name="List" size={16} className="text-muted-foreground" />
            <span className="text-sm text-foreground">
              {todoCounts.active} {todoCounts.active === 1 ? 'task' : 'tasks'} remaining
            </span>
          </div>

          {/* Toggle All */}
          {todoCounts.all > 0 && (
            <Button
              variant="ghost"
              size="sm"
              onClick={onToggleAll}
              iconName={hasActiveTodos ? "CheckSquare" : "Square"}
              iconPosition="left"
              iconSize={14}
            >
              {hasActiveTodos ? 'Complete All' : 'Undo All'}
            </Button>
          )}
        </div>

        {/* Clear Completed */}
        {todoCounts.completed > 0 && (
          <Button
            variant="ghost"
            size="sm"
            onClick={onClearCompleted}
            className="text-destructive hover:text-destructive"
            iconName="Trash2"
            iconPosition="left"
            iconSize={14}
          >
            Clear Completed ({todoCounts.completed})
          </Button>
        )}
      </div>

      {/* Quick Stats */}
      {todoCounts.all > 0 && (
        <div className="grid grid-cols-3 gap-4">
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <div className="text-lg font-semibold text-primary">{todoCounts.all}</div>
            <div className="text-xs text-muted-foreground">Total</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <div className="text-lg font-semibold text-warning">{todoCounts.active}</div>
            <div className="text-xs text-muted-foreground">Active</div>
          </div>
          <div className="bg-card border border-border rounded-lg p-3 text-center">
            <div className="text-lg font-semibold text-success">{todoCounts.completed}</div>
            <div className="text-xs text-muted-foreground">Done</div>
          </div>
        </div>
      )}
    </div>
  );
};

export default TodoStats;
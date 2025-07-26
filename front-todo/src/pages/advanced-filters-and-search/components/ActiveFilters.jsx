import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ActiveFilters = ({ filters, onRemoveFilter, onClearAll }) => {
  const getActiveFilters = () => {
    const active = [];
    
    if (filters.status && filters.status !== 'all') {
      active.push({
        type: 'status',
        value: filters.status,
        label: filters.status.charAt(0).toUpperCase() + filters.status.slice(1),
        color: 'bg-primary/10 text-primary'
      });
    }
    
    filters.priority.forEach(priority => {
      const colors = {
        urgent: 'bg-error/10 text-error',
        high: 'bg-warning/10 text-warning',
        medium: 'bg-primary/10 text-primary',
        low: 'bg-muted text-muted-foreground'
      };
      active.push({
        type: 'priority',
        value: priority,
        label: priority.charAt(0).toUpperCase() + priority.slice(1),
        color: colors[priority] || 'bg-muted text-muted-foreground'
      });
    });
    
    filters.category.forEach(category => {
      active.push({
        type: 'category',
        value: category,
        label: category.charAt(0).toUpperCase() + category.slice(1),
        color: 'bg-accent/10 text-accent'
      });
    });
    
    if (filters.dateRange) {
      const dateLabels = {
        'today': 'Today',
        'tomorrow': 'Tomorrow',
        'this-week': 'This Week',
        'next-week': 'Next Week',
        'this-month': 'This Month',
        'overdue': 'Overdue'
      };
      active.push({
        type: 'dateRange',
        value: filters.dateRange,
        label: dateLabels[filters.dateRange] || filters.dateRange,
        color: 'bg-secondary/10 text-secondary'
      });
    }
    
    if (filters.customDateFrom || filters.customDateTo) {
      const fromDate = filters.customDateFrom ? new Date(filters.customDateFrom).toLocaleDateString() : '';
      const toDate = filters.customDateTo ? new Date(filters.customDateTo).toLocaleDateString() : '';
      let label = 'Custom Date';
      if (fromDate && toDate) {
        label = `${fromDate} - ${toDate}`;
      } else if (fromDate) {
        label = `From ${fromDate}`;
      } else if (toDate) {
        label = `Until ${toDate}`;
      }
      active.push({
        type: 'customDate',
        value: 'custom',
        label,
        color: 'bg-secondary/10 text-secondary'
      });
    }
    
    return active;
  };

  const activeFilters = getActiveFilters();

  if (activeFilters.length === 0) {
    return null;
  }

  return (
    <div className="bg-surface border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center space-x-2">
          <Icon name="Filter" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            Active Filters ({activeFilters.length})
          </span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={onClearAll}
          iconName="X"
          iconPosition="left"
          iconSize={14}
          className="text-xs"
        >
          Clear All
        </Button>
      </div>
      
      <div className="flex flex-wrap gap-2">
        {activeFilters.map((filter, index) => (
          <div
            key={`${filter.type}-${filter.value}-${index}`}
            className={`inline-flex items-center space-x-2 px-3 py-1 rounded-full text-xs font-medium ${filter.color} transition-smooth`}
          >
            <span>{filter.label}</span>
            <button
              onClick={() => onRemoveFilter(filter.type, filter.value)}
              className="hover:bg-black/10 rounded-full p-0.5 transition-smooth"
            >
              <Icon name="X" size={12} />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ActiveFilters;
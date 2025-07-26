import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';

const SortControls = ({ sortBy, sortOrder, onSortChange, resultCount }) => {
  const sortOptions = [
    { value: 'dueDate', label: 'Due Date' },
    { value: 'priority', label: 'Priority' },
    { value: 'createdDate', label: 'Created Date' },
    { value: 'alphabetical', label: 'Alphabetical' },
    { value: 'category', label: 'Category' },
    { value: 'status', label: 'Status' }
  ];

  const handleSortByChange = (value) => {
    onSortChange(value, sortOrder);
  };

  const handleSortOrderToggle = () => {
    const newOrder = sortOrder === 'asc' ? 'desc' : 'asc';
    onSortChange(sortBy, newOrder);
  };

  return (
    <div className="bg-background border border-border rounded-lg p-4">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-2">
          <Icon name="BarChart3" size={16} className="text-muted-foreground" />
          <span className="text-sm font-medium text-foreground">
            Results ({resultCount})
          </span>
        </div>
      </div>
      
      <div className="flex items-center justify-between space-x-4">
        <div className="flex-1">
          <Select
            label="Sort by"
            options={sortOptions}
            value={sortBy}
            onChange={handleSortByChange}
          />
        </div>
        
        <div className="flex items-center space-x-2">
          <span className="text-xs text-muted-foreground">Order:</span>
          <Button
            variant="outline"
            size="sm"
            onClick={handleSortOrderToggle}
            iconName={sortOrder === 'asc' ? 'ArrowUp' : 'ArrowDown'}
            iconPosition="left"
            iconSize={14}
            className="text-xs"
          >
            {sortOrder === 'asc' ? 'Ascending' : 'Descending'}
          </Button>
        </div>
      </div>
      
      <div className="mt-4 pt-4 border-t border-border">
        <div className="flex items-center justify-between text-xs text-muted-foreground">
          <span>Last updated: {new Date().toLocaleTimeString()}</span>
          <Button
            variant="ghost"
            size="sm"
            iconName="RefreshCw"
            iconSize={14}
            className="text-xs"
          >
            Refresh
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SortControls;
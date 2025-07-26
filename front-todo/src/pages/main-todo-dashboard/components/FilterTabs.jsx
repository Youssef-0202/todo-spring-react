import React from 'react';
import Icon from '../../../components/AppIcon';

const FilterTabs = ({ activeFilter, onFilterChange, todoCounts }) => {
  const filters = [
    {
      key: 'all',
      label: 'All',
      icon: 'List',
      count: todoCounts.all
    },
    {
      key: 'active',
      label: 'Active',
      icon: 'Circle',
      count: todoCounts.active
    },
    {
      key: 'completed',
      label: 'Completed',
      icon: 'CheckCircle',
      count: todoCounts.completed
    }
  ];

  return (
    <div className="mb-6">
      <div className="flex bg-surface rounded-lg p-1 border border-border">
        {filters.map((filter) => (
          <button
            key={filter.key}
            onClick={() => onFilterChange(filter.key)}
            className={`flex-1 flex items-center justify-center space-x-2 px-4 py-2 rounded-md text-sm font-medium transition-all duration-200 ${
              activeFilter === filter.key
                ? 'bg-primary text-primary-foreground shadow-soft'
                : 'text-muted-foreground hover:text-foreground hover:bg-muted'
            }`}
          >
            <Icon 
              name={filter.icon} 
              size={16} 
              className={activeFilter === filter.key ? 'text-primary-foreground' : 'text-current'}
            />
            <span>{filter.label}</span>
            {filter.count > 0 && (
              <span
                className={`px-2 py-0.5 text-xs rounded-full ${
                  activeFilter === filter.key
                    ? 'bg-primary-foreground/20 text-primary-foreground'
                    : 'bg-muted text-muted-foreground'
                }`}
              >
                {filter.count}
              </span>
            )}
          </button>
        ))}
      </div>
    </div>
  );
};

export default FilterTabs;
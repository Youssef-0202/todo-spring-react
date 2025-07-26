import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';

import { Checkbox } from '../../../components/ui/Checkbox';
import Input from '../../../components/ui/Input';

const FilterSection = ({ title, icon, isOpen, onToggle, children }) => {
  return (
    <div className="border-b border-border last:border-b-0">
      <button
        onClick={onToggle}
        className="w-full flex items-center justify-between p-4 text-left hover:bg-muted transition-smooth"
      >
        <div className="flex items-center space-x-3">
          <Icon name={icon} size={18} className="text-muted-foreground" />
          <span className="font-medium text-foreground">{title}</span>
        </div>
        <Icon 
          name={isOpen ? "ChevronUp" : "ChevronDown"} 
          size={16} 
          className="text-muted-foreground" 
        />
      </button>
      {isOpen && (
        <div className="px-4 pb-4 animate-fade-in">
          {children}
        </div>
      )}
    </div>
  );
};

const FilterPanel = ({ filters, onFiltersChange }) => {
  const [openSections, setOpenSections] = useState({
    status: true,
    priority: true,
    category: false,
    date: false
  });

  const statusOptions = [
    { value: 'all', label: 'All Tasks', count: 24 },
    { value: 'active', label: 'Active', count: 18 },
    { value: 'completed', label: 'Completed', count: 6 },
    { value: 'overdue', label: 'Overdue', count: 3 }
  ];

  const priorityOptions = [
    { value: 'urgent', label: 'Urgent', color: 'text-error', bgColor: 'bg-error/10', count: 2 },
    { value: 'high', label: 'High Priority', color: 'text-warning', bgColor: 'bg-warning/10', count: 5 },
    { value: 'medium', label: 'Medium Priority', color: 'text-primary', bgColor: 'bg-primary/10', count: 12 },
    { value: 'low', label: 'Low Priority', color: 'text-muted-foreground', bgColor: 'bg-muted', count: 5 }
  ];

  const categoryOptions = [
    { value: 'work', label: 'Work', count: 8 },
    { value: 'personal', label: 'Personal', count: 6 },
    { value: 'shopping', label: 'Shopping', count: 4 },
    { value: 'health', label: 'Health', count: 3 },
    { value: 'learning', label: 'Learning', count: 2 },
    { value: 'other', label: 'Other', count: 1 }
  ];

  const dateRangeOptions = [
    { value: 'today', label: 'Today' },
    { value: 'tomorrow', label: 'Tomorrow' },
    { value: 'this-week', label: 'This Week' },
    { value: 'next-week', label: 'Next Week' },
    { value: 'this-month', label: 'This Month' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const toggleSection = (section) => {
    setOpenSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  const handleFilterChange = (filterType, value, checked = null) => {
    let newFilters = { ...filters };
    
    if (filterType === 'status') {
      newFilters.status = value;
    } else if (filterType === 'dateRange') {
      newFilters.dateRange = value;
    } else if (Array.isArray(newFilters[filterType])) {
      if (checked !== null) {
        if (checked) {
          newFilters[filterType] = [...newFilters[filterType], value];
        } else {
          newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
        }
      }
    }
    
    onFiltersChange(newFilters);
  };

  return (
    <div className="bg-background border border-border rounded-lg overflow-hidden">
      {/* Status Filter */}
      <FilterSection
        title="Status"
        icon="CheckCircle"
        isOpen={openSections.status}
        onToggle={() => toggleSection('status')}
      >
        <div className="space-y-2">
          {statusOptions.map((option) => (
            <label key={option.value} className="flex items-center justify-between cursor-pointer">
              <div className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="status"
                  value={option.value}
                  checked={filters.status === option.value}
                  onChange={(e) => handleFilterChange('status', e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-ring"
                />
                <span className="text-sm text-foreground">{option.label}</span>
              </div>
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {option.count}
              </span>
            </label>
          ))}
        </div>
      </FilterSection>

      {/* Priority Filter */}
      <FilterSection
        title="Priority"
        icon="AlertTriangle"
        isOpen={openSections.priority}
        onToggle={() => toggleSection('priority')}
      >
        <div className="space-y-2">
          {priorityOptions.map((option) => (
            <div key={option.value} className="flex items-center justify-between">
              <Checkbox
                label={
                  <div className="flex items-center space-x-2">
                    <div className={`w-3 h-3 rounded-full ${option.bgColor}`} />
                    <span className={`text-sm ${option.color}`}>{option.label}</span>
                  </div>
                }
                checked={filters.priority.includes(option.value)}
                onChange={(e) => handleFilterChange('priority', option.value, e.target.checked)}
              />
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {option.count}
              </span>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Category Filter */}
      <FilterSection
        title="Categories"
        icon="Tag"
        isOpen={openSections.category}
        onToggle={() => toggleSection('category')}
      >
        <div className="space-y-2">
          {categoryOptions.map((option) => (
            <div key={option.value} className="flex items-center justify-between">
              <Checkbox
                label={option.label}
                checked={filters.category.includes(option.value)}
                onChange={(e) => handleFilterChange('category', option.value, e.target.checked)}
              />
              <span className="text-xs text-muted-foreground bg-muted px-2 py-1 rounded-full">
                {option.count}
              </span>
            </div>
          ))}
        </div>
      </FilterSection>

      {/* Date Range Filter */}
      <FilterSection
        title="Due Date"
        icon="Calendar"
        isOpen={openSections.date}
        onToggle={() => toggleSection('date')}
      >
        <div className="space-y-4">
          <div className="space-y-2">
            {dateRangeOptions.map((option) => (
              <label key={option.value} className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="radio"
                  name="dateRange"
                  value={option.value}
                  checked={filters.dateRange === option.value}
                  onChange={(e) => handleFilterChange('dateRange', e.target.value)}
                  className="w-4 h-4 text-primary border-border focus:ring-ring"
                />
                <span className="text-sm text-foreground">{option.label}</span>
              </label>
            ))}
          </div>
          
          <div className="pt-3 border-t border-border">
            <p className="text-xs font-medium text-foreground mb-2">Custom Date Range</p>
            <div className="grid grid-cols-1 gap-2">
              <Input
                type="date"
                placeholder="From date"
                value={filters.customDateFrom || ''}
                onChange={(e) => handleFilterChange('customDateFrom', e.target.value)}
                className="text-sm"
              />
              <Input
                type="date"
                placeholder="To date"
                value={filters.customDateTo || ''}
                onChange={(e) => handleFilterChange('customDateTo', e.target.value)}
                className="text-sm"
              />
            </div>
          </div>
        </div>
      </FilterSection>
    </div>
  );
};

export default FilterPanel;
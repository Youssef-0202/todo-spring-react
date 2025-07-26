import React, { useState, useEffect } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import { Checkbox } from './Checkbox';

const FilterSearchPanel = ({ isOpen, onClose, filters, onFiltersChange, onSearch }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [localFilters, setLocalFilters] = useState({
    priority: [],
    category: [],
    status: [],
    dateRange: '',
    tags: []
  });
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);

  const priorityOptions = [
    { value: 'urgent', label: 'Urgent', color: 'text-error' },
    { value: 'high', label: 'High Priority', color: 'text-warning' },
    { value: 'medium', label: 'Medium Priority', color: 'text-primary' },
    { value: 'low', label: 'Low Priority', color: 'text-muted-foreground' }
  ];

  const categoryOptions = [
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'health', label: 'Health' },
    { value: 'learning', label: 'Learning' },
    { value: 'other', label: 'Other' }
  ];

  const statusOptions = [
    { value: 'pending', label: 'Pending' },
    { value: 'in-progress', label: 'In Progress' },
    { value: 'completed', label: 'Completed' },
    { value: 'overdue', label: 'Overdue' }
  ];

  const dateRangeOptions = [
    { value: '', label: 'Any time' },
    { value: 'today', label: 'Today' },
    { value: 'tomorrow', label: 'Tomorrow' },
    { value: 'this-week', label: 'This week' },
    { value: 'next-week', label: 'Next week' },
    { value: 'this-month', label: 'This month' },
    { value: 'overdue', label: 'Overdue' }
  ];

  useEffect(() => {
    if (filters) {
      setLocalFilters(filters);
    }
  }, [filters]);

  const handleSearchChange = (value) => {
    setSearchQuery(value);
    onSearch?.(value);
  };

  const handleFilterChange = (filterType, value, checked = null) => {
    let newFilters = { ...localFilters };
    
    if (Array.isArray(newFilters[filterType])) {
      if (checked !== null) {
        // Checkbox handling
        if (checked) {
          newFilters[filterType] = [...newFilters[filterType], value];
        } else {
          newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
        }
      } else {
        // Toggle handling
        const index = newFilters[filterType].indexOf(value);
        if (index > -1) {
          newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
        } else {
          newFilters[filterType] = [...newFilters[filterType], value];
        }
      }
    } else {
      newFilters[filterType] = value;
    }
    
    setLocalFilters(newFilters);
    onFiltersChange?.(newFilters);
  };

  const clearAllFilters = () => {
    const clearedFilters = {
      priority: [],
      category: [],
      status: [],
      dateRange: '',
      tags: []
    };
    setLocalFilters(clearedFilters);
    setSearchQuery('');
    onFiltersChange?.(clearedFilters);
    onSearch?.('');
  };

  const getActiveFilterCount = () => {
    let count = 0;
    if (localFilters.priority.length > 0) count++;
    if (localFilters.category.length > 0) count++;
    if (localFilters.status.length > 0) count++;
    if (localFilters.dateRange) count++;
    if (localFilters.tags.length > 0) count++;
    return count;
  };

  if (!isOpen) return null;

  return (
    <>
      {/* Mobile Backdrop */}
      <div 
        className="fixed inset-0 z-backdrop bg-black/50 lg:hidden"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed top-16 right-0 bottom-0 z-panel w-full max-w-sm bg-background border-l border-border shadow-elevated lg:relative lg:top-0 lg:shadow-none animate-slide-up lg:animate-none">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} />
            <h3 className="font-semibold text-foreground">Search & Filter</h3>
            {getActiveFilterCount() > 0 && (
              <span className="px-2 py-1 text-xs bg-primary text-primary-foreground rounded-full">
                {getActiveFilterCount()}
              </span>
            )}
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            className="lg:hidden"
            iconName="X"
            iconSize={18}
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Search */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-2">
              Search Tasks
            </label>
            <div className="relative">
              <Icon 
                name="Search" 
                size={18} 
                className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
              />
              <Input
                type="search"
                placeholder="Search by title, description..."
                value={searchQuery}
                onChange={(e) => handleSearchChange(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
          
          {/* Quick Filters */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-sm font-medium text-foreground">
                Quick Filters
              </label>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
                iconName={isAdvancedOpen ? "ChevronUp" : "ChevronDown"}
                iconPosition="right"
                iconSize={16}
              >
                Advanced
              </Button>
            </div>
            
            <Select
              label="Due Date"
              options={dateRangeOptions}
              value={localFilters.dateRange}
              onChange={(value) => handleFilterChange('dateRange', value)}
              placeholder="Select date range"
            />
          </div>
          
          {/* Priority Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Priority
            </label>
            <div className="space-y-2">
              {priorityOptions.map((option) => (
                <Checkbox
                  key={option.value}
                  label={
                    <span className={option.color}>
                      {option.label}
                    </span>
                  }
                  checked={localFilters.priority.includes(option.value)}
                  onChange={(e) => handleFilterChange('priority', option.value, e.target.checked)}
                />
              ))}
            </div>
          </div>
          
          {/* Status Filter */}
          <div>
            <label className="block text-sm font-medium text-foreground mb-3">
              Status
            </label>
            <div className="space-y-2">
              {statusOptions.map((option) => (
                <Checkbox
                  key={option.value}
                  label={option.label}
                  checked={localFilters.status.includes(option.value)}
                  onChange={(e) => handleFilterChange('status', option.value, e.target.checked)}
                />
              ))}
            </div>
          </div>
          
          {/* Advanced Filters */}
          {isAdvancedOpen && (
            <div className="space-y-6 animate-fade-in">
              {/* Category Filter */}
              <div>
                <label className="block text-sm font-medium text-foreground mb-3">
                  Category
                </label>
                <div className="space-y-2">
                  {categoryOptions.map((option) => (
                    <Checkbox
                      key={option.value}
                      label={option.label}
                      checked={localFilters.category.includes(option.value)}
                      onChange={(e) => handleFilterChange('category', option.value, e.target.checked)}
                    />
                  ))}
                </div>
              </div>
              
              {/* Tags Filter */}
              <div>
                <Input
                  label="Filter by Tags"
                  type="text"
                  placeholder="Enter tags separated by commas..."
                  value={localFilters.tags.join(', ')}
                  onChange={(e) => {
                    const tags = e.target.value.split(',').map(tag => tag.trim()).filter(Boolean);
                    handleFilterChange('tags', tags);
                  }}
                  description="Separate multiple tags with commas"
                />
              </div>
            </div>
          )}
        </div>
        
        {/* Footer */}
        <div className="border-t border-border p-4">
          <div className="flex space-x-2">
            <Button
              variant="outline"
              onClick={clearAllFilters}
              className="flex-1"
              iconName="RotateCcw"
              iconPosition="left"
              iconSize={16}
            >
              Clear All
            </Button>
            <Button
              variant="default"
              onClick={onClose}
              className="flex-1 lg:hidden"
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default FilterSearchPanel;
import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import SearchBar from './SearchBar';
import FilterPanel from './FilterSection';
import ActiveFilters from './ActiveFilters';
import SortControls from './SortControls';

const MobileFilterPanel = ({ 
  isOpen, 
  onClose, 
  searchQuery, 
  onSearchChange, 
  onClearSearch,
  filters, 
  onFiltersChange,
  onRemoveFilter,
  onClearAllFilters,
  sortBy,
  sortOrder,
  onSortChange,
  resultCount
}) => {
  if (!isOpen) return null;

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-backdrop bg-black/50 animate-fade-in lg:hidden"
        onClick={onClose}
      />
      
      {/* Panel */}
      <div className="fixed inset-y-0 right-0 z-panel w-full max-w-sm bg-background shadow-elevated animate-slide-left lg:hidden">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-surface">
          <div className="flex items-center space-x-2">
            <Icon name="Filter" size={20} />
            <h2 className="text-lg font-semibold text-foreground">Filters & Search</h2>
          </div>
          <Button
            variant="ghost"
            size="icon"
            onClick={onClose}
            iconName="X"
            iconSize={20}
          />
        </div>
        
        {/* Content */}
        <div className="flex-1 overflow-y-auto p-4 space-y-6">
          {/* Search Bar */}
          <SearchBar
            searchQuery={searchQuery}
            onSearchChange={onSearchChange}
            onClearSearch={onClearSearch}
          />
          
          {/* Active Filters */}
          <ActiveFilters
            filters={filters}
            onRemoveFilter={onRemoveFilter}
            onClearAll={onClearAllFilters}
          />
          
          {/* Filter Panel */}
          <FilterPanel
            filters={filters}
            onFiltersChange={onFiltersChange}
          />
          
          {/* Sort Controls */}
          <SortControls
            sortBy={sortBy}
            sortOrder={sortOrder}
            onSortChange={onSortChange}
            resultCount={resultCount}
          />
        </div>
        
        {/* Footer */}
        <div className="border-t border-border p-4 bg-surface">
          <div className="flex space-x-3">
            <Button
              variant="outline"
              onClick={onClearAllFilters}
              className="flex-1"
              iconName="RotateCcw"
              iconPosition="left"
              iconSize={16}
            >
              Reset
            </Button>
            <Button
              variant="default"
              onClick={onClose}
              className="flex-1"
              iconName="Check"
              iconPosition="left"
              iconSize={16}
            >
              Apply Filters
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default MobileFilterPanel;
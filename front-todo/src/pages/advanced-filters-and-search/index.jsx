import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import SearchBar from './components/SearchBar';
import FilterPanel from './components/FilterSection';
import ActiveFilters from './components/ActiveFilters';
import SortControls from './components/SortControls';
import MobileFilterPanel from './components/MobileFilterPanel';

const AdvancedFiltersAndSearch = () => {
  const navigate = useNavigate();
  const [isMobileFilterOpen, setIsMobileFilterOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [filters, setFilters] = useState({
    status: 'all',
    priority: [],
    category: [],
    dateRange: '',
    customDateFrom: '',
    customDateTo: ''
  });
  const [sortBy, setSortBy] = useState('dueDate');
  const [sortOrder, setSortOrder] = useState('asc');
  const [resultCount, setResultCount] = useState(24);

  // Mock tasks data for demonstration
  const mockTasks = [
    {
      id: 1,
      title: "Complete project proposal",
      description: "Finalize the Q4 project proposal for client presentation",
      priority: "high",
      category: "work",
      status: "active",
      dueDate: "2025-07-25",
      createdDate: "2025-07-20",
      tags: ["urgent", "client"]
    },
    {
      id: 2,
      title: "Buy groceries for the week",
      description: "Get vegetables, fruits, and household essentials",
      priority: "medium",
      category: "personal",
      status: "active",
      dueDate: "2025-07-24",
      createdDate: "2025-07-22",
      tags: ["shopping", "weekly"]
    },
    {
      id: 3,
      title: "Schedule team meeting",
      description: "Organize weekly standup meeting with development team",
      priority: "low",
      category: "work",
      status: "completed",
      dueDate: "2025-07-23",
      createdDate: "2025-07-21",
      tags: ["meeting", "team"]
    },
    {
      id: 4,
      title: "Review quarterly reports",
      description: "Analyze Q3 performance metrics and prepare summary",
      priority: "urgent",
      category: "work",
      status: "overdue",
      dueDate: "2025-07-22",
      createdDate: "2025-07-18",
      tags: ["reports", "analysis"]
    }
  ];

  useEffect(() => {
    // Simulate filtering and update result count
    let filteredTasks = mockTasks;
    
    // Apply search filter
    if (searchQuery) {
      filteredTasks = filteredTasks.filter(task =>
        task.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        task.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }
    
    // Apply status filter
    if (filters.status !== 'all') {
      filteredTasks = filteredTasks.filter(task => task.status === filters.status);
    }
    
    // Apply priority filter
    if (filters.priority.length > 0) {
      filteredTasks = filteredTasks.filter(task => filters.priority.includes(task.priority));
    }
    
    // Apply category filter
    if (filters.category.length > 0) {
      filteredTasks = filteredTasks.filter(task => filters.category.includes(task.category));
    }
    
    setResultCount(filteredTasks.length);
  }, [searchQuery, filters]);

  const handleSearchChange = (query) => {
    setSearchQuery(query);
  };

  const handleClearSearch = () => {
    setSearchQuery('');
  };

  const handleFiltersChange = (newFilters) => {
    setFilters(newFilters);
  };

  const handleRemoveFilter = (filterType, value) => {
    let newFilters = { ...filters };
    
    if (filterType === 'status') {
      newFilters.status = 'all';
    } else if (filterType === 'dateRange') {
      newFilters.dateRange = '';
    } else if (filterType === 'customDate') {
      newFilters.customDateFrom = '';
      newFilters.customDateTo = '';
    } else if (Array.isArray(newFilters[filterType])) {
      newFilters[filterType] = newFilters[filterType].filter(item => item !== value);
    }
    
    setFilters(newFilters);
  };

  const handleClearAllFilters = () => {
    setFilters({
      status: 'all',
      priority: [],
      category: [],
      dateRange: '',
      customDateFrom: '',
      customDateTo: ''
    });
    setSearchQuery('');
  };

  const handleSortChange = (newSortBy, newSortOrder) => {
    setSortBy(newSortBy);
    setSortOrder(newSortOrder);
  };

  const handleBackToDashboard = () => {
    navigate('/main-todo-dashboard');
  };

  const handleCreateTask = () => {
    navigate('/task-creation-and-edit-modal');
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Mobile Header */}
      <div className="lg:hidden bg-background border-b border-border sticky top-0 z-header">
        <div className="flex items-center justify-between p-4">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="icon"
              onClick={handleBackToDashboard}
              iconName="ArrowLeft"
              iconSize={20}
            />
            <div>
              <h1 className="text-lg font-semibold text-foreground">Search & Filter</h1>
              <p className="text-sm text-muted-foreground">{resultCount} tasks found</p>
            </div>
          </div>
          <Button
            variant="outline"
            size="icon"
            onClick={() => setIsMobileFilterOpen(true)}
            iconName="Filter"
            iconSize={18}
          />
        </div>
      </div>

      <div className="flex h-screen lg:h-auto">
        {/* Desktop Sidebar */}
        <div className="hidden lg:block w-80 bg-surface border-r border-border overflow-y-auto">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <Icon name="Filter" size={20} />
                <h2 className="text-lg font-semibold text-foreground">Filters & Search</h2>
              </div>
              <Button
                variant="ghost"
                size="icon"
                onClick={handleBackToDashboard}
                iconName="X"
                iconSize={18}
              />
            </div>
            
            <SearchBar
              searchQuery={searchQuery}
              onSearchChange={handleSearchChange}
              onClearSearch={handleClearSearch}
            />
          </div>
          
          <div className="p-6 space-y-6">
            <ActiveFilters
              filters={filters}
              onRemoveFilter={handleRemoveFilter}
              onClearAll={handleClearAllFilters}
            />
            
            <FilterPanel
              filters={filters}
              onFiltersChange={handleFiltersChange}
            />
            
            <SortControls
              sortBy={sortBy}
              sortOrder={sortOrder}
              onSortChange={handleSortChange}
              resultCount={resultCount}
            />
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-1 overflow-y-auto">
          <div className="p-4 lg:p-6">
            {/* Desktop Header */}
            <div className="hidden lg:flex items-center justify-between mb-6">
              <div>
                <h1 className="text-2xl font-bold text-foreground">Search Results</h1>
                <p className="text-muted-foreground">
                  {resultCount} tasks match your current filters
                </p>
              </div>
              <Button
                variant="default"
                onClick={handleCreateTask}
                iconName="Plus"
                iconPosition="left"
                iconSize={16}
              >
                Create Task
              </Button>
            </div>

            {/* Search Results Preview */}
            <div className="space-y-4">
              {mockTasks.slice(0, Math.min(resultCount, 4)).map((task) => (
                <div
                  key={task.id}
                  className="bg-card border border-border rounded-lg p-4 hover:shadow-soft transition-smooth"
                >
                  <div className="flex items-start justify-between">
                    <div className="flex-1">
                      <div className="flex items-center space-x-2 mb-2">
                        <h3 className="font-medium text-card-foreground">{task.title}</h3>
                        <span className={`px-2 py-1 text-xs rounded-full ${
                          task.priority === 'urgent' ? 'bg-error/10 text-error' :
                          task.priority === 'high' ? 'bg-warning/10 text-warning' :
                          task.priority === 'medium'? 'bg-primary/10 text-primary' : 'bg-muted text-muted-foreground'
                        }`}>
                          {task.priority}
                        </span>
                        <span className="px-2 py-1 text-xs bg-accent/10 text-accent rounded-full">
                          {task.category}
                        </span>
                      </div>
                      <p className="text-sm text-muted-foreground mb-3">{task.description}</p>
                      <div className="flex items-center space-x-4 text-xs text-muted-foreground">
                        <div className="flex items-center space-x-1">
                          <Icon name="Calendar" size={14} />
                          <span>Due: {new Date(task.dueDate).toLocaleDateString()}</span>
                        </div>
                        <div className="flex items-center space-x-1">
                          <Icon name="Clock" size={14} />
                          <span>Created: {new Date(task.createdDate).toLocaleDateString()}</span>
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-2 py-1 text-xs rounded-full ${
                        task.status === 'completed' ? 'bg-success/10 text-success' :
                        task.status === 'overdue'? 'bg-error/10 text-error' : 'bg-primary/10 text-primary'
                      }`}>
                        {task.status}
                      </span>
                      <Button
                        variant="ghost"
                        size="icon"
                        iconName="MoreVertical"
                        iconSize={16}
                      />
                    </div>
                  </div>
                </div>
              ))}
              
              {resultCount === 0 && (
                <div className="text-center py-12">
                  <Icon name="Search" size={48} className="mx-auto text-muted-foreground mb-4" />
                  <h3 className="text-lg font-medium text-foreground mb-2">No tasks found</h3>
                  <p className="text-muted-foreground mb-4">
                    Try adjusting your search terms or filters
                  </p>
                  <Button
                    variant="outline"
                    onClick={handleClearAllFilters}
                    iconName="RotateCcw"
                    iconPosition="left"
                    iconSize={16}
                  >
                    Clear All Filters
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Mobile Filter Panel */}
      <MobileFilterPanel
        isOpen={isMobileFilterOpen}
        onClose={() => setIsMobileFilterOpen(false)}
        searchQuery={searchQuery}
        onSearchChange={handleSearchChange}
        onClearSearch={handleClearSearch}
        filters={filters}
        onFiltersChange={handleFiltersChange}
        onRemoveFilter={handleRemoveFilter}
        onClearAllFilters={handleClearAllFilters}
        sortBy={sortBy}
        sortOrder={sortOrder}
        onSortChange={handleSortChange}
        resultCount={resultCount}
      />
    </div>
  );
};

export default AdvancedFiltersAndSearch;
import React, { useState, useRef, useEffect } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';

const SearchBar = ({ searchQuery, onSearchChange, onClearSearch }) => {
  const [isAdvancedOpen, setIsAdvancedOpen] = useState(false);
  const [searchMode, setSearchMode] = useState('contains');
  const [searchField, setSearchField] = useState('all');
  const [recentSearches] = useState([
    "Complete project proposal",
    "Buy groceries",
    "Schedule meeting",
    "Review documents"
  ]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const searchRef = useRef(null);

  const searchModes = [
    { value: 'contains', label: 'Contains' },
    { value: 'starts', label: 'Starts with' },
    { value: 'exact', label: 'Exact match' }
  ];

  const searchFields = [
    { value: 'all', label: 'All fields' },
    { value: 'title', label: 'Task name only' },
    { value: 'category', label: 'Category only' },
    { value: 'notes', label: 'Notes only' }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (searchRef.current && !searchRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearchFocus = () => {
    setShowSuggestions(true);
  };

  const handleRecentSearchClick = (search) => {
    onSearchChange(search);
    setShowSuggestions(false);
  };

  const filteredSuggestions = recentSearches.filter(search =>
    search.toLowerCase().includes(searchQuery.toLowerCase()) && search !== searchQuery
  );

  return (
    <div className="space-y-4">
      {/* Main Search Bar */}
      <div className="relative" ref={searchRef}>
        <div className="relative">
          <Icon 
            name="Search" 
            size={18} 
            className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
          />
          <Input
            type="search"
            placeholder="Search tasks, categories, or notes..."
            value={searchQuery}
            onChange={(e) => onSearchChange(e.target.value)}
            onFocus={handleSearchFocus}
            className="pl-10 pr-20"
          />
          <div className="absolute right-2 top-1/2 transform -translate-y-1/2 flex items-center space-x-1">
            {searchQuery && (
              <Button
                variant="ghost"
                size="icon"
                onClick={onClearSearch}
                className="h-6 w-6"
                iconName="X"
                iconSize={14}
              />
            )}
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setIsAdvancedOpen(!isAdvancedOpen)}
              className="h-6 w-6"
              iconName="Settings"
              iconSize={14}
            />
          </div>
        </div>

        {/* Search Suggestions */}
        {showSuggestions && (searchQuery || recentSearches.length > 0) && (
          <div className="absolute top-full left-0 right-0 mt-1 bg-popover border border-border rounded-lg shadow-elevated z-dropdown max-h-64 overflow-y-auto">
            {searchQuery && filteredSuggestions.length > 0 && (
              <div className="p-2">
                <p className="text-xs font-medium text-muted-foreground mb-2 px-2">Suggestions</p>
                {filteredSuggestions.slice(0, 3).map((suggestion, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(suggestion)}
                    className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-smooth flex items-center space-x-2"
                  >
                    <Icon name="Search" size={14} className="text-muted-foreground" />
                    <span>{suggestion}</span>
                  </button>
                ))}
              </div>
            )}
            
            {!searchQuery && recentSearches.length > 0 && (
              <div className="p-2">
                <p className="text-xs font-medium text-muted-foreground mb-2 px-2">Recent Searches</p>
                {recentSearches.slice(0, 4).map((search, index) => (
                  <button
                    key={index}
                    onClick={() => handleRecentSearchClick(search)}
                    className="w-full text-left px-3 py-2 text-sm text-foreground hover:bg-muted rounded-md transition-smooth flex items-center space-x-2"
                  >
                    <Icon name="Clock" size={14} className="text-muted-foreground" />
                    <span>{search}</span>
                  </button>
                ))}
              </div>
            )}
          </div>
        )}
      </div>

      {/* Advanced Search Options */}
      {isAdvancedOpen && (
        <div className="bg-surface border border-border rounded-lg p-4 space-y-4 animate-fade-in">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-foreground">Advanced Search</h4>
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsAdvancedOpen(false)}
              iconName="ChevronUp"
              iconSize={16}
            />
          </div>
          
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-xs font-medium text-foreground mb-2">
                Search Mode
              </label>
              <div className="space-y-2">
                {searchModes.map((mode) => (
                  <label key={mode.value} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="searchMode"
                      value={mode.value}
                      checked={searchMode === mode.value}
                      onChange={(e) => setSearchMode(e.target.value)}
                      className="w-4 h-4 text-primary border-border focus:ring-ring"
                    />
                    <span className="text-sm text-foreground">{mode.label}</span>
                  </label>
                ))}
              </div>
            </div>
            
            <div>
              <label className="block text-xs font-medium text-foreground mb-2">
                Search In
              </label>
              <div className="space-y-2">
                {searchFields.map((field) => (
                  <label key={field.value} className="flex items-center space-x-2">
                    <input
                      type="radio"
                      name="searchField"
                      value={field.value}
                      checked={searchField === field.value}
                      onChange={(e) => setSearchField(e.target.value)}
                      className="w-4 h-4 text-primary border-border focus:ring-ring"
                    />
                    <span className="text-sm text-foreground">{field.label}</span>
                  </label>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default SearchBar;
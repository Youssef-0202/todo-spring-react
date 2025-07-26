import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';

const AppHeader = () => {
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);

  const toggleUserMenu = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const toggleSearch = () => {
    setIsSearchOpen(!isSearchOpen);
  };

  const handleNavigation = (path) => {
    // Navigation logic would be implemented here
    console.log(`Navigating to: ${path}`);
    setIsUserMenuOpen(false);
  };

  return (
    <header className="fixed top-0 left-0 right-0 z-header bg-background border-b border-border">
      <div className="flex items-center justify-between h-16 px-4 lg:px-6">
        {/* Logo Section */}
        <div className="flex items-center">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
              <Icon name="CheckSquare" size={20} color="white" strokeWidth={2.5} />
            </div>
            <h1 className="text-xl font-semibold text-foreground">TodoMaster</h1>
          </div>
        </div>

        {/* Navigation Items - Desktop */}
        <nav className="hidden md:flex items-center space-x-1">
          <Button
            variant="ghost"
            onClick={() => handleNavigation('/main-todo-dashboard')}
            className="text-sm font-medium"
          >
            My Tasks
          </Button>
          <Button
            variant="ghost"
            onClick={() => handleNavigation('/advanced-filters-and-search')}
            className="text-sm font-medium"
          >
            Search & Filter
          </Button>
        </nav>

        {/* Right Section */}
        <div className="flex items-center space-x-2">
          {/* Search Button */}
          <Button
            variant="ghost"
            size="icon"
            onClick={toggleSearch}
            className="relative"
            iconName="Search"
            iconSize={18}
          />

          {/* Add Task Button - Desktop */}
          <Button
            variant="default"
            onClick={() => handleNavigation('/task-creation-and-edit-modal')}
            className="hidden sm:flex"
            iconName="Plus"
            iconPosition="left"
            iconSize={16}
          >
            Add Task
          </Button>

          {/* Add Task Button - Mobile */}
          <Button
            variant="default"
            size="icon"
            onClick={() => handleNavigation('/task-creation-and-edit-modal')}
            className="sm:hidden"
            iconName="Plus"
            iconSize={18}
          />

          {/* User Menu */}
          <div className="relative">
            <Button
              variant="ghost"
              size="icon"
              onClick={toggleUserMenu}
              className="relative"
            >
              <div className="w-8 h-8 bg-secondary rounded-full flex items-center justify-center">
                <Icon name="User" size={16} color="white" />
              </div>
            </Button>

            {/* User Dropdown */}
            {isUserMenuOpen && (
              <>
                <div 
                  className="fixed inset-0 z-backdrop" 
                  onClick={() => setIsUserMenuOpen(false)}
                />
                <div className="absolute right-0 top-full mt-2 w-48 bg-popover border border-border rounded-lg shadow-elevated z-dropdown animate-fade-in">
                  <div className="py-2">
                    <div className="px-4 py-2 border-b border-border">
                      <p className="text-sm font-medium text-foreground">John Doe</p>
                      <p className="text-xs text-muted-foreground">john@example.com</p>
                    </div>
                    <button
                      onClick={() => handleNavigation('/settings-and-preferences')}
                      className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-smooth flex items-center space-x-2"
                    >
                      <Icon name="Settings" size={16} />
                      <span>Settings</span>
                    </button>
                    <button
                      onClick={() => console.log('Help clicked')}
                      className="w-full px-4 py-2 text-left text-sm text-foreground hover:bg-muted transition-smooth flex items-center space-x-2"
                    >
                      <Icon name="HelpCircle" size={16} />
                      <span>Help & Support</span>
                    </button>
                    <div className="border-t border-border mt-2 pt-2">
                      <button
                        onClick={() => console.log('Logout clicked')}
                        className="w-full px-4 py-2 text-left text-sm text-destructive hover:bg-muted transition-smooth flex items-center space-x-2"
                      >
                        <Icon name="LogOut" size={16} />
                        <span>Sign Out</span>
                      </button>
                    </div>
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Mobile Navigation */}
      <div className="md:hidden border-t border-border bg-surface">
        <nav className="flex items-center justify-around py-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation('/main-todo-dashboard')}
            className="flex flex-col items-center space-y-1 min-h-touch"
            iconName="Home"
            iconSize={18}
          >
            <span className="text-xs">Tasks</span>
          </Button>
          <Button
            variant="ghost"
            size="sm"
            onClick={() => handleNavigation('/advanced-filters-and-search')}
            className="flex flex-col items-center space-y-1 min-h-touch"
            iconName="Filter"
            iconSize={18}
          >
            <span className="text-xs">Filter</span>
          </Button>
        </nav>
      </div>

      {/* Search Overlay */}
      {isSearchOpen && (
        <>
          <div 
            className="fixed inset-0 z-backdrop bg-black/20" 
            onClick={() => setIsSearchOpen(false)}
          />
          <div className="absolute top-full left-0 right-0 z-modal bg-background border-b border-border shadow-elevated">
            <div className="p-4">
              <div className="relative">
                <Icon 
                  name="Search" 
                  size={18} 
                  className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground" 
                />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="w-full pl-10 pr-4 py-3 bg-input border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-ring focus:border-transparent transition-smooth"
                  autoFocus
                />
                <Button
                  variant="ghost"
                  size="icon"
                  onClick={() => setIsSearchOpen(false)}
                  className="absolute right-2 top-1/2 transform -translate-y-1/2"
                  iconName="X"
                  iconSize={16}
                />
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};

export default AppHeader;
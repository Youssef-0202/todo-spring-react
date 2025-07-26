import React, { useState } from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const TodoInput = ({ onAddTodo, isLoading }) => {
  const [inputValue, setInputValue] = useState('');
  const [isFocused, setIsFocused] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      onAddTodo(inputValue.trim());
      setInputValue('');
    }
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  return (
    <div className="mb-6">
      <form onSubmit={handleSubmit} className="relative">
        <div
          className={`relative bg-card border rounded-lg transition-all duration-200 ${
            isFocused ? 'border-primary shadow-elevated' : 'border-border'
          }`}
        >
          <div className="flex items-center px-4 py-3">
            <Icon
              name="Plus"
              size={20}
              className={`mr-3 transition-colors ${
                isFocused ? 'text-primary' : 'text-muted-foreground'
              }`}
            />
            <input
              type="text"
              placeholder="What needs to be done?"
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              onKeyDown={handleKeyDown}
              disabled={isLoading}
              className="flex-1 bg-transparent text-foreground placeholder-muted-foreground focus:outline-none text-base"
            />
            {inputValue.trim() && (
              <Button
                type="submit"
                variant="ghost"
                size="icon"
                loading={isLoading}
                className="ml-2 h-8 w-8"
                iconName="ArrowRight"
                iconSize={16}
              />
            )}
          </div>
        </div>
        
        {/* Quick Actions */}
        {isFocused && (
          <div className="absolute top-full left-0 right-0 mt-2 bg-card border border-border rounded-lg shadow-elevated z-10 animate-fade-in">
            <div className="p-3">
              <p className="text-xs text-muted-foreground mb-2">Quick actions:</p>
              <div className="flex flex-wrap gap-2">
                <button
                  type="button"
                  onClick={() => setInputValue(inputValue + ' #work')}
                  className="px-2 py-1 text-xs bg-purple-100 text-purple-800 rounded-md hover:bg-purple-200 transition-colors"
                >
                  #work
                </button>
                <button
                  type="button"
                  onClick={() => setInputValue(inputValue + ' #personal')}
                  className="px-2 py-1 text-xs bg-green-100 text-green-800 rounded-md hover:bg-green-200 transition-colors"
                >
                  #personal
                </button>
                <button
                  type="button"
                  onClick={() => setInputValue(inputValue + ' !high')}
                  className="px-2 py-1 text-xs bg-orange-100 text-orange-800 rounded-md hover:bg-orange-200 transition-colors"
                >
                  !high priority
                </button>
                <button
                  type="button"
                  onClick={() => {
                    const today = new Date().toISOString().split('T')[0];
                    setInputValue(inputValue + ` due:${today}`);
                  }}
                  className="px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md hover:bg-blue-200 transition-colors"
                >
                  due today
                </button>
              </div>
            </div>
          </div>
        )}
      </form>
    </div>
  );
};

export default TodoInput;
import React from 'react';
import Icon from '../../../components/AppIcon';
import Button from '../../../components/ui/Button';

const ModalHeader = ({ task, onClose, isMobile = false }) => {
  return (
    <div className={`flex items-center justify-between p-4 sm:p-6 border-b border-border bg-background ${
      isMobile ? 'sticky top-0 z-10' : ''
    }`}>
      <div className="flex items-center space-x-3">
        <div className="w-8 h-8 bg-primary rounded-lg flex items-center justify-center">
          <Icon name="Plus" size={18} color="white" strokeWidth={2.5} />
        </div>
        <div>
          <h1 className="text-lg sm:text-xl font-semibold text-foreground">
            {task ? 'Edit Task' : 'Create New Task'}
          </h1>
          <p className="text-sm text-muted-foreground">
            {task ? 'Update your task details' : 'Add a new task to your list'}
          </p>
        </div>
      </div>
      
      <Button
        variant="ghost"
        size="icon"
        onClick={onClose}
        iconName="X"
        iconSize={20}
        className="shrink-0"
      />
    </div>
  );
};

export default ModalHeader;
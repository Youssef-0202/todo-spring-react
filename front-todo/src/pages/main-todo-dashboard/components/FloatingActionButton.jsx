import React from 'react';
import Button from '../../../components/ui/Button';

const FloatingActionButton = ({ onClick }) => {
  return (
    <div className="fixed bottom-6 right-6 z-50 sm:hidden">
      <Button
        variant="default"
        size="lg"
        onClick={onClick}
        className="w-14 h-14 rounded-full shadow-elevated hover:shadow-lg transition-all duration-200 hover:scale-105"
        iconName="Plus"
        iconSize={24}
      />
    </div>
  );
};

export default FloatingActionButton;
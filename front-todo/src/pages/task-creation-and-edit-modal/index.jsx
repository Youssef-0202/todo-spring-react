import React, { useState, useEffect } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import TaskForm from './components/TaskForm';
import ModalHeader from './components/ModalHeader';
import QuickActions from './components/QuickActions';
import KeyboardShortcuts from './components/KeyboardShortcuts';

const TaskCreationAndEditModal = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const taskId = searchParams.get('id');
  const [task, setTask] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  // Mock tasks data for editing
  const mockTasks = [
    {
      id: 1,
      title: "Complete project proposal",
      description: "Finalize the Q4 project proposal with budget estimates and timeline",
      priority: "high",
      category: "work",
      dueDate: "2025-07-25T14:00:00",
      tags: ["project", "proposal", "deadline"],
      completed: false,
      reminderEnabled: true,
      reminderTime: "60",
      isRecurring: false,
      createdAt: "2025-07-20T10:00:00",
      updatedAt: "2025-07-22T15:30:00"
    },
    {
      id: 2,
      title: "Buy groceries",
      description: "Weekly grocery shopping - milk, bread, eggs, vegetables",
      priority: "medium",
      category: "shopping",
      dueDate: "2025-07-24T18:00:00",
      tags: ["groceries", "weekly"],
      completed: false,
      reminderEnabled: true,
      reminderTime: "30",
      isRecurring: true,
      createdAt: "2025-07-21T09:15:00",
      updatedAt: "2025-07-21T09:15:00"
    },
    {
      id: 3,
      title: "Morning workout",
      description: "30-minute cardio session at the gym",
      priority: "low",
      category: "health",
      dueDate: "2025-07-24T07:00:00",
      tags: ["fitness", "health", "routine"],
      completed: true,
      reminderEnabled: false,
      reminderTime: "15",
      isRecurring: true,
      createdAt: "2025-07-23T06:00:00",
      updatedAt: "2025-07-23T07:30:00"
    }
  ];

  useEffect(() => {
    // Check if mobile
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768);
    };
    
    checkMobile();
    window.addEventListener('resize', checkMobile);
    
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  useEffect(() => {
    // Load task for editing if taskId is provided
    if (taskId) {
      const foundTask = mockTasks.find(t => t.id === parseInt(taskId));
      setTask(foundTask || null);
    }
  }, [taskId]);

  useEffect(() => {
    // Keyboard shortcuts
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        handleClose();
      }
      if (e.key === 'Enter' && (e.ctrlKey || e.metaKey)) {
        e.preventDefault();
        // Trigger form submission
        const form = document.querySelector('form');
        if (form) {
          form.dispatchEvent(new Event('submit', { cancelable: true, bubbles: true }));
        }
      }
      if (e.ctrlKey && e.shiftKey) {
        switch (e.key) {
          case 'H':
            e.preventDefault();
            // Set high priority
            break;
          case 'M':
            e.preventDefault();
            // Set medium priority
            break;
          case 'L':
            e.preventDefault();
            // Set low priority
            break;
        }
      }
      if (e.ctrlKey && e.key === 'd') {
        e.preventDefault();
        // Set due date to today
      }
      if (e.ctrlKey && e.key === 't') {
        e.preventDefault();
        // Focus on tags input
        const tagsInput = document.querySelector('input[placeholder*="tag"]');
        if (tagsInput) tagsInput.focus();
      }
    };

    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, []);

  const handleClose = () => {
    navigate('/main-todo-dashboard');
  };

  const handleSave = async (taskData) => {
    setIsLoading(true);
    
    try {
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // In a real app, this would save to backend/localStorage
      console.log('Saving task:', taskData);
      
      // Show success message (in real app)
      // toast.success(task ? 'Task updated successfully!' : 'Task created successfully!');
      
      // Navigate back to dashboard
      navigate('/main-todo-dashboard');
    } catch (error) {
      console.error('Error saving task:', error);
      // Show error message (in real app)
      // toast.error('Failed to save task. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleQuickAction = (template) => {
    // Apply template to form
    setTask(prev => ({
      ...prev,
      ...template,
      id: prev?.id || null
    }));
  };

  const handleBackdropClick = (e) => {
    if (e.target === e.currentTarget) {
      handleClose();
    }
  };

  return (
    <div className="fixed inset-0 z-50 bg-background">
      {/* Mobile Full Screen Layout */}
      {isMobile ? (
        <div className="flex flex-col h-full">
          <ModalHeader 
            task={task} 
            onClose={handleClose} 
            isMobile={true}
          />
          
          <QuickActions 
            onQuickAction={handleQuickAction}
            disabled={isLoading}
          />
          
          <div className="flex-1 overflow-y-auto p-4">
            <TaskForm
              task={task}
              onSave={handleSave}
              onCancel={handleClose}
              isLoading={isLoading}
            />
          </div>
        </div>
      ) : (
        /* Desktop Modal Layout */
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/50 animate-fade-in"
            onClick={handleBackdropClick}
          />
          
          {/* Modal */}
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <div 
              className="w-full max-w-2xl bg-card rounded-lg shadow-elevated animate-scale-in max-h-[90vh] overflow-hidden"
              onClick={(e) => e.stopPropagation()}
            >
              <ModalHeader 
                task={task} 
                onClose={handleClose} 
                isMobile={false}
              />
              
              <QuickActions 
                onQuickAction={handleQuickAction}
                disabled={isLoading}
              />
              
              <div className="overflow-y-auto max-h-[calc(90vh-200px)] p-6">
                <TaskForm
                  task={task}
                  onSave={handleSave}
                  onCancel={handleClose}
                  isLoading={isLoading}
                />
              </div>
            </div>
          </div>
        </>
      )}
      
      {/* Keyboard Shortcuts Helper */}
      {!isMobile && <KeyboardShortcuts />}
    </div>
  );
};

export default TaskCreationAndEditModal;
import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import Icon from '../../components/AppIcon';
import Button from '../../components/ui/Button';
import GeneralSettings from './components/GeneralSettings';
import NotificationSettings from './components/NotificationSettings';
import TaskDefaults from './components/TaskDefaults';
import DataManagement from './components/DataManagement';
import KeyboardShortcuts from './components/KeyboardShortcuts';
import AccountSettings from './components/AccountSettings';

const SettingsAndPreferences = () => {
  const navigate = useNavigate();
  const [activeSection, setActiveSection] = useState('general');
  const [hasUnsavedChanges, setHasUnsavedChanges] = useState(false);
  const [settings, setSettings] = useState({
    // General Settings
    theme: 'light',
    language: 'en',
    defaultView: 'all',
    showTaskCount: true,
    autoSave: true,
    compactView: false,
    
    // Notification Settings
    dueDateReminders: true,
    dailySummary: false,
    completionCelebrations: true,
    browserNotifications: true,
    reminderTime: '09:00',
    summaryFrequency: 'daily',
    reminderAdvanceTime: 30,
    
    // Task Defaults
    defaultPriority: 'medium',
    defaultCategory: '',
    autoArchive: true,
    defaultDueDate: false,
    taskTemplates: false,
    archiveTime: '30',
    defaultDueDays: 1,
    
    // Data Management
    exportFormat: 'json',
    autoBackup: true,
    backupCompleted: true,
    
    // Keyboard Shortcuts
    keyboardShortcuts: true,
    showShortcutHints: true,
    globalShortcuts: false,
    
    // Account Settings
    publicProfile: false,
    shareAnalytics: true,
    emailMarketing: false
  });

  const sections = [
    {
      id: 'general',
      title: 'General',
      icon: 'Settings',
      description: 'Theme, language, and display preferences'
    },
    {
      id: 'notifications',
      title: 'Notifications',
      icon: 'Bell',
      description: 'Reminders and notification settings'
    },
    {
      id: 'tasks',
      title: 'Task Defaults',
      icon: 'CheckSquare',
      description: 'Default values for new tasks'
    },
    {
      id: 'data',
      title: 'Data Management',
      icon: 'Database',
      description: 'Export, import, and backup options'
    },
    {
      id: 'shortcuts',
      title: 'Keyboard Shortcuts',
      icon: 'Keyboard',
      description: 'Customize keyboard shortcuts'
    },
    {
      id: 'account',
      title: 'Account',
      icon: 'User',
      description: 'Profile and security settings'
    }
  ];

  useEffect(() => {
    // Load settings from localStorage on component mount
    const savedSettings = localStorage.getItem('todomaster-settings');
    if (savedSettings) {
      try {
        const parsedSettings = JSON.parse(savedSettings);
        setSettings(prev => ({ ...prev, ...parsedSettings }));
      } catch (error) {
        console.error('Error loading settings:', error);
      }
    }
  }, []);

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
    setHasUnsavedChanges(true);
  };

  const handleSaveSettings = () => {
    try {
      localStorage.setItem('todomaster-settings', JSON.stringify(settings));
      setHasUnsavedChanges(false);
      console.log('Settings saved successfully');
    } catch (error) {
      console.error('Error saving settings:', error);
    }
  };

  const handleResetSection = () => {
    if (window.confirm('Reset this section to default values?')) {
      // Reset logic would go here based on activeSection
      console.log(`Resetting ${activeSection} section`);
    }
  };

  const renderSectionContent = () => {
    switch (activeSection) {
      case 'general':
        return (
          <GeneralSettings
            settings={settings}
            onSettingChange={handleSettingChange}
          />
        );
      case 'notifications':
        return (
          <NotificationSettings
            settings={settings}
            onSettingChange={handleSettingChange}
          />
        );
      case 'tasks':
        return (
          <TaskDefaults
            settings={settings}
            onSettingChange={handleSettingChange}
          />
        );
      case 'data':
        return (
          <DataManagement
            settings={settings}
            onSettingChange={handleSettingChange}
          />
        );
      case 'shortcuts':
        return (
          <KeyboardShortcuts
            settings={settings}
            onSettingChange={handleSettingChange}
          />
        );
      case 'account':
        return (
          <AccountSettings
            settings={settings}
            onSettingChange={handleSettingChange}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-card border-b border-border sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <div className="flex items-center space-x-4">
              <Button
                variant="ghost"
                size="icon"
                onClick={() => navigate('/main-todo-dashboard')}
                iconName="ArrowLeft"
                iconSize={20}
              />
              <div>
                <h1 className="text-xl font-semibold text-card-foreground">Settings & Preferences</h1>
                <p className="text-sm text-muted-foreground">Customize your TodoMaster experience</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {hasUnsavedChanges && (
                <div className="flex items-center space-x-2 text-warning">
                  <Icon name="AlertCircle" size={16} />
                  <span className="text-sm">Unsaved changes</span>
                </div>
              )}
              <Button
                variant="outline"
                onClick={handleResetSection}
                iconName="RotateCcw"
                iconPosition="left"
                iconSize={16}
              >
                Reset Section
              </Button>
              <Button
                variant="default"
                onClick={handleSaveSettings}
                disabled={!hasUnsavedChanges}
                iconName="Save"
                iconPosition="left"
                iconSize={16}
              >
                Save Changes
              </Button>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb - Desktop Only */}
      <div className="hidden lg:block bg-surface border-b border-border">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
          <nav className="flex items-center space-x-2 text-sm">
            <button
              onClick={() => navigate('/main-todo-dashboard')}
              className="text-muted-foreground hover:text-foreground transition-smooth"
            >
              Dashboard
            </button>
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
            <span className="text-foreground font-medium">Settings</span>
            <Icon name="ChevronRight" size={14} className="text-muted-foreground" />
            <span className="text-primary font-medium">
              {sections.find(s => s.id === activeSection)?.title}
            </span>
          </nav>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="flex flex-col lg:flex-row gap-6">
          {/* Sidebar Navigation */}
          <div className="lg:w-80 space-y-2">
            <div className="bg-card rounded-lg border border-border p-4">
              <h2 className="text-sm font-medium text-card-foreground mb-3">Settings Categories</h2>
              <nav className="space-y-1">
                {sections.map((section) => (
                  <button
                    key={section.id}
                    onClick={() => setActiveSection(section.id)}
                    className={`w-full flex items-start space-x-3 p-3 text-left rounded-lg transition-smooth ${
                      activeSection === section.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon 
                      name={section.icon} 
                      size={18} 
                      className={activeSection === section.id ? 'text-primary-foreground' : 'text-muted-foreground'}
                    />
                    <div className="flex-1 min-w-0">
                      <p className="text-sm font-medium">{section.title}</p>
                      <p className={`text-xs mt-1 ${
                        activeSection === section.id 
                          ? 'text-primary-foreground/80' 
                          : 'text-muted-foreground'
                      }`}>
                        {section.description}
                      </p>
                    </div>
                  </button>
                ))}
              </nav>
            </div>

            {/* Quick Actions */}
            <div className="bg-card rounded-lg border border-border p-4">
              <h3 className="text-sm font-medium text-card-foreground mb-3">Quick Actions</h3>
              <div className="space-y-2">
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/advanced-filters-and-search')}
                  iconName="Search"
                  iconPosition="left"
                  iconSize={14}
                  fullWidth
                >
                  Search & Filter
                </Button>
                <Button
                  variant="outline"
                  size="sm"
                  onClick={() => navigate('/task-creation-and-edit-modal')}
                  iconName="Plus"
                  iconPosition="left"
                  iconSize={14}
                  fullWidth
                >
                  Create Task
                </Button>
              </div>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1">
            {renderSectionContent()}
          </div>
        </div>
      </div>

      {/* Mobile Save Button */}
      {hasUnsavedChanges && (
        <div className="fixed bottom-4 left-4 right-4 lg:hidden">
          <Button
            variant="default"
            onClick={handleSaveSettings}
            iconName="Save"
            iconPosition="left"
            iconSize={16}
            fullWidth
          >
            Save Changes
          </Button>
        </div>
      )}
    </div>
  );
};

export default SettingsAndPreferences;
import React, { useState } from 'react';
import Icon from '../AppIcon';
import Button from './Button';
import Input from './Input';
import Select from './Select';
import { Checkbox } from './Checkbox';

const SettingsPanel = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState('general');
  const [settings, setSettings] = useState({
    // General Settings
    theme: 'light',
    language: 'en',
    timezone: 'UTC',
    dateFormat: 'MM/DD/YYYY',
    
    // Notifications
    emailNotifications: true,
    pushNotifications: true,
    taskReminders: true,
    dailyDigest: false,
    reminderTime: '09:00',
    
    // Task Settings
    defaultPriority: 'medium',
    defaultCategory: '',
    autoArchive: true,
    archiveDays: 30,
    showCompletedTasks: true,
    
    // Privacy & Data
    dataBackup: true,
    analytics: false,
    shareUsageData: false,
    
    // Account
    name: 'John Doe',
    email: 'john@example.com',
    profilePicture: ''
  });
  const [isLoading, setIsLoading] = useState(false);

  const tabs = [
    { id: 'general', label: 'General', icon: 'Settings' },
    { id: 'notifications', label: 'Notifications', icon: 'Bell' },
    { id: 'tasks', label: 'Tasks', icon: 'CheckSquare' },
    { id: 'privacy', label: 'Privacy', icon: 'Shield' },
    { id: 'account', label: 'Account', icon: 'User' }
  ];

  const themeOptions = [
    { value: 'light', label: 'Light' },
    { value: 'dark', label: 'Dark' },
    { value: 'system', label: 'System' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' }
  ];

  const timezoneOptions = [
    { value: 'UTC', label: 'UTC' },
    { value: 'America/New_York', label: 'Eastern Time' },
    { value: 'America/Chicago', label: 'Central Time' },
    { value: 'America/Denver', label: 'Mountain Time' },
    { value: 'America/Los_Angeles', label: 'Pacific Time' }
  ];

  const dateFormatOptions = [
    { value: 'MM/DD/YYYY', label: 'MM/DD/YYYY' },
    { value: 'DD/MM/YYYY', label: 'DD/MM/YYYY' },
    { value: 'YYYY-MM-DD', label: 'YYYY-MM-DD' }
  ];

  const priorityOptions = [
    { value: 'low', label: 'Low' },
    { value: 'medium', label: 'Medium' },
    { value: 'high', label: 'High' },
    { value: 'urgent', label: 'Urgent' }
  ];

  const categoryOptions = [
    { value: '', label: 'None' },
    { value: 'work', label: 'Work' },
    { value: 'personal', label: 'Personal' },
    { value: 'shopping', label: 'Shopping' },
    { value: 'health', label: 'Health' },
    { value: 'learning', label: 'Learning' }
  ];

  const handleSettingChange = (key, value) => {
    setSettings(prev => ({
      ...prev,
      [key]: value
    }));
  };

  const handleSave = async () => {
    setIsLoading(true);
    try {
      // Save settings logic would go here
      await new Promise(resolve => setTimeout(resolve, 1000));
      console.log('Settings saved:', settings);
    } catch (error) {
      console.error('Error saving settings:', error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleExportData = () => {
    console.log('Exporting data...');
  };

  const handleImportData = () => {
    console.log('Importing data...');
  };

  const handleDeleteAccount = () => {
    if (window.confirm('Are you sure you want to delete your account? This action cannot be undone.')) {
      console.log('Deleting account...');
    }
  };

  if (!isOpen) return null;

  const renderTabContent = () => {
    switch (activeTab) {
      case 'general':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Theme"
                options={themeOptions}
                value={settings.theme}
                onChange={(value) => handleSettingChange('theme', value)}
              />
              <Select
                label="Language"
                options={languageOptions}
                value={settings.language}
                onChange={(value) => handleSettingChange('language', value)}
              />
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Timezone"
                options={timezoneOptions}
                value={settings.timezone}
                onChange={(value) => handleSettingChange('timezone', value)}
              />
              <Select
                label="Date Format"
                options={dateFormatOptions}
                value={settings.dateFormat}
                onChange={(value) => handleSettingChange('dateFormat', value)}
              />
            </div>
          </div>
        );

      case 'notifications':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Checkbox
                label="Email Notifications"
                description="Receive notifications via email"
                checked={settings.emailNotifications}
                onChange={(e) => handleSettingChange('emailNotifications', e.target.checked)}
              />
              <Checkbox
                label="Push Notifications"
                description="Receive push notifications in your browser"
                checked={settings.pushNotifications}
                onChange={(e) => handleSettingChange('pushNotifications', e.target.checked)}
              />
              <Checkbox
                label="Task Reminders"
                description="Get reminded about upcoming due dates"
                checked={settings.taskReminders}
                onChange={(e) => handleSettingChange('taskReminders', e.target.checked)}
              />
              <Checkbox
                label="Daily Digest"
                description="Receive a daily summary of your tasks"
                checked={settings.dailyDigest}
                onChange={(e) => handleSettingChange('dailyDigest', e.target.checked)}
              />
            </div>
            <Input
              label="Daily Reminder Time"
              type="time"
              value={settings.reminderTime}
              onChange={(e) => handleSettingChange('reminderTime', e.target.value)}
              description="When to send daily task reminders"
            />
          </div>
        );

      case 'tasks':
        return (
          <div className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <Select
                label="Default Priority"
                options={priorityOptions}
                value={settings.defaultPriority}
                onChange={(value) => handleSettingChange('defaultPriority', value)}
              />
              <Select
                label="Default Category"
                options={categoryOptions}
                value={settings.defaultCategory}
                onChange={(value) => handleSettingChange('defaultCategory', value)}
              />
            </div>
            <div className="space-y-4">
              <Checkbox
                label="Auto-archive completed tasks"
                description="Automatically archive tasks after completion"
                checked={settings.autoArchive}
                onChange={(e) => handleSettingChange('autoArchive', e.target.checked)}
              />
              {settings.autoArchive && (
                <Input
                  label="Archive after (days)"
                  type="number"
                  min="1"
                  max="365"
                  value={settings.archiveDays}
                  onChange={(e) => handleSettingChange('archiveDays', parseInt(e.target.value))}
                />
              )}
              <Checkbox
                label="Show completed tasks"
                description="Display completed tasks in the main list"
                checked={settings.showCompletedTasks}
                onChange={(e) => handleSettingChange('showCompletedTasks', e.target.checked)}
              />
            </div>
          </div>
        );

      case 'privacy':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Checkbox
                label="Data Backup"
                description="Automatically backup your data to the cloud"
                checked={settings.dataBackup}
                onChange={(e) => handleSettingChange('dataBackup', e.target.checked)}
              />
              <Checkbox
                label="Analytics"
                description="Help improve the app by sharing anonymous usage data"
                checked={settings.analytics}
                onChange={(e) => handleSettingChange('analytics', e.target.checked)}
              />
              <Checkbox
                label="Share Usage Data"
                description="Share usage statistics with third-party services"
                checked={settings.shareUsageData}
                onChange={(e) => handleSettingChange('shareUsageData', e.target.checked)}
              />
            </div>
            <div className="border-t border-border pt-6">
              <h4 className="text-sm font-medium text-foreground mb-4">Data Management</h4>
              <div className="flex flex-col sm:flex-row gap-3">
                <Button
                  variant="outline"
                  onClick={handleExportData}
                  iconName="Download"
                  iconPosition="left"
                  iconSize={16}
                >
                  Export Data
                </Button>
                <Button
                  variant="outline"
                  onClick={handleImportData}
                  iconName="Upload"
                  iconPosition="left"
                  iconSize={16}
                >
                  Import Data
                </Button>
              </div>
            </div>
          </div>
        );

      case 'account':
        return (
          <div className="space-y-6">
            <div className="space-y-4">
              <Input
                label="Full Name"
                type="text"
                value={settings.name}
                onChange={(e) => handleSettingChange('name', e.target.value)}
              />
              <Input
                label="Email Address"
                type="email"
                value={settings.email}
                onChange={(e) => handleSettingChange('email', e.target.value)}
              />
            </div>
            <div className="border-t border-border pt-6">
              <h4 className="text-sm font-medium text-foreground mb-4">Account Actions</h4>
              <div className="space-y-3">
                <Button
                  variant="outline"
                  onClick={() => console.log('Change password')}
                  iconName="Key"
                  iconPosition="left"
                  iconSize={16}
                  fullWidth
                >
                  Change Password
                </Button>
                <Button
                  variant="destructive"
                  onClick={handleDeleteAccount}
                  iconName="Trash2"
                  iconPosition="left"
                  iconSize={16}
                  fullWidth
                >
                  Delete Account
                </Button>
              </div>
            </div>
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <>
      {/* Backdrop */}
      <div 
        className="fixed inset-0 z-backdrop bg-black/50 animate-fade-in"
        onClick={onClose}
      />
      
      {/* Modal */}
      <div className="fixed inset-0 z-modal flex items-center justify-center p-4">
        <div 
          className="w-full max-w-4xl bg-card rounded-lg shadow-elevated animate-scale-in max-h-[90vh] overflow-hidden"
          onClick={(e) => e.stopPropagation()}
        >
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-border">
            <h2 className="text-lg font-semibold text-card-foreground">Settings</h2>
            <Button
              variant="ghost"
              size="icon"
              onClick={onClose}
              iconName="X"
              iconSize={20}
            />
          </div>
          
          {/* Content */}
          <div className="flex h-[calc(90vh-140px)]">
            {/* Sidebar */}
            <div className="w-64 border-r border-border bg-surface overflow-y-auto">
              <nav className="p-4 space-y-1">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`w-full flex items-center space-x-3 px-3 py-2 text-left rounded-lg transition-smooth ${
                      activeTab === tab.id
                        ? 'bg-primary text-primary-foreground'
                        : 'text-foreground hover:bg-muted'
                    }`}
                  >
                    <Icon name={tab.icon} size={18} />
                    <span className="text-sm font-medium">{tab.label}</span>
                  </button>
                ))}
              </nav>
            </div>
            
            {/* Main Content */}
            <div className="flex-1 overflow-y-auto p-6">
              {renderTabContent()}
            </div>
          </div>
          
          {/* Footer */}
          <div className="flex items-center justify-end space-x-3 p-6 border-t border-border bg-surface">
            <Button
              variant="outline"
              onClick={onClose}
              disabled={isLoading}
            >
              Cancel
            </Button>
            <Button
              variant="default"
              onClick={handleSave}
              loading={isLoading}
              iconName="Save"
              iconPosition="left"
              iconSize={16}
            >
              Save Changes
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default SettingsPanel;
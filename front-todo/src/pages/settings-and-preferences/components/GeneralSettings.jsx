import React from 'react';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';

const GeneralSettings = ({ settings, onSettingChange }) => {
  const themeOptions = [
    { value: 'light', label: 'Light Theme' },
    { value: 'dark', label: 'Dark Theme' },
    { value: 'auto', label: 'Auto (System)' }
  ];

  const languageOptions = [
    { value: 'en', label: 'English' },
    { value: 'es', label: 'Spanish' },
    { value: 'fr', label: 'French' },
    { value: 'de', label: 'German' },
    { value: 'it', label: 'Italian' }
  ];

  const defaultViewOptions = [
    { value: 'all', label: 'All Tasks' },
    { value: 'active', label: 'Active Only' },
    { value: 'today', label: 'Today\'s Tasks' }
  ];

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-6">General Settings</h3>
      
      <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Select
            label="Theme"
            description="Choose your preferred color theme"
            options={themeOptions}
            value={settings.theme}
            onChange={(value) => onSettingChange('theme', value)}
          />
          
          <Select
            label="Language"
            description="Select your preferred language"
            options={languageOptions}
            value={settings.language}
            onChange={(value) => onSettingChange('language', value)}
          />
        </div>
        
        <Select
          label="Default View"
          description="Choose which tasks to show by default"
          options={defaultViewOptions}
          value={settings.defaultView}
          onChange={(value) => onSettingChange('defaultView', value)}
        />
        
        <div className="space-y-4">
          <Checkbox
            label="Show task count in title"
            description="Display the number of active tasks in the browser title"
            checked={settings.showTaskCount}
            onChange={(e) => onSettingChange('showTaskCount', e.target.checked)}
          />
          
          <Checkbox
            label="Auto-save changes"
            description="Automatically save changes without confirmation"
            checked={settings.autoSave}
            onChange={(e) => onSettingChange('autoSave', e.target.checked)}
          />
          
          <Checkbox
            label="Compact view"
            description="Use a more compact layout to show more tasks"
            checked={settings.compactView}
            onChange={(e) => onSettingChange('compactView', e.target.checked)}
          />
        </div>
      </div>
    </div>
  );
};

export default GeneralSettings;
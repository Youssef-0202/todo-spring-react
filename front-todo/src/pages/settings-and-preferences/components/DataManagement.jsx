import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Select from '../../../components/ui/Select';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';

const DataManagement = ({ settings, onSettingChange }) => {
  const [isExporting, setIsExporting] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [showClearConfirm, setShowClearConfirm] = useState(false);

  const exportFormatOptions = [
    { value: 'json', label: 'JSON Format' },
    { value: 'csv', label: 'CSV Format' },
    { value: 'txt', label: 'Plain Text' }
  ];

  const handleExport = async (format) => {
    setIsExporting(true);
    try {
      // Mock export functionality
      await new Promise(resolve => setTimeout(resolve, 2000));
      
      const mockData = {
        tasks: [
          { id: 1, title: "Complete project proposal", completed: false, priority: "high" },
          { id: 2, title: "Review team feedback", completed: true, priority: "medium" },
          { id: 3, title: "Schedule client meeting", completed: false, priority: "urgent" }
        ],
        settings: settings,
        exportDate: new Date().toISOString()
      };
      
      const dataStr = format === 'json' 
        ? JSON.stringify(mockData, null, 2)
        : format === 'csv'
        ? "ID,Title,Completed,Priority\n1,Complete project proposal,false,high\n2,Review team feedback,true,medium\n3,Schedule client meeting,false,urgent"
        : mockData.tasks.map(task => `${task.title} - ${task.priority} - ${task.completed ? 'Done' : 'Pending'}`).join('\n');
      
      const blob = new Blob([dataStr], { type: format === 'json' ? 'application/json' : 'text/plain' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      link.download = `todomaster-export-${new Date().toISOString().split('T')[0]}.${format}`;
      link.click();
      URL.revokeObjectURL(url);
    } catch (error) {
      console.error('Export failed:', error);
    } finally {
      setIsExporting(false);
    }
  };

  const handleImport = async (event) => {
    const file = event.target.files[0];
    if (!file) return;
    
    setIsImporting(true);
    try {
      const text = await file.text();
      console.log('Imported data:', text);
      // Mock import processing
      await new Promise(resolve => setTimeout(resolve, 1500));
    } catch (error) {
      console.error('Import failed:', error);
    } finally {
      setIsImporting(false);
      event.target.value = '';
    }
  };

  const handleClearData = () => {
    if (showClearConfirm) {
      // Clear local storage
      localStorage.clear();
      setShowClearConfirm(false);
      console.log('All data cleared');
    } else {
      setShowClearConfirm(true);
    }
  };

  const getStorageUsage = () => {
    let total = 0;
    for (let key in localStorage) {
      if (localStorage.hasOwnProperty(key)) {
        total += localStorage[key].length;
      }
    }
    return (total / 1024).toFixed(2); // KB
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-6">Data Management</h3>
      
      <div className="space-y-6">
        {/* Storage Usage */}
        <div className="bg-surface rounded-lg p-4">
          <div className="flex items-center justify-between mb-2">
            <span className="text-sm font-medium text-foreground">Local Storage Usage</span>
            <span className="text-sm text-muted-foreground">{getStorageUsage()} KB</span>
          </div>
          <div className="w-full bg-border rounded-full h-2">
            <div 
              className="bg-primary h-2 rounded-full transition-all duration-300"
              style={{ width: `${Math.min((getStorageUsage() / 100) * 100, 100)}%` }}
            />
          </div>
        </div>

        {/* Export Section */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Export Data</h4>
          <Select
            label="Export Format"
            description="Choose the format for your exported data"
            options={exportFormatOptions}
            value={settings.exportFormat || 'json'}
            onChange={(value) => onSettingChange('exportFormat', value)}
          />
          
          <div className="flex flex-col sm:flex-row gap-3">
            <Button
              variant="outline"
              onClick={() => handleExport(settings.exportFormat || 'json')}
              loading={isExporting}
              iconName="Download"
              iconPosition="left"
              iconSize={16}
            >
              {isExporting ? 'Exporting...' : 'Export Tasks'}
            </Button>
            
            <Button
              variant="outline"
              onClick={() => handleExport('json')}
              iconName="Settings"
              iconPosition="left"
              iconSize={16}
            >
              Export Settings
            </Button>
          </div>
        </div>

        {/* Import Section */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Import Data</h4>
          <div className="flex items-center space-x-3">
            <input
              type="file"
              accept=".json,.csv,.txt"
              onChange={handleImport}
              className="hidden"
              id="import-file"
              disabled={isImporting}
            />
            <Button
              variant="outline"
              onClick={() => document.getElementById('import-file').click()}
              loading={isImporting}
              iconName="Upload"
              iconPosition="left"
              iconSize={16}
            >
              {isImporting ? 'Importing...' : 'Import Tasks'}
            </Button>
          </div>
          <p className="text-xs text-muted-foreground">
            Supported formats: JSON, CSV, TXT
          </p>
        </div>

        {/* Backup Settings */}
        <div className="space-y-4">
          <h4 className="text-sm font-medium text-foreground">Backup Options</h4>
          <div className="space-y-3">
            <Checkbox
              label="Auto-backup to browser storage"
              description="Automatically backup data to browser's local storage"
              checked={settings.autoBackup}
              onChange={(e) => onSettingChange('autoBackup', e.target.checked)}
            />
            
            <Checkbox
              label="Include completed tasks in backup"
              description="Include archived and completed tasks in backups"
              checked={settings.backupCompleted}
              onChange={(e) => onSettingChange('backupCompleted', e.target.checked)}
            />
          </div>
        </div>

        {/* Clear Data Section */}
        <div className="border-t border-border pt-6">
          <h4 className="text-sm font-medium text-foreground mb-4 text-destructive">Danger Zone</h4>
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-destructive mt-0.5" />
              <div className="flex-1">
                <h5 className="text-sm font-medium text-destructive mb-1">Clear All Data</h5>
                <p className="text-xs text-muted-foreground mb-3">
                  This will permanently delete all your tasks, settings, and data. This action cannot be undone.
                </p>
                <Button
                  variant={showClearConfirm ? "destructive" : "outline"}
                  size="sm"
                  onClick={handleClearData}
                  iconName={showClearConfirm ? "Trash2" : "AlertTriangle"}
                  iconPosition="left"
                  iconSize={14}
                >
                  {showClearConfirm ? 'Confirm Delete All' : 'Clear All Data'}
                </Button>
                {showClearConfirm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowClearConfirm(false)}
                    className="ml-2"
                  >
                    Cancel
                  </Button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataManagement;
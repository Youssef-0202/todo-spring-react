import React, { useState } from 'react';
import Button from '../../../components/ui/Button';
import Input from '../../../components/ui/Input';
import { Checkbox } from '../../../components/ui/Checkbox';
import Icon from '../../../components/AppIcon';
import Image from '../../../components/AppImage';

const AccountSettings = ({ settings, onSettingChange }) => {
  const [isEditingProfile, setIsEditingProfile] = useState(false);
  const [showPasswordChange, setShowPasswordChange] = useState(false);
  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [profileData, setProfileData] = useState({
    name: 'John Doe',
    email: 'john.doe@example.com',
    avatar: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150&h=150&fit=crop&crop=face'
  });
  const [passwordData, setPasswordData] = useState({
    current: '',
    new: '',
    confirm: ''
  });

  const handleProfileSave = () => {
    console.log('Saving profile:', profileData);
    setIsEditingProfile(false);
  };

  const handlePasswordChange = () => {
    if (passwordData.current !== 'password123') {
      alert('Current password is incorrect. Use: password123');
      return;
    }
    if (passwordData.new !== passwordData.confirm) {
      alert('New passwords do not match');
      return;
    }
    if (passwordData.new.length < 8) {
      alert('Password must be at least 8 characters long');
      return;
    }
    
    console.log('Password changed successfully');
    setPasswordData({ current: '', new: '', confirm: '' });
    setShowPasswordChange(false);
  };

  const handleDeleteAccount = () => {
    if (showDeleteConfirm) {
      console.log('Account deleted');
      setShowDeleteConfirm(false);
    } else {
      setShowDeleteConfirm(true);
    }
  };

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (e) => {
        setProfileData(prev => ({
          ...prev,
          avatar: e.target.result
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="bg-card rounded-lg border border-border p-6">
      <h3 className="text-lg font-semibold text-card-foreground mb-6">Account Settings</h3>
      
      <div className="space-y-6">
        {/* Profile Section */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h4 className="text-sm font-medium text-foreground">Profile Information</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setIsEditingProfile(!isEditingProfile)}
              iconName={isEditingProfile ? "X" : "Edit"}
              iconPosition="left"
              iconSize={14}
            >
              {isEditingProfile ? 'Cancel' : 'Edit'}
            </Button>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="relative">
              <div className="w-20 h-20 rounded-full overflow-hidden bg-surface border-2 border-border">
                <Image
                  src={profileData.avatar}
                  alt="Profile Avatar"
                  className="w-full h-full object-cover"
                />
              </div>
              {isEditingProfile && (
                <div className="absolute inset-0 flex items-center justify-center bg-black/50 rounded-full cursor-pointer">
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleAvatarChange}
                    className="absolute inset-0 opacity-0 cursor-pointer"
                  />
                  <Icon name="Camera" size={20} className="text-white" />
                </div>
              )}
            </div>
            
            <div className="flex-1 space-y-3">
              {isEditingProfile ? (
                <>
                  <Input
                    label="Full Name"
                    type="text"
                    value={profileData.name}
                    onChange={(e) => setProfileData(prev => ({ ...prev, name: e.target.value }))}
                  />
                  <Input
                    label="Email Address"
                    type="email"
                    value={profileData.email}
                    onChange={(e) => setProfileData(prev => ({ ...prev, email: e.target.value }))}
                  />
                  <Button
                    variant="default"
                    size="sm"
                    onClick={handleProfileSave}
                    iconName="Save"
                    iconPosition="left"
                    iconSize={14}
                  >
                    Save Changes
                  </Button>
                </>
              ) : (
                <>
                  <div>
                    <label className="text-xs text-muted-foreground">Name</label>
                    <p className="text-sm font-medium text-foreground">{profileData.name}</p>
                  </div>
                  <div>
                    <label className="text-xs text-muted-foreground">Email</label>
                    <p className="text-sm font-medium text-foreground">{profileData.email}</p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>

        {/* Password Section */}
        <div className="border-t border-border pt-6">
          <div className="flex items-center justify-between mb-4">
            <h4 className="text-sm font-medium text-foreground">Password & Security</h4>
            <Button
              variant="outline"
              size="sm"
              onClick={() => setShowPasswordChange(!showPasswordChange)}
              iconName={showPasswordChange ? "X" : "Key"}
              iconPosition="left"
              iconSize={14}
            >
              {showPasswordChange ? 'Cancel' : 'Change Password'}
            </Button>
          </div>
          
          {showPasswordChange && (
            <div className="space-y-4 bg-surface rounded-lg p-4">
              <Input
                label="Current Password"
                type="password"
                value={passwordData.current}
                onChange={(e) => setPasswordData(prev => ({ ...prev, current: e.target.value }))}
                description="Use: password123 for demo"
              />
              <Input
                label="New Password"
                type="password"
                value={passwordData.new}
                onChange={(e) => setPasswordData(prev => ({ ...prev, new: e.target.value }))}
                description="Must be at least 8 characters"
              />
              <Input
                label="Confirm New Password"
                type="password"
                value={passwordData.confirm}
                onChange={(e) => setPasswordData(prev => ({ ...prev, confirm: e.target.value }))}
              />
              <Button
                variant="default"
                onClick={handlePasswordChange}
                iconName="Save"
                iconPosition="left"
                iconSize={14}
              >
                Update Password
              </Button>
            </div>
          )}
        </div>

        {/* Privacy Settings */}
        <div className="border-t border-border pt-6">
          <h4 className="text-sm font-medium text-foreground mb-4">Privacy & Data</h4>
          <div className="space-y-3">
            <Checkbox
              label="Make profile public"
              description="Allow others to see your public profile"
              checked={settings.publicProfile}
              onChange={(e) => onSettingChange('publicProfile', e.target.checked)}
            />
            
            <Checkbox
              label="Share usage analytics"
              description="Help improve the app by sharing anonymous usage data"
              checked={settings.shareAnalytics}
              onChange={(e) => onSettingChange('shareAnalytics', e.target.checked)}
            />
            
            <Checkbox
              label="Email marketing"
              description="Receive updates and tips about productivity"
              checked={settings.emailMarketing}
              onChange={(e) => onSettingChange('emailMarketing', e.target.checked)}
            />
          </div>
        </div>

        {/* Account Actions */}
        <div className="border-t border-border pt-6">
          <h4 className="text-sm font-medium text-foreground mb-4">Account Actions</h4>
          <div className="space-y-3">
            <Button
              variant="outline"
              onClick={() => console.log('Downloading account data')}
              iconName="Download"
              iconPosition="left"
              iconSize={16}
              fullWidth
            >
              Download My Data
            </Button>
            
            <Button
              variant="outline"
              onClick={() => console.log('Deactivating account')}
              iconName="UserX"
              iconPosition="left"
              iconSize={16}
              fullWidth
            >
              Deactivate Account
            </Button>
          </div>
        </div>

        {/* Danger Zone */}
        <div className="border-t border-destructive/20 pt-6">
          <h4 className="text-sm font-medium text-destructive mb-4">Danger Zone</h4>
          <div className="bg-destructive/5 border border-destructive/20 rounded-lg p-4">
            <div className="flex items-start space-x-3">
              <Icon name="AlertTriangle" size={20} className="text-destructive mt-0.5" />
              <div className="flex-1">
                <h5 className="text-sm font-medium text-destructive mb-1">Delete Account</h5>
                <p className="text-xs text-muted-foreground mb-3">
                  Permanently delete your account and all associated data. This action cannot be undone.
                </p>
                <Button
                  variant={showDeleteConfirm ? "destructive" : "outline"}
                  size="sm"
                  onClick={handleDeleteAccount}
                  iconName={showDeleteConfirm ? "Trash2" : "AlertTriangle"}
                  iconPosition="left"
                  iconSize={14}
                >
                  {showDeleteConfirm ? 'Confirm Delete Account' : 'Delete Account'}
                </Button>
                {showDeleteConfirm && (
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowDeleteConfirm(false)}
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

export default AccountSettings;
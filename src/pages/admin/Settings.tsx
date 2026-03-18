import React, { useState, useEffect } from 'react';
import { Save, Lock, Globe, Bell, Palette, Type, LayoutTemplate } from 'lucide-react';
import { useSiteSettings } from '../../contexts/SiteSettingsContext';

export function Settings() {
  const { settings, updateSetting, isLoading } = useSiteSettings();
  const [isSaving, setIsSaving] = useState(false);
  const [localSettings, setLocalSettings] = useState<{ [key: string]: string }>({});

  useEffect(() => {
    setLocalSettings(settings);
  }, [settings]);

  const handleInputChange = (key: string, value: string) => {
    setLocalSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      for (const [key, value] of Object.entries(localSettings)) {
        if (value !== settings[key]) {
          await updateSetting(key, value);
        }
      }
      alert('Settings saved successfully!');
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save settings.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="text-white">Loading settings...</div>;
  }

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif tracking-wider text-white mb-2">Settings</h1>
          <p className="text-white/50">Manage website configuration and UI preferences</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-white text-black px-6 py-2.5 rounded-xl font-medium flex items-center hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Saving...' : 'Save Settings'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#141414] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-medium text-white mb-4 flex items-center">
              <Globe className="w-5 h-5 mr-3 text-white/40" />
              General Information
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Store Name</label>
                <input
                  type="text"
                  value={localSettings.store_name || 'Kala Sanskriti'}
                  onChange={e => handleInputChange('store_name', e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">WhatsApp Number</label>
                <input
                  type="text"
                  value={localSettings.whatsapp_number || '+91 90000 89610'}
                  onChange={e => handleInputChange('whatsapp_number', e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Store Address</label>
                <textarea
                  value={localSettings.store_address || '123 Textile Market, Hyderabad, Telangana'}
                  onChange={e => handleInputChange('store_address', e.target.value)}
                  rows={3}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30 resize-none"
                />
              </div>
            </div>
          </div>

          <div className="bg-[#141414] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-medium text-white mb-4 flex items-center">
              <Palette className="w-5 h-5 mr-3 text-white/40" />
              UI Customization
            </h2>
            <div className="space-y-6">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-white/60 mb-2">Primary Color (Hex)</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={localSettings.primary_color || '#ffffff'}
                      onChange={e => handleInputChange('primary_color', e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0"
                    />
                    <input
                      type="text"
                      value={localSettings.primary_color || '#ffffff'}
                      onChange={e => handleInputChange('primary_color', e.target.value)}
                      className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>
                <div>
                  <label className="block text-sm text-white/60 mb-2">Background Color (Hex)</label>
                  <div className="flex items-center space-x-2">
                    <input
                      type="color"
                      value={localSettings.bg_color || '#0a0a0a'}
                      onChange={e => handleInputChange('bg_color', e.target.value)}
                      className="w-10 h-10 rounded cursor-pointer bg-transparent border-0 p-0"
                    />
                    <input
                      type="text"
                      value={localSettings.bg_color || '#0a0a0a'}
                      onChange={e => handleInputChange('bg_color', e.target.value)}
                      className="flex-1 bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                </div>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2 flex items-center">
                  <Type className="w-4 h-4 mr-2" />
                  Primary Font Family
                </label>
                <select
                  value={localSettings.font_family || 'Inter'}
                  onChange={e => handleInputChange('font_family', e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30"
                >
                  <option value="Inter">Inter (Sans-serif)</option>
                  <option value="Playfair Display">Playfair Display (Serif)</option>
                  <option value="Roboto">Roboto</option>
                  <option value="Cormorant Garamond">Cormorant Garamond</option>
                </select>
              </div>

              <div>
                <label className="block text-sm text-white/60 mb-2 flex items-center">
                  <LayoutTemplate className="w-4 h-4 mr-2" />
                  Button Style
                </label>
                <select
                  value={localSettings.button_style || 'rounded'}
                  onChange={e => handleInputChange('button_style', e.target.value)}
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30"
                >
                  <option value="rounded">Rounded (Modern)</option>
                  <option value="pill">Pill (Soft)</option>
                  <option value="square">Square (Sharp)</option>
                </select>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#141414] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-medium text-white mb-4 flex items-center">
              <Bell className="w-5 h-5 mr-3 text-white/40" />
              Notifications
            </h2>
            <div className="space-y-4">
              <div className="flex items-center justify-between p-3 bg-black/50 border border-white/5 rounded-lg cursor-pointer" onClick={() => handleInputChange('email_alerts', localSettings.email_alerts === 'true' ? 'false' : 'true')}>
                <div>
                  <p className="text-sm text-white font-medium">Email Alerts</p>
                  <p className="text-xs text-white/40 mt-0.5">Receive new inquiry emails</p>
                </div>
                <div className={`w-10 h-5 rounded-full flex items-center px-1 transition-colors ${localSettings.email_alerts === 'true' ? 'bg-emerald-500/20' : 'bg-white/10'}`}>
                  <div className={`w-3 h-3 rounded-full transition-transform ${localSettings.email_alerts === 'true' ? 'bg-emerald-500 translate-x-5' : 'bg-white/40'}`}></div>
                </div>
              </div>
              <div className="flex items-center justify-between p-3 bg-black/50 border border-white/5 rounded-lg cursor-pointer" onClick={() => handleInputChange('whatsapp_alerts', localSettings.whatsapp_alerts === 'true' ? 'false' : 'true')}>
                <div>
                  <p className="text-sm text-white font-medium">WhatsApp Alerts</p>
                  <p className="text-xs text-white/40 mt-0.5">Receive notifications on WhatsApp</p>
                </div>
                <div className={`w-10 h-5 rounded-full flex items-center px-1 transition-colors ${localSettings.whatsapp_alerts === 'true' ? 'bg-emerald-500/20' : 'bg-white/10'}`}>
                  <div className={`w-3 h-3 rounded-full transition-transform ${localSettings.whatsapp_alerts === 'true' ? 'bg-emerald-500 translate-x-5' : 'bg-white/40'}`}></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

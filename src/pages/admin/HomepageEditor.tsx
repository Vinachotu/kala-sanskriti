import React, { useState, useRef } from 'react';
import { Save, Image as ImageIcon, Type, LayoutTemplate, UploadCloud } from 'lucide-react';
import { useSiteSettings } from '../../contexts/SiteSettingsContext';
import { supabase } from '../../lib/supabase';

export function HomepageEditor() {
  const { settings, updateSetting, isLoading: isSettingsLoading } = useSiteSettings();
  const [isSaving, setIsSaving] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const [uploadingKey, setUploadingKey] = useState<string | null>(null);

  // Local state for form inputs
  const [localSettings, setLocalSettings] = useState<{ [key: string]: string }>({});

  // Sync local state with context when context loads
  React.useEffect(() => {
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
      alert('Changes published successfully!');
    } catch (error) {
      console.error('Failed to save settings:', error);
      alert('Failed to save changes.');
    } finally {
      setIsSaving(false);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>, key: string) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setUploadingKey(key);
    try {
      const file = e.target.files[0];
      const fileExt = file.name.split('.').pop();
      const fileName = `${Math.random()}.${fileExt}`;
      const filePath = `${fileName}`;

      const { error: uploadError } = await supabase.storage
        .from('website-banners')
        .upload(filePath, file);

      if (uploadError) throw uploadError;

      const { data } = supabase.storage
        .from('website-banners')
        .getPublicUrl(filePath);

      handleInputChange(key, data.publicUrl);
    } catch (error) {
      console.error('Failed to upload image:', error);
      alert('Failed to upload image.');
    } finally {
      setUploadingKey(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  if (isSettingsLoading) {
    return <div className="text-white">Loading settings...</div>;
  }

  const imageSettings = [
    { key: 'hero_image_1', label: 'Hero Banner 1', default: 'https://i.postimg.cc/dtvGhdyn/complete-banner.png' },
    { key: 'hero_image_2', label: 'Hero Banner 2', default: 'https://i.postimg.cc/9FqYtBfF/MC.png' },
    { key: 'hero_image_3', label: 'Hero Banner 3', default: 'https://i.postimg.cc/mDVKPnNP/sarees_2.png' },
    { key: 'matching_center_hero', label: 'Matching Center Hero', default: 'https://i.postimg.cc/zGjpN8VV/Untitled.png' },
    { key: 'sarees_hero', label: 'Sarees Hero', default: 'https://i.postimg.cc/kMfq7xNp/SAREE-FALLS-2.png' },
    { key: 'tailoring_hero', label: 'Tailoring Hero', default: 'https://i.postimg.cc/J4Wq12mm/tailoring-material-4.png' },
    { key: 'readymade_hero', label: 'Readymade Hero', default: 'https://i.postimg.cc/hG1ncWcv/FANCY-BLOUSE.png' },
  ];

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif tracking-wider text-white mb-2">Website Editor</h1>
          <p className="text-white/50">Edit banners, text, and promotional sections across the site</p>
        </div>
        <button 
          onClick={handleSave}
          disabled={isSaving}
          className="bg-white text-black px-6 py-2.5 rounded-xl font-medium flex items-center hover:bg-white/90 transition-colors disabled:opacity-50"
        >
          <Save className="w-4 h-4 mr-2" />
          {isSaving ? 'Publishing...' : 'Publish Changes'}
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="bg-[#141414] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-medium text-white mb-4 flex items-center">
              <ImageIcon className="w-5 h-5 mr-3 text-white/40" />
              Website Images & Banners
            </h2>
            <div className="space-y-6">
              {imageSettings.map((setting) => (
                <div key={setting.key} className="flex items-center space-x-4">
                  <div className="w-32 h-16 bg-white/5 rounded-lg border border-white/10 flex items-center justify-center overflow-hidden">
                    {localSettings[setting.key] || setting.default ? (
                      <img src={localSettings[setting.key] || setting.default} alt={setting.label} className="w-full h-full object-cover" />
                    ) : (
                      <span className="text-xs text-white/40">{setting.label}</span>
                    )}
                  </div>
                  <div className="flex-1">
                    <label className="block text-xs text-white/60 mb-1">{setting.label}</label>
                    <input
                      type="text"
                      value={localSettings[setting.key] || ''}
                      onChange={(e) => handleInputChange(setting.key, e.target.value)}
                      placeholder={setting.default}
                      className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
                    />
                  </div>
                  <div className="relative">
                    <input
                      type="file"
                      id={`file-${setting.key}`}
                      className="hidden"
                      accept="image/*"
                      onChange={(e) => handleImageUpload(e, setting.key)}
                    />
                    <label 
                      htmlFor={`file-${setting.key}`}
                      className={`bg-white/5 hover:bg-white/10 text-white px-4 py-2 rounded-lg text-sm transition-colors border border-white/5 cursor-pointer flex items-center ${uploadingKey === setting.key ? 'opacity-50 pointer-events-none' : ''}`}
                    >
                      <UploadCloud className="w-4 h-4 mr-2" />
                      {uploadingKey === setting.key ? 'Uploading...' : 'Upload'}
                    </label>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div className="bg-[#141414] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-medium text-white mb-4 flex items-center">
              <Type className="w-5 h-5 mr-3 text-white/40" />
              Homepage Text
            </h2>
            <div className="space-y-4">
              <div>
                <label className="block text-sm text-white/60 mb-2">Main Heading</label>
                <input
                  type="text"
                  value={localSettings['home_main_heading'] || ''}
                  onChange={(e) => handleInputChange('home_main_heading', e.target.value)}
                  placeholder="Kala Sanskriti"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30"
                />
              </div>
              <div>
                <label className="block text-sm text-white/60 mb-2">Subheading</label>
                <input
                  type="text"
                  value={localSettings['home_sub_heading'] || ''}
                  onChange={(e) => handleInputChange('home_sub_heading', e.target.value)}
                  placeholder="Premium Textiles & Garments"
                  className="w-full bg-black/50 border border-white/10 rounded-lg px-4 py-2 text-sm text-white focus:outline-none focus:border-white/30"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="bg-[#141414] border border-white/5 rounded-2xl p-6">
            <h2 className="text-lg font-medium text-white mb-4 flex items-center">
              <LayoutTemplate className="w-5 h-5 mr-3 text-white/40" />
              Featured Sections
            </h2>
            <div className="space-y-3">
              {['Saree Petticoats', 'Readymade Garments', 'Tailoring Materials'].map((section, i) => (
                <div key={i} className="flex items-center justify-between p-3 bg-black/50 border border-white/5 rounded-lg">
                  <span className="text-sm text-white">{section}</span>
                  <div className="w-10 h-5 bg-emerald-500/20 rounded-full flex items-center px-1">
                    <div className="w-3 h-3 bg-emerald-500 rounded-full translate-x-5"></div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

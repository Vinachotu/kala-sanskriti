import React, { useState, useEffect, useRef } from 'react';
import { UploadCloud, Image as ImageIcon, Trash2 } from 'lucide-react';
import { supabase } from '../../lib/supabase';

export function Images() {
  const [images, setImages] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    fetchImages();
  }, []);

  const fetchImages = async () => {
    try {
      const { data, error } = await supabase.storage
        .from('product-images')
        .list();

      if (error) throw error;

      if (data) {
        const urls = data.map(file => {
          const { data: publicUrlData } = supabase.storage
            .from('product-images')
            .getPublicUrl(file.name);
          return publicUrlData.publicUrl;
        });
        setImages(urls);
      }
    } catch (error) {
      console.error('Failed to fetch images:', error);
    }
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.files || e.target.files.length === 0) return;
    
    setIsLoading(true);
    const uploadedUrls: string[] = [];

    try {
      for (let i = 0; i < e.target.files.length; i++) {
        const file = e.target.files[i];
        const fileExt = file.name.split('.').pop();
        const fileName = `${Math.random()}.${fileExt}`;
        const filePath = `${fileName}`;

        const { error: uploadError } = await supabase.storage
          .from('product-images')
          .upload(filePath, file);

        if (uploadError) throw uploadError;

        const { data } = supabase.storage
          .from('product-images')
          .getPublicUrl(filePath);

        uploadedUrls.push(data.publicUrl);
      }
      
      setImages(prev => [...uploadedUrls, ...prev]);
    } catch (error) {
      console.error('Failed to upload images:', error);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) {
        fileInputRef.current.value = '';
      }
    }
  };

  const handleDeleteImage = async (url: string) => {
    if (!window.confirm('Are you sure you want to delete this image?')) return;
    
    try {
      const filename = url.split('/').pop();
      if (!filename) return;

      const { error } = await supabase.storage
        .from('product-images')
        .remove([filename]);

      if (error) throw error;

      setImages(prev => prev.filter(img => img !== url));
    } catch (error) {
      console.error('Failed to delete image:', error);
    }
  };

  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif tracking-wider text-white mb-2">Image Manager</h1>
          <p className="text-white/50">Upload and manage product images</p>
        </div>
      </div>

      <div 
        onClick={() => fileInputRef.current?.click()}
        className={`bg-[#141414] border border-white/5 rounded-2xl p-8 text-center border-dashed border-2 hover:border-white/20 transition-colors cursor-pointer ${isLoading ? 'opacity-50 pointer-events-none' : ''}`}
      >
        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mx-auto mb-4 border border-white/10">
          <UploadCloud className="w-8 h-8 text-white/60" />
        </div>
        <h2 className="text-lg font-medium text-white mb-2">
          {isLoading ? 'Uploading...' : 'Click or drag images to upload'}
        </h2>
        <p className="text-sm text-white/40 max-w-sm mx-auto">
          Images will be automatically optimized for fast website loading. Supported formats: JPG, PNG, WebP.
        </p>
        <input
          type="file"
          ref={fileInputRef}
          onChange={handleImageUpload}
          multiple
          accept="image/*"
          className="hidden"
        />
      </div>

      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {images.length === 0 ? (
          <div className="col-span-full text-center text-white/40 py-8">
            No images found. Upload some images to see them here.
          </div>
        ) : (
          images.map((img, i) => (
            <div key={i} className="relative aspect-square rounded-xl overflow-hidden group bg-white/5 border border-white/10">
              <img src={img} alt={`Gallery ${i}`} className="w-full h-full object-cover" />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center space-x-3">
                <a href={img} target="_blank" rel="noopener noreferrer" className="bg-white/10 hover:bg-white/20 text-white p-2 rounded-lg transition-colors">
                  <ImageIcon className="w-4 h-4" />
                </a>
                <button 
                  onClick={(e) => { e.stopPropagation(); handleDeleteImage(img); }}
                  className="bg-white/10 hover:bg-red-500/80 text-white p-2 rounded-lg transition-colors"
                >
                  <Trash2 className="w-4 h-4" />
                </button>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
}

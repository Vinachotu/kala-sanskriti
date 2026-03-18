import React from 'react';
import { Plus, Edit2, Trash2, Search } from 'lucide-react';

export function Colors() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif tracking-wider text-white mb-2">Color Management</h1>
          <p className="text-white/50">Manage 300 universal fabric colors</p>
        </div>
        <button className="bg-white text-black px-6 py-2.5 rounded-xl font-medium flex items-center hover:bg-white/90 transition-colors">
          <Plus className="w-4 h-4 mr-2" />
          Add Color
        </button>
      </div>

      <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search colors..."
              className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
            />
          </div>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4 p-6">
          {[
            { name: 'Red', hex: '#FF0000' },
            { name: 'Maroon', hex: '#800000' },
            { name: 'Navy Blue', hex: '#000080' },
            { name: 'Royal Blue', hex: '#4169E1' },
            { name: 'Emerald Green', hex: '#50C878' },
            { name: 'Mustard Yellow', hex: '#FFDB58' },
            { name: 'Rani Pink', hex: '#E63E62' },
            { name: 'Black', hex: '#000000' },
          ].map((color, i) => (
            <div key={i} className="bg-black/50 border border-white/5 rounded-xl p-4 flex flex-col items-center group hover:border-white/20 transition-colors">
              <div
                className="w-16 h-16 rounded-full mb-3 shadow-inner border border-white/10"
                style={{ backgroundColor: color.hex }}
              />
              <p className="text-sm font-medium text-white text-center">{color.name}</p>
              <p className="text-xs text-white/40 mt-1">{color.hex}</p>
              
              <div className="flex space-x-2 mt-4 opacity-0 group-hover:opacity-100 transition-opacity">
                <button className="text-white/40 hover:text-white p-1.5 transition-colors">
                  <Edit2 className="w-3.5 h-3.5" />
                </button>
                <button className="text-white/40 hover:text-red-400 p-1.5 transition-colors">
                  <Trash2 className="w-3.5 h-3.5" />
                </button>
              </div>
            </div>
          ))}
          
          <div className="bg-white/5 border border-white/10 border-dashed rounded-xl p-4 flex flex-col items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-colors cursor-pointer">
            <Plus className="w-8 h-8 mb-2" />
            <p className="text-sm font-medium">Add More</p>
          </div>
        </div>
      </div>
    </div>
  );
}

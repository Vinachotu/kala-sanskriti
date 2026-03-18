import React from 'react';
import { IndianRupee, Save, Search } from 'lucide-react';

export function Prices() {
  return (
    <div className="space-y-8">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-serif tracking-wider text-white mb-2">Price Editor</h1>
          <p className="text-white/50">Easily change product prices and set offers</p>
        </div>
        <button className="bg-white text-black px-6 py-2.5 rounded-xl font-medium flex items-center hover:bg-white/90 transition-colors">
          <Save className="w-4 h-4 mr-2" />
          Save Changes
        </button>
      </div>

      <div className="bg-[#141414] border border-white/5 rounded-2xl overflow-hidden">
        <div className="p-4 border-b border-white/5 flex items-center justify-between">
          <div className="relative w-64">
            <Search className="w-4 h-4 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
            <input
              type="text"
              placeholder="Search products..."
              className="w-full bg-black/50 border border-white/10 rounded-lg pl-10 pr-4 py-2 text-sm text-white placeholder:text-white/30 focus:outline-none focus:border-white/30"
            />
          </div>
        </div>

        <table className="w-full text-left text-sm text-white/70">
          <thead className="bg-white/5 text-white/40 uppercase text-xs tracking-wider">
            <tr>
              <th className="px-6 py-4 font-medium">Product Name</th>
              <th className="px-6 py-4 font-medium">Regular Price (₹)</th>
              <th className="px-6 py-4 font-medium">Offer Price (₹)</th>
              <th className="px-6 py-4 font-medium">Discount (%)</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/5">
            {[
              { name: 'Casement Petticoat', price: '60' },
              { name: 'Regular Petticoat', price: '85' },
              { name: 'Heavy Quality Petticoat', price: '95' },
              { name: 'XXL Petticoat', price: '125' },
              { name: 'Chilli Petticoat', price: '150' },
            ].map((product, i) => (
              <tr key={i} className="hover:bg-white/[0.02] transition-colors">
                <td className="px-6 py-4 font-medium text-white">{product.name}</td>
                <td className="px-6 py-4">
                  <div className="relative">
                    <IndianRupee className="w-3 h-3 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      defaultValue={product.price}
                      className="w-24 bg-black/50 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <div className="relative">
                    <IndianRupee className="w-3 h-3 text-white/40 absolute left-3 top-1/2 -translate-y-1/2" />
                    <input
                      type="number"
                      placeholder="Optional"
                      className="w-24 bg-black/50 border border-white/10 rounded-lg pl-8 pr-3 py-1.5 text-sm text-white focus:outline-none focus:border-white/30"
                    />
                  </div>
                </td>
                <td className="px-6 py-4">
                  <input
                    type="number"
                    placeholder="0"
                    className="w-16 bg-black/50 border border-white/10 rounded-lg px-3 py-1.5 text-sm text-white focus:outline-none focus:border-white/30"
                    disabled
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

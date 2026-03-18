import React, { useEffect, useState } from 'react';
import { Package, Tags, Palette, MessageSquare } from 'lucide-react';
import { supabase } from '../../lib/supabase';
import { Link } from 'react-router-dom';

export function Dashboard() {
  const [stats, setStats] = useState({
    products: 0,
    categories: 0,
    colors: 300, // Static for now, or could be fetched if there's a colors table
    inquiries: 24 // Static for now, or could be fetched if there's an inquiries table
  });

  useEffect(() => {
    const fetchStats = async () => {
      try {
        const { count: productsCount } = await supabase
          .from('products')
          .select('*', { count: 'exact', head: true });

        const { count: categoriesCount } = await supabase
          .from('categories')
          .select('*', { count: 'exact', head: true });

        setStats(prev => ({
          ...prev,
          products: productsCount || 0,
          categories: categoriesCount || 0
        }));
      } catch (error) {
        console.error('Error fetching stats:', error);
      }
    };

    fetchStats();
  }, []);

  const statCards = [
    { label: 'Total Products', value: stats.products.toString(), icon: Package, color: 'text-blue-400', bg: 'bg-blue-400/10' },
    { label: 'Categories', value: stats.categories.toString(), icon: Tags, color: 'text-purple-400', bg: 'bg-purple-400/10' },
    { label: 'Fabric Colors', value: stats.colors.toString(), icon: Palette, color: 'text-emerald-400', bg: 'bg-emerald-400/10' },
    { label: 'New Inquiries', value: stats.inquiries.toString(), icon: MessageSquare, color: 'text-amber-400', bg: 'bg-amber-400/10' },
  ];

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-3xl font-serif tracking-wider text-white mb-2">Dashboard Overview</h1>
        <p className="text-white/50">Welcome back to the Kala Sanskriti admin panel.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {statCards.map((stat) => (
          <div key={stat.label} className="bg-[#141414] border border-white/5 rounded-2xl p-6 flex items-center">
            <div className={`w-12 h-12 rounded-xl flex items-center justify-center mr-4 ${stat.bg}`}>
              <stat.icon className={`w-6 h-6 ${stat.color}`} />
            </div>
            <div>
              <p className="text-white/50 text-sm">{stat.label}</p>
              <p className="text-2xl font-serif text-white">{stat.value}</p>
            </div>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        <div className="bg-[#141414] border border-white/5 rounded-2xl p-6">
          <h2 className="text-lg font-medium text-white mb-4">Recent Inquiries</h2>
          <div className="space-y-4">
            {[1, 2, 3].map((i) => (
              <div key={i} className="flex items-center justify-between py-3 border-b border-white/5 last:border-0">
                <div>
                  <p className="text-white text-sm">Customer Inquiry #{1000 + i}</p>
                  <p className="text-white/40 text-xs mt-1">Interested in Premium Saree Petticoats</p>
                </div>
                <span className="text-xs text-white/40">2 hours ago</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-[#141414] border border-white/5 rounded-2xl p-6">
          <h2 className="text-lg font-medium text-white mb-4">Quick Actions</h2>
          <div className="grid grid-cols-2 gap-4">
            <Link to="/admin/products" className="bg-white/5 hover:bg-white/10 text-white text-sm py-3 rounded-xl transition-colors border border-white/5 text-center block">
              Add New Product
            </Link>
            <Link to="/admin/prices" className="bg-white/5 hover:bg-white/10 text-white text-sm py-3 rounded-xl transition-colors border border-white/5 text-center block">
              Update Prices
            </Link>
            <Link to="/admin/colors" className="bg-white/5 hover:bg-white/10 text-white text-sm py-3 rounded-xl transition-colors border border-white/5 text-center block">
              Manage Colors
            </Link>
            <Link to="/admin/homepage" className="bg-white/5 hover:bg-white/10 text-white text-sm py-3 rounded-xl transition-colors border border-white/5 text-center block">
              Edit Homepage
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

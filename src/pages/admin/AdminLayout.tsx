import React from 'react';
import { Outlet, NavLink, useNavigate, Navigate } from 'react-router-dom';
import { useAdminAuth } from '../../contexts/AdminAuthContext';
import { 
  LayoutDashboard, 
  Package, 
  Tags, 
  Palette, 
  Image as ImageIcon, 
  IndianRupee, 
  LayoutTemplate, 
  MessageSquare, 
  Settings, 
  LogOut 
} from 'lucide-react';

const navItems = [
  { path: '/admin/dashboard', icon: LayoutDashboard, label: 'Dashboard' },
  { path: '/admin/products', icon: Package, label: 'Products' },
  { path: '/admin/categories', icon: Tags, label: 'Categories' },
  { path: '/admin/colors', icon: Palette, label: 'Colors' },
  { path: '/admin/images', icon: ImageIcon, label: 'Images' },
  { path: '/admin/prices', icon: IndianRupee, label: 'Prices' },
  { path: '/admin/homepage', icon: LayoutTemplate, label: 'Homepage Editor' },
  { path: '/admin/inquiries', icon: MessageSquare, label: 'Customer Inquiries' },
  { path: '/admin/settings', icon: Settings, label: 'Settings' },
];

export function AdminLayout() {
  const { isAuthenticated, logout } = useAdminAuth();
  const navigate = useNavigate();

  if (!isAuthenticated) {
    return <Navigate to="/admin-access" replace />;
  }

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white flex">
      {/* Sidebar */}
      <aside className="w-64 bg-[#141414] border-r border-white/5 flex flex-col h-screen sticky top-0">
        <div className="p-6 border-b border-white/5">
          <h1 className="font-serif text-xl uppercase tracking-widest text-white">Kala Admin</h1>
          <p className="text-xs text-white/40 mt-1">Control Panel</p>
        </div>

        <nav className="flex-1 overflow-y-auto py-4">
          <ul className="space-y-1 px-3">
            {navItems.map((item) => (
              <li key={item.path}>
                <NavLink
                  to={item.path}
                  className={({ isActive }) =>
                    `flex items-center px-3 py-2.5 rounded-lg text-sm transition-colors ${
                      isActive
                        ? 'bg-white/10 text-white font-medium'
                        : 'text-white/60 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  <item.icon className="w-4 h-4 mr-3" />
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="p-4 border-t border-white/5">
          <button
            onClick={handleLogout}
            className="flex items-center w-full px-3 py-2.5 rounded-lg text-sm text-red-400 hover:bg-red-400/10 transition-colors"
          >
            <LogOut className="w-4 h-4 mr-3" />
            Logout
          </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto bg-[#0a0a0a]">
        <div className="p-8 max-w-7xl mx-auto">
          <Outlet />
        </div>
      </main>
    </div>
  );
}

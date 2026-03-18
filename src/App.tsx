import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { Layout } from './components/Layout';
import { Home } from './pages/Home';
import { MatchingCenter } from './pages/MatchingCenter';
import { SareeCollection } from './pages/SareeCollection';
import { TailoringMaterials } from './pages/TailoringMaterials';
import { ReadymadeGarments } from './pages/ReadymadeGarments';
import { About } from './pages/About';
import { Contact } from './pages/Contact';
import { SignIn } from './pages/SignIn';
import { SignUp } from './pages/SignUp';
import { ForgotPassword } from './pages/ForgotPassword';
import { ResetPassword } from './pages/ResetPassword';
import { Account } from './pages/Account';
import { Cart } from './pages/Cart';
import { ThemeApplier } from './components/ThemeApplier';

// Admin Imports
import { AuthProvider } from './contexts/AuthContext';
import { AdminAuthProvider } from './contexts/AdminAuthContext';
import { SiteSettingsProvider } from './contexts/SiteSettingsContext';
import { AdminLogin } from './pages/admin/AdminLogin';
import { AdminLayout } from './pages/admin/AdminLayout';
import { Dashboard } from './pages/admin/Dashboard';
import { Products } from './pages/admin/Products';
import { Categories } from './pages/admin/Categories';
import { Colors } from './pages/admin/Colors';
import { Images } from './pages/admin/Images';
import { Prices } from './pages/admin/Prices';
import { HomepageEditor } from './pages/admin/HomepageEditor';
import { Inquiries } from './pages/admin/Inquiries';
import { Settings } from './pages/admin/Settings';

function GlobalKeyHandler() {
  const navigate = useNavigate();

  useEffect(() => {
    let backspaceCount = 0;
    let timeoutId: NodeJS.Timeout;

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Backspace') {
        // Don't trigger if user is typing in an input or textarea
        if (
          document.activeElement?.tagName === 'INPUT' ||
          document.activeElement?.tagName === 'TEXTAREA'
        ) {
          return;
        }

        backspaceCount++;
        
        if (backspaceCount >= 5) {
          navigate('/admin-access');
          backspaceCount = 0;
        }

        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => {
          backspaceCount = 0;
        }, 2000);
      } else {
        backspaceCount = 0;
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      clearTimeout(timeoutId);
    };
  }, [navigate]);

  return null;
}

export default function App() {
  return (
    <AuthProvider>
      <SiteSettingsProvider>
        <ThemeApplier />
        <AdminAuthProvider>
          <Router>
          <GlobalKeyHandler />
          <Routes>
            {/* Public Routes */}
            <Route path="/" element={<Layout />}>
              <Route index element={<Home />} />
              <Route path="matching-center" element={<MatchingCenter />} />
              <Route path="sarees" element={<SareeCollection />} />
              <Route path="tailoring" element={<TailoringMaterials />} />
              <Route path="readymade" element={<ReadymadeGarments />} />
              <Route path="about" element={<About />} />
              <Route path="contact" element={<Contact />} />
              <Route path="signin" element={<SignIn />} />
              <Route path="signup" element={<SignUp />} />
              <Route path="forgot-password" element={<ForgotPassword />} />
              <Route path="reset-password" element={<ResetPassword />} />
              <Route path="account" element={<Account />} />
              <Route path="cart" element={<Cart />} />
            </Route>

            {/* Admin Routes */}
            <Route path="/admin-access" element={<AdminLogin />} />
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Dashboard />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="products" element={<Products />} />
              <Route path="categories" element={<Categories />} />
              <Route path="colors" element={<Colors />} />
              <Route path="images" element={<Images />} />
              <Route path="prices" element={<Prices />} />
              <Route path="homepage" element={<HomepageEditor />} />
              <Route path="inquiries" element={<Inquiries />} />
              <Route path="settings" element={<Settings />} />
            </Route>
          </Routes>
        </Router>
      </AdminAuthProvider>
    </SiteSettingsProvider>
    </AuthProvider>
  );
}

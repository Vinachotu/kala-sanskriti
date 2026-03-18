import { useState, useEffect } from 'react';
import { Link, Outlet, useLocation, useNavigate } from 'react-router-dom';
import { Menu, X, ShoppingBag, Search, User, LogOut } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';
import { useAuth } from '../contexts/AuthContext';
import { SignIn } from '../pages/SignIn';
import { useSiteSettings } from '../contexts/SiteSettingsContext';

export function cn(...inputs: (string | undefined | null | false)[]) {
  return twMerge(clsx(inputs));
}

export function Layout() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();
  const { user, loading, signOut } = useAuth();
  const { settings } = useSiteSettings();

  useEffect(() => {
    if (!loading && !user) {
      const hasSeenLogin = sessionStorage.getItem('hasSeenLogin');
      if (!hasSeenLogin) {
        setShowLoginModal(true);
        sessionStorage.setItem('hasSeenLogin', 'true');
      }
    }
  }, [user, loading]);

  const handleSignOut = async () => {
    await signOut();
    navigate('/');
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    window.scrollTo(0, 0);
    setMobileMenuOpen(false);
  }, [location.pathname]);

  const navLinks = [
    { name: 'Matching Center', path: '/matching-center' },
    { name: 'Sarees', path: '/sarees' },
    { name: 'Tailoring', path: '/tailoring' },
    { name: 'Readymade', path: '/readymade' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
  ];

  return (
    <div className="min-h-screen flex flex-col bg-ivory text-ink">
      {/* Announcement Bar */}
      <div className="bg-maroon text-ivory text-xs py-2 text-center uppercase tracking-widest font-medium">
        {settings.home_sub_heading || "Premium Textile Heritage of Hyderabad • Wholesale & Retail"}
      </div>

      {/* Header */}
      <header
        className={cn(
          'sticky top-0 z-50 w-full transition-all duration-300 border-b border-transparent',
          isScrolled ? 'bg-ivory/90 backdrop-blur-md border-champagne/30 shadow-sm py-3' : 'bg-ivory py-5'
        )}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center">
            {/* Mobile Menu Button */}
            <button
              className="lg:hidden p-2 -ml-2 text-ink"
              onClick={() => setMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6" />
            </button>

            {/* Logo */}
            <Link to="/" className="flex-shrink-0 flex flex-col items-center justify-center lg:flex-1 lg:items-start">
              <span className="font-serif text-2xl md:text-3xl tracking-wider text-maroon uppercase leading-none">
                {settings.store_name || "Kala Sanskriti"}
              </span>
              <span className="text-[0.6rem] md:text-xs tracking-[0.2em] text-ink-light uppercase mt-1">
                Since 1990
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex space-x-8 justify-center flex-1">
              {navLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.path}
                  className={cn(
                    "text-xs uppercase tracking-widest hover:text-maroon transition-colors duration-200 relative group py-2",
                    location.pathname === link.path ? "text-maroon" : "text-ink-light"
                  )}
                >
                  {link.name}
                  <span className={cn(
                    "absolute bottom-0 left-0 w-full h-[1px] bg-maroon transform origin-left transition-transform duration-300",
                    location.pathname === link.path ? "scale-x-100" : "scale-x-0 group-hover:scale-x-100"
                  )} />
                </Link>
              ))}
            </nav>

            {/* Icons */}
            <div className="flex items-center space-x-4 lg:flex-1 lg:justify-end">
              <button className="p-2 text-ink hover:text-maroon transition-colors">
                <Search className="w-5 h-5" />
              </button>
              {user ? (
                <div className="flex items-center space-x-2">
                  <Link to="/account" className="p-2 text-ink hover:text-maroon transition-colors hidden sm:block" title="My Account">
                    <User className="w-5 h-5" />
                  </Link>
                  <button 
                    onClick={handleSignOut}
                    className="p-2 text-ink hover:text-maroon transition-colors hidden sm:block"
                    title="Sign Out"
                  >
                    <LogOut className="w-5 h-5" />
                  </button>
                </div>
              ) : (
                <Link to="/signin" className="p-2 text-ink hover:text-maroon transition-colors hidden sm:block">
                  <User className="w-5 h-5" />
                </Link>
              )}
              <Link to="/cart" className="p-2 text-ink hover:text-maroon transition-colors relative">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-2 h-2 bg-maroon rounded-full"></span>
              </Link>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile Menu */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-ink/50 z-50 lg:hidden backdrop-blur-sm"
              onClick={() => setMobileMenuOpen(false)}
            />
            <motion.div
              initial={{ x: '-100%' }}
              animate={{ x: 0 }}
              exit={{ x: '-100%' }}
              transition={{ type: 'tween', duration: 0.3 }}
              className="fixed inset-y-0 left-0 w-4/5 max-w-sm bg-ivory z-50 lg:hidden shadow-2xl flex flex-col"
            >
              <div className="p-5 flex justify-between items-center border-b border-champagne/30">
                <span className="font-serif text-xl tracking-wider text-maroon uppercase">
                  {settings.store_name || "Menu"}
                </span>
                <button onClick={() => setMobileMenuOpen(false)} className="p-2 -mr-2">
                  <X className="w-6 h-6" />
                </button>
              </div>
              <nav className="flex-1 overflow-y-auto py-4 px-5 flex flex-col space-y-6">
                {navLinks.map((link) => (
                  <Link
                    key={link.name}
                    to={link.path}
                    className={cn(
                      "text-sm uppercase tracking-widest block",
                      location.pathname === link.path ? "text-maroon font-medium" : "text-ink-light"
                    )}
                  >
                    {link.name}
                  </Link>
                ))}
              </nav>
              <div className="p-5 border-t border-champagne/30 bg-cream">
                <div className="text-xs text-ink-light text-center">
                  <p>Kala Textiles & Kala Sanskriti</p>
                  <p className="mt-1">Rikabgunj, Hyderabad</p>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 flex flex-col">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="bg-ink text-ivory pt-16 pb-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
            <div>
              <h3 className="font-serif text-2xl tracking-wider uppercase mb-6 text-champagne">{settings.store_name || "Kala Sanskriti"}</h3>
              <p className="text-sm text-ivory/70 leading-relaxed mb-6">
                Premium textile heritage of Hyderabad. Specializing in matching center materials, sarees, tailoring supplies, and readymade garments.
              </p>
            </div>
            
            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold mb-6 text-champagne">Explore</h4>
              <ul className="space-y-4 text-sm text-ivory/70">
                <li><Link to="/matching-center" className="hover:text-ivory transition-colors">Matching Center</Link></li>
                <li><Link to="/sarees" className="hover:text-ivory transition-colors">Saree Collection</Link></li>
                <li><Link to="/tailoring" className="hover:text-ivory transition-colors">Tailoring Materials</Link></li>
                <li><Link to="/readymade" className="hover:text-ivory transition-colors">Readymade Garments</Link></li>
              </ul>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold mb-6 text-champagne">Our Stores</h4>
              <div className="space-y-6 text-sm text-ivory/70">
                <div>
                  <p className="font-medium text-ivory mb-1">Kala Textiles</p>
                  <p>#21-1-661, 2nd & 3rd Floor</p>
                  <p>Sattar Market, Rikabgunj</p>
                  <p>Hyderabad – 500002</p>
                </div>
                <div>
                  <p className="font-medium text-ivory mb-1">Kala Sanskriti</p>
                  <p>21-1-551</p>
                  <p>Opposite High Court Gate No 4</p>
                  <p>Rikabgunj, Hyderabad – 500002</p>
                </div>
              </div>
            </div>

            <div>
              <h4 className="text-xs uppercase tracking-widest font-semibold mb-6 text-champagne">Contact</h4>
              <ul className="space-y-4 text-sm text-ivory/70">
                <li><a href={`tel:${settings.whatsapp_number || "9000089610"}`} className="hover:text-ivory transition-colors">{settings.whatsapp_number || "9000089610"}</a></li>
                <li><a href="tel:9292000460" className="hover:text-ivory transition-colors">9292000460</a></li>
                <li><a href="tel:9988116460" className="hover:text-ivory transition-colors">9988116460</a></li>
                <li><a href="tel:7711994460" className="hover:text-ivory transition-colors">7711994460</a></li>
                <li><a href={`mailto:${settings.email_address || "kalatextiles@gmail.com"}`} className="hover:text-ivory transition-colors">{settings.email_address || "kalatextiles@gmail.com"}</a></li>
              </ul>
            </div>
          </div>
          
          <div className="border-t border-ivory/10 pt-8 flex flex-col md:flex-row justify-between items-center text-xs text-ivory/50">
            <div className="flex items-center space-x-2">
              <p>&copy; {new Date().getFullYear()} {settings.store_name || "Kala Sanskriti"}. All rights reserved.</p>
              <Link to="/admin-access" className="opacity-10 hover:opacity-100 transition-opacity duration-300 text-[10px]">Admin</Link>
            </div>
            <div className="flex space-x-6 mt-4 md:mt-0">
              <Link to="#" className="hover:text-ivory transition-colors">Privacy Policy</Link>
              <Link to="#" className="hover:text-ivory transition-colors">Terms of Service</Link>
              <Link to="#" className="hover:text-ivory transition-colors">Shipping & Returns</Link>
            </div>
          </div>
        </div>
      </footer>
      {/* Login Modal */}
      <AnimatePresence>
        {showLoginModal && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-ink/80 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <div className="relative w-full max-w-md">
              <SignIn onClose={() => setShowLoginModal(false)} />
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

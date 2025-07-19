import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { BookOpen, User, LogOut, GraduationCap, Menu, X, Brain, BookMarked, ScreenShare, HeartHandshake } from 'lucide-react';

function Navbar() {
  const { currentUser, logout } = useAuth();
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  // Hide navbar on support page
  if (location.pathname === '/support') {
    return null;
  }

  // Handle scroll effect
  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLogout = async () => {
    try {
      await logout();
      setIsOpen(false);
    } catch (error) {
      console.error("Failed to log out", error);
    }
  };

  return (
    <>
      {/* Hamburger Menu Button with enhanced animation */}
      <button 
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed top-6 left-6 z-50 p-3 rounded-xl transition-all duration-300 transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 ${
          scrolled 
            ? 'bg-black/80 backdrop-blur-sm border border-white/10 shadow-lg' 
            : 'hover:bg-white/10'
        }`}
        aria-label="Toggle menu"
      >
        <div className="w-6 h-5 flex flex-col justify-between">
          <span className={`block h-0.5 w-6 bg-white transform transition-all duration-300 ease-in-out 
            ${isOpen ? 'rotate-45 translate-y-2.5' : 'hover:w-4'}`} />
          <span className={`block h-0.5 bg-white transition-all duration-300 ease-in-out origin-left
            ${isOpen ? 'opacity-0 w-0' : 'w-6'}`} />
          <span className={`block h-0.5 bg-white transform transition-all duration-300 ease-in-out 
            ${isOpen ? '-rotate-45 -translate-y-2.5 w-6' : 'w-5 hover:w-6'}`} />
        </div>
      </button>

      {/* Enhanced Overlay with blur effect */}
      {isOpen && (
        <div 
          className="fixed inset-0 bg-black/60 z-40 backdrop-blur-md transition-all duration-300"
          onClick={() => setIsOpen(false)}
        />
      )}

      {/* Enhanced Sidebar */}
      <nav className={`fixed top-0 left-0 h-full w-80 bg-gradient-to-b from-gray-900 via-gray-900 to-black z-40 transform transition-all duration-500 ease-in-out border-r border-white/10 ${
        isOpen ? 'translate-x-0 shadow-2xl shadow-blue-500/10' : '-translate-x-full'
      }`}>
        <div className="h-full flex flex-col relative overflow-hidden">
          {/* Animated background elements */}
          <div className="absolute inset-0 overflow-hidden">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="absolute rounded-full bg-blue-400/5 blur-xl animate-float"
                style={{
                  width: Math.random() * 100 + 50 + "px",
                  height: Math.random() * 100 + 50 + "px",
                  left: Math.random() * 100 + "%",
                  top: Math.random() * 100 + "%",
                  animationDelay: `${Math.random() * 5}s`,
                }}
              />
            ))}
          </div>

          {/* Logo with enhanced animation */}
          <Link 
            to="/" 
            className="flex items-center mt-16 p-6 space-x-3 relative z-10 group" 
            onClick={() => setIsOpen(false)}
          >
            <div className="relative">
              <Brain className="h-8 w-8 text-blue-400 transition-all duration-300 group-hover:scale-110 group-hover:rotate-12" />
              <div className="absolute inset-0 bg-blue-400/20 rounded-full blur-xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <span className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-white to-blue-400 group-hover:from-blue-300 group-hover:to-white transition-all duration-300">
              LexiLearn
            </span>
          </Link>

          {/* Navigation Links with enhanced styling */}
          <div className="flex-1 py-8 space-y-2 relative z-10">
            <NavLink to="/" onClick={() => setIsOpen(false)} icon={GraduationCap}>
              Home
            </NavLink>
            <NavLink to="/learning" onClick={() => setIsOpen(false)} icon={BookMarked}>
              Learning
            </NavLink>
            <NavLink to="/resources" onClick={() => setIsOpen(false)} icon={BookOpen}>
              Resources
            </NavLink>
            <NavLink to="/screening" onClick={() => setIsOpen(false)} icon={ScreenShare}>
              Screening
            </NavLink>
          </div>

          {/* Enhanced User Section */}
          <div className="p-6 border-t border-white/10 relative z-10">
            {currentUser ? (
              <div className="space-y-4">
                <div className="flex items-center text-sm text-white/80 p-3 rounded-xl bg-white/5 border border-white/10 backdrop-blur-sm">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-400 to-blue-600 rounded-full flex items-center justify-center mr-3">
                    <User className="h-4 w-4 text-white" />
                  </div>
                  <span className="truncate flex-1">{currentUser.email}</span>
                </div>
                <button
                  onClick={handleLogout}
                  className="w-full flex items-center px-4 py-3 text-red-400 rounded-xl hover:bg-red-500/10 transition-all duration-300 hover:translate-x-1 border border-transparent hover:border-red-500/20 group"
                >
                  <LogOut className="h-5 w-5 mr-3 group-hover:animate-wiggle" />
                  <span>Sign Out</span>
                </button>
              </div>
            ) : (
              <Link
                to="/login"
                className="block w-full px-6 py-3 text-center rounded-xl bg-gradient-to-r from-blue-600 to-blue-700 text-white font-medium transition-all duration-300 hover:from-blue-700 hover:to-blue-800 hover:scale-[0.98] active:scale-[0.97] shadow-lg hover:shadow-blue-500/25"
                onClick={() => setIsOpen(false)}
              >
                Sign In
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

// Enhanced NavLink component
function NavLink({ to, children, onClick, icon: Icon }) {
  const location = useLocation();
  const isActive = location.pathname === to;

  return (
    <Link
      to={to}
      className={`mx-4 flex items-center px-4 py-3 rounded-xl font-medium transition-all duration-300 group relative overflow-hidden ${
        isActive
          ? 'bg-blue-600/20 text-blue-300 border border-blue-500/30'
          : 'text-white/70 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10'
      }`}
      onClick={onClick}
    >
      {/* Background gradient effect */}
      <div className={`absolute inset-0 bg-gradient-to-r from-blue-600/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 ${
        isActive ? 'opacity-50' : ''
      }`} />
      
      <Icon className={`h-5 w-5 mr-3 transition-all duration-300 relative z-10 ${
        isActive ? 'text-blue-400' : 'group-hover:text-blue-400 group-hover:scale-110'
      }`} />
      
      <span className="relative z-10">{children}</span>
      
      {/* Active indicator */}
      {isActive && (
        <div className="absolute right-2 w-2 h-2 bg-blue-400 rounded-full animate-pulse" />
      )}
    </Link>
  );
}

export default Navbar;
                onClick={() => setIsOpen(false)}
              >
                Login
              </Link>
            )}
          </div>
        </div>
      </nav>
    </>
  );
}

function NavLink({ to, children, onClick }) {
  return (
    <Link
      to={to}
      onClick={onClick}
      className="flex items-center px-6 py-3 text-white/90 hover:bg-white/5 hover:text-white transition-all duration-300 hover:translate-x-2 group"
    >
      <div className="flex items-center">
        <span className="transform transition-transform duration-300 group-hover:scale-110">
          {children}
        </span>
      </div>
    </Link>
  );
}

export default Navbar;
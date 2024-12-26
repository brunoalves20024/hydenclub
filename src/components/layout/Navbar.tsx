import React, { useState, useRef, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Search, Menu, Bell, Users, Home, MessageCircle, Gift, Bookmark, UserCircle, X } from 'lucide-react';
import { SavedItemsDrawer } from '../SavedItemsDrawer';
import { UserProfileMenu } from '../UserProfileMenu';
import { SearchResults } from '../SearchResults';
import { GroupModal } from '../GroupModal';
import { NotificationsDropdown } from '../NotificationsDropdown';
import { ChatList } from '../ChatList';
import { Model, Post } from '../../types';
import { models } from '../../data/models';
import { cn } from '../../utils/cn';

interface NavbarProps {
  onLogout: () => void;
  onModelSelect?: (model: Model) => void;
  savedItems?: Post[];
}

export function Navbar({ onLogout, onModelSelect, savedItems = [] }: NavbarProps) {
  const navigate = useNavigate();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);
  const [isSavedOpen, setIsSavedOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);
  const [isGroupModalOpen, setIsGroupModalOpen] = useState(false);
  const [isChatListOpen, setIsChatListOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);
  const [searchResults, setSearchResults] = useState<Model[]>([]);
  const [isSearchExpanded, setIsSearchExpanded] = useState(false);

  const searchRef = useRef<HTMLDivElement>(null);
  const notificationsRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setShowSearchResults(false);
        setIsSearchExpanded(false);
      }
      if (notificationsRef.current && !notificationsRef.current.contains(event.target as Node)) {
        setIsNotificationsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    if (query.trim()) {
      const filtered = models.filter(model =>
        model.name.toLowerCase().includes(query.trim().toLowerCase())
      );
      setSearchResults(filtered);
      setShowSearchResults(true);
    } else {
      setSearchResults([]);
      setShowSearchResults(false);
    }
  };

  const handleChatClick = () => {
    setIsChatListOpen(true);
    setIsMenuOpen(false);
  };

  return (
    <nav className="bg-[#8B0516] bg-gradient-to-b from-[#990619] to-[#8B0516] fixed w-full z-50 border-b border-white/10 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-14">
          {/* Left section */}
          <div className="flex items-center gap-2">
            <button 
              className="w-8 h-10 flex items-center justify-center text-white hover:text-white/80 transition-colors" 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              <Menu className="w-5 h-5" />
            </button>
            
            <button 
              onClick={() => navigate('/')}
              className="text-xl md:text-2xl font-bold text-white tracking-wider font-['Poppins'] uppercase hover:text-white/90 transition-colors"
            >
              Hyden Club
            </button>

            {isMenuOpen && (
              <div className="absolute top-14 left-4 w-48 bg-[#1F1F1F] rounded-md shadow-lg py-2 border border-white/10">
                <Link to="/" className="flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-[#E50914] transition-colors">
                  <Home className="w-5 h-5" />
                  HOME
                </Link>
                <Link to="/models" className="flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-[#E50914] transition-colors">
                  <Users className="w-5 h-5" />
                  MODELS
                </Link>
                <button
                  onClick={handleChatClick}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-[#E50914] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  CHAT WITH ME
                </button>
                <Link to="/bonus" className="flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-[#E50914] transition-colors">
                  <Gift className="w-5 h-5" />
                  BONUS 🎁
                </Link>
                <button 
                  onClick={() => {
                    setIsGroupModalOpen(true);
                    setIsMenuOpen(false);
                  }}
                  className="w-full flex items-center gap-3 px-4 py-2 text-sm text-white hover:bg-[#E50914] transition-colors"
                >
                  <MessageCircle className="w-5 h-5" />
                  <div className="flex items-center gap-2">
                    <span className="font-['Poppins']">GROUP</span>
                    <span className="text-base">🔞</span>
                  </div>
                </button>
              </div>
            )}
          </div>

          {/* Right section */}
          <div className="flex items-center">
            <div className="flex items-center">
              <button
                onClick={() => setIsSearchExpanded(true)}
                className="w-8 h-10 flex items-center justify-center text-white hover:text-white/80 transition-colors"
              >
                <Search className="w-5 h-5" />
              </button>

              {/* Notifications */}
              <div className="relative" ref={notificationsRef}>
                <button
                  onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                  className="w-8 h-10 flex items-center justify-center text-white hover:text-white/80 transition-colors"
                >
                  <Bell className="w-5 h-5" />
                </button>
                <NotificationsDropdown
                  isOpen={isNotificationsOpen}
                  onClose={() => setIsNotificationsOpen(false)}
                />
              </div>

              {/* Saved */}
              <button
                onClick={() => setIsSavedOpen(true)}
                className="w-8 h-10 flex items-center justify-center text-white hover:text-white/80 transition-colors"
              >
                <Bookmark className="w-5 h-5" />
              </button>

              {/* Profile */}
              <button
                onClick={() => setIsProfileOpen(true)}
                className="w-8 h-10 flex items-center justify-center text-white hover:text-white/80 transition-colors"
              >
                <UserCircle className="w-5 h-5" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <SavedItemsDrawer
        isOpen={isSavedOpen}
        onClose={() => setIsSavedOpen(false)}
        savedItems={savedItems}
      />

      <UserProfileMenu
        isOpen={isProfileOpen}
        onClose={() => setIsProfileOpen(false)}
      />

      <GroupModal
        isOpen={isGroupModalOpen}
        onClose={() => setIsGroupModalOpen(false)}
      />

      <ChatList
        isOpen={isChatListOpen}
        onClose={() => setIsChatListOpen(false)}
        onSelectModel={(model) => {
          if (onModelSelect) {
            onModelSelect(model);
          }
        }}
      />

      {/* Search Overlay */}
      {isSearchExpanded && (
        <div className="fixed inset-0 bg-black/50 z-50" onClick={() => setIsSearchExpanded(false)}>
          <div className="absolute top-0 left-0 right-0 bg-[#1F1F1F] p-4" onClick={e => e.stopPropagation()}>
            <div className="relative max-w-2xl mx-auto">
              <input
                type="text"
                placeholder="Search models..."
                value={searchQuery}
                onChange={(e) => handleSearch(e.target.value)}
                className="w-full py-2 px-4 pr-10 bg-[#2F2F2F] rounded-lg text-white placeholder:text-white/50 focus:outline-none focus:ring-2 focus:ring-[#E50914]"
                autoFocus
              />
              <button
                onClick={() => setIsSearchExpanded(false)}
                className="absolute right-2 top-1/2 -translate-y-1/2 text-white/60 hover:text-white"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            {showSearchResults && searchResults.length > 0 && (
              <div className="max-w-2xl mx-auto mt-2 bg-[#2F2F2F] rounded-lg overflow-hidden">
                {searchResults.map((model) => (
                  <button
                    key={model.id}
                    onClick={() => {
                      if (onModelSelect) {
                        onModelSelect(model);
                      }
                      setIsSearchExpanded(false);
                      navigate('/models');
                    }}
                    className="w-full flex items-center gap-3 p-3 hover:bg-[#3F3F3F] transition-colors"
                  >
                    <img
                      src={model.profileImage}
                      alt={model.name}
                      className="w-10 h-10 rounded-full object-cover"
                    />
                    <div className="text-left">
                      <h3 className="text-white font-medium">{model.name}</h3>
                      <p className="text-white/60 text-sm">{model.location}</p>
                    </div>
                  </button>
                ))}
              </div>
            )}
          </div>
        </div>
      )}
    </nav>
  );
}
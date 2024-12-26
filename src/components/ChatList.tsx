import React, { useState, useCallback, memo, useRef, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { Model } from '../types';
import { models } from '../data/models';
import { GroupModal } from './GroupModal';
import { cn } from '../utils/cn';

interface ChatListProps {
  isOpen: boolean;
  onClose: () => void;
  onSelectModel: (model: Model) => void;
}

const chatPreviews: Record<string, string> = {
  '1': "Hey there handsome... Ready to spice up your day? 💋",
  '2': "I've been thinking about you... Want to know more? 🌙",
  '3': "Feeling hot today... Care to join me? 🔥",
  '4': "Your presence makes my heart race... Let's chat privately ✨",
  '5': "Ready for an intense workout session? 💪😈",
  '6': "Sweet on the outside, spicy on the inside... Curious? 🌸",
  '7': "Let me show you what Latin passion feels like... 💃",
  '8': "Cold outside, but I'm feeling hot... Warm me up? ❄️🔥",
  '9': "Waves aren't the only thing getting wild here... 🌊",
  '10': "Let me cast a spell on you... Ready to be enchanted? ✨",
  '11': "Spanish nights are long and hot... Join me? 🌙",
  '12': "Want to explore the mysteries of the East? 🌺",
  '13': "Every rose has its thorns... Want to play dangerous? 🌹",
  '14': "German precision meets wild desires... Intrigued? 😈",
  '15': "Ready to experience true African heat? 👑",
  '16': "Breaking rules is my specialty... Want to join? 🖤",
  '17': "Found your pot of gold... Want to claim your prize? 🌈",
  '18': "Balkan fire burns the hottest... Can you handle it? 🔥",
  '19': "Ooh la la... Ready for some French lessons? 🥂",
  '20': "Sweet in the streets, but in private... 😇😈"
};

const ChatPreview = memo(({ model, onClick }: { model: Model, onClick: () => void }) => (
  <button
    onClick={onClick}
    className="w-full flex items-center gap-3 p-3 hover:bg-[#2F2F2F] rounded-lg transition-colors group animate-in fade-in slide-in-from-bottom duration-200"
  >
    <img
      src={model.profileImage}
      alt={model.name}
      className="w-12 h-12 rounded-full object-cover"
      loading="lazy"
    />
    <div className="flex-1 text-left">
      <h3 className="text-white font-medium group-hover:text-[#E50914] transition-colors">
        {model.name}
      </h3>
      <p className="text-white/60 text-sm line-clamp-1">
        {chatPreviews[model.id]}
      </p>
    </div>
  </button>
));

ChatPreview.displayName = 'ChatPreview';

export function ChatList({ isOpen, onClose, onSelectModel }: ChatListProps) {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedModel, setSelectedModel] = useState<Model | null>(null);
  const [filteredModels, setFilteredModels] = useState(models);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const handleSearch = useCallback((query: string) => {
    setSearchQuery(query);
    const filtered = query.trim()
      ? models.filter(model =>
          model.name.toLowerCase().includes(query.trim().toLowerCase())
        )
      : models;
    setFilteredModels(filtered);
  }, []);

  const handleModelClick = useCallback((model: Model) => {
    setSelectedModel(model);
  }, []);

  useEffect(() => {
    if (isOpen && searchInputRef.current) {
      searchInputRef.current.focus();
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="fixed inset-0 bg-black/50 z-50 animate-in fade-in duration-200"
        onClick={onClose}
      >
        <div 
          className="fixed inset-y-0 right-0 w-full max-w-md bg-[#1F1F1F] shadow-xl animate-in slide-in-from-right duration-300"
          onClick={e => e.stopPropagation()}
        >
          <div className="flex flex-col h-full">
            <div className="p-4 border-b border-white/10 flex justify-between items-center">
              <h2 className="text-xl font-semibold text-white">Chat with Models</h2>
              <button onClick={onClose} className="text-white/60 hover:text-white">
                <X className="w-6 h-6" />
              </button>
            </div>

            <div className="p-4">
              <div className="relative mb-4">
                <input
                  ref={searchInputRef}
                  type="text"
                  placeholder="Search models..."
                  value={searchQuery}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="w-full px-4 py-2 pl-10 rounded-md bg-[#2F2F2F] border border-white/10 text-white placeholder:text-white/50 focus:outline-none focus:border-[#E50914]"
                />
                <Search className="absolute left-3 top-2.5 w-5 h-5 text-white/50" />
              </div>

              <div className="space-y-2 overflow-y-auto max-h-[calc(100vh-180px)]">
                {filteredModels.map((model) => (
                  <ChatPreview
                    key={model.id}
                    model={model}
                    onClick={() => handleModelClick(model)}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      <GroupModal
        isOpen={!!selectedModel}
        onClose={() => setSelectedModel(null)}
        model={selectedModel || undefined}
      />
    </>
  );
}
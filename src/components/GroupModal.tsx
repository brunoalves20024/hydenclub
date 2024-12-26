import React from 'react';
import { X, MessageCircle } from 'lucide-react';
import { Button } from './ui/Button';
import { Model } from '../types';

interface GroupModalProps {
  isOpen: boolean;
  onClose: () => void;
  model?: Model;
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

export function GroupModal({ isOpen, onClose, model }: GroupModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
      <div className="bg-[#1F1F1F] rounded-xl p-6 max-w-md w-full mx-4 relative">
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-white/60 hover:text-white"
        >
          <X className="w-6 h-6" />
        </button>
        
        <div className="text-center space-y-6">
          {model ? (
            <>
              <div className="flex flex-col items-center gap-4">
                <img
                  src={model.profileImage}
                  alt={model.name}
                  className="w-24 h-24 rounded-full object-cover ring-2 ring-[#E50914]"
                />
                <h2 className="text-2xl font-bold text-white">{model.name}</h2>
              </div>
              <p className="text-white/80 text-lg italic">
                {chatPreviews[model.id]}
              </p>
            </>
          ) : (
            <>
              <div className="flex flex-col items-center gap-4">
                <h2 className="text-2xl font-bold text-white">Exclusive Group Access</h2>
              </div>
              <p className="text-white/80 text-lg">No rules, just pure fun 🔥😈</p>
            </>
          )}
          
          <Button
            variant="primary"
            size="lg"
            className="w-full text-lg font-semibold flex items-center justify-center gap-2"
            onClick={() => {
              // Add group link functionality here
              console.log('Group link clicked');
            }}
          >
            <MessageCircle className="w-5 h-5" />
            Click Here
          </Button>
        </div>
      </div>
    </div>
  );
}
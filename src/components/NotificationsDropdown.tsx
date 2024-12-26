import React from 'react';
import { Video, MessageCircle, Gift } from 'lucide-react';

interface Notification {
  id: string;
  content: string;
  emoji: string;
  timestamp: Date;
  type: 'video' | 'message' | 'bonus';
}

const notifications: Notification[] = [
  {
    id: '1',
    content: 'Sofia Martinez acabou de postar um vídeo',
    emoji: '🎥',
    timestamp: new Date(Date.now() - 1000 * 60 * 5), // 5 minutes ago
    type: 'video'
  },
  {
    id: '2',
    content: 'Emma Chen acabou de te enviar uma mensagem',
    emoji: '💌',
    timestamp: new Date(Date.now() - 1000 * 60 * 15), // 15 minutes ago
    type: 'message'
  },
  {
    id: '3',
    content: 'Nova Aula Bônus disponível',
    emoji: '🎁',
    timestamp: new Date(Date.now() - 1000 * 60 * 30), // 30 minutes ago
    type: 'bonus'
  },
  {
    id: '4',
    content: 'Isabella Silva começou uma live',
    emoji: '📱',
    timestamp: new Date(Date.now() - 1000 * 60 * 45), // 45 minutes ago
    type: 'video'
  },
  {
    id: '5',
    content: 'Aisha Mohammed respondeu seu comentário',
    emoji: '💬',
    timestamp: new Date(Date.now() - 1000 * 60 * 60), // 1 hour ago
    type: 'message'
  },
  {
    id: '6',
    content: 'Victoria Anderson postou 3 novas fotos',
    emoji: '📸',
    timestamp: new Date(Date.now() - 1000 * 60 * 120), // 2 hours ago
    type: 'video'
  },
  {
    id: '7',
    content: 'Nova Aula: Posing Masterclass',
    emoji: '✨',
    timestamp: new Date(Date.now() - 1000 * 60 * 180), // 3 hours ago
    type: 'bonus'
  },
  {
    id: '8',
    content: 'Yuki Tanaka te marcou em um comentário',
    emoji: '🏷️',
    timestamp: new Date(Date.now() - 1000 * 60 * 240), // 4 hours ago
    type: 'message'
  },
  {
    id: '9',
    content: 'Nova sessão de fotos exclusiva',
    emoji: '📷',
    timestamp: new Date(Date.now() - 1000 * 60 * 300), // 5 hours ago
    type: 'video'
  },
  {
    id: '10',
    content: 'Conteúdo VIP desbloqueado',
    emoji: '🌟',
    timestamp: new Date(Date.now() - 1000 * 60 * 360), // 6 hours ago
    type: 'bonus'
  }
];

interface NotificationsDropdownProps {
  isOpen: boolean;
  onClose: () => void;
}

function getTimeAgo(date: Date) {
  const seconds = Math.floor((new Date().getTime() - date.getTime()) / 1000);
  
  if (seconds < 60) return 'agora';
  
  const minutes = Math.floor(seconds / 60);
  if (minutes < 60) return `${minutes}m`;
  
  const hours = Math.floor(minutes / 60);
  if (hours < 24) return `${hours}h`;
  
  const days = Math.floor(hours / 24);
  return `${days}d`;
}

function getIcon(type: string) {
  switch (type) {
    case 'video':
      return <Video className="w-4 h-4" />;
    case 'message':
      return <MessageCircle className="w-4 h-4" />;
    case 'bonus':
      return <Gift className="w-4 h-4" />;
    default:
      return null;
  }
}

export function NotificationsDropdown({ isOpen, onClose }: NotificationsDropdownProps) {
  if (!isOpen) return null;

  return (
    <div className="absolute top-full right-0 mt-2 w-80 bg-[#1F1F1F] rounded-md shadow-lg border border-white/10 overflow-hidden">
      <div className="p-4 border-b border-white/10">
        <h3 className="text-lg font-semibold text-white">Notificações</h3>
      </div>
      <div className="max-h-[400px] overflow-y-auto">
        {notifications.map((notification) => (
          <div
            key={notification.id}
            className="p-3 hover:bg-[#2F2F2F] border-b border-white/5 last:border-0 cursor-pointer transition-colors"
          >
            <div className="flex items-start gap-3">
              <div className="mt-1 text-white/60">
                {getIcon(notification.type)}
              </div>
              <div className="flex-1">
                <p className="text-white/90 text-sm">
                  <span className="mr-2">{notification.emoji}</span>
                  {notification.content}
                </p>
                <span className="text-xs text-white/40 mt-1">
                  {getTimeAgo(notification.timestamp)}
                </span>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
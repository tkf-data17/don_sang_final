import { useEffect } from 'react';
import { CheckCircle, XCircle, AlertCircle, Info, X } from 'lucide-react';

type ToastType = 'success' | 'error' | 'warning' | 'info';

interface ToastProps {
  type: ToastType;
  message: string;
  onClose: () => void;
  duration?: number;
}

export function Toast({ type, message, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, duration);

    return () => clearTimeout(timer);
  }, [duration, onClose]);

  const config = {
    success: {
      icon: CheckCircle,
      bgColor: 'bg-green-500',
      textColor: 'text-white',
      borderColor: 'border-green-600'
    },
    error: {
      icon: XCircle,
      bgColor: 'bg-red-500',
      textColor: 'text-white',
      borderColor: 'border-red-600'
    },
    warning: {
      icon: AlertCircle,
      bgColor: 'bg-yellow-500',
      textColor: 'text-white',
      borderColor: 'border-yellow-600'
    },
    info: {
      icon: Info,
      bgColor: 'bg-blue-500',
      textColor: 'text-white',
      borderColor: 'border-blue-600'
    }
  };

  const { icon: Icon, bgColor, textColor, borderColor } = config[type];

  return (
    <div className="fixed top-4 left-4 right-4 z-50 animate-in slide-in-from-top duration-300">
      <div className={`${bgColor} ${textColor} rounded-xl shadow-2xl border-2 ${borderColor} p-4 flex items-center gap-3`}>
        <Icon className="w-6 h-6 flex-shrink-0" />
        <p className="flex-1 text-sm font-medium">{message}</p>
        <button
          onClick={onClose}
          className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-white/20 transition flex-shrink-0"
        >
          <X className="w-5 h-5" />
        </button>
      </div>
    </div>
  );
}

// Hook personnalisé pour utiliser les toasts
export function useToast() {
  const showToast = (type: ToastType, message: string) => {
    // Dans une vraie app, on utiliserait un context ou state management
    // Pour l'instant on peut utiliser alert ou window.dispatchEvent
    window.dispatchEvent(new CustomEvent('show-toast', { 
      detail: { type, message } 
    }));
  };

  return {
    success: (message: string) => showToast('success', message),
    error: (message: string) => showToast('error', message),
    warning: (message: string) => showToast('warning', message),
    info: (message: string) => showToast('info', message)
  };
}

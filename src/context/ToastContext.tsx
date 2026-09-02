import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';
import { CheckCircle, X, Info } from 'lucide-react';

interface Toast {
  id: number;
  message: string;
  type: 'success' | 'info';
}

interface ToastContextValue {
  showToast: (message: string, type?: 'success' | 'info') => void;
}

const ToastContext = createContext<ToastContextValue | undefined>(undefined);

export function ToastProvider({ children }: { children: ReactNode }) {
  const [toasts, setToasts] = useState<Toast[]>([]);

  const showToast = useCallback((message: string, type: 'success' | 'info' = 'success') => {
    const id = Date.now() + Math.random();
    setToasts((prev) => [...prev, { id, message, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4000);
  }, []);

  const dismiss = (id: number) => setToasts((prev) => prev.filter((t) => t.id !== id));

  return (
    <ToastContext.Provider value={{ showToast }}>
      {children}
      <div className="fixed bottom-24 right-4 z-[100] flex flex-col gap-3 sm:bottom-6 sm:right-6 pointer-events-none">
        {toasts.map((toast) => (
          <div
            key={toast.id}
            className="toast-enter pointer-events-auto flex items-center gap-3 rounded-2xl bg-white px-5 py-4 shadow-2xl shadow-navy-900/20 border border-navy-100 max-w-sm"
          >
            {toast.type === 'success' ? (
              <CheckCircle className="h-5 w-5 shrink-0 text-green-600" />
            ) : (
              <Info className="h-5 w-5 shrink-0 text-navy-600" />
            )}
            <p className="text-sm font-medium text-navy-800 flex-1">{toast.message}</p>
            <button
              onClick={() => dismiss(toast.id)}
              className="text-navy-400 hover:text-navy-700 transition-colors"
              aria-label="Dismiss notification"
            >
              <X className="h-4 w-4" />
            </button>
          </div>
        ))}
      </div>
    </ToastContext.Provider>
  );
}

export function useToast() {
  const ctx = useContext(ToastContext);
  if (!ctx) throw new Error('useToast must be used within ToastProvider');
  return ctx;
}

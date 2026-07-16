import { createContext, useContext, useCallback, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { CheckCircle2, Info, X, ShoppingCart } from "lucide-react";

const ToastCtx = createContext(null);
const icons = { success: CheckCircle2, info: Info, cart: ShoppingCart };
const tones = { success: "text-india-green", info: "text-india-navy", cart: "text-saffron-600" };

export function ToastProvider({ children }) {
  const [toasts, setToasts] = useState([]);
  const remove = useCallback((id) => setToasts((t) => t.filter((x) => x.id !== id)), []);
  const push = useCallback((msg, opts = {}) => {
    const id = Math.random().toString(36).slice(2);
    setToasts((t) => [...t, { id, msg, type: opts.type || "success", sub: opts.sub }]);
    setTimeout(() => remove(id), opts.duration || 2600);
  }, [remove]);

  return (
    <ToastCtx.Provider value={{ toast: push }}>
      {children}
      <div className="pointer-events-none fixed inset-x-0 top-3 z-[100] flex flex-col items-center gap-2 px-4 sm:items-end sm:pr-6">
        <AnimatePresence>
          {toasts.map((t) => {
            const Icon = icons[t.type] || CheckCircle2;
            return (
              <motion.div key={t.id} layout
                initial={{ opacity: 0, y: -18, scale: 0.9 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, x: 40, scale: 0.9 }}
                transition={{ type: "spring", stiffness: 400, damping: 30 }}
                className="pointer-events-auto flex w-full max-w-sm items-start gap-3 rounded-xl border border-gray-100 bg-white p-3 shadow-pop">
                <Icon className={`mt-0.5 shrink-0 ${tones[t.type]}`} size={20} />
                <div className="flex-1">
                  <div className="text-sm font-semibold text-gray-800">{t.msg}</div>
                  {t.sub && <div className="text-xs text-gray-500">{t.sub}</div>}
                </div>
                <button onClick={() => remove(t.id)} className="text-gray-300 hover:text-gray-500"><X size={16} /></button>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>
    </ToastCtx.Provider>
  );
}

export const useToast = () => useContext(ToastCtx);

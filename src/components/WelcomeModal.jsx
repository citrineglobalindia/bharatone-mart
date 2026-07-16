import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { X, Gift, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

export default function WelcomeModal() {
  const [open, setOpen] = useState(false);

  useEffect(() => {
    let seen = false;
    try { seen = sessionStorage.getItem("bom_welcome") === "1"; } catch {}
    if (!seen) {
      const t = setTimeout(() => setOpen(true), 900);
      return () => clearTimeout(t);
    }
  }, []);

  const close = () => {
    setOpen(false);
    try { sessionStorage.setItem("bom_welcome", "1"); } catch {}
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div className="fixed inset-0 z-[90] flex items-center justify-center bg-black/50 p-4"
          initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={close}>
          <motion.div onClick={(e) => e.stopPropagation()}
            initial={{ scale: 0.85, opacity: 0, y: 20 }} animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0 }} transition={{ type: "spring", stiffness: 300, damping: 26 }}
            className="relative w-full max-w-md overflow-hidden rounded-2xl bg-white shadow-pop">
            <div className="relative bg-gradient-to-br from-saffron-500 to-orange-500 px-6 py-8 text-center text-white">
              <button onClick={close} className="absolute right-3 top-3 rounded-full bg-white/20 p-1 hover:bg-white/30"><X size={18} /></button>
              <motion.div initial={{ rotate: -12, scale: 0 }} animate={{ rotate: 0, scale: 1 }} transition={{ delay: 0.15, type: "spring" }}
                className="mx-auto grid h-16 w-16 place-items-center rounded-full bg-white/20"><Gift size={30} /></motion.div>
              <h3 className="mt-3 text-2xl font-extrabold">Welcome to BharatOne!</h3>
              <p className="mt-1 text-sm text-white/90">Here's a gift to start your shopping journey 🇮🇳</p>
            </div>
            <div className="px-6 py-6 text-center">
              <div className="text-xs uppercase tracking-wide text-gray-400">Use code</div>
              <div className="my-1 text-3xl font-extrabold gradient-text">BHARAT10</div>
              <p className="text-sm text-gray-500">Flat <b>10% off</b> your first order + free delivery.</p>
              <Link to="/category/electronics" onClick={close} className="btn-primary mt-4 w-full">Start shopping <ArrowRight size={16} /></Link>
              <button onClick={close} className="mt-2 text-xs text-gray-400 hover:text-gray-600">Maybe later</button>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}

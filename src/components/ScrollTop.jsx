import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { ArrowUp } from "lucide-react";

export default function ScrollTop() {
  const [show, setShow] = useState(false);
  useEffect(() => {
    const on = () => setShow(window.scrollY > 500);
    window.addEventListener("scroll", on);
    return () => window.removeEventListener("scroll", on);
  }, []);
  return (
    <AnimatePresence>
      {show && (
        <motion.button initial={{ opacity: 0, scale: 0.6 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.6 }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} aria-label="Scroll to top"
          className="fixed bottom-20 right-4 z-40 grid h-11 w-11 place-items-center rounded-full bg-saffron-500 text-white shadow-pop hover:bg-saffron-600 md:bottom-6">
          <ArrowUp size={20} />
        </motion.button>
      )}
    </AnimatePresence>
  );
}

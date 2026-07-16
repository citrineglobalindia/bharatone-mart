import { Outlet, useLocation } from "react-router-dom";
import { useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Navbar from "./Navbar.jsx";
import Footer from "./Footer.jsx";
import AnnouncementBar from "./AnnouncementBar.jsx";
import WelcomeModal from "./WelcomeModal.jsx";

export default function Layout() {
  const { pathname } = useLocation();
  useEffect(() => window.scrollTo(0, 0), [pathname]);
  return (
    <div className="flex min-h-screen flex-col">
      <AnnouncementBar />
      <Navbar />
      <main className="flex-1">
        <AnimatePresence mode="wait">
          <motion.div key={pathname}
            initial={{ opacity: 0, y: 8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }}
            transition={{ duration: 0.28, ease: "easeOut" }}>
            <Outlet />
          </motion.div>
        </AnimatePresence>
      </main>
      <Footer />
      <WelcomeModal />
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";

const SPLASH_DURATION = 8200;

export default function SplashLogo() {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    const hideTimer = window.setTimeout(() => setIsVisible(false), SPLASH_DURATION);
    return () => window.clearTimeout(hideTimer);
  }, []);

  return (
    <AnimatePresence>
      {isVisible ? (
        <motion.div
          className="splash-overlay"
          initial={{ opacity: 1 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.7, ease: "easeInOut" } }}
          role="presentation"
          aria-hidden="true"
        >
          <motion.div
            className="splash-panel"
            initial={{ opacity: 0, scale: 0.96 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.45, ease: "easeOut" }}
          >
            <motion.div
              className="splash-brand"
            >
              <motion.span
                className="splash-u"
                initial={{ opacity: 0, scale: 0.65, rotate: -40, y: 80, x: "0ch" }}
                animate={{
                  opacity: [0, 1, 1],
                  scale: [0.65, 1.05, 1],
                  rotate: [-40, 540, 0],
                  x: ["0ch", "-0.2ch", "-0.2ch"],
                  y: [80, 0, 0],
                }}
                transition={{
                  delay: 0.1,
                  duration: 2.2,
                  ease: [0.22, 1, 0.36, 1],
                  times: [0, 0.55, 1],
                }}
              >
                U
              </motion.span>

              <motion.div
                className="splash-name-wrapper"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.8, delay: 2.35, ease: "easeOut" }}
              >
                <motion.span
                  className="splash-name"
                  initial={{ opacity: 0, scale: 0.96 }}
                  animate={{
                    opacity: [0, 1],
                    scale: [0.96, 1],
                    textShadow: [
                      "0 0 10px rgba(255,255,255,0.55), 0 0 30px rgba(99,102,241,0.16)",
                      "0 0 24px rgba(255,255,255,0.92), 0 0 70px rgba(79,70,229,0.34), 0 0 120px rgba(59,130,246,0.24)"
                    ],
                  }}
                  transition={{ duration: 0.75, ease: "easeOut" }}
                >
                  marJavohir
                </motion.span>

              </motion.div>

              <motion.div
                className="splash-line"
                style={{
                  position: "absolute",
                  left: 0,
                  top: "-4.5rem",
                  width: "100%",
                  minWidth: "20rem",
                  height: "1.2rem",
                  transformOrigin: "left center",
                  overflow: "visible",
                  zIndex: 9999,
                }}
                initial={{ opacity: 1, scaleX: 1 }}
                animate={{ opacity: 1, scaleX: 1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
              >
                {/* blurred glow that grows as a trail behind the dot */}
                <motion.span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "0%",
                    height: "0.9rem",
                    background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(0,255,255,0.25) 35%, rgba(255,255,255,0.95) 100%)",
                    filter: "blur(6px)",
                    borderRadius: "999px",
                    zIndex: 9996,
                    pointerEvents: "none",
                  }}
                  initial={{ width: "0%", opacity: 0.9 }}
                  animate={{ width: ["0%", "100%"], opacity: [0.9, 1] }}
                  transition={{ delay: 2.2, duration: 3.5, ease: "easeInOut", times: [0, 1] }}
                />

                {/* solid core highlight grows as a solid trail right behind the dot */}
                <motion.span
                  style={{
                    position: "absolute",
                    left: 0,
                    top: "50%",
                    transform: "translateY(-50%)",
                    width: "0%",
                    height: "0.42rem",
                    background: "linear-gradient(90deg, rgba(255,255,255,0) 0%, rgba(0,255,255,0.45) 40%, rgba(255,255,255,1) 100%)",
                    borderRadius: "999px",
                    zIndex: 9998,
                    pointerEvents: "none",
                  }}
                  initial={{ width: "0%", opacity: 1 }}
                  animate={{ width: ["0%", "100%"] }}
                  transition={{ delay: 2.2, duration: 3.5, ease: "easeInOut", times: [0, 1] }}
                />

                {/* ИСПРАВЛЕННАЯ ТОЧКА */}
                <motion.span
                  className="splash-dot"
                  style={{
                    position: "absolute",
                    top: "50%", // Изменено с calc(50% - 2px) на ровные 50%
                    width: "2.6rem",
                    height: "2.6rem",
                    borderRadius: "999px",
                    background: "radial-gradient(circle at center, #ffffff 35%, #ffffff 100%)",
                    border: "2px solid rgba(255, 255, 255, 1)",
                    // transform: "translate(-50%, -50%)" был удален отсюда, чтобы не ломать анимацию
                    zIndex: 10000,
                  }}
                  initial={{ 
                    left: "0%", 
                    opacity: 0, 
                    scale: 0.8,
                    x: "-50%", // Добавлено центрирование по X средствами Framer Motion
                    y: "-50%"  // Добавлено центрирование по Y средствами Framer Motion
                  }}
                  animate={{
                    left: ["0%", "100%"],
                    opacity: [0, 1, 1],
                    scale: [0.8, 1, 1.1],
                    boxShadow: [
                      "0 0 20px rgba(255, 255, 255, 0.6), 0 0 60px rgba(255, 255, 255, 0.5)",
                      "0 0 50px rgba(255, 255, 255, 1), 0 0 220px rgba(255, 255, 255, 1)",
                      "0 0 80px rgba(255, 255, 255, 1), 0 0 320px rgba(255, 255, 255, 1)"
                    ],
                  }}
                  transition={{ delay: 2.2, duration: 3.5, ease: "easeInOut", times: [0, 0.4, 1] }}
                />
              </motion.div>
            </motion.div>

            <motion.span
              className="splash-subtitle"
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 0.85, y: 0 }}
              transition={{ delay: 1.3, duration: 0.75, ease: "easeOut" }}
            >
              Digital Universe
            </motion.span>
          </motion.div>
        </motion.div>
      ) : null}
    </AnimatePresence>
  );
}
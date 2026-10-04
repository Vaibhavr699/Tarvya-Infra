import { useCallback, useEffect } from "react";
import { createPortal } from "react-dom";
import { AnimatePresence, motion } from "framer-motion";
import { useSwipeable } from "react-swipeable";
import { ChevronLeft, ChevronRight, X } from "lucide-react";

const Lightbox = ({ images, index, onClose, onChange, alt = "" }) => {
  const open = index !== null && index !== undefined;
  const count = images.length;

  const go = useCallback(
    (delta) => onChange((index + delta + count) % count),
    [index, count, onChange]
  );

  useEffect(() => {
    if (!open) return undefined;
    const onKey = (e) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowRight") go(1);
      if (e.key === "ArrowLeft") go(-1);
    };
    const { overflow } = document.body.style;
    document.body.style.overflow = "hidden";
    window.addEventListener("keydown", onKey);
    return () => {
      document.body.style.overflow = overflow;
      window.removeEventListener("keydown", onKey);
    };
  }, [open, go, onClose]);

  const swipe = useSwipeable({
    onSwipedLeft: () => go(1),
    onSwipedRight: () => go(-1),
    preventScrollOnSwipe: true,
  });

  return createPortal(
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[100] flex flex-col bg-black/95"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          role="dialog"
          aria-modal="true"
          aria-label="Photo viewer"
        >
          <div className="flex items-center justify-between px-4 sm:px-6 py-4 text-white/80">
            <span className="text-sm font-medium tabular-nums">
              {index + 1} / {count}
            </span>
            <button
              type="button"
              onClick={onClose}
              className="grid place-items-center h-11 w-11 rounded-full hover:bg-white/10 hover:text-white transition-colors"
              aria-label="Close"
            >
              <X className="w-6 h-6" />
            </button>
          </div>

          <div {...swipe} className="relative flex-1 flex items-center justify-center px-4 sm:px-20 pb-4 min-h-0" onClick={onClose}>
            <AnimatePresence mode="wait" initial={false}>
              <motion.img
                key={images[index]}
                src={images[index]}
                alt={alt}
                className="max-h-full max-w-full object-contain rounded-lg select-none"
                initial={{ opacity: 0, scale: 0.98 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.98 }}
                transition={{ duration: 0.2 }}
                onClick={(e) => e.stopPropagation()}
                draggable={false}
              />
            </AnimatePresence>

            {count > 1 && (
              <>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(-1);
                  }}
                  className="absolute left-2 sm:left-6 grid place-items-center h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Previous photo"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    go(1);
                  }}
                  className="absolute right-2 sm:right-6 grid place-items-center h-12 w-12 rounded-full bg-white/10 text-white hover:bg-white/20 transition-colors"
                  aria-label="Next photo"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </>
            )}
          </div>

          {count > 1 && (
            <div className="flex justify-center gap-2 overflow-x-auto px-4 pb-5">
              {images.map((src, i) => (
                <button
                  key={src}
                  type="button"
                  onClick={() => onChange(i)}
                  className={`shrink-0 h-14 w-20 overflow-hidden rounded-md transition-opacity ${
                    i === index ? "ring-2 ring-white opacity-100" : "opacity-50 hover:opacity-80"
                  }`}
                  aria-label={`Show photo ${i + 1}`}
                >
                  <img src={src} alt="" className="h-full w-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          )}
        </motion.div>
      )}
    </AnimatePresence>,
    document.body
  );
};

export default Lightbox;

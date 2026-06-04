/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1.5rem",
        lg: "2rem",
      },
      screens: {
        "2xl": "1280px",
      },
    },
    extend: {
      colors: {
        // Signature navy — anchored on the original brand color (#1E3A8A = brand-800)
        brand: {
          50: "#eef4ff",
          100: "#dbe6fe",
          200: "#bfd3fe",
          300: "#93b4fd",
          400: "#6090fa",
          500: "#3b66f6",
          600: "#2547eb",
          700: "#1d3ed4",
          800: "#1e3a8a",
          900: "#172a63",
          950: "#0f1b40",
        },
        // Warm terracotta accent for interior / secondary CTAs (refined replacement for raw red)
        accent: {
          50: "#fdf4f3",
          100: "#fce6e3",
          200: "#fad1cb",
          300: "#f5b0a6",
          400: "#ec8273",
          500: "#df5a47",
          600: "#c9412e",
          700: "#a83425",
          800: "#8b2e22",
          900: "#742b22",
        },
        // Kept for backwards-compat; now aligned to the brand navy
        gold: "#1e3a8a",
      },
      fontFamily: {
        sans: ["Plus Jakarta Sans", "Inter", "system-ui", "sans-serif"],
        display: ["Sora", "Plus Jakarta Sans", "Outfit", "sans-serif"],
        poppins: ["Poppins", "sans-serif"],
        inter: ["Inter", "sans-serif"],
        merriweather: ["Merriweather", "serif"],
        outfit: ["Outfit", "sans-serif"],
        press: ['"Press Start 2P"', "cursive"],
        roboto: ["Roboto", "Inter", "sans-serif"],
      },
      letterSpacing: {
        widest2: "0.2em",
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15,27,64,0.04), 0 6px 18px -6px rgba(15,27,64,0.08)",
        card: "0 2px 6px rgba(15,27,64,0.05), 0 14px 32px -12px rgba(15,27,64,0.14)",
        elevated: "0 12px 48px -16px rgba(15,27,64,0.28)",
        "brand-glow": "0 12px 28px -10px rgba(30,58,138,0.45)",
        "accent-glow": "0 12px 28px -10px rgba(201,65,46,0.4)",
      },
      backgroundImage: {
        "brand-gradient": "linear-gradient(135deg, #1e3a8a 0%, #172a63 60%, #0f1b40 100%)",
        "accent-gradient": "linear-gradient(135deg, #c9412e 0%, #8b2e22 100%)",
        "grid-fade":
          "radial-gradient(60% 80% at 50% 0%, rgba(30,58,138,0.07), transparent 70%)",
      },
      keyframes: {
        "fade-up": {
          "0%": { opacity: "0", transform: "translateY(18px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        float: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "100%": { transform: "translateX(100%)" },
        },
      },
      animation: {
        "fade-up": "fade-up 0.6s ease-out both",
        float: "float 6s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

import animate from "tailwindcss-animate";
import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./app/**/*.{ts,tsx}",
    "./src/**/*.{ts,tsx}"
  ],
  prefix: "",
  theme: {
    container: {
      center: true,
      padding: "2rem",
      screens: {
        "2xl": "1400px",
      },
    },
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",           // Deep monastery red
          foreground: "hsl(var(--primary-foreground))", // Cream
          light: "hsl(var(--primary-light))",       // Lighter red
          glow: "hsl(var(--primary-glow))",         // Gold glow
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",         // Gold
          foreground: "hsl(var(--secondary-foreground))", // Deep red
        },
        destructive: {
          DEFAULT: "#b91c1c",                       // Standard red for destructive
          foreground: "#fff",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",             // Saffron
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",            // Monastery green
          foreground: "hsl(var(--accent-foreground))", // Cream
          soft: "hsl(var(--accent-soft))",          // Soft green
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        monastery: {
          gold: "hsl(var(--monastery-gold))",
          "gold-foreground": "hsl(var(--monastery-gold-foreground))",
        },
        prayer: {
          blue: "hsl(var(--prayer-blue))",
          white: "hsl(var(--prayer-white))",
          red: "hsl(var(--prayer-red))",
          green: "hsl(var(--prayer-green))",
          yellow: "hsl(var(--prayer-yellow))",
        },
        sidebar: {
          DEFAULT: "hsl(var(--sidebar-background))",
          foreground: "hsl(var(--sidebar-foreground))",
          primary: "hsl(var(--sidebar-primary))",
          "primary-foreground": "hsl(var(--sidebar-primary-foreground))",
          accent: "hsl(var(--sidebar-accent))",
          "accent-foreground": "hsl(var(--sidebar-accent-foreground))",
          border: "hsl(var(--sidebar-border))",
          ring: "hsl(var(--sidebar-ring))",
        },
      },
      backgroundImage: {
        "gradient-mountain": "var(--gradient-mountain)",
        "gradient-sky": "var(--gradient-sky)",
        "gradient-monastery": "var(--gradient-monastery)",
        "gradient-mist": "var(--gradient-mist)",
      },
      boxShadow: {
        soft: "var(--shadow-soft)",
        medium: "var(--shadow-medium)",
        large: "var(--shadow-large)",
        monastery: "var(--shadow-monastery)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        'fade-in-up': {
          from: { opacity: '0', transform: 'translateY(32px)' },
          to: { opacity: '1', transform: 'translateY(0)' },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        "slide-in-left": {
          from: { opacity: "0", transform: "translateX(-40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-right": {
          from: { opacity: "0", transform: "translateX(40px)" },
          to: { opacity: "1", transform: "translateX(0)" },
        },
        "slide-in-up": {
          from: { opacity: "0", transform: "translateY(40px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
  'fade-in-up': 'fade-in-up 0.7s cubic-bezier(0.4,0,0.2,1) both',
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        "slide-in-left": "slide-in-left 0.7s cubic-bezier(0.4,0,0.2,1) both",
        "slide-in-right": "slide-in-right 0.7s cubic-bezier(0.4,0,0.2,1) both",
        "slide-in-up": "slide-in-up 0.7s cubic-bezier(0.4,0,0.2,1) both",
      },
      textShadow: {
        'sm': '0 1px 2px rgba(0, 0, 0, 0.05)',
        'DEFAULT': '0 1px 3px rgba(0, 0, 0, 0.1)',
        'lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
        'light': '0 1px 3px rgba(0, 0, 0, 0.3)',
        'heavy': '0 2px 4px rgba(0, 0, 0, 0.5)'
      },
    },
  },
  plugins: [animate],
};
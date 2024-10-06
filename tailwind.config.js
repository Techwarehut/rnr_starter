const { hairlineWidth } = require("nativewind/theme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: "class",
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}"],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))",
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))",
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))",
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))",
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))",
        },
        popover: {
          DEFAULT: "hsl(var(--popover))",
          foreground: "hsl(var(--popover-foreground))",
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))",
        },
        brand: {
          primary: {
            DEFAULT: "hsl(var(--brand-primary))",
            foreground: "hsl(var(--brand-primary-foreground))",
          },
          primaryLight: {
            DEFAULT: "hsl(var(--brand-primary-light))",
            foreground: "hsl(var(--brand-primary-light-foreground))",
          },
          primaryDark: {
            DEFAULT: "hsl(var(--brand-primary-dark))",
            foreground: "hsl(var(--brand-primary-dark-foreground))",
          },
          secondary: {
            DEFAULT: "hsl(var(--brand-secondary))",
            foreground: "hsl(var(--brand-secondary-foreground))",
          },
          secondaryLight: {
            DEFAULT: "hsl(var(--brand-secondary-light))",
            foreground: "hsl(var(--brand-secondary-light-foreground))",
          },
          secondaryDark: {
            DEFAULT: "hsl(var(--brand-secondary-dark))",
            foreground: "hsl(var(--brand-secondary-dark-foreground))",
          },
        },
      },
      borderWidth: {
        hairline: hairlineWidth(),
      },
      spacing: {
        // You can explicitly redefine existing values or add new ones

        15: "8rem", // your custom value
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};

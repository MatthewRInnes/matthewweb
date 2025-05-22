
import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				},
				shop: {
					primary: '#0f172a',     // Navy blue
					secondary: '#0d9488',   // Teal
					accent: '#f97316',      // Orange
					light: '#f8fafc',       // Light gray
					dark: '#1e293b',        // Dark slate
					success: '#10b981',     // Green
					warning: '#f59e0b',     // Amber
					error: '#ef4444',       // Red
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
				'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
				'gradient-subtle': 'linear-gradient(to right, #e0eafc, #cfdef3)',
				'gradient-vibrant': 'linear-gradient(90deg, hsla(139, 70%, 75%, 1) 0%, hsla(63, 90%, 76%, 1) 100%)',
				'gradient-warm': 'linear-gradient(90deg, hsla(24, 100%, 83%, 1) 0%, hsla(341, 91%, 68%, 1) 100%)',
				'gradient-cool': 'linear-gradient(90deg, hsla(221, 45%, 73%, 1) 0%, hsla(220, 78%, 29%, 1) 100%)',
				'gradient-pastel': 'linear-gradient(109.6deg, rgba(223,234,247,1) 11.2%, rgba(244,248,252,1) 91.1%)',
				'gradient-mesh': 'radial-gradient(at 40% 20%, rgba(13,148,136,1) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(15,160,148,1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(13,148,136,0.8) 0px, transparent 50%), radial-gradient(at 80% 50%, rgba(16,142,132,1) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(13,148,136,0.8) 0px, transparent 50%), radial-gradient(at 80% 100%, rgba(15,160,148,1) 0px, transparent 50%), radial-gradient(at 0% 0%, rgba(13,148,136,1) 0px, transparent 50%)',
				'gradient-mesh-dark': 'radial-gradient(at 40% 20%, rgba(30,41,59,1) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(30,41,59,0.8) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(30,41,59,0.6) 0px, transparent 50%), radial-gradient(at 80% 50%, rgba(30,41,59,0.8) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(30,41,59,0.6) 0px, transparent 50%), radial-gradient(at 80% 100%, rgba(30,41,59,0.8) 0px, transparent 50%), radial-gradient(at 0% 0%, rgba(30,41,59,1) 0px, transparent 50%)',
				'creative-gradient': 'linear-gradient(225deg, #FF3CAC 0%, #784BA0 50%, #2B86C5 100%)',
				'purple-gradient': 'linear-gradient(90deg, rgba(147,39,143,1) 0%, rgba(234,172,232,1) 100%)',
				'blue-gradient': 'linear-gradient(90deg, rgba(79,172,254,1) 0%, rgba(0,242,254,1) 100%)',
				'green-gradient': 'linear-gradient(90deg, rgba(168,255,120,1) 0%, rgba(120,255,214,1) 100%)',
				'mesh': 'radial-gradient(at 40% 20%, rgba(13,148,136,1) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(15,160,148,1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(13,148,136,0.8) 0px, transparent 50%), radial-gradient(at 80% 50%, rgba(16,142,132,1) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(13,148,136,0.8) 0px, transparent 50%), radial-gradient(at 80% 100%, rgba(15,160,148,1) 0px, transparent 50%), radial-gradient(at 0% 0%, rgba(13,148,136,1) 0px, transparent 50%)',
				'mesh-dark': 'radial-gradient(at 40% 20%, rgba(30,41,59,1) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(30,41,59,0.8) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(30,41,59,0.6) 0px, transparent 50%), radial-gradient(at 80% 50%, rgba(30,41,59,0.8) 0px, transparent 50%), radial-gradient(at 0% 100%, rgba(30,41,59,0.6) 0px, transparent 50%), radial-gradient(at 80% 100%, rgba(30,41,59,0.8) 0px, transparent 50%), radial-gradient(at 0% 0%, rgba(30,41,59,1) 0px, transparent 50%)',
			},
			keyframes: {
				'accordion-down': {
					from: {
						height: '0'
					},
					to: {
						height: 'var(--radix-accordion-content-height)'
					}
				},
				'accordion-up': {
					from: {
						height: 'var(--radix-accordion-content-height)'
					},
					to: {
						height: '0'
					}
				},
				'fade-in': {
					'0%': { opacity: '0' },
					'100%': { opacity: '1' }
				},
				'slide-in': {
					'0%': { transform: 'translateX(-10px)', opacity: '0' },
					'100%': { transform: 'translateX(0)', opacity: '1' }
				},
				'slide-up': {
					'0%': { transform: 'translateY(20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'slide-down': {
					'0%': { transform: 'translateY(-20px)', opacity: '0' },
					'100%': { transform: 'translateY(0)', opacity: '1' }
				},
				'zoom-in': {
					'0%': { transform: 'scale(0.95)', opacity: '0' },
					'100%': { transform: 'scale(1)', opacity: '1' }
				},
				'pulse-gentle': {
					'0%, 100%': { opacity: '1' },
					'50%': { opacity: '0.8' }
				},
				'float': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-5px)' }
				},
				'glow': {
					'0%, 100%': { boxShadow: '0 0 5px rgba(13,148,136,0.5)' },
					'50%': { boxShadow: '0 0 20px rgba(13,148,136,0.8)' }
				},
				'bounce-gentle': {
					'0%, 100%': { transform: 'translateY(0)' },
					'50%': { transform: 'translateY(-4px)' }
				},
			},
			animation: {
				'accordion-down': 'accordion-down 0.2s ease-out',
				'accordion-up': 'accordion-up 0.2s ease-out',
				'fade-in': 'fade-in 0.3s ease-in-out',
				'slide-in': 'slide-in 0.4s ease-out',
				'slide-up': 'slide-up 0.5s ease-out',
				'slide-down': 'slide-down 0.5s ease-out',
				'zoom-in': 'zoom-in 0.4s ease-out',
				'pulse-gentle': 'pulse-gentle 3s ease-in-out infinite',
				'float': 'float 3s ease-in-out infinite',
				'glow': 'glow 2s ease-in-out infinite',
				'bounce-gentle': 'bounce-gentle 2s ease-in-out infinite',
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;

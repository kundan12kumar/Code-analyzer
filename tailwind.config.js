module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Primary Colors
        'primary': '#4F46E5', // Primary buttons, active states - indigo-600
        'primary-hover': '#4338CA', // Hover state for primary elements - indigo-700
        'primary-light': '#E0E7FF', // Highlighted content backgrounds - indigo-100
        
        // Neutral Colors - Light Mode
        'background-light': '#FFFFFF', // Main background light mode - white
        'surface-light': '#F9FAFB', // Card backgrounds light mode - gray-50
        'border-light': '#E5E7EB', // Subtle borders light mode - gray-200
        'text-primary-light': '#111827', // Primary text light mode - gray-900
        'text-secondary-light': '#4B5563', // Secondary text light mode - gray-600
        
        // Neutral Colors - Dark Mode
        'background-dark': '#111827', // Main background dark mode - gray-900
        'surface-dark': '#1F2937', // Card backgrounds dark mode - gray-800
        'border-dark': '#374151', // Subtle borders dark mode - gray-700
        'text-primary-dark': '#F9FAFB', // Primary text dark mode - gray-50
        'text-secondary-dark': '#9CA3AF', // Secondary text dark mode - gray-400
        
        // Semantic Colors
        'success': '#10B981', // Success states - emerald-500
        'warning': '#F59E0B', // Warning states - amber-500
        'error': '#F43F5E', // Error states - rose-500
        'info': '#0EA5E9', // Informational states - sky-500
        
        // Code Syntax Colors
        'code-syntax-1': '#38BDF8', // Code keywords - sky-400
        'code-syntax-2': '#FCD34D', // Code strings - amber-300
        'code-syntax-3': '#34D399', // Code comments - emerald-400
        'code-syntax-4': '#FB7185', // Code functions - rose-400
        
        // Code Editor Colors
        'code-bg': {
          'light': '#F8F9FC', // Code background light
          'dark': '#1A1D2A', // Code background dark
        },
        'editor-bg': {
          'light': '#FFFFFF', // Editor background light
          'dark': '#1E1E1E', // Editor background dark
        },
        'editor-gutter': {
          'light': '#F1F5F9', // Editor gutter light
          'dark': '#252526', // Editor gutter dark
        }
      },
      fontFamily: {
        'sans': ['Inter', 'ui-sans-serif', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'Helvetica Neue', 'Arial', 'sans-serif'],
        'mono': ['JetBrains Mono', 'ui-monospace', 'SFMono-Regular', 'Menlo', 'Monaco', 'Consolas', 'Liberation Mono', 'Courier New', 'monospace']
      },
      fontSize: {
        'display': ['36px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.025em' }],
        'heading-1': ['30px', { lineHeight: '1.2', fontWeight: '700', letterSpacing: '-0.025em' }],
        'heading-2': ['24px', { lineHeight: '1.3', fontWeight: '600' }],
        'heading-3': ['20px', { lineHeight: '1.4', fontWeight: '600' }],
        'subtitle': ['18px', { lineHeight: '1.5', fontWeight: '500' }],
        'body': ['16px', { lineHeight: '1.6' }],
        'body-small': ['14px', { lineHeight: '1.5' }],
        'code': ['14px', { lineHeight: '1.5', fontFamily: 'JetBrains Mono' }],
        'button': ['14px', { lineHeight: '1.4', fontWeight: '500' }],
        'caption': ['12px', { lineHeight: '1.4' }]
      }
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
    require('@tailwindcss/forms'),
    require('tailwindcss-animate')
  ],
}
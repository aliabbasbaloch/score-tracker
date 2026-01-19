/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./public/**/*.{html,js}",
    "./src/**/*.{html,js}"
  ],
  theme: {
    extend: {
      colors: {
        'primary-bg': '#0d1117',
        'secondary-bg': '#161b22',
        'accent-bg': '#21262d',
        'text-primary': '#f0f6fc',
        'text-secondary': '#8b949e',
        'snooker-yellow': '#ffdd00',
        'snooker-green': '#33ff77',
        'snooker-brown': '#d2691e',
        'snooker-blue': '#4d9fff',
        'snooker-pink': '#ff66cc',
        'snooker-black': '#222222',
        'snooker-red': '#ff5555',
        'snooker-purple': '#aa66ff',
        'border-color': '#30363d',
      },
      boxShadow: {
        'custom': '0 2px 4px -1px rgba(0, 0, 0, 0.3)',
      },
      backgroundImage: {
        'radial-gradient-1': 'radial-gradient(circle at 20% 30%, rgba(255, 221, 0, 0.03) 0%, transparent 20%)',
        'radial-gradient-2': 'radial-gradient(circle at 80% 80%, rgba(51, 255, 119, 0.03) 0%, transparent 20%)',
      }
    },
  },
  plugins: [],
}

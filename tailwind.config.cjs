/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{html,js,jsx,ts,tsx}'],
  important: true,
  theme: {
    extend: {
      colors: {
        primary: '#FFB606',
        gray: '#E8EBED',
        price: 'rgba(255,34,68,0.8)',
      },
      backgroundColor: {
        breadcrumb: '#F3F3F3',
        info: '#333333',
      },
      textColor: {
        normal: '#584C47',
        footer: '#999999',
        breadcrumb: '#333333',
      },
      gridTemplateColumns: {
        'course-item': '270px 1fr',
      },
      borderWidth: {
        thin: '1px',
      },
      borderColor: {
        thin: '#eee',
        info: '#cccccc',
      },
    },
  },
  plugins: [],
}

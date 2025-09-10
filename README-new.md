# Bence Szilagyi - Portfolio Website

A modern, responsive portfolio website built with Astro, featuring smooth animations, clean design, and optimal performance.

## ✨ Features

- **Modern Design**: Clean, professional layout with dark theme
- **Smooth Animations**: Engaging scroll-triggered animations and hover effects
- **Responsive**: Fully optimized for mobile, tablet, and desktop
- **Performance**: Built with Astro for lightning-fast loading
- **Accessibility**: WCAG compliant with proper focus management
- **SEO Optimized**: Semantic HTML and meta tags

## 🛠️ Tech Stack

- **Framework**: [Astro](https://astro.build/)
- **Styling**: [Tailwind CSS](https://tailwindcss.com/)
- **Typography**: [Inter Font](https://fonts.google.com/specimen/Inter)
- **Animations**: CSS animations with Intersection Observer API
- **Icons**: Custom SVG icons

## 🚀 Getting Started

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/portfolio.git
   cd portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Start development server**
   ```bash
   npm run dev
   ```

4. **Build for production**
   ```bash
   npm run build
   ```

## 📁 Project Structure

```
/
├── public/
│   └── favicon.svg
├── src/
│   ├── components/
│   │   ├── Navigation.astro
│   │   ├── Hero.astro
│   │   ├── About.astro
│   │   ├── Skills.astro
│   │   ├── Projects.astro
│   │   ├── Contact.astro
│   │   └── Footer.astro
│   ├── layouts/
│   │   └── Layout.astro
│   ├── pages/
│   │   └── index.astro
│   └── styles/
│       └── global.css
├── astro.config.mjs
└── tailwind.config.mjs
```

## 🎨 Customization

### Colors
Update the color scheme in `tailwind.config.mjs` and component styles.

### Content
- Update personal information in each component
- Replace placeholder project data with your actual projects
- Add your resume link in the About section
- Update social media links in the Contact and Footer components

### Images
- Replace profile image placeholder in About section
- Add project screenshots in Projects section
- Update favicon in `public/` directory

## 📱 Responsive Design

The website is optimized for:
- Mobile devices (320px and up)
- Tablets (768px and up)
- Desktop (1024px and up)
- Large screens (1440px and up)

## 🔧 Available Scripts

- `npm run dev` - Start development server
- `npm run build` - Build for production
- `npm run preview` - Preview production build locally

## 📝 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Feel free to fork this project and customize it for your own portfolio. If you find any bugs or have suggestions for improvements, please open an issue or submit a pull request.

---

Built with ❤️ by Bence Szilagyi

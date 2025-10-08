# 🌴 Kelechi's Interactive 3D Portfolio

A stunning, fully interactive 3D portfolio website featuring a floating island paradise, dynamic time-of-day lighting, and engaging animations. Built with React, Three.js, and React Three Fiber to showcase software engineering and 3D development skills!

![Screenshot (4).png](src/assets/images/Screenshot%20%284%29.png)

> **"Hi, I'm Kelechi 👋 A Software Engineer and 3D Enthusiast"**

## ✨ Features

### 🏝️ **Interactive Floating Island**
- Beautifully crafted low-poly 3D island with detailed buildings, trees, and scenery
- Fully interactive - click and drag to rotate and explore from every angle
- Smooth physics-based rotation with momentum
- Responsive design that adapts perfectly to mobile and desktop screens

### 🦊 **Animated Fox Character**
- Interactive fox that responds to your typing with smooth animations
- Brings personality and charm to the portfolio experience
- Context-aware reactions and movements

### 🌅 **Real-Time Dynamic Lighting System**
The portfolio automatically adjusts its atmosphere based on the actual time of day in your location:

- **🌄 Morning (6 AM - 12 PM)**: Warm, golden sunrise with soft peachy tones
- **☀️ Afternoon (12 PM - 5 PM)**: Bright, vibrant daylight with clear blue skies
- **🌆 Evening (5 PM - 8 PM)**: Stunning sunset with orange, pink, and purple gradients
- **🌙 Night (8 PM - 6 AM)**: Cool, moonlit atmosphere with deep blue skies and stars

Each time period features custom lighting configurations:
- Directional light intensity adjustments
- Ambient lighting changes
- Hemisphere lighting for realistic sky-to-ground color gradients
- Dynamic sky color transitions

### ✈️ **Flying Vintage Biplane**
- Animated biplane that circles the island
- Adds dynamic movement and visual storytelling
- Synchronized with the island's rotation state

### 🐦 **Animated Birds**
- Flying birds that bring the scene to life
- Natural flight patterns and animations
- Enhances the immersive atmosphere

### 🎯 **Portfolio Navigation**
- Click different areas of the island to reveal portfolio sections
- Smooth info panel transitions
- **About** - Learn about Kelechi's background and journey
- **Projects** - Explore featured work and achievements
- **Contact** - Get in touch for opportunities

### 📱 **Fully Responsive Design**
- Optimized for all screen sizes (mobile, tablet, desktop)
- Touch-friendly controls on mobile devices
- Adaptive 3D model scaling and camera positioning
- Consistent experience across devices

## 🚀 Live Demo

**[View Live Portfolio →](your-vercel-url-here.vercel.app)**

## 🛠️ Tech Stack

### Core Technologies
- **React** - Component-based UI framework
- **Three.js** - Powerful 3D graphics library
- **React Three Fiber** - React renderer for Three.js
- **@react-three/drei** - Useful helpers for R3F

### Styling & Build
- **Tailwind CSS** - Utility-first CSS framework
- **Vite** - Lightning-fast build tool and dev server

### Deployment
- **Vercel** - Seamless deployment and hosting platform

## 📦 Installation & Setup

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Steps

1. **Clone the repository**
   ```bash
   git clone https://github.com/kelechi/3d-portfolio.git
   cd 3d-portfolio
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Start the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

4. **Open your browser**
   Navigate to `http://localhost:5173`

5. **Build for production**
   ```bash
   npm run build
   # or
   yarn build
   ```

## 🎨 Customization Guide

### Adjusting Time of Day Lighting
Edit the `getLightingConfig()` function in `src/pages/Home.jsx`:

```javascript
case "evening":
  return {
    directionalIntensity: 1.5,      // Sun/moon brightness
    ambientIntensity: 0.4,          // Overall scene brightness
    hemisphereIntensity: 0.8,       // Sky-to-ground lighting
    skyColor: "#ff8c42",            // Upper hemisphere color
    groundColor: "#2a1810",         // Lower hemisphere color
    directionalColor: "#ffb366"     // Main light color
  };
```

### Modifying 3D Model Positions
Adjust responsive scaling in `Home.jsx`:

```javascript
const adjustIslandForScreenSize = () => {
  let screenScale = null;
  let screenPosition = [0, -6.5, -43];  // [x, y, z]
  let rotation = [0.1, 4.7, 0];         // [x, y, z] in radians
  
  if (window.innerWidth < 768) {
    screenScale = [0.9, 0.9, 0.9];      // Mobile scale
  } else {
    screenScale = [1, 1, 1];             // Desktop scale
  }
  
  return [screenScale, screenPosition, rotation];
};
```

### Customizing Camera Settings
Modify the Canvas camera configuration:

```javascript
<Canvas 
  camera={{ 
    near: 0.1,        // Minimum render distance
    far: 1000         // Maximum render distance
  }}
>
```

## 📁 Project Structure

```
3d-portfolio-2/
├── node_modules/              # Dependencies (library root)
├── public/                    # Static assets
├── src/                       # Source code
│   ├── components/            # React components
│   │   ├── HomeInfo.jsx       # Info panels for each stage
│   │   ├── Loader.jsx         # 3D loading component
│   │   └── Navbar.jsx         # Navigation bar
│   ├── models/                # 3D models and scenes
│   │   ├── Island.jsx         # Main floating island
│   │   ├── Sky.jsx            # Dynamic sky with time system
│   │   ├── Bird.jsx           # Animated bird
│   │   ├── Plane.jsx          # Flying biplane
│   │   └── Fox.jsx            # Interactive fox character
│   ├── pages/                 # Page components
│   │   ├── Home.jsx           # Main 3D scene page
│   │   ├── About.jsx          # About section
│   │   ├── Projects.jsx       # Projects showcase
│   │   └── Contact.jsx        # Contact form
│   ├── assets/                # 3D models, textures, icons
│   └── App.jsx                # Root component with routing
├── .env.local                 # Environment variables (not tracked)
├── .gitignore                 # Git ignore rules
├── eslint.config.js           # ESLint configuration
├── index.html                 # HTML entry point
├── package.json               # Dependencies and scripts
├── package-lock.json          # Locked dependency versions
├── README.md                  # This file!
├── tailwind.config.mjs        # Tailwind CSS configuration
└── vite.config.js             # Vite build configuration
```

## 🎯 Skills Demonstrated

This portfolio showcases professional-level skills in:

- ✅ **Advanced 3D Web Development** - Complex Three.js scenes
- ✅ **React Mastery** - Hooks, state management, component architecture
- ✅ **Modern JavaScript** - ES6+, functional programming
- ✅ **Performance Optimization** - Lazy loading, Suspense, efficient rendering
- ✅ **Responsive Design** - Mobile-first, adaptive layouts
- ✅ **Creative Problem-Solving** - Time-based lighting, interactive controls
- ✅ **UI/UX Design** - Intuitive interactions, smooth animations
- ✅ **Code Organization** - Clean, maintainable, scalable structure

## 🚢 Deployment

### Deploy to Vercel (Recommended)

1. **Push to GitHub**
   ```bash
   git add .
   git commit -m "Initial commit"
   git push origin main
   ```

2. **Deploy via Vercel CLI**
   ```bash
   npm install -g vercel
   vercel --prod
   ```

3. **Or connect GitHub to Vercel**
    - Go to [vercel.com](https://vercel.com)
    - Import your repository
    - Vercel auto-detects Vite configuration
    - Deploy automatically on every push!

### Alternative Deployment Options
- **Netlify**: Drag and drop the `dist` folder
- **GitHub Pages**: Use `gh-pages` package
- **AWS S3 + CloudFront**: For custom domain setup

## 🎮 How to Use

1. **🖱️ Rotate the Island**: Click and drag anywhere to spin the island
2. **⏰ Watch Time Change**: The scene automatically adjusts to match your local time
3. **⌨️ Interact with Fox**: Type to trigger fox animations on the Contact page
4. **🔍 Explore Sections**: Click hotspots on the island to navigate to different portfolio sections
5. **✈️ Enjoy the Atmosphere**: Watch the biplane soar and birds fly across the beautiful sky

## ⚡ Performance Tips

- Models are optimized with low-poly geometry
- Textures are compressed for faster loading
- Uses React Suspense for progressive loading
- Efficient render loop with React Three Fiber
- Responsive scaling reduces complexity on mobile

## 🐛 Troubleshooting

### Models Not Loading
- Check that all 3D model files (.glb/.gltf) are in `src/assets/`
- Verify file paths in import statements
- Check browser console for CORS or 404 errors

### Low Performance
- Reduce `directionalIntensity` and lighting effects
- Lower polygon count of 3D models
- Disable shadows if enabled
- Test on different browsers (Chrome recommended)

### Touch Controls Not Working
- Ensure touch events are enabled in model components
- Check mobile viewport meta tag in `index.html`
- Test on actual mobile device, not just browser DevTools

## 📄 License

MIT License - Feel free to fork and customize for your own portfolio!

## 🤝 Contributing

Found a bug or have a feature idea? Contributions are welcome!

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit changes (`git commit -m 'Add AmazingFeature'`)
4. Push to branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 👨‍💻 About Kelechi

**Software Engineer | 3D Enthusiast | Creative Developer**

Passionate about creating immersive web experiences that blend cutting-edge technology with beautiful design. This portfolio represents the intersection of software engineering and creative 3D development.

### Connect
- 🌐 Portfolio: https://kelechistackdev.vercel.app
- 💼 LinkedIn:https://www.linkedin.com/in/kelechi-akwara-8a7862248/
- 🐙 GitHub: https://github.com/Kellysabi
- 📧 Email: kelechiemmanuel888@gmail.com 

## 🌟 Show Your Support

If this portfolio inspired you or helped you learn something new, give it a ⭐️!

**Keywords**: #3D #React #ThreeJS #WebGL #Portfolio #Interactive #Animation #WebDevelopment #CreativeCoding

---

**Built with ❤️ by SabiDev, React, and Three.js** | *Making the web more immersive, one island at a time* 🏝️

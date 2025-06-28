# 🌿 Mindful Grove

> A tranquil, mini-garden experience that turns small self-care moments into lush, living art.

![React](https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB)
![TypeScript](https://img.shields.io/badge/TypeScript-007ACC?style=for-the-badge&logo=typescript&logoColor=white)
![Three.js](https://img.shields.io/badge/Three.js-000000?style=for-the-badge&logo=three.js&logoColor=white)
![Tailwind CSS](https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/Vite-646CFF?style=for-the-badge&logo=vite&logoColor=white)

## 🎯 Overview

Mindful Grove is an interactive wellness garden where users cultivate three distinct "wellness plants" by completing guided self-care activities. Each plant represents a pillar of mental health—Calm, Focus, and Creativity—and grows through consistent, mindful practices rather than mindless clicking.

## ✨ Features

### 🌱 Three Wellness Plants
- **🪷 Calm Lily**: Grows through breathing exercises and mindfulness practices
- **🌿 Focus Fern**: Thrives when you complete distraction-free work blocks
- **🌵 Creative Cactus**: Blossoms when you engage in creative writing or sketching

### 🎮 Core Mechanics
- **Guided Wellness Prompts**: Brief, interactive exercises for each plant type
- **Growth Stages**: Plants evolve from seed → sprout → bud → bloom
- **3D Visualization**: Beautiful Three.js-powered garden with smooth animations
- **Progress Tracking**: Visual progress meters and growth statistics
- **Zen Mode**: Immersive, UI-free garden experience

### 🌸 Advanced Features
- **Seasonal Changes**: Garden backgrounds cycle through seasons based on consistency
- **Streak System**: Daily check-ins unlock special animations and rewards
- **Ambient Audio**: Gentle nature sounds and feedback chimes
- **Local Persistence**: Your garden progress is saved locally
- **Responsive Design**: Beautiful experience across all devices

## 🛠 Tech Stack

- **Frontend**: React 18 + TypeScript
- **3D Rendering**: Three.js with React Three Fiber
- **Styling**: Tailwind CSS + shadcn/ui components
- **State Management**: Zustand
- **Build Tool**: Vite
- **Storage**: LocalStorage with IndexedDB fallback
- **Animation**: CSS transitions + Three.js animations

## 🚀 Quick Start

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/yourusername/serene-growth-sanctuary.git
cd serene-growth-sanctuary

# Install dependencies (choose one)
npm install
# or
yarn install
# or
bun install
```

### Development

```bash
# Start the development server
npm run dev
# or
yarn dev
# or
bun dev
```

Visit `http://localhost:5173` to see your garden!

### Build for Production

```bash
# Build the project
npm run build
# or
yarn build
# or
bun run build
```

## 🎪 Usage

1. **Start Your Garden**: Visit the app to see your three seedling plants
2. **Complete Wellness Prompts**: 
   - Click on any plant to open its wellness prompt
   - Follow the guided exercises (breathing, focus work, creative writing)
   - Watch your plant grow as you complete activities
3. **Track Progress**: Monitor your plants' growth stages and daily streaks
4. **Enter Zen Mode**: Toggle to hide UI and enjoy your garden in peace
5. **Build Consistency**: Visit daily to maintain your garden and unlock seasonal changes

## 📁 Project Structure

```
src/
├── components/
│   ├── Garden3D.tsx         # Main 3D garden scene
│   ├── Plant3D.tsx          # Individual 3D plant components
│   ├── PlantCard.tsx        # Plant info and progress cards
│   ├── WellnessPrompt.tsx   # Interactive wellness exercises
│   └── ui/                  # shadcn/ui component library
├── hooks/
│   ├── use-mobile.tsx       # Mobile device detection
│   └── use-toast.ts         # Toast notification system
├── pages/
│   ├── Index.tsx            # Main garden page
│   └── NotFound.tsx         # 404 page
├── store/
│   └── gardenStore.ts       # Zustand state management
└── lib/
    └── utils.ts             # Utility functions
```

## 🌱 Development Roadmap

- [x] **Phase 1**: Basic React setup and UI components
- [x] **Phase 2**: Three.js integration and 3D plant models
- [x] **Phase 3**: Wellness prompt system
- [x] **Phase 4**: Growth logic and animations
- [ ] **Phase 5**: Audio integration and ambient sounds
- [ ] **Phase 6**: Advanced breathing detection (microphone API)
- [ ] **Phase 7**: PWA support and offline functionality
- [ ] **Phase 8**: Social features and garden sharing

## 🎨 Design Philosophy

Mindful Grove emphasizes:
- **Gentle Interaction**: No aggressive notifications or pressure
- **Visual Reward**: Beautiful, organic growth animations
- **Mindful Moments**: Quality over quantity in wellness practices
- **Consistency**: Small, daily actions lead to meaningful growth
- **Tranquility**: Calming colors, smooth animations, and peaceful sounds

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guidelines](CONTRIBUTING.md) for details.

### Development Setup
1. Fork the repository
2. Create a feature branch: `git checkout -b feature/amazing-feature`
3. Make your changes and test thoroughly
4. Commit with clear messages: `git commit -m 'Add amazing feature'`
5. Push to your branch: `git push origin feature/amazing-feature`
6. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🌟 Acknowledgments

- Inspired by the Japanese concept of "forest bathing" (shinrin-yoku)
- Built with love for mental health awareness
- Special thanks to the Three.js and React communities

---

**Remember**: Every breath, every focused minute, and every creative spark grows a living, breathing garden—small moments of care yield beautiful results. 🌿✨

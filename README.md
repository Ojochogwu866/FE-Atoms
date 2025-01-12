# ATOMS - React + TypeScript + Vite Project

## Overview
A modern web application built with React 18, TypeScript, and Vite, featuring fast refresh and comprehensive ESLint configuration. This project provides a robust foundation for building scalable and maintainable web applications.

## 🚀 Features
- **React 18** - Latest version of React with improved performance and new features
- **TypeScript** - Full type safety and enhanced developer experience
- **Vite** - Lightning fast build tool with Hot Module Replacement (HMR)
- **ESLint** - Configured for type-aware linting
- **Modern Development** - Fast Refresh enabled through official Vite plugins

## 🛠️ Tech Stack
- React 18.3
- TypeScript 5.x
- Vite 5.x
- ESLint with TypeScript support
- Choice of bundlers: Babel or SWC

## 📦 Installation

```bash
# Clone the repository
git clone <your-repo-url>

# Navigate to project directory
cd your-project-name

# Install dependencies
npm install

# Start development server
npm run dev
```

## 🔧 Available Scripts

```bash
# Start development server
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview

# Run ESLint
npm run lint
```

## ⚙️ Configuration

### Vite Plugins
Two official plugins are available for Fast Refresh:

1. **@vitejs/plugin-react**
   - Uses Babel
   - [Documentation](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react/README.md)

2. **@vitejs/plugin-react-swc**
   - Uses SWC (Rust-based compiler)
   - [Documentation](https://github.com/vitejs/vite-plugin-react-swc)
   - Recommended for larger projects due to faster compilation

### ESLint Configuration

For production applications, enable type-aware lint rules with the following configuration:

1. **Configure Parser Options**
```js
export default tseslint.config({
    languageOptions: {
        parserOptions: {
            project: ['./tsconfig.node.json', './tsconfig.app.json'],
            tsconfigRootDir: import.meta.dirname,
        },
    },
});
```

2. **Enable Type Checking**
- Replace `tseslint.configs.recommended` with either:
  - `tseslint.configs.recommendedTypeChecked`
  - `tseslint.configs.strictTypeChecked`
- Optionally add `...tseslint.configs.stylisticTypeChecked`

3. **Configure React ESLint Plugin**
```js
// eslint.config.js
import react from 'eslint-plugin-react';

export default tseslint.config({
    settings: { 
        react: { 
            version: '18.3' 
        } 
    },
    plugins: {
        react,
    },
    rules: {
        ...react.configs.recommended.rules,
        ...react.configs['jsx-runtime'].rules,
    },
});
```

## 🌐 Environment Setup

### Development Requirements
- Node.js 18.x or higher
- npm 7.x or higher

### Environment Variables
Create a `.env` file in the root directory:
```env
VITE_APP_TITLE=Atoms
GITHUB_API_URL=https://github.com/Ojochogwu866/BE-Atoms
```

## 📚 Additional Resources
- [Vite Documentation](https://vitejs.dev/)
- [React Documentation](https://react.dev/)
- [TypeScript Documentation](https://www.typescriptlang.org/)
- [ESLint Documentation](https://eslint.org/)

## 📝 License
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 🤝 Contributing
Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) for details on our code of conduct and the process for submitting pull requests.
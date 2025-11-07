# 🔐 Password Generator

A sleek, modern password generator that creates secure, cryptographically-random passwords with extensive customization options. Built with vanilla JavaScript, HTML, and CSS - no frameworks or dependencies required.

## ✨ Features

### 🎯 Core Features

- **Customizable Length**: Generate passwords from 1 to 128 characters
- **Character Type Options**: Toggle symbols, uppercase, lowercase, and numbers independently
- **Multiple Passwords**: Generate 4 unique passwords simultaneously
- **One-Click Copy**: Click any password field to copy to clipboard instantly
- **Copy All**: Copy all 4 passwords at once with a single button
- **Smart Copy Protection**: Prevents copying empty or loading password fields

### 🔒 Security Features

- **Cryptographically Secure**: Uses `crypto.getRandomValues()` for true randomness
- **Pattern Requirements**: Ensures at least one character from each selected type
- **Exclude Similar Characters**: Optional filter for confusing characters (0/O, 1/l/I)
- **Memorable Passwords**: Generate word-based passwords for better recall (e.g., `Crystal-Phoenix-Mountain-Sunset42!`)
- **508 Word Dictionary**: Extensive word list for memorable password variety

### 🎨 User Experience

- **Dark/Light Theme Toggle**: Smooth animated theme switching with persistence
- **Enhanced Notifications**:
  - Success/error/info message types with color-coded icons
  - Animated progress bar showing auto-dismiss countdown
  - Manual close button with keyboard support
  - Smooth slide-in/out animations
- **Loading Animations**: Visual feedback during password generation
- **Fade-in Effects**: Smooth password reveal animations
- **Pulse Effects**: Interactive button feedback

### ⌨️ Keyboard Shortcuts

- **Enter** (on length input): Generate passwords
- **Ctrl/Cmd + Enter**: Generate passwords (anywhere)
- **Ctrl/Cmd + Shift + C**: Copy all passwords
- **Enter/Space** (on password field): Copy that password

### 💾 Persistence

- **LocalStorage Integration**: Remembers all preferences between sessions
  - Character type selections
  - Password length
  - Theme preference
  - Exclude similar characters setting
  - Memorable password toggle

### 📱 Responsive Design

- **Fully Optimized**: Perfect display on mobile, tablet, and desktop
- **Adaptive Layout**: Stacks on mobile, side-by-side on desktop
- **Touch-Friendly**: Large tap targets for mobile users
- **Modern Aesthetics**: Clean design with smooth animations

### ♿ Accessibility

- **ARIA Labels**: Comprehensive screen reader support
- **Keyboard Navigation**: Full keyboard accessibility with tab order
- **Focus Indicators**: Clear visual focus states
- **Semantic HTML**: Proper HTML5 structure
- **Role Attributes**: Proper ARIA roles for interactive elements

### 🔗 SEO & Sharing

- **Open Graph Tags**: Optimized Facebook/LinkedIn sharing
- **Twitter Cards**: Enhanced Twitter preview
- **Meta Tags**: Complete SEO optimization
- **Descriptive Content**: Keyword-rich descriptions

## 🚀 Demo

Simply open `index.html` in your browser - no build process required!

## 🛠️ Technologies

- **HTML5**: Semantic markup with ARIA accessibility features
- **CSS3**: Modern styling with CSS variables, rem units, flexbox, and responsive media queries
- **Vanilla JavaScript ES6+**: Clean code with modular architecture, arrow functions, and destructuring
- **Web Crypto API**: Cryptographically secure random number generation
- **LocalStorage API**: Client-side preference persistence
- **Clipboard API**: Seamless copy-to-clipboard functionality

## 📋 Usage

1. **Set Password Length**: Enter desired length (defaults to 15, max 128)
2. **Choose Character Types**: Toggle checkboxes for symbols, uppercase, lowercase, and numbers
3. **Optional Settings**:
   - Enable "Exclude Similar Characters" to avoid confusing characters
   - Enable "Memorable Password" for word-based passwords
4. **Generate**: Click "Generate passwords" to create 4 unique passwords
5. **Copy**: Click any password field to copy it, or use "Copy All" for all 4
6. **Theme**: Toggle dark/light mode with the sun/moon icon in top-right

## 🎨 Customization

All styling uses CSS custom properties (variables) located in `styles.css`:

### Color Scheme

```css
/* Dark Theme */
--bg-primary: #1c1c1c;
--bg-secondary: #1f2937;
--bg-tertiary: #273549;
--accent: #10b981;
--text-primary: #ffffff;

/* Light Theme */
--bg-primary: #1c1c1c;
--bg-secondary: #ecfdf5;
--bg-tertiary: #e5e7eb;
--accent: #10b981;
--text-primary: #111827;
```

### Typography

- **Headers**: Karla font family
- **Body/UI**: Inter font family
- **Sizing**: Rem-based units (1rem = 16px)

## 📱 Responsive Breakpoints

- **Desktop**: Default layout (>768px)
- **Tablet**: Optimized layout (481px - 768px)
- **Mobile**: Stacked layout (≤480px)

## 🎭 Animations

- **Theme Toggle**: Rotating icon transition with pulse effect
- **Notifications**: Slide-in with bounce, checkmark pop, progress bar
- **Password Fields**: Fade-in on generation, hover/active states
- **Buttons**: Scale transforms, loading spinners

## 🔒 Security Note

Passwords are generated client-side using the Web Crypto API (`crypto.getRandomValues()`), providing cryptographically secure randomness suitable for password generation. All processing happens in your browser - no data is sent to any server.

## 📄 License

MIT License - feel free to use this project however you'd like!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

## 🙏 Acknowledgments

- Font families: [Google Fonts](https://fonts.google.com/) (Inter & Karla)
- Icons: Feather Icons (embedded SVG)
- Inspiration: Modern UI/UX best practices

---

Made with ❤️ by [tariqkhemili-git](https://github.com/tariqkhemili-git)

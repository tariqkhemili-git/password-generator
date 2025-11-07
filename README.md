# 🔐 Password Generator

A sleek, modern password generator that creates secure passwords with customizable options. Built with vanilla JavaScript, HTML, and CSS - no frameworks or dependencies required.

## ✨ Features

- **Customizable Length**: Generate passwords from 1 to 128 characters
- **Character Type Options**: Toggle symbols, uppercase, lowercase, and numbers independently
- **Multiple Passwords**: Generate 4 unique passwords simultaneously
- **One-Click Copy**: Click any password field to copy to clipboard
- **Toast Notifications**: Visual feedback when passwords are copied
- **LocalStorage Persistence**: Remembers your preferences between sessions
- **Responsive Design**: Fully optimized for mobile, tablet, and desktop
- **Clean UI**: Modern dark theme with smooth animations and transitions

## 🚀 Demo

Simply open `index.html` in your browser - no build process required!

## 🛠️ Technologies

- **HTML5**: Semantic markup with accessibility features
- **CSS3**: Modern styling with rem units, flexbox, and responsive media queries
- **Vanilla JavaScript**: Clean ES6+ code with modular architecture

## 📋 Usage

1. **Set Password Length**: Enter desired length (defaults to 15)
2. **Choose Character Types**: Toggle checkboxes for symbols, uppercase, lowercase, and numbers
3. **Generate**: Click "Generate passwords" to create 4 unique passwords
4. **Copy**: Click any password field to copy it to your clipboard

## 🎨 Customization

All styling variables are located in `styles.css`. Key color values:

- Primary: `#10b981` (green)
- Background: `#1c1c1c` (dark gray)
- Container: `#1f2937` (slate)
- Fields: `#273549` (blue-gray)

## 📱 Responsive Breakpoints

- **Desktop**: Default layout (768px+)
- **Tablet**: Optimized layout (481px - 768px)
- **Mobile**: Stacked layout (≤480px)

## 🔒 Security Note

Passwords are generated client-side using JavaScript's `Math.random()`. For cryptographically secure passwords, consider using `crypto.getRandomValues()` in production environments.

## 📄 License

MIT License - feel free to use this project however you'd like!

## 🤝 Contributing

Contributions, issues, and feature requests are welcome!

---

Made with ❤️ by [tariqkhemili-git](https://github.com/tariqkhemili-git)

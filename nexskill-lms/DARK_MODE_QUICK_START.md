# 🌓 Dark Mode - Quick Start Guide

## ⚡ Instant Access

### Toggle Button Location
**Top-right corner of every page** - next to the language selector

```
┌─────────────────────────────────────────┐
│  NexSkill LMS              🌐 [☀️ Light]│ ← Click here!
│                                         │
│  Dashboard content...                   │
└─────────────────────────────────────────┘
```

## 🎯 Three Ways to Access

### 1. Quick Toggle (Everywhere)
- **Location**: Top-right corner
- **Options**: Light ↔️ Dark
- **One click** to switch

### 2. Full Selector (Settings)
- **Location**: `/student/settings` → Preferences tab
- **Options**: ☀️ Light | 🌙 Dark | 💻 System
- **Choose** your preferred theme

### 3. Programmatic (Developers)
```tsx
import { useUiPreferences } from '@/context/UiPreferencesContext';

function MyComponent() {
  const { theme, setTheme } = useUiPreferences();
  // theme is 'light' | 'dark' | 'system'
  // setTheme('dark') to change
}
```

---

## ✅ What Works

- ✅ All student pages
- ✅ All coach pages  
- ✅ All admin pages
- ✅ All platform owner pages
- ✅ All support staff pages
- ✅ Auth/login pages
- ✅ Settings pages
- ✅ Live class pages

**Literally everywhere!** 🎉

---

## 💾 Persistence

Your theme choice is automatically saved to **localStorage** and persists across:
- Page refreshes
- Browser restarts
- Different tabs
- Different sessions

---

## 🎨 Quick Dark Mode Class Guide

### Most Common Patterns:

```tsx
// Background
className="bg-white dark:bg-dark-background-card"

// Text
className="text-text-primary dark:text-dark-text-primary"

// Borders
className="border-gray-200 dark:border-gray-700"

// Hover
className="hover:bg-gray-50 dark:hover:bg-gray-800"

// All together
className="bg-white dark:bg-dark-background-card 
           text-text-primary dark:text-dark-text-primary 
           border border-gray-200 dark:border-gray-700 
           transition-colors"
```

---

## 🚀 Try It Now!

1. Open your app
2. Look at top-right corner
3. Click the theme toggle
4. Watch the magic! ✨

The entire app switches instantly with smooth animations.

---

## 📱 Works On

- ✅ Desktop
- ✅ Tablet
- ✅ Mobile
- ✅ All screen sizes

---

## 🎯 Zero Configuration

Everything is already set up and working. Just use it!

- No API calls needed
- No server setup required
- No database changes needed
- No environment variables required

**100% client-side, 100% functional!** 🎉

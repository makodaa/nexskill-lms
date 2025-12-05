// Example: How to add dark mode to existing components

// ❌ BEFORE - No dark mode support
export function OldCard() {
  return (
    <div className="bg-white border border-gray-200 rounded-xl p-6">
      <h3 className="text-gray-900 font-bold mb-2">Card Title</h3>
      <p className="text-gray-600">Card content goes here</p>
      <button className="mt-4 px-4 py-2 bg-blue-600 text-white rounded-lg">
        Action
      </button>
    </div>
  );
}

// ✅ AFTER - With dark mode support
export function NewCard() {
  return (
    <div className="bg-white dark:bg-dark-background-card border border-gray-200 dark:border-gray-700 rounded-xl p-6 transition-colors">
      <h3 className="text-text-primary dark:text-dark-text-primary font-bold mb-2">
        Card Title
      </h3>
      <p className="text-text-secondary dark:text-dark-text-secondary">
        Card content goes here
      </p>
      <button className="mt-4 px-4 py-2 bg-brand-primary hover:bg-blue-700 text-white rounded-lg transition-colors">
        Action
      </button>
    </div>
  );
}

// 💡 PRO TIP: Use semantic color names for easier dark mode
// Instead of: bg-gray-900 dark:bg-gray-100
// Use: bg-background-card dark:bg-dark-background-card
// Or: text-text-primary dark:text-dark-text-primary

// ========================================
// COMMON PATTERNS
// ========================================

// Pattern 1: Cards and containers
function CardPattern() {
  return (
    <div className="bg-white dark:bg-dark-background-card border border-gray-200 dark:border-gray-700 rounded-xl p-6">
      {/* Card content */}
    </div>
  );
}

// Pattern 2: Text elements
function TextPattern() {
  return (
    <>
      <h1 className="text-text-primary dark:text-dark-text-primary">Heading</h1>
      <p className="text-text-secondary dark:text-dark-text-secondary">Body text</p>
      <span className="text-text-muted dark:text-dark-text-muted">Small text</span>
    </>
  );
}

// Pattern 3: Inputs
function InputPattern() {
  return (
    <input
      type="text"
      className="px-4 py-2 bg-white dark:bg-dark-background-card border border-gray-200 dark:border-gray-700 text-text-primary dark:text-dark-text-primary rounded-lg focus:ring-2 focus:ring-brand-primary transition-colors"
      placeholder="Enter text..."
    />
  );
}

// Pattern 4: Buttons (keep consistent)
function ButtonPattern() {
  return (
    <>
      {/* Primary button - same in both modes */}
      <button className="px-4 py-2 bg-brand-primary hover:bg-blue-700 text-white rounded-lg transition-colors">
        Primary Action
      </button>
      
      {/* Secondary button - adapts to theme */}
      <button className="px-4 py-2 bg-gray-100 dark:bg-gray-800 text-text-primary dark:text-dark-text-primary hover:bg-gray-200 dark:hover:bg-gray-700 rounded-lg transition-colors">
        Secondary Action
      </button>
    </>
  );
}

// Pattern 5: Navigation
function NavPattern() {
  return (
    <nav className="bg-white dark:bg-dark-background-shell border-b border-gray-200 dark:border-gray-700">
      <div className="flex items-center justify-between p-4">
        <div className="text-text-primary dark:text-dark-text-primary font-bold">
          Logo
        </div>
        <div className="flex gap-4">
          <a className="text-text-secondary dark:text-dark-text-secondary hover:text-text-primary dark:hover:text-dark-text-primary transition-colors">
            Link
          </a>
        </div>
      </div>
    </nav>
  );
}

// Pattern 6: Hover states
function HoverPattern() {
  return (
    <button className="p-4 bg-white dark:bg-dark-background-card hover:bg-gray-50 dark:hover:bg-gray-800 text-text-primary dark:text-dark-text-primary border border-gray-200 dark:border-gray-700 rounded-lg transition-colors">
      Hover me
    </button>
  );
}

// Pattern 7: Badges and chips
function BadgePattern() {
  return (
    <>
      <span className="px-3 py-1 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300 rounded-full text-sm">
        Badge
      </span>
      
      <span className="px-3 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-300 rounded-full text-sm">
        Success
      </span>
    </>
  );
}

// ========================================
// QUICK REFERENCE
// ========================================

/*
Common Dark Mode Classes:

BACKGROUNDS:
- bg-white dark:bg-dark-background-card
- bg-gray-50 dark:bg-gray-900
- bg-gray-100 dark:bg-gray-800

BORDERS:
- border-gray-200 dark:border-gray-700
- border-gray-300 dark:border-gray-600

TEXT:
- text-text-primary dark:text-dark-text-primary
- text-text-secondary dark:text-dark-text-secondary
- text-text-muted dark:text-dark-text-muted

HOVER STATES:
- hover:bg-gray-50 dark:hover:bg-gray-800
- hover:bg-gray-100 dark:hover:bg-gray-700

FOCUS STATES:
- focus:ring-brand-primary (same for both modes)

TRANSITIONS:
- transition-colors (add to all elements that change color)
*/

# Implementation Plan for Page Preview Feature

## Overview
Add a preview mode that shows how the lesson will appear to students, allowing instructors to toggle between edit and preview modes seamlessly.

## Architecture & Design Decisions

### 1. **State Management Strategy**
- Add preview mode state at the LessonEditorPanel level
- Create a separate `LessonPreview` component for clean separation of concerns
- Share the lesson data between editor and preview (read-only in preview)

### 2. **Component Structure**
```
LessonEditorPanel (container)
├── Header (with Edit/Preview toggle)
├── LessonEditor (current editing UI)
└── LessonPreview (new component)
    ├── LessonHeader (rendered lesson metadata)
    └── ContentBlockRenderer (render blocks as students see them)
```

### 3. **Key Features**

#### Toggle Mechanism
- Add "Preview" button in the header next to "Save changes"
- Use keyboard shortcut (Cmd/Ctrl + Shift + P) for quick toggling
- Maintain scroll position when switching modes

#### Preview Component Requirements
- Display lesson title, description, and duration prominently
- Render content blocks with proper styling:
  - **Text blocks**: Rich text rendering (preserve formatting)
  - **Headings**: Proper h1/h2/h3 tags with responsive sizing
  - **Images**: Full width with captions and alt text
  - **Code blocks**: Syntax highlighting (use a library like `react-syntax-highlighter`)
  - **Video**: Embedded player or placeholder

#### Visual Differentiation
- Light border/badge indicating "Preview Mode"
- Different background color (subtle) to distinguish from edit mode
- "Exit Preview" button always visible

## Implementation Steps

### Step 1: Create ContentBlockRenderer Component
```typescript
// Handles rendering individual blocks in preview mode
// Pure, reusable component that can be used elsewhere
interface ContentBlockRendererProps {
  block: LessonContentBlock;
}
```

**Responsibilities:**
- Map block types to appropriate rendering logic
- Handle rich text HTML parsing safely (use `dangerouslySetInnerHTML` with sanitization)
- Apply consistent styling matching student view

### Step 2: Create LessonPreview Component
```typescript
interface LessonPreviewProps {
  lesson: Lesson;
  onExitPreview: () => void;
}
```

**Responsibilities:**
- Layout lesson metadata (hero section)
- Map and render all content blocks
- Provide exit preview control
- Match student-facing UI/UX exactly

### Step 3: Update LessonEditorPanel
- Add `isPreviewMode` state
- Conditional rendering: show either editor or preview
- Add preview toggle button
- Implement keyboard shortcut handler

### Step 4: Styling Considerations
- Reuse existing Tailwind classes for consistency
- Create preview-specific styles in a separate section
- Ensure responsive design (mobile preview)
- Dark mode support

## Code Quality Standards

### Type Safety
- Create proper TypeScript interfaces for all new components
- No `any` types - use proper type assertions
- Leverage discriminated unions for block types

### Performance
- Memoize ContentBlockRenderer with `React.memo`
- Use `useMemo` for expensive computations (block sorting, filtering)
- Avoid re-renders when toggling preview (keep lesson data stable)

### Accessibility
- Semantic HTML in preview (actual h1-h6, not styled divs)
- Proper ARIA labels on toggle buttons
- Keyboard navigation support
- Focus management when entering/exiting preview

### Security
- Sanitize HTML content before rendering (use DOMPurify)
- Validate image URLs before rendering
- Escape code block content properly

## File Structure
```
components/lesson/
├── LessonEditorPanel.tsx (existing - updated)
├── LessonPreview.tsx (new)
├── ContentBlockRenderer.tsx (new)
└── RichTextEditor.tsx (existing)
```

## Edge Cases to Handle

1. **Empty content blocks**: Show placeholder message
2. **Invalid image URLs**: Show broken image placeholder
3. **Missing metadata**: Show defaults (e.g., "Untitled Lesson")
4. **Unpublished lessons**: Add "Draft" badge in preview
5. **Long content**: Ensure proper scrolling behavior
6. **Unsaved changes**: Warn user if trying to preview with unsaved edits

## Testing Checklist

- [ ] Toggle between edit and preview modes
- [ ] All block types render correctly in preview
- [ ] Rich text formatting preserved
- [ ] Images load and display properly
- [ ] Code blocks maintain formatting
- [ ] Keyboard shortcut works
- [ ] Dark mode appears correctly
- [ ] Responsive on mobile/tablet
- [ ] Accessibility: keyboard navigation
- [ ] Accessibility: screen reader compatibility

## Future Enhancements

1. **Device preview modes**: Desktop, tablet, mobile views
2. **Share preview link**: Generate temporary preview URL
3. **Version comparison**: Show diff between saved and current
4. **Student perspective toggle**: Simulate progress tracking
5. **Comments/annotations**: Allow reviewers to leave feedback

## Dependencies

**New packages needed:**
- `dompurify` - HTML sanitization (if not already included)
- `react-syntax-highlighter` - Code block syntax highlighting
- `@types/dompurify` - TypeScript types

**Consider:**
- `highlight.js` as alternative to react-syntax-highlighter
- Video player component if not handling natively

This plan emphasizes maintainability, type safety, and user experience while keeping the implementation straightforward and testable.
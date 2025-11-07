# Testing Checklist

## Functionality Tests

### Password Generation

- [ ] Generate passwords with all character types enabled
- [ ] Generate passwords with only uppercase enabled
- [ ] Generate passwords with only lowercase enabled
- [ ] Generate passwords with only numbers enabled
- [ ] Generate passwords with only symbols enabled
- [ ] Generate memorable passwords
- [ ] Exclude similar characters (verify 0, O, 1, l, I are excluded)
- [ ] Password length validation (12-128 characters)
- [ ] Generate button disabled when length < 12
- [ ] Generate button disabled when length > 128
- [ ] Generate button disabled when no character types selected
- [ ] Pattern requirements (at least one char from each selected type)

### Copy Functionality

- [ ] Copy individual password field
- [ ] Copy all passwords at once
- [ ] Copy protection (prevents copying empty fields)
- [ ] Copy protection (prevents copying loading state)
- [ ] Clipboard fallback for older browsers

### Theme

- [ ] Toggle dark to light theme
- [ ] Toggle light to dark theme
- [ ] Theme persistence (reload page and verify theme)
- [ ] Theme toggle animation

### Storage Persistence

- [ ] Character type selections persist
- [ ] Password length persists
- [ ] Theme preference persists
- [ ] Exclude similar characters setting persists
- [ ] Memorable password toggle persists

### Keyboard Shortcuts

- [ ] Enter key on length input generates passwords
- [ ] Ctrl/Cmd + Enter generates passwords
- [ ] Ctrl/Cmd + Space generates passwords
- [ ] Ctrl/Cmd + Shift + C copies all passwords
- [ ] Enter on password field copies that password
- [ ] Space on password field copies that password
- [ ] Tab key navigation works correctly

### Notifications

- [ ] Success notification on password copy
- [ ] Success notification on copy all
- [ ] Info notification when no passwords to copy
- [ ] Error notification on clipboard failure
- [ ] Notification auto-dismisses after 3 seconds
- [ ] Notification manual close button works
- [ ] Notification close button keyboard support (Enter/Space)

### UI Interactions

- [ ] Memorable password disables other options
- [ ] Memorable password enables other options when unchecked
- [ ] Disabled checkboxes show not-allowed cursor
- [ ] Disabled input shows not-allowed cursor
- [ ] Password fields show loading animation
- [ ] Password fields fade in after generation
- [ ] Generate button shows loading state
- [ ] Hover states work on all interactive elements

## Browser Compatibility

### Desktop Browsers

- [ ] Chrome/Edge (latest)
- [ ] Chrome/Edge (1 version back)
- [ ] Firefox (latest)
- [ ] Firefox (1 version back)
- [ ] Safari (latest)
- [ ] Safari (1 version back)

### Mobile Browsers

- [ ] Chrome Mobile (Android)
- [ ] Safari Mobile (iOS)
- [ ] Firefox Mobile
- [ ] Samsung Internet

## Accessibility Tests

### Keyboard Navigation

- [ ] All interactive elements reachable via Tab
- [ ] Skip to main content link works
- [ ] Skip link visible on focus
- [ ] Focus indicators visible on all elements
- [ ] Logical tab order
- [ ] No keyboard traps

### Screen Reader

- [ ] ARIA labels read correctly
- [ ] Button states announced
- [ ] Notifications announced
- [ ] Form validation errors announced
- [ ] Disabled states announced

### Visual

- [ ] Text contrast meets WCAG AA (4.5:1)
- [ ] Focus indicators meet WCAG AA (3:1)
- [ ] No reliance on colour alone
- [ ] UI usable at 200% zoom

## Responsive Design

### Breakpoints

- [ ] Desktop (>768px) layout correct
- [ ] Tablet (481-768px) layout correct
- [ ] Mobile (≤480px) layout correct
- [ ] Very short screens (≤560px) optimised

### Orientations

- [ ] Portrait mode (mobile)
- [ ] Landscape mode (mobile)
- [ ] Portrait mode (tablet)
- [ ] Landscape mode (tablet)

### Touch

- [ ] All buttons easily tappable (minimum 44x44px)
- [ ] No hover-only interactions
- [ ] Touch feedback on all interactive elements

## Performance

### Load Time

- [ ] Initial page load < 2 seconds
- [ ] Font loading doesn't block rendering
- [ ] No layout shift on font load

### Runtime

- [ ] Password generation < 100ms
- [ ] No janky animations
- [ ] Smooth theme transitions
- [ ] No console errors
- [ ] No console warnings

## Security

### Password Generation

- [ ] Uses crypto.getRandomValues()
- [ ] Fallback to Math.random if crypto unavailable
- [ ] Minimum 12 character enforcement
- [ ] Pattern requirements enforced

### CSP

- [ ] Content Security Policy header present
- [ ] No inline scripts blocked
- [ ] Google Fonts loads correctly

## SEO & Metadata

### HTML

- [ ] Valid HTML5 (W3C validator)
- [ ] Semantic HTML structure
- [ ] Proper heading hierarchy
- [ ] Alt text for images (if any)

### Meta Tags

- [ ] Title tag present and descriptive
- [ ] Meta description present
- [ ] Canonical URL set
- [ ] Open Graph tags present
- [ ] Twitter Card tags present
- [ ] Favicon loads correctly (SVG)

### Structured Data

- [ ] JSON-LD present
- [ ] Valid schema.org markup
- [ ] Google Rich Results Test passes

## Edge Cases

### Input Validation

- [ ] Empty password length input
- [ ] Negative password length
- [ ] Very large password length (>128)
- [ ] Non-numeric password length
- [ ] Decimal password length

### User Behaviour

- [ ] Rapid clicking generate button
- [ ] Rapid theme toggling
- [ ] Clicking copy before generation complete
- [ ] Multiple password fields clicked simultaneously
- [ ] Browser back button
- [ ] Browser forward button
- [ ] Page refresh during generation

### Browser Features

- [ ] LocalStorage disabled
- [ ] JavaScript disabled (graceful degradation)
- [ ] Clipboard API unavailable
- [ ] Crypto API unavailable
- [ ] Third-party cookies blocked

## Lighthouse Scores

Target scores (run on incognito/private mode):

- [ ] Performance: 95+
- [ ] Accessibility: 100
- [ ] Best Practices: 95+
- [ ] SEO: 100

## Final Checklist

- [ ] No console errors
- [ ] No console warnings
- [ ] All images optimized
- [ ] All fonts optimized
- [ ] CSS minified for production
- [ ] JS minified for production
- [ ] HTTPS enabled (for production)
- [ ] robots.txt present
- [ ] .gitattributes present
- [ ] README up to date
- [ ] All links work correctly

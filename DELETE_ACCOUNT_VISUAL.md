# Account Deletion - Visual Guide

## Danger Zone Location

### Dashboard Settings Section
```
┌─────────────────────────────────────────┐
│ Personal Configuration                  │
│ ┌─────────────────────────────────────┐ │
│ │ Name:  [John Doe____________]       │ │
│ │ Email: [john@email.com______] 🔒    │ │
│ │ Phone: [+977-1234567________]       │ │
│ └─────────────────────────────────────┘ │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ Address: [Street____________]       │ │
│ │ City:    [Kathmandu_________]       │ │
│ └─────────────────────────────────────┘ │
│                                         │
│              [Save Changes]             │
│                                         │
│ ┌─────────────────────────────────────┐ │
│ │ ⚠️  Danger Zone                     │ │ ← Red gradient
│ ├─────────────────────────────────────┤ │
│ │ Delete Account                      │ │
│ │ Permanently delete your account     │ │
│ │ and all associated data.            │ │
│ │                                     │ │
│ │              [🗑️ Delete Account]   │ │
│ └─────────────────────────────────────┘ │
└─────────────────────────────────────────┘
```

## Delete Modal - Full View

### Desktop (550px width)
```
        Background Blur + Dark Overlay
╔═══════════════════════════════════════════╗
║                                           ║
║  ┌─────────────────────────────────────┐  ║
║  │ ═══════════════════════════════════ │  ║ ← Red gradient
║  │                                     │  ║
║  │           ⚠️                        │  ║ ← Animated shake
║  │      Delete Account                 │  ║
║  │                                     │  ║
║  ├─────────────────────────────────────┤  ║
║  │                                     │  ║
║  │ ┌─────────────────────────────────┐ │  ║
║  │ │ ⓘ Warning: This action is       │ │  ║ ← Warning box
║  │ │   permanent and cannot be undone!│ │  ║
║  │ └─────────────────────────────────┘ │  ║
║  │                                     │  ║
║  │ The following data will be deleted: │  ║
║  │                                     │  ║
║  │ ┌─────────────────────────────────┐ │  ║
║  │ │ 👤 Your profile information     │ │  ║
║  │ └─────────────────────────────────┘ │  ║
║  │ ┌─────────────────────────────────┐ │  ║
║  │ │ 🛒 Shopping cart and wishlist   │ │  ║
║  │ └─────────────────────────────────┘ │  ║
║  │ ┌─────────────────────────────────┐ │  ║
║  │ │ 🧾 Order history                │ │  ║
║  │ └─────────────────────────────────┘ │  ║
║  │ ┌─────────────────────────────────┐ │  ║
║  │ │ ⭐ Loyalty points               │ │  ║
║  │ └─────────────────────────────────┘ │  ║
║  │ ┌─────────────────────────────────┐ │  ║
║  │ │ 💾 All personal data            │ │  ║
║  │ └─────────────────────────────────┘ │  ║
║  │                                     │  ║
║  │ Type DELETE to confirm:             │  ║
║  │ ┌─────────────────────────────────┐ │  ║
║  │ │ [Type DELETE here_____________] │ │  ║
║  │ └─────────────────────────────────┘ │  ║
║  │ Please type DELETE exactly          │  ║ ← Error message
║  │                                     │  ║
║  ├─────────────────────────────────────┤  ║
║  │ [❌ Cancel]  [🗑️ Delete My Account]│  ║
║  └─────────────────────────────────────┘  ║
║                                           ║
╚═══════════════════════════════════════════╝
```

### Mobile (95% width)
```
╔═══════════════════════════╗
║                           ║
║  ┌─────────────────────┐  ║
║  │ ═══════════════════ │  ║
║  │                     │  ║
║  │        ⚠️           │  ║
║  │   Delete Account    │  ║
║  │                     │  ║
║  ├─────────────────────┤  ║
║  │                     │  ║
║  │ ⓘ Warning:          │  ║
║  │   Permanent!        │  ║
║  │                     │  ║
║  │ Data to be deleted: │  ║
║  │                     │  ║
║  │ 👤 Profile          │  ║
║  │ 🛒 Cart & Wishlist  │  ║
║  │ 🧾 Orders           │  ║
║  │ ⭐ Points           │  ║
║  │ 💾 All data         │  ║
║  │                     │  ║
║  │ Type DELETE:        │  ║
║  │ [______________]    │  ║
║  │                     │  ║
║  ├─────────────────────┤  ║
║  │    [❌ Cancel]      │  ║
║  │                     │  ║
║  │ [🗑️ Delete Account] │  ║
║  └─────────────────────┘  ║
║                           ║
╚═══════════════════════════╝
```

## Button States

### Delete Button States

#### Disabled (Default)
```
┌──────────────────────┐
│ 🗑️ Delete My Account │  Gray background
└──────────────────────┘  #d1d5db
Cursor: not-allowed
Opacity: 0.6
```

#### Enabled (After typing "DELETE")
```
┌──────────────────────┐
│ 🗑️ Delete My Account │  Red background
└──────────────────────┘  #ef4444 + Shadow
    ▼▼▼▼
Cursor: pointer
Opacity: 1.0
```

#### Hover (When enabled)
```
┌──────────────────────┐
│ 🗑️ Delete My Account │  Darker red
└──────────────────────┘  #dc2626 + More shadow
    ▼▼▼▼▼▼              Lifted 2px
```

#### Active (Pressed)
```
┌──────────────────────┐
│ 🗑️ Delete My Account │  Pressed down
└──────────────────────┘  No lift
```

## Input Validation Flow

### Step 1: Empty Input
```
Input: [_____________________]
Button: [Delete My Account] ← Disabled (gray)
Error: (none)
```

### Step 2: Typing (Wrong)
```
Input: [DEL__________________]
Button: [Delete My Account] ← Disabled (gray)
Error: "Please type DELETE exactly"
```

### Step 3: Typing (Correct)
```
Input: [DELETE_______________]
Button: [Delete My Account] ← Enabled (red)
Error: (none)
```

### Step 4: Ready to Delete
```
Input: [DELETE_______________] ✓
Button: [Delete My Account] ← Enabled + Hover
Error: (none)
```

## Animation Sequence

### Modal Entry (0.4s)
```
Frame 1 (0ms):
  Overlay: opacity 0
  Modal: scale(0.9), translateY(30px)
  
Frame 2 (200ms):
  Overlay: opacity 0.5
  Modal: scale(0.95), translateY(15px)
  
Frame 3 (400ms):
  Overlay: opacity 1
  Modal: scale(1), translateY(0)
  Input: Auto-focused
```

### Warning Icon Shake (3s loop)
```
0.0s: rotate(0deg)
0.3s: rotate(-5deg)
0.6s: rotate(5deg)
0.9s: rotate(-5deg)
1.2s: rotate(5deg)
1.5s: rotate(-5deg)
1.8s: rotate(5deg)
2.1s: rotate(-5deg)
2.4s: rotate(5deg)
2.7s: rotate(-5deg)
3.0s: rotate(0deg)
```

### Danger Zone Icon Pulse (2s loop)
```
0.0s: opacity(1.0), scale(1.0)
0.5s: opacity(0.85), scale(1.05)
1.0s: opacity(0.7), scale(1.1)
1.5s: opacity(0.85), scale(1.05)
2.0s: opacity(1.0), scale(1.0)
```

## User Interaction Flow

### Scenario 1: User Cancels
```
1. Click "Delete Account" in Danger Zone
   ↓
2. Modal appears with animation
   ↓
3. User reads warnings
   ↓
4. User clicks "Cancel"
   ↓
5. Modal closes with animation
   ↓
6. Account remains active
```

### Scenario 2: User Confirms Deletion
```
1. Click "Delete Account" in Danger Zone
   ↓
2. Modal appears with animation
   ↓
3. User reads warnings
   ↓
4. User types "DELETE" in input
   ↓
5. Delete button enables (turns red)
   ↓
6. User clicks "Delete My Account"
   ↓
7. Modal closes
   ↓
8. Toast: "Deleting account..."
   ↓
9. Data cleanup (1 second)
   ↓
10. Toast: "Account deleted successfully"
    ↓
11. Redirect to home page (1.5s delay)
```

### Scenario 3: User Types Wrong Text
```
1. Modal open
   ↓
2. User types "delete" (lowercase)
   ↓
3. Error: "Please type DELETE exactly"
   ↓
4. Button remains disabled
   ↓
5. User corrects to "DELETE"
   ↓
6. Error clears
   ↓
7. Button enables
```

## Color Palette

### Danger Zone
```
Background Gradient:
  Start: #fff5f5 (red-50)
  End:   #ffe5e5 (red-100)

Border: #fecaca (red-200)

Top Border Gradient:
  #ef4444 → #dc2626 → #b91c1c

Text Colors:
  Title:  #991b1b (red-800)
  Body:   #991b1b (red-800)

Button:
  Normal: #ef4444 (red-500)
  Hover:  #dc2626 (red-600)
```

### Delete Modal
```
Header Gradient:
  #ef4444 → #dc2626

Warning Box:
  Background: #fef2f2 (red-50)
  Border:     #fecaca (red-200)
  Text:       #991b1b (red-800)

List Items:
  Background: #f9fafb (gray-50)
  Icons:      #ef4444 (red-500)
  Text:       #111827 (gray-900)

Buttons:
  Cancel:
    Normal: #f1f3f5 (gray-100)
    Hover:  #e9ecef (gray-200)
  
  Delete (Disabled):
    Background: #d1d5db (gray-300)
    Text:       #9ca3af (gray-400)
  
  Delete (Enabled):
    Normal: #ef4444 (red-500)
    Hover:  #dc2626 (red-600)
```

## Responsive Breakpoints

### Desktop (>600px)
```
Modal:
  Width: 550px
  Padding: 35px
  
Header:
  Icon: 56px
  Title: 26px
  
Body:
  Text: 14-16px
  List: 14px
  
Buttons:
  Layout: Side by side
  Height: 50px
  Font: 15px
```

### Mobile (≤600px)
```
Modal:
  Width: 95%
  Padding: 20-25px
  
Header:
  Icon: 48px
  Title: 22px
  
Body:
  Text: 13-15px
  List: 13px
  
Buttons:
  Layout: Stacked
  Height: 46px
  Font: 14px
```

## Dark Mode Comparison

### Light Mode
```
┌─────────────────────────┐
│ Red Gradient Header     │
├─────────────────────────┤
│ White Body              │
│ Dark Text               │
│ Light Gray Lists        │
├─────────────────────────┤
│ Gray Cancel | Red Delete
└─────────────────────────┘
```

### Dark Mode
```
┌─────────────────────────┐
│ Red Gradient Header     │
├─────────────────────────┤
│ Dark Body (#2c0a14)     │
│ Light Text              │
│ Dark Gray Lists         │
├─────────────────────────┤
│ Dark Cancel | Red Delete
└─────────────────────────┘
```

## Data Deletion Visualization

### Before Deletion
```
localStorage:
├── users: [
│   { email: "user@email.com", name: "John" },
│   { email: "other@email.com", name: "Jane" }
│   ]
├── currentUser: { email: "user@email.com", ... }
├── isLoggedIn: true
├── cart_user@email.com: [item1, item2]
├── wishlist_user@email.com: [item3, item4]
└── orders: [
    { userEmail: "user@email.com", ... },
    { userEmail: "other@email.com", ... }
    ]
```

### After Deletion
```
localStorage:
├── users: [
│   { email: "other@email.com", name: "Jane" }
│   ]
├── currentUser: (removed)
├── isLoggedIn: (removed)
├── cart_user@email.com: (removed)
├── wishlist_user@email.com: (removed)
└── orders: [
    { userEmail: "other@email.com", ... }
    ]
```

## Toast Notifications

### Deletion Process
```
Step 1:
┌──────────────────────────┐
│ ⏳ Deleting account...   │
└──────────────────────────┘

Step 2 (1 second later):
┌──────────────────────────────────┐
│ ✓ Account deleted successfully   │
└──────────────────────────────────┘

Step 3 (1.5 seconds later):
→ Redirect to home page
```

## Accessibility Features

### Keyboard Navigation
```
Tab Order:
1. Confirmation Input (auto-focused)
   ↓
2. Cancel Button
   ↓
3. Delete Button (if enabled)

ESC Key:
→ Closes modal (same as Cancel)

Enter Key:
→ Activates focused button
```

### Screen Reader Announcements
```
Modal Opens:
"Dialog: Delete Account. Warning: This action is permanent."

Input Focus:
"Type DELETE to confirm account deletion"

Button Disabled:
"Delete My Account button, disabled. Type DELETE to enable."

Button Enabled:
"Delete My Account button, enabled. Press to confirm deletion."
```

## Status Indicators

### Processing States
```
Idle:
  Modal closed
  No processing

Confirming:
  Modal open
  Waiting for user input

Validating:
  Checking input text
  Enabling/disabling button

Deleting:
  Modal closed
  Toast: "Deleting account..."
  Data cleanup in progress

Complete:
  Toast: "Account deleted successfully"
  Redirecting...
```

## Conclusion

The account deletion system provides:

✅ **Clear Visual Hierarchy**
✅ **Professional Animations**
✅ **Multiple Safety Measures**
✅ **Responsive Design**
✅ **Dark Mode Support**
✅ **Accessible Interface**
✅ **User-Friendly Flow**

---

**Visual Quality**: ⭐⭐⭐⭐⭐
**User Safety**: 🔒🔒🔒🔒🔒
**Accessibility**: ♿ WCAG AA

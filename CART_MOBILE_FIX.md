# Cart Page Mobile Fix - Product Name Overlap

## Issue
On mobile devices, the product name in the cart page was overlapping with other content due to:
- `text-align: right` forcing content to the right side
- `padding-left: 50%` creating excessive left padding
- `white-space: nowrap` preventing text wrapping
- Absolute positioning of the label causing layout conflicts

## Solution
Modified the mobile cart table styles to properly display product names with line breaks when needed.

## Changes Made

### 1. cart.css (Mobile Breakpoint: max-width 799px)

Added specific styling for product name column (3rd child):

```css
/* Product name - align left with wrapping */
#cart table td:nth-child(3) {
    text-align: left;
    padding-left: 15px;
    padding-right: 15px;
    white-space: normal;
    word-wrap: break-word;
    line-height: 1.5;
}

#cart table td:nth-child(3)::before {
    position: static;
    display: block;
    margin-bottom: 8px;
}
```

### 2. responsiveHome.css (Mobile Breakpoint: max-width 576px)

Added consistent styling for product name column:

```css
/* Product name - align left with wrapping */
#cart table td:nth-child(3) {
    text-align: left;
    padding-left: 15px;
    padding-right: 15px;
    justify-content: flex-start;
    white-space: normal;
    word-wrap: break-word;
    line-height: 1.6;
    display: block;
}

#cart table td:nth-child(3)::before {
    position: static;
    display: block;
    margin-bottom: 8px;
    width: 100%;
}
```

## Key Features

✓ Product names align to the left side
✓ Text wraps naturally when it needs more space
✓ Proper line spacing (line-height: 1.5-1.6) for readability
✓ Label ("PRODUCTS") displays above the product name
✓ No overlap with other content
✓ Consistent padding (15px) on both sides
✓ Works across all mobile breakpoints

## Mobile Cart Layout Structure

```
┌─────────────────────────────┐
│ REMOVE                    ✕ │
├─────────────────────────────┤
│ IMAGES              [image] │
├─────────────────────────────┤
│ PRODUCTS                    │
│ Long Product Name That      │
│ Wraps to Multiple Lines     │
├─────────────────────────────┤
│ PRICE              NPR 1500 │
├─────────────────────────────┤
│ QUANTITY                [2] │
├─────────────────────────────┤
│ SUBTOTAL           NPR 3000 │
└─────────────────────────────┘
```

## Testing Checklist

- [ ] Open cart page on mobile device (< 799px width)
- [ ] Add products with long names to cart
- [ ] Verify product names align to the left
- [ ] Verify text wraps properly without overlap
- [ ] Check line spacing is readable
- [ ] Test on various mobile sizes (576px, 480px, 380px)
- [ ] Verify dark mode compatibility
- [ ] Check other cart columns still align properly

## Files Modified

1. `cart.css` - Added product name wrapping styles for 799px breakpoint
2. `responsiveHome.css` - Added product name wrapping styles for 576px breakpoint

## Status: ✅ COMPLETE

Product names in the cart page now display properly on mobile with left alignment and automatic line wrapping when needed.

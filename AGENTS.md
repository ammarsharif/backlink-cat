<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes - APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` before writing any code. Heed deprecation notices.

## Design & Responsiveness Rules

- **Pixel-Perfect Figma Fidelity**: When provided with Figma screenshots, implement them with 100% accuracy.
- **Default Resolution**: Assume the provided images are at 1920px width. Ensure perfect responsiveness down to mobile.
- **Micro-Animations**: Add subtle hover states and transitions to make the UI feel premium.
- **Images**: All assets should be placed in `public/images/`. Use descriptive filenames.

## Separator & Character Rules

- **No Forward Slashes**: Never use the forward slash `/` as a text separator in the UI (e.g., in page titles or headers).
- **Use Em-Dash**: Always use the em-dash `-` (Alt+0151) as the separator character.

## SSR & Performance Rules

- **Best SSR Practices**: Favor Server Components. Only use `'use client'` when strictly necessary for interactivity.
- **Hydration Safety**: Never use `Math.random()` or `new Date()` in the render body of a Server Component to avoid hydration mismatches. Use stable data.
- **Professional Metadata**: Every page must have proper SEO metadata defined in the Page or Layout.
<!-- END:nextjs-agent-rules -->

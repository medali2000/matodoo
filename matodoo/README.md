# matodoo — Landing Page (React + Vite)

ERP consulting landing page for Mohamed Ali Trabelsi, rebuilt in React for maintainability.

## Project structure

```
src/
├── components/        # One component + matching .css per section
│   ├── Navbar.jsx
│   ├── Hero.jsx
│   ├── About.jsx
│   ├── Services.jsx
│   ├── Projects.jsx
│   ├── Training.jsx
│   ├── Experience.jsx
│   ├── Stack.jsx
│   ├── Contact.jsx
│   ├── Footer.jsx
│   ├── WhatsAppFloat.jsx
│   └── RevealCard.jsx  # shared card with scroll-reveal + 3D tilt
├── hooks/
│   ├── useTheme.js          # dark/light mode + localStorage
│   ├── useReveal.js         # IntersectionObserver scroll reveal
│   ├── useTypewriter.js     # hero headline typing effect
│   ├── useCountUp.js        # animated stat counters
│   ├── useScrollEffects.js  # scroll progress bar, active nav link, cursor glow
│   └── useRippleEffect.js   # button click ripple
├── App.jsx
├── main.jsx
└── index.css           # design tokens (CSS variables), shared classes
```

## Local development

```bash
npm install
npm run dev
```
Opens at http://localhost:5173

## Build for production

```bash
npm run build
```
Outputs static files to `dist/`.

## Editing your profile photo

Currently the About section shows initials (`MAT`) as a placeholder.
To use a real photo:
1. Put your image in the `public/` folder, e.g. `public/profile.jpg`
2. In `src/components/About.jsx`, replace the placeholder `<span className="photo-initials">MAT</span>`
   with `<img src="/profile.jpg" alt="Mohamed Ali Trabelsi" />`

## Editing content

All text content lives directly in the component files as plain data arrays
(e.g. `SERVICES` in `Services.jsx`, `PROJECTS` in `Projects.jsx`, `EXPERIENCES`
in `Experience.jsx`). Edit those arrays to update content without touching markup.

## Contact form (Formspree)

The contact form posts to a Formspree endpoint configured in `src/components/Contact.jsx`:
```js
const FORMSPREE_ENDPOINT = 'https://formspree.io/f/mpqebrvd';
```
Replace this with your own Formspree form ID if needed.

## Deploying to Netlify via GitHub (recommended)

1. **Push this project to GitHub**
   ```bash
   git init
   git add .
   git commit -m "Initial commit — matodoo React landing page"
   git branch -M main
   git remote add origin https://github.com/<your-username>/matodoo.git
   git push -u origin main
   ```

2. **Connect to Netlify**
   - Go to app.netlify.com -> "Add new site" -> "Import an existing project"
   - Choose GitHub -> select the `matodoo` repository
   - Netlify will auto-detect the build settings from `netlify.toml`:
     - Build command: `npm run build`
     - Publish directory: `dist`
   - Click **Deploy**

3. **From now on**: every `git push` to `main` triggers an automatic redeploy on Netlify. No more manual drag-and-drop.

4. **Custom domain**: in Netlify -> Site settings -> Domain management -> Add custom domain (e.g. `matodoo.tn`)

## Notes

- `netlify.toml` already includes a catch-all redirect (`/* -> /index.html`) so client-side routing
  (if you add React Router later) won't break on page refresh.
- Dark/light theme preference is stored in `localStorage` and persists across visits.

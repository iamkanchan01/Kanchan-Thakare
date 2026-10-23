# Portfolio

Personal portfolio site built with **React + TypeScript + Vite**, deployed to **GitHub Pages** via GitHub Actions.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Personalise

Portfolio content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts). The root-level `Kanchan-Thakare-CV.docx` is the résumé source; export an updated PDF to `public/resume.pdf` whenever it changes. The hero's **View Résumé** button opens that PDF in a new tab.

Each project card opens its interactive demo in a new tab. The static demo files in `public/demos/` are automatically copied into `dist` and deployed to GitHub Pages by the existing Actions workflow. The demos use sample data in your browser; no real payment, authentication, or deployment services are involved.

## Deploy to GitHub Pages

1. Create a new **public** repository on your personal GitHub account (e.g. `portfolio`). Do not add a README.
2. Push this project:

   ```bash
   git init
   git add .
   git commit -m "Initial portfolio"
   git branch -M main
   git remote add origin https://github.com/<your-username>/portfolio.git
   git push -u origin main
   ```

3. On GitHub: **Settings → Pages → Build and deployment → Source: GitHub Actions**.
4. The workflow in `.github/workflows/deploy.yml` builds and publishes on every push to `main`. The site will be at `https://<your-username>.github.io/portfolio/`.

> Tip: name the repo `<your-username>.github.io` to serve the site at the root URL instead.

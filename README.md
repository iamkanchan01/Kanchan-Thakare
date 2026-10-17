# Portfolio

Personal portfolio site built with **React + TypeScript + Vite**, deployed to **GitHub Pages** via GitHub Actions.

## Run locally

```bash
npm install
npm run dev
```

Open http://localhost:5173.

## Personalise

All content lives in [`src/data/portfolio.ts`](src/data/portfolio.ts): name, role, about, skills, projects, experience and social links. The hero's **View Résumé** button opens `public/resume.pdf` in a new tab; replace that file to update the résumé.

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

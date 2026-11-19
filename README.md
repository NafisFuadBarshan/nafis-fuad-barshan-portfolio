> **Two views, one site.** `index.html` is the 2D portfolio (default) and `3d.html` is the 3D version. Each has a **3D / 2D** button in the top-right nav to switch between them. Theme (dark/light) carries over because both use the same `localStorage` key.

> **Themes.** Light/Dark (`data-mode`) and four colour themes (`data-theme`: `editorial`, `studio`, `botanical`, `amber`) are independent. Tokens live in `themes.css`, logic in `theme.js`, choices persist in `localStorage` (`portfolio-mode`, `portfolio-theme`) and are shared by `index.html` and `3d.html`. To tweak a palette, edit its block in `themes.css`.

<div align="center">

# ✨ Nafis Fuad Barshan

### Fresh Graduate · CSE · UI/UX · AI/ML · Full‑Stack

*Computer Science & Engineering graduate from the University of Asia Pacific, working across UI/UX design, machine learning and full-stack development.*

![HTML5](https://img.shields.io/badge/HTML5-0b1220?style=for-the-badge&logo=html5&logoColor=00e5ff)
![CSS3](https://img.shields.io/badge/CSS3-0b1220?style=for-the-badge&logo=css3&logoColor=00e5ff)
![JavaScript](https://img.shields.io/badge/Vanilla_JS-0b1220?style=for-the-badge&logo=javascript&logoColor=e3b95a)
![No build step](https://img.shields.io/badge/No_build_step-e3b95a?style=for-the-badge&labelColor=0b1220)

**🖥️ The 2D portfolio** · 🌗 dark neon & light themes with a toggle · 🥇 gold Achievements · 🥈 silver Participations · 💠 platinum Membership & Leadership

</div>

---

## 🌟 Highlights

| | |
|---|---|
| 🌗 **Dark / light mode** | Sun/moon button in the navigation bar. The choice is remembered in the browser; first visit opens in dark |
| 🧑‍🎓 **Hero** | Large transparent‑background headshot with a cyan glow, "Fresh Graduate" title and one‑click **View CV** |
| 🥇 **Achievements (gold)** | Four honors as **thesis‑style gold cards** (2 × 2). Each card auto‑slides through its certificate, medal, photos and **inline videos**; click an image to enlarge it. Cards are built from `HONORS` in `ach.js` |
| 🥈 **Participations (silver)** | 11 certificates with *All / Certificates / Participation* filters, plus a workshops & conferences list |
| 💠 **Leadership Experience** | Two thesis‑style cards: Founding Member at Mes Que Un Blancos (2021–2022, player card) and Former Player at PES Fighter BD (30 Dec 2022 – 13 Jun 2024, Player of the Match in the last COBEG match) |
| 💼 **Experience** | Eutropia IT, eChithi and Scout Member as thesis‑style cards, each with an auto‑sliding gallery of its appointment letter, experience certificate or photos (click to enlarge; personal details redacted) |
| 🧪 **Projects** | Twelve project cards, each with a **View on GitHub** button (in 3D it sits in the project pop-up). Project 12, DigiTeach, is a Flask e-learning platform. Project 06, the CM14 Robot, has a sliding video/photo gallery and a collapsible components list. Projects 07–11 (Metro Rail Management System, Neon Vanguard, Student Programming Skills Prediction, Tour Guiding System, B1Skript) each show a cover image from the real project |
| 🎓 **Research** | Career‑gap recommendation system gallery opens on the dashboard screenshot, then team photos, defence videos and the Saree‑Panjabi Day photo |
| 🎓 **Education** | About Me shows Education (B.Sc., HSC, SSC) on the left and Languages on the right, in both the 2D and 3D views |
| 🗣️ **Languages** | English (IELTS 6.5, 18 Nov 2022, scores only, no certificate image), a German A1 → A2 → B1 timeline and Bengali (native) |
| 🛠️ **Skills** | Seven groups: design, programming, web, AI/data, IoT/networking, productivity, communication |
| 📄 **In-site CV** | `cv.html` is a themed CV page that follows the site's light/dark mode and colour theme and is linked from both the 2D and 3D versions (3D passes `?from=3d` so *Back* returns to the 3D view). It has a **Download Word (.docx)** button and **Save as PDF** (print-optimised, A4, white). The Word file is a single-column, ATS-friendly résumé (real headings, bullet styles, no tables or text boxes) |
| ◀ ● ● ▶ **Gallery navigator** | Every auto-sliding gallery has a bar *below* the picture with previous / next arrows, dots and a slide counter, so nothing covers the photo. Built in the inline script at the bottom of `index.html`, styled at the end of `style.css` |
| ♿ **Accessible** | Keyboard‑friendly lists and buttons, focus rings, reduced‑motion support |

## 🚀 Run it

No installs, no build.

```bash
# option 1: just open the file
open index.html

# option 2: serve it locally (recommended for video playback)
python3 -m http.server 8000
# then visit http://localhost:8000
```

## 🌐 Publish on GitHub Pages

1. Push the **contents** of this folder to the repo root (so `index.html` is at the top level).
2. Repo **Settings → Pages → Build and deployment → Deploy from a branch**, pick `main` and `/ (root)`.
3. Open `https://<user>.github.io/<repo>/`. All paths are relative, so any repo name works; `3d.html` loads three.js and fonts from CDNs over HTTPS.

## 🗂️ What's inside

```
Nafis-portfolio-2d/
├── index.html                 # the whole portfolio (galleries are driven by the inline script at the bottom)
├── 3d.html                    # the 3D version (same content, three.js scene)
├── style.css                  # themes (dark default + [data-theme="light"]), layout, gold & silver sections
├── script.js                  # reveal animations, cursor, nav, dark/light toggle
├── ach.js                     # Achievements + Participations sliders (edit content here ✏️)
├── cv.html                    # in-site CV page (themed; print → PDF). /cv.html?print=1 opens the print dialog
├── Nafis_Fuad_Barshan_CV.docx # ATS-friendly Word CV (2 pages, A4)
├── certs/                     # certificate images
├── media/                     # honor, thesis, CM14 and Scout photos and videos, thesis dashboard
├── docs/                      # appointment letters & experience certificate (redacted)
├── Bangladesh_Scouts_Logo.svg # logo on the Scout Member card
└── profile-cutout.webp        # transparent headshot
```

## ✏️ Make it yours

- **Add an honor or certificate:** put the image in `certs/` or `media/`, then add one line to `HONORS` or `PARTS` at the top of `ach.js`. List several items in `m:[...]` to make that honor a slider.
- **Add a slide to Experience / Thesis / Projects / Leadership:** add an `<img>` (or `<video>`) with a `data-cap` caption inside the card's `.thesis-images-gallery` and one more `.thesis-gallery-dot`.
- **Change colors:** dark colors are the `:root` variables at the top of `style.css`; light colors are the `[data-theme="light"]` block at the bottom. Gold and silver tones are `--gold` and `.tone-silver`.
- **Update the CV:** edit the text in `cv.html` and re-issue the `.docx` so both stay in step. The CV lists all 12 projects (each with its GitHub link), both thesis repos, and mirrors the portfolio.

## 📬 Contact

📧 nafisfuadbarshan@gmail.com · 💼 [LinkedIn](https://www.linkedin.com/in/nafis-fuad-barshan-46b5301a5/) · 🐙 [GitHub](https://github.com/NafisFuadBarshan/) · 📸 [Instagram](https://www.instagram.com/n.f.barshan/)

<div align="center">

*Built with care in Dhaka, Bangladesh 🇧🇩*

</div>

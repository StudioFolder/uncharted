# uncharted.ooo

Static website for the **Uncharted** research project (Folder, 2016).
This repo is a 2026 resurrection of the original site, restored from
a backup of the production files after the domain lapsed.

## Stack

Pure static HTML/CSS/JS. No build step.

- `index.html` — landing page, three.js globe + year slider (1972–2016 Landsat textures)
- `explore.html` — long-form project page with images and a noUiSlider that swaps the same yearly texture maps
- `css/`, `js/` — Foundation 6, jQuery, Stellar parallax, noUiSlider, tween.js, three.js (CDN), sequencer.js, custom CSS
- `images/` — project photography + the 45 yearly Landsat texture maps (`drawn_1972.jpg` … `drawn_2016.jpg`)

## Deploy (Vercel)

This is a zero-config static deploy. From this folder:

```bash
vercel        # first time, link to project
vercel --prod # deploy to uncharted.ooo
```

`vercel.json` sets long cache lifetimes for `/css`, `/js`, `/images` and adds
sensible security headers. `.vercelignore` excludes the macOS Finder cruft
(`.DS_Store`, `Icon` files), the legacy `images/explore*.zip` backup archives,
and the unused `images/texture/hd/` set.

## Changes vs. the 2016 production version

Minimal restoration pass — everything visual should match the original
(see https://web.archive.org/web/20241004230304/http://uncharted.ooo/).

- HTTP → HTTPS for the og:image / og:url meta tags and the three.js CDN
  script (browsers now block mixed content on HTTPS pages).
- Removed the Google Analytics tag. It used the deprecated `analytics.js`
  tracker (UA-25554902-9) which stopped collecting on 2023-07-01.
- Fixed a GLSL syntax typo in the inline vertex shader in `index.html`
  (`void main({` → `void main() {`).
- Cleaned up the malformed nested `<html>` tag that was sitting inside
  `<head>` in `index.html`.

No content, copy, layout, or behaviour was changed.

## Known follow-ups

1. **Vendor `three.js` r63 and `OrbitControls` locally.**
   `index.html` still loads three.js from `cdnjs.cloudflare.com` and
   OrbitControls from `s3-us-west-2.amazonaws.com/s.cdpn.io/123941/`
   (a CodePen mirror). cdnjs is reliable; the CodePen mirror is not.
   Copy both files into `js/vendor/` and switch the script tags to
   relative paths.
2. **Mobile / responsive pass.** The site is desktop-first; the
   description paragraph is hidden on mobile via `.noMobile`, and the
   navigation collapses but the layout below doesn't degrade well.
3. **Modernize the stack.** Three.js r63 (2014) is ancient. A v0.150+
   port would let us drop the `OrbitControls` mirror and use the
   official ES module. Foundation 6 + jQuery + Stellar could be replaced
   with a tiny custom CSS grid + vanilla JS scroll.
4. **Performance / SEO / accessibility.** Image optimization (the 45
   year textures are ~40 MB of JPEG, hd/ adds another 23 MB), proper
   `alt` text, full Open Graph + Twitter card meta, `lang` correctness,
   sitemap, robots.txt.

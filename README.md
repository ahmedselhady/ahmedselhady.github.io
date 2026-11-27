# Ahmed Elhady's personal site

A static GitHub Pages site with Home, Experience, Contemplations, and Photography & Pencil Drawings.

## Preview locally

Run `python3 -m http.server 8000` from the repository root and open [the local site](http://localhost:8000). The local server lets the browser load the JavaScript modules and content files.

## Edit the content

- [content.js](content.js) holds the profile, portrait path, collaboration link, experience in reverse chronological order, and the three note topics. Each note has a `title` and a short `text`.
- [news.jsonl](news.jsonl) holds one update per line. Use `date` (prefer `YYYY-MM-DD` or `YYYY-MM`), `title`, and `description`. Optional fields are `kind`, `venue`, `url`, `image` (a site-relative path such as `blogs/photos/event.jpg` or an HTTPS image URL), and `imageAlt` (a short description for screen readers). Entries added through **News and talks** in Pages CMS are read from [news.json](news.json). Use **Card photo** to add an image there.
- [blogs/photos/index.json](blogs/photos/index.json) lists the gallery images. Each entry uses `image` and supports `caption`, optional `location`, and `medium` (`photo` or `drawing`). Existing entries without a medium are treated as photos.

## Upload a photo or drawing

Use **Upload photo or drawing** on the gallery page to open [Pages CMS](https://app.pagescms.org/). Sign in with your GitHub account, select the website repository and publishing branch, and open **Photography and pencil drawings**. Add an entry, upload the image, choose its media type, and optionally add a caption and location. Saving commits the files to the repository so GitHub Pages can publish them. Repository write access is required.

# Ahmed Elhady — academic website

The public site is a static GitHub Pages site. Its editable content is stored in this repository; no publishing token is exposed in the browser.

## Publish content from your phone

1. Open [Pages CMS](https://pagescms.org/) and sign in with the GitHub account that owns this repository.
2. Select `ahmedselhady.github.io` and the `main` branch. The repository's `.pages.yml` config exposes only its blog, photo, and news content.
3. Use **Photography and tags** to upload an image from your phone, add a caption/location, and enter tags. Save; the image and its searchable metadata are committed to the repository.
4. Use **Markdown blog files** to create a `.md` post. Then add the matching filename, title, date, summary, and tags under **Blog titles and tags**. The blog index displays title and tags, and the post body remains Markdown.
5. Use **News and talks** to add an item to both the homepage feed and the dedicated tab.

Repository access is the publishing boundary: only people with write access to the GitHub repository can publish. Keep that access limited to your account. Pages CMS is a separate authenticated editor; the public site has no upload form or credentials.

## Local preview

Run `python3 -m http.server 8000` from the repository root and open `http://localhost:8000`. Fetch-based content does not load when opening the HTML file directly.

## Content files

- `index.html` — deployed page and design.
- `news.json` — entries shown in the News & Talks tab.
- `index.json` — blog list metadata (titles, dates, summaries, and tags).
- `blogs/*.md` — Markdown article bodies.
- `blogs/photos/index.json` and `blogs/photos/*` — photo metadata and image files.
- `.pages.yml` — Pages CMS editor configuration.

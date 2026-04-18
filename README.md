# My Academic Website

## File Structure

```
index.html              ← Main site (edit CONFIG at the top)
personal.jpg            ← Your personal page portrait
photo.jpg               ← Your home page profile photo

blogs/
  index.json            ← Blog manifest: list of all posts
  my-post.md            ← A blog post in Markdown
  another-post.md       ← Another blog post

  photos/
    index.json          ← Photo manifest: list of images + captions
    alps.jpg            ← A photo
    market.jpg          ← Another photo
    ...
```

---

## Adding a blog post

1. Write your post as a `.md` file and drop it in `blogs/`
2. Add an entry to `blogs/index.json`:

```json
{
  "file": "my-new-post.md",
  "date": "2025-04-10",
  "type": "essay",
  "title": "My New Post Title",
  "summary": "A one-sentence teaser shown in the list.",
  "tags": ["tag1", "tag2"]
}
```

**Post types:** `essay` · `explainer` · `quirk` · `note`

### Markdown features supported

- `# H1` through `#### H4` headings
- `**bold**`, `*italic*`, `***bold italic***`
- `> blockquote`
- `` `inline code` `` and fenced code blocks (` ``` `)
- `[link text](url)` and `![alt](image-path)`
- `- unordered` and `1. ordered` lists
- `---` horizontal rules

Images in posts can reference files in `blogs/photos/` like this:

```markdown
![A caption](photos/my-image.jpg)
```

---

## Adding photos (Personal tab)

1. Drop your image files into `blogs/photos/`
2. Add entries to `blogs/photos/index.json`:

```json
{ "file": "my-photo.jpg", "caption": "A short caption" }
```

---

## Deploying to GitHub Pages

1. Create a repo named `yourusername.github.io`
2. Push all files (keeping the `blogs/` folder structure)
3. Go to Settings → Pages → Source: `main` branch, `/ (root)`
4. Your site is live at `https://yourusername.github.io`

> **Note:** The site uses `fetch()` to load blog posts and photos,
> so it must be served over HTTP(S). It won't work by opening
> `index.html` directly from the file system.
> To preview locally, run: `python -m http.server 8000`

import { experience, noteTopics, profile } from "./content.js";

const byId = id => document.getElementById(id);

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

async function read(path, parse = JSON.parse) {
  const response = await fetch(path);
  if (!response.ok) throw new Error(`Could not load ${path}`);
  return parse(await response.text());
}

function webUrl(value) {
  if (!value || typeof value !== "string") return null;
  try {
    const url = new URL(value, document.baseURI);
    return ["http:", "https:"].includes(url.protocol) ? url.href : null;
  } catch {
    return null;
  }
}

const navLinks = [...document.querySelectorAll("nav a")];
const routes = new Set(navLinks.map(link => link.hash.slice(1)));
const oldRoutes = new Map([["news", "home"], ["publications", "home"], ["blog", "notes"], ["personal", "home"]]);
let currentPage;

function showPage() {
  const hash = location.hash.slice(1);
  if (hash === "main") return;
  const requested = hash.split("/")[0];
  const page = routes.has(requested) ? requested : oldRoutes.get(requested) || "home";
  for (const link of navLinks) {
    const active = link.hash === `#${page}`;
    byId(`page-${link.hash.slice(1)}`).hidden = !active;
    if (active) link.setAttribute("aria-current", "page");
    else link.removeAttribute("aria-current");
  }
  if (page === "notes") {
    const topic = hash.split("/")[1];
    if (noteTopics.some(item => item.id === topic)) selectTopic(topic);
  }
  if (currentPage && currentPage !== page) {
    window.scrollTo(0, 0);
    byId("main").focus({ preventScroll: true });
  }
  const heading = byId(`page-${page}`).querySelector("h1").innerText;
  document.title = page === "home" ? profile.shortName : `${heading.replace(/\s+/g, " ")} · ${profile.shortName}`;
  currentPage = page;
}

byId("brand-name").textContent = profile.shortName;
byId("footer-name").textContent = profile.shortName;
byId("home-title").textContent = profile.name;
byId("affiliation").textContent = profile.affiliation;
byId("bio").textContent = profile.bio;
byId("current-work").textContent = profile.currentWork;
for (const id of ["collaboration", "footer-link"]) {
  const link = byId(id);
  const url = webUrl(profile.linkedin);
  if (url) link.href = url;
  else link.hidden = true;
}
byId("interests").replaceChildren(...profile.interests.map(text => element("li", null, text)));
if (profile.photo) {
  const photo = byId("profile-image");
  photo.alt = `Portrait of ${profile.name}`;
  photo.addEventListener("error", () => { byId("portrait").hidden = true; });
  byId("portrait").hidden = false;
  photo.src = profile.photo;
}

const newsList = byId("news-list");
const previous = byId("previous");
const next = byId("next");

function syncCarousel() {
  const range = newsList.scrollWidth - newsList.clientWidth;
  const hasOverflow = newsList.clientWidth > 0 && range > 2;
  byId("carousel-controls").hidden = !hasOverflow;
  newsList.tabIndex = hasOverflow ? 0 : -1;
  previous.disabled = newsList.scrollLeft <= 2;
  next.disabled = newsList.scrollLeft >= range - 2;
}

function advanceNews(direction) {
  const [first, second] = newsList.children;
  if (second) newsList.scrollBy({ left: direction * (second.offsetLeft - first.offsetLeft) });
}

previous.addEventListener("click", () => advanceNews(-1));
next.addEventListener("click", () => advanceNews(1));
newsList.addEventListener("scroll", syncCarousel, { passive: true });
new ResizeObserver(syncCarousel).observe(newsList);

const newsDate = new Intl.DateTimeFormat("en", { year: "numeric", month: "short", timeZone: "UTC" });
const exactNewsDate = new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

function makeNewsCard(item) {
  const card = element("article", "news-card");
  const imagePath = typeof item.image === "string" ? item.image.trim() : "";
  const imageUrl = webUrl(imagePath.replace(/^\/blogs\/photos\//, "blogs/photos/"));
  if (imageUrl) {
    const photo = element("img", "news-photo");
    photo.alt = typeof item.imageAlt === "string" ? item.imageAlt : "";
    photo.loading = "lazy";
    photo.decoding = "async";
    photo.addEventListener("error", () => photo.remove(), { once: true });
    photo.src = imageUrl;
    card.append(photo);
  }
  const meta = element("p", "news-meta");
  const date = element("time", null, item.date);
  if (/^\d{4}-\d{2}(-\d{2})?$/.test(item.date) && Number.isFinite(Date.parse(item.date))) {
    date.dateTime = item.date;
    date.textContent = (item.date.length === 10 ? exactNewsDate : newsDate).format(new Date(item.date));
  }
  meta.append(date, element("span", null, [item.kind, item.venue].filter(Boolean).join(" · ")));
  card.append(meta, element("h3", null, item.title));
  if (item.description) card.append(element("p", null, item.description));
  const url = webUrl(item.url);
  if (url) {
    const link = element("a", null, "Read more");
    link.href = url;
    link.setAttribute("aria-label", `Read more about ${item.title}`);
    card.append(link);
  }
  return card;
}

function parseNewsLines(source) {
  return source.split(/\r?\n/).flatMap((line, index) => {
    if (!line.trim()) return [];
    try {
      return [JSON.parse(line)];
    } catch {
      console.warn(`Skipping invalid news.jsonl line ${index + 1}`);
      return [];
    }
  });
}

Promise.allSettled([read("news.jsonl", parseNewsLines), read("news.json")]).then(results => {
  const updates = new Map();
  for (const result of results) {
    if (result.status !== "fulfilled" || !Array.isArray(result.value)) continue;
    for (const item of result.value) {
      if (typeof item?.date !== "string" || typeof item.title !== "string") continue;
      const key = JSON.stringify([item.date, item.title]);
      if (!updates.has(key)) updates.set(key, item);
    }
  }
  const ordered = [...updates.values()].sort((a, b) => (Date.parse(b.date) || 0) - (Date.parse(a.date) || 0));
  const loaded = results.some(result => result.status === "fulfilled");
  newsList.replaceChildren(...(ordered.length ? ordered.map(makeNewsCard) : [
    element("p", null, loaded ? "No updates yet." : "News and talks are unavailable right now."),
  ]));
  syncCarousel();
});

const svgNs = "http://www.w3.org/2000/svg";
function svg(viewBox, d, className) {
  const image = document.createElementNS(svgNs, "svg");
  image.setAttribute("viewBox", viewBox);
  image.setAttribute("aria-hidden", "true");
  if (className) image.setAttribute("class", className);
  const path = document.createElementNS(svgNs, "path");
  path.setAttribute("d", d);
  image.append(path);
  return image;
}

const educationIcon = "M2 9l10-5 10 5-10 5-10-5Zm4 2v5c3 3 9 3 12 0v-5m4-2v6";
const workIcon = "M4 8h16a1 1 0 0 1 1 1v10H3V9a1 1 0 0 1 1-1Zm5 0V5h6v3M3 13h18m-11-1v3h4v-3";

for (const entry of experience) {
  const stop = element("li", "stop");
  const waypoint = element("div", "waypoint");
  waypoint.setAttribute("aria-hidden", "true");
  const trail = svg("0 0 116 148", "M58 0C5 27 7 49 58 74S111 121 58 148", "trail-line");
  trail.setAttribute("preserveAspectRatio", "none");
  const marker = element("span", "marker");
  marker.append(svg("0 0 24 24", entry.kind === "Education" ? educationIcon : workIcon));
  waypoint.append(trail, marker);
  const copy = element("div", "stop-copy");
  copy.append(
    element("p", "stop-period", `${entry.period} · ${entry.kind}`),
    element("h2", null, entry.role),
    element("p", "stop-place", [entry.organization, entry.place].filter(Boolean).join(" · ")),
  );
  stop.append(waypoint, copy);
  byId("trail").append(stop);
}

const tabs = [];
for (const topic of noteTopics) {
  const tab = element("button", null, topic.label);
  tab.type = "button";
  tab.id = `topic-${topic.id}`;
  tab.setAttribute("role", "tab");
  tab.setAttribute("aria-controls", `notes-${topic.id}`);
  tab.addEventListener("click", () => selectTopic(topic.id, true));
  tabs.push(tab);
  byId("note-tabs").append(tab);
  const panel = element("div", "note-panel");
  panel.id = `notes-${topic.id}`;
  panel.setAttribute("role", "tabpanel");
  panel.setAttribute("aria-labelledby", tab.id);
  panel.tabIndex = 0;
  for (const note of topic.notes) {
    const card = element("article", "note-card");
    card.append(element("h2", null, note.title), element("p", null, note.text));
    panel.append(card);
  }
  if (!topic.notes.length) panel.append(element("p", null, "No notes in this topic yet."));
  byId("note-panels").append(panel);
}

function selectTopic(id, updateHash = false) {
  for (const [index, topic] of noteTopics.entries()) {
    const active = topic.id === id;
    tabs[index].setAttribute("aria-selected", String(active));
    tabs[index].tabIndex = active ? 0 : -1;
    byId(`notes-${topic.id}`).hidden = !active;
  }
  if (updateHash) history.replaceState(null, "", `#notes/${id}`);
}

byId("note-tabs").addEventListener("keydown", event => {
  const from = tabs.indexOf(event.target);
  if (from < 0 || !["ArrowLeft", "ArrowRight", "Home", "End"].includes(event.key)) return;
  event.preventDefault();
  const step = event.key === "ArrowLeft" ? -1 : 1;
  const to = event.key === "Home" ? 0
    : event.key === "End" ? tabs.length - 1
      : (from + step + tabs.length) % tabs.length;
  selectTopic(noteTopics[to].id, true);
  tabs[to].focus();
});
selectTopic(noteTopics[0].id);
window.addEventListener("hashchange", showPage);
showPage();

const galleryStatus = byId("gallery-status");
const galleryFilters = [...document.querySelectorAll("[data-medium]")];
const lightbox = byId("lightbox");
let artwork = null;
let galleryError = false;
let medium = "all";

function makeArtwork(item) {
  const button = element("button", "artwork");
  button.type = "button";
  const caption = item.caption || (item.medium === "drawing" ? "Pencil drawing" : "Photograph");
  const img = element("img");
  img.src = item.url;
  img.alt = "";
  img.loading = "lazy";
  img.decoding = "async";
  const text = element("span", "art-text");
  text.append(element("span", "art-caption", caption));
  if (item.location) text.append(element("span", "art-location", item.location));
  button.append(img, text);
  button.addEventListener("click", () => {
    const preview = byId("lightbox-image");
    preview.src = item.url;
    byId("lightbox-caption").textContent = [caption, item.location].filter(Boolean).join(" · ");
    lightbox.showModal();
  });
  return button;
}

function renderGallery() {
  const visible = (artwork || []).filter(item => medium === "all" || item.medium === medium);
  byId("gallery").replaceChildren(...visible.map(makeArtwork));
  galleryStatus.hidden = visible.length > 0;
  galleryStatus.textContent = galleryError ? "The gallery is unavailable right now."
    : !artwork ? "Loading gallery…"
      : medium === "drawing" ? "No pencil drawings have been added yet."
        : medium === "photo" ? "No photographs have been added yet." : "No artwork has been added yet.";
}

for (const button of galleryFilters) {
  button.addEventListener("click", () => {
    medium = button.dataset.medium;
    for (const filter of galleryFilters) filter.setAttribute("aria-pressed", String(filter === button));
    renderGallery();
  });
}

read("blogs/photos/index.json").then(items => {
  artwork = items.flatMap(item => {
    if (!item) return [];
    const path = item.image || (item.file && `blogs/photos/${item.file}`);
    const url = webUrl(path?.replace(/^\/blogs\//, "blogs/"));
    if (!url) return [];
    return [{ ...item, url, medium: item.medium === "drawing" ? "drawing" : "photo" }];
  });
}).catch(() => { galleryError = true; }).finally(renderGallery);

byId("close-lightbox").addEventListener("click", () => lightbox.close());
lightbox.addEventListener("click", event => { if (event.target === lightbox) lightbox.close(); });

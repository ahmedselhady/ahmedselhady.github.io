import { experience, noteTopics, profile } from "./content.js?v=6";

const byId = id => document.getElementById(id);

function element(tag, className, text) {
  const node = document.createElement(tag);
  if (className) node.className = className;
  if (text != null) node.textContent = text;
  return node;
}

async function read(path, parse = JSON.parse) {
  const response = await fetch(path, { cache: "no-cache" });
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

const noteTabs = [
  { id: "all", label: "All", notes: noteTopics.flatMap(topic => topic.notes) },
  ...noteTopics,
];

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
    selectTopic(noteTabs.some(item => item.id === topic) ? topic : "all");
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
byId("bio").replaceChildren(...profile.bio.map(segments => {
  const paragraph = element("p");
  for (const segment of segments) {
    if (typeof segment === "string") {
      paragraph.append(segment);
    } else {
      const link = element("a", null, segment.text);
      link.href = segment.url;
      paragraph.append(link);
    }
  }
  return paragraph;
}));
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
const autoScroll = byId("auto-scroll");
const reducedMotion = matchMedia("(prefers-reduced-motion: reduce)");
let loopStart = null;
let autoScrollPaused = false;

autoScroll.addEventListener("click", () => {
  autoScrollPaused = !autoScrollPaused;
  autoScroll.textContent = autoScrollPaused ? "Play" : "Pause";
  autoScroll.setAttribute("aria-label", autoScrollPaused ? "Resume automatic scrolling" : "Pause automatic scrolling");
});
function syncMotionPreference() {
  autoScroll.hidden = reducedMotion.matches;
}
reducedMotion.addEventListener("change", syncMotionPreference);
syncMotionPreference();

function syncCarousel() {
  const range = newsList.scrollWidth - newsList.clientWidth;
  const hasOverflow = newsList.clientWidth > 0 && range > 2;
  byId("carousel-controls").hidden = !hasOverflow;
  newsList.tabIndex = hasOverflow ? 0 : -1;
  if (loopStart && newsList.clientWidth > 0) {
    const boundary = loopStart.offsetLeft - newsList.firstElementChild.offsetLeft;
    if (newsList.scrollLeft >= boundary - 1) {
      newsList.scrollTo({ left: 0, behavior: "instant" });
    }
  }
  previous.disabled = newsList.scrollLeft <= 2;
  next.disabled = !hasOverflow;
}

function advanceNews(direction) {
  const [first, second] = newsList.children;
  if (second) newsList.scrollBy({ left: direction * (second.offsetLeft - first.offsetLeft) });
}

previous.addEventListener("click", () => advanceNews(-1));
next.addEventListener("click", () => advanceNews(1));
newsList.addEventListener("scroll", syncCarousel, { passive: true });
new ResizeObserver(syncCarousel).observe(newsList);

setInterval(() => {
  if (!loopStart || autoScrollPaused || reducedMotion.matches || document.hidden) return;
  if (!newsList.clientWidth || newsList.matches(":hover, :focus-within")) return;
  advanceNews(1);
}, 30_000);

const newsDate = new Intl.DateTimeFormat("en", { year: "numeric", month: "short", timeZone: "UTC" });
const exactNewsDate = new Intl.DateTimeFormat("en", { year: "numeric", month: "short", day: "numeric", timeZone: "UTC" });

const newsTypeIcons = new Map([
  ["Award", "M8 3h8v5a4 4 0 0 1-8 0V3Zm0 2H4v2a3 3 0 0 0 4 3m8-5h4v2a3 3 0 0 1-4 3m-4 2v5m-4 3h8m-7 0v-3h6v3"],
  ["Talk", "M12 15a3 3 0 0 0 3-3V6a3 3 0 0 0-6 0v6a3 3 0 0 0 3 3Zm-6-4v1a6 6 0 0 0 12 0v-1m-6 7v3m-3 0h6"],
  ["Paper", "M6 3h8l4 4v14H6V3Zm8 0v5h4M9 12h6m-6 4h6"],
  ["Position", "M4 8h16a1 1 0 0 1 1 1v10H3V9a1 1 0 0 1 1-1Zm5 0V5h6v3M3 13h18m-11-1v3h4v-3"],
  ["News", "M5 5h15v13a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V8H2v10a2 2 0 0 0 2 2h2m2-11h8m-8 4h8m-8 4h5"],
]);

function addAwardDecoration(card) {
  card.classList.add("news-award");
  const confetti = element("span", "award-confetti");
  confetti.setAttribute("aria-hidden", "true");
  const colors = ["#db9e36", "#0784b5", "#d56882", "#258976"];
  const angles = [15, 36, 57, 78, 99, 120, 141, 162];
  angles.forEach((angle, index) => {
    const piece = element("span");
    const radians = angle * Math.PI / 180;
    piece.style.setProperty("--confetti-x", `${Math.sin(radians) * (65 + index % 3 * 32)}px`);
    piece.style.setProperty("--confetti-y", `${-Math.cos(radians) * (52 + index % 4 * 18)}px`);
    piece.style.setProperty("--confetti-delay", `${index * 17}ms`);
    piece.style.backgroundColor = colors[index % colors.length];
    confetti.append(piece);
  });
  card.append(confetti);
}

function makeNewsCard(item) {
  const card = element("article", "news-card");
  const header = element("header", "news-card-header");
  const date = element("time", "news-date");
  let dateLabel = item.date;
  if (/^\d{4}-\d{2}(-\d{2})?$/.test(item.date) && Number.isFinite(Date.parse(item.date))) {
    date.dateTime = item.date;
    dateLabel = (item.date.length === 10 ? exactNewsDate : newsDate).format(new Date(item.date));
  }
  date.append(
    svg("0 0 24 24", "M5 5h14a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2Zm3-2v4m8-4v4M3 10h18"),
    element("span", null, dateLabel),
  );
  const kind = newsTypeIcons.has(item.kind) ? item.kind : "News";
  const badge = element("span", "news-type-icon");
  badge.title = kind;
  badge.setAttribute("aria-hidden", "true");
  badge.append(svg("0 0 24 24", newsTypeIcons.get(kind)));
  header.append(badge, date);
  card.append(header);
  if (kind === "Award") addAwardDecoration(card);
  if (kind === "Talk") card.classList.add("news-talk");
  if (kind === "Paper") card.classList.add("news-paper");
  const meta = element("p", "news-meta");
  meta.textContent = [kind, item.venue].filter(Boolean).join(" · ");
  card.append(meta, element("h3", null, item.title));
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
  // Repeat the first two cards offscreen so wrapping continues in the same direction.
  // Two copies cover the widest view, where two cards fit side by side.
  if (ordered.length > 1) {
    const copies = [...newsList.children].slice(0, 2).map(card => {
      const copy = card.cloneNode(true);
      copy.inert = true;
      copy.setAttribute("aria-hidden", "true");
      return copy;
    });
    [loopStart] = copies;
    newsList.append(...copies);
  }
  syncCarousel();

  const animations = new IntersectionObserver(entries => {
    for (const { target, isIntersecting, intersectionRatio } of entries) {
      target.classList.toggle("news-card-visible", isIntersecting && intersectionRatio >= 0.25);
    }
  }, { threshold: 0.25 });
  newsList.querySelectorAll(".news-talk, .news-award, .news-paper").forEach(card => animations.observe(card));
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
  if (entry.logo) {
    const logo = element("img", "stop-logo");
    logo.alt = "";
    logo.loading = "lazy";
    logo.addEventListener("error", () => logo.remove(), { once: true });
    logo.src = `experience-logos/${entry.logo}`;
    copy.append(logo);
  }
  copy.append(
    element("p", "stop-period", entry.period),
    element("h3", null, entry.role),
    element("p", "stop-place", [entry.organization, entry.place].filter(Boolean).join(" · ")),
    element("p", "stop-highlight", entry.highlight),
  );
  stop.append(waypoint, copy);
  byId(entry.kind === "Education" ? "education-trail" : "work-trail").append(stop);
}

const noteViewer = byId("note-viewer");
const tabs = [];
for (const topic of noteTabs) {
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
  const newestFirst = [...topic.notes].sort((a, b) => (b.modified || "").localeCompare(a.modified || ""));
  for (const note of newestFirst) {
    const card = element("button", "note-card");
    card.type = "button";
    card.setAttribute("aria-label", `Read ${note.title}`);
    card.setAttribute("aria-haspopup", "dialog");
    card.append(element("span", "note-card-title", note.title), element("span", "note-preview", note.text));
    card.addEventListener("click", () => {
      byId("note-viewer-title").textContent = note.title;
      byId("note-viewer-text").textContent = note.text;
      noteViewer.showModal();
    });
    panel.append(card);
  }
  if (!topic.notes.length) panel.append(element("p", null, "No notes in this topic yet."));
  byId("note-panels").append(panel);
}

function selectTopic(id, updateHash = false) {
  for (const [index, topic] of noteTabs.entries()) {
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
  selectTopic(noteTabs[to].id, true);
  tabs[to].focus();
});
selectTopic(noteTabs[0].id);
window.addEventListener("hashchange", showPage);
showPage();

const gallery = byId("gallery");
const galleryStatus = byId("gallery-status");
const galleryLayout = new ResizeObserver(entries => {
  if (!gallery.clientWidth) return;
  const style = getComputedStyle(gallery);
  const rowHeight = parseFloat(style.gridAutoRows);
  const gap = parseFloat(style.getPropertyValue("--gallery-gap"));
  // Span enough short grid rows for each card's natural height and the gap below it.
  for (const { target } of entries) {
    target.style.gridRowEnd = `span ${Math.ceil((target.offsetHeight + gap) / rowHeight)}`;
  }
});
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
  button.append(img, text);
  if (item.location) {
    const location = element("span", "art-location");
    location.append(
      svg("0 0 24 24", "M19 10c0 5-7 11-7 11S5 15 5 10a7 7 0 1 1 14 0Zm-4.5 0a2.5 2.5 0 1 0-5 0 2.5 2.5 0 0 0 5 0Z"),
      element("span", null, item.location),
    );
    button.prepend(location);
  }
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
  const cards = visible.map(makeArtwork);
  galleryLayout.disconnect();
  gallery.replaceChildren(...cards);
  for (const card of cards) galleryLayout.observe(card);
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

for (const dialog of [lightbox, noteViewer]) {
  dialog.querySelector(".viewer-close").addEventListener("click", () => dialog.close());
  dialog.addEventListener("click", event => { if (event.target === dialog) dialog.close(); });
}

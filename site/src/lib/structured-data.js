// JSON-LD (schema.org) for each page. Every fact comes from the repository,
// the same way the visible pages do, and the entities share @id values so
// agents and search engines can join them across pages.

import { getImage } from "astro:assets";
import screenshot from "../../../images/screenshot-typescript.png";
import changelog from "../../../CHANGELOG.md?raw";
import { manifest, version, links } from "./repo.js";
import { absolute, pages } from "./markdown.js";

const home = absolute();
const ids = {
  website: `${home}#website`,
  author: `${home}#author`,
  theme: `${home}#theme`,
};

// Release dates from the changelog headings, such as "## 1.0.0 - 2026-10-07".
const releases = [...changelog.matchAll(/^## (\S+) - (\d{4}-\d{2}-\d{2})$/gm)].map(([, v, date]) => ({ v, date }));
const datePublished = releases.at(-1)?.date;
const dateModified = releases.find((release) => release.v === version)?.date;

const engine = manifest.engines.vscode.replace(/^\^/, "").replace(/\.0$/, "");

async function theme() {
  const image = await getImage({ src: screenshot, width: 1400 });
  return {
    "@type": "SoftwareApplication",
    "@id": ids.theme,
    name: manifest.displayName,
    description: manifest.description,
    url: home,
    applicationCategory: "DeveloperApplication",
    applicationSubCategory: "Visual Studio Code color theme",
    operatingSystem: "Windows, macOS, Linux",
    softwareRequirements: `Visual Studio Code ${engine} or later, or an editor that installs from Open VSX`,
    softwareVersion: version,
    datePublished,
    dateModified,
    license: links.license,
    isAccessibleForFree: true,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
    installUrl: links.marketplace,
    downloadUrl: links.releases,
    image: absolute("og.png"),
    screenshot: new URL(image.src, import.meta.env.SITE).href,
    featureList: [
      "Calm by design: most code stays deep evergreen; ochre marks keywords, forest green marks strings, slate blue marks types.",
      "Readable for everyone: WCAG AA text, 3:1 borders and icons, and an error red that stays apart from warnings with red-green color blindness.",
      "Complete: diff and merge views, debugging, testing, notebooks, the Source Control graph, chat and the terminal all share the palette.",
      "Semantic highlighting: declarations are bold, deprecated symbols are struck through, and this and self stand out.",
    ],
    keywords: manifest.keywords.join(", "),
    author: { "@id": ids.author },
    publisher: { "@id": ids.author },
    sameAs: [links.marketplace, links.openVsx, links.repository],
  };
}

const author = {
  "@type": "Person",
  "@id": ids.author,
  name: manifest.publisher,
  url: `https://github.com/${manifest.publisher}`,
  sameAs: ["https://mastodon.social/@nelvaron"],
};

const website = {
  "@type": "WebSite",
  "@id": ids.website,
  url: home,
  name: manifest.displayName,
  description: pages.home.description,
  inLanguage: "en",
  publisher: { "@id": ids.author },
};

function webPage(page, relation) {
  const pageUrl = absolute(page.path);
  return {
    "@type": "WebPage",
    "@id": `${pageUrl}#webpage`,
    url: pageUrl,
    name: page.title,
    description: page.description,
    inLanguage: "en",
    isPartOf: { "@id": ids.website },
    [relation]: { "@id": ids.theme },
  };
}

export async function homeStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [webPage(pages.home, "mainEntity"), await theme(), website, author],
  };
}

export async function paletteStructuredData() {
  return {
    "@context": "https://schema.org",
    "@graph": [webPage(pages.palette, "about"), await theme(), website, author],
  };
}

(() => {
  "use strict";

  const isChinese = document.documentElement.lang.toLowerCase().startsWith("zh");
  const locale = isChinese ? "zh" : "en";

  const profileLinks = [
    {
      id: "email",
      label: { en: "Email", zh: "邮箱" },
      href: "mailto:maydaytyh@gmail.com",
    },
    {
      id: "scholar",
      label: { en: "Google Scholar", zh: "Google Scholar" },
      href: "https://scholar.google.com/citations?user=r6HvwsEAAAAJ",
    },
    {
      id: "github",
      label: { en: "GitHub", zh: "GitHub" },
      href: "https://github.com/Maydaytyh",
    },
  ];

  const workLinks = {
    selfg: {
      paper: "https://aclanthology.org/2026.findings-acl.177/",
    },
    compkbqa: {
      paper: "https://aclanthology.org/2025.emnlp-main.16/",
    },
    grvkbqa: {
      paper: "https://aclanthology.org/2025.findings-emnlp.141/",
    },
    graphkbqa: {
      paper: "https://aclanthology.org/2024.findings-emnlp.699/",
    },
    executor: {},
    cancel: {},
    toolagent: {},
    badcase: {},
    harness: {},
  };

  const resourceLabels = {
    en: {
      paper: "Paper",
      code: "Code",
      project: "Project",
      slides: "Slides",
      demo: "Demo",
    },
    zh: {
      paper: "论文",
      code: "代码",
      project: "项目页",
      slides: "幻灯片",
      demo: "演示",
    },
  };

  const profileContainer = document.getElementById("profile-links");
  if (profileContainer) {
    profileLinks
      .filter((item) => item.href)
      .forEach((item, index) => {
        if (index) {
          const separator = document.createElement("span");
          separator.className = "sep";
          separator.setAttribute("aria-hidden", "true");
          separator.textContent = "·";
          profileContainer.appendChild(separator);
        }

        const link = document.createElement("a");
        link.href = item.href;
        link.textContent = item.label[locale];
        if (!item.href.startsWith("mailto:")) {
          link.target = "_blank";
          link.rel = "noopener noreferrer";
        }
        profileContainer.appendChild(link);
      });
  }

  document.querySelectorAll(".publication[data-work]").forEach((publication) => {
    const links = workLinks[publication.dataset.work];
    if (!links) return;

    const available = Object.entries(links).filter(([, href]) => href);
    if (!available.length) return;

    const row = document.createElement("div");
    row.className = "pub-links";
    row.setAttribute("aria-label", isChinese ? "论文资源" : "Publication resources");

    available.forEach(([kind, href], index) => {
      if (index) {
        const separator = document.createElement("span");
        separator.className = "sep";
        separator.setAttribute("aria-hidden", "true");
        separator.textContent = "|";
        row.appendChild(separator);
      }

      const link = document.createElement("a");
      link.href = href;
      link.target = "_blank";
      link.rel = "noopener noreferrer";
      link.textContent = resourceLabels[locale][kind] || kind;
      row.appendChild(link);
    });

    publication.appendChild(row);
  });

  document.querySelectorAll(".work-link[data-work]").forEach((element) => {
    const links = workLinks[element.dataset.work] || {};
    const href = links.paper || links.project || links.code;
    if (href) {
      element.href = href;
      element.target = "_blank";
      element.rel = "noopener noreferrer";
      return;
    }

    element.removeAttribute("href");
    element.classList.add("no-link");
  });

  const languageSwitch = document.querySelector(".lang-switch");
  if (languageSwitch) {
    languageSwitch.addEventListener("click", () => {
      if (window.location.hash) {
        languageSwitch.href = `${languageSwitch.pathname}${window.location.hash}`;
      }
    });
  }
})();

const body = document.body;
const navToggle = document.querySelector("[data-nav-toggle]");
const nav = document.querySelector("[data-site-nav]");

if (navToggle && nav) {
  navToggle.addEventListener("click", () => {
    const open = body.classList.toggle("nav-open");
    navToggle.setAttribute("aria-expanded", String(open));
  });

  nav.addEventListener("click", (event) => {
    if (event.target.closest("a")) {
      body.classList.remove("nav-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

document.querySelectorAll("[data-year]").forEach((node) => {
  node.textContent = new Date().getFullYear();
});

const revealNodes = document.querySelectorAll("[data-reveal]");
if ("IntersectionObserver" in window) {
  const revealObserver = new IntersectionObserver(
    (entries, observer) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12 }
  );
  revealNodes.forEach((node) => revealObserver.observe(node));
} else {
  revealNodes.forEach((node) => node.classList.add("is-visible"));
}

const specSearch = document.querySelector("[data-spec-search]");
if (specSearch) {
  const rows = [...document.querySelectorAll("[data-spec-row]")];
  const noResults = document.querySelector("[data-no-results]");
  specSearch.addEventListener("input", () => {
    const query = specSearch.value.trim().toLowerCase();
    let visible = 0;
    rows.forEach((row) => {
      const match = row.textContent.toLowerCase().includes(query);
      row.hidden = !match;
      if (match) visible += 1;
    });
    if (noResults) noResults.hidden = visible !== 0;
  });
}

const inquiryForm = document.querySelector("[data-inquiry-form]");
if (inquiryForm) {
  inquiryForm.addEventListener("submit", (event) => {
    event.preventDefault();
    if (!inquiryForm.reportValidity()) return;

    const data = new FormData(inquiryForm);
    const subject = `官网询价：${data.get("product")} / ${data.get("company")}`;
    const bodyText = [
      `联系人：${data.get("name")}`,
      `公司：${data.get("company")}`,
      `电话：${data.get("phone")}`,
      `邮箱：${data.get("email")}`,
      `需求产品：${data.get("product")}`,
      "",
      "工况与需求：",
      data.get("message"),
    ].join("\n");

    const mailto = `mailto:YJ20247771@163.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(bodyText)}`;
    const status = inquiryForm.querySelector("[data-form-status]");
    if (status) {
      status.textContent = "已整理询价内容，正在打开您的邮件应用。";
    }
    window.location.href = mailto;
  });
}

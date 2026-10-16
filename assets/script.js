document.getElementById("year").textContent = new Date().getFullYear();

// V15: complete the portfolio wall to 12 real credits before filter state is captured.
(() => {
  const wall = document.querySelector(".portfolio-wall");
  if (!wall) return;

  const currentCount = wall.querySelectorAll(".project").length;
  if (currentCount >= 12) return;

  const extraProjects = [
    {
      cat: "production",
      image: "https://zenomainardi.com/wp-content/uploads/2021/04/zeno-mainardi-equipment-cirklon-1200x800.jpg",
      alt: "Studio image used temporarily for Bates Belk — Euphoria",
      role: "Co-Production",
      artist: "Bates Belk",
      title: "Euphoria"
    },
    {
      cat: "mixing post",
      image: "https://zenomainardi.com/wp-content/uploads/2021/03/Zeno-Mainardi-Berlin-Music-Producer-Audio-Engineer-Analog-Synthesizers-2-1200x800.jpg",
      alt: "Studio image used temporarily for DaHouse / INNOCEAN — The Client Said No",
      role: "Sound Mix",
      artist: "DaHouse / INNOCEAN",
      title: "The Client Said No"
    },
    {
      cat: "mixing",
      image: "https://f4.bcbits.com/img/a4133431087_10.jpg",
      alt: "Bates Belk — Hallucinations EP",
      role: "Mixing",
      artist: "Bates Belk",
      title: "Hallucinations"
    }
  ];

  extraProjects.slice(0, Math.max(0, 12 - currentCount)).forEach(project => {
    const article = document.createElement("article");
    article.className = "project project-image";
    article.dataset.cat = project.cat;
    article.innerHTML = `
      <img src="${project.image}" alt="${project.alt}" loading="lazy">
      <div class="project-shade"></div>
      <div class="project-meta"><span>${project.role}</span><h2>${project.artist}</h2><p>${project.title}</p></div>
    `;
    wall.appendChild(article);
  });
})();

const buttons = [...document.querySelectorAll(".filters button")];
const projects = [...document.querySelectorAll(".project")];

buttons.forEach(button => {
  button.addEventListener("click", () => {
    buttons.forEach(b => b.classList.remove("active"));
    button.classList.add("active");
    const filter = button.dataset.filter;

    projects.forEach(project => {
      const categories = (project.dataset.cat || "").split(" ");
      project.classList.toggle("is-hidden", filter !== "all" && !categories.includes(filter));
    });
  });
});

document.getElementById("contact-form").addEventListener("submit", event => {
  event.preventDefault();
  const name = document.getElementById("name").value.trim();
  const email = document.getElementById("email").value.trim();
  const subject = document.getElementById("subject").value.trim();
  const message = document.getElementById("message").value.trim();
  const body = `Name: ${name}\nEmail: ${email}\n\n${message}`;
  window.location.href =
    "mailto:zmainardi@gmail.com?subject=" + encodeURIComponent(subject) +
    "&body=" + encodeURIComponent(body);
});

// Studio gallery
(() => {
  const mainImage = document.getElementById("studio-main-image");
  const thumbs = [...document.querySelectorAll(".studio-thumb")];
  const prev = document.querySelector(".gallery-prev");
  const next = document.querySelector(".gallery-next");

  if (!mainImage || !thumbs.length) return;

  let current = 0;

  function show(index) {
    current = (index + thumbs.length) % thumbs.length;
    const thumb = thumbs[current];

    mainImage.style.opacity = "0";
    setTimeout(() => {
      mainImage.src = thumb.dataset.src;
      mainImage.alt = thumb.dataset.alt || "";
      mainImage.style.opacity = "1";
    }, 90);

    thumbs.forEach((button, i) => {
      button.classList.toggle("active", i === current);
    });
  }

  thumbs.forEach((thumb, index) => {
    thumb.addEventListener("click", () => show(index));
  });

  if (prev) prev.addEventListener("click", () => show(current - 1));
  if (next) next.addEventListener("click", () => show(current + 1));
})();

// V14+: make File Sending Guidelines collapsible on desktop and mobile
(() => {
  const titleRow = document.querySelector(".workflow-title-row");
  const content = document.querySelector(".workflow-content");
  if (!titleRow || !content || titleRow.closest("details")) return;

  const details = document.createElement("details");
  details.className = "file-guidelines";

  const summary = document.createElement("summary");
  summary.className = "workflow-title-row";

  while (titleRow.firstChild) summary.appendChild(titleRow.firstChild);

  const toggle = document.createElement("span");
  toggle.className = "guideline-toggle";
  toggle.setAttribute("aria-hidden", "true");
  toggle.textContent = "+";
  summary.appendChild(toggle);

  titleRow.parentNode.insertBefore(details, titleRow);
  details.appendChild(summary);
  details.appendChild(content);
  titleRow.remove();
})();

class ProjectCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: "open" });
  }

  connectedCallback() {
    this.render();
  }

  static get observedAttributes() {
    return ["title", "image", "link", "type"];
  }

  attributeChangedCallback() {
    this.render();
  }

  render() {
    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block;
        }
        .masonry-item, .masonryh {
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          padding: 20px;
          background-color: var(--secondary-bg, #333);
          color: white;
          text-align: center;
          border-radius: 30px;
          cursor: pointer;
          transition: transform 0.2s ease, opacity 0.2s ease;
        }
        .masonry-item:hover, .masonryh:hover {
          transform: scale(1.03);
          opacity: 0.9;
        }
        .masonry-item a, .masonryh a {
          display: flex;
          flex-direction: column;
          align-items: center;
          text-decoration: none;
          color: white;
        }
        .masonry-item img, .masonryh img {
          width: 100%;
          max-width: 400px;
          height: auto;
          object-fit: cover;
          border-radius: 15px;
          aspect-ratio: 16/9;
          display: block;
        }
      </style>
      <div class="${this.getAttribute("type") === "hardware" ? "masonryh" : "masonry-item"}">
        <a href="${this.getAttribute("link")}" target="_blank">
          <img src="${this.getAttribute("image")}" alt="${this.getAttribute("title")}">
          <h3>${this.getAttribute("title")}</h3>
        </a>
      </div>
    `;
  }
}

customElements.define("project-card", ProjectCard);

// Initial 6 Software & 2 Hardware Projects
const defaultProjects = {
  software: [
    { title: "Chip Design", image: "./images/chip.jpg", link: "./projects/project1.html" },
    { title: "Chess Game", image: "./images/chess.jpg", link: "./projects/project2.html" },
    { title: "ML Music Prediction", image: "./images/music.jpg", link: "#" },
    { title: "ML Fall Detection Model", image: "./images/pressure.jpg", link: "#" },
    { title: "Personal Website Portfolio", image: "./images/wip.jpg", link: "#" },
    { title: "Bitcoin Hashing", image: "./images/bitcoin.jpg", link: "#" }
  ],
  hardware: [
    { title: "Fall Detection Insoles", image: "./images/soles.jpeg", link: "#" },
    { title: "Individual Sensor Project", image: "./images/sensorkit.jpg", link: "#" }
  ]
};

// Additional 6 Software & 2 Hardware Projects (For Load Local & Remote)
const additionalProjects = {
  software: [
    { title: "Snake Game", image: "./images/snake.jpg", link: "#" },
    { title: "Pong Game", image: "./images/pong.jpg", link: "#" },
    { title: "3D Design Projects", image: "./images/3dsmax.jpg", link: "#" },
    { title: "ML Obstacle Detection", image: "./images/selfcar.jpg", link: "#" },
    { title: "OS Nachos", image: "./images/OS.jpeg", link: "#" },
    { title: "ML Handwriting Recognition", image: "./images/handwriting.jpg", link: "#" }

  ],
  hardware: [
    { title: "Signal Filter Circuit Build", image: "./images/butterworth.jpg", link: "#" },
    { title: "Future Embedded Project", image: "./images/wip.jpg", link: "#" }
  ]
};

// Function to Populate Projects
function populateProjects(projects) {
  const softwareContainer = document.getElementById("project-list");
  const hardwareContainer = document.getElementById("hardware-list");

  softwareContainer.classList.add("soft-group");
  hardwareContainer.classList.add("hard-group");

  projects.software.forEach(proj => {
    const card = document.createElement("project-card");
    card.setAttribute("title", proj.title);
    card.setAttribute("image", proj.image);
    card.setAttribute("link", proj.link);
    card.setAttribute("type", "software");
    softwareContainer.appendChild(card);
  });

  projects.hardware.forEach(proj => {
    const card = document.createElement("project-card");
    card.setAttribute("title", proj.title);
    card.setAttribute("image", proj.image);
    card.setAttribute("link", proj.link);
    card.setAttribute("type", "hardware");
    hardwareContainer.appendChild(card);
  });
}

// Function to Load from LocalStorage
function loadLocal() {
  let storedProjects = localStorage.getItem("projects");
  
  if (!storedProjects) {
    localStorage.setItem("projects", JSON.stringify(defaultProjects));
    storedProjects = defaultProjects;
  } else {
    storedProjects = JSON.parse(storedProjects);
  }

  // Merge additional projects when "Load Local" is clicked
  const mergedProjects = {
    software: [...storedProjects.software, ...additionalProjects.software].slice(6, 12),
    hardware: [...storedProjects.hardware, ...additionalProjects.hardware].slice(2, 4)
  };

  localStorage.setItem("projects", JSON.stringify(mergedProjects));
  populateProjects(mergedProjects);

  document.getElementById("load-local").disabled = true;
  document.getElementById("load-remote").disabled = true;
}

// Function to Load from Remote Server
async function loadRemote() {
  const url = "https://api.jsonbin.io/v3/b/67cb9e5cacd3cb34a8f6e7c9"; // Replace with your actual JSONBin URL
  const headers = {
    "X-Master-Key": "YOUR_JSONBIN_SECRET_KEY" // Optional: Only needed if bin is private
  };

  try {
    const response = await fetch(url, { headers });
    if (!response.ok) throw new Error("Failed to fetch remote data");
    const jsonData = await response.json();

    // Extract projects from JSONBin response
    const projects = jsonData.record; // JSONBin wraps the response in a "record" object

    // Merge additional projects
    const mergedProjects = {
      software: [...projects.software, ...additionalProjects.software].slice(6, 12),
      hardware: [...projects.hardware, ...additionalProjects.hardware].slice(2, 4)
    };

    localStorage.setItem("projects", JSON.stringify(mergedProjects));
    populateProjects(mergedProjects);

    // Disable the button after loading once
    document.getElementById("load-remote").disabled = true;
    document.getElementById("load-local").disabled = true;
  } catch (error) {
    console.error("Error loading remote projects:", error);
  }
}


// Load Initial Projects on Page Load
document.addEventListener("DOMContentLoaded", () => {
  populateProjects(defaultProjects);
});

// Event Listeners for Buttons
document.getElementById("load-local").addEventListener("click", loadLocal);
document.getElementById("load-remote").addEventListener("click", loadRemote);

document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    const projectsTab = document.querySelector(".proj");
    const aboutMeTab = document.querySelector(".a-me");
    const projectsSection = document.getElementById("projects");
    const aboutMeSection = document.getElementById("aboutme");

    // Set default active tab
    projectsTab.classList.add("active");
    projectsSection.style.display = "block";
    aboutMeSection.style.display = "none";

    // Function to switch tabs
    function switchTab(selectedTab) {
        if (selectedTab === "projects") {
            slider.style.transform = "translateX(0%)";
            projectsTab.classList.add("active");
            aboutMeTab.classList.remove("active");
            projectsSection.style.display = "block";
            aboutMeSection.style.display = "none";
        } else {
            slider.style.transform = "translateX(100%)";
            aboutMeTab.classList.add("active");
            projectsTab.classList.remove("active");
            aboutMeSection.style.display = "block";
            projectsSection.style.display = "none";
        }
    }

    // Event Listeners for Tabs
    projectsTab.addEventListener("click", () => switchTab("projects"));
    aboutMeTab.addEventListener("click", () => switchTab("aboutme"));
});

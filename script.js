document.addEventListener("DOMContentLoaded", function () {
    const slider = document.querySelector(".slider");
    const projectsTab = document.querySelector(".proj");
    const aboutMeTab = document.querySelector(".a-me");
    const projectsSection = document.getElementById("projects");
    const aboutMeSection = document.getElementById("aboutme");

    // Apply initial styles for fade effect
    projectsSection.style.opacity = "1";
    aboutMeSection.style.opacity = "0";
    aboutMeSection.style.display = "none";

    // Set default active tab
    projectsTab.classList.add("active");

    // Function to switch tabs with fade effect
    function switchTab(selectedTab) {
        if (selectedTab === "projects") {
            slider.style.transform = "translateX(0%)";
            projectsTab.classList.add("active");
            aboutMeTab.classList.remove("active");

            // Fade out aboutMe and fade in projects
            aboutMeSection.style.opacity = "0";
            setTimeout(() => {
                aboutMeSection.style.display = "none";
                projectsSection.style.display = "block";
                setTimeout(() => {
                    projectsSection.style.opacity = "1";
                }, 50);
            }, 300);
        } else {
            slider.style.transform = "translateX(100%)";
            aboutMeTab.classList.add("active");
            projectsTab.classList.remove("active");

            // Fade out projects and fade in aboutMe
            projectsSection.style.opacity = "0";
            setTimeout(() => {
                projectsSection.style.display = "none";
                aboutMeSection.style.display = "block";
                setTimeout(() => {
                    aboutMeSection.style.opacity = "1";
                }, 50);
            }, 300);
        }
    }

    // Event listeners
    projectsTab.addEventListener("click", () => switchTab("projects"));
    aboutMeTab.addEventListener("click", () => switchTab("aboutme"));
});

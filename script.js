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

document.addEventListener("DOMContentLoaded", () => {
    const plusButtons = document.querySelectorAll(".ucsd-plus, .ucr-plus");
    const detailsElements = document.querySelectorAll(".hover-ucsd, .hover-ucr");

    // Click event to toggle course list visibility
    plusButtons.forEach(button => {
        button.addEventListener("click", () => {
            const relevantCourses = button.classList.contains("ucsd-plus") 
                ? document.querySelector(".hover-ucsd") 
                : document.querySelector(".hover-ucr");

            // Toggle visibility
            const isVisible = relevantCourses.style.display === "flex";
            relevantCourses.style.display = isVisible ? "none" : "flex";

            // Change + to -
            button.textContent = isVisible ? "+" : "-";
        });
    });

    document.addEventListener("DOMContentLoaded", function () {
        document.querySelectorAll(".ucsd-plus, .ucr-plus").forEach(button => {
            button.addEventListener("click", function () {
                let target = this.classList.contains("ucsd-plus") ? 
                             document.querySelector(".hover-ucsd") : 
                             document.querySelector(".hover-ucr");
    
                target.classList.toggle("active");
            });
        });
    });

    // IntersectionObserver to auto-open courses when in view
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            const isUCSD = entry.target.classList.contains("ucsd");
            const relatedCourses = isUCSD 
                ? document.querySelector(".hover-ucsd") 
                : document.querySelector(".hover-ucr");
    
            const plusButton = isUCSD 
                ? document.querySelector(".ucsd-plus") 
                : document.querySelector(".ucr-plus");
    
            if (entry.isIntersecting) {
                relatedCourses.style.display = "flex";
                setTimeout(() => { // Small delay before applying opacity and transform
                    relatedCourses.style.opacity = "1";
                    relatedCourses.style.transform = "translateY(0)";
                }, 50);
    
                plusButton.textContent = "-"; // Switch to -
            } 
        });
    }, { threshold: 1 }); // Trigger when 100% of element is in view
    

    document.querySelectorAll(".ucsd, .ucr").forEach(element => observer.observe(element));
});

document.addEventListener("DOMContentLoaded", () => {
    const detailsElements = document.querySelectorAll("details"); // Target all <details> elements
  
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.setAttribute("open", "true");
            }
        });
    }, { threshold: 1 }); // Trigger when 100% of the element is in view
  
    detailsElements.forEach(details => observer.observe(details));
});

document.addEventListener("DOMContentLoaded", function () {
    const skills = document.querySelectorAll(".skill-fill");

    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const skillFill = entry.target;
                skillFill.style.width = skillFill.getAttribute("data-width");
            }
        });
    }, { threshold: 1 });

    skills.forEach(skill => {
        skill.setAttribute("data-width", skill.style.width); // Store original width
        skill.style.width = "0%"; // Reset to 0 for animation
        observer.observe(skill);
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const projectSection = document.querySelector(".projects");
  
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            projectSection.style.opacity = "1";
            projectSection.style.transform = "translateY(0)";
          }
        });
      },
      { threshold: 0.05 } // Trigger when 5% of the element is in view
    );
  
    observer.observe(projectSection);
});

document.addEventListener("DOMContentLoaded", function () {
    const arrow = document.getElementById("scrollArrow");
    const projectsTab = document.querySelector(".proj");
    const aboutMeTab = document.querySelector(".a-me");
    const projectsSection = document.getElementById("projects");
    const aboutMeSection = document.getElementById("aboutme");
    let hasScrolled = false; // Flag to track if auto-scroll has happened

    function getCurrentTarget() {
        return projectsTab.classList.contains("active") ? projectsSection : aboutMeSection;
    }

    // Click event to scroll down
    arrow.addEventListener("click", function () {
        const targetSection = getCurrentTarget();
        window.scrollTo({
            top: targetSection.offsetTop,
            behavior: "smooth"
        });
    });

    // Scroll event to auto-scroll once
    window.addEventListener("scroll", function () {
        if (hasScrolled) return; // Prevent multiple triggers

        const arrowPosition = arrow.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        // If arrow moves past 30% of the viewport, auto-scroll once
        if (arrowPosition < windowHeight * 0.6) {
            hasScrolled = true; // Set flag to prevent future auto-scrolls
            const targetSection = getCurrentTarget();
            window.scrollTo({
                top: targetSection.offsetTop,
                behavior: "smooth"
            });
        }
    });
});

// ===== DOM ELEMENTS =====
const navbar = document.querySelector(".navbar");
const hamburger = document.querySelector(".hamburger");
const navLinks = document.querySelector(".nav-links");
const profileImage = document.getElementById("profileImage");
const uploadOverlay = document.getElementById("uploadOverlay");
const defaultPlaceholder = document.getElementById("defaultPlaceholder");
const imageUpload = document.getElementById("imageUpload");
const messageForm = document.getElementById("messageForm");
const downloadBtn = document.querySelector(".download-btn");
const ctfLinks = document.querySelectorAll(".ctf-link");
const skillTags = document.querySelectorAll(".skill-tag");
const cards = document.querySelectorAll(
  ".memory-card, .platform-card, .talent-card, .aspiration-card",
);
const timelineItems = document.querySelectorAll(".timeline-item");

// ===== INITIALIZATION =====
document.addEventListener("DOMContentLoaded", () => {
  console.log("🚀 Cybersecurity Portfolio Initialized");

  // Initialize all features
  initNavbar();
  initProfileImage();
  initImageHoverEffects();
  initSkillTags();
  initFormSubmission();
  initScrollAnimations();
  initTypingEffect();
  initTechEffects();
  initButtonEffects();
  initCountUpAnimation();
  initThemeToggle();
  initCursorEffect();
  initCodeMatrixEffect();

  // Check for saved image
  checkSavedProfileImage();
});

// ===== NAVIGATION =====
function initNavbar() {
  // Navbar scroll effect
  window.addEventListener("scroll", () => {
    // Add/remove scrolled class
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }

    // Highlight active nav link
    highlightActiveNavLink();

    // Parallax effect for hero section
    if (window.scrollY < window.innerHeight) {
      const scrolled = window.scrollY;
      const hero = document.querySelector(".hero-section");
      if (hero) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
      }
    }
  });

  // Mobile menu toggle
  hamburger.addEventListener("click", toggleMobileMenu);

  // Close mobile menu when clicking a link
  document.querySelectorAll(".nav-links a").forEach((link) => {
    link.addEventListener("click", () => {
      if (window.innerWidth <= 768) {
        navLinks.classList.remove("active");
        hamburger.innerHTML = '<i class="fas fa-bars"></i>';
        hamburger.style.transform = "rotate(0deg)";
      }
    });
  });

  // Smooth scroll for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();
      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        window.scrollTo({
          top: targetElement.offsetTop - 80,
          behavior: "smooth",
        });
      }
    });
  });
}

function toggleMobileMenu() {
  navLinks.classList.toggle("active");
  const isActive = navLinks.classList.contains("active");

  // Animate hamburger icon
  if (isActive) {
    hamburger.innerHTML = '<i class="fas fa-times"></i>';
    hamburger.style.transform = "rotate(180deg)";

    // Add cyber sound effect (optional)
    playCyberSound("menuOpen");
  } else {
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    hamburger.style.transform = "rotate(0deg)";
  }

  // Prevent body scroll when menu is open
  document.body.style.overflow = isActive ? "hidden" : "auto";
}

function highlightActiveNavLink() {
  const sections = document.querySelectorAll("section[id]");
  const navItems = document.querySelectorAll(".nav-links a");

  let current = "";
  const scrollPosition = window.scrollY + 100;

  sections.forEach((section) => {
    const sectionTop = section.offsetTop;
    const sectionHeight = section.clientHeight;

    if (
      scrollPosition >= sectionTop &&
      scrollPosition < sectionTop + sectionHeight
    ) {
      current = section.getAttribute("id");
    }
  });

  navItems.forEach((item) => {
    item.classList.remove("active");
    const href = item.getAttribute("href").substring(1);
    if (href === current) {
      item.classList.add("active");

      // Add cyber effect to active link
      item.style.textShadow = "0 0 10px var(--primary)";
      setTimeout(() => {
        item.style.textShadow = "none";
      }, 1000);
    }
  });
}

// ===== PROFILE IMAGE HANDLING =====
function initProfileImage() {
  // Profile image upload
  imageUpload.addEventListener("change", handleImageUpload);

  // Upload overlay click
  uploadOverlay.addEventListener("click", () => {
    imageUpload.click();
    addCyberEffect(uploadOverlay);
  });

  // Profile image hover effect
  profileImage.addEventListener("mouseenter", () => {
    if (profileImage.style.display !== "none") {
      profileImage.style.transform = "scale(1.05)";
      profileImage.style.filter = "brightness(1.1) contrast(1.1)";
    }
  });

  profileImage.addEventListener("mouseleave", () => {
    if (profileImage.style.display !== "none") {
      profileImage.style.transform = "scale(1)";
      profileImage.style.filter = "brightness(1) contrast(1)";
    }
  });
}

function handleImageUpload(e) {
  const file = e.target.files[0];
  if (!file) return;

  if (!file.type.match("image.*")) {
    showNotification("Please select an image file", "error");
    return;
  }

  if (file.size > 5 * 1024 * 1024) {
    // 5MB limit
    showNotification("Image size should be less than 5MB", "error");
    return;
  }

  const reader = new FileReader();

  reader.onloadstart = () => {
    uploadOverlay.innerHTML = '<i class="fas fa-spinner fa-spin"></i>';
    uploadOverlay.style.pointerEvents = "none";
  };

  reader.onload = function (event) {
    // Show uploaded image with fade effect
    profileImage.style.opacity = "0";
    profileImage.src = event.target.result;
    profileImage.style.display = "block";
    defaultPlaceholder.style.display = "none";

    setTimeout(() => {
      profileImage.style.opacity = "1";
      uploadOverlay.innerHTML = '<i class="fas fa-camera"></i>';
      uploadOverlay.style.pointerEvents = "auto";

      // Save to localStorage
      localStorage.setItem("profileImage", event.target.result);

      // Show success with animation
      showNotification("Profile image updated successfully! 🎉", "success");
      addCyberEffect(profileImage.parentElement);

      // Add scan line effect
      addScanEffect(profileImage.parentElement);
    }, 300);
  };

  reader.onerror = () => {
    showNotification("Error loading image. Please try again.", "error");
    uploadOverlay.innerHTML = '<i class="fas fa-camera"></i>';
    uploadOverlay.style.pointerEvents = "auto";
  };

  reader.readAsDataURL(file);
}

function checkSavedProfileImage() {
  const savedImage = localStorage.getItem("profileImage");
  if (savedImage) {
    profileImage.src = savedImage;
    profileImage.style.display = "block";
    defaultPlaceholder.style.display = "none";
  }
}

// ===== IMAGE HOVER EFFECTS =====
function initImageHoverEffects() {
  document.querySelectorAll(".memory-img-container").forEach((container) => {
    const img = container.querySelector(".memory-img");
    const placeholder = container.querySelector(".img-placeholder");

    container.addEventListener("mouseenter", () => {
      container.style.transform = "translateY(-5px)";
      container.style.boxShadow = "0 15px 40px rgba(0, 255, 136, 0.3)";

      if (img && img.style.display !== "none") {
        img.style.transform = "scale(1.05)";
        img.style.filter = "sepia(0.3) hue-rotate(15deg)";
      }

      addCyberEffect(container);
    });

    container.addEventListener("mouseleave", () => {
      container.style.transform = "translateY(0)";
      container.style.boxShadow = "none";

      if (img && img.style.display !== "none") {
        img.style.transform = "scale(1)";
        img.style.filter = "none";
      }
    });

    // Click to enlarge
    container.addEventListener("click", () => {
      if (img && img.style.display !== "none") {
        openImageModal(img.src, img.alt);
      }
    });
  });
}

// ===== SKILL TAGS =====
function initSkillTags() {
  skillTags.forEach((tag) => {
    tag.addEventListener("mouseenter", function () {
      this.style.transform = "scale(1.1) translateY(-5px)";
      this.style.boxShadow = "0 10px 20px rgba(0, 255, 136, 0.4)";
      this.style.zIndex = "10";

      // Add cyber text effect
      const text = this.textContent;
      this.dataset.original = text;
      this.innerHTML = `<span class="cyber-text">${text}</span>`;

      // Add sound effect
      playCyberSound("hover");

      // Add particle effect
      createParticlesAround(this, 5);
    });

    tag.addEventListener("mouseleave", function () {
      this.style.transform = "scale(1) translateY(0)";
      this.style.boxShadow = "none";
      this.style.zIndex = "1";

      // Restore original text
      if (this.dataset.original) {
        this.innerHTML = this.dataset.original;
      }
    });

    // Click to show info
    tag.addEventListener("click", function () {
      const skill = this.textContent;
      showNotification(
        `Skill: ${skill} | Click HackTheBox link to see in action!`,
        "info",
      );
    });
  });
}

// ===== FORM HANDLING =====
function initFormSubmission() {
  if (!messageForm) return;

  messageForm.addEventListener("submit", function (e) {
    e.preventDefault();

    // Get form values
    const formData = {
      name: this.querySelector('input[type="text"]').value.trim(),
      email: this.querySelector('input[type="email"]').value.trim(),
      subject: this.querySelectorAll('input[type="text"]')[1].value.trim(),
      message: this.querySelector("textarea").value.trim(),
    };

    // Validate form
    if (!validateForm(formData)) return;

    // Show loading state
    const submitBtn = this.querySelector(".submit-btn");
    const originalText = submitBtn.innerHTML;
    submitBtn.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Sending...';
    submitBtn.disabled = true;

    // Simulate API call (in real app, replace with actual fetch)
    setTimeout(() => {
      // Success response
      showNotification(
        `🚀 Message sent successfully!<br>Thank you ${formData.name}, I'll respond within 24 hours.`,
        "success",
      );

      // Reset form
      this.reset();

      // Restore button
      submitBtn.innerHTML = originalText;
      submitBtn.disabled = false;

      // Add cyber effect
      addCyberEffect(this);
      playCyberSound("success");

      // Log to console (for debugging)
      console.log("📧 Form submitted:", formData);
    }, 1500);
  });
}

function validateForm(data) {
  if (!data.name || data.name.length < 2) {
    showNotification("Please enter a valid name (min 2 characters)", "error");
    return false;
  }

  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(data.email)) {
    showNotification("Please enter a valid email address", "error");
    return false;
  }

  if (!data.subject || data.subject.length < 3) {
    showNotification("Please enter a subject (min 3 characters)", "error");
    return false;
  }

  if (!data.message || data.message.length < 10) {
    showNotification("Please enter a message (min 10 characters)", "error");
    return false;
  }

  return true;
}

// ===== SCROLL ANIMATIONS =====
function initScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: "0px 0px -50px 0px",
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("animate-in");

        // Add cyber effect on scroll into view
        if (entry.target.classList.contains("timeline-item")) {
          addTimelineEffect(entry.target);
        }

        if (entry.target.classList.contains("memory-card")) {
          addMemoryCardEffect(entry.target);
        }
      }
    });
  }, observerOptions);

  // Observe elements
  cards.forEach((card) => observer.observe(card));
  timelineItems.forEach((item) => observer.observe(item));

  // Add CSS for animations
  addScrollAnimationStyles();
}

function addScrollAnimationStyles() {
  const style = document.createElement("style");
  style.textContent = `
        .memory-card, .timeline-item, .platform-card, 
        .talent-card, .aspiration-card, .skill-tag {
            opacity: 0;
            transform: translateY(30px) scale(0.95);
            transition: opacity 0.6s ease, transform 0.6s ease;
        }
        
        .animate-in {
            opacity: 1;
            transform: translateY(0) scale(1);
        }
        
        /* Staggered animations */
        .memory-card:nth-child(1) { transition-delay: 0.1s; }
        .memory-card:nth-child(2) { transition-delay: 0.2s; }
        .memory-card:nth-child(3) { transition-delay: 0.3s; }
        .memory-card:nth-child(4) { transition-delay: 0.4s; }
        
        .platform-card:nth-child(1) { transition-delay: 0.1s; }
        .platform-card:nth-child(2) { transition-delay: 0.2s; }
        .platform-card:nth-child(3) { transition-delay: 0.3s; }
        
        .talent-card:nth-child(1) { transition-delay: 0.1s; }
        .talent-card:nth-child(2) { transition-delay: 0.2s; }
        .talent-card:nth-child(3) { transition-delay: 0.3s; }
        .talent-card:nth-child(4) { transition-delay: 0.4s; }
        
        .aspiration-card:nth-child(1) { transition-delay: 0.1s; }
        .aspiration-card:nth-child(2) { transition-delay: 0.2s; }
        .aspiration-card:nth-child(3) { transition-delay: 0.3s; }
        
        .timeline-item:nth-child(1) { transition-delay: 0.1s; }
        .timeline-item:nth-child(2) { transition-delay: 0.2s; }
        .timeline-item:nth-child(3) { transition-delay: 0.3s; }
        .timeline-item:nth-child(4) { transition-delay: 0.4s; }
        .timeline-item:nth-child(5) { transition-delay: 0.5s; }
    `;
  document.head.appendChild(style);
}

// ===== TYPING EFFECT =====
function initTypingEffect() {
  const subtitle = document.querySelector(".subtitle");
  if (!subtitle) return;

  const originalText = subtitle.textContent;
  const texts = [
    "Cybersecurity Specialist & Ethical Hacking Enthusiast",
    "Penetration Testing Expert",
    "Secure Software Developer",
    "Future Google Security Engineer",
    "CTF Player & Bug Hunter",
    "Cybersecurity Analyst",
    "Digital Guardian & Code Protector",
  ];

  let textIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingTimer;

  function type() {
    const currentText = texts[textIndex];

    if (isDeleting) {
      subtitle.textContent = currentText.substring(0, charIndex - 1);
      charIndex--;
    } else {
      subtitle.textContent = currentText.substring(0, charIndex + 1);
      charIndex++;
    }

    let typeSpeed = isDeleting ? 40 : 100;

    // Random speed variation for natural feel
    typeSpeed += Math.random() * 50;

    if (!isDeleting && charIndex === currentText.length) {
      // Pause at the end
      typeSpeed = 2000;

      // Add cyber flash effect
      subtitle.style.textShadow =
        "0 0 15px var(--primary), 0 0 30px var(--primary)";
      subtitle.style.color = "var(--primary)";

      setTimeout(() => {
        subtitle.style.textShadow = "none";
        subtitle.style.color = "";
      }, 500);

      setTimeout(() => {
        isDeleting = true;
        type();
      }, typeSpeed);
      return;
    }

    if (isDeleting && charIndex === 0) {
      isDeleting = false;
      textIndex = (textIndex + 1) % texts.length;
      typeSpeed = 500; // Pause before typing next
    }

    clearTimeout(typingTimer);
    typingTimer = setTimeout(type, typeSpeed);
  }

  // Start typing effect
  setTimeout(() => {
    // Clear original text
    subtitle.textContent = "";
    // Start typing
    type();
  }, 1000);
}

// ===== TECH EFFECTS =====
function initTechEffects() {
  createFloatingTechElements();
  createParticles();
  addGlitchEffect();
  initMatrixRain();
  initBinaryClock();
}

function createFloatingTechElements() {
  const techIcons = [
    "fas fa-code",
    "fas fa-shield-alt",
    "fas fa-lock",
    "fas fa-server",
    "fas fa-network-wired",
    "fas fa-bug",
    "fas fa-terminal",
    "fas fa-database",
    "fas fa-key",
    "fas fa-user-secret",
    "fas fa-fingerprint",
    "fas fa-globe",
  ];

  const colors = [
    "#00ff88",
    "#4361ee",
    "#7209b7",
    "#ff4757",
    "#ff9f1c",
    "#2ec4b6",
  ];

  for (let i = 0; i < 8; i++) {
    const tech = document.createElement("div");
    tech.className = "floating-tech";
    tech.innerHTML = `<i class="${techIcons[Math.floor(Math.random() * techIcons.length)]}"></i>`;

    // Random positioning
    tech.style.top = `${Math.random() * 100}%`;
    tech.style.left = `${Math.random() * 100}%`;

    // Random size
    const size = Math.random() * 2 + 1;
    tech.style.fontSize = `${size}rem`;

    // Random color
    tech.style.color = colors[Math.floor(Math.random() * colors.length)];

    // Random animation
    const duration = Math.random() * 20 + 20;
    const delay = Math.random() * 10;
    tech.style.animation = `float ${duration}s infinite ease-in-out ${delay}s`;

    // Random opacity
    tech.style.opacity = `${Math.random() * 0.2 + 0.05}`;

    // Random rotation
    tech.style.transform = `rotate(${Math.random() * 360}deg)`;

    // Add hover effect
    tech.addEventListener("mouseenter", () => {
      tech.style.opacity = "0.8";
      tech.style.transform += " scale(1.5)";
      tech.style.zIndex = "1000";
      playCyberSound("ping");
    });

    tech.addEventListener("mouseleave", () => {
      tech.style.opacity = `${Math.random() * 0.2 + 0.05}`;
      tech.style.transform = tech.style.transform.replace(" scale(1.5)", "");
      tech.style.zIndex = "";
    });

    document.body.appendChild(tech);
  }
}

function createParticles() {
  const container = document.createElement("div");
  container.className = "particles-container";
  document.body.appendChild(container);

  for (let i = 0; i < 80; i++) {
    const particle = document.createElement("div");
    particle.className = "particle";

    // Random size
    const size = Math.random() * 5 + 1;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;

    // Random position
    particle.style.left = `${Math.random() * 100}vw`;

    // Random color
    const colors = ["#00ff88", "#4361ee", "#7209b7", "#ff4757", "#ff9f1c"];
    particle.style.backgroundColor =
      colors[Math.floor(Math.random() * colors.length)];

    // Random animation
    const duration = Math.random() * 20 + 10;
    const delay = Math.random() * 5;
    particle.style.animation = `particle-float ${duration}s linear infinite ${delay}s`;

    // Random opacity
    particle.style.opacity = `${Math.random() * 0.3 + 0.1}`;

    // Add trail effect
    particle.style.boxShadow = `0 0 ${size * 3}px ${particle.style.backgroundColor}`;

    container.appendChild(particle);
  }
}

function addGlitchEffect() {
  const sectionTitles = document.querySelectorAll(".section-title");
  sectionTitles.forEach((title) => {
    const text = title.textContent;
    title.setAttribute("data-text", text);

    // Add random glitch effect
    setInterval(() => {
      if (Math.random() > 0.7) {
        // 30% chance to glitch
        title.style.textShadow = `
                    0.05em 0 0 rgba(255, 0, 0, 0.75),
                    -0.025em -0.05em 0 rgba(0, 255, 0, 0.75),
                    0.025em 0.05em 0 rgba(0, 0, 255, 0.75)
                `;
        title.style.animation = "none";
        title.offsetHeight; // Trigger reflow
        title.style.animation = null;

        setTimeout(() => {
          title.style.textShadow = "none";
        }, 100);
      }
    }, 3000);
  });
}

// ===== BUTTON EFFECTS =====
function initButtonEffects() {
  // Download button effect
  if (downloadBtn) {
    downloadBtn.addEventListener("click", function (e) {
      // Add cyber effect
      addCyberEffect(this);
      playCyberSound("download");

      // Show loading state
      const originalHTML = this.innerHTML;
      this.innerHTML = '<i class="fas fa-spinner fa-spin"></i> Downloading...';
      this.style.pointerEvents = "none";

      // Simulate download (in real app, this would trigger actual download)
      setTimeout(() => {
        this.innerHTML = originalHTML;
        this.style.pointerEvents = "auto";
        showNotification("Resume downloaded successfully! 📄", "success");
      }, 1500);
    });
  }

  // CTF links effect
  ctfLinks.forEach((link) => {
    link.addEventListener("mouseenter", function () {
      this.style.transform = "translateX(5px)";
      this.style.color = "var(--primary)";
      playCyberSound("linkHover");

      // Add scanning line effect
      const scanLine = document.createElement("div");
      scanLine.className = "scan-line";
      scanLine.style.cssText = `
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 2px;
                background: linear-gradient(90deg, transparent, var(--primary), transparent);
                animation: scan 1s linear;
            `;
      this.style.position = "relative";
      this.appendChild(scanLine);

      setTimeout(() => {
        if (scanLine.parentNode) {
          scanLine.remove();
        }
      }, 1000);
    });

    link.addEventListener("mouseleave", function () {
      this.style.transform = "translateX(0)";
      this.style.color = "";
    });

    link.addEventListener("click", function (e) {
      addCyberEffect(this);
      playCyberSound("externalLink");

      // Add CSS for scan animation
      if (!document.querySelector("#scan-animation")) {
        const style = document.createElement("style");
        style.id = "scan-animation";
        style.textContent = `
                    @keyframes scan {
                        0% { transform: translateX(-100%); }
                        100% { transform: translateX(100%); }
                    }
                `;
        document.head.appendChild(style);
      }
    });
  });
}

// ===== COUNT UP ANIMATION =====
function initCountUpAnimation() {
  const counters = document.querySelectorAll(".counter");
  if (counters.length === 0) return;

  const observerOptions = {
    threshold: 0.5,
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        const target = entry.target;
        const targetValue = parseInt(
          target.getAttribute("data-count") || target.textContent,
        );
        const duration = 2000; // 2 seconds
        const step = targetValue / (duration / 16); // 60fps
        let current = 0;

        const timer = setInterval(() => {
          current += step;
          if (current >= targetValue) {
            current = targetValue;
            clearInterval(timer);
          }
          target.textContent = Math.floor(current);
        }, 16);

        observer.unobserve(target);
      }
    });
  }, observerOptions);

  counters.forEach((counter) => observer.observe(counter));
}

// ===== THEME TOGGLE =====
function initThemeToggle() {
  // Create theme toggle button
  const themeToggle = document.createElement("button");
  themeToggle.id = "themeToggle";
  themeToggle.innerHTML = '<i class="fas fa-palette"></i>';
  themeToggle.title = "Toggle Theme";
  themeToggle.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        background: var(--gradient-1);
        color: var(--dark);
        border: none;
        font-size: 1.2rem;
        cursor: pointer;
        z-index: 1000;
        box-shadow: var(--shadow);
        transition: all 0.3s ease;
    `;

  document.body.appendChild(themeToggle);

  // Theme toggle functionality
  themeToggle.addEventListener("click", () => {
    document.body.classList.toggle("dark-mode");
    const isDarkMode = document.body.classList.contains("dark-mode");

    if (isDarkMode) {
      // Switch to dark theme
      document.documentElement.style.setProperty("--primary", "#00cc6a");
      document.documentElement.style.setProperty("--dark", "#f8f9fa");
      document.documentElement.style.setProperty("--light", "#0a0e17");
      themeToggle.innerHTML = '<i class="fas fa-sun"></i>';
      showNotification("Dark theme activated 🌙", "info");
    } else {
      // Switch to light theme
      document.documentElement.style.setProperty("--primary", "#00ff88");
      document.documentElement.style.setProperty("--dark", "#0a0e17");
      document.documentElement.style.setProperty("--light", "#f8f9fa");
      themeToggle.innerHTML = '<i class="fas fa-moon"></i>';
      showNotification("Light theme activated ☀️", "info");
    }

    addCyberEffect(themeToggle);
    playCyberSound("themeToggle");
  });
}

// ===== CURSOR EFFECT =====
function initCursorEffect() {
  // Create custom cursor
  const cursor = document.createElement("div");
  cursor.id = "cyber-cursor";
  cursor.style.cssText = `
        position: fixed;
        width: 20px;
        height: 20px;
        border: 2px solid var(--primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10000;
        mix-blend-mode: difference;
        transition: transform 0.1s ease;
    `;

  const cursorDot = document.createElement("div");
  cursorDot.id = "cursor-dot";
  cursorDot.style.cssText = `
        position: fixed;
        width: 6px;
        height: 6px;
        background: var(--primary);
        border-radius: 50%;
        pointer-events: none;
        z-index: 10001;
        mix-blend-mode: difference;
        transition: transform 0.05s ease;
    `;

  document.body.appendChild(cursor);
  document.body.appendChild(cursorDot);

  // Move cursor
  document.addEventListener("mousemove", (e) => {
    cursor.style.left = `${e.clientX - 10}px`;
    cursor.style.top = `${e.clientY - 10}px`;
    cursorDot.style.left = `${e.clientX - 3}px`;
    cursorDot.style.top = `${e.clientY - 3}px`;
  });

  // Click effect
  document.addEventListener("mousedown", () => {
    cursor.style.transform = "scale(0.8)";
    cursorDot.style.transform = "scale(1.5)";
  });

  document.addEventListener("mouseup", () => {
    cursor.style.transform = "scale(1)";
    cursorDot.style.transform = "scale(1)";
  });

  // Hover effects
  document
    .querySelectorAll("a, button, .skill-tag, .memory-card")
    .forEach((el) => {
      el.addEventListener("mouseenter", () => {
        cursor.style.transform = "scale(1.5)";
        cursor.style.borderColor = "var(--cyber-blue)";
        cursorDot.style.transform = "scale(2)";
        cursorDot.style.backgroundColor = "var(--cyber-blue)";
      });

      el.addEventListener("mouseleave", () => {
        cursor.style.transform = "scale(1)";
        cursor.style.borderColor = "var(--primary)";
        cursorDot.style.transform = "scale(1)";
        cursorDot.style.backgroundColor = "var(--primary)";
      });
    });
}

// ===== MATRIX RAIN EFFECT =====
function initMatrixRain() {
  const canvas = document.createElement("canvas");
  canvas.id = "matrix-canvas";
  canvas.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: -1;
        opacity: 0.1;
    `;

  document.body.appendChild(canvas);

  const ctx = canvas.getContext("2d");
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  const chars =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789$+-*/=%\"'#&_(),.;:?!\\|{}<>[]^~";
  const charArray = chars.split("");
  const fontSize = 14;
  const columns = canvas.width / fontSize;
  const drops = [];

  for (let i = 0; i < columns; i++) {
    drops[i] = 1;
  }

  function drawMatrix() {
    ctx.fillStyle = "rgba(10, 14, 23, 0.04)";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    ctx.fillStyle = "#00ff88";
    ctx.font = `${fontSize}px monospace`;

    for (let i = 0; i < drops.length; i++) {
      const text = charArray[Math.floor(Math.random() * charArray.length)];
      ctx.fillText(text, i * fontSize, drops[i] * fontSize);

      if (drops[i] * fontSize > canvas.height && Math.random() > 0.975) {
        drops[i] = 0;
      }
      drops[i]++;
    }
  }

  setInterval(drawMatrix, 35);

  // Resize handler
  window.addEventListener("resize", () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  });
}

// ===== BINARY CLOCK =====
function initBinaryClock() {
  const clockContainer = document.createElement("div");
  clockContainer.id = "binary-clock";
  clockContainer.style.cssText = `
        position: fixed;
        bottom: 30px;
        left: 30px;
        background: rgba(20, 27, 45, 0.8);
        padding: 10px 20px;
        border-radius: 10px;
        font-family: monospace;
        font-size: 0.9rem;
        color: var(--primary);
        border: 1px solid rgba(0, 255, 136, 0.3);
        z-index: 1000;
        backdrop-filter: blur(5px);
    `;

  document.body.appendChild(clockContainer);

  function updateBinaryClock() {
    const now = new Date();
    const hours = now.getHours().toString(2).padStart(6, "0");
    const minutes = now.getMinutes().toString(2).padStart(6, "0");
    const seconds = now.getSeconds().toString(2).padStart(6, "0");

    clockContainer.innerHTML = `
            <div>${hours.split("").join(" ")}</div>
            <div>${minutes.split("").join(" ")}</div>
            <div>${seconds.split("").join(" ")}</div>
            <div style="font-size:0.7rem;margin-top:5px;color:#8a8fa3">
                ${now.toLocaleTimeString()}
            </div>
        `;
  }

  updateBinaryClock();
  setInterval(updateBinaryClock, 1000);
}

// ===== NOTIFICATION SYSTEM =====
function showNotification(message, type = "info") {
  // Remove existing notification
  const existingNotification = document.querySelector(".notification");
  if (existingNotification) {
    existingNotification.remove();
  }

  // Create notification
  const notification = document.createElement("div");
  notification.className = `notification ${type}`;

  // Icons based on type
  const icons = {
    success: "fas fa-check-circle",
    error: "fas fa-exclamation-circle",
    info: "fas fa-info-circle",
    warning: "fas fa-exclamation-triangle",
  };

  notification.innerHTML = `
        <div class="notification-icon">
            <i class="${icons[type] || icons.info}"></i>
        </div>
        <div class="notification-content">${message}</div>
        <button class="notification-close">
            <i class="fas fa-times"></i>
        </button>
    `;

  // Add styles if not already added
  if (!document.querySelector("#notification-styles")) {
    const style = document.createElement("style");
    style.id = "notification-styles";
    style.textContent = `
            .notification {
                position: fixed;
                top: 100px;
                right: 20px;
                background: rgba(20, 27, 45, 0.95);
                color: var(--light);
                padding: 15px 20px;
                border-radius: 10px;
                border-left: 4px solid var(--primary);
                box-shadow: var(--shadow-hover);
                display: flex;
                align-items: center;
                gap: 15px;
                max-width: 400px;
                transform: translateX(150%);
                transition: transform 0.4s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                z-index: 10000;
                backdrop-filter: blur(10px);
            }
            
            .notification.show {
                transform: translateX(0);
            }
            
            .notification.success {
                border-left-color: var(--primary);
            }
            
            .notification.error {
                border-left-color: var(--danger);
            }
            
            .notification.info {
                border-left-color: var(--cyber-blue);
            }
            
            .notification.warning {
                border-left-color: var(--warning);
            }
            
            .notification-icon {
                font-size: 1.5rem;
            }
            
            .notification.success .notification-icon {
                color: var(--primary);
            }
            
            .notification.error .notification-icon {
                color: var(--danger);
            }
            
            .notification.info .notification-icon {
                color: var(--cyber-blue);
            }
            
            .notification.warning .notification-icon {
                color: var(--warning);
            }
            
            .notification-content {
                flex: 1;
                font-size: 0.95rem;
                line-height: 1.4;
            }
            
            .notification-close {
                background: transparent;
                border: none;
                color: var(--gray);
                font-size: 1rem;
                cursor: pointer;
                transition: color 0.3s ease;
                padding: 5px;
                border-radius: 50%;
                width: 30px;
                height: 30px;
                display: flex;
                align-items: center;
                justify-content: center;
            }
            
            .notification-close:hover {
                color: var(--primary);
                background: rgba(0, 255, 136, 0.1);
            }
        `;
    document.head.appendChild(style);
  }

  document.body.appendChild(notification);

  // Show with animation
  setTimeout(() => {
    notification.classList.add("show");
  }, 10);

  // Close button functionality
  const closeBtn = notification.querySelector(".notification-close");
  closeBtn.addEventListener("click", () => {
    notification.classList.remove("show");
    setTimeout(() => {
      notification.remove();
    }, 300);
  });

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentNode) {
      notification.classList.remove("show");
      setTimeout(() => {
        if (notification.parentNode) {
          notification.remove();
        }
      }, 300);
    }
  }, 5000);

  return notification;
}

// ===== HELPER FUNCTIONS =====
function addCyberEffect(element) {
  if (!element) return;

  // Add glow effect
  element.style.boxShadow = "0 0 20px var(--primary)";

  // Create particles
  createParticlesAround(element, 3);

  // Play sound
  playCyberSound("effect");

  // Remove glow after delay
  setTimeout(() => {
    element.style.boxShadow = "";
  }, 500);
}

function createParticlesAround(element, count) {
  const rect = element.getBoundingClientRect();

  for (let i = 0; i < count; i++) {
    const particle = document.createElement("div");
    particle.style.cssText = `
            position: fixed;
            width: 4px;
            height: 4px;
            background: var(--primary);
            border-radius: 50%;
            pointer-events: none;
            z-index: 1000;
            left: ${rect.left + Math.random() * rect.width}px;
            top: ${rect.top + Math.random() * rect.height}px;
        `;

    document.body.appendChild(particle);

    // Animate particle
    const angle = Math.random() * Math.PI * 2;
    const speed = 2 + Math.random() * 3;
    const distance = 20 + Math.random() * 30;

    let progress = 0;
    const animate = () => {
      progress += 0.05;
      if (progress >= 1) {
        particle.remove();
        return;
      }

      const x = Math.cos(angle) * distance * progress;
      const y = Math.sin(angle) * distance * progress;
      const scale = 1 - progress;
      const opacity = 1 - progress;

      particle.style.transform = `translate(${x}px, ${y}px) scale(${scale})`;
      particle.style.opacity = opacity;

      requestAnimationFrame(animate);
    };

    animate();
  }
}

function addScanEffect(element) {
  const scanLine = document.createElement("div");
  scanLine.className = "scan-line-effect";
  scanLine.style.cssText = `
        position: absolute;
        top: 0;
        left: 0;
        width: 100%;
        height: 3px;
        background: linear-gradient(90deg, transparent, var(--primary), transparent);
        animation: scanEffect 1s linear;
        z-index: 10;
    `;

  element.style.position = "relative";
  element.appendChild(scanLine);

  setTimeout(() => {
    scanLine.remove();
  }, 1000);
}

function addTimelineEffect(element) {
  const line = element.querySelector(".timeline-content");
  if (line) {
    line.style.boxShadow = "0 0 15px rgba(0, 255, 136, 0.3)";
    setTimeout(() => {
      line.style.boxShadow = "";
    }, 1000);
  }
}

function addMemoryCardEffect(element) {
  element.style.borderColor = "var(--primary)";
  element.style.boxShadow = "0 10px 30px rgba(0, 255, 136, 0.2)";

  setTimeout(() => {
    element.style.borderColor = "";
    element.style.boxShadow = "";
  }, 1500);
}

function playCyberSound(type) {
  // In a real application, you would play actual sound files
  // For now, we'll just log and use the Web Audio API for beep sounds

  if (typeof AudioContext !== "undefined") {
    try {
      const audioContext = new (
        window.AudioContext || window.webkitAudioContext
      )();
      const oscillator = audioContext.createOscillator();
      const gainNode = audioContext.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(audioContext.destination);

      // Different sounds for different actions
      switch (type) {
        case "hover":
          oscillator.frequency.setValueAtTime(800, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.05);
          break;

        case "click":
          oscillator.frequency.setValueAtTime(600, audioContext.currentTime);
          gainNode.gain.setValueAtTime(0.15, audioContext.currentTime);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.1);
          break;

        case "success":
          oscillator.frequency.setValueAtTime(1000, audioContext.currentTime);
          oscillator.frequency.setValueAtTime(
            1200,
            audioContext.currentTime + 0.1,
          );
          gainNode.gain.setValueAtTime(0.1, audioContext.currentTime);
          oscillator.start();
          oscillator.stop(audioContext.currentTime + 0.2);
          break;

        case "menuOpen":
          // Two beeps
          [400, 600].forEach((freq, i) => {
            setTimeout(() => {
              const osc = audioContext.createOscillator();
              const gain = audioContext.createGain();
              osc.connect(gain);
              gain.connect(audioContext.destination);
              osc.frequency.setValueAtTime(freq, audioContext.currentTime);
              gain.gain.setValueAtTime(0.1, audioContext.currentTime);
              osc.start();
              osc.stop(audioContext.currentTime + 0.05);
            }, i * 100);
          });
          break;
      }
    } catch (e) {
      console.log("Audio context not supported");
    }
  }
}

function openImageModal(src, alt) {
  // Create modal
  const modal = document.createElement("div");
  modal.className = "image-modal";
  modal.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        background: rgba(10, 14, 23, 0.95);
        display: flex;
        align-items: center;
        justify-content: center;
        z-index: 10000;
        opacity: 0;
        transition: opacity 0.3s ease;
    `;

  modal.innerHTML = `
        <div class="modal-content" style="max-width: 90%; max-height: 90%; position: relative;">
            <img src="${src}" alt="${alt}" style="max-width: 100%; max-height: 100%; border-radius: 10px; box-shadow: 0 20px 50px rgba(0,0,0,0.5);">
            <button class="modal-close" style="position: absolute; top: -15px; right: -15px; width: 40px; height: 40px; border-radius: 50%; background: var(--gradient-1); border: none; color: var(--dark); font-size: 1.2rem; cursor: pointer; box-shadow: var(--shadow);">×</button>
        </div>
    `;

  document.body.appendChild(modal);
  document.body.style.overflow = "hidden";

  // Show modal
  setTimeout(() => {
    modal.style.opacity = "1";
  }, 10);

  // Close modal
  const closeBtn = modal.querySelector(".modal-close");
  closeBtn.addEventListener("click", () => {
    modal.style.opacity = "0";
    setTimeout(() => {
      modal.remove();
      document.body.style.overflow = "auto";
    }, 300);
  });

  // Close on background click
  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.opacity = "0";
      setTimeout(() => {
        modal.remove();
        document.body.style.overflow = "auto";
      }, 300);
    }
  });

  // Close on Escape key
  document.addEventListener("keydown", function closeOnEscape(e) {
    if (e.key === "Escape") {
      modal.style.opacity = "0";
      setTimeout(() => {
        modal.remove();
        document.body.style.overflow = "auto";
        document.removeEventListener("keydown", closeOnEscape);
      }, 300);
    }
  });
}

// ===== WINDOW RESIZE HANDLER =====
window.addEventListener("resize", () => {
  // Update canvas size for matrix effect
  const canvas = document.getElementById("matrix-canvas");
  if (canvas) {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }

  // Close mobile menu if open on resize to desktop
  if (window.innerWidth > 768 && navLinks.classList.contains("active")) {
    navLinks.classList.remove("active");
    hamburger.innerHTML = '<i class="fas fa-bars"></i>';
    document.body.style.overflow = "auto";
  }
});

// ===== PAGE LOAD ANIMATION =====
window.addEventListener("load", () => {
  // Add loaded class to body for entrance animations
  document.body.classList.add("loaded");

  // Show welcome notification
  setTimeout(() => {
    showNotification(
      "🚀 Welcome to my Cybersecurity Portfolio!<br>Explore my journey in digital security.",
      "info",
    );
  }, 1000);

  // Add entrance animation styles
  const entranceStyle = document.createElement("style");
  entranceStyle.textContent = `
        body:not(.loaded) .hero-content {
            opacity: 0;
            transform: translateY(50px);
        }
        
        body.loaded .hero-content {
            opacity: 1;
            transform: translateY(0);
            transition: opacity 1s ease, transform 1s ease;
        }
    `;
  document.head.appendChild(entranceStyle);
});

// ===== CONSOLE GREETING =====
console.log(
  "%c🔒 CYBERSECURITY PORTFOLIO 🔒",
  "font-size: 24px; font-weight: bold; color: #00ff88; text-shadow: 0 0 10px #00ff88;",
);
console.log(
  "%cWelcome to the source code! 👩‍💻",
  "font-size: 16px; color: #4361ee;",
);
console.log(
  "%cRemember: With great power comes great responsibility.",
  "font-size: 14px; color: #ff4757;",
);
console.log(
  "%cStay ethical, stay secure! 🔐",
  "font-size: 14px; color: #00ff88;",
);

// Export functions for debugging
if (typeof window !== "undefined") {
  window.portfolio = {
    showNotification,
    addCyberEffect,
    playCyberSound,
  };
}

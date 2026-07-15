document.addEventListener("DOMContentLoaded", () => {
  // 1. Navbar Scroll Effect
  const navbar = document.querySelector(".navbar");
  window.addEventListener("scroll", () => {
    if (window.scrollY > 50) {
      navbar.classList.add("scrolled");
    } else {
      navbar.classList.remove("scrolled");
    }
  });

  // Close mobile menu on link click
  const navLinks = document.querySelectorAll(".nav-link");
  const menuToggle = document.getElementById("navbarNav");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (menuToggle.classList.contains("show")) {
        const bsCollapse = new bootstrap.Collapse(menuToggle);
        bsCollapse.hide();
      }
    });
  });

  // 2. Typing Effect Logic
  const typingTextElement = document.getElementById("typing-text");
  const wordsToType = [
    "Fresher Developer.",
    "Problem Solver.",
    "Fast Learner.",
    "Code Enthusiast.",
  ];
  let wordIndex = 0;
  let charIndex = 0;
  let isDeleting = false;
  let typingDelay = 150;

  function typeEffect() {
    const currentWord = wordsToType[wordIndex];

    if (isDeleting) {
      typingTextElement.textContent = currentWord.substring(0, charIndex - 1);
      charIndex--;
      typingDelay = 50; // Faster when deleting
    } else {
      typingTextElement.textContent = currentWord.substring(0, charIndex + 1);
      charIndex++;
      typingDelay = 150;
    }

    if (!isDeleting && charIndex === currentWord.length) {
      isDeleting = true;
      typingDelay = 1500; // Pause at end of word
    } else if (isDeleting && charIndex === 0) {
      isDeleting = false;
      wordIndex = (wordIndex + 1) % wordsToType.length;
      typingDelay = 500; // Pause before next word
    }

    setTimeout(typeEffect, typingDelay);
  }

  // Start typing effect
  setTimeout(typeEffect, 1000);

  // 3. Scroll Reveal Animation Logic
  const revealElements = document.querySelectorAll(".reveal");

  const revealOptions = {
    threshold: 0.15,
    rootMargin: "0px 0px -50px 0px",
  };

  const revealOnScroll = new IntersectionObserver(function (entries, observer) {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) {
        return;
      } else {
        entry.target.classList.add("active");
        // Optional: Stop observing once revealed
        // observer.unobserve(entry.target);
      }
    });
  }, revealOptions);

  revealElements.forEach((el) => {
    revealOnScroll.observe(el);
  });

  // 4. Contact Form Handling
  const contactForm = document.getElementById("contactForm");
  const successToast = document.getElementById("successToast");
  const toast = new bootstrap.Toast(successToast);

  contactForm.addEventListener("submit", async (e) => {
    e.preventDefault();

    const submitBtn = contactForm.querySelector('button[type="submit"]');
    const originalText = submitBtn.innerHTML;

    submitBtn.innerHTML =
      '<i class="fa-solid fa-spinner fa-spin"></i> Sending...';

    submitBtn.disabled = true;

    const formData = new FormData(contactForm);

    try {
      const response = await fetch(contactForm.action, {
        method: "POST",
        body: formData,
      });

      const result = await response.json();

      if (result.success) {
        contactForm.reset();
        toast.show();
      } else {
        alert("Message could not be sent. Please try again.");
      }
    } catch (error) {
      alert("Something went wrong. Please try again.");
    }

    submitBtn.innerHTML = originalText;
    submitBtn.disabled = false;
  });
});

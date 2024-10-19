// script.js

// המתנה לטעינת ה-DOM לפני הרצת הסקריפטים
document.addEventListener('DOMContentLoaded', () => {
  // פונקציונליות של המסך הטעינה (Preloader)
  const preloader = document.getElementById('preloader');
  window.addEventListener('load', () => {
    preloader.classList.add('fade-out');
    setTimeout(() => {
      preloader.style.display = 'none';
    }, 1000);
  });

  // אפקט גלילה ל-header
  const header = document.querySelector('header');
  window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
  });

  // Typed.js לאפקט הקלדה בקטע ה-Hero
  new Typed('.typed-text', {
    strings: [
      'Frontend Developer',
      'JavaScript Enthusiast',
      'C# Developer',
      'HTML & CSS Expert',
      'Problem Solver',
      'Responsive Design Implementer',
      'Git & Version Control User',
      'RESTful API Integrator',
      'Basic Node.js Developer',
      'Team Collaborator',
      'Self-Learner',
      'AI-Generated Music Creator',
    ],
    typeSpeed: 40,
    backSpeed: 20,
    loop: true,
  });

  // Particles.js לרקע אינטראקטיבי בקטע ה-Hero
  particlesJS('hero-canvas', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 800 } },
      color: { value: '#ffffff' },
      shape: {
        type: 'circle',
        stroke: { width: 0, color: '#000000' },
        polygon: { nb_sides: 5 },
      },
      opacity: {
        value: 0.5,
        random: false,
        anim: { enable: false, speed: 1, opacity_min: 0.1, sync: false },
      },
      size: {
        value: 3,
        random: true,
        anim: { enable: false, speed: 40, size_min: 0.1, sync: false },
      },
      line_linked: {
        enable: true,
        distance: 150,
        color: '#ffffff',
        opacity: 0.4,
        width: 1,
      },
      move: {
        enable: true,
        speed: 6,
        direction: 'none',
        random: false,
        straight: false,
        out_mode: 'out',
        bounce: false,
        attract: { enable: false, rotateX: 600, rotateY: 1200 },
      },
    },
    interactivity: {
      detect_on: 'canvas',
      events: {
        onhover: { enable: true, mode: 'grab' },
        onclick: { enable: true, mode: 'push' },
        resize: true,
      },
      modes: {
        grab: { distance: 140, line_linked: { opacity: 1 } },
        bubble: {
          distance: 400,
          size: 40,
          duration: 2,
          opacity: 8,
          speed: 3,
        },
        repulse: { distance: 200, duration: 0.4 },
        push: { particles_nb: 4 },
        remove: { particles_nb: 2 },
      },
    },
    retina_detect: true,
  });

  // GSAP אנימציות עם ScrollTrigger
  gsap.registerPlugin(ScrollTrigger);

  // אנימציה לכותרות הסקשנים
  gsap.utils.toArray('.section-title').forEach((title) => {
    gsap.from(title, {
      scrollTrigger: {
        trigger: title,
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });
  });

  // אנימציה לאלמנטים עם המחלקה 'fade-in'
  gsap.utils.toArray('.fade-in').forEach((element) => {
    gsap.from(element, {
      scrollTrigger: {
        trigger: element,
        start: 'top 80%',
      },
      y: 50,
      opacity: 0,
      duration: 1,
      ease: 'power2.out',
    });
  });

  // פונקציונליות סינון הכישורים (Skills) בקטע 'About Me'
  const skillsFilters = document.querySelectorAll('.skills-filter');
  const skillItems = document.querySelectorAll('.skill-item');

  skillsFilters.forEach((filter) => {
    filter.addEventListener('click', () => {
      // הסרת המחלקה 'active' מהפילטר הקודם והוספתה לפילטר הנוכחי
      document.querySelector('.skills-filter.active').classList.remove('active');
      filter.classList.add('active');
      const category = filter.getAttribute('data-category');

      // סינון הכישורים על פי הקטגוריה
      skillItems.forEach((item) => {
        // הפסקת אנימציות קודמות על האלמנט
        gsap.killTweensOf(item);

        if (
          category === 'all' ||
          item.getAttribute('data-category') === category
        ) {
          item.style.display = 'flex'; // שינוי ל-'flex' כדי לשמור על הפריסה
          gsap.fromTo(
            item,
            { opacity: 0, scale: 0.8 },
            {
              opacity: 1,
              scale: 1,
              duration: 0.5,
              ease: 'power2.out',
              onComplete: () => {
                gsap.set(item, { clearProps: 'transform' });
              }
            }
          );
        } else {
          gsap.to(item, {
            opacity: 0,
            scale: 0.8,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
              item.style.display = 'none';
              gsap.set(item, { clearProps: 'transform' });
            },
          });          
        }
      });
    });
  });

  // פילטרים של הפרויקטים (Portfolio)
  const filterButtons = document.querySelectorAll('.filter-btn');
  const portfolioItems = document.querySelectorAll('.portfolio-item');

  filterButtons.forEach((btn) => {
    btn.addEventListener('click', () => {
      document.querySelector('.filter-btn.active').classList.remove('active');
      btn.classList.add('active');
      const filterValue = btn.getAttribute('data-filter');

      // סינון הפרויקטים על פי הקטגוריה
      portfolioItems.forEach((item) => {
        // הפסקת אנימציות קודמות על האלמנט
        gsap.killTweensOf(item);

        if (
          filterValue === 'all' ||
          item.getAttribute('data-category') === filterValue
        ) {
          item.style.display = 'block';
          gsap.fromTo(
            item,
            { opacity: 0, y: 50 },
            {
              opacity: 1,
              y: 0,
              duration: 0.5,
              ease: 'power2.out',
              delay: 0.1,
            }
          );
        } else {
          gsap.to(item, {
            opacity: 0,
            y: 50,
            duration: 0.5,
            ease: 'power2.in',
            onComplete: () => {
              item.style.display = 'none';
            },
          });
        }
      });
    });
  });

  // פונקציונליות של המודלים (Modals) עבור קורות החיים
  const modals = document.querySelectorAll('.modal');
  const modalCloses = document.querySelectorAll('.close');
  const body = document.body;

  // פתיחת המודל של קורות החיים
  const openResumeButton = document.getElementById('openResumeButton');
  const resumeModal = document.getElementById('resumeModal');

  openResumeButton.addEventListener('click', () => {
    resumeModal.style.display = 'block';
    body.style.overflow = 'hidden';
  });

  // סגירת המודל של קורות החיים
  modalCloses.forEach((close) => {
    close.addEventListener('click', () => {
      close.parentElement.parentElement.style.display = 'none';
      body.style.overflow = 'auto';
    });
  });

  // סגירת המודלים בעת לחיצה מחוץ לתוכן המודל
  window.addEventListener('click', (e) => {
    modals.forEach((modal) => {
      if (e.target === modal) {
        modal.style.display = 'none';
        body.style.overflow = 'auto';
      }
    });
  });

  // סגירת התפריט במובייל לאחר לחיצה על קישור
  const navLinks = document.querySelectorAll('.nav-menu a');
  navLinks.forEach((link) => {
    link.addEventListener('click', () => {
      const menuToggle = document.getElementById('menu-toggle');
      if (menuToggle.checked) {
        menuToggle.checked = false;
      }
    });
  });

  // אפקט ריחוף לכפתורים
  document.querySelectorAll('.btn').forEach((button) => {
    button.addEventListener('mouseenter', () => {
      gsap.to(button, {
        scale: 1.05,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
    button.addEventListener('mouseleave', () => {
      gsap.to(button, {
        scale: 1,
        duration: 0.3,
        ease: 'power2.out',
      });
    });
  });

  // אפקט פרלקס לתוכן ה-Hero לפי תנועת העכבר
  const heroContent = document.querySelector('.hero-content');
  document.addEventListener('mousemove', (e) => {
    const x = (window.innerWidth / 2 - e.pageX) / 50;
    const y = (window.innerHeight / 2 - e.pageY) / 50;

    heroContent.style.transform = `translate(${x}px, ${y}px)`;
  });

  // Particles.js לאפקט על תמונת הפרופיל
  particlesJS('particles-js', {
    particles: {
      number: { value: 80, density: { enable: true, value_area: 500 } },
      color: { value: ['#bc13fe', '#4713fe', '#1355fe'] },
      shape: { type: 'circle' },
      opacity: { value: 0.5, random: true },
      size: { value: 5, random: true },
      move: {
        enable: true,
        speed: 1,
        direction: 'none',
        random: true,
        out_mode: 'out',
      },
    },
    interactivity: {
      detect_on: 'canvas',
      events: { onhover: { enable: false }, onclick: { enable: false } },
    },
    retina_detect: true,
  });

  // אנימציה עם GSAP בעת ריחוף על התמונה
  const aboutImage = document.querySelector('.about-image img');

  gsap.fromTo(
    aboutImage,
    { opacity: 0, y: -50 },
    { opacity: 1, y: 0, duration: 1 }
  );

  aboutImage.addEventListener('mouseenter', () => {
    gsap.to(aboutImage, {
      scale: 1.2,
      rotation: 10,
      duration: 0.5,
      ease: 'power2.out',
    });
  });

  aboutImage.addEventListener('mouseleave', () => {
    gsap.to(aboutImage, {
      scale: 1,
      rotation: 0,
      duration: 0.5,
      ease: 'power2.out',
    });
  });

  // פונקציה לזיהוי מכשירי מגע
  function isTouchDevice() {
    return (
      'ontouchstart' in window ||
      navigator.maxTouchPoints > 0 ||
      navigator.msMaxTouchPoints > 0
    );
  }

  // הסרת המצביע המותאם אישית במכשירי מגע
  if (!isTouchDevice()) {
    document.body.classList.add('no-cursor');

    // מימוש מצביע מותאם אישית
    const cursor = document.createElement('div');
    cursor.classList.add('cursor');
    document.body.appendChild(cursor);

    const trailLength = 10; // מספר הנקודות בזנב
    const cursors = [];

    for (let i = 0; i < trailLength; i++) {
      const trailDot = document.createElement('div');
      trailDot.classList.add('cursor-trail');
      document.body.appendChild(trailDot);
      cursors.push(trailDot);
    }

    let mouseX = 0;
    let mouseY = 0;
    let isMouseDown = false;

    const positions = [];

    for (let i = 0; i < trailLength; i++) {
      positions.push({ x: 0, y: 0 });
    }

    document.addEventListener('mousemove', (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;
    });

    function animate() {
      positions[0].x += (mouseX - positions[0].x) * 0.2;
      positions[0].y += (mouseY - positions[0].y) * 0.2;

      for (let i = 1; i < trailLength; i++) {
        positions[i].x += (positions[i - 1].x - positions[i].x) * 0.2;
        positions[i].y += (positions[i - 1].y - positions[i].y) * 0.2;
      }

      for (let i = 0; i < trailLength; i++) {
        cursors[i].style.transform = `translate(${positions[i].x}px, ${positions[i].y}px)`;
        cursors[i].style.opacity = (trailLength - i) / trailLength;
      }

      cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;

      requestAnimationFrame(animate);
    }

    animate();

    // פונקציה לעדכון נראות הזנב
    function updateCursorTrailVisibility() {
      if (cursor.classList.contains('cursor-active') || isMouseDown) {
        // הסתרת הזנב
        cursors.forEach((trailDot) => {
          trailDot.style.display = 'none';
        });
      } else {
        // הצגת הזנב
        cursors.forEach((trailDot) => {
          trailDot.style.display = 'block';
        });
      }
    }

    // זיהוי אלמנטים לחיצים
    const clickableElements = document.querySelectorAll(
      'a, button, .btn, input, textarea, select, .clickable'
    );

    clickableElements.forEach((el) => {
      el.addEventListener('mouseenter', () => {
        cursor.classList.add('cursor-active');
        updateCursorTrailVisibility();
      });

      el.addEventListener('mouseleave', () => {
        cursor.classList.remove('cursor-active');
        updateCursorTrailVisibility();
      });
    });

    // אירועים ללחיצה ושחרור לחיצה
    document.addEventListener('mousedown', () => {
      isMouseDown = true;
      cursor.classList.add('cursor-click');
      updateCursorTrailVisibility();
    });

    document.addEventListener('mouseup', () => {
      isMouseDown = false;
      cursor.classList.remove('cursor-click');
      updateCursorTrailVisibility();
    });

    // הסתרת המצביע המותאם אישית כאשר העכבר מעל ה-iframe של קורות החיים
    const resumeIframe = document.querySelector('#resumeModal iframe');

    if (resumeIframe) {
      resumeIframe.addEventListener('mouseenter', () => {
        // הסתרת המצביע והזנב
        cursor.style.display = 'none';
        cursors.forEach((trailDot) => {
          trailDot.style.display = 'none';
        });
      });

      resumeIframe.addEventListener('mouseleave', () => {
        // הצגת המצביע והזנב מחדש
        cursor.style.display = 'block';
        cursors.forEach((trailDot) => {
          trailDot.style.display = 'block';
        });
      });
    }
  }

  // תיקון להצגת ה-PDF במובייל
  // אם ה-iframe לא נתמך, להציג קישור להורדה
  const iframe = document.querySelector('#resumeModal iframe');
  const resumeModalContent = document.querySelector('#resumeModal .modal-content');

  if (iframe) {
    iframe.addEventListener('load', () => {
      // בדיקה אם ה-iframe נטען כראוי
      if (iframe.contentDocument && iframe.contentDocument.body.childElementCount === 0) {
        // אם ה-iframe ריק, להציג קישור להורדת ה-PDF
        const downloadLink = document.createElement('a');
        downloadLink.href = 'cv.pdf';
        downloadLink.textContent = 'Click here to download the resume';
        downloadLink.classList.add('btn', 'btn-primary');
        downloadLink.style.display = 'block';
        downloadLink.style.textAlign = 'center';
        resumeModalContent.innerHTML = ''; // ניקוי תוכן המודל
        resumeModalContent.appendChild(downloadLink);
      }
    });
  }
});

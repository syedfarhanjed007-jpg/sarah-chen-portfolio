// ============================================
// Sarah Chen Portfolio - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  // Navigation scroll effect
  const nav = document.querySelector('.nav');
  const handleScroll = () => {
    if (window.scrollY > 50) {
      nav.classList.add('scrolled');
    } else {
      nav.classList.remove('scrolled');
    }
  };
  window.addEventListener('scroll', handleScroll);

  // Mobile menu
  const hamburger = document.querySelector('.nav-hamburger');
  const mobileNav = document.querySelector('.nav-mobile');

  if (hamburger && mobileNav) {
    hamburger.addEventListener('click', () => {
      hamburger.classList.toggle('active');
      mobileNav.classList.toggle('open');
      document.body.style.overflow = mobileNav.classList.contains('open') ? 'hidden' : '';
    });

    mobileNav.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        mobileNav.classList.remove('open');
        document.body.style.overflow = '';
      });
    });
  }

  // Scroll reveal animations
  const revealElements = document.querySelectorAll('.reveal');
  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

  revealElements.forEach(el => revealObserver.observe(el));

  // Work page filters
  const filterBtns = document.querySelectorAll('.filter-btn');
  const projectCards = document.querySelectorAll('.project-card');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      projectCards.forEach(card => {
        if (filter === 'all' || card.dataset.category === filter) {
          card.style.display = '';
          card.style.opacity = '0';
          card.style.transform = 'translateY(20px)';
          setTimeout(() => {
            card.style.opacity = '1';
            card.style.transform = 'translateY(0)';
          }, 50);
        } else {
          card.style.display = 'none';
        }
      });
    });
  });

  // Project modal
  const modal = document.querySelector('.modal-overlay');
  const modalClose = document.querySelector('.modal-close');

  if (modal && modalClose) {
    const projectData = {
      'bloom': {
        title: 'Bloom Botanicals',
        category: 'Brand Identity',
        role: 'Lead Designer',
        year: '2024',
        duration: '8 weeks',
        description: 'A complete brand identity for a premium plant care startup. Created a visual language that bridges botanical illustration with modern minimalism, resulting in a cohesive brand experience across digital and physical touchpoints.'
      },
      'meridian': {
        title: 'Meridian Studio',
        category: 'Web Design',
        role: 'Creative Director',
        year: '2024',
        duration: '12 weeks',
        description: 'Designed and directed a portfolio website for an architecture firm. The design emphasizes spatial awareness and clean typography to showcase their work with the same precision they bring to their buildings.'
      },
      'kinetic': {
        title: 'Kinetic Festival',
        category: 'Motion Design',
        role: 'Motion Designer',
        year: '2023',
        duration: '6 weeks',
        description: 'Created the motion identity for an annual arts festival. Developed a dynamic visual system that transforms and adapts across screens, print, and environmental graphics while maintaining brand recognition.'
      },
      'terra': {
        title: 'Terra Ceramics',
        category: 'Brand Identity',
        role: 'Brand Designer',
        year: '2023',
        duration: '10 weeks',
        description: 'Developed the brand identity for an artisan ceramics studio. The visual system draws inspiration from the organic forms and earthy textures of handcrafted pottery, translated into a refined digital presence.'
      },
      'aurora': {
        title: 'Aurora Wellness',
        category: 'Web Design',
        role: 'UI/UX Designer',
        year: '2023',
        duration: '8 weeks',
        description: 'Designed a wellness app interface that promotes calm and mindfulness. Soft gradients, intentional whitespace, and thoughtful interactions create a digital sanctuary for users seeking balance.'
      },
      'flux': {
        title: 'Flux Collective',
        category: 'Motion Design',
        role: 'Creative Director',
        year: '2022',
        duration: '4 weeks',
        description: 'Directed a series of animated social media campaigns for a creative collective. Each piece balances artistic expression with strategic messaging, building community engagement through visual storytelling.'
      }
    };

    projectCards.forEach(card => {
      card.addEventListener('click', () => {
        const projectId = card.dataset.project;
        const data = projectData[projectId];
        if (data) {
          modal.querySelector('.modal-category').textContent = data.category;
          modal.querySelector('.modal-title').textContent = data.title;
          modal.querySelector('.modal-role').textContent = data.role;
          modal.querySelector('.modal-year').textContent = data.year;
          modal.querySelector('.modal-duration').textContent = data.duration;
          modal.querySelector('.modal-desc').innerHTML = `<p>${data.description}</p>`;
          modal.classList.add('open');
          document.body.style.overflow = 'hidden';
        }
      });
    });

    modalClose.addEventListener('click', () => {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    });

    modal.addEventListener('click', (e) => {
      if (e.target === modal) {
        modal.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // FAQ accordion
  const faqItems = document.querySelectorAll('.faq-item');
  faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    const answer = item.querySelector('.faq-answer');

    question.addEventListener('click', () => {
      const isOpen = item.classList.contains('open');
      faqItems.forEach(i => {
        i.classList.remove('open');
        i.querySelector('.faq-answer').style.maxHeight = '0';
      });

      if (!isOpen) {
        item.classList.add('open');
        answer.style.maxHeight = answer.scrollHeight + 'px';
      }
    });
  });

  // Contact form
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const btn = contactForm.querySelector('.btn');
      const originalText = btn.innerHTML;
      btn.innerHTML = '✓ Message Sent!';
      btn.style.background = '#4CAF50';
      setTimeout(() => {
        btn.innerHTML = originalText;
        btn.style.background = '';
        contactForm.reset();
      }, 3000);
    });
  }

  // Smooth page transitions
  document.querySelectorAll('a[href]').forEach(link => {
    const href = link.getAttribute('href');
    if (href && href.endsWith('.html') && !href.startsWith('http')) {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        document.body.style.opacity = '0';
        document.body.style.transition = 'opacity 0.3s ease';
        setTimeout(() => {
          window.location.href = href;
        }, 300);
      });
    }
  });

  // Fade in on page load
  document.body.style.opacity = '0';
  document.body.style.transition = 'opacity 0.4s ease';
  requestAnimationFrame(() => {
    document.body.style.opacity = '1';
  });

  // Keyboard navigation for modal
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal && modal.classList.contains('open')) {
      modal.classList.remove('open');
      document.body.style.overflow = '';
    }
  });
});

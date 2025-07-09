// Animasi scroll ke section saat klik navbar
const navLinks = document.querySelectorAll('.nav-link[href^="#"]');
navLinks.forEach(link => {
  link.addEventListener('click', function(e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      target.scrollIntoView({ behavior: 'smooth' });
    }
  });
});

// Efek animasi pada search bar saat fokus
const searchInput = document.getElementById('search');
if (searchInput) {
  searchInput.addEventListener('focus', () => {
    searchInput.classList.add('shadow-lg');
  });
  searchInput.addEventListener('blur', () => {
    searchInput.classList.remove('shadow-lg');
  });
}

// Interaksi search (contoh: alert, bisa diubah ke pencarian nyata)
const searchForm = document.getElementById('main-search-form');
if (searchForm) {
  searchForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const value = searchInput.value.trim();
    if (value) {
      alert('Searching for: ' + value);
      // Implementasi pencarian nyata bisa ditambahkan di sini
    }
  });
}

// Tombol Start Searching Tools AI sudah otomatis redirect via <a href>, tidak perlu JS tambahan 

// Typewriter effect for Home title
window.addEventListener('DOMContentLoaded', () => {
  const typeTarget = document.getElementById('typewriter');
  if (typeTarget) {
    const text = 'Welcome to AIBRARY';
    let i = 0;
    function type() {
      if (i <= text.length) {
        typeTarget.innerHTML =
          '<span class="text-primary">' + text.slice(0, 11) + '</span>' + text.slice(11, i);
        i++;
        setTimeout(type, 80);
      }
    }
    type();
  }
}); 
'use strict';



// element toggle function
const elementToggleFunc = function (elem) { elem.classList.toggle("active"); }



// sidebar variables
const sidebar = document.querySelector("[data-sidebar]");
const sidebarBtn = document.querySelector("[data-sidebar-btn]");

// sidebar toggle functionality for mobile
sidebarBtn.addEventListener("click", function () {
  elementToggleFunc(sidebar);
  
  // Toggle the button text
  const btnText = this.querySelector("span");
  if (sidebar.classList.contains("active")) {
    btnText.textContent = "Hide Contacts";
  } else {
    btnText.textContent = "Show Contacts";
  }
});



// testimonials variables
const testimonialsItem = document.querySelectorAll("[data-testimonials-item]");
const modalContainer = document.querySelector("[data-modal-container]");
const modalCloseBtn = document.querySelector("[data-modal-close-btn]");
const overlay = document.querySelector("[data-overlay]");

// modal variables
const modalTitle = document.querySelector("[data-modal-title]");
const modalText = document.querySelector("[data-modal-text]");
const modalPreviewWrapper = document.querySelector("[data-modal-preview-wrapper]");
const modalImgContainer = document.querySelector("[data-modal-img-container]");
const modalExternalLink = document.querySelector("[data-modal-external-link]");
const modalExternalWrapper = document.querySelector("[data-modal-external-wrapper]");

// modal toggle function
const testimonialsModalFunc = function () {
  modalContainer.classList.toggle("active");
  overlay.classList.toggle("active");
  if (!modalContainer.classList.contains("active")) {
    modalImgContainer.innerHTML = "";
  }
}

// Function to populate and open modal
const openModal = function (item) {
  modalTitle.innerHTML = item.querySelector("[data-testimonials-title]").innerHTML;
  modalText.innerHTML = item.querySelector("[data-testimonials-text]").innerHTML;
  
  modalImgContainer.innerHTML = ""; // clear previous
  
  // handle external link array
  const externalLinkStr = item.dataset.externalLink || "";
  const externalLinks = externalLinkStr ? externalLinkStr.split(",") : [];
  
  // Set the "Verify Certificate" fallback text to the first link
  if (externalLinks.length > 0) {
    modalExternalLink.href = externalLinks[0];
    modalExternalWrapper.style.display = "block";
  } else {
    modalExternalLink.href = "#";
    modalExternalWrapper.style.display = "none";
  }

  // handle image preview
  const previewImgStr = item.dataset.previewImg;
  if (previewImgStr) {
    const images = previewImgStr.split(",");
    
    // adjust grid columns dynamically based on how many images there are
    if (images.length === 1) {
      modalImgContainer.style.gridTemplateColumns = "1fr";
    } else {
      // Create a nice side-by-side layout if multiple
      modalImgContainer.style.gridTemplateColumns = "repeat(auto-fit, minmax(200px, 1fr))";
    }
    
    images.forEach((src, index) => {
      const a = document.createElement("a");
      // Use corresponding link, or default to first if missing
      a.href = externalLinks[index] || externalLinks[0] || "#"; 
      if (a.href !== "#") a.target = "_blank";
      a.style.display = "block";
      
      const img = document.createElement("img");
      img.src = src.trim();
      img.alt = "Certificate Preview";
      img.style.width = "100%";
      img.style.height = "auto";
      img.style.display = "block";
      img.style.borderRadius = "8px";
      img.style.border = "1px solid var(--jet)";
      img.style.backgroundColor = "#fff";
      
      a.appendChild(img);
      modalImgContainer.appendChild(a);
    });
    
    modalPreviewWrapper.style.display = "block";
  } else {
    modalPreviewWrapper.style.display = "none";
  }

  modalContainer.classList.add("active");
  overlay.classList.add("active");
}

// add click event to all modal items
for (let i = 0; i < testimonialsItem.length; i++) {
  testimonialsItem[i].addEventListener("click", function () {
    openModal(this);
  });
}

// add click event to modal close button
modalCloseBtn.addEventListener("click", testimonialsModalFunc);
overlay.addEventListener("click", testimonialsModalFunc);



// custom select variables
const select = document.querySelector("[data-select]");
const selectItems = document.querySelectorAll("[data-select-item]");
const selectValue = document.querySelector("[data-selecct-value]");
const filterBtn = document.querySelectorAll("[data-filter-btn]");

select.addEventListener("click", function () { elementToggleFunc(this); });

// add event in all select items
for (let i = 0; i < selectItems.length; i++) {
  selectItems[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    elementToggleFunc(select);
    filterFunc(selectedValue);

  });
}

// filter variables
const filterItems = document.querySelectorAll("[data-filter-item]");

const filterFunc = function (selectedValue) {
  for (let i = 0; i < filterItems.length; i++) {
    if (selectedValue === "all") {
      filterItems[i].classList.add("active");
    } else {
      // Split categories by comma and trim whitespace
      const categories = filterItems[i].dataset.category.toLowerCase().split(',').map(cat => cat.trim());
      if (categories.includes(selectedValue.toLowerCase())) {
        filterItems[i].classList.add("active");
      } else {
        filterItems[i].classList.remove("active");
      }
    }
  }
}


// add event in all filter button items for large screen
let lastClickedBtn = filterBtn[0];

for (let i = 0; i < filterBtn.length; i++) {

  filterBtn[i].addEventListener("click", function () {

    let selectedValue = this.innerText.toLowerCase();
    selectValue.innerText = this.innerText;
    filterFunc(selectedValue);

    lastClickedBtn.classList.remove("active");
    this.classList.add("active");
    lastClickedBtn = this;

  });

}



// contact form variables
const form = document.querySelector("[data-form]");
const formInputs = document.querySelectorAll("[data-form-input]");
const formBtn = document.querySelector("[data-form-btn]");

// add event to all form input field
for (let i = 0; i < formInputs.length; i++) {
  formInputs[i].addEventListener("input", function () {
    // check form validation
    if (form.checkValidity()) {
      formBtn.removeAttribute("disabled");
    } else {
      formBtn.setAttribute("disabled", "");
    }
  });
}



// page navigation variables
const navigationLinks = document.querySelectorAll("[data-nav-link]");
const pages = document.querySelectorAll("[data-page]");

// add event to all nav link
for (let i = 0; i < navigationLinks.length; i++) {
  navigationLinks[i].addEventListener("click", function () {

    for (let i = 0; i < pages.length; i++) {
      if (this.innerHTML.toLowerCase() === pages[i].dataset.page) {
        pages[i].classList.add("active");
        navigationLinks[i].classList.add("active");
        window.scrollTo(0, 0);
      } else {
        pages[i].classList.remove("active");
        navigationLinks[i].classList.remove("active");
      }
    }

  });
}


// Bouncy Cursor with Inertial Trail
(function() {
  if (window.innerWidth > 1250) {
    document.body.style.cursor = 'none';

    const dot = document.createElement('div');
    dot.className = 'bouncy-cursor-dot';
    document.body.appendChild(dot);

    const trail = document.createElement('div');
    trail.className = 'bouncy-cursor-trail';
    document.body.appendChild(trail);

    const map = document.querySelector('.mapbox');
    if (map) {
      map.addEventListener('mouseenter', () => {
        dot.style.display = 'none';
        trail.style.display = 'none';
        document.body.style.cursor = '';
      });
      map.addEventListener('mouseleave', () => {
        dot.style.display = '';
        trail.style.display = '';
        document.body.style.cursor = 'none';
      });
    }

    let mouseX = window.innerWidth / 2, mouseY = window.innerHeight / 2;
    let dotX = mouseX, dotY = mouseY;
    let trailX = mouseX, trailY = mouseY;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      dot.style.opacity = '1';
      trail.style.opacity = '1';
    });

    function animate() {
      dotX += (mouseX - dotX) * 0.155;
      dotY += (mouseY - dotY) * 0.155;
      dot.style.left = dotX + 'px';
      dot.style.top = dotY + 'px';

      trailX += (dotX - trailX) * 0.115;
      trailY += (dotY - trailY) * 0.115;
      trail.style.left = trailX + 'px';
      trail.style.top = trailY + 'px';

      requestAnimationFrame(animate);
    }
    animate();

    document.body.style.cursor = 'none';

    document.addEventListener('mouseleave', () => {
      dot.style.opacity = '0';
      trail.style.opacity = '0';
    });
    document.addEventListener('mouseenter', () => {
      dot.style.opacity = '1';
      trail.style.opacity = '1';
    });
  } else {
    document.body.style.cursor = '';
  }
})();




document.addEventListener('DOMContentLoaded', () => {
  const track = document.querySelector('[data-marquee]');
  if (!track) return;

  const originalItems = Array.from(track.children);
  const clones = [];

  // Duplicate items multiple times for infinite scroll on wide screens
  for (let i = 0; i < 3; i++) {
    originalItems.forEach(item => {
      const clone = item.cloneNode(true);
      // re-attach event listeners to clones for the modal
      const cloneCard = clone.querySelector("[data-testimonials-item]");
      if (cloneCard) {
        cloneCard.addEventListener("click", function () {
          if (typeof openModal === 'function') {
            openModal(this);
          }
        });
      }
      track.appendChild(clone);
      if (i === 0) clones.push(clone); // Only need the first set of clones to calculate offset
    });
  }

  let scrollPos = 0;
  let isHovered = false;

  track.addEventListener('mouseenter', () => isHovered = true);
  track.addEventListener('mouseleave', () => isHovered = false);
  
  // also pause on touch
  track.addEventListener('touchstart', () => isHovered = true);
  track.addEventListener('touchend', () => isHovered = false);

  function animate() {
    if (!isHovered) {
      scrollPos += 1; // Speed of the marquee
      
      // Calculate exact distance to the first clone
      const firstCloneOffset = clones[0].offsetLeft - originalItems[0].offsetLeft;
      
      if (firstCloneOffset > 0 && scrollPos >= firstCloneOffset) {
        scrollPos = scrollPos % firstCloneOffset;
      }
      track.scrollLeft = scrollPos;
    } else {
      // Sync scrollPos with current scrollLeft when user interacts
      scrollPos = track.scrollLeft;
    }
    requestAnimationFrame(animate);
  }

  requestAnimationFrame(animate);
});
// Sliding Indicator Logic for Navbar and Filter List
function initSlidingIndicator(listSelector, itemSelector) {
  const list = document.querySelector(listSelector);
  if (!list) return;

  // Add the indicator element if not present
  let indicator = list.querySelector('.sliding-indicator');
  if (!indicator) {
    indicator = document.createElement('div');
    indicator.className = 'sliding-indicator';
    list.appendChild(indicator);
  }

  function updateIndicator(targetItem) {
    if (!targetItem) return;
    indicator.style.width = `${targetItem.offsetWidth}px`;
    indicator.style.height = `${targetItem.offsetHeight}px`;
    indicator.style.left = `${targetItem.offsetLeft}px`;
    indicator.style.top = `${targetItem.offsetTop}px`;
  }

  // Update on initialization
  const activeItem = list.querySelector(itemSelector + '.active');
  if (activeItem) {
    // Wait a tick for styles to settle
    setTimeout(() => updateIndicator(activeItem), 50);
  }

  // Attach click listeners to update the indicator
  const items = list.querySelectorAll(itemSelector);
  items.forEach(item => {
    item.addEventListener('click', function() {
      // Set a short timeout so .active class is applied first by other listeners
      setTimeout(() => updateIndicator(this), 10);
    });
  });

  // Re-adjust on window resize
  window.addEventListener('resize', () => {
    const currentActive = list.querySelector(itemSelector + '.active');
    updateIndicator(currentActive);
  });
}

document.addEventListener('DOMContentLoaded', () => {
  initSlidingIndicator('.navbar-list', '.navbar-link');
  initSlidingIndicator('.filter-list', '.filter-item button');
});

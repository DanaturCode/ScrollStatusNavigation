const windowHeight = window.innerHeight;
const sections = Array.from(document.querySelectorAll('[data-section]'));
const mobileNavButton = document.querySelector('[data-mobile-button]');

let lastKnownScrollPosition = 0;
let ticking = false;

const sectionScrolling = scrollPos => {
  sections.forEach(entry => {
    const statusbars = document.querySelectorAll(
      `[data-scroll-status='${entry.dataset.section}']`
    );

    let vissibleSectionTop =
      window.innerHeight - (Math.floor(entry.offsetTop) - scrollPos);
    let fullSectionHeight = entry.offsetHeight;

    let sectionVisiibility = Math.floor(
      (vissibleSectionTop / fullSectionHeight) * 100
    );

    statusbars.forEach(statusbar => {
      if (sectionVisiibility >= 100) {
        statusbar.style.width = '100%';
      } else if (sectionVisiibility >= 0 && sectionVisiibility <= 100) {
        statusbar.style.width = `${sectionVisiibility}%`;
      } else if (sectionVisiibility < 0) {
        statusbar.style.width = '0';
      }
    });
  });
};

const scrollListener = () => {
  lastKnownScrollPosition = document.body.offsetTop + window.scrollY;

  if (!ticking) {
    window.requestAnimationFrame(() => {
      sectionScrolling(lastKnownScrollPosition);
      ticking = false;
    });

    ticking = true;
  }
};

const showMobileNavigation = () => {
  const pageBody = document.body;
  const modal = document.getElementById('modal');

  const pageLinks = [
    {
      aHref: '#first-section',
      linkText: 'First Section',
      linkStatusBarData: 'first-section',
    },
    {
      aHref: '#second-section',
      linkText: 'Second Section',
      linkStatusBarData: 'second-section',
    },
    {
      aHref: '#third-section',
      linkText: 'Third Section',
      linkStatusBarData: 'third-section',
    },
  ];

  if (modal === null) {
    const modal = document.createElement('div');
    modal.id = 'modal';
    const modalContent = document.createElement('div');
    modalContent.id = 'modal-content';
    modalContent.className = 'mobile-navigation';
    modalContent.dataset.navigation = 'mobile';
    const nav = document.createElement('nav');

    pageLinks.forEach(pageLink => {
      const a = document.createElement('a');
      a.href = pageLink.aHref;
      const link = document.createTextNode(pageLink.linkText);
      const linkScrollStatusBar = document.createElement('div');
      linkScrollStatusBar.className = 'scroll-status-bar';
      linkScrollStatusBar.dataset.scrollStatus = pageLink.linkStatusBarData;
      const linkBar = document.createElement('div');
      linkBar.className = 'bar';
      linkBar.dataset.bar = pageLink.linkStatusBarData;

      nav.appendChild(a);
      a.appendChild(link);
      a.appendChild(linkScrollStatusBar);
      linkScrollStatusBar.appendChild(linkBar);
    });

    pageBody.appendChild(modal);
    modal.appendChild(modalContent);
    modalContent.appendChild(nav);

    modal.addEventListener('click', removeMobileNavigation);
    window.onresize = removeMobileNavigation;
  }
};

const removeMobileNavigation = () => {
  const modal = document.getElementById('modal');
  const modalContent = document.querySelector('[data-navigation]');
  
  if (modal != null) {
    modal.classList.add('fade-out');
    modalContent.classList.add('slide-out');
    modalContent.onanimationend = () => {
      console.log('text')
      modal.remove();
    };
  }
};

const targetNode = document.querySelector('body');
const config = { childList: true };

const callback = mutationList => {
  for (const mutation of mutationList) {
    if (mutation.type === 'childList') {
      scrollListener();
    }
  }
};

const observer = new MutationObserver(callback);
observer.observe(targetNode, config);

mobileNavButton.addEventListener('click', showMobileNavigation);

document.addEventListener('DOMContentLoaded', scrollListener);
document.addEventListener('scroll', scrollListener);

window.onresize = scrollListener;

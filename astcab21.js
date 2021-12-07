var body = document.body,
      sbrBtn = document.querySelector('.hamburger-menu-container'),
      sbr = document.querySelector('.sidebar-container'),
      sbrIsOpn = sbr.matches('.sidebar-visible');

// Sidebar Toggle
function sbrOpen(){  
    sbr.classList.replace('sidebar-invisible', 'sidebar-visible');
    body.classList.add('sidebar-visible');
}
sbrBtn.addEventListener('click', sbrOpen, false );

function sbrClose() {
      sbr.classList.replace('sidebar-visible', 'sidebar-invisible');
      body.classList.remove('sidebar-visible');   
  }
if(!sbrIsOpn){ 
sbrBtn.addEventListener('click', sbrOpen, false );
} else { 
var sbrNav = document.querySelector('.navigation>.touch-icon');
sbrNav.addEventListener('click', sbrClose, false );
}

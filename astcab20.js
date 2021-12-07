var body = document.body,
      sbrBtn = document.querySelector('.hamburger-menu-container'),
      sbr = document.querySelector('.sidebar-container'),
      sbrIsOpn = sbr.matches('.sidebar-visible');

// Sidebar Toggle
function sbrOpen(){  
    sbr.classList.remove('sidebar-invisible');
    sbr.classList.add('sidebar-visible');
    body.classList.add('sidebar-visible');          
}
sbrBtn.addEventListener('click', sbrOpen, false );

function sbrClose() {
      sbr.classList.remove('sidebar-visible');
      body.classList.remove('sidebar-visible');
      sbr.classList.add('sidebar-invisible');
  }
if(!sbrIsOpn){ 
sbrBtn.addEventListener('click', sbrOpen, false );
} else { 
var sbrNav = document.querySelector('.navigation .touch-icon');
sbrNav.addEventListener('click', sbrClose, false );
}

var body = document.body,
      sbrBtn = document.querySelector(".hamburger-menu-container"),
      sbr = document.querySelector(".sidebar-container"),
      sbrIsOpn = sbr.matches(".sidebar-visible");

// Sidebar Toggle
function sbrOpen(){  
    sbr.classList.remove('sidebar-invisible');
    sbr.classList.add('sidebar-visible');
    body.classList.add('sidebar-visible');          
}
sbrBtn.addEventListener('click', sbrOpen, false );

if(sbrIsOpn){ 
var sbrOver = document.querySelector(".sidebar-visible + .bg-overlay"),
sbrNav = document.querySelector(".sidebar-visible .touch-icon");
function sbrClose() {
      sbr.classList.remove('sidebar-visible');
      body.classList.remove('sidebar-visible');
      sbr.classList.add('sidebar-invisible');
  }
sbrOver.addEventListener('click', sbrClose, false );
sbrNav.addEventListener('click', sbrClose, false );
}

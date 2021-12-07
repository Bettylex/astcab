var body = document.body,
      sbrBtn = document.querySelector(".hamburger-menu-container"),
      sbr = document.querySelector(".sidebar-container");

// Sidebar Toggle
if(sbr.classList.contains('sidebar-invisible') ) {
function sbrOpen(){  
    sbr.classList.remove('sidebar-invisible');
    sbr.classList.add('sidebar-visible');
    body.classList.add('sidebar-visible');          
}
}
sbrBtn.addEventListener('click', sbrOpen, false );

if(sbr.classList.contains('sidebar-visible')) {
function sbrClose(e) {
    if (e.target.matches('.bg-overlay') || e.target.matches('.touch-icon') ) {
      sbr.classList.remove('sidebar-visible');
      body.classList.remove('sidebar-visible');
      sbr.classList.add('sidebar-invisible');
    }
  }
 }
 body.addEventListener('click', sbrClose, false);

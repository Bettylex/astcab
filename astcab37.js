var body = document.body,
      sbrBtn = document.querySelector(".hamburger-menu-container"),
      sbr = document.querySelector(".sidebar-container");

// Sidebar Toggle
function sbrOpen(){  
    sbr.classList.replace('sidebar-invisible','sidebar-visible');
    body.classList.add('sidebar-visible');          
}
sbrBtn.addEventListener('click', sbrOpen, false );

function sbrClose(e) {
      if (e.target.matches('.navigation>.touch-icon') || e.target.matches('.bg-overlay') )
      sbr.classList.replace('sidebar-invisible','sidebar-visible');
      body.classList.remove('sidebar-visible');     
  }

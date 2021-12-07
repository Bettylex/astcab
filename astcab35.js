document.addEventListener("DOMContentLoaded", function () {
var body = document.body,
      sbrBtn = document.querySelector(".hamburger-menu-container"),
      sbr = document.querySelector(".sidebar-container");

// Sidebar Toggle
function sbrOpen(){  
    sbr.classList.remove('sidebar-invisible');
    sbr.classList.add('sidebar-visible');
    body.classList.add('sidebar-visible');          
}
sbrBtn.addEventListener('click', sbrOpen, false );

var sbrOver = document.querySelector(".bg-overlay"),
sbrNav = document.querySelector(".touch-icon");
function sbrClose() {
      sbr.classList.remove('sidebar-visible');
      body.classList.remove('sidebar-visible');
      sbr.classList.add('sidebar-invisible');
  }
sbrOver.addEventListener('click', sbrClose, false );
sbrNav.addEventListener('click', sbrClose, false );
    
}, false);  //DOMContentLoaded end

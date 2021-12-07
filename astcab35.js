document.addEventListener("DOMContentLoaded", function () {
var body = document.body,
      sbrBtn = document.querySelector(".hamburger-menu-container"),
      sbr = document.querySelector(".sidebar-container");

// Sidebar Toggle
function sbrOpen(){  
    sbr.classList.replace('sidebar-invisible','sidebar-visible');
    body.classList.add('sidebar-visible');          
}
sbrBtn.addEventListener('click', sbrOpen, false );

var sbrOver = document.querySelector(".bg-overlay"),
sbrNav = document.querySelector(".navigation>.touch-icon");
function sbrClose() {
      sbr.classList.replace('sidebar-invisible','sidebar-visible');
      body.classList.remove('sidebar-visible');     
  }
sbrOver.addEventListener('click', sbrClose, false );
sbrNav.addEventListener('click', sbrClose, false );
    
}, false);  //DOMContentLoaded end

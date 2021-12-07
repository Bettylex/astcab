document.addEventListener("DOMContentLoaded", function () {
var body = document.body,
      sbrBtn = document.querySelector('.hamburger-menu-container'),
      sbr = document.querySelector('.sidebar-container');

// Sidebar Toggle
function sbrOpen(){
    if(sbr.classList.contains('sidebar-invisible')){
    sbr.classList.replace('sidebar-invisible', 'sidebar-visible');
    }
if(!body.classList.contains('sidebar-visible')){
    body.classList.add('sidebar-visible');
}
sbrBtn.addEventListener('click', sbrOpen, false );

function sbrClose() {
      if(sbr.classList.contains('sidebar-visible')){
      sbr.classList.replace('sidebar-visible', 'sidebar-invisible');
      }  
      if(body.classList.contains('sidebar-visible')){
      body.classList.remove('sidebar-visible');
      }      
  }
var sbrNav = document.querySelector('.navigation>.touch-icon'),
    sbrOver = document.querySelector('.sidebar-container+.bg-overlay');
sbrNav.addEventListener('click', sbrClose, false );
sbrOver.addEventListener('click', sbrClose, false );
}
}, false); //DOMContentLoaded end

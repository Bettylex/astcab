document.addEventListener("DOMContentLoaded", function () {
var body = document.body,
      sbrBtn = document.querySelector('.hamburger-menu-container'),
      sbr = document.querySelector('.sidebar-container');

// Sidebar Toggle
function sbrTgl(){
    sbr.classList.replace('sidebar-invisible', 'sidebar-visible');
    body.classList.add('sidebar-visible');
      
document.addEventListener('click', function (e) {
    if(e.target.matches('.touch-icon') || e.target.matches('.bg-overlay') ){
    sbr.classList.replace('sidebar-visible', 'sidebar-invisible');
    body.classList.remove('sidebar-visible');
      }  
}, false);    
}
sbrBtn.addEventListener('click', sbrTgl, false );
    
}, false);  //DOMContentLoaded end

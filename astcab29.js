document.addEventListener("DOMContentLoaded", function () {
var body = document.body,
      sbrBtn = document.querySelector('.hamburger-menu-container'),
      sbr = document.querySelector('.sidebar-container');

// Sidebar Toggle
function sbrOpen(e){
    if(sbr.matches('.sidebar-invisible')){
    sbr.classList.replace('sidebar-invisible', 'sidebar-visible');
    body.classList.add('sidebar-visible');
    }
}
sbrBtn.addEventListener('click', sbrOpen, false );
      
document.addEventListener('click', function (e) {
    if(e.target.closest('.sidebar-container').matches('.sidebar-visible')){
    sbr.classList.replace('sidebar-visible', 'sidebar-invisible');
    body.classList.remove('sidebar-visible');
      }  
}, false);    
    
}, false);  //DOMContentLoaded end

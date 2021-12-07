var body = document.body,
      sbrBtn = document.querySelector(".hamburger-menu-container"),
      sbr = document.getElementById("sidebar"),
    sbrIsOpn = sbr.matches('.sidebar-visible');

// Sidebar Toggle
function sbrTgl(){
  if (!sbrIsOpn){   
    sbr.classList.replace('sidebar-invisible','sidebar-visible');
    body.classList.add('sidebar-visible');
} else {      
window.onclick = function(e){
      if (e.target.matches('.touch-icon') || e.target.matches('.bg-overlay') ) {
      sbr.classList.replace('sidebar-visible','sidebar-invisible');
      body.classList.remove('sidebar-visible');     
  }                
 }    
}           
}
sbrBtn.addEventListener('click', sbrTgl, false );



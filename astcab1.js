// Sidebar Toggle
function sbrTgl(){
    const sbr = document.querySelector(".sidebar-container");
    sbr.classList.toggle('sidebar-invisible');
    sbr.classList.toggle('sidebar-visible');
}
const sbrBtn = document.querySelector(".hamburger-menu-container");
sbrBtn.addEventListener('click', sbrTgl );

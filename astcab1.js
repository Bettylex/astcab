const body = document.body;

// Sidebar Toggle
function sbrTgl(){
    const sbr = document.querySelector(".sidebar-container");
    sbr.classList.remove('sidebar-invisible');
    sbr.classList.add('sidebar-visible');
    body.classList.toggle('sidebar-visible');
}
const sbrBtn = document.querySelector(".hamburger-menu-container");
sbrBtn.addEventListener('click', sbrTgl );

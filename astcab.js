// Sidebar Toggle
function sbrTgl(){
    this.classList.toggle('sidebar-invisible');
    this.classList.toggle('sidebar-visible');
}
const sbrBtn = document.querySelector(".hamburger-menu-container");
sbrBtn.addEventListener('click', sbrTgl );

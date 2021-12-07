const body = document.body,
      sbrBtn = document.querySelector(".hamburger-menu-container"),
      sbr = document.querySelector(".sidebar-container");

// Sidebar Toggle
function sbrOpn(){
    if (sbr.classList.contains(sidebar-invisible))
    sbr.classList.remove('sidebar-invisible');
    sbr.classList.add('sidebar-visible');
    body.classList.toggle('sidebar-visible');
}

sbrBtn.addEventListener('click', sbrTgl );

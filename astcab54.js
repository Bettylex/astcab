var body = document.body,
  sbrBtn = document.querySelector(".hamburger-menu-container"),
  sbr = document.getElementById("sbr"),
  sbrIsOpn = sbr.matches('.sidebar-visible'),
  sbrNav = document.querySelector(".sidebar-back"),
  sbrOver = document.querySelector(".bg-overlay");

// Sidebar Toggle
function sbrOpn() {
  if (!sbrIsOpn) {
    sbr.classList.replace('sidebar-invisible', 'sidebar-visible');
    body.classList.add('sidebar-visible');
  }
}
sbrBtn.addEventListener('click', sbrOpn, false);

function sbrCls() {
    sbr.classList.replace('sidebar-visible', 'sidebar-invisible');
    body.classList.remove('sidebar-visible');
}
sbrNav.addEventListener('click', sbrCls, false);
sbrOver.addEventListener('click', sbrCls, false);

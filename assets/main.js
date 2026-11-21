(function () {
  "use strict";
  var root = document.documentElement;
  var BP = 768;
  var toggle = document.getElementById("mob-toggle");
  var drawer = document.getElementById("mob-drawer");
  var overlay = document.getElementById("mob-overlay");
  var closeBtn = document.getElementById("drawer-close");

  function openDrawer() {
    if (!drawer) return;
    drawer.hidden = false;
    requestAnimationFrame(function () {
      drawer.classList.add("open");
      overlay.classList.add("open");
    });
    toggle.setAttribute("aria-expanded", "true");
    root.style.overflow = "hidden";
  }
  function closeDrawer() {
    if (!drawer) return;
    drawer.classList.remove("open");
    overlay.classList.remove("open");
    toggle.setAttribute("aria-expanded", "false");
    root.style.overflow = "";
    setTimeout(function () { if (!drawer.classList.contains("open")) drawer.hidden = true; }, 260);
  }
  if (toggle) toggle.addEventListener("click", openDrawer);
  if (closeBtn) closeBtn.addEventListener("click", closeDrawer);
  if (overlay) overlay.addEventListener("click", closeDrawer);
  document.addEventListener("keydown", function (e) { if (e.key === "Escape") closeDrawer(); });
  window.addEventListener("resize", function () { if (window.innerWidth > BP) closeDrawer(); });

  var grpBtns = document.querySelectorAll(".drawer-grp-btn");
  Array.prototype.forEach.call(grpBtns, function (btn) {
    btn.addEventListener("click", function () {
      var sub = document.getElementById(btn.getAttribute("aria-controls"));
      var open = btn.getAttribute("aria-expanded") === "true";
      btn.setAttribute("aria-expanded", open ? "false" : "true");
      if (sub) sub.classList.toggle("open", !open);
    });
  });
  var drawerLinks = document.querySelectorAll("#mob-drawer a");
  Array.prototype.forEach.call(drawerLinks, function (a) { a.addEventListener("click", closeDrawer); });

  var faqs = document.querySelectorAll(".faq-q");
  Array.prototype.forEach.call(faqs, function (q) {
    q.addEventListener("click", function () {
      var a = document.getElementById(q.getAttribute("aria-controls"));
      var open = q.getAttribute("aria-expanded") === "true";
      q.setAttribute("aria-expanded", open ? "false" : "true");
      if (a) a.style.maxHeight = open ? "0px" : a.scrollHeight + "px";
    });
  });
})();

// STAR-NAME App Logic
(function () {
  "use strict";
  var nameInput = document.getElementById("nameInput");
  var starBtn = document.getElementById("starBtn");
  var overlay = document.getElementById("overlay");
  var popup = document.getElementById("popup");
  var popupClose = document.getElementById("popupClose");
  var userName = document.getElementById("userName");
  var starverseBtn = document.getElementById("starverseBtn");
  var toast = document.getElementById("toast");
  var starsContainer = document.getElementById("stars");

  function createStarfield() {
    var count = 80;
    for (var i = 0; i < count; i++) {
      var star = document.createElement("div");
      star.className = "star";
      var size = Math.random() * 2.5 + 0.5;
      star.style.width = size + "px";
      star.style.height = size + "px";
      star.style.left = Math.random() * 100 + "%";
      star.style.top = Math.random() * 100 + "%";
      star.style.setProperty("--dur", (Math.random() * 3 + 2) + "s");
      star.style.setProperty("--max-op", (Math.random() * 0.6 + 0.2).toFixed(2));
      star.style.animationDelay = (Math.random() * 4) + "s";
      starsContainer.appendChild(star);
    }
  }

  nameInput.addEventListener("input", function () {
    var hasText = this.value.trim().length > 0;
    starBtn.disabled = !hasText;
  });

  function createRipple(e, btn) {
    var rect = btn.getBoundingClientRect();
    var ripple = document.createElement("span");
    ripple.className = "ripple";
    var size = Math.max(rect.width, rect.height);
    ripple.style.width = ripple.style.height = size + "px";
    ripple.style.left = (e.clientX - rect.left - size / 2) + "px";
    ripple.style.top = (e.clientY - rect.top - size / 2) + "px";
    btn.appendChild(ripple);
    ripple.addEventListener("animationend", function () {
      ripple.remove();
    });
  }

  function showPopup(name) {
    userName.textContent = name;
    overlay.classList.add("active");
    popup.classList.add("active");
    document.body.style.overflow = "hidden";
  }

  function hidePopup() {
    overlay.classList.remove("active");
    popup.classList.remove("active");
    document.body.style.overflow = "";
  }

  var toastTimer = null;
  function showToast() {
    if (toastTimer) {
      clearTimeout(toastTimer);
    }
    toast.classList.add("show");
    toastTimer = setTimeout(function () {
      toast.classList.remove("show");
      toastTimer = null;
    }, 4000);
  }

  starBtn.addEventListener("click", function (e) {
    var name = nameInput.value.trim();
    if (!name) {
      nameInput.classList.add("shake");
      nameInput.addEventListener("animationend", function handler() {
        nameInput.classList.remove("shake");
        nameInput.removeEventListener("animationend", handler);
      });
      return;
    }
    createRipple(e, starBtn);
    setTimeout(function () {
      showPopup(name);
    }, 200);
  });

  nameInput.addEventListener("keydown", function (e) {
    if (e.key === "Enter" && !starBtn.disabled) {
      starBtn.click();
    }
  });

  popupClose.addEventListener("click", hidePopup);
  overlay.addEventListener("click", hidePopup);

  document.addEventListener("keydown", function (e) {
    if (e.key === "Escape") {
      if (popup.classList.contains("active")) {
        hidePopup();
      }
    }
  });

  starverseBtn.addEventListener("click", function (e) {
    createRipple(e, starverseBtn);
    setTimeout(function () {
      hidePopup();
      showToast();
    }, 150);
  });

  createStarfield();
  nameInput.focus();
})();

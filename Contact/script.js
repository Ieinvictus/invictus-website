document.addEventListener("DOMContentLoaded", () => {

  const form = document.getElementById("inquiryForm");
  if (!form) return;

  const submitBtn = form.querySelector("button[type='submit']");
  const termsCheck = document.getElementById("termsCheck");
  const popup = document.getElementById("successPopup");
  const closeBtn = document.getElementById("closePopup");

  /* ================= BACK BUTTON BEHAVIOR ================= */

  window.addEventListener("pageshow", function () {

    if (sessionStorage.getItem("inquirySuccess") === "true") {

      sessionStorage.removeItem("inquirySuccess");

      submitBtn.innerText = "✔ Submitted Successfully";
      submitBtn.disabled = true;
      submitBtn.classList.add("success");   // ✅ class use karo
      submitBtn.style.cursor = "default";
      submitBtn.style.opacity = "1";

      return;
    }

    submitBtn.innerText = "SUBMIT TRAVEL REQUEST";
    submitBtn.classList.remove("success"); // reset class
    submitBtn.disabled = !termsCheck.checked;
    submitBtn.style.opacity = termsCheck.checked ? "1" : "0.6";
    submitBtn.style.cursor = termsCheck.checked ? "pointer" : "not-allowed";

  });


  /* ================= INITIAL BUTTON STATE ================= */

  submitBtn.disabled = true;
  submitBtn.style.opacity = "0.6";
  submitBtn.style.cursor = "not-allowed";


  /* ================= ENABLE WHEN TERMS CHECKED ================= */

  termsCheck.addEventListener("change", () => {
    submitBtn.disabled = !termsCheck.checked;
    submitBtn.style.opacity = termsCheck.checked ? "1" : "0.6";
    submitBtn.style.cursor = termsCheck.checked ? "pointer" : "not-allowed";
  });


  /* ================= FORM SUBMIT ================= */

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    if (!termsCheck.checked) {
      alert("Please accept Terms & Conditions");
      return;
    }

    const payload = {
      full_name: form.full_name?.value.trim(),
      mobile: form.mobile_number?.value.trim(),
      email: form.email_address?.value.trim(),
      destination: form.destination_tour_name?.value.trim(),
      travel_date: form.travel_date?.value,
      travel_type: form.travel_type?.value,
      travelers: Number(form.number_of_travelers?.value),
      message: form.message_special_request?.value.trim()
    };

    for (const key in payload) {
      if (!payload[key]) {
        alert("Please fill all required fields");
        return;
      }
    }

    /* Loading State */
    submitBtn.innerText = "Submitting...";
    submitBtn.disabled = true;
    submitBtn.style.cursor = "wait";

    try {

      const response = await fetch(
        "https://invictus-contact-api.rahulbpadaliya.workers.dev/",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(payload)
        }
      );

      if (response.ok) {

        sessionStorage.setItem("inquirySuccess", "true");

        if (popup) {
          popup.classList.add("active");
          document.body.style.overflow = "hidden";
        }

        form.reset();

       submitBtn.innerHTML = '<i class="fa-solid fa-check-double"></i> Request Sent';
        submitBtn.classList.add("success");   // ✅ clean styling
        submitBtn.style.cursor = "default";

      } else {
        alert("Submission failed. Please try again.");
        resetButton();
      }

    } catch (error) {
      console.error("API Error:", error);
      alert("Server error. Please try again later.");
      resetButton();
    }

  });


  /* ================= CLOSE POPUP ================= */

  if (closeBtn) {
    closeBtn.addEventListener("click", () => {
      popup.classList.remove("active");
      document.body.style.overflow = "auto";
    });
  }


  function resetButton() {
    submitBtn.innerText = "SUBMIT TRAVEL REQUEST";
    submitBtn.disabled = false;
    submitBtn.classList.remove("success");
    submitBtn.style.opacity = "1";
    submitBtn.style.cursor = "pointer";
  }

});


/* ================= SCROLL REVEAL ================= */

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(el => {
    const windowHeight = window.innerHeight;
    const elementTop = el.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      el.classList.add("active");
    }
  });
});


// bar new//
document.addEventListener("DOMContentLoaded", function () {
const mobileMenu = document.getElementById("mobileMenu");
const navToggle = document.querySelector(".nav-toggle");
const dropdowns = document.querySelectorAll(".dropdown");

/* ================= MOBILE MENU TOGGLE ================= */

window.toggleMenu = function () {
mobileMenu.classList.toggle("active");

document.body.style.overflow = mobileMenu.classList.contains("active")
? "hidden"
: "auto";
};

/* ================= DROPDOWN (DESKTOP + MOBILE SAME SYSTEM) ================= */

document.querySelectorAll(".dropdown-toggle").forEach((item) => {
item.addEventListener("click", function (e) {
e.preventDefault();

dropdowns.forEach((drop) => {
if (drop !== this.parentElement) {
drop.classList.remove("active");
}
});

this.parentElement.classList.toggle("active");
});
});

/* ================= CLICK OUTSIDE CLOSE ================= */

document.addEventListener("click", function (e) {
// Close dropdown if clicked outside
dropdowns.forEach((drop) => {
if (!drop.contains(e.target)) {
drop.classList.remove("active");
}
});

// Close mobile menu if clicked outside
if (
mobileMenu.classList.contains("active") &&
!mobileMenu.querySelector(".mobile-menu-box").contains(e.target) &&
!navToggle.contains(e.target)
) {
toggleMenu();
}
});

/* ================= ESC KEY CLOSE ================= */

document.addEventListener("keydown", function (e) {
if (e.key === "Escape") {
dropdowns.forEach((drop) => drop.classList.remove("active"));

if (mobileMenu.classList.contains("active")) {
toggleMenu();
}
}
});
});

//toagfal
document.querySelectorAll(".review-text-wrap").forEach(function(wrap){

  const text = wrap.querySelector(".review-text");
  const toggle = wrap.querySelector(".toggle");

  // Check if text actually overflowing
  if(text.scrollHeight <= text.clientHeight){
    toggle.style.display = "none"; // Hide toggle if text short
  }

  toggle.addEventListener("click", function(){

    text.classList.toggle("expanded");

    if(text.classList.contains("expanded")){
      this.innerText = "Read less";
    } else {
      this.innerText = "Read more";
    }

  });

});

//subcribe footer//
/* ================= FOOTER SUBSCRIBE ================= */

const API = "https://invictus-zoho-api.rahulbpadaliya.workers.dev/";

document
  .querySelector(".footer-subscribe button")
  .addEventListener("click", async () => {
    const email = document.querySelector(".footer-subscribe input").value;
    const msg = document.querySelector(".subscribe-message");

    try {
      const res = await fetch(API, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ email: email })
      });

      if (res.ok) {
        msg.innerHTML = "Subscribed successfully";
      } else {
        msg.innerHTML = "❌ Subscription failed";
      }
    } catch (e) {
      msg.innerHTML = "❌ Server error";
    }
  });
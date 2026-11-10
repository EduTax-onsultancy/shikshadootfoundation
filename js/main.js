
(function ($) {

    "use strict";



    // Spinner - লোডিং ফিক্স করা হয়েছে

    var spinner = function () {

        setTimeout(function () {

            if ($('#spinner').length > 0) {

                $('#spinner').removeClass('show');

            }

        }, 500); // এখানে সময় একটু বাড়িয়ে দেওয়া হয়েছে যাতে সব ফাইল লোড হওয়ার সুযোগ পায়

    };

    spinner();



    // Initiate WOW.js

    if (typeof WOW !== 'undefined') {

        new WOW().init();

    }



    // Back to top button

    $(window).scroll(function () {

        if ($(this).scrollTop() > 300) {

            $('.back-to-top').fadeIn('slow');

        } else {

            $('.back-to-top').fadeOut('slow');

        }

    });

    $('.back-to-top').click(function () {

        $('html, body').animate({scrollTop: 0}, 1500, 'easeInOutExpo');

        return false;

    });



    // Testimonial carousel

    if ($(".testimonial-carousel").length > 0) {

        $(".testimonial-carousel").owlCarousel({

            autoplay: true,

            smartSpeed: 1500,

            center: true,

            dots: true,

            loop: true,

            margin: 50,

            responsive: {

                0: { items: 1 },

                768: { items: 2 },

                992: { items: 3 }

            }

        });

    }



    // Course -> Others logic

    window.checkOtherCourse = function () {

        var course = document.getElementById("course").value;

        var box = document.getElementById("otherCourseBox");

        var input = document.getElementById("other_course");



        if (course === "others") {

            box.style.display = "block";

            input.setAttribute('required', '');

        } else {

            box.style.display = "none";

            input.removeAttribute('required');

            input.value = "";

        }

    };



    // Dynamic Documents logic

    document.querySelectorAll(".doc-checkbox").forEach(function (checkbox) {

        checkbox.addEventListener("change", function () {

            var inputBoxId = this.getAttribute("data-input");

            var inputBox = document.getElementById(inputBoxId);

            var inputField = inputBox.querySelector("input");



            if (this.checked) {

                inputBox.style.display = "block";

                inputField.setAttribute('required', '');

            } else {

                inputBox.style.display = "none";

                inputField.removeAttribute('required');

                inputField.value = "";

            }

        });

    });



    // WhatsApp Submit Function

    window.sendToWhatsApp = function () {

        var phoneNumber = "919038401071"; 



        // সব ইনপুট ফিল্ড থেকে ডেটা নেওয়া

        var fullName = document.querySelector('input[name="full_name"]').value;

        var dob = document.querySelector('input[name="dob"]').value;

        var gender = document.querySelector('select[name="gender"]').value;

        var mobile = document.querySelector('input[name="mobile"]').value;

        var aadhar = document.querySelector('input[name="aadhar"]').value;

        var address = document.querySelector('textarea[name="res_address"]').value;



        var course = document.getElementById("course").value;

        if (course === "others") {

            course = document.getElementById("other_course").value;

        }



        var selectedDocs = [];

        document.querySelectorAll(".doc-checkbox:checked").forEach(function (checkbox) {

            var inputBoxId = checkbox.getAttribute("data-input");

            var inputValue = document.getElementById(inputBoxId).querySelector("input").value;

            selectedDocs.push("* " + checkbox.value + " (No: " + inputValue + ")");

        });



        if (selectedDocs.length === 0) {

            alert("Please select at least ONE document.");

            return false;

        }



        // মেসেজ টেক্সট তৈরি

        var message = "🎓 *New Admission Form Submission* 🎓\n\n" +

            "👤 *Student Details:*\n" +

            "Name: " + fullName + "\n" +

            "DOB: " + dob + "\n" +

            "Gender: " + gender + "\n" +

            "Mobile: " + mobile + "\n" +

            "Aadhar: " + aadhar + "\n\n" +

            "📚 *Course:* " + course + "\n" +

            "📍 *Address:* " + address + "\n\n" +

            "📄 *Documents Provided:*\n" + selectedDocs.join("\n");



        var url = "https://wa.me/" + phoneNumber + "?text=" + encodeURIComponent(message);

        window.open(url, "_blank");

    };



})(jQuery);  
/* ===== GALLERY LIGHTBOX JS START ===== */
const imgs = document.querySelectorAll(".gallery img");
const box = document.getElementById("lightbox");
const lightImg = document.getElementById("lightImg");

let index = 0;
let startX = 0;
let scale = 1;
let startDist = 0;

/* Open */
imgs.forEach((img,i)=>{
  img.addEventListener("click",()=>{
    index = i;
    openBox();
  });
});

function openBox(){
  box.style.display = "flex";
  lightImg.src = imgs[index].src;
  scale = 1;
  lightImg.style.transform = "scale(1)";
}

function closeBox(){
  box.style.display = "none";
}

/* Next / Prev */
function next(){
  index = (index + 1) % imgs.length;
  openBox();
}

function prev(){
  index = (index - 1 + imgs.length) % imgs.length;
  openBox();
}

/* Touch Events */
box.addEventListener("touchstart",e=>{
  if(e.touches.length === 1){
    startX = e.touches[0].clientX;
  }
  if(e.touches.length === 2){
    startDist = getDistance(e.touches);
  }
});

box.addEventListener("touchmove",e=>{
  if(e.touches.length === 2){
    let d = getDistance(e.touches);
    scale += (d - startDist) / 300;
    scale = Math.min(Math.max(1, scale), 3);
    lightImg.style.transform = `scale(${scale})`;
    startDist = d;
  }
});

box.addEventListener("touchend",e=>{
  if(!e.changedTouches[0]) return;
  let diff = e.changedTouches[0].clientX - startX;
  if(Math.abs(diff) > 50){
    diff < 0 ? next() : prev();
  }
});

function getDistance(t){
  let dx = t[0].clientX - t[1].clientX;
  let dy = t[0].clientY - t[1].clientY;
  return Math.sqrt(dx*dx + dy*dy);
}
/* ===== GALLERY LIGHTBOX JS END ===== */

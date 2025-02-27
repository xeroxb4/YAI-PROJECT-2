// For navbar for devices
function toggleMenu() {
    const navbar = document.getElementById("navbar");
    navbar.classList.toggle("show");
  }
  

//   For Whatsapp
function toggleCourseBox(event) {
    event.currentTarget.classList.toggle('hidden');
}

function sendToWhatsApp() {
    let fullName = document.getElementById('fullName').value;
    let address = document.getElementById('address').value;
    let course = document.getElementById('course').value;
    let phone = document.getElementById('phone').value;
    
    let message = `Application Form\n\nName: ${fullName}\nAddress: ${address}\nSelected Course: ${course}\nPhone: ${phone}`;
    
    let whatsappURL = `https://wa.me/+233 55 170 7703?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}


// For section navbar highlight
document.addEventListener("DOMContentLoaded", () => {
  const navLinks = document.querySelectorAll(".navbar a");
  
  window.addEventListener("scroll", () => {
    let current = "";
    document.querySelectorAll("section").forEach((section) => {
      const sectionTop = section.offsetTop;
      const sectionHeight = section.clientHeight;

      if (window.scrollY >= sectionTop - sectionHeight / 3) {
        current = section.getAttribute("id");
      }
    });

    navLinks.forEach((link) => {
      link.classList.remove("active");
      if (link.getAttribute("href").substring(1) === current) {
        link.classList.add("active");
      }
    });
  });
});



// For Voice control
window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;

let isSpeaking = false; // Stop Self Talking

window.onload = function () {
  recognition.start(); // Automatic Start
  console.log("Voice Control Started Automatically");
  speak("Voice Control Activated, Please Speak");
};

recognition.onstart = function () {
  console.log("Listening...");
  playBeep(); // Beep Sound
};

recognition.onresult = function (event) {
  const command = event.results[0][0].transcript.toLowerCase();
  console.log("Command: ", command);

  if (isSpeaking) return;

  // Page Navigation
  if (command.includes("go to home") || command.includes("home")) {
    window.location.href = "#homes";
    speak("Navigating to Home");
  }

  if (command.includes("services") || command.includes("open services")) {
    window.location.href = "#services";
    speak("Opening Services");
  }

  if (command.includes("about") || command.includes("open about")) {
    window.location.href = "#about";
    speak("Navigating to About");
  }

  if (command.includes("contact") || command.includes("open contact")) {
    window.location.href = "#contact";
    speak("Opening Contact Us");
  }

  if (command.includes("scroll down")) {
    window.scrollBy(0, 600);
    speak("Scrolling Down");
  }

  if (command.includes("scroll up")) {
    window.scrollBy(0, -600);
    speak("Scrolling Up");
  }

  if (command.includes("go back") || command.includes("previous page")) {
    window.history.back();
    speak("Going Back to Previous Page");
  }

  // Buttons Click
  if (command.includes("our courses")) {
    const courseBtn = document.querySelector(".service-box a[href='graphic-design.html']");
    if (courseBtn) {
      courseBtn.click();
      speak("Opening Our Courses");
    }
  }

  if (command.includes("apply now")) {
    document.querySelector(".apply-btn").click();
    speak("Applying Now");
  }

  if (command.includes("submit application") || command.includes("submit form")) {
    document.querySelector(".submit-btn").click();
    speak("Submitting Application");
  }

  if (command.includes("send message")) {
    document.querySelector(".contact-form button").click();
    speak("Sending Message");
  }
};

function speak(text) {
  isSpeaking = true;
  const speech = new SpeechSynthesisUtterance(text);
  speech.onend = function () {
    isSpeaking = false;
    recognition.start(); // Restart Listening
  };
  window.speechSynthesis.speak(speech);
}

function playBeep() {
  const audio = new Audio("https://www.soundjay.com/button/beep-07.mp3");
  audio.play();
}

recognition.onend = function () {
  if (!isSpeaking) {
    console.log("Restarting Voice Control...");
    recognition.start();
  }
};

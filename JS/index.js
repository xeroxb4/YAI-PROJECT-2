function toggleCourseBox(event) {
    event.currentTarget.classList.toggle('hidden');
}

function sendToWhatsApp() {
    let fullName = document.getElementById('fullName').value;
    let address = document.getElementById('address').value;
    let course = document.getElementById('course').value;
    let phone = document.getElementById('phone').value;
    
    let message = `Application Form\n\nName: ${fullName}\nAddress: ${address}\nSelected Course: ${course}\nPhone: ${phone}`;
    
    let whatsappURL = `https://wa.me/+233201149027?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}



window.SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;

const recognition = new SpeechRecognition();
recognition.lang = "en-US";
recognition.interimResults = false;

let isSpeaking = false; // Stop Self Loop

window.onload = function () {
  askPermission(); // Ask for mic permission
};

function askPermission() {
  let permission = confirm("Allow Voice Control?");
  if (permission) {
    speak("Voice Control Activated. Please Speak");
    recognition.start();
  }
}

recognition.onstart = function () {
  console.log("Listening...");
  playBeep();
};

recognition.onresult = function (event) {
  const command = event.results[0][0].transcript.toLowerCase();
  console.log("Command:", command);

  if (isSpeaking) return;

  // Page Navigation
  if (command.includes("go to home") || command.includes("home")) {
    window.location.href = "#homes";
    speak("Navigating to Home");
  }

  if (command.includes("open services") || command.includes("services")) {
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

  // Buttons
  if (command.includes("our courses")) {
    const courseBtn = document.querySelector(".service-box a[href='graphic-design.html']");
    if (courseBtn) {
      courseBtn.click();
      speak("Opening Our Courses");
    } else {
      speak("Course Button Not Found");
    }
  }

  if (command.includes("apply now")) {
    const applyBtn = document.querySelector(".apply-btn");
    if (applyBtn) {
      applyBtn.click();
      speak("Applying Now");
    }
  }

  if (command.includes("submit application")) {
    const submitBtn = document.querySelector(".submit-btn");
    if (submitBtn) {
      submitBtn.click();
      speak("Submitting Application");
    }
  }

  if (command.includes("send message")) {
    const messageBtn = document.querySelector(".contact-form button");
    if (messageBtn) {
      messageBtn.click();
      speak("Sending Message");
    }
  }
};

function speak(text) {
  isSpeaking = true;
  const speech = new SpeechSynthesisUtterance(text);
  speech.onend = function () {
    isSpeaking = false;
    recognition.start();
  };
  window.speechSynthesis.speak(speech);
}

function playBeep() {
  const audio = new Audio("https://www.soundjay.com/button/beep-07.mp3");
  audio.play();
}

recognition.onend = function () {
  if (!isSpeaking) {
    recognition.start();
  }
};

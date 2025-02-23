function toggleCourseBox(event) {
    event.currentTarget.classList.toggle('hidden');
}

function sendToWhatsApp() {
    let fullName = document.getElementById('fullName').value;
    let address = document.getElementById('address').value;
    let course = document.getElementById('course').value;
    let phone = document.getElementById('phone').value;
    
    let message = `Application Form\n\nName: ${fullName}\nAddress: ${address}\nSelected Course: ${course}\nPhone: ${phone}`;
    
    let whatsappURL = `https://wa.me/YOUR_NUMBER?text=${encodeURIComponent(message)}`;
    window.open(whatsappURL, '_blank');
}
function sendMessage() {
    // Catch this POST via contact router
    fetch("/contact/", {
        method: "POST",
        headers: { "Content-Type": "application/json; charset=UTF-8" },
        body: JSON.stringify({
            name: document.getElementById("name").value,
            email: document.getElementById("email").value,
            message: document.getElementById("message").value
        })
    }).then(res => {
        if (res.status == 200) {
            toastr.success("Message sent! Thanks for contacting me.")
            setTimeout(() => location.href= "/", 3000);
        }
        else {
            console.log("Error:", res.status)
        }
    }) 
}

document.getElementById("contact-button").addEventListener("click", sendMessage)
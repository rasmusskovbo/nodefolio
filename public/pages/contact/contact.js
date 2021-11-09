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
            // https://levelup.gitconnected.com/creating-browser-notification-in-javascript-79e91bfb76c8
            //toastr javascript library
            
            toastr.success("Message sent! Thanks for contacting me.")
            setTimeout(() => {
                console.log("Timing out")
                setTimeout(() => location.href= "/", 3000);
            }, 3000)
        }
        else {
            console.log("Error:", res.status)
        }
    }) 
}

document.getElementById("contact-button").addEventListener("click", sendMessage)
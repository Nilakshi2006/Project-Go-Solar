document.getElementById("quoteForm").addEventListener("submit", async function(e) {
    e.preventDefault();
    
    let formData = {
        name: this.name.value,
        email: this.email.value,
        phone: this.phone.value,
        location: this.location.value,
        monthlyBill: this.usage.value
    };

    const token = localStorage.getItem("token");

    // 🔐 Check if user is logged in
    if (!token) {
        alert("Please login first!");
        window.location.href = "login.html";
        return;
    }

    try {
        const response = await fetch("http://localhost:8080/api/quote", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
                "Authorization": "Bearer " + token
            },
            body: JSON.stringify(formData)
        });

        const result = await response.json();

        if (response.ok) {
            alert("Your quote request has been submitted successfully!");
            this.reset();
        } else {
            alert(result.msg || "Something went wrong");
        }

    } catch (err) {
        console.error(err);
        alert("Server error");
    }
});
document.getElementById("signupForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    let data = {
        name: this.name.value,
        email: this.email.value,
        password: this.password.value
    };

    try {
        const res = await fetch("http://localhost:8080/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok) {
            alert("Signup successful! Please login.");
            window.location.href = "login.html";
        } else {
            alert(result.msg || "Signup failed");
        }

    } catch (err) {
        console.error(err);
        alert("Server error");
    }
});
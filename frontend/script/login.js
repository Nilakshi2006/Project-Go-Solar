document.getElementById("loginForm").addEventListener("submit", async function(e) {
    e.preventDefault();

    let data = {
        email: this.email.value,
        password: this.password.value
    };

    try {
        const res = await fetch("http://localhost:8080/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(data)
        });

        const result = await res.json();

        if (res.ok) {
            // Save token
            localStorage.setItem("token", result.token);

            alert("Login successful!");
            window.location.href = "index.html"; // redirect
        } else {
            alert(result.msg || "Login failed");
        }

    } catch (err) {
        console.error(err);
        alert("Server error");
    }
});
//* LOGIN FORM CONTROLLER
if (location.href.includes("/login")) {
  document.querySelector("#loginForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);
    const data = {
      email: formData.get("email"),
      password: formData.get("password"),
    };

    fetch("/login", {
      method: "POST",
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.status === 200) {
          sessionStorage.setItem('userId', res.data.userId);
          sessionStorage.setItem('userType', res.data.userType);
          window.location.href = "/dashboard";
        } else {
          document.querySelector("#errorBox").textContent = res.message;
        }
      });    
  });
}

if (location.href.includes("/signup")) {
  document.querySelector("#signupForm").addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(event.target);

    const data = {
      fullName: formData.get("fullName"),
      email: formData.get("email"),
      password: formData.get("password"),
      userType: formData.get("userType"),
    };

    fetch('/signup', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    })
    .then(res=>res.json())
    .then(res=>{
      if(res.status === 200){
        location.href = "/"
      } else {
        document.querySelector("#errorBox").textContent = res.message;
      }
    })
  });
}

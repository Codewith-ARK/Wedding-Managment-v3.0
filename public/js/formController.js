//* LOGIN FORM CONTROLLER
document.querySelector('#loginForm').addEventListener('submit',event=>{
  event.preventDefault();

  const formData = new FormData(this);
  const data = {
    email: formData.get('email'),
    password: formData.get('password'),
  };

  fetch('/login',{
    method: 'POST',
    body: JSON.stringify(data)
  })
  .then(res=>res.json())
  .then(res=>{
    if(res.status===200){
      window.location.href = "/dashboard";
    } else {
      document.querySelector('#errorBox').textContent = res.message;
    }
  })
})


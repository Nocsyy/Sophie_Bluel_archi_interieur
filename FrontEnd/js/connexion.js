const form = document.getElementById("login");

form.addEventListener("submit", function(e) {
  e.preventDefault();
const email = document.querySelector(".inputMail").value;
const password = document.querySelector(".inputPassword").value;


  
  const login = {
    email: email,
    password: password,
  };
 
  fetch("http://localhost:5678/api/users/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(login)
  })
  .then(response => response.json())
  .then(data => {
    console.log(data);
    if (data.token) {
      console.log("Connexion réussie !");
      localStorage.setItem("projet3",data.token);
      localStorage.setItem("idProjet3", data.userId)
      window.location.href = "./index.html";
    } else {
        alert("Erreur e-mail et/ou mot de passe");
      console.error("Erreur de connexion : " + data.message);
    }
    
  })
  .catch(error => console.error(error));
});





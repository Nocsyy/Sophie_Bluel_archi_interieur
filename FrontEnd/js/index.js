const worksListCtnr = document.querySelector(".gallery");
const apiWorksUrl = "http://localhost:5678/api/works";
const STORAGE_NAME = "ocr_P3_sophieBluel";

function logout(){
  localStorage.removeItem("projet3");
  localStorage.removeItem("idProjet3");
  location.href="./login.html";
}

function checkAuth(){
 const logInfo =  localStorage.getItem("projet3");
 const loginLogout = document.querySelector("#loginLogout")
 if (logInfo){
  const btnLogout = document.createElement("button");
  btnLogout.innerText = "Logout";
  btnLogout.addEventListener("click", logout);
  loginLogout.appendChild(btnLogout);
  
 }
 else {
  loginLogout.innerHTML=" <a href='./login.html'>login</a>";
 }
}
const catchError = (error) => {
  console.log("une erreur est survenue", error);
};

const successFetchWorks = (response) => {
  return response.json();
};

function createPage1 () {
     
  fetch(apiWorksUrl)
  .catch(catchError)
  .then(successFetchWorks)
  .then((works)=>{
    for (let i = 0; i < works.length; i++) {
      const work = works[i];
      const photoEdit = document.querySelector("#photoEdit");
      const figColumn = document.createElement("figure");
      figColumn.className="figColumn";
      photoEdit.appendChild(figColumn);
      const img = document.createElement("img");
      const imageId = work.id;  
      img.className="imgModal";
      img.src = work.imageUrl;
      figColumn.appendChild(img);
      const figImg = document.createElement("figcaption");
      figImg.innerText="éditer";
      figColumn.appendChild(figImg);
      
      
      const deleteOneImg = document.createElement("button");
      deleteOneImg.className = "deleteOneImg";
      figColumn.appendChild(deleteOneImg);
      const iconDeleteOneImg = document.createElement("i");
      iconDeleteOneImg.className="fa-solid fa-trash-can fa-1x iconTrash";
      deleteOneImg.appendChild(iconDeleteOneImg);
      const figureImg = document.querySelector(".figureImg");
      
      const images = document.querySelectorAll(`img[src="${img.src}"]`);
    deleteOneImg.addEventListener("click", function() {
      images.forEach((image) => {
        const figure = image.closest("figure");
        if (figure) {
          figure.remove();
        }
      });
      function deleteImg() {
        const figures = document.querySelectorAll("figure");
        const figuresArray = Array.from(figures); 
        figuresArray.forEach((figure) => {
          const image = figure.querySelector("img");
          if (!image) {
            figure.remove();
          }
        });
      }
      
    deleteImg();
      figColumn.remove();
      
     
    fetch (`${apiWorksUrl}/${imageId}`, {
      method: "DELETE",
      headers: {
        "authorization": `Bearer ${localStorage.getItem("projet3")}`,
      }
    })
      .then(response => {
        if (!response.ok) {
          throw new Error(response.statusText);
        }
        return response.json();
      })
      .then(data => {
        
      })
      .catch(error => {
        console.error(error);
      });
  });
 
    }
    
  });  
  
  }
function checkAdmin (){
  const userId = localStorage.getItem("idProjet3");
  console.log("ID de l'utilisateur : " + userId);
  const modale = document.querySelectorAll("#mod");
  const modaleContainer = document.querySelector(".modal-container");
  const modalTriggers = document.querySelectorAll(".modal-trigger");
  modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));

  if (userId === "1"){
    function toggleModal(){
  modaleContainer.classList.toggle("active");
  modal.style.transform = "translate(-25%, -50%)";
  
  
}
const btnFilter = document.querySelector(".btn-ctr").style.display="none";
    for (let i = 0; i < modale.length; i++) {
      
      const iconBtnEdit = document.createElement("i");
      iconBtnEdit.className="fa-regular fa-pen-to-square row-reverse",
      modale[i].appendChild(iconBtnEdit);

      const btnModifier = document.createElement("button");
      btnModifier.innerText = "modifier";
      btnModifier.className = "modal-trigger";
      modale[i].appendChild(btnModifier);
    }

      const modalTriggers = document.querySelectorAll(".modal-trigger");
      const modal = document.querySelector(".modal");
      modalTriggers.forEach(trigger => trigger.addEventListener("click", toggleModal));
      const btnAddImg = document.querySelector(".btnAddImg");
      const modalctn2 = document.querySelector(".modalctn2")
      btnAddImg.addEventListener("click", function() {
        modal.style.transform ="translate(-75%, -50%)";
      });
      

    

    createPage1();
  function createPage2 (){
      const modalctn = document.querySelector(".modalctn2");
      const modal = document.querySelector(".modal");
      let imgSource = ""; 
        
      const titleAddImg = document.createElement("h2");
      titleAddImg.textContent="Ajout photo";
      titleAddImg.className="titleAddImg";
      modalctn.appendChild(titleAddImg);
      
      const formAddImg = document.createElement("form");
      formAddImg.className="formAddImg";
      modalctn.appendChild(formAddImg);
      
      const divAddImg = document.createElement("div");
      divAddImg.className="divAddImg";
      formAddImg.appendChild(divAddImg);
      
      const iconAddImg = document.createElement("i");
      iconAddImg.className="fa-solid fa-image fa-5x iconAddImg";
      divAddImg.appendChild(iconAddImg);
      
      
      
      const btnImg = document.createElement("div");
      btnImg.className="btnImg";
      btnImg.textContent="+ Ajouter une photo";
      divAddImg.appendChild(btnImg);
      let imageFile ;
      const inputImg = document.createElement("input");
      inputImg.type = "file";
      inputImg.className = "inputImg"
      formAddImg.appendChild(inputImg);
      inputImg.addEventListener("change", function(event) {
        const reader = new FileReader();
        reader.onload = function(e) {
          const preview = document.createElement("img");
          preview.src = e.target.result;
          imageSource = e.target.result;
          preview.className="preview";
          modalctn.appendChild(preview);
        };
        imageFile = event.target.files[0];
        reader.readAsDataURL(imageFile);
      });
      
      const textAddImg = document.createElement("p");
      textAddImg.textContent="jpg, png : 4mo max";
      textAddImg.className="textAddImg";
      divAddImg.appendChild(textAddImg);
      
       const titleInputAddTitle = document.createElement("label");
      titleInputAddTitle.textContent="Titre";
      formAddImg.appendChild(titleInputAddTitle);
      const inputAddTitle = document.createElement("input");
      inputAddTitle.type = "text";
      inputAddTitle.className="inputAddTitle";
      formAddImg.appendChild(inputAddTitle);
     
      const titleInputAddCat = document.createElement("p");
      titleInputAddCat.textContent="Catégories";
      formAddImg.appendChild(titleInputAddCat);

      const inputAddCat = document.createElement("label");
      inputAddCat.className="inputAddCat";
      const select = document.createElement('select');
      fetch(apiWorksUrl)
      .catch(catchError)
      .then(successFetchWorks)
        .then(works => {
          const categories = works.map(work => work.category);
          const uniqueCategories = [...new Map(categories.map(item => [item.name, item])).values()];
          for (let i = 0; i < uniqueCategories.length; i++) {
            const category = uniqueCategories[i];
            const option = document.createElement('option');
            option.value = category.id;
            option.textContent = category.name;
            select.appendChild(option);
          };
          inputAddCat.appendChild(select);
        });
      
      formAddImg.appendChild(inputAddCat);
      
      const lineGrey = document.createElement("div");
      lineGrey.className="line";
      formAddImg.appendChild(lineGrey);
      
      const btnValider= document.createElement("button");
      btnValider.className="btnValider";
      btnValider.type = "submit";
      btnValider.textContent="Valider";
      formAddImg.appendChild(btnValider);
      
      const form = document.querySelector('.formAddImg');
      
      btnValider.addEventListener("mouseover", function() {
        btnValider.style.backgroundColor = "#1D6154";
      });
    
      btnValider.addEventListener("mouseout", function() {
        btnValider.style.backgroundColor = "#A7A7A7";
      });
      
      formAddImg.addEventListener('submit', (event) => {
        
        event.preventDefault();
        if(inputAddTitle.value && select.value && imageFile) {
        const formData = new FormData();
        formData.append("image",  new Blob([imageFile], { type: 'application/octet-stream' }));
        formData.append('title', inputAddTitle.value);
        formData.append('category', select.value);
       fetch(apiWorksUrl , {
          method: 'POST',
          body: formData,
          headers: {
            "authorization": `Bearer ${localStorage.getItem("projet3")}`,
          }
        })
          .then(response => response.json())
          .then(data => {
            alert("Photo ajoutée avec succès");
            formAddImg.reset();
            function resetImageInput() {
                const preview = document.querySelector(".preview");
                if (preview !== null) {
                  preview.remove();
                
                }
                imageFile = "";
                   
              }
              
            modal.style.transform = "translate(-25%, -50%)";

            const imageId = data.id;
            function createNewImgModal (){ 
            console.log(data);
            const photoEdit = document.querySelector("#photoEdit");
            const figColumn = document.createElement("figure");
            figColumn.className="figColumn";
            photoEdit.appendChild(figColumn);
            const imgModal = document.createElement("img"); 
            imgModal.src = imageSource;
            imgModal.alt = data.title;
            figColumn.appendChild(imgModal);
            const figImg = document.createElement("figcaption");
            figImg.innerText="éditer";
            figColumn.appendChild(figImg);
            const deleteOneImg = document.createElement("button");
            deleteOneImg.className = "deleteOneImg";
            figColumn.appendChild(deleteOneImg);
            const iconDeleteOneImg = document.createElement("i");
            iconDeleteOneImg.className="fa-solid fa-trash-can fa-1x iconTrash";
            deleteOneImg.appendChild(iconDeleteOneImg);
            
            const img = document.createElement("img"); 
            const figure = document.createElement("figure");
                img.src = imageSource;
                figure.appendChild(img);
                const figcaption = document.createElement("figcaption");
                figcaption.innerText = data.title;
                figure.appendChild(img);
                figure.appendChild(figcaption);
                worksListCtnr.appendChild(figure);

            deleteOneImg.addEventListener("click", function() { 
                
                figColumn.remove();
                figure.remove();
                fetch (`${apiWorksUrl}/${imageId}`, {
                  method: "DELETE",
                  headers: {
                    "authorization": `Bearer ${localStorage.getItem("projet3")}`,
                  }
                })
                  .then(response => {
                    if (!response.ok) {
                      throw new Error(response.statusText);
                    }
                    return response.json();
                  })
                  .then(data => {
                  })
                  .catch(error => {
                    console.error(error);
                  });
               })
               
            }   
            
            toggleModal();
            createNewImgModal();
            resetImageInput();
            
          })
         
          .catch(error => {
            console.error(error);
            
          });
          
        } else {
            alert("Veuillez remplir tous les champs");
          }
       })
         
    }

const btnBack = document.querySelector(".btnBack");
btnBack.addEventListener("click", function() {
    modal.style.transform = "translate(-25%, -50%)";
});



createPage2();
}

  else {
    console.log("Non admin");
  }
}



fetch(apiWorksUrl)
  .catch(catchError)
  .then(successFetchWorks)
  .then((works) => {
   const filterTousBtn = document.querySelector(".btnTous");
    filterTousBtn.addEventListener("click", filterTous);

    const filterObjectsBtn = document.querySelector(".btnObjects");
    filterObjectsBtn.addEventListener("click", filterByObjects);

    const filterAppartmentsBtn =
      document.querySelector(".btnAppartements");
    filterAppartmentsBtn.addEventListener("click", filterByAppartments);

    const filterHotelsRestaurantsBtn = document.querySelector(".btnHr");
    filterHotelsRestaurantsBtn.addEventListener("click",filterByHotelsRestaurants);

    for (let i = 0; i < works.length; i++) {
      const work = works[i];
      const figure = document.createElement("figure");
      const img = document.createElement("img");
      img.src = work.imageUrl;
      img.alt = work.title;
      figure.appendChild(img);

      const figcaption = document.createElement("figcaption");
      figcaption.innerText = work.title;
      figure.appendChild(figcaption);
      worksListCtnr.appendChild(figure);
      
    }

    function filterTous() {
      const filteredWorks = works;
      updateWorksList(filteredWorks);
      filterObjectsBtn.disabled = false;
      filterAppartmentsBtn.disabled = false;
      filterHotelsRestaurantsBtn.disabled = false;
    }

    function filterByObjects() {
      const filteredWorks = works.filter(
        (work) => work.category.name === "Objets"
      );
      updateWorksList(filteredWorks);
      }

    function filterByAppartments() {
      const filteredWorks = works.filter(
        (work) => work.category.name === "Appartements"
      );
      updateWorksList(filteredWorks);
    }

    function filterByHotelsRestaurants() {
      const filteredWorks = works.filter(
        (work) => work.category.name === "Hotels & restaurants"
      );
      updateWorksList(filteredWorks);
    }

    function updateWorksList(filteredWorks) {
      worksListCtnr.innerHTML = "";
      for (let i = 0; i < filteredWorks.length; i++) {
        const work = filteredWorks[i];
        const figure = document.createElement("figure");
        figure.className="figureImg";
        const img = document.createElement("img");
        img.src = work.imageUrl;
        img.alt = work.title;
        figure.appendChild(img);

        const figcaption = document.createElement("figcaption");
        figcaption.innerText = work.title;
        figure.appendChild(figcaption);
        worksListCtnr.appendChild(figure);
       
      }
    }
    updateWorksList(works);
  }); 

  

checkAuth();
checkAdmin();


let addToy = false;
const toyForm = document.getElementsByClassName('add-toy-form')[0];
const likeButton = document.getElementsByClassName('like-btn');

document.addEventListener("DOMContentLoaded", () => {
  const addBtn = document.querySelector("#new-toy-btn");
  const toyFormContainer = document.querySelector(".container");
  addBtn.addEventListener("click", () => {
    // hide & seek with the form
    addToy = !addToy;
    if (addToy) {
      toyFormContainer.style.display = "block";
    } else {
      toyFormContainer.style.display = "none";
    }
  });
});

document.addEventListener("DOMContentLoaded", function() {
  return fetch("http://localhost:3000/toys")
    .then(response => {
      return response.json();
    })
    .then(data => {
      data.forEach((element) => {
        toyCreator(element);
      });
    });
})

function toyCreator(data) {

  const newDiv = document.createElement("div");
  newDiv.className = "card";

  const h2 = document.createElement("h2");
  h2.textContent = data.name;

  const img = document.createElement("img");
  img.src = data.image;
  img.className = "toy-avatar"

  const p = document.createElement("p");
  p.textContent = data.likes;

  const button = document.createElement("button");
  button.className = "like-btn";
  button.id = data.id;
  button.textContent = "Like ❤️"

  button.addEventListener("click", () => {
    data.likes += 1;
    p.textContent = data.likes;

    fetch(`http://localhost:3000/toys/${data.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify({
        likes: data.likes
      })
    })
    .then(response => response.json())
  })

  newDiv.append(h2, img, p, button)
  document.getElementById("toy-collection").appendChild(newDiv);
}

toyForm.addEventListener('submit', function(event) {
  event.preventDefault();

  const formData = new FormData(this);

  const formObject = {};
  formData.forEach((value, key) => {
    formObject[key] = value;
  });

  formObject.likes = formObject.likes || 0;

  const jsonData = JSON.stringify(formObject);

  fetch("http://localhost:3000/toys", {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json'
    },
    body: jsonData,
  })
  .then(response => response.json())
  .then(data => {
    console.log('Success', data);
    toyCreator(data);
  })
  .catch(error => {
    console.error('Error', error);
  });
});



/*
for (let i = 0; i < likeButton.length; i++) {
  console.log(likeButton[i]);
  likeButton[i].addEventListener("click", function(event) {
    event.preventDefault();
    console.log(likeButton[i].id);
  })
}

Goal: addEventListeners to each toy's like button 

Pseudocode: getElementsByClassName('like-btn') and then iterate through each
 and pass an event listener to each element 
*/
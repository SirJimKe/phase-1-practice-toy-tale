let addToy = false;

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
  fetchToys();
  postToy();
});

const toyCollection = document.getElementById('toy-collection');
const form = document.querySelector(`.add-toy-form`)



function makeElement(element){
  return document.createElement(element)
}

function fetchToys(){
  fetch('http://localhost:3000/toys')
  .then(responce => responce.json())
  .then(data => toysCard(data))
  .catch(error => console.log(error));
}

function toysCard(toys){
  toys.forEach((toy) => {
    let div = makeElement('div');
    let h2 = makeElement('h2');
    let img = makeElement('img');
    let p = makeElement('p');
    let btn = makeElement('button');


    div.className = 'card';
    h2.innerText = toy.name;
    img.src = toy.image;
    img.className = 'toy-avatar';
    p.textContent = `${toy.likes} likes`;
    btn.className = 'like-btn';
    btn.id = toy.id;
    btn.textContent = "Like ❤️";

    toyCollection.appendChild(div);
    div.append(h2, img, p, btn);

    let likes = toy.likes;

    btn.addEventListener("click", () => {
      fetch(`http://localhost:3000/toys/${toy.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          Accept : 'application/json'
        },
        body: JSON.stringify(
          {'likes': likes +=1}
        )
      })
      .then (res => res.json())
      .then(toy => {
        console.log(toy);
        p.textContent = `${likes} likes`;
      })
      .catch(error => console.log(error))

    })
  });
}

function postToy(){
  document.querySelector('form').addEventListener('submit', (e) =>{
    e.preventDefault();
    let toyObj = {
      "name": e.target.name.value,
      "image": e.target.image.value,
      "likes": 0
    }
    newToy(toyObj)
    form.reset();   
  })
}

function newToy(toyObj){
  fetch(`http://localhost:3000/toys`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Accept: "application/json",
    },
    body: JSON.stringify(toyObj),
  })
  .then(res => res.json())
  .then(data => console.log(data))
  .catch(error => console.log(error));
}
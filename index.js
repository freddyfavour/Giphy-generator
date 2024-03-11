const imgContainer = document.getElementById("img-container");
const title = document.getElementById("title");

function handleDefaultSearch() {
  const defaultSearch = "funny";
  findGif(defaultSearch);
}

window.addEventListener("load", handleDefaultSearch);

function handleSubmit(event) {
  event.preventDefault();

  const searchInput = document.getElementById("search");
  const search = searchInput.value.trim();

  if (search === "") {
    alert("Please enter a search term!");
  } else {
    findGif(search);
  }
}

function findGif(search) {
  fetch(
    `https://api.giphy.com/v1/gifs/translate?api_key=1JYKtV7HXKcyxZBTn1q2reGqNks0f0VP&s=${search}`,
    { mode: "cors" }
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (response) {
      imgContainer.innerHTML = "";
      img = document.createElement("img");
      img.classList.add("img");
      img.src = response.data.images.original.url;
      imgContainer.appendChild(img);
      title.innerText = response.data.title;
    })
    .catch(function (error) {
      console.error("Error:", error);
      imgContainer.innerHTML = "";
      errortxt = document.createElement("p");
      errortxt.classList.add("error-text");
      errortxt.innerText = "Gif unable to load,check connection";
      imgContainer.appendChild(errortxt);
    });
}

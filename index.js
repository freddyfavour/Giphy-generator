const imgContainer = document.getElementById("img-container");
const title = document.getElementById("title");

async function handleDefaultSearch() {
  const defaultSearch = "funny";
  await findGif(defaultSearch);
}

window.addEventListener("load", handleDefaultSearch);

async function handleSubmit(event) {
  event.preventDefault();

  const searchInput = document.getElementById("search");
  const search = searchInput.value.trim();

  if (search === "") {
    alert("Please enter a search term!");
  } else {
    await findGif(search);
  }
}

async function findGif(search) {
  try {
    const response = await fetch(
      `https://api.giphy.com/v1/gifs/translate?api_key=1JYKtV7HXKcyxZBTn1q2reGqNks0f0VP&s=${search}`,
      { mode: "cors" }
    );
    const data = await response.json();

    imgContainer.innerHTML = "";
    const img = document.createElement("img");
    img.classList.add("img");
    img.src = data.data.images.original.url;
    imgContainer.appendChild(img);
    title.innerText = data.data.title;
  } catch (error) {
    console.error("Error:", error);
    imgContainer.innerHTML = "";
    const errortxt = document.createElement("p");
    errortxt.classList.add("error-text");
    errortxt.innerText = "Gif unable to load, check connection";
    imgContainer.appendChild(errortxt);
  }
}

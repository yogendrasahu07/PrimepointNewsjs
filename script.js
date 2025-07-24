let key = "4708f437d0be4cdf8008fc147b219616";
let cardData = document.querySelector(".cardData");
let Searchbtn = document.getElementById("Searchbtn");
let inputData = document.getElementById("inputData");
let searchType = document.getElementById("type");

document.getElementById("loader").style.display = "block";

const getData = (input) => {
  let res = fetch(`https://newsapi.org/v2/everything?q=${input}&apiKey=${key}`);
  let jsonData = res.json();

  searchType.innerText = "Search: " + input;
  inputData.value = "";
  cardData.innerHTML = "";
  if (!jsonData.articles || jsonData.articles.length === 0) {
    cardData.innerHTML = "<h2>No articles found for this topic.</h2>";
    return;
  }
  document.getElementById("loader").style.display = "none";

  jsonData.articles.forEach(function (article) {
    let divs = document.createElement("div");
    divs.classList.add("card");
    cardData.appendChild(divs);
    divs.innerHTML = ` <img src="${
      article.urlToImage || "./assets/default.jpg"
    }" alt="">
            <h3>${article.title}</h3>
            <p>${article.description}</p>`;
    divs.addEventListener("click", function () {
      window.open(article.url);
    });
  });
};
window.addEventListener("load", function () {
  getData("India");
});

Searchbtn.addEventListener("click", function () {
  let inputText = inputData.value;
  getData(inputText);
});

function navClick(navName) {
  if (navName == "politics") {
    document.getElementById("politics").style.color = "rgb(106, 106, 218)";
    document.getElementById("sport").style.color = "white";
    document.getElementById("technology").style.color = "white";
  }
  if (navName == "sport") {
    document.getElementById("sport").style.color = "rgb(106, 106, 218)";
    document.getElementById("politics").style.color = "white";
    document.getElementById("technology").style.color = "white";
  }
  if (navName == "technology") {
    document.getElementById("technology").style.color = "rgb(106, 106, 218)";
    document.getElementById("sport").style.color = "white";
    document.getElementById("politics").style.color = "white";
  }
  getData(navName);
}

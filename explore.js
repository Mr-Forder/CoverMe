const auth = "563492ad6f91700001000001c40314ce88704684bb1b7fb73daa90cc";
const gallery = document.querySelector(".gallery");
const searchInput = document.querySelector(".search-input");
const form = document.querySelector(".search-form");
const more = document.querySelector(".more");

let page = 1;
let fetchLink;

let searchValue;
let currentSearch;

//Suggested

const mainArea = document.querySelector(".explore");

const carSearch = document.querySelector(".exp-cars");
carSearch.addEventListener("click", () => {
  mainArea.innerHTML = "";
  searchPhotos("sports car");
});

const bikeSearch = document.querySelector(".exp-bikes");
bikeSearch.addEventListener("click", () => {
  mainArea.innerHTML = "";
  searchPhotos("motorcycle");
});

const engineSearch = document.querySelector(".exp-engines");
engineSearch.addEventListener("click", () => {
  mainArea.innerHTML = "";
  searchPhotos("car engine");
});
const planeSearch = document.querySelector(".exp-planes");
planeSearch.addEventListener("click", () => {
  mainArea.innerHTML = "";
  searchPhotos("plane");
});

const natSearch = document.querySelector(".exp-nature");
natSearch.addEventListener("click", () => {
  mainArea.innerHTML = "";
  searchPhotos("wildlife");
});

const foodSearch = document.querySelector(".exp-food");
foodSearch.addEventListener("click", () => {
  mainArea.innerHTML = "";
  searchPhotos("food");
});

const peopleSearch = document.querySelector(".exp-people");
peopleSearch.addEventListener("click", () => {
  mainArea.innerHTML = "";
  searchPhotos("people");
});

const archSearch = document.querySelector(".exp-arch");
archSearch.addEventListener("click", () => {
  mainArea.innerHTML = "";
  searchPhotos("architecture design");
});

const travelSearch = document.querySelector(".exp-trav");
travelSearch.addEventListener("click", () => {
  mainArea.innerHTML = "";
  searchPhotos("travel");
});

const funSearch = document.querySelector(".exp-fun");
funSearch.addEventListener("click", () => {
  mainArea.innerHTML = "";
  searchPhotos("party");
});

const fitSearch = document.querySelector(".exp-fit");
fitSearch.addEventListener("click", () => {
  mainArea.innerHTML = "";
  searchPhotos("fitness");
});

const motSearch = document.querySelector(".exp-mot");
motSearch.addEventListener("click", () => {
  mainArea.innerHTML = "";
  searchPhotos("motivation inspire");
});

async function loadMore() {
  page++;
  if (currentSearch) {
    fetchLink = `https://api.pexels.com/v1/search?query=${currentSearch}+query&per_page=16&page=${page}`;
  } else {
    fetchLink = `https://api.pexels.com/v1/curated?per_page=16&page=${page}`;
  }
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

searchInput.addEventListener("input", updateInput); //add input event listenter to seach input - on input, run updateInput func
form.addEventListener("submit", (e) => {
  e.preventDefault();
  currentSearch = searchValue;
  searchPhotos(searchValue);
});
function updateInput(e) {
  //e is inputting text into input box
  console.log(e.target.value);
  searchValue = e.target.value;
}

async function fetchApi(url) {
  const dataFetch = await fetch(url, {
    //create datafetch - 2nd parameter is an object with key/value pairs that let it connect to the API
    method: "GET", //specifies method
    headers: {
      //specifies headers, new object
      Accept: "application / json", //specifies the kind of connection
      Authorization: auth, //sets our auth const as the authorization key
    },
  });
  const data = await dataFetch.json(); //creates const called data, sets it to dataFetch with await keyword, and applies .json to parse it
  return data; //return the info we've fetched so we can use it
}

function generatePictures(data) {
  data.photos.forEach((photo) => {
    //for each photo in the json object:
    console.log(photo); //log info to console
    const galleryImg = document.createElement("div"); //create div
    galleryImg.classList.add("gallery-img"); //apply css class to it
    galleryImg.innerHTML = `
            <div class="gallery-info">
            <a href=${photo.photographer_url}>${photo.photographer}</a>
            <a href=${photo.src.original}>Download</a>
            </div>
            <a href=${photo.src.original}><img src=${photo.src.large}></img></a>
            `;

    gallery.appendChild(galleryImg); //append to div
  });
}

async function curatedPhotos() {
  fetchLink = "https://api.pexels.com/v1/curated?per_page=16&page=1";
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

//search

async function searchPhotos(search) {
  clear();
  fetchLink = `https://api.pexels.com/v1/search?query=${search}+query&per_page=16&page=1`;
  const data = await fetchApi(fetchLink);
  generatePictures(data);
}

function clear() {
  gallery.innerHTML = "";
  searchInput.value = "";
}

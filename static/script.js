const backendData = '/api/cards'; 
const backendForm = '/api/cardsearch';

// retrieve cards from site, will get a limit of 100
// returns array of 100 card objects
const getCards = async () => {
  try {
    const response = await axios.get(backendData);
    return response.data;
  }
  catch (error) {
    console.error("Err could not get data", error);
    throw error;
  }
}

// takes search parameter and searches for cards matching string
// returns array of all objects matching search
const searchCards = () => {
  try {
    let form = document.getElementById("form-search");

    form.addEventListener('submit', async (event) => {
      event.preventDefault();
      const formData = new FormData(form);
      console.log(formData)
      
      // Convert form data to URL-encoded string
      const formDataString = new URLSearchParams(formData).toString();

      // Make a request to the backend API
      const response = await axios.get(`${backendForm}?${formDataString}`);
      console.log(response.data);
      displayCards(response.data);
    })
  }
  catch (error) {
    console.error("Err could not get data", error);
    throw error;
  }
}

// Display card data passed into parameter and clear field
// will display card image held in the object
const displayCards = (cards) => {
  let row = document.getElementById("card-row");
  row.innerHTML = '';

  for (let elem of cards) {
    if (elem.imageUrl) {
      let col = document.createElement("div");
      col.className = "col-lg-3 col-md-6";
      row.appendChild(col);
      let card = document.createElement("div");
      card.className = "card h-100";
      col.appendChild(card);
      let cardBody = document.createElement("img");
      cardBody.className = "img-fluid rounded";
      cardBody.src = elem.imageUrl;
      card.appendChild(cardBody);
    }
  }
}

// Adds effect to show-all button to display all cards available
// clears field and displays cards called from site
const showAllCards = () => {
  let button = document.getElementById("show-all");
  button.onclick = async () => {
    let row = document.getElementById("card-row");
    row.innerHTML = '';
    const data = await getCards();
    let form = document.getElementById("form-search");
    form.reset();
    displayCards(data);
  };
};

// IIFE 
(async () => {
  const cards = await getCards();
  searchCards();
  showAllCards();
  displayCards(cards);
})();
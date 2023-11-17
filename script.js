// retrieve cards from site, will get a limit of 100
// returns array of 100 card objects
const getCards = async (page = 1) => {
    try {
      const response = await axios.get(`https://api.magicthegathering.io/v1/cards?page=${page}`);
      console.log(response.data.cards)
      return response.data.cards;
    }
    catch (error) {
      console.error("Err could not get data", error);
      throw error;
    }
  }
  
  // takes search parameter and searches for cards matching string
  // returns array of all objects matching search
  const searchCards = async (searchBar, manaValue, color) => {
    try {
      if (searchBar) {
        const response = await axios.get(`https://api.magicthegathering.io/v1/cards?name=${searchBar}`);
        return response.data.cards;
      }
      else if (manaValue && !color.length) {
        const response = await axios.get(`https://api.magicthegathering.io/v1/cards?cmc=${manaValue}`);
        return response.data.cards;
      }
      else if (!manaValue && color.length) {
        const response = await axios.get(`https://api.magicthegathering.io/v1/cards?colorIdentity=${color}`);
        console.log(response)
        return response.data.cards;
      }
      else if (manaValue && color.length) {
        const response = await axios.get(`https://api.magicthegathering.io/v1/cards?colorIdentity=${color}&cmc=${manaValue}`);
        return response.data.cards;
      }
      else {
        return getCards()
      }
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
  
  // Add onclick effect to search button
  // clears field and searches for card matching string in search
  const formSubmission = () => {
    let form = document.getElementById("form-search");
    form.addEventListener('submit', async (event) => {
      // let searchBar = document.getElementById("searchbar").value;
      // let searchData = await searchCards(searchBar);
      // displayCards(searchData);
      event.preventDefault();
      let manaValue = form.manaCost.value;
      let searchValue = form.searchbar.value;
      let colorsElements = document.getElementsByName('colors');
      let colorsArray = Array.from(colorsElements);
      let colorsValue = [];
  
      if (manaValue === "Mana Cost") {
        manaValue = null;
      }
  
      for (let elem of colorsArray) {
        if (elem.checked) {
          colorsValue.push(elem.value)
        }
      }
  
      let colorString = colorsValue.join('|');
  
      let retrievedCards = await searchCards(searchValue, manaValue, colorString);
      form.reset();
      displayCards(retrievedCards);
    });
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
    formSubmission();
    showAllCards();
    displayCards(cards);
  })();
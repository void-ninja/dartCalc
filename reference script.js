//Our Cards
//card data as JSON with key value pairs
const cardData = [
    {
        cardName: "Mayor of Avabruck // Howlpack Alpha",
        tcgID: "52169"
    },
    {
        cardName: 'Drowned Catacomb',
        tcgID: '142036',
    },
    {
        cardName: 'Fetid Heath',
        tcgID: '161475',
    },
    {
        cardName: 'Heritage Druid',
        tcgID: '17994',
    },
    {
        cardName: 'Thalia\'s Lieutenant',
        tcgID: '115913',
    },
    {
        cardName: 'Elvish Champion',
        tcgID: '12634',
    },
    {
        cardName: 'Marble Titan',
        tcgID: '12730',
    },
    {
        cardName: 'Auger of Autumn',
        tcgID: '247987',
    },
    {
        cardName: 'Haunted Ridge',
        tcgID: '249604',
    },
    {
        cardName: 'Temple of Deceit',
        tcgID: '207637',
    },
    {
        cardName: 'Choked Estuary',
        tcgID: '115920',
    },

]

/*********** */
// GLOBALS
/*********** */
// Scryfall API base URL
const apiUrl = 'https://api.scryfall.com/cards/tcgplayer/';
const tcgStoreID = '41d445b2';
let cardObj = [];
let looped = 0;
// TCG URL link to speicif card and my store
// https://www.tcgplayer.com/product/240045/?seller=41d445b2


/*********** */
// FUNCTIONS
/*********** */
// API Fetch function that also inserts our card image into the DOM
async function fetchData(url) {
    const response = await fetch(url);
    const data = await response.json();
    return data;
}

// Loop over our card data and run fetch for each card, callback to run after the foreach is complete
async function loop(callback) {
    cardData.forEach(async card => {
        url = apiUrl+card.tcgID;
        await fetchData(url).
        then(data => {
            cardObj.push(data);
        });
        callback();
    });
}

//Counds the loop() and if equal to cards in cardData run addCard. Needed so we know the loop has finished and pushed the card src before starting the addCard funciton.
function count() {
    looped = looped + 1;
    if (looped == cardData.length) {
        addCard();
    }
};

//Inserts each card into the DOM
function addCard() {
    for ( let i in cardObj) {
        let cardNum = parseFloat(i) + 1;
        //put each card here for ease of use below
        let theCard = cardObj[i];

        //log this so I can see in to the object for key value names
        console.log(theCard);
        const singleDiv = document.createElement("div");
        singleDiv.className = "card-single";
        singleDiv.id = "single" + cardNum;

        const createImg = document.createElement("img");
        const createImg2 = document.createElement("img");
        const createDiv = document.createElement("div");
        const createCardDiv = document.createElement("div");
        const createFlipDiv = document.createElement("div");
        const createFlipDiv2 = document.createElement("div");
        const createP = document.createElement("p");
        const createLink = document.createElement("a");
        const createNode = document.createTextNode(cardNum+'. '+theCard.name);

        createLink.href = "https://www.tcgplayer.com/product/" + theCard.tcgplayer_id + "/?seller=41d445b2"
        createLink.id = "link" + cardNum;
        createLink.className = "cardLink";
        //console.log(createLink);
        createDiv.id = "card" + cardNum;
        createCardDiv.id = "cardimg" + cardNum;
        document.getElementById("cards").appendChild(singleDiv);

        if (theCard.hasOwnProperty('card_faces')) {
            createFlipDiv.class = "flipDiv"
            createFlipDiv.id = "flip1"
            document.getElementById("single" + cardNum).appendChild(createFlipDiv);
            createFlipDiv2.class = "flipDiv"
            createFlipDiv2.id = "flip2"
            document.getElementById("single" + cardNum).appendChild(createFlipDiv2);
            createImg.src = theCard.card_faces[0].image_uris.normal;
            createImg.id = "side1"
            createImg2.id = "side2"
            createImg.className = "flipImg"
            createImg2.className = "flipImg"
            createImg2.src = theCard.card_faces[1].image_uris.normal;
            createP.appendChild(createNode);
            createDiv.className = "flipCardDiv";
            
            document.getElementById("single" + cardNum).appendChild(createLink).setAttribute('target', '_blank');
            document.getElementById("link" + cardNum).appendChild(createDiv);
            document.getElementById("card" + cardNum).appendChild(createFlipDiv);
            document.getElementById("card" + cardNum).appendChild(createFlipDiv2);
            document.getElementById("flip1").appendChild(createImg);
            document.getElementById("flip2").appendChild(createImg2);
            document.getElementById("link" + cardNum).appendChild(createP);
        }else {
            createDiv.className = "cardDiv";
            createImg.src = theCard.image_uris.normal;
            createP.appendChild(createNode);
            document.getElementById("single" + cardNum).appendChild(createLink).setAttribute('target', '_blank');
            document.getElementById("link" + cardNum).appendChild(createDiv);
            document.getElementById("card" + cardNum).appendChild(createImg);
            document.getElementById("link" + cardNum).appendChild(createP);
        }
    }
}



loop(count);

//********************************************* */
// These functions below do the same thing as above but with the fetch promise and then funcitons to keep all the fetches from happening at the same time and seeming to load randomly.
//********************************************* */

/*
function cardLove() {
    cardData.forEach(card => {
      let url = apiUrl+card.tcgID;
      
      fetch(url)
        .then(response => response.json())
        .then(card => newCard(card))
        .catch(err => console.log(err));   
    });   
  }
  cardLove();
  
// add the card to the DOM
function newCard(data1) {
    const createImg = document.createElement("img");
    createImg.src = data1.image_uris.normal;
    document.getElementById("cards").appendChild(createImg);
  }
*/
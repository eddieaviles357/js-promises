const DECKCARDS_URL = 'https://deckofcardsapi.com/api';
// 1. Make request to deck of cards api using async await
async function getOneCardCall() {
    try {
        let {cards} = await $.getJSON(`${DECKCARDS_URL}/deck/new/draw/?count=1`);
        console.log(`${cards[0].value} of ${cards[0].suit}`)
    } catch (error) {
        return new Error(err.message)
    }
};

getOneCardCall();

// 2. Using async await, make a req to the deck of cards API to get a single card from a newly shuffled deck. 
// When we have the card, make a req to the API to get one more card from the same deck.
// let cardsArr = [];
async function getTwoCardsFromShuffledDeck(){
    try {
        let {deck_id} = await $.getJSON(`${DECKCARDS_URL}/deck/new`);
        let d1 = await $.getJSON(`${DECKCARDS_URL}/deck/${deck_id}/draw/?count=1`);
        let d2 = await $.getJSON(`${DECKCARDS_URL}/deck/${deck_id}/draw/?count=1`);
        Array(d1,d2).forEach( deck => console.log(`${deck.cards[0].value} of ${deck.cards[0].suit}`) );
    } catch (err) {
        return new Error(err.message)
    }
};

getTwoCardsFromShuffledDeck();

// 3. Using async await make an HTML page that lets you draw cards from a deck. 
// When the page loads, make a call to the Deck of Cards API to create a new deck, 
// then show a button on the page that draws a card. 
// Every time you click the button, display a new card, until there are no cards left in the deck.
$(function() {
    let $container = $('#container');
    let id = ''
    let $cardBtn = $('<button class="btn btn-primary d-block mx-auto">button</button>');
    async function initShuffle() {
        try {
            $('#btn').append($cardBtn);
            let {deck_id} = await $.getJSON(`${DECKCARDS_URL}/deck/new/shuffle/`);
            // when user clicks on btn get a card
            $cardBtn.on('click', getCardFromDeck)
            id = deck_id;
        } catch (err) {
            return new Error(err.message)
        }
    }
    initShuffle();

    async function getCardFromDeck(e) {
        try {
            // calculate x axis px by x amount
            let height = window.innerHeight
            let x = Math.floor(Math.random() * (height - (height/2)) + (height/2))
            let styles = "position: absolute;"
            // get a single card until no more are available
            let data = await $.getJSON(`${DECKCARDS_URL}/deck/${id}/draw`)
            // remove button let user know there are no more cards
            console.log(data.remaining)
            if( data.remaining <= 0 ) {
                $cardBtn.remove()
                alert('No more cards')
            }
            // add card to list and display image
            $('#container').append($(`<li style="position: absolute;top: 50vh;left: ${x}px;list-style: none;"><img src=${data.cards[0].image}></li>`));
        } catch (err) {
            return new Error(err.message)
        }

    }



});
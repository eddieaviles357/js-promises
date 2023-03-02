$(function() {
    let $container = $('#container');
    const DECKCARDS_URL = 'https://deckofcardsapi.com/api';
    // 1. Make request to deck of cards api
    $.getJSON(`${DECKCARDS_URL}/deck/new/draw/?count=1`)
    .then(deck => console.log(`${deck.cards[0].value} of ${deck.cards[0].suit}`))
    .catch(err => new Error(err.message))


    // 2. Make a req to the deck of cards API to get a single card from a newly shuffled deck. 
    // When we have the card, make a req to the API to get one more card from the same deck.
    // let cardsArr = [];
    $.getJSON(`${DECKCARDS_URL}/deck/new`)
    .then(deck => $.getJSON(`${DECKCARDS_URL}/deck/${deck.deck_id}/draw/?count=1`) )
    .then(deck => {
        cardsArr.push(deck)
        // return promise, we going to use it to chain
        return $.getJSON(`${DECKCARDS_URL}/deck/${deck.deck_id}/draw/?count=1`)
    })
    .then(deck => {
        cardsArr.push(deck)
        cardsArr.forEach( deck => console.log(`${deck.cards[0].value} of ${deck.cards[0].suit}`) )
    })
    .catch(err => new Error(err.message))

    // 3. HTML page that lets you draw cards from a deck. 
    // When the page loads, make a call to the Deck of Cards API to create a new deck, 
    // then show a button on the page that draws a card. 
    // Every time you click the button, display a new card, until there are no cards left in the deck.
    let deckId = '';
    let $cardBtn = $('<button class="btn btn-primary d-block mx-auto">button</button>');
    // get a new decked that is shuffled
    $.getJSON(`${DECKCARDS_URL}/deck/new/shuffle/`)
    .then(deck => { 
        deckId = deck.deck_id;
        $('#btn').append($cardBtn)
    })
    .catch(err => new Error(err.message))

    // when user clicks on btn get a card
    $cardBtn.on('click', getCardFromDeck)

    function getCardFromDeck(e) {
        // calculate x axis px by x amount
        let height = window.innerHeight
        let x = Math.floor(Math.random() * (height - (height/2)) + (height/2))
        let styles = "position: absolute;"

        // get a single card until no more are available
        $.getJSON(`${DECKCARDS_URL}/deck/${deckId}/draw`)
        .then(data => {
            // remove button let user know there are no more cards
            if(data.remaining<=0){
                $cardBtn.remove()
                alert('No more cards')
            }
            // add card to list and display image
            $('#container')
            .append(
                $(`<li style="position: absolute;top: 50vh;left: ${x}px;list-style: none;">
                    <img src=${data.cards[0].image}>
                </li>`)
            )
        })
        .catch(err => new Error(err.message))
    }
});
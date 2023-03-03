const URL = "http://numbersapi.com";

// 1. Make request to Nubmers API get a fact
// about a random number using async await
async function getOneNumFact() {
    try {
        let $one = $('.one');
        let data = await $.getJSON(`${URL}/13?json`);
        $one.append(`Make a call to Numbers API: ${data.text}`);
    } catch (err) {
        return new Error(`Something happened: ${err.message}`);
    }
};

// 2.
// Get data on multiple numbers in a single request using async await
async function getMultipleNumbersFact() {
    try {
        let $two = $('.two');
        let numbersArr = [1, 10, 5];
        let data = await $.getJSON(`${URL}/${numbersArr}?json`);
        numbersArr.forEach(num => $two.append($(`<li>${data[num]}</li>`)));        
    } catch (err) {
        return new Error(`Something happened: ${err.message}`);
    }
}

// 3.
// Get 4 facts about a number list. Once all are present, 
// put them on the page. It’s okay if some of the facts are repeats.
async function getFourFactsAboutNumbers() {
    try {
        let $three = $('.three');
        let nums = [9, 7, 5, 2];
        let data = await Promise.all( nums.map( num => $.getJSON(`${URL}/${num}?json`) ) );
        data.forEach(numData => $three.append(`<li>${numData.text}</li>`));
    } catch (error) {
        return new Error(`Something happened: ${err.message}`);
    }
}

getOneNumFact();
getMultipleNumbersFact();
getFourFactsAboutNumbers();
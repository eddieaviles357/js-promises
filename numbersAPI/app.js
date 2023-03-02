let number = 13;
let URL = "http://numbersapi.com";
let $one = $('.one');
let $two = $('.two');
let $three = $('.three');
// 1. Make request to Nubmers API get a fact
// about a random number
$.getJSON(`${URL}/${number}?json`)
.then(data => {
  $one.append(`Make a call to Numbers API: ${data.text}`);
})
.catch(err => console.log(err));

// 2.
// Get data on multiple numbers in a single request.
let numbersArr = [number, number-1, number-2]; // 13,12,11
$.getJSON(`${URL}/${numbersArr}?json`)
.then(data => {
    numbersArr.forEach(num => $two.append($(`<li>${data[num]}</li>`)));
});

// 3.
// Get 4 facts about a number list. Once all are present, 
// put them on the page. It’s okay if some of the facts are repeats.
let numbersArr2 = [number, number+1, number+2, number+3]
Promise.all(numbersArr2.map(num => $.getJSON(`${URL}/${num}?json`)))
.then(data => data.forEach(numData => $three.append(`<li>${numData.text}</li>`)))
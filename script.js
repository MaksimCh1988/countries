'use strict';

const btn = document.querySelector('.btn-country');
const countriesContainer = document.querySelector('.countries');

//////////////////////////////////////////////////////

function getCountry(country) {
  const request = new XMLHttpRequest();
  request.open('GET', 'https://restcountries.com/v3.1/name/' + country);
  //отправлем запрос который выполнится не сразу
  request.send();
  //console.log(this.responseText); //не сработает undefined
  request.addEventListener('load', function () {
    const [data] = JSON.parse(this.responseText); //получем массив ,а в нём объект-страна
    console.log(data); //объект - страна

    const html = `<article class="country">
  <img class="country__img" src="${data.flags.svg}" />
  <div class="country__data">
    <h3 class="country__name">${data.name.common}</h3>
    <h4 class="country__region">${data.region}</h4>
    <p class="country__row"><span>👨‍👩‍👧‍👦</span>${(
      +data.population / 1000000
    ).toFixed(1)} mln </p>
    <p class="country__row"><span>🗣️</span>${Object.values(data.languages)}</p>
    <p class="country__row"><span>💰</span>${
      data.currencies[Object.keys(data.currencies)].name
    }
      ${data.currencies[Object.keys(data.currencies)].symbol}
    </p>
  </div>
  </article>`;

    countriesContainer.insertAdjacentHTML('beforeend', html);
    countriesContainer.style.opacity = 1;
  });
}

btn.addEventListener('click', () => {
  getCountry(document.querySelector('.country-field').value.toLowerCase());
});

//getCountry(document.querySelector('.country-field').value.toLowerCase())

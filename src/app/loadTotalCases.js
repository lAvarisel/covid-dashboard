import fetch from 'cross-fetch';

export default function loadTotalCases(url) {
  fetch(url).then((response) => {
    response.json().then((text) => {
      console.log(text.Global.TotalConfirmed); 
    });
  });
}


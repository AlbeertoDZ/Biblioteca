let apiKey = '59rgoctL1gJh4R9A5NWAFMDcEe9TGvsi';

fetch(`https://api.nytimes.com/svc/books/v3/lists/best-sellers/history.json?api-key=${apiKey}`)
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(error));
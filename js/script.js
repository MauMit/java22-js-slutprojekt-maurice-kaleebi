const imgContainer = document.querySelector('#imgContainer');

document.querySelector('button').addEventListener('click', getUserInput);

// Hämtar user input och antingen skickar den till getImages eller får man en error text
function getUserInput(event) {
    event.preventDefault(); // 
    const imageSearchInputValue = document.querySelector('#imageSearchInput').value
    const quantityInputValue = document.querySelector('#quantity').value
    const sortImagesInputValue = document.querySelector('#sort').value;

    console.log(imageSearchInputValue);
    console.log(quantityInputValue);

    document.querySelector('#imageSearchInput').focus();
    imgContainer.innerHTML = '';



    if (imageSearchInputValue != '' && quantityInputValue != '' && quantityInputValue > 0) {
        getImages(imageSearchInputValue, quantityInputValue, sortImagesInputValue);
    } else {
        const noInputsH1 = document.createElement('h1') 
        imgContainer.append(noInputsH1)
        noInputsH1.innerText = 'You need to Enter a name and quantity'
    }
}


//Hämtar data från flickr, om något går fel visas ett felmeddelande i browsern
function getImages(imageSearchInputValue, quantityInputValue, sortImagesInputValue) {


    const url = `https://www.flickr.com/services/rest/?method=flickr.photos.search&api_key=52d93dbe516f223b598f9779ab93db42&text=${imageSearchInputValue}&sort=${sortImagesInputValue}&per_page=${quantityInputValue}&format=json&nojsoncallback=1`;



    console.log(url);
    fetch(url)
        .then(response => {
            console.log(response);
            if (response.status >= 200 && response.status < 300) {
                return response.json();
            } else {
                throw 'Something Wrong Went Wrong'
            }
        })
        .then(displayImages)
        .catch(error => {
            console.log(error);
            const errorH1 = document.createElement('h1')
            imgContainer.append(errorH1)
            errorH1.innerText = 'Something Wrong Went Wrong'
        });
}


//  Hämtar data som är nödvänding från varje bild och visa bilden, om inga bilder finns visa error
function displayImages(photoInfo) {


    if (photoInfo.photos.photo.length == 0) {
        const noResultsFoundH1 = document.createElement('h1');
        imgContainer.append(noResultsFoundH1)
        noResultsFoundH1.innerText = 'No results found'
    }


    photoInfo.photos.photo.forEach(photo => {
        const img = document.createElement('img');

        const size = document.querySelector('#size').value;
        const id = photo.id;
        const secret = photo.secret;
        const server = photo.server;

        const completeImgUrl = `https://live.staticflickr.com/${server}/${id}_${secret}_${size}.jpg`; // bygger min länk

        img.src = completeImgUrl;

        const link = document.createElement('a');

        imgContainer.append(link)

        link.append(img)

        link.href = completeImgUrl;
        link.target = '_blank';


    })


}
// npm install -g npm@7.5.4 update npm

const imageContainer = document.getElementById('image-container');
const loader = document.getElementById('loader');
const showError = document.querySelector('.showError');

let ready = false;
let imagesLoaded = 0;
let totalImages = 0;
let photosArray = [];

let count = 5;
const apiKey = 'rIN2SGGA9TWG_knBsYdnGkv3P4Dzyo72KjiVdeNXJPs';
let apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query='coffee cup'`;

// Check if all iamges were loaded
function imageLoaded() {
  imagesLoaded++;
  if (imagesLoaded === totalImages) {
    ready = true;
    loader.hidden = true;
    count = 30;
    apiURL = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}&query='coffee cup'`;
  }
}

// Helper function to set Attribute on DOM Element
/**
 *
 * @comment {*} for is not a good idea when the app will be big
 * because to do iterations could be more costs when you deploy your app
 */
function setAttributes(element, attributes) {
  for (const key in attributes) {
    element.setAttribute(key, attributes[key]);
  }
}

//Create Elements for Links & Photos

function displayPhotos() {
  imagesLoaded = 0;
  totalImages = photosArray.length;

  photosArray.forEach(photo => {
    const item = document.createElement('a');
    // item.setAttribute('href', photo.links.html);
    // item.setAttribute('targe', '_blank');
    setAttributes(item, {
      href: photo.links.html,
      target: '_blank',
    });

    //Create Image
    const img = document.createElement('img');
    img.setAttribute('src', photo.urls.regular);
    img.setAttribute('alt', photo.alt_description);
    img.setAttribute('title', photo.alt_description);

    //Event Listener, check when each is finished loading
    img.addEventListener('load', imageLoaded);

    // img inside a
    item.appendChild(img);
    imageContainer.appendChild(item);
  });
}

// Get photos from unsplash API

async function getPhotos() {
  try {
    const response = await fetch(apiURL);
    photosArray = await response.json();

    displayPhotos();
  } catch (error) {
    console.log('!OMG SERVER API it does not working 😵');
    loader.hidden = true;
    const text = document.createElement('p');
    text.classList.add('center');
    showError.appendChild(text).textContent =
      '!OMG SERVER API it does not working 😵';
  }
}

// Check to see if scrolling near bottom of page, Load more Photos
window.addEventListener('scroll', () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 &&
    ready
  ) {
    ready = false;
    getPhotos();
  }
});

// OnLoad

getPhotos();

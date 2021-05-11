const imageContanier = document.getElementById('image-container');
const loader = document.getElementById('loader');

let photoArray = []; // img Array
let ready = false; // when the pages first loaded
let loadImageNumber = 0; // when first loaded and loaded 5 img Later
let totalImages = 0;

// Unsplash Api Get Photo Variable
const count = 5;
const apiKey = 'TdW6Q_d4WEYrCXIfQ9b_bhyV2EKYDokB2u8z41g5QUU';
const apiUrl = `https://api.unsplash.com/photos/random/?client_id=${apiKey}&count=${count}`;

// Check if all images were loaded
function imageLoaded() {
    loadImageNumber++;
    if (loadImageNumber === totalImages) {
        ready = true;
        loader.hidden = true;
    }
}

// Helper Function To Set Attributes on Dom Elements
function setAttributes(element, attributes) {
    for (const key in attributes) {
        element.setAttribute(key, attributes[key]);
    }
}

// Create Element For Links
function displayPhoto() {
    loadImageNumber = 0;
    totalImages = photoArray.length; // 30 images
    photoArray.forEach((photo) => {
        // Click On Photo To Link To unsplash <a>
        const item = document.createElement('a');
        setAttributes(item, {
            href: photo.links.html,
            target: '_blank',
        });
        // Create <img> for photo
        const img = document.createElement('img');
        setAttributes(img, {
            src: photo.urls.regular,
            alt: photo.alt_description,
            title: photo.alt_description,
        });
        // Check When each img is Finished loading
        img.addEventListener('load', imageLoaded);
        // Put <img> inside <a> 
        item.appendChild(img);
        imageContanier.appendChild(item); // imageContanier, item (a), img
    });
}


// Get Photos from Unsplash Api 
async function getPhotos() {
    try {
        const response = await fetch(apiUrl);
        photoArray = await response.json();
        displayPhoto();
    } catch (error) {

    }
}

// Scrolling and Loading new Photo From Api
window.addEventListener('scroll', () => {
    if (window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false;
        getPhotos();
    }
});


getPhotos();
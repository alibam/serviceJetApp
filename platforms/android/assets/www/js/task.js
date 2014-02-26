var pictureSource; // picture source
var destinationType; // sets the format of returned value

// Wait for device API libraries to load
document.addEventListener("deviceready", onDeviceReady, false);

// device APIs are available
function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
}

// Called when a photo is successfully retrieved
function onPhotoDataSuccess(imageData) {
    // Uncomment to view the base64-encoded image data
    // console.log(imageData);
    // Get image handle
    var smallImage = document.getElementById('smallImage');

    // Unhide image elements
    //smallImage.style.display = 'block';
    document.getElementById('PicShow').style.display = 'block';

    // Show the captured photo
    // The in-line CSS rules are used to resize the image
    smallImage.src = "data:image/jpeg;base64," + imageData;
}

// A button will call this function
//
function capturePhoto() {
    // Take picture using device camera and retrieve image as base64-encoded string
    navigator.camera.getPicture(onPhotoDataSuccess, onFail, {
        quality : 50,
        destinationType : destinationType.DATA_URL
    });
}

// Called if something bad happens.
function onFail(message) {
    alert('Failed because: ' + message);
}

//$(document).ready(function() {
//    $("#capture").bind("click", capturePhoto());
//});
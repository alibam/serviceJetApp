        var pictureSource;   // picture source
        var destinationType; // sets the format of returned value
        
        var storage; //call localstorage
    
        document.addEventListener("deviceready",onDeviceReady,false);
    
        function onDeviceReady() {
            pictureSource=navigator.camera.PictureSourceType;
            destinationType=navigator.camera.DestinationType;
            storage = window.localStorage;
            
            var photoUri = storage.getItem("photoUri");
            if(photoUri){
                $("#userImg").attr("src",photoUri);
            }
            
            $("#userImg").click(function(){
                capturePhoto();
            });
        }
    
        function onPhotoURISmallSuccess(imageData) {
          //alert(imageData);
          $("#userImg").attr("src",imageData);
          storage.removeItem("photoUri");
          storage.setItem("photoUri",imageData);
        }
        
        function onFail(message) {
            var photoUri = storage.getItem("photoUri");
            if(photoUri){
                $("#userImg").attr("src",photoUri);
            }
        }
    
        function capturePhoto() {
          // FILE_URL
          navigator.camera.getPicture(onPhotoURISmallSuccess, onFail, { quality: 50,destinationType: destinationType.FILE_URI });
        }
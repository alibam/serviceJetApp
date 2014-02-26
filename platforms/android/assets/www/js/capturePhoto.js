
var pictureSource; // picture source
var destinationType; // sets the format of returned value

var storage; // call localstorage

function onDeviceReady() {
    pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
    storage = window.localStorage;

    var photoUri = storage.getItem("capturePhoto");
    if (photoUri) {
        document.getElementById('PicShow').style.display = 'block';
        $("#smallImage").attr("src", photoUri);
    }
}

function onPhotoURISmallSuccess(imageData) {
    document.getElementById('PicShow').style.display = 'block';
    // alert(imageData);
    $("#smallImage").attr("src", imageData);
}

function onFail(message) {

}

function capturePhoto() {
    // FILE_URL
    navigator.camera.getPicture(onPhotoURISmallSuccess, onFail, {
        quality : 50,
        destinationType : destinationType.FILE_URI
    });
}

function check() {
    var flag = true;
    $("#DeviceCheckItem .btn-group").each(function() {
        if (!$(this).data("result")) {
            flag = false;
            return false;
        }
    });
    return flag;
}

$(function() {
    document.addEventListener("deviceready", onDeviceReady, false);

    $("#DeviceCheckItem .btn-group").on("click", "button", function() {
        $(this).addClass($(this).data("color")).siblings().each(function() {
            $(this).removeClass($(this).data("color"));
        });

        $(this).parent(".btn-group").data("result", $(this).data("color"));
    });

    $("#capture").click(function() {
        capturePhoto();
    });

    $("#endtask").click(function() {
        if (check()) {
            var capturePhoto = $("#smallImage").attr("src");
            storage.setItem("capturePhoto", capturePhoto);
            alert("任务提交成功。");
            history.back();
        } else {
            alert("还有未完成的检查项。");
        }
    });
})
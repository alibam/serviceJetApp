
var pictureSource; // picture source
var destinationType; // sets the format of returned value

var storage; // call localstorage
function onDeviceReady() {
	pictureSource = navigator.camera.PictureSourceType;
    destinationType = navigator.camera.DestinationType;
    storage = window.localStorage;
	
	var db = window.openDatabase("serviceJetDB", "1.0", "serviceJetDB", 1000000);
	db.transaction(queryDB,errorCB);
}

function onPhotoURISmallSuccess(imageData) {
    document.getElementById('PicShow').style.display = 'block';
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
    var localImg = $("#smallImage").attr("src");
    $("#DeviceCheckItem .btn-group").each(function() {
        if (!$(this).data("result") || !localImg) {
            flag = false;
            return false;
        }
    });
    return flag;
}

//事务执行失败后的回调函数
function errorCB(err) {
   	alert("Error processing SQL: "+err.code+"---"+err.message);
}

//查询数据库
function queryDB(tx) {
	var selectRouteId = storage.getItem("selectRouteId");
	storage.removeItem("selectRouteId");
	$("#routeid").data("selectrouteid",selectRouteId)
	tx.executeSql('SELECT * FROM tb_route where id =?', [selectRouteId], querySuccess, errorCB);
}

// 查询成功后调用的回调函数
function querySuccess(tx, results) {
	if(results.rows.length){
		$("#serialNum").text(results.rows.item(0).serialNum);
		$("#modelNum").text(results.rows.item(0).modelNum);
		$("#deviceIp").text(results.rows.item(0).deviceIp);
		//alert(results.rows.item(0).deviceParam);
		var deviceParams = JSON.parse(results.rows.item(0).deviceParam);
		$("#checkParamsCount").text(deviceParams.length);
		
		if(results.rows.item(0).deviceResult){
			var deviceResults = JSON.parse(results.rows.item(0).deviceResult);
			document.getElementById('PicShow').style.display = 'block';
		    $("#smallImage").attr("src", deviceResults.localImg);
		}
	}
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
        	var localImg = $("#smallImage").attr("src");
        	var selectRouteId = $("#routeid").data("selectrouteid")
        	var deviceResult = '{';
            $("#DeviceCheckItem .btn-group").each(function() {
            	deviceResult += '"'+$(this).data("param")+'":"'+$(this).data("result")+'",';
            });
            deviceResult = deviceResult +'"localImg":"'+localImg+'","remoteImg":""}';
            var db = window.openDatabase("serviceJetDB", "1.0", "serviceJetDB", 1000000);
            db.transaction(function(tx){
            	tx.executeSql("update tb_route set deviceResult = ? ,isFinished = ? where id = ?",
            			[deviceResult,'1',selectRouteId],
            			function(tx,results){
            				alert("任务提交成功。");
            				history.back();
            			}
            	);
            },errorCB);
            //alert("任务提交成功。");
            //history.back();
        } else {
            alert("还有未完成的检查项。");
        }
    });
})
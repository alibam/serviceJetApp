var pictureSource;   // picture source
var destinationType; // sets the format of returned value
var storage; // call localstorage
var db;
function onDeviceReady() {
	pictureSource=navigator.camera.PictureSourceType;
    destinationType=navigator.camera.DestinationType;
	storage = window.localStorage;
	db = window.openDatabase("serviceJetDB", "1.0", "serviceJetDB", 1000000);
	var isInited = storage.getItem("initStatus");
	if(!isInited){
		db.transaction(populateDB, errorCB, successCB);
	}else{
		db.transaction(queryDB,errorCB);
	}
	
	var photoUri = storage.getItem("photoUri");
    if(photoUri){
        $("#userImg").attr("src",photoUri);
    }
    
    $("#userImg").click(function(){
        capturePhoto();
    });
}
////////////////////////////////////////////////save userImg
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

  ///////////////////////////////////////////////////database
function populateDB(tx) {
	tx.executeSql('drop table if exists tb_user;');
	tx.executeSql('create table tb_user ('+
					'id integer primary key,'+
					'loginName  text not null unique,'+
					'userName   text not null,'+
					'password   text not null,'+
					'deptName   text,'+
					'company 	 text,'+
					'localImg   text,'+
					'remoteImg  text,'+
					'remark     text'+
				');');
	
	tx.executeSql('drop table if exists tb_task;');
	tx.executeSql('create table tb_task ('+
					'id integer primary key,'+
					'taskName text not null,'+
					'taskDate text not null,'+
					'taskBegin text not null,'+
					'taskEnd  text not null,'+
					'userId   integer not null,'+
					'remark   text,'+
					'FOREIGN KEY(userId) REFERENCES tb_user(id)'+
				');');
	
	tx.executeSql('drop table if exists tb_route;');
	tx.executeSql('create table tb_route ('+
					'id integer primary key,'+
					'deviceNum  text not null,'+
					'serialNum  text not null,'+
					'modelNum   text not null,'+
					'deviceIp   text,'+
					'isFinished text not null default \'0\','+
					'taskId integer,'+
					'routePriority integer,'+
					'isUploaded text not null default \'0\','+
					'deviceParam text,'+
					'deviceResult text,'+
					'remark     text,'+
					'FOREIGN KEY(taskId) REFERENCES tb_task(id)'+
				');');
				
			
	tx.executeSql("insert into tb_user (loginName,userName,password,deptName,company) values('guogl','郭贵礼','123456','企业信息化部','电信天翼');");
	
	tx.executeSql("insert into tb_task (taskName,taskDate,taskBegin,taskEnd,userId) values('朝阳门国家机房7002设备巡检','20140228','07:00','09:00',1);");
	tx.executeSql("insert into tb_task (taskName,taskDate,taskBegin,taskEnd,userId) values('朝阳门国家机房7003设备巡检','20140228','07:00','09:00',1);");
	tx.executeSql("insert into tb_task (taskName,taskDate,taskBegin,taskEnd,userId) values('朝阳门国家机房7004设备巡检','20140228','07:00','09:00',1);");
	tx.executeSql("insert into tb_task (taskName,taskDate,taskBegin,taskEnd,userId) values('朝阳门国家机房7005设备巡检','20140228','07:00','09:00',1);");
	tx.executeSql("insert into tb_task (taskName,taskDate,taskBegin,taskEnd,userId) values('朝阳门国家机房7006设备巡检','20140228','07:00','09:00',1);");
	tx.executeSql("insert into tb_task (taskName,taskDate,taskBegin,taskEnd,userId) values('朝阳门国家机房7007设备巡检','20140228','07:00','09:00',1);");
	
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0001','SN-7002001011','Model-098765445678','10.3.75.183',1,1,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0002','SN-7002001012','Model-098765445678','10.3.75.183',1,2,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0003','SN-7002001013','Model-098765445678','10.3.75.183',1,3,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0004','SN-7002001014','Model-098765445678','10.3.75.183',1,4,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0005','SN-7002001015','Model-098765445678','10.3.75.183',1,5,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0006','SN-7002001016','Model-098765445678','10.3.75.183',1,6,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0007','SN-7002001017','Model-098765445678','10.3.75.183',1,7,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0008','SN-7002001018','Model-098765445678','10.3.75.183',1,8,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0009','SN-7002001019','Model-098765445678','10.3.75.183',1,9,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00010','SN-70020010110','Model-098765445678','10.3.75.183',1,10,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00011','SN-70020010111','Model-098765445678','10.3.75.183',1,11,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00012','SN-70020010112','Model-098765445678','10.3.75.183',1,12,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00013','SN-70020010113','Model-098765445678','10.3.75.183',1,13,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00014','SN-70020010114','Model-098765445678','10.3.75.183',1,14,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00015','SN-70020010115','Model-098765445678','10.3.75.183',1,15,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	
	
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0001','SN-7002001011','Model-098765445678','10.3.75.183',2,1,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0002','SN-7002001012','Model-098765445678','10.3.75.183',2,2,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0003','SN-7002001013','Model-098765445678','10.3.75.183',2,3,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0004','SN-7002001014','Model-098765445678','10.3.75.183',2,4,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0005','SN-7002001015','Model-098765445678','10.3.75.183',2,5,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0006','SN-7002001016','Model-098765445678','10.3.75.183',2,6,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0007','SN-7002001017','Model-098765445678','10.3.75.183',2,7,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0008','SN-7002001018','Model-098765445678','10.3.75.183',2,8,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0009','SN-7002001019','Model-098765445678','10.3.75.183',2,9,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00010','SN-70020010110','Model-098765445678','10.3.75.183',2,10,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00011','SN-70020010111','Model-098765445678','10.3.75.183',2,11,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00012','SN-70020010112','Model-098765445678','10.3.75.183',2,12,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00013','SN-70020010113','Model-098765445678','10.3.75.183',2,13,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00014','SN-70020010114','Model-098765445678','10.3.75.183',2,14,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00015','SN-70020010115','Model-098765445678','10.3.75.183',2,15,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");

	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0001','SN-7002001011','Model-098765445678','10.3.75.183',3,1,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0002','SN-7002001012','Model-098765445678','10.3.75.183',3,2,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0003','SN-7002001013','Model-098765445678','10.3.75.183',3,3,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0004','SN-7002001014','Model-098765445678','10.3.75.183',3,4,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0005','SN-7002001015','Model-098765445678','10.3.75.183',3,5,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0006','SN-7002001016','Model-098765445678','10.3.75.183',3,6,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0007','SN-7002001017','Model-098765445678','10.3.75.183',3,7,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0008','SN-7002001018','Model-098765445678','10.3.75.183',3,8,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0009','SN-7002001019','Model-098765445678','10.3.75.183',3,9,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00010','SN-70020010110','Model-098765445678','10.3.75.183',3,10,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00011','SN-70020010111','Model-098765445678','10.3.75.183',3,11,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00012','SN-70020010112','Model-098765445678','10.3.75.183',3,12,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00013','SN-70020010113','Model-098765445678','10.3.75.183',3,13,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00014','SN-70020010114','Model-098765445678','10.3.75.183',3,14,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00015','SN-70020010115','Model-098765445678','10.3.75.183',3,15,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");

	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0001','SN-7002001011','Model-098765445678','10.3.75.183',4,1,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0002','SN-7002001012','Model-098765445678','10.3.75.183',4,2,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0003','SN-7002001013','Model-098765445678','10.3.75.183',4,3,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0004','SN-7002001014','Model-098765445678','10.3.75.183',4,4,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0005','SN-7002001015','Model-098765445678','10.3.75.183',4,5,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0006','SN-7002001016','Model-098765445678','10.3.75.183',4,6,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0007','SN-7002001017','Model-098765445678','10.3.75.183',4,7,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0008','SN-7002001018','Model-098765445678','10.3.75.183',4,8,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0009','SN-7002001019','Model-098765445678','10.3.75.183',4,9,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00010','SN-70020010110','Model-098765445678','10.3.75.183',4,10,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00011','SN-70020010111','Model-098765445678','10.3.75.183',4,11,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00012','SN-70020010112','Model-098765445678','10.3.75.183',4,12,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00013','SN-70020010113','Model-098765445678','10.3.75.183',4,13,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00014','SN-70020010114','Model-098765445678','10.3.75.183',4,14,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00015','SN-70020010115','Model-098765445678','10.3.75.183',4,15,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");

	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0001','SN-7002001011','Model-098765445678','10.3.75.183',5,1,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0002','SN-7002001012','Model-098765445678','10.3.75.183',5,2,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0003','SN-7002001013','Model-098765445678','10.3.75.183',5,3,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0004','SN-7002001014','Model-098765445678','10.3.75.183',5,4,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0005','SN-7002001015','Model-098765445678','10.3.75.183',5,5,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0006','SN-7002001016','Model-098765445678','10.3.75.183',5,6,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0007','SN-7002001017','Model-098765445678','10.3.75.183',5,7,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0008','SN-7002001018','Model-098765445678','10.3.75.183',5,8,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0009','SN-7002001019','Model-098765445678','10.3.75.183',5,9,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00010','SN-70020010110','Model-098765445678','10.3.75.183',5,10,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00011','SN-70020010111','Model-098765445678','10.3.75.183',5,11,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00012','SN-70020010112','Model-098765445678','10.3.75.183',5,12,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00013','SN-70020010113','Model-098765445678','10.3.75.183',5,13,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00014','SN-70020010114','Model-098765445678','10.3.75.183',5,14,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00015','SN-70020010115','Model-098765445678','10.3.75.183',5,15,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");

	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0001','SN-7002001011','Model-098765445678','10.3.75.183',6,1,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0002','SN-7002001012','Model-098765445678','10.3.75.183',6,2,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0003','SN-7002001013','Model-098765445678','10.3.75.183',6,3,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0004','SN-7002001014','Model-098765445678','10.3.75.183',6,4,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0005','SN-7002001015','Model-098765445678','10.3.75.183',6,5,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0006','SN-7002001016','Model-098765445678','10.3.75.183',6,6,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0007','SN-7002001017','Model-098765445678','10.3.75.183',6,7,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0008','SN-7002001018','Model-098765445678','10.3.75.183',6,8,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-0009','SN-7002001019','Model-098765445678','10.3.75.183',6,9,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00010','SN-70020010110','Model-098765445678','10.3.75.183',6,10,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00011','SN-70020010111','Model-098765445678','10.3.75.183',6,11,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00012','SN-70020010112','Model-098765445678','10.3.75.183',6,12,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00013','SN-70020010113','Model-098765445678','10.3.75.183',6,13,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00014','SN-70020010114','Model-098765445678','10.3.75.183',6,14,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
	tx.executeSql("insert into tb_route (deviceNum,serialNum,modelNum,deviceIp,taskId,routePriority,deviceParam) values ('7002-00015','SN-70020010115','Model-098765445678','10.3.75.183',6,15,'[{\"name\":\"status\"},{\"name\":\"lan\"},{\"name\":\"disk1\"},{\"name\":\"disk2\"},{\"name\":\"power\"}]');");
}

function errorCB(err) {
   	alert("Error processing SQL: " + err.code+"---"+err.message);
}

function successCB() {
	storage.setItem("initStatus","1");
   	alert("init success!");
   	db.transaction(queryDB,errorCB);
}

//查询数据库
function queryDB(tx) {
	var sql = "SELECT t.id,t.taskName,t.taskDate,t.taskBegin,t.taskEnd,doingNum,doneNum FROM "+
	       "tb_task as t left join "+
	       "(select d.taskId, doingNum, doneNum from "+
	         " (select taskId, count(*) as doingNum from tb_route where isFinished = '0' group by taskId) as d "+
	         " left join "+
	         " (select taskId, count(*) as doneNum from tb_route where isFinished = '1' group by taskId) as dn "+
	         " on d.taskId = dn.taskId "+
	      " ) as dd on t.id = dd.taskId "+
	      " where t.userId = ? ";
	tx.executeSql(sql, [1], querySuccess, errorCB);
}

// 查询成功后调用的回调函数
function querySuccess(tx, results) {
	var liHtml = "";
	if(results.rows.length){
		//加for循环
		for(var i=0;i<results.rows.length;i++){
			if(results.rows.item(i).doneNum || results.rows.item(i).doingNum){
				var doneNum = 0;
				var doingNum = 0;
				if(results.rows.item(i).doneNum){
					doneNum = results.rows.item(i).doneNum;
				}
				if(results.rows.item(i).doingNum){
					doingNum = results.rows.item(i).doingNum;
				}
				liHtml += '<li class="list-group-item">'+
					'<a href="j2.html" class="list-link" data-id="'+ results.rows.item(i).id+'">'+
					'<h3>'+ results.rows.item(i).taskName +'</h3> '+
					'<span class="badge link-badge badge-danger" style="display: block;">'+ doingNum +'</span>'+
					'<span class="badge link-badge badge-success" style="display: block;">'+ doneNum +'</span> '+
					'开始时间： '+ results.rows.item(i).taskBegin +'&nbsp; &nbsp; &nbsp;&nbsp;结束时间：'+ results.rows.item(i).taskEnd +
					'</a></li>';
			}
		}
		$("#taskUL").append(liHtml);
		
		$(".list-link").unbind();
		$(".list-link").bind("click",function(){
			var selectTaskId = $(this).data("id");
			
			storage.setItem("selectTaskId",selectTaskId);
		});
	}
}
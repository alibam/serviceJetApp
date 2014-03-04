var storage; // call localstorage

function onDeviceReady() {
	storage = window.localStorage;
	
	var db = window.openDatabase("serviceJetDB", "1.0", "serviceJetDB", 1000000);
	db.transaction(queryRouteDB,errorCB);
}

//事务执行失败后的回调函数
function errorCB(err) {
   	alert("Error processing SQL: "+err.message);
}

function queryRouteDB(tx) {
	var selectTaskId = storage.getItem("selectTaskId");
	tx.executeSql('select * from tb_task where id = ?',[selectTaskId],queryTaskSuccess,errorCB);
	tx.executeSql('select count(*) as totalCount from tb_route where taskId = ?',[selectTaskId],queryTotalCountSuccess,errorCB);
	tx.executeSql('SELECT * FROM tb_route where taskId = ? and isFinished =? order by routePriority asc', [selectTaskId,'0'], queryDoingSuccess, errorCB);
	tx.executeSql('SELECT * FROM tb_route where taskId = ? and isFinished =? order by routePriority asc', [selectTaskId,'1'], queryDoneSuccess, errorCB);
}

// 查询未完成成功后调用的回调函数
function queryDoingSuccess(tx, results) {
	var len = results.rows.length;
	$("#doingCount").html(len);
	var liHtml = "";
	if(len){
		for (var i=0; i<len; i++){
			liHtml += '<li class="list-group-item">'+
	            '<a href="j3.html" class="list-link" data-id="'+ results.rows.item(i).id +'">'+
			        '<table class="table table-striped">'+
			           '<tbody>'+
			            '<tr class="info">'+
			              '<td>机柜号:'+ results.rows.item(i).deviceNum + '</td>'+
			              '<td>序号:'+ results.rows.item(i).serialNum +'</td>'+
			              '<td>型号:'+ results.rows.item(i).modelNum + '</td>' +
			            '</tr>' +
			          '</tbody>' +
			        '</table>' +
			      '</a>'+
			    '</li>';
		}

		$("#doingUL").html(liHtml);
		$(".list-link").unbind();
		$(".list-link").bind("click",function(){
			storage.setItem("selectRouteId",$(this).data("id"));
		});
	}
}
//查询已完成成功后的回调函数
function queryDoneSuccess(tx, results) {
	var len = results.rows.length;
	$("#doneCount").html(len);
	var liHtml = "";
	if(len){
		for (var i=0; i<len; i++){
			liHtml += '<li class="list-group-item">'+
	            '<a href="j3.html" class="list-link" data-id="'+ results.rows.item(i).id +'">'+
			        '<table class="table table-striped">'+
			           '<tbody>'+
			            '<tr class="info">'+
			              '<td>机柜号:'+ results.rows.item(i).deviceNum + '</td>'+
			              '<td>序号:'+ results.rows.item(i).serialNum +'</td>'+
			              '<td>型号:'+ results.rows.item(i).modelNum + '</td>' +
			            '</tr>' +
			          '</tbody>' +
			        '</table>' +
			      '</a>'+
			    '</li>';
		}

		$("#doneUL").html(liHtml);
		$(".list-link").unbind();
		$(".list-link").bind("click",function(){
			storage.setItem("selectRouteId",$(this).data("id"));
		});
	}
}
//查询当前巡检任务详细成功后的回调函数，正式中可从上一页面写localStorage
function queryTaskSuccess(tx, results){
	if(results.rows.length){
		$("#taskName").text(results.rows.item(0).taskName);
		$("#taskBegin").text(results.rows.item(0).taskBegin);
		$("#taskEnd").text(results.rows.item(0).taskEnd);
	}
}

//查询指定任务下所有的路线数量
function queryTotalCountSuccess(tx,results){
	if(results.rows.length){
		$("#taskCount").text(results.rows.item(0).totalCount);
	}
}

$(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
})
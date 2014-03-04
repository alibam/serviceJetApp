var storage; // call localstorage

function onDeviceReady() {
	storage = window.localStorage;
	
	var db = window.openDatabase("serviceJetDB", "1.0", "serviceJetDB", 1000000);
	db.transaction(queryRouteDB,errorCB);
}

//����ִ��ʧ�ܺ�Ļص�����
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

// ��ѯδ��ɳɹ�����õĻص�����
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
			              '<td>�����:'+ results.rows.item(i).deviceNum + '</td>'+
			              '<td>���:'+ results.rows.item(i).serialNum +'</td>'+
			              '<td>�ͺ�:'+ results.rows.item(i).modelNum + '</td>' +
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
//��ѯ����ɳɹ���Ļص�����
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
			              '<td>�����:'+ results.rows.item(i).deviceNum + '</td>'+
			              '<td>���:'+ results.rows.item(i).serialNum +'</td>'+
			              '<td>�ͺ�:'+ results.rows.item(i).modelNum + '</td>' +
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
//��ѯ��ǰѲ��������ϸ�ɹ���Ļص���������ʽ�пɴ���һҳ��дlocalStorage
function queryTaskSuccess(tx, results){
	if(results.rows.length){
		$("#taskName").text(results.rows.item(0).taskName);
		$("#taskBegin").text(results.rows.item(0).taskBegin);
		$("#taskEnd").text(results.rows.item(0).taskEnd);
	}
}

//��ѯָ�����������е�·������
function queryTotalCountSuccess(tx,results){
	if(results.rows.length){
		$("#taskCount").text(results.rows.item(0).totalCount);
	}
}

$(function() {
    document.addEventListener("deviceready", onDeviceReady, false);
})
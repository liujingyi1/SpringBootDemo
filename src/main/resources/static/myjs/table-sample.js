/**
 * 
 */

$(document).ready(function(){
	
	function loadData() {
	    $.ajax({
	        type:"GET",
	        url:"table/get",
	        dataType:"json",
	        success:function(msg){
	        	if (msg.length > 0) {
	        		$("#table_test").show();
	        		updateTable(msg);
	        	} else {
	        		$("#table_test").hide();
	        	}
	        },
	        error:function(XMLHttpRequest, textStatus, errorThrown){
	                   alert(textStatus);
	                   alert(errorThrown);
	        }
	      });
	}
	

    
    function updateTable(msg) {
//        $("#table_test tr:gt(0):not(:eq(0))").remove();
        
        for (var i = 0; i < msg.length; i++) {
        	var row = "<tr><td>"+i+"</td><td>"+msg[i].name+"</td><td>"+msg[i].age+"</td></tr>";
        	$("#table_test tr:last").after(row);
		}
    }
    
 	$("#load_row").click(function() {
 		loadData();
	});
    
 	$("#add_row").click(function() {
 		var row = "<tr><td>"+1+"</td><td>"+"123"+"</td><td>"+"123"+"</td></tr>";
 		$("#table_test tr:last").after(row);
	});
 	
 	$("#delete_row").click(function() {
 		$("#table_test tr:gt(0):eq(0)").remove();
	});
 	
 	$("#delete_all_row").click(function() {
 		$("#table_test tr:gt(0)").remove();
	});


});
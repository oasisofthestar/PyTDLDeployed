var ctr = 0;
$(document).ready(function(){
	
	function callAjax(urle, val, pval){
		$.ajax({
            url: urle,
            data: "var=" + val + "&pval=" + pval,
            type: 'POST',
            success: function(response) {
                response = response.replace(/ObjectId/g, "")
                            .replace(/\(/g, "")
                            .replace(/\)|/g, "")
                            .replace(/'/g, '"');
      		    
      		    if(urle == '/selDB' && pval != true)
      		    {
      		    	var a = JSON.parse(response);
      		    	for(i=0; i < a.length; i++)
				    {
				    	var val = a[i]['activity'];
				    	$('#tbl1').after('<tr id="tblr' + i + '"><td><h3 id="lbl' + i + '">' + val + '</h3><input type="text" class="txt" id="txt' + i + '" style="display:none" value ="' + val + '"><input type="hidden" value="' + val + '" id="tdlvar' + i + '"></td><td><input type="button" class="btnedt" id="edt' + i + '" value="Edit"><input type="button" class="btndel" id="del' + i + '" value="Delete"></td></tr>');
				    }
      		    }
                else if(urle == '/selDB' && pval)
                {
                    var a = JSON.parse(response);
                    for(i=0; i < a.length; i++)
                    {
                        var val = a[i]['activity'];
                        $('#tbl1').after('<tr id="tblr' + i + '"><td><h3 id="lbl' + i + '">' + val + '</h3><input type="text" class="txt" id="txt' + i + '" style="display:none" value ="' + val + '"><input type="hidden" value="' + val + '" id="tdlvar' + i + '"></td><td><input type="button" class="btnfin" id="del' + i + '" value="Finish"></td></tr>');
                    }
                }
            },
            error: function(error) {
                console.log(error);
            }
        });
	}
    
    if($(document).find('title').text() == "To-Do List Home")
        callAjax('/selDB', '0', true)
    else
        callAjax('/selDB', '0', '0');
	
    $('#add').click(function(){
    	$('#tbl1').after('<tr id="tblr' + ctr + '"><td><h3 id="lbl' + ctr + '">' + $('#tdltext').val() + '</h3><input type="text" class="txt" id="txt' + ctr + '" style="display:none" value ="' + $('#tdltext').val() + '"><input type="hidden" value="' + $('#tdltext').val() + '" id="tdlvar' + ctr + '"></td><td><input type="button" class="btnedt" id="edt' + ctr + '" value="Edit"><input type="button" class="btndel" id="del' + ctr + '" value="Delete"></td></tr>');
    	ctr++;
    	callAjax('/insDB', $('#tdltext').val(), '0');
    });

    $(document).on( 'click', '.btnedt', function() {
	    var a = $(this).attr('id');
	    a = a.substring(3, a.length);
    	if($(this).val() != 'Done')
    	{
	    	var a = $(this).attr('id');
	    	a = a.substring(3, a.length);
	    	$('#lbl' + a).hide();
	    	$('#txt' + a).show();
	    	$('#edt' + a).val('Done');	
    	}
    	else
    	{
            callAjax('/updDB', $('#txt' + a).val(),$('#tdlvar' + a).val());
    		$('#tdlvar' + a).val($('#txt' + a).val());
    		$('#lbl' + a).text($('#txt' + a).val());
    		$('#lbl' + a).show();
    		$('#txt' + a).hide();
    		$('#edt' + a).val('Edit');
    	}
	});

	$(document).on( 'click', '.btndel', function() {
      	var a = $(this).attr('id');
	    a = a.substring(3, a.length);
	    callAjax('delDB', $('#tdlvar' + a).val(), '0');
	    $('#tblr' + a).remove();
	});

    $(document).on( 'click', '.btnfin', function() {
        var a = $(this).attr('id');
        a = a.substring(3, a.length);
        callAjax('delDB', $('#tdlvar' + a).val(), '0');
        $('#lbl' + a).css('text-decoration', 'line-through');
    });
}); 

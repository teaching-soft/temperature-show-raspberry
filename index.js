/*
 index.js
 ============================================

 Copyright (c) 2016-2017 by  Giancarlo Martini
 http://www.giancarlomartini.it

 This program is free software. You can redistribute it and/or modify
 it under the terms of the GNU General Public License as published by
 the Free Software Foundation; either version 2 of the License.
**********************************************************************

*/
$( document ).ready(temperature_request());
//------------------------------------------------------
function temperature_request()
{
	/*var text_to_send = $('#text_to_send_id').val();
	if(text_to_send.length == 0) return;;


	var data_to_send = $.param({'value_to_speech':text_to_send});

	window.alert("Vars:" + data_to_send);*/
	var data_to_send = $.param({'temp':"giveme"});
	$.ajax({url: '/cgi-bin/temperature_show.cgi', cache:false,success: tr_success, error:tr_error,
		data:"",dataType:'text',type:'get'});
}
// --------------------- onFailure -------------------------------------
function tr_error(XMLHttpRequest, textStatus, errorThrown)
{
	window.alert('ERRORE: Errore in trasmissione\n' + textStatus + ":" + errorThrown);
}
// --------------------- onSuccess -------------------------------------
function tr_success(data, textStatus, XMLHttpRequest)
{
  var result = data.split("|");
  if(result[0] == "OK"){
		//window.alert("Dati inviati correttamente\n");
		$('#temperature_received_id').val("");
	}
  else window.alert("ERRORE:\n" + data);
}
//-------------------------------------------------------------------------------
//------------------------------------------------------

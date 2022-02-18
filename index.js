/***************************************************************************
	progetto			: "Raspberry Temperature Show"
    file:				: index.js
    begin               : mer apr 21 10:34:57 CET 2011
    copyright           : (C) 2011 by Giancarlo Martini
    email               : gm@giancarlomartini.it
 ***************************************************************************/

/***************************************************************************
 *                                                                         *
 *   This program is free software; you can redistribute it and/or modify  *
 *   it under the terms of the GNU General Public License as published by  *
 *   the Free Software Foundation; either version 2 of the License, or     *
 *   (at your option) any later version.                                   *
 *                                                                         *
 ***************************************************************************/

$( document ).ready(temperature_request());
//------------------------------------------------------
function temperature_request() {
	/*var text_to_send = $('#text_to_send_id').val();
	if(text_to_send.length == 0) return;;


	var data_to_send = $.param({'value_to_speech':text_to_send});

	window.alert("Vars:" + data_to_send);*/
	var data_to_send = $.param({'temp':"giveme"});
	$.ajax({url: '/cgi-bin/temperature_show.cgi', cache:false,success: tr_success, error:tr_error,
			data:"",dataType:'text',type:'get'});
}
// --------------------- onFailure -------------------------------------
function tr_error(XMLHttpRequest, textStatus, errorThrown) {
	window.alert('ERRORE: Errore in trasmissione\n' + textStatus + ":" + errorThrown);
}
// --------------------- onSuccess -------------------------------------
function tr_success(data, textStatus, XMLHttpRequest) {
	var result = data.split("|");
	if(result[0] == "OK") {
		//window.alert("Dati inviati correttamente\n");
		$('#temperature_received_id').val(result[1]);
	} else window.alert("ERRORE:\n" + data);
}
//-------------------------------------------------------------------------------
//------------------------------------------------------

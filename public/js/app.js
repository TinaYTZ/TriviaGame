
var main = function () { 
	"use strict";
// this is actually just one string,
// but I spread it out over two lines
// to make it more readable
var $dataArea=$('#dataArea');
$dataArea.show();
$("#QAArea").hide();

var url = "http://api.flickr.com/services/feeds/photos_public.gne?" +
                  "tags=dogs&format=json&jsoncallback=?";
                 // 'http://localhost:3000/question'


$("#getQestion").click(function(e){
	e.preventDefault();
	$("#QAArea").show();
	$("#questionForm").hide();
	$.getJSON('/question', function (Response) {
 	// we'll simply print the response to the console // for the time being console.log(flickrResponse);
  	var res=JSON.stringify(Response);
  	console.log("res"+res);
 	var html=Response.question;
 	$dataArea.html(html);
 	console.log(Response);//should be stringify--> JSON.stringify(Response)
	}); 

});



$("#createQuestion").click(function(){

    $("#questionForm").show();
    $("#QAArea").hide();
});


$("#submitQuestion").click(function(e){
	e.preventDefault();
    $.post("/question",
    JSON.stringify({
        'question': $("#question").val(),
        'answer': $("#answer").val()
    }));
    $("#createQFb html").text="Sucess"
    $("#question").val()='';
    $("#answer").val()='';
    $("#QAArea").hide();
});


};
   
    $(document).ready(main);

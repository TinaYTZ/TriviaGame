/* jslint maxlen: 500 */

/* jshint browser: true, jquery: true, camelcase: true, indent: 2, undef: true, quotmark: single, maxlen: 80, trailing: true, curly: true, eqeqeq: true, forin: true, immed: true, latedef: true, newcap: true, nonew: true, unused: true, strict: true */
/*global console:true */
var main = function () { 
	'use strict';
// this is actually just one string,
// but I spread it out over two lines
// to make it more readable
var socket= io.connect();
var $userForm=$('#userForm');
var $username=$('#username'); 
var $userFormArea=$('#userFormArea');
var userId;
var $dataArea=$('#dataArea');



$('#mainArea').hide();

var answerId;
var text = '';
var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
for( var i=0; i < 10; i++ )
      {  text += possible.charAt(Math.floor(Math.random() * possible.length));}
userId = text;

socket.on('Question', function(data){
  $('#QAArea').show();
//  $('#questionForm').hide();
  $('#answerQA').removeAttr('disabled');
  $('#submitAnswer').removeAttr('disabled');
  $('#answerQA').val('');
  var html=data.question;
  answerId=data.answerId;
  console.log("answerid",answerId);
  $dataArea.html(html);

 
  });
$('#getQestion').click(function(e){
  e.preventDefault();
  socket.emit("new-round");
  $('#answerQA').removeAttr('disabled');
  $('#submitAnswer').removeAttr('disabled');
  $('#answerQA').val('');
  document.getElementById('check-answer').innerHTML = "";

});

socket.on('get users', function(data){
    var html='';
    console.log('user'+data);
    for (var i = 0; i < data.length; i++) {
     // html+='<li  class='bg-info' >'+ data[i] +'</li>';
      html+='<p>' + data[i]+ '</p>';
  }
  $('#userList').html(html);
  });



 $userForm.submit(function(e){
      e.preventDefault();
      userId=$username.val();
      socket.emit('new user', $username.val(),function(data){
        if(data){
          $userFormArea.hide();
          $('#mainArea').show();
        }
        else{
        }
      });
      //socket.emit('question',)
      $username.val('');
  });


$('#submitAnswer').click(function(e){
  $('#submitAnswer').attr('disabled', 'disabled');
   $('#answerQA').attr('disabled', 'disabled');
  e.preventDefault();
  //$('#scoreArea').hide();
  //console.log( $('#question').val());
  console.log($('#answerQA').val());
  socket.emit('submit-answer',{
        'answerId': answerId,
        'answer': $('#answerQA').val(),
        'userId': userId
    });
});


socket.on('check-answer', function(data){
  var html='<p>answer:'+data+'<p>';
  console.log("check-answer data", data);
  $('#check-answer').html(html);
  $('#check-answer').fadeIn(2000);
  });

socket.on('score',function(data){
    var html='';
    for (var i = 0; i < data.length; i++) {
     // html+='<li  class='bg-info' >'+ data[i] +'</li>';
      html+='<p>user:'+data[i].userId+'&nbsp &nbsp &nbsp &nbsp '+data[i].correct+'</p>'
  }

  console.log(html);
    $('#leadboard').html(html);


});
 socket.on('history', function(data){
         console.log('history',JSON.stringify(data));
         var html= '<p>'+JSON.stringify(data)+'</p>'
         $('#history').append(html);

 });
// $('#score').click(function(e){
//  e.preventDefault();
//  $('#QAArea').hide();
//  $('#questionForm').hide();
//   $('#scoreArea').fadeIn(2000);
//  //$('#scoreArea').show();

//  $.getJSON('/score' ,  {'userId': userId}  ,function (Response) {
//    // simply print the response to the console 
//   // for the time being console.log(flickrResponse);
//    console.log(userId);
//    var html=JSON.stringify(Response);
//    $('#scoreArea').html(html);
//    console.log('RESPONSE', Response);
//     //should be stringify--> JSON.stringify(Response)
//  }); 

// });

};
   
    $(document).ready(main);

//$.post('/user',{'userId': userId},function(response){console.log(response);});


// $('#score').click(function(e){
// 	e.preventDefault();
// 	$('#QAArea').hide();
// 	$('#questionForm').hide();
//   $('#scoreArea').fadeIn(2000);
// 	//$('#scoreArea').show();

// 	$.getJSON('/score' ,  {'userId': userId}  ,function (Response) {
//  	// simply print the response to the console 
//   // for the time being console.log(flickrResponse);
//  	console.log(userId);
//  	var html=JSON.stringify(Response);
//  	$('#scoreArea').html(html);
//  	console.log('RESPONSE', Response);
//     //should be stringify--> JSON.stringify(Response)
// 	}); 

// });


// $('#getQestion').click(function(e){
//     e.preventDefault();    
// 	//$('#scoreArea').hide();
// 	$('#QAArea').show();
// 	$('#questionForm').hide();

// 	$.getJSON('/question', function (Response) {
//  	// simply print the response to the console 
//   // for the time being console.log(flickrResponse);
//   //console.log('res'+res);
//  	var html=Response.question;
//  	answerId=Response.answerId;
//  	$dataArea.html(html);
//  	//console.log(Response);//should be stringify--> JSON.stringify(Response)
// 	}); 

// });



// $('#createQuestion').click(function(){
//     $('#questionForm').show();
//     $('#QAArea').hide();
//   // $('#scoreArea').hide();
// });





    // // $.post('/answer',
    // {
    //     'answerId': answerId,
    //     'answer': $('#answerQA').val(),
    //     'userId': userId
    // });
    
//    $.ajax({
//             type: 'POST',
//             url: '/answer',
//             timeout: 15000,
//             data: JSON.stringify({
//                   "answerId": answerId,
//                   "answer": $('#answerQA').val(),
//                   "userId": userId}),
//             contentType: "application/json",
//             success: function(data) {
//             //     // Get result data
//                  console.log('Result' + data);
//             //     $(obj).text(data.function+data.value);
//              },
//             error: function (result) {
//                  console.log('ajax error ' + result.status);
//              }
//         });



//     // $('#answerQA').text='Sucess'
//     document.getElementById('answerQA').value = '';
//     $.getJSON('/question', function (Response) {
//  	// simply print the response to the console 
//      // for the time being console.log(flickrResponse);
//   	var res=JSON.stringify(Response);
//   	console.log('res'+res);
//  	var html=Response.question;
//  	answerId=Response.answerId;
//  	$dataArea.html(html);

//  	console.log(Response);//should be stringify--> JSON.stringify(Response)
// 	}); 

    
// });


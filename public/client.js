$(document).ready(function() {
  /*global io*/
  const socket = io();
  socket.on("user", function(data) {
    $("#num-users").text(data.currentUsers + " users online");
    var message = data.name;
    if (data.connected) {
      message += " has joined the chat.";
    } else {
      message += " has left the chat.";
    }
    $("#messages").append($("<li>").html("<b>" + message + "</b>"));
  });
  socket.on("chat message", function(data) {
    $("#messages").append(
      $("<li>").html("<b>" + data.name + " " + data.message + "</b>")
    );
  });
  // Form submittion with new message in field with id 'm'
  $("#form").submit(function() {
    var messageToSend = $("#m").val();
    socket.emit("chat message", messageToSend);
    $("#m").val("");
    return false; // prevent form submit from refreshing page
  });
});

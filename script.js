$(() => {
  var msg = m => $("pre#console").append("\n" + m);
  var socket = io.connect("http://real-coding-time.herokuapp.com");
  socket.on("connect", () => {
    msg("Successfully connected to server.");
  });
  socket.on("connect_error", () => {
    msg("Error connecting to server.");
  });
  socket.on("code", code => {
    $("pre#code").html(code);
  });
  msg("Hello. Script loaded. Waiting for server...");
});

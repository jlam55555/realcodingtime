$(() => {
  var msg = m => $("pre#console").append("\n" + m);
  var socket = io.connect("https://real-coding-time.herokuapp.com", {"transports": ["websocket"]});
  socket.on("connect", () => {
    msg("32");
  });
  socket.on("connect_error", () => {
    msg("42");
  });
});

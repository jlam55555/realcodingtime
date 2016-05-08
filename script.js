$(() => {
  var msg = m => $("div#console").append("\n" + m);
  var socket = io.connect("http://real-coding-time.herokapp.com:3000", {"transports": ["websocket"]});
  msg("hello again?");
  socket.on("connect", () => {
    msg("32");
  });
  socket.on("connect_error", () => {
    msg("42");
  });
});

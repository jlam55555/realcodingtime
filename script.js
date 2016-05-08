$(() => {
  var msg = m => $("div#console").append("\n" + m);
  var socket = io.connect("http://real-coding-time.herokapp.com:3000", {"transports": ["websocket"]});
  socket.connect(() => {
    msg("32");
  });
  socket.connect_error(() => {
    msg("42");
  });
  msg("hello again?");
});

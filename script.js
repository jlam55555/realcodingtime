$(() => {
  var msg = m => $("div#console").append("\n" + m);
  var socket = io.connect("http://www.real-coding-time.herokapp.com");
  socket.connect(() => {
    msg("32");
  });
  socket.connect_error(() => {
    msg("42");
  });
  msg("hello again?");
});

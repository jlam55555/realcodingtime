$(() => {
  var msg = m => $("pre#console").append("\n" + m);
  var socket = io.connect("http://real-coding-time.herokuapp.com");
  socket.on("connect", () => {
    msg("32");
  });
  socket.on("connect_error", () => {
    msg("42");
  });
});

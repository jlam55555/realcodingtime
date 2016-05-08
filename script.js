"use strict";
$(() => {
  // elements
  let consoleElem = $("pre#console");
  let codeElem = $("pre#code");
  
  // accessory functions
  let msg = m => consoleElem.append("\n" + m);
  let setCode = code => codeElem.html(code.replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/==NEWLINE==/g, "\n"));
  
  // socket.io
  let socket = io.connect("http://real-coding-time.herokuapp.com");
  socket.on("connect", () => {
    msg("Successfully connected to server.");
    codeElem.on("input", () => {
      socket.emit("codeUpdate", codeElem[0].innerText.replace(/\n/g, "==NEWLINE=="));
    });
    socket.on("code", code => {
      setCode(code);
    });
  });
  socket.on("connect_error", () => {
    msg("Error connecting to server.");
  }); 
  msg("Hello. Scripts loaded. Waiting for server...");
});

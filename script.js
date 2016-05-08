"use strict";
$(() => {
  // elements
  let console = $("pre#console");
  let codeElem = $("pre#code");
  
  // accessory functions
  let msg = m => console.append("\n" + m);
  let setCode = code => codeElem.html(code.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
  
  // socket.io
  let socket = io.connect("http://real-coding-time.herokuapp.com");
  socket.on("connect", () => {
    msg("Successfully connected to server.");
    codeElem.on("input", () => {
      console.log(codeElem.text().replace(/\n/g, "\\n");
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

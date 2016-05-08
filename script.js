"use strict";
$(() => {
  // elements
  let consoleElem = $("pre#console");
  let codeElem = $("pre#code");
  
  // accessory functions
  let msg = m => consoleElem.append("\n" + m);
  let setCode = code => codeElem.html(code.replace(/</g, "&lt;").replace(/>/g, "&gt;"));
  
  // socket.io
  let socket = io.connect("http://real-coding-time.herokuapp.com");
  socket.on("connect", () => {
    msg("Successfully connected to server.");
    codeElem.on("input", () => socket.emit("codeUpdate", codeElem[0].innerText));
    codeElem.on("keydown", event => {
      if(event.which == 9) {
        event.preventDefault();
        let elem = codeElem[0];
        let start = elem.selectionStart;
        let end = elem.selectionEnd;
        setCode(elem.innerText.substring(0, start) + "  " + elem.innerText.substring(end));
        elem.selectionStart = elem.selectionEnd = start + 1;
      }
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

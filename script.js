"use strict";
$(() => {
  // elements
  let consoleElem = $("pre#console");
  let codeElem = $("textarea#code");
  let resultElem = $("button#result");
  let resultHtml = $("textarea#resultHtml");
  let resultForm = $("form#resultForm");
  
  // accessory functions
  let msg = m => consoleElem.append("\n" + m);
  let setCode = code => codeElem.val(code);
  
  // socket.io
  let socket = io.connect("http://real-coding-time.herokuapp.com");
  socket.on("connect", () => {
    msg("Successfully connected to server.");
    codeElem.on("input", () => {
      socket.emit("codeUpdate", codeElem.val())
    });
    codeElem.on("keydown", event => {
      if(event.which == 9) {
        event.preventDefault();
        let elem = codeElem[0];
        let start = elem.selectionStart;
        let end = elem.selectionEnd;
        setCode(codeElem.val().substring(0, start) + "  " + codeElem.val().substring(end));
        elem.selectionStart = elem.selectionEnd = start + 2;
      }
    });
    socket.on("code", code => {
      setCode(code);
    });
    resultElem.click(() => {
      resultHtml.val(codeElem.val());
      resultForm.submit();
    });
  });
  socket.on("connect_error", () => {
    msg("Error connecting to server.");
  }); 
  msg("Hello. Scripts loaded. Waiting for server...");
});

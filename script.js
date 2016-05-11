"use strict";
$(() => {
  // elements
  let consoleElem = $("pre#console");
  let codeElem = $("textarea#code");
  let resultElem = $("button#result");
  let resultCode = $("textarea#resultCode");
  let resultForm = $("form#resultForm");
  let colorfulCode = $("pre#colorfulCode");
  
  // accessory functions
  let msg = m => consoleElem.append("\n" + m);
  let setCode = code => codeElem.val(code);
  
  // socket.io
  let socket = io.connect("http://real-coding-time.herokuapp.com");
  socket.on("connect", () => {
    msg("Successfully connected to server.");
    codeElem.on("keyup", () => {
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
      codeElem.trigger("input");
    });
    resultElem.click(() => {
      resultCode.val(codeElem.val());
      resultForm.submit();
    });
    codeElem.on("input", () => {
      colorfulCode.html(codeElem.val()).removeClass("prettyprinted");
      prettyPrint();
    });
  });
  socket.on("connect_error", () => {
    msg("Error connecting to server.");
  }); 
  msg("Hello. Scripts loaded. Waiting for server...");
});

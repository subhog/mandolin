Piano.square = {};


Piano.square.draw = function() {
  var width = window.innerWidth;
  var height = window.innerHeight;


  var keyX, keyY, span, first;


  if(width >= 1024 && height >= 648) {
    keyX = 20;
    keyY = 9;
    span = 4;  
    first = 12;  
  } else if (width >= 640 && height >= 480) {
    keyX = 10;
    keyY = 6;
    span = 7;
    first = 12;
  } else {
    keyX = 8;
    keyY = 4;
    span = 7;
    first = 21;
  }
  




  var keyWidth = Math.floor(width / keyX);
  var keyHeight = Math.floor(height / keyY);
  /*
  
  var count = Math.floor(width / 24);
  
  var octaves = 1;
  var keys = 8;
  while(keys +7 <= count) {
    octaves++; keys += 7;
  }

  console.log("KEYS", keys, 'OCTAVES', octaves);

  var keyWidth = Math.floor(width / keys);
  var keyHeight = Math.floor(1.61 * keyWidth);
  var keyX = keys;
  var keyY = Math.floor(height / keyHeight);
  */

  var keyX0 = Math.floor((width  - keyWidth * keyX) / 2);
  var keyY0 = Math.floor((height - keyHeight * keyY) / 2);


  var board = Piano.makeBoard();
  // var div, n;

  console.log("WIDTH", width, "HEIGHT", height);
  console.log("KEY W", keyWidth, "KEY H", keyHeight);
  console.log("KEY X", keyX, "KEY Y", keyY);

  (keyY).times(function(rowR) {
    (keyX).times(function(col) {

      var row = keyY - rowR - 1;

      var sound = span * row + col + first;
      var octave = Math.floor(sound / 7);
      var note = Piano.white[sound % 7];
      var n = 12 * octave + note;

      // n = 36 + col + 7 * row;
      // console.log("KEY", row, col);
      var div = $('<div><div>' + Piano.label[n % 12] + '</div></div>');
      div.addClass('key');
      div.css({
        position: 'absolute',
        left: (keyX0 + col * keyWidth) + 'px',
        top: (keyY0 + rowR * keyHeight) + 'px',
        width: keyWidth + 'px',
        height: keyHeight + 'px',
        background: '#' + Piano.colors.octaves[octave],
      });
      if(octave === 4) {
        div.css({color: 'rgba(255, 255, 255, 0.5)'});
      }
      if(octave === 3 || octave === 5) {
        div.css({color: 'rgba(255, 255, 255, 0.35)'}); 
      }
      div.appendTo(board);
      Piano.wire(div, n);
      var inner = div.find('div');
      if(note === 0 || note === 2 || note === 5 || note === 7 || note === 9) {
        // if(col + 1 !== keyX)
        inner.addClass('keyBlackAfter');
      }
      if(note === 2 || note === 4 || note === 7 || note === 9 || note === 11) {
        // if(col + 1 !== keyX)
        inner.addClass('keyBlackBefore');
      }
      // if(note === 0 || note === 5 || note === 7)
        // inner.css({background: 'rgba(0,0,0,0.25)'});
      // if(note === 2 || note === 4 || note === 9)
        // inner.css({background: 'rgba(255,255,255,0.25)'});
      
    });
  });

  board.appendTo('body');
};


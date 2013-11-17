

Piano = {};

Piano.label = ['c', 'c#', 'd', 'e♭', 'e', 'f', 'f#', 'g', 'g#', 'a', 'b♭', 'b'];
Piano.white = [0, 2, 4, 5, 7, 9, 11];
Piano.colors = {
  octaves: [
    '000000', //
    '700020', //1
    'b00000', // 2
    'f08030', // 3 
    'ffd000', //  4
    'a0d020', //  5
    '40a0f0', // 6
    'c040f0', // 7
    'ff20f0', //8
    'ff80f0', //9
    'ffffff',
    'ffffff',
  ]
};

Piano.play = function(note) {
  var velocity = 127; // how hard the note hits
  // play the note
  MIDI.noteOn(0, note, velocity, 0);
};

Piano.stop = function(note) {
  MIDI.noteOff(0, note, 0);
};

Piano.wire = function($div, note) {
  $div.on('mousedown', function() {
    Piano.play(note);
  }).on('mouseup', function() {
    Piano.stop(note);
  });

};

Piano.makeBoard = function() {
  var width = $(window).width();
  var height = $(window).height();

  var $div = $('<div></div>');
  $div.css({
    position: 'absolute',
    left: '0px',
    top: '0px',
    width: width + 'px',
    height: height + 'px',
  });
  return $div;
};

$(function() {
  MIDI.loadPlugin({
    soundfontUrl: "midi/soundfont/",
    instrument: "acoustic_grand_piano",
    callback: function() {
      MIDI.setVolume(0, 127);
      Piano.square.draw();
    }
  });
  
});







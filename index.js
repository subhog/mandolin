// Generated by CoffeeScript 1.6.3
(function() {
  var dotH, dots, lefts, notes, places, strings, widths;

  notes = ['c', 'c#', 'd', 'e♭', 'e', 'f', 'f#', 'g', 'g#', 'a', 'b♭', 'b'];

  strings = ['g', 'd', 'a', 'e'];

  lefts = [0];

  widths = [];

  dots = [[1, 3], [1, 5], [1, 7], [1, 10], [0, 12], [2, 12], [1, 15]];

  dotH = 9;

  18..times(function(i) {
    widths.push(960 / (i + 12));
    return lefts.push(lefts.last() + widths.last());
  });

  places = [];

  $(function() {
    var board;
    board = $('<div></div>');
    board.addClass('board');
    board.appendTo('body');
    [3, 2, 1, 0].each(function(string) {
      var index0;
      index0 = notes.indexOf(strings[string]);
      return 18..times(function(position) {
        var place;
        place = $('<div>' + notes[(index0 + position) % 12] + '</div>');
        place.addClass('place');
        place.css({
          top: (3 - string) * 50,
          left: lefts[position],
          width: widths[position],
          height: 50
        });
        if (position === 0) {
          place.css('border-top', 'none');
        }
        if (position === 0) {
          place.css('border-bottom', 'none');
        }
        if (position !== 0) {
          place.css('border-right', 'none');
        }
        if (string !== 0) {
          place.css('border-bottom', 'none');
        }
        place.appendTo(board);
        place.data('note', notes[(index0 + position) % 12]);
        places.push(place);
        return place.click(function(e) {
          return window.select($(e.target).data('note'));
        });
      });
    });
    return dots.each(function(xy) {
      var dot;
      dot = $('<div></div>');
      dot.addClass('dot');
      dot.css({
        top: xy[0] * 50 - dotH + 50,
        left: lefts[xy[1]] + widths[xy[1]] / 2 - dotH
      });
      return dot.appendTo(board);
    });
  });

  window.select = function(note) {
    return places.each(function(place) {
      if (note !== place.data('note')) {
        return null;
      }
      return place.toggleClass('selected');
    });
  };

}).call(this);
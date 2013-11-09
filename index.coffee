
notes = [
  'c', 'c#', 'd', 'e♭', 'e'
  'f', 'f#', 'g', 'g#', 'a', 'b♭', 'b'
]

strings = [
  'g', 'd', 'a', 'e'
]

lefts = [0]
widths = []

dots = [
  [1,3], [1,5], [1,7], [1,10], [0,12], [2,12], [1,15]
]

dotH = 9;

18.times (i) ->
  widths.push (960 / (i + 12))
  lefts.push (lefts.last() + widths.last())

places = []

$ ->

  board = $ '<div></div>'
  board.addClass 'board'
  board.appendTo 'body'

  [3,2,1,0].each (string) ->
    index0 = notes.indexOf strings[string]
    # left = 0

    18.times (position) ->
      # width = 960 / (position + 12)
      place = $ '<div>' + notes[(index0 + position) % 12] + '</div>'
      place.addClass 'place'
      place.css
        top: (3 - string) * 50
        left: lefts[position] #left
        width: widths[position] #width
        height: 50
      place.css 'border-top', 'none' if position is 0
      place.css 'border-bottom', 'none' if position is 0
      place.css 'border-right', 'none' unless position is 0
      place.css 'border-bottom', 'none' unless string is 0
      place.appendTo board

      place.data 'note', notes[(index0 + position) % 12]
      places.push place

      place.click (e) ->
        window.select $(e.target).data('note')
      # left += width

  dots.each (xy) ->
    dot = $ '<div></div>'
    dot.addClass 'dot'
    dot.css
      top: xy[0] * 50 - dotH + 50
      left: lefts[xy[1]] + widths[xy[1]]/2 - dotH
    dot.appendTo board
 

window.select = (note) ->
  places.each (place) ->
    # console.log place, place.data 'note'
    return null unless note is place.data 'note'
    place.toggleClass 'selected'












//=============================================================================
//  VoiceCaster plugin
//
//  This plugin created by underquark October 2012
//  Takes a single stave with multiple voices and creates a new score with
//  multiple staves each with a single voice.

function init()
{
}
 

function addChord(cursor, duration)
{
      var chord     = new Chord();
      chord.tickLen = duration;
      cursor.add(chord);
      cursor.next();
      return chord;
}

function addNote(chord, pitch)
{
      var note      = new Note();
      note.pitch    = pitch;
      chord.addNote(note);
}

function addRest(cursor, duration)
{
     var rest = new Rest();
     rest.tickLen = duration;
     cursor.add(rest);
     cursor.next();
}


function run()
{
//    Bounce if not a proper score
      if (typeof curScore === 'undefined') return; 

//  Create arrays to store each voice
      var chordArray0 = [];
      var chordArray1 = [];
      var chordArray2 = [];
      var chordArray3 = [];

//  Embrace the selection
      var cursor       = new Cursor(curScore);
      var selectionEnd = new Cursor(curScore);
      cursor.goToSelectionStart();
      selectionEnd.goToSelectionEnd();
      var startStaff = cursor.staff;
      var endStaff   = selectionEnd.staff;

//  Read notes and rests into arrays
      for (var staff = startStaff; staff < endStaff; ++staff)
      {
            cursor.goToSelectionStart();
// rem out original            cursor.voice = 0;
            cursor.staff = staff;
            
            while (cursor.tick() < selectionEnd.tick())
            {
//  Add in for different voices
                cursor.voice = 0;
                if (cursor.isChord())
                {
                      var chord = cursor.chord();
                      chordArray0.push(chord);
                } else if (cursor.isRest())
                {
                      var rest = cursor.rest();                    
                      chordArray0.push(rest.tickLen);
                }

               cursor.voice = 1;
                if (cursor.isChord())
                {
                      var chord = cursor.chord();
                      chordArray1.push(chord);
                } else if (cursor.isRest())
                {
                      var rest = cursor.rest();                    
                      chordArray1.push(rest.tickLen);
                }

               cursor.voice = 2;
                if (cursor.isChord())
                {
                      var chord = cursor.chord();
                      chordArray2.push(chord);
                } else if (cursor.isRest())
                {
                      var rest = cursor.rest();                    
                      chordArray2.push(rest.tickLen);
                }

               cursor.voice = 3;
                if (cursor.isChord())
                {
                      var chord = cursor.chord();
                      chordArray3.push(chord);
                } else if (cursor.isRest())
                {
                      var rest = cursor.rest();                    
                      chordArray3.push(rest.tickLen);
                }
                cursor.next();
            }    
      }
            
// Create a new score with 4 staves and 500 empty measures
      var score   = new Score();
      score.name  = "VoiceCaster";
      score.title = "VoiceCaster";
      score.appendPart();
      score.appendPart();
      score.appendPart();
      score.appendPart();
      score.keysig = curScore.keysig;
      score.appendMeasures(500);

      var newCursor = new Cursor(score);


//  Repeat orignal 4 times for each voice, new stave

      newCursor.staff = 0;
      newCursor.voice = 0;
      newCursor.rewind();
      chordArray0.pop();
      
      for (var i = 0; i<chordArray0.length; i++)
      {
            var chord = chordArray0[i];
            if (typeof chord === 'object')
            {
                var newChord = addChord(newCursor, chord.tickLen);
                var n     = chord.notes;
                for (var j = 0; j < n; j++)
					{
                      var note = chord.note(j);
                      addNote(newChord, note.pitch);
               }
            } else
            {
                //add rest if it's not a chord
                var tickLen = chord;
                addRest(newCursor, tickLen);
            }
      }

      newCursor.staff = 1;
//      newCursor.voice = 1;
      newCursor.rewind();
      chordArray1.pop();
      
      for (var i = 0; i<chordArray1.length; i++)
      {
            var chord = chordArray1[i];
            if (typeof chord === 'object')
            {
                var newChord = addChord(newCursor, chord.tickLen);
                var n     = chord.notes;
                for (var j = 0; j < n; j++)
					{
                      var note = chord.note(j);
                      addNote(newChord, note.pitch);
               }
            } else
            {
                //add rest if it's not a chord
                var tickLen = chord;
                addRest(newCursor, tickLen);
            }
      }

      newCursor.staff = 2;
//      newCursor.voice = 2;
      newCursor.rewind();
      chordArray2.pop();
      
      for (var i = 0; i<chordArray2.length; i++)
      {
            var chord = chordArray2[i];
            if (typeof chord === 'object')
            {
                var newChord = addChord(newCursor, chord.tickLen);
                var n     = chord.notes;
                for (var j = 0; j < n; j++)
					{
                      var note = chord.note(j);
                      addNote(newChord, note.pitch);
               }
            } else
            {
                //add rest if it's not a chord
                var tickLen = chord;
                addRest(newCursor, tickLen);
            }
      }

      newCursor.staff = 3;
//      newCursor.voice = 3;
      newCursor.rewind();
      chordArray3.pop();
      
      for (var i = 0; i<chordArray3.length; i++)
      {
            var chord = chordArray3[i];
            if (typeof chord === 'object')
            {
                var newChord = addChord(newCursor, chord.tickLen);
                var n     = chord.notes;
                for (var j = 0; j < n; j++)
					{
                      var note = chord.note(j);
                      addNote(newChord, note.pitch);
               }
            } else
            {
                //add rest if it's not a chord
                var tickLen = chord;
                addRest(newCursor, tickLen);
            }
      }

}




var mscorePlugin =
{
      menu: 'Plugins.VoiceCaster',
      init: init,
      run:  run
}

mscorePlugin;

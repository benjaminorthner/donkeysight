function checkOnNotes (currentlyOn) {
    let staveConfigObject = staveConfigObjects[runStatsObject.currentStave]
    let note = currentlyOn[currentlyOn.length-1]

    if (staveConfigObject.voice.tickables[staveConfigObject.caretPos].keys[0] === MIDIToLO(note)) {
        playedCorrectNote(staveConfigObject)
        console.log("CORRECT")
    }
    else {
        playedWrongNote(staveConfigObject)
        console.log("WRONG")
    }
}


function playedCorrectNote (staveConfigObject) {
    // color note as playedCorrectly
    colorNote(staveConfigObject.noteDivList[staveConfigObject.caretPos], true);
    // move caret 1 note ahead
    moveCaret();
    // update run statistics
    runStatsObject.correctNotesPlayed++;
    runStatsObject.notesPlayed++;
}

function playedWrongNote (staveConfigObject) {
    // color note as played incorrectly
    colorNote(staveConfigObject.noteDivList[staveConfigObject.caretPos], false)

    if (generalConfigObject.continueWhenIncorrect) {
        moveCaret();
    }
    runStatsObject.incorrectNotesPlayed++;
    runStatsObject.notesPlayed++;
}

/**
 * Colors a note div (needs to be reworked for chords)
 * @param {} noteDiv element containing noteHead and stem
 * @param {boolean} playedCorrectly determines if correct or error color is used
 */
function colorNote (noteDiv, playedCorrectly) {
    
    let color = "";
    if (playedCorrectly) {
        color = 'var(--text-color)';
    }
    else {
        color = 'var(--error-color)';
    }
    console.log(noteDiv)
    noteDiv.querySelectorAll('path').forEach((path) => {
        path.setAttribute('fill', color)
        path.setAttribute('stroke', color)
    });
}

function endRun () {
    console.log("YOU DONE SON")
    renderScore();
}
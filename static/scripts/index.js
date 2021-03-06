// initialise global variables

// Create a configuration object that you pass to the generate music function
let generate_music_defaults = {
    n : 1000,
    min: LOToPiano("c/4"),
    max: LOToPiano("c/6"),
    scale: 4, // Cmaj
    max_interval: 88
};

// configuartions that affect behaviour
let generalConfigObject = {
    continueWhenIncorrect : true,
    totalNoteCount: 60,
    notesPerRow: 20
};

// collects statistics about current run
let runStatsObject = {
    notesPlayed : 0,
    correctNotesPlayed : 0,
    incorrectNotesPlayed : 0,
    currentStave: 0,
    totalStaveCount: 0
};

// object that groups variables related to reading midi input
let midi_vars = {
    noteOnCount : 0,
    noteOffCount : 0,
    currentlyOn: [],
    stream: []
};

//stave config object contains info used to calc caret positions for each stave {caretJQ, caretNumber, caretPos, caretPadding, voice, noteDivList, box_height}
let staveConfigObjects  = [];
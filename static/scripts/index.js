// initialise global variables

// Create a configuration object that you pass to the generate music function
let generate_music_defaults = {
    n : 1000,
    min: LOToPiano("c/4"),
    max: LOToPiano("c/6"),
    scale: 4, // Cmaj
    max_interval: 88
}

// object that groups variables related to reading midi input
let midi_vars = {
    noteOnCount : 0,
    noteOffCount : 0,
    currentlyOn: [],
    stream: []
}

//caret config object contains info used to calc caret positions for each stave {caretNumber, pos, voice, box_height}
let caret_config_objects = []
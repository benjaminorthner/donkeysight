/**
* Generates the music based on the chosen parameters.
*
* returns list of note names in vexflow accepted format
*
* @param {number} n total number of notes
* @param {number} max highest note (in piano key numbers 1-88)
* @param {number} min lowest note (in piano key numbers 1-88)
* @param {number} scale which scale/key is the music in (a maj = 1, a# maj = 2, ...)
* @param {number} max_interval largest interval between consecutive notes (in half steps)
* 
* Furute params: chord probabilities (maybe list where position determines prob of chord with note number as index)
* list of all allowed chord types
* need a function that generates acceptable chords
*/
function generate_music(conf) {

    // use defaults for key value pairs absent in passed configuration object
    for (let key in generate_music_defaults){
        if (!conf[key]) {
            conf[key] = generate_music_defaults[key];
        }
    }

    // get all notes in current scale
    scaleNotes = generateScale(conf.scale);

    // trim scale to match min and max values
    let slicedScaleNotes = scaleNotes.slice(indexOfSmaller(scaleNotes, conf.min, false), indexOfSmaller(scaleNotes, conf.max, true))

    //choose n random notes from the sliced scale, convert to vex format and push to note list
    let note_list = [];
    for (let index = 0; index < conf.n; index++) {

        // remove notes where interval from previous note is too big
        let filteredScaleNotes = removeLargeIntervals(note_list, slicedScaleNotes, conf.max_interval)

        // put new note into a list (so chords are easily supported later)
        let newNote = [pianoToLO(filteredScaleNotes[Math.floor(Math.random() * filteredScaleNotes.length)])];
        note_list.push(newNote);
    }

    return note_list;
}

/**
 * Returns a list of all keys in the specified major scale
 * in piano key number
 * @param {number} scale root note in piano key numbers {a = 1, a# = 2}
 */
function generateScale(scale) {
    let scaleNotes = [];

    // add 1 octave of the scale
    for (let i = scale; i <= 88; i += 12) {
        scaleNotes = scaleNotes.concat([
            i,
            i + 2,
            i + 4,
            i + 5,
            i + 7,
            i + 9,
            i + 11
        ]);
    };

    // removes all notes > 88
    while (true) {
        let lastNote = scaleNotes.pop();
        if (lastNote <= 88){
            // add note back in and break
            scaleNotes.push(lastNote);
            break;
        }
    }

    return scaleNotes;
}

/**
 * Removes intervals that are larger than the specified max
 * 
 * @param {Array} prev_notes list containing all previous notes (each chord is an array)
 * @param {Array} available_notes list of possible next notes
 * @param {number} max_interval max interval between previous and next note
 * @returns array containing possible next notes within allowed interval range
 */
function removeLargeIntervals(prev_notes, available_notes, max_interval){

    // if no previous notes, just return all options
    if (prev_notes.length == 0){
        return available_notes;
    }

    // else filter out notes where interval to previous note is > max_interval
    return available_notes.filter(function(value, index, arr) {
        return Math.abs(LOToPiano(prev_notes[prev_notes.length - 1][0]) - value) <= max_interval;
    });
}


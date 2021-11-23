// Create a configuration object that you pass to the generate music function
var generate_music_defaults = {
    	n : 1000,
        range: [1, 88]
}

/**
* Generates the music based on the chosen parameters.
*
* returns list of note names in vexflow accepted format
*
* @param {number} n total number of notes
* @param {number} max highest note (in piano key numbers 1-88)
* @param {number} min lowest note (in piano key numbers 1-88)
* @param {number} scale which scale/key is the music in (a maj = 1, a# maj = 2, ...)
* 
* Furute params: chord probabilities (maybe list where position determines prob of chord with note number as index)
* list of all allowed chord types
* need a function that generates acceptable chords
*/
function generate_music(conf) {

    let note_list = [];

    // loop n times each time adding a new note
    for (let index = 0; index < conf.n; index++) {
        
        // get random number in given range
        let newNote = Math.floor(Math.random() * (conf.max - conf.min + 1) ) + conf.min;
        
        // check if note is in the right key/scale
        if (checkScale(newNote) == conf.scale) {
            
        }
    }
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
 *  Checks if a note is contained within a scale
 * @param {number} i piano key number
 * @param {number} scale piano key number of the root 
 */
function checkScale(i, scale){

}

/**
 * Convert piano key number to vexflow key notation
 * @param {number} i piano key number of note
 * @param {string} duration the duration of the note: e.g. q = quarter note
 */
function pianoToVex(i, duration){
    // find octave of note
    let octave = Math.floor( (i + 8) / 12)

    // list all note names so the are indexed with i % 12
    const letters = ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'];

    return letters[i % 12] + octave + '/' + duration;
}
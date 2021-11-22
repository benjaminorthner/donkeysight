// Create a configuration object that you pass to the generate music function
var generate_music_defaults = {
    	n : 1000;
        range: [];
}

/**
* Generates the music based on the chosen parameters.
*
* returns list of note names in vexflow accepted format
*
* @param {number} n total number of notes
* @param {} range highest and lowest note that should be generated.
* @param {} key which key is the music in
*
*/
function generate_music(conf) {

}


/**
 * Convert piano key number to Midi note number
 */
function pianoToMidi(i){
    return i + 20;
}

/**
 * Convert midi note number to piano key number
 */
function midiToPiano(i){
    return i - 20;
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
    let letters = ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'];

    return letters[i % 12] + octave + '/' + duration;
}
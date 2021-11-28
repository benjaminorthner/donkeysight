// script containing small helper functions (no outside dependencies)

/**
 * Returns the index of the smallest element that is bigger than
 * or equal to the search element
 * 
 * assumes array is sorted
 * 
 * @param {Array} array array to be searched
 * @param {number} searchElement element to be searched for
 * @param {boolean} above if true index of value above (greater than) searchElement is returned
 */
function indexOfSmaller(array, searchElement, above) {
    for (let i = 0; i < array.length; i++) {
        if (above){
            if (array[i] > searchElement) {
                return i;
            };        
        }
        else if (array[i] >= searchElement){
            return i;
        }
    };
}


/**
 * Convert piano key number to letter/octave key notation
 * @param {} i piano key number of note (or array of notes)
 */
 function pianoToLO(i) {
    
    // if i is an array, recursively convert each element individually and return new array
    if (Array.isArray(i)) {
        let newArray = []
        i.forEach( (note) => {
            newArray.push(pianoToLO(note));
        });
        return newArray;
    }

    // change from 1 indexing to 0 indexing
    i--;

    // find octave of note
    let octave = Math.floor( (i + 9) / 12)

    // list all note names so the are indexed with i % 12
    const letters = ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'];

    return letters[i % 12] + '/' + octave;
}

/**
 * Converts from letter/octave notation to piano key number, e.g. a#/1 -> 13
 * @param {} i letter/octave notation form of note (or array of notes)
 * @returns note(s) in piano numbers
 */
function LOToPiano(i) {

    // if i is an array, recursively convert each element individually and return new array
    if (Array.isArray(i)) {
        let newArray = []
        i.forEach( (note) => {
            newArray.push(LOToPiano(note));
        });
        return newArray;
    }

    // split note into letter and octave
    let [letter, octave] = i.split("/");
    octave = parseInt(octave)

    // list all note names
    const letters = ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'];
    let letter_number = letters.findIndex(element => element === letter.toLowerCase());

    if (letter_number < 3 && octave != 0) {;
        return letter_number + 12 * (octave) + 1

    } else if (letter_number >= 3 && octave != 0){
        return letter_number + 12 * (octave - 1) + 1;

    } else if (letter_number < 3){
        return letter_number + 1;
    } else {
        // note doesn't exist
        throw 'letter / octave notation note does not exist';
    }
}

/**
 * convert from piano key numbering to midi numbering
 * @param {} i note or array of notes in piano numering
 * @returns note(s) in midi numbers
 */
function pianoToMIDI(i) {

    // if i is an array, recursively convert each element individually and return new array
    if (Array.isArray(i)) {
        let newArray = []
        i.forEach( (note) => {
            newArray.push(pianoToMIDI(note));
        });
        return newArray;
    }
    return i + 20;
}

function MIDIToPiano(i) {
    
    // if i is an array, recursively convert each element individually and return new array
    if (Array.isArray(i)) {
        let newArray = []
        i.forEach( (note) => {
            newArray.push(MIDIToPiano(note));
        });
        return newArray;
    }
    return i - 20;
}
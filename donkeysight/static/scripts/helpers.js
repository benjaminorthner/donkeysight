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
function indexOfSmaller(array, searchElement, above){
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
 * @param {number} i piano key number of note
 */
 function pianoToLO(i){

    // change from 1 indexing to 0 indexing
    i--;

    // find octave of note
    let octave = Math.floor( (i + 8) / 12)

    // list all note names so the are indexed with i % 12
    const letters = ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'];

    return letters[i % 12] + '/' + octave;
}

/**
 * Converts from letter/octave notation to piano key number, e.g. a#/1 -> 13
 * @param {string} i letter/octave notation form of note
 */
function LOToPiano(i){
    // split note into letter and octave
    let [letter, octave] = i.split("/");

    // list all note names
    const letters = ['a', 'a#', 'b', 'c', 'c#', 'd', 'd#', 'e', 'f', 'f#', 'g', 'g#'];

    // + 1 to switch from 0 based to 1 based indexing
    let pianoKeyNumber = 1 + letters.findIndex(element => element === letter.toLowerCase()) + 12 * parseInt(octave);
}
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
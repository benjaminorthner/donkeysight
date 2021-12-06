/**
 * returns the x coordinate (in px) for the caret in front of the n'th tickable in the voice object
 * @param {number} n index of the note within the voice for which the caret position is returned
 * @param {object} voice VF.Voice object containing formatted notes of the current row/stave
 * @param {number} caretWidth width of caret (px)
 * @param {number} caretPadding max distance between caret and previous note (px)
 */
 function getCaretXOnTickableN(n, voice, caretWidth, caretPadding){

    let posX = 0;
    let caretCenter = caretWidth / 2

    // if n==0 (first note on line) use the stave property start_x to find position
    if (n===0) {
        // find position of first note (tickable)
        // stave_start + 0.5 * width of gap to first note 
        posX = voice.tickables[n].stave.start_x + 0.5 * voice.tickables[n].width;
        return posX - caretCenter;
    }

    // search through all note heads in this tickable and find leftmost one
    posX = 0;
    voice.tickables[n].note_heads.forEach((nhead) => {
        if (nhead.x < posX || posX === 0) {
            posX = nhead.x;
        }
    });

    // if accidentals exists shift caret position by accidental width to the left of leftmost note head 
    if ("accidentals" in voice.tickables[n].modifierContext.modifiers){
        posX -= voice.tickables[n].modifierContext.modifiers.accidentals[0].modifier_context.width;
    }

    // find position of right edge of previous note
    let prevPosXEnd = 0
    voice.tickables[n-1].note_heads.forEach((nhead) => {
        if (nhead.x + nhead.width > prevPosXEnd) {
            prevPosXEnd = nhead.x + nhead.width;
        }
    });

    // if enough space allow max padding
    if (posX - 2*caretPadding > prevPosXEnd) {
        return posX - caretPadding - caretCenter;
    }
    //else (if not overlapping) put exactly between previous note and current note
    if (posX > prevPosXEnd) {
        return posX - (posX - prevPosXEnd) / 2 - caretCenter;
    }
    //else place without padding
    return posX - caretCenter;
}
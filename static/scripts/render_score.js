// add stem direction

const VF = Vex.Flow;

// generate notes and add them
let note_count = 40;
let note_list = generate_music({
    n : note_count,
    max_interval: 6,
    scale: 3});

// set how many notes you want per row
let notes_per_row = 20;

// calculate how many rows we need
let row_count = Math.ceil(note_count / notes_per_row);

// for proper rendering we need to create all visible divs first, before rendering music
// save Div for every row in an array
let rowsDivs = []
for (let row = 0; row < row_count; row++) {
    // create new <div> to render Stave in
    rowsDivs.push(addStaveElement(row));
}

// update CSS for #music-container to match number of rows
const music_container = document.getElementById("music-container");
music_container.style.gridTemplateRows = "repeat(" + row_count + ", 1fr)";

// draw music into each rowDiv
rowsDivs.forEach(renderStaveIntoElement);

function renderStaveIntoElement (div, row) {
    // create an SVG renderer and attach it to the div element
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

    // Configure the rendering context.
    let box_height = div.offsetHeight;
    let box_width = 0.995*div.offsetWidth;
    renderer.resize(box_width, box_height);

    const context = renderer.getContext();
    context.scale(1,1); //size

    // Set default color of renderer to match theme
    context.setFillStyle('var(--text-color');
    context.setStrokeStyle('var(--text-color');


    // Create a stave of width box_width at position 0, 0 within the div.
    // Set color when stave is created (stave isnt connected to defaults for some reason)
    // http://www.vexflow.com/build/docs/stave.html
    let stave = new VF.Stave(0, 0, box_width, {fill_style: 'var(--sub-color)', space_above_staff_ln: 0});

    // vertically center stave in div 
    // find VF.Stave properties here https://github.com/0xfe/vexflow/blob/master/src/stave.ts
    stave.setY((box_height - (stave.getBottomLineBottomY() - stave.getTopLineTopY())) / 2);
 
    //  Add a clef and time signature.
    stave.addClef("treble");
    //stave.addTimeSignature("4/4");
    let keySignature = 'A';
    stave.addKeySignature(keySignature);

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();
    
    // get the notes that belong in this row
    let current_row_notes = note_list.slice(row * notes_per_row, (row + 1) * notes_per_row);
    
    // and converts to list of vexflow StaveNote objects;
    let notes = []
    current_row_notes.forEach(note => {
        notes.push(new VF.StaveNote({clef : "treble", keys: note, duration: "q"}));
    });

    let voice = new VF.Voice({num_beats: current_row_notes.length, beat_value: 4});
    voice.addTickables(notes);

    //apply accidental symbols based on key signature
    VF.Accidental.applyAccidentals([voice], keySignature); 

    // -10 to leave some padding before the end of the stave (for very high notes_per_row values)
    const note_drawing_width = stave.getNoteEndX() - stave.getNoteStartX() - 10;

    // format notes on voice and draw
    new VF.Formatter().joinVoices([voice]).format([voice], note_drawing_width);
    voice.draw(context, stave);


 
    // place the caret at the start of the line
    const caretHeight = parseInt($(".caret").css("height"));
    const caretWidth = parseInt($(".caret").css("width"));
    const caretPadding = caretWidth + 1;

    $(`#caret-${row}`).css("transform",`translateX(${getCaretXOnTickableN(0, voice, caretWidth, caretPadding)}px) translateY(${(box_height - caretHeight)/2}px)`);
 
    // for 0th row caret: remove class hidden and apply flashing animation
    if (row === 0) {
        $(`#caret-${row}`).css({"class": "caret", "animation-name": "caretFlashSmooth"})        
        $(`#caret-${row}`).css("transform",`translateX(${getCaretXOnTickableN(3, voice, caretWidth, caretPadding)}px) translateY(${(box_height - caretHeight)/2}px)`);
    }
    
}

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

function addStaveElement (row) {
    // create a new div element and set its id
    const newDiv = document.createElement("div");
    newDiv.setAttribute("class", "stave");
    newDiv.setAttribute("id", `stave-${row}`);
    
    // add a caret to the stave div, animation: None, opacity: 0
    const newCaret = document.createElement("div");
    newCaret.setAttribute("class", "caret hidden");
    newCaret.setAttribute("id", `caret-${row}`);
    newCaret.setAttribute("style", "animation-name: None");
    newDiv.appendChild(newCaret);

    // append to parentDiv
    document.getElementById("music-container").appendChild(newDiv);
    
    // return div to be used as render target for Vexflow
    return newDiv;
}
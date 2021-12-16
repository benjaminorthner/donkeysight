renderScore()

function renderScore () {
    // still need to add stem direction
    const VF = Vex.Flow;

    // generate notes and add them
    let totalNoteCount = generalConfigObject.totalNoteCount;
    let notesPerRow = generalConfigObject.notesPerRow;

    let note_list = generate_music({
        n : totalNoteCount,
        max_interval: 6,
        scale: 4});

    // calculate how many rows we need
    let row_count = Math.ceil(totalNoteCount / notesPerRow);

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


    // draw music into each rowDiv and save stave config object into list
    rowsDivs.forEach((div, row) => {
        
        // get the notes that belong in this row
        let current_row_notes = note_list.slice(row * notesPerRow, (row + 1) * notesPerRow);
        
        staveConfigObjects.push(renderStaveIntoElement(div, current_row_notes, row, VF))
    });
}


function renderStaveIntoElement (div, current_row_notes, row, VF) {
    // create an SVG renderer and attach it to the div element
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

    // Configure the rendering context.
    let box_height = div.offsetHeight;
    let box_width = div.offsetWidth;
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
    runStatsObject.totalStaveCount++;

    // vertically center stave in div 
    // find VF.Stave properties here https://github.com/0xfe/vexflow/blob/master/src/stave.ts
    stave.setY((box_height - (stave.getBottomLineBottomY() - stave.getTopLineTopY())) / 2);
 
    //  Add a clef and time signature.
    stave.addClef("treble");
    //stave.addTimeSignature("4/4");
    let keySignature = 'C';
    stave.addKeySignature(keySignature);

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();
    
    // and converts to list of vexflow StaveNote objects;
    let notes = []
    current_row_notes.forEach(note => {
        let staveNote = new VF.StaveNote({clef : "treble", keys: note, duration: "q"})
        staveNote.setStyle({shadowBlur:0, fillStyle:'var(--sub-color)', strokeStyle:'var(--sub-color)'});
        notes.push(staveNote);
    });

    let voice = new VF.Voice({num_beats: current_row_notes.length, beat_value: 4});
    voice.addTickables(notes);

    //apply accidental symbols based on key signature   
    VF.Accidental.applyAccidentals([voice], keySignature); 

    // -10 to leave some padding before the end of the stave (for very high notesPerRow values)
    const note_drawing_width = stave.getNoteEndX() - stave.getNoteStartX() - 10;

    // format notes on voice and draw
    new VF.Formatter().joinVoices([voice]).format([voice], note_drawing_width);
    voice.draw(context, stave);


 
    // place the caret at the start of the line
    const caretJQ = $(`#caret-${row}`)
    const caretHeight = parseInt(caretJQ.css("height"));
    const caretWidth = parseInt(caretJQ.css("width"));
    const caretPadding = 2*caretWidth;
    const caretStartPos = 0

    caretJQ.css("transform",`translateX(${getCaretXOnTickableN(0, voice, caretWidth, caretPadding)}px) translateY(${(box_height - caretHeight)/2}px)`);
 
    // for 0th row caret: remove class hidden and apply flashing animation
    if (row === 0) {
        caretJQ.css({"class": "caret", "animation-name": "caretFlashSmooth"});
        caretJQ.css("transform",`translateX(${getCaretXOnTickableN(caretStartPos, voice, caretWidth, caretPadding)}px) translateY(${(box_height - caretHeight)/2}px)`);
    }
    // get list of all note DOM objects (needed for coloring later)
    let noteDivList = div.querySelectorAll('.vf-stavenote')
    
    // return stave config object used to calc caret positions on this stave later
    return {caretJQ: caretJQ, caretNumber: row, caretPos: caretStartPos, caretPadding: caretPadding, voice: voice, noteDivList: noteDivList, box_height: box_height};
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
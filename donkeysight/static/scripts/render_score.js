const VF = Vex.Flow;

// generate notes and add them
let note_count = 30
let note_list = generate_music({
    n : note_count,
    max_interval: 6});

// set how many notes you want per row
let notes_per_row = 10

// calculate how many rows we need
let row_count = Math.ceil(note_count / notes_per_row)

// for proper rendering we need to create all visible divs first, before rendering music
// save Div for every row in an array
let rowsDivs = []
for (var row = 0; row < row_count; row++) {
    // create new <div> to render Stave in
    rowsDivs.push(addStaveElement())
}


// draw music into each rowDiv
rowsDivs.forEach((div, row) => {
    // create an SVG renderer and attach it to the div element
    const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

    // Configure the rendering context.
    const box_height = div.offsetHeight;
    const box_width = div.offsetWidth;
    renderer.resize(box_width, box_height);

    const context = renderer.getContext();
    context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
    context.scale(1,1); //size

    // Set default color of renderer to match theme
    context.setFillStyle('var(--text-color');
    context.setStrokeStyle('var(--text-color');

    // Create a stave of width box_width at position 0, 0 within the div.
    // Set color when stave is created (stave isnt connected to defaults for some reason)
    let stave = new VF.Stave(0, 0, box_width, {fill_style: 'var(--sub-color)'});

    // vertically center stave in div 
    // find VF.Stave properties here https://github.com/0xfe/vexflow/blob/master/src/stave.ts
    stave.setY((box_height - stave.getBottomY()) / 2)

    // Add a clef and time signature.
    stave.addClef("treble").addTimeSignature("4/4");
    let keySignature = 'A'
    stave.addKeySignature(keySignature)

    // Connect it to the rendering context and draw!
    stave.setContext(context).draw();

    // get the notes that belong in this row
    let current_row_notes = note_list.slice(row * notes_per_row, (row + 1) * notes_per_row)
    
    // and converts to list of vexflow StaveNote objects;
    var notes = []
    current_row_notes.forEach(note => {
        notes.push(new VF.StaveNote({clef : "treble", keys: note, duration: "q"}));
    });

    var voice = new VF.Voice({num_beats: current_row_notes.length, beat_value: 4});
    voice.addTickables(notes);

    //apply accidental symbols based on key signature
    VF.Accidental.applyAccidentals([voice], keySignature); 

    // subtract 10% of boxwidth so that notes not drawn too far right
    var formatter = new VF.Formatter().joinVoices([voice]).format([voice], box_width - 0.1 * box_width);

    voice.draw(context, stave);
});

// remove stave-target from DOM as all staves are now rendered (maybe change when dynamically rendering staves)
document.getElementById("stave-target").remove();

// update CSS for #music-container to match number of rows
const music_container = document.getElementById("music-container")
music_container.style.gridTemplateRows = "repeat(" + row_count + ", 1fr)";

function addStaveElement () {
    // create a new div element and set its id
    const newDiv = document.createElement("div");
    newDiv.setAttribute("id", "stave-" + row);

    // add the newly created element into the DOM, above stave-target
    const currentDiv = document.getElementById("stave-target");

    // get parent div
    const parentDiv = document.getElementById("music-container")
    parentDiv.insertBefore(newDiv, currentDiv);

    // return div to be used as render target for Vexflow
    return newDiv;
}
const VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "vf".
const div = document.getElementById("music-box");

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
const stave = new VF.Stave(0, 0, box_width, {fill_style: 'var(--sub-color)'});

// Add a clef and time signature.
stave.addClef("treble").addTimeSignature("4/4");

// Connect it to the rendering context and draw!
stave.setContext(context).draw();


// generate notes and add them
let note_count = 10
let note_list = generate_music({
    n : note_count,
    max_interval: 6});

// converting notes to list of vexflow StaveNote objects
var notes = []
for (let i = 0; i < note_list.length; i++) {
    notes.push(new VF.StaveNote({clef : "treble", keys: note_list[i], duration: "q"}));
}

var voice = new VF.Voice({num_beats: note_count, beat_value: 4});
voice.addTickables(notes);

var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 600);

voice.draw(context, stave);


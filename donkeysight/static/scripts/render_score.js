const VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "vf".
const div = document.getElementById("music-block");

const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Configure the rendering context.
const block_height = div.offsetHeight;
const block_width = div.offsetWidth;
console.log(block_height);
console.log(block_width);
renderer.resize(700, 100);

const context = renderer.getContext();
context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");
context.scale(1,1); //size

// Set default color of renderer to match theme
context.setFillStyle('var(--text-color');
context.setStrokeStyle('var(--text-color');

// Create a stave of width 460 at position 0, 0 on the canvas.
// Set color when stave is created (stave isnt connected to defaults for some reason)
const stave = new VF.Stave(0, 0, 700, {fill_style: 'var(--sub-color)'});

// Add a clef and time signature.
stave.addClef("treble").addTimeSignature("4/4");

// Connect it to the rendering context and draw!
stave.setContext(context).draw();

// Adding notes
var notes = [
    new VF.StaveNote({clef : "treble", keys: ["c/4"], duration: "q"}),
    new VF.StaveNote({clef : "treble", keys: ["c/5", "e/5", "d/5"], duration: "q"}),
    new VF.StaveNote({clef : "treble", keys: ["c/4"], duration: "q"}),
    new VF.StaveNote({clef : "treble", keys: ["c/5", "e/5", "d/5"], duration: "q"})
];

var voice = new VF.Voice({num_beats: 4, beat_value: 4});
voice.addTickables(notes);

var formatter = new VF.Formatter().joinVoices([voice]).format([voice], 700);

voice.draw(context, stave);


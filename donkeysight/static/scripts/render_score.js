const VF = Vex.Flow;

// Create an SVG renderer and attach it to the DIV element named "vf".
const div = document.getElementById("music-block")
const renderer = new VF.Renderer(div, VF.Renderer.Backends.SVG);

// Configure the rendering context.
renderer.resize(1000, 1000);
const context = renderer.getContext();
context.setFont("Arial", 10, "").setBackgroundFillStyle("#eed");

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
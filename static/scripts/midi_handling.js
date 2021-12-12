if (navigator.requestMIDIAccess) {
    // requests access and sets callback functions
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
} else {
    console.log('WebMIDI is not supported in this browser.');
}


// if access successful 
function onMIDISuccess(midiAccess) {
    midiAccess.addEventListener('statechange', updateDevices);

    const inputs = midiAccess.inputs;

    // some devices have multiple, hence foreach
    inputs.forEach((input) =>{
        input.addEventListener('midimessage', handleMIDIInput);
    })
}

// handle midi inputs picked up by eventListener
function handleMIDIInput(input) {
    const command = input.data[0];
    const note = input.data[1];
    const velocity = input.data[2];

    switch (command) {
        case 144: // noteOn
        if (velocity > 0) {
            noteOn(note);
        } else { // for midi keyboards that use vel = 0 instead of command=128
            noteOff(note);
        }
        break;

        case 128: // noteOff
            noteOff(note);
        break;
    }
}

/**
 * Increases currently held note count by 1 and pushes note 
 * onto list of notes held since last time without notes
 * @param {number} note midi number
 */
function noteOn(note) {
    midi_vars.noteOnCount++;
    midi_vars.currentlyOn.push(note);

    let cConfig = caret_config_objects[0]
    if (cConfig.voice.tickables[cConfig.pos].keys[0] === MIDIToLO(note)) {
        moveCaret(caret_config_objects[0])
        console.log("CORRECT")
    }
    else {
        console.log("WRONG")
    }
    
}

/**
 * reduces note count by 1
 * if all notes released pushes last set of notes onto stream,
 * grouped in an array
 * @param {number} note 
 */
function noteOff(note) {
    midi_vars.noteOnCount--;  

    if (midi_vars.noteOnCount === 0) {
        midi_vars.stream.push(midi_vars.currentlyOn);
        midi_vars.currentlyOn = [];
        console.log(midi_vars.stream)
    }
}


// event when midi device is plugged in / unplugged
function updateDevices(event) {
    console.log(event)
    console.log(`Name: ${event.port.name}\nBrand: ${event.port.manufacturer}\nState: ${event.port.state}\nType: ${event.port.type}`)
}

// if access unsuccessful
function onMIDIFailure() {
    console.log('Could not access your MIDI devices.');
}
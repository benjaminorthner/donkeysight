if (navigator.requestMIDIAccess) {
    // requests access and sets callback functions
    navigator.requestMIDIAccess().then(onMIDISuccess, onMIDIFailure);
} else {
    console.log('WebMIDI is not supported in this browser.');
}


// if access successful 
function onMIDISuccess(midiAccess) {
    console.log(midiAccess);
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
            noteOn(note, velocity);
        } else {
            noteOff(note);
        }
        break;

        case 128: // noteOff
            noteOff(note);
        break;
    }
}


function noteOn(note, velocity) {
    console.log(note, velocity)
}

function noteOff(note) {
    console.log(note)
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
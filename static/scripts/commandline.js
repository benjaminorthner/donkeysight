function hideCommandLine() {
    $("#commandLineWrapper")
        .stop(true, true)
        .css("opacity", 1)
        .animate(
        {
            opacity: 0,
        },
        100,
        () => {
            $("#commandLineWrapper").addClass("hidden");
        }
        );
}

function showCommandLine() {
    $("#commandLineWrapper").removeClass("hidden");
    $("#commandLineWrapper").css("opacity", 1);
    
    // set focus on command line and clear command line
    $("#commandLine input").val("");
    $("#commandLine input").focus();
    updateSuggested();
}


function updateSuggested() {
    // read input into list of words so partial matches per word can be made
    let inputVal = $("#commandLine input")
        .val()
        .toLowerCase()
        .split(" ")
        .filter((s, i) => s || i == 0); //remove empty entries after first

    // access dict that contains all lowest level commands/settings
    let list = currentCommandLineList[currentCommandLineList.length - 1]
    
    // if no input is given yet mark all commands as found
    if (inputVal[0] === "") {
        $.each(list.list, (index, obj) => {
            obj.found = true;
        });
    }
    showFound();
}


// shows all commands which have the found property set to true
function showFound() {

    // collects html code to display found suggestions
    let commandsHTML = ''
    let list = currentCommandLineList[currentCommandLineList.length - 1]

    // loop over each command
    $.each(list.list, (index, obj) => {
        // if an object is marked as found generate its HTML code
        if (obj.found) {
            // in the future iconHTML will contain the html code for the icon
            iconHTML = `<div class="icon"><div class="textIcon">!?</div></div>`;
            commandsHTML += `<div class="entry" command="${obj.id}">${iconHTML}<div>${obj.display}</div></div>`;
        }
    });

    // add html to suggestions element
    $("#commandLine .suggestions").html(commandsHTML);
}
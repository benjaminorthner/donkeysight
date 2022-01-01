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
}


function updateSuggested() {
    // read input into list of words so partial matches per word can be made
    let inputVal = $("#commandLine input")
        .val()
        .toLowerCase()
        .split(" ")
        .filter((s, i) => s || i == 0); //remove empty entries after first

}
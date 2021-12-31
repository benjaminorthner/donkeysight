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
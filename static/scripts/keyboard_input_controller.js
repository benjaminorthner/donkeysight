// hanndle global keypresses on the main screen
document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
        if ($("#commandLineWrapper").hasClass("hidden")){
            showCommandLine();
        }
        else {
            hideCommandLine();
        }
    }
});

// handle commandline input field inputs
$("#commandLine input")[0].addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
        hideCommandLine();
        return;
    }
  
    // update suggested commands within timeout to catch latest character
    setTimeout (() => {
        updateSuggested()
    }, 0);
});
document.addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
        console.log("ESPCAE")
        if ($("#commandLineWrapper").hasClass("hidden")){
            console.log("SHOW")
            showCommandLine();
        }
        else {
            hideCommandLine();
        }
    }
});

$("#commandLine input")[0].addEventListener('keydown', evt => {
    if (evt.key === 'Escape') {
        hideCommandLine();
    }
})


window.onload = function () {
    setTimeout(removeLoader, 3000); //wait for page load PLUS two seconds.
}

function removeLoader() {
    $("#OnLoad").fadeOut(500, function () {
        // fadeOut complete. Remove the loading div
        $("#OnLoad").remove(); //makes page more lightweight
        /*recupera la barra vertical*/
        $('body').removeClass('hidden');
    });
}

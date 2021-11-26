$(document).ready(function () {
    Ladda.bind('.ladda-button');
    $("#LoaderformId").submit(function (event) {
        var dataString;
        event.preventDefault();
        event.stopImmediatePropagation();
        var action = $("#LoaderformId").attr("action");
        // Setting.   
        dataString = new FormData($("#LoaderformId").get(0));
        contentType = false;
        processData = false;
        $.ajax(
            {
                type: "POST",
                url: action,
                data: dataString,
                dataType: "json",
                contentType: contentType,
                processData: processData,
                success: function (result) {
                    // Result.   
                    onLoaderSuccess(result);
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    //do your own thing   
                    alert("fail");
                    // Stop Button Loader.   
                    Ladda.stopAll();
                }
            });
    }); //end .submit()   
});
var onLoaderSuccess = function (result) {
    if (result.EnableError) {
        // Clear.   
        $('#ModalTitleId').html("");
        $('#ModalContentId').html("");
        // Setting.   
        $('#ModalTitleId').append(result.ErrorTitle);
        $('#ModalContentId').append(result.ErrorMsg);
        // Show Modal.   
        $('#ModalMsgBoxId').modal(
            {
                backdrop: 'static',
                keyboard: false
            });
    }
    else if (result.EnableSuccess) {
        // Clear.   
        $('#ModalTitleId').html("");
        $('#ModalContentId').html("");
        // Setting.   
        $('#ModalTitleId').append(result.SuccessTitle);
        $('#ModalContentId').append(result.SuccessMsg);
        // Show Modal.   
        $('#ModalMsgBoxId').modal(
            {
                backdrop: 'static',
                keyboard: false
            });
        // Resetting form.   
        $('#LoaderformId').get(0).reset();
    }
    // Stop Button Loader.   
    Ladda.stopAll();
}
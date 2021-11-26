$(document).ready(function () {
    $("#formLogin").submit(function (event) {
        $('#Enviar').attr('value', 'Buscando');
        var User = $("#User_Id").val();
        var Pass = $("#PassWord").val();
        var data = { User_Id: User, PassWord: Pass }
        var url = "/Login/Index";
        event.preventDefault();
        $.post(url, data)
            .done(function (data) {
                alertify.success("Usuario Correcto", "Atención")
                window.location.reload(true);
                window.location.href = "Home/Index/";
            })
            .fail(function (data) {
                $('#Enviar').attr('value', 'Buscando');
                alertify.error("Usuario Invalido", "Error")
                $("#User_Id").val("");
                $("#PassWord").val("");
                window.location.reload(true);
            })
            .always(function (data) {
                $("#User_Id").val("");
                $("#PassWord").val("");
                //window.location.reload(true);
            })
    })
})


alertify.defaults = {
    // dialogs defaults
    autoReset: true,
    basic: false,
    closable: true,
    closableByDimmer: true,
    invokeOnCloseOff: false,
    frameless: false,
    defaultFocusOff: false,
    maintainFocus: true, // <== global default not per instance, applies to all dialogs
    maximizable: true,
    modal: true,
    movable: true,
    moveBounded: false,
    overflow: true,
    padding: true,
    pinnable: true,
    pinned: true,
    preventBodyShift: false, // <== global default not per instance, applies to all dialogs
    resizable: true,
    startMaximized: false,
    transition: 'pulse',
    transitionOff: false,
    tabbable: 'button:not(:disabled):not(.ajs-reset),[href]:not(:disabled):not(.ajs-reset),input:not(:disabled):not(.ajs-reset),select:not(:disabled):not(.ajs-reset),textarea:not(:disabled):not(.ajs-reset),[tabindex]:not([tabindex^="-"]):not(:disabled):not(.ajs-reset)',  // <== global default not per instance, applies to all dialogs
    // notifier defaults
    notifier: {
        // auto-dismiss wait time (in seconds)  
        delay: 5,
        // default position
        position: 'top-center',
        // adds a close button to notifier messages
        closeButton: true,
        // provides the ability to rename notifier classes
        classes: {
            base: 'alertify-notifier',
            prefix: 'ajs-',
            message: 'ajs-message',
            top: 'ajs-top',
            right: 'ajs-right',
            bottom: 'ajs-bottom',
            left: 'ajs-left',
            center: 'ajs-center',
            visible: 'ajs-visible',
            hidden: 'ajs-hidden',
            close: 'ajs-close'
        }
    },
    // language resources 
    glossary: {
        // dialogs default title
        title: 'Atención',
        // ok button text
        ok: 'OK',
        // cancel button text
        cancel: 'Cancel'
    },
    // theme settings
    theme: {
        // class name attached to prompt dialog input textbox.
        input: 'ajs-input',
        // class name attached to ok button
        ok: 'ajs-ok',
        // class name attached to cancel button 
        cancel: 'ajs-cancel'
    },
    // global hooks
    hooks: {
        // invoked before initializing any dialog
        preinit: function (instance) { },
        // invoked after initializing any dialog
        postinit: function (instance) { },
    },
};
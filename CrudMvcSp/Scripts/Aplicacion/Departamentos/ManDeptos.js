var iddepto, Nomdepto;

$(document).ready(function () {
                    //Carga Modal
    $("#BtnNueDep").click(function (event) {
        event.preventDefault();
        $("#AgrDep").modal("show");
    });
    //fin de carga Modal

    //$("#NomDep").on('keyup', function (e) {
    //    Nomdepto = $("#NomDep").val();
    //    if (Nomdepto == "") {
    //        alertify.error("Nombre Departamento NO Puede Estar Vacío!!!!", "Atención");
    //        $("#NomDep").focus();
    //    }
    //    else {
    //        $("#BtnGrab").focus();
    //    }
    //})

    $("#BtnGrab").click(function (event) {   
        $("#BtnGrab").attr('value', 'Grabando....');
        Nomdepto = $("#NomDep").val();
       var data = { NomDepto: Nomdepto }
       var url = "/Deptos/GrabaDepto";
       event.preventDefault();
        $.post(url, data)
            .done(function (data) {
                alertify.success("Datos Grabados", "Atención");
            })
            .fail(function (data) {
                alertify.error("Error De Grabación", "Error");
            })
            .error(function (error) {
                window.location.href = "/Error/ErrorGeneral/";
            })
            .always(function (data) {
            $("#NomDep").val("");
            $("#AgrDep").modal("hide");
            window.location.reload(true);
            })
    });

    //detecta la fila seleccionada en en webgrid 
    $("body").on("click", "#Tabldepto td", function () {
        var row = $(this).closest("tr");
        iddepto = row.find("td").eq(0).html();
        var nombdep = row.find("td").eq(1).html();
        $("#ModNomDep").val(nombdep);
        $("#ModDep").modal("show");
    })

    // Modificación de datos
    $("#BtnMod").click(function (event) {
        event.preventDefault();
        nombdep = $("#ModNomDep").val();
        //$("#EdDep").attr('value', 'Actualizando.....');
        var data = { Id_Depto: iddepto, NomDepto: nombdep }
        var url = "/Deptos/EditDept"
        $.post(url, data)
            .done(function (data) {
                alertify.success("Datos Modificados", "Atención");
            })
            .fail(function (data) {
                alertify.error("Error De Modificación", "Error");
            })
            .error(function (error) {
                window.location.href = "/Error/ErrorGeneral/";
            })
            .always(function (data) {
                $("#ModNomDep").val("");
                $("#ModDep").modal("hide");
                window.location.reload(true);
            })
    })
    //Fin Modificacion de Datos
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
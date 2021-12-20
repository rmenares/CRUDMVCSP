var idCargo, NomCarg;

$(document).ready(function () {
    //Carga Modal Cargos    
    $("#BtnNueCarg").click(function (event) {
        event.preventDefault();
        $("#AgrCarg").modal("show");
    });
    // fin modal cargos   
   

    //Graba Cargos
    $("#BtnGrabCarg").click(function (event) {
  
            NomCarg = $("#NomCarg").val();
            if (NomCarg == "") {
                alertify.error("Cargo NO Puede Estar Vacío!!!!", "Atención");
                $("#NomCarg").focus();
            }
            else {
                $("#BtnGrabCarg").focus();
            }

            $("#BtnGrabCarg").attr('value', 'Grabando....');
            var data = { Descr_Cargo: NomCarg }
            var url = "/Cargos/GrabaCargos";
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
                    $("#NomCarg").val("");
                    window.location.reload(true);
                })
    });

    //Modifica Cargos
    //detecta la fila seleccionada en en webgrid 
    $("body").on("click", "#TablaCargos td", function () {
        var row = $(this).closest("tr");
        idCargo = row.find("td").eq(0).html();
        var nomCargo = row.find("td").eq(1).html();
        //Carga Modal de Modificacion
        $("#ModNomCarg").val(nomCargo);
        $("#ModCarg").modal("show");
    })

    //toma los datos y envia las modificaciones
    $("#BtnModCarg").click(function (event) {
        event.preventDefault();
        nombCargo = $("#ModNomCarg").val();
        var data = { Id_Carg: idCargo, Descr_Cargo: nombCargo }
        var url = "/cargos/EditCarg"
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
                $("#ModDep").modal("hide");
                window.location.reload(true);
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
var idNac, NomNac;

$(document).ready(function () {

    //Carga Modal Nacionalidad    
    $("#BtnNueNac").click(function (event) {
        event.preventDefault();
        $("#AgrNac").modal("show");
    });
    // fin modal cargos

    $("#NomNacion").on('keyup', function (event) {
        event.preventDefault();
        var keycode = event.keyCode || event.which;
        if (keycode == 13) {
            NomNac = $("#NomNacion").val();
            if (NomNac == "") {
                alertify.error("Nacionalidad NO Puede Estar Vacío!!!!", "Atención")
                $("#NomNacion").focus();
            }
            else {
                $("#BtnGrabNac").focus();
            }
        }
    })

    //Graba Nacionalidad
    $("#BtnGrabNac").click(function (event) {
      $("#BtnGrabNac").attr('value', 'Grabando....');
      var data = { Descripcion: NomNac }
      var url = "/Nacionalidad/GrabaNacionalidad";
      event.preventDefault();
      $.post(url, data)
          .done(function (data) {
              alertify.success("Datos Grabados", "Atención")
          })
          .fail(function (data) {
              alertify.error("Error De Grabación", "Error")
          })
          .always(function (data) {
              $("#NomNacion").val("");
              $("#AgrNac").modal("hide"); 
              window.location.reload(true);
          })
    });

    //Modifica Nacionalidad
    //detecta la fila seleccionada en en webgrid 
    $("body").on("click", "#TablaNacionalidad td", function () {
        var row = $(this).closest("tr");
        idNac = row.find("td").eq(0).html();
        var NomNac = row.find("td").eq(1).html();
        //Carga Modal de Modificacion
        $("#ModNomNac").val(NomNac);
        $("#ModNac").modal("show");
    })

    //toma los datos y envia las modificaciones
    $("#BtnModNac").click(function (event) {
        event.preventDefault();
        NomNac = $("#ModNomNac").val();
        var data = { Id_Nac: idNac, Descripcion: NomNac }
        var url = "/Nacionalidad/EditNac"
        $.post(url, data)
            .done(function (data) {
                alertify.success("Datos Modificados", "Atención");
            })
            .fail(function (data) {
                alertify.error("Error De Modificación", "Error")
            })
            .always(function (data) {
                $("#ModNomNac").val("");
                $("#ModNac").modal("hide");
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

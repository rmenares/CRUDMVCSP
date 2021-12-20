var cod_salud;
var noisa, cotisa;

$(document).ready(function () {

    //Carga Modal
    $("#BtnNueSistSalud").click(function (event) {
        event.preventDefault();
        $("#ModAgrSistSalud").modal("show");
    });
   //fin de carga Modal

   
    //graba Sistema De Salud
    $("#BtnGrab").click(function (event) {

        $("#NomIsap").on('keyup', function (event) {
            event.preventDefault();
            noisa = $("#NomIsap").val();
            if (noisa == "") {
                alertify.error("Nombre Sistema NO Puede Estar Vacio!");
                $("#NomIsap").focus();
            }
            else {
                $("#PorcCotiz").focus();
            }
        })

        $("#PorcCotiz").on('keyup', function (event) {
            event.preventDefault();
            cotisa = $("#PorcCotiz").val();
            if (cotisa == "") {
                alertify.error("% Cotización es Obligatorio!!!!");
                $("#PorcCotiz").focus();
            }
            else {
                $("#BtnGrab").focus();
            }
        })


         $("#BtnGrab").attr('value', 'Grabando....');
         var data = { Nombre_Salud: noisa, Porc_Cotiz: cotisa };
         var url = "/Salud/GrabSalud";
         $.post(url, data)
          .done(function (data) {
              alertify.success("Datos Grabados", "Atención")
              })
             .fail(function (data) {
                 alertify.error("Error De Grabación", "Error")
             })
             .error(function (error) {
                 window.location.href = "/Error/ErrorGeneral/";
             })
          .always(function (data) {
              $("#NomIsap").val("");
              $("#PorcCotiz").val("");
              $("#AgrSistSalud").modal("hide");
              window.location.reload(true);
          })
    })

    // Modificación de datos
    //detecta la fila seleccionada en en webgrid 
    $("body").on("click", "#TablaSistSalud td", function () {
        var row = $(this).closest("tr");
        // toma los valores de la fila seleccionada
        cod_salud = row.find("td").eq(0).html();
        var NombSalud = row.find("td").eq(1).html();
        var PorcSalud = row.find("td").eq(2).html();
        // muestra los valores en las cajas
        $("#ModNomIsap").val(NombSalud);
        $("#ModPorcIsap").val(PorcSalud);
        //muestra el modal de modificacion
        $("#ModModSistSalud").modal("show");
    })

    //toma los datos y envia las modificaciones
    $("#BtnModSistSalud").click(function (event) {
        event.preventDefault();
        nomSistSalud = $("#ModNomIsap").val();
        if (nomSistSalud == "") {
            alertify.error("Nombre AFP NO Puede Estar Vacío!!!!")
            return false;
        }
        else {
            cotisa = $("#ModPorcIsap").val();
            var data = { Cod_Salud: cod_salud, Nombre_Salud: nomSistSalud, Porc_Cotiz: cotisa } 
            var url ="/Salud/ModSistSalud"
            $.post(url, data)
                .done(function (data) {
                    alertify.success("Datos Modificados", "Atención")
                })
                .fail(function (data) {
                    alertify.error("Error De Modificación", "Error")
                })
                .error(function (error) {
                    window.location.href = "/Error/ErrorGeneral/";
                })
                .always(function (data) {
                    $("#ModNomIsap").val("");
                    $("#ModPorcIsap").val("");
                    $("#ModModSistSalud").modal("hide");
                    window.location.reload(true);
                })
        }
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
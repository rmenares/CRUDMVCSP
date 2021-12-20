var RutEmp, CiudEmp, ComuEmp;
var CiudEmp2, ComuEmp2;
var NomEmp, CallPjeAvdaEmp, NumEmp, VilPobEmp;
var FonoEmp, CorreoEmp; 

$(document).ready(function () {
    //Carga Modal Empresas
    $("#BtnNueEmp").click(function (event) {
        event.preventDefault();
        $("#AgrEmp").modal("show");
    });
    // fin modal cargos     

    //Graba Empresas
    $("#BtnGrabEmp").click(function (event) {
        event.preventDefault();
        RutEmp = $("#RutEmp").val();
        NomEmp = $("#NomEmp").val();
        CallPjeAvdaEmp = $("#CallPjeEmp").val();
        NumEmp = $("#NumEmp").val();
        VilPobEmp = $("#VilpobEmp").val();
        FonoEmp = $("#FonoEmp").val();
        CorreoEmp = $("#EmaEmp").val();
        var data = {
                Rut_Empresa: RutEmp,
                Nombre_Empresa: NomEmp,
                Calle_Pje_Avda: CallPjeAvdaEmp,
                Numero: NumEmp,
                Vill_Pobl: VilPobEmp,
                Comuna_Id: ComuEmp,
                Provincia_Id: CiudEmp,
                fono: FonoEmp,
                emailemp: CorreoEmp
        }
        var url = "/Empresas/GrabaEmp";
        event.preventDefault();
        $.post(url, data)
            .done(function (data) {
                alertify.success("Datos De Empresa Grabados", "Atención")
                })
            .fail(function (data) {
                alertify.error("Problemas De Grabación", "Verifique")
            })
            .error(function (error) {
                window.location.href = "/Error/ErrorGeneral/";
            })
           .always(function (data) {
               $("#Rut_Empresa").val("");
               $("#Nombre_Empresa").val("");
               $("#Calle_Pje_Avda").val("");
               $("#Numero").val("");
               $("#Vill_Pobl").val("");
               $("#ComuSelec").val("--Select_List--");
               $("#Ciudad").val("");
               $("#fono").val("");
               $("#email_emp").val("");
               $("#AgrEmp").modal("hide");
               window.location.reload(true);
           })
    })
    // fin graba empresas  

    //detecta la fila seleccionada en en webgrid 
    $("body").on("click", "#TablaEmpresas td", function () {
        var row = $(this).closest("tr");
        RutEmp             = row.find("td").eq(0).html();
        var NomEmp         = row.find("td").eq(1).html();
        var CallPjeAvdaEmp = row.find("td").eq(2).html();
        var NumEmp         = row.find("td").eq(3).html();
        var VilPobEmp      = row.find("td").eq(4).html();
        var ComuEmp        = row.find("td").eq(5).html();
        var CiudEmp        = row.find("td").eq(6).html();
        var FonoEmp        = row.find("td").eq(7).html();
        var CorreoEmp      = row.find("td").eq(8).html();

        //Carga Modal de Modificacion
        $("#MODNomEmp").val(NomEmp);
        $("#MODCallPjeEmp").val(CallPjeAvdaEmp);
        $("#MODNumEmp").val(NumEmp);
        $("#MODVilpobEmp").val(VilPobEmp);
        $("#MODNomCiu").val(CiudEmp);
        $("#MODFonoEmp").val(FonoEmp);
        $("#MODEmaEmp").val(CorreoEmp);
        //Muestra la ventana Modal con los Datos
        $("#ModEmp").modal("show");
    })

    //toma los datos y envia las modificaciones 
    $("#BtnModEmp").click(function (event) {
        event.preventDefault();
        var NomEmp = $("#MODNomEmp").val();
        var CallPjeAvdaEmp = $("#MODCallPjeEmp").val();
        var NumEmp = $("#MODNumEmp").val();
        var VilPobEmp = $("#MODVilpobEmp").val();
        var ComuEmp = ComuEmp2;
        var CiudEmp = CiudEmp2;
        var FonoEmp = $("#MODFonoEmp").val();
        var CorreoEmp = $("#MODEmaEmp").val();
        var data = {
            Rut_Empresa: RutEmp,
            Nombre_Empresa: NomEmp,
            Calle_Pje_Avda: CallPjeAvdaEmp,
            Numero: NumEmp,
            Vill_Pobl: VilPobEmp,
            Comuna_Id: ComuEmp,
            Provincia_Id: CiudEmp,
            fono: FonoEmp,
            emailemp: CorreoEmp   }
        var url = "/Empresas/EditEmp"
        $.post(url, data)
            .done(function (data) {
                alertify.success("Datos Modificados", "Atención");
            })
            .fail(function (data) {
                alertify.error("Error De Modificación", "Error")
            })
            .error(function (error) {
                window.location.href = "/Error/ErrorGeneral/";
            })
            .always(function (data) {
                $("#MODNomEmp").val("");
                $("#MODCallPjeEmp").val("");
                $("#MODNumEmp").val("");
                $("#MODVilpobEmp").val("");
                $("#ComuSelec2").val("--Select_List--");
                $("#MODNomCiu").val("");
                $("#MODFonoEmp").val("");
                $("#MODEmaEmp").val("");
                $("#ModDep").modal("hide");
                window.location.reload(true);
            })
    })

    //captura el valor de dropdownList Comuna y entrega la ciudad
    $("#ComuSelec").change('click', function (event) {
        event.preventDefault();
        type: 'Post';
        ComuEmp = $("#ComuSelec").val();
        var data = { Comuna_Id: ComuEmp };
        var url = "/Empresas/CargCiu";
        $.post(url, data)
            .done(function (data) {
                var DatosDev = data[0];
                CiudEmp = DatosDev["Provincia_Id"]
                $("#NomCiu").val(DatosDev["Provincia_Nombre"])
            })
    })
       
    $("#ComuSelec2").change('click', function (event) {    
        event.preventDefault();
        type: 'Post';
        ComuEmp2 = $("#ComuSelec2").val();
        var data = { Comuna_Id: ComuEmp2 };
        var url = "/Empresas/CargCiu";
        $.post(url, data)
            .done(function (data) {
                var DatosDev = data[0];
                CiudEmp2 = DatosDev["Provincia_Id"]
                $("#MODNomCiu").val(DatosDev["Provincia_Nombre"])
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


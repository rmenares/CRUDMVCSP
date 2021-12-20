var CodCiud, RutEmp, RutEmple;
var RutEmp, RutCgFm, NomCgFm, ApPatCgFm, ApMatCgFm, FonoMovilCgFm, FonoFijCgFm; 
var FechNacCgFm, CallePjeCgFm, NumCasaCgFm, VilPoblCgFm, EmailCgFm, DescrCgFm;

$(document).ready(function () {
    //carga Modal Ingreso de Empleados
    $("#BtnNueCargFam").click(function (event) {
        event.preventDefault();
        $("#AgrCargFam").modal("show");
    });

    //formatea el campo fecha
    $(function () {
        $("#FechNacGarFam").datepicker({
            autoSize: true,
            dateFormat: "dd/mm/yy",
            changeMonth: true,
            changeYear: true,
            language: "es",
            firstDay: 1,
            showOn: "both",
            buttonText: "<i class='fa fa-calendar'></i>"
        });
    });

    $(function () {
        $("#ModFechNacGarFam").datepicker({
            autoSize: true,
            dateFormat: "dd/mm/yy",
            changeMonth: true,
            changeYear: true,
            language: "es",
            firstDay: 1,
            showOn: "both",
            buttonText: "<i class='fa fa-calendar'></i>"
        });
    });
    
    ////verifica si el empleado esta en la tabla de empleados
    //$("#RutEmp").on('keyup', function (event) {
    //    //permite capturar el valor de la tecla pulsada
    //    var keycode = event.keyCode || event.which;
    //    //verifica si el codigo de la tecla es ENTER
    //    if (keycode == 13) {
    //        RutEmp = $("#RutEmp").val();
    //        if (RutEmp == "") {
    //            alertify.error("El Rut Empleado NO Puede Estar Vacio!", "Verifique");
    //            $("#RutEmp").focus();
    //        }
    //        else {
    //            var data = { Rut_Empleado: RutEmp };
    //            var url = "/CargFam/BuscEmp";
    //            $.post(url, data)
    //                .done(function (data) {
    //                    if (data == 1) { $("#RutCargFam").focus(); }
    //                    else {
    //                        alertify.error(" Empleado Incorrecto, Verifique ", "Atención");
    //                        $("#RutEmp").val("");
    //                        $("#RutEmp").focus();
    //                    }
    //                });
    //        }
    //    }
    //});
    
    //$("#RutCargFam").on('keyup', function (event) {
    //    var keycode = event.keyCode || event.which;
    //    if (keycode == 13) {
    //        RutCgFm = $("#RutCargFam").val();
    //        if (RutCgFm == "") {
    //            alertify.error("El Rut NO Puede Estar Vacio!", "Verifique");
    //            $("#RutCargFam").focus();
    //        }
    //        else {  $("#NomCargFam").focus(); }
    //    }
    //})

    //$("#NomCargFam").on('keyup', function (event) {
    //    var keycode = event.keyCode || event.which;
    //    if (keycode == 13) {
    //        NomCgFm = $("#NomCargFam").val();
    //        if (NomCgFm == "") {
    //            alertify.error("El Nombre NO Puede Estar Vacio!", "Verifique");
    //            $("#NomCargFam").focus();
    //        }
    //        else {
    //            $("#ApPatCargFam").focus();
    //        }
    //    }
    //})
    
    //$("#ApPatCargFam").on('keyup', function (event) {
    //    var keycode = event.keyCode || event.which;
    //    if (keycode == 13) {
    //        ApPatCgFm = $("#ApPatCargFam").val();
    //        if (NomCgFm == "") {
    //            if (ApPatCgFm == "") {
    //                alertify.error("El Apellido NO Puede Estar Vacio!", "Verifique");
    //                $("#ApPatCargFam").focus();
    //            }
    //            else {
    //                $("#ApMatCargFam").focus();
    //            }
    //        }
    //    }
    //})
    
//$("#ApMatCargFam").on('keyup', function (event) {
//    var keycode = event.keyCode || event.which;
//        if (keycode == 13) { 
//            ApMatCgFm = $("#ApMatCargFam").val();
//            if (ApMatCgFm == "") {
//                alertify.error("El Apellido Materno NO Puede Estar Vacio!", "Verifique");
//                $("#ApMatCargFam").focus();
//            }
//            else {
//                $("#FonoMovCargFam").focus();
//            }
//        }
//    })

//$("#FonoMovCargFam").on('keyup', function (event) {
//    var keycode = event.keyCode || event.which;
//        if (keycode == 13) {
//            FonoMovilCgFm = $("#FonoMovCargFam").val();
//            if (FonoMovilCgFm == "") {
//                alertify.error("El Fono Movil NO Puede Estar Vacio!", "Verifique");
//                $("#FonoMovCargFam").focus();
//            }
//            else {
//                $("#FonoFijoCargFam").focus();
//            }
//        }
//    })

//   $("#FonoFijoCargFam").on('keyup', function (event) {
//    var keycode = event.keyCode || event.which;
//        if (keycode == 13) {
//            FonoFijCgFm = $("#FonoFijoCargFam").val();
//            if (FonoFijCgFm == "") {
//                alertify.error("El Fono Fijo NO Puede Estar Vacio!", "Verifique");
//                $("#FonoFijoCargFam").focus();
//            }
//            else {
//                $("#FechNacGarFam").focus();
//            }
//        }
//    })

//$("#FechNacGarFam").on('keyup', function (event) {
//    var keycode = event.keyCode || event.which;
//        if (keycode == 13) {
//            FechNacCgFm = $("#FechNacGarFam").val();
//            if (FechNacCgFm == "") {
//                alertify.error("La Fecha de Nacimiento NO Puede Estar Vacia!", "Verifique");
//                $("#FechNacGarFam").focus();
//            }
//            else {
//                $("#SexoSelec").focus();
//            }
//        }
//    })

 

    //$("#EmaiCarFam").on('keyup', function (event) {
    //    var keycode = event.keyCode || event.which;
    //    if ((keycode == 13)) {
    //        EmailCgFm = $("#EmaiCarFam").val();
    //        if (EmailCgFm == " ") {
    //            alertify.error("El Email NO Puede Estar Vacio o es Incorrecto!", "Verifique");
    //            $("#EmaiCarFam").focus();
    //        }
    //        else {
    //             $("#CallPjeCargFam").focus();
    //        }
    //    }
    //})

   //$("#CallPjeCargFam").on('keyup', function (event) {
   //    var keycode = event.keyCode || event.which;
   //     if (keycode == 13) {
   //         CallePjeCgFm = $("#CallPjeCargFam").val();
   //         if (CallePjeCgFm == "") {
   //             alertify.error("La Calle/Pje NO Puede Estar Vacio!", "Verifique");
   //             $("#CallPjeCargFam").focus();
   //         }
   //         else {
   //             $("#NumCasaCargFam").focus();
   //         }
   //     }
   // })

    //$("#NumCasaCargFam").on('keyup', function (event) {
    //    var keycode = event.keyCode || event.which;
    //    if (keycode == 13) {
    //        NumCasaCgFm = $("#NumCasaCargFam").val();
    //        if (NumCasaCgFm == "") {
    //            alertify.error("El Número NO Puede Estar Vacio!", "Verifique");
    //            $("#NumCasaCargFam").focus();
    //        }
    //        else{
    //            $("#Villa_PoblCargFam").focus();          
    //        }
    //    }
    //})

    //$("#Villa_PoblCargFam").on('keyup', function (event) {
    //    var keycode = event.keyCode || event.which;
    //    if (keycode == 13) {
    //        VilPoblCgFm = $("#Villa_PoblCargFam").val();
    //        if (VilPoblCgFm == "") {
    //            alertify.error("El Dato NO Puede Estar Vacio!", "Verifique");
    //            $("#Villa_PoblCargFam").focus();
    //        }
    //        else{
    //            $("#ComuCargFam").focus();
    //        }
    //    }
    //})
       


    //$("#DescrCargFam").on('keyup', function (event) {
    //    var keycode = event.keyCode || event.which;
    //    if (keycode == 13) {
    //        DescrCgFm = $("#DescrCargFam").val();
    //        if (DescrCgFm == "") {
    //            alertify.error("La Descripción NO Puede Estar Vacia!", "Verifique");
    //            $("#DescrCargFam").focus();
    //        }
    //        else {
    //            $("#BtnGrabEmp").focus();
    //        }
    //    }
    //})

    //captura el Codigo de dropdownList Sexo Seleccionado
    $("#SexoSelec").change('click', function (event) {
        event.preventDefault();
        SexoSelec = $("#SexoSelec").val();
        if (SexoSelec == "") {
            alertify.error("El Sexo NO Puede Estar Vacio!", "Verifique");
            $("#SexoSelec").focus();
        }
        else {
            $("#EmaiCarFam").focus();
        }        
    })


    //captura el Codigo de dropdownList Nacionalidad Seleccionado
    $("#NacioSelec").change('click', function (event) {
        event.preventDefault();
        NacioSelec = $("#NacioSelec").val();
        if (NacioSelec == "") {
            alertify.error("Debe Seleccionar Una Nacionalidad!", "Verifique");
            $("#NacioSelec").focus();
        }
        else {
            $("#DescrCargFam").focus();
        }
    })

    //captura el valor de dropdownList Comuna y entrega la ciudad
    $("#ComuCargFam").change('click', function (event) {
        event.preventDefault();
        type: 'Post';
        ComuCgFm = $("#ComuCargFam").val();
        if (ComuCgFm == "") {
            alertify.error("La Comuna NO Puede Estar Vacio!", "Verifique");
            $("#ComuCargFam").focus();
        }
        else {
            var data = { Comuna_Id: ComuCgFm };
            var url = "/CargFam/CargCiu";
            $.post(url, data)
                .done(function (data) {
                    var DatosDev = data[0];
                    CodCiud = DatosDev["Provincia_Id"]
                    $("#NomCiuCargFam").val(DatosDev["Provincia_Nombre"])
                })
            CodCiCgFm = CodCiud;
            $("#NacioSelec").focus();
        }
    })

    //Graba Carga Familiar       
    $("#BtnGrabEmp").click(function (event) {
        RutEmp = $("#RutEmp").val();
        RutCgFm = $("#RutCargFam").val();
        NomCgFm = $("#NomCargFam").val();
        ApPatCgFm = $("#ApPatCargFam").val();
        ApMatCgFm = $("#ApMatCargFam").val();
        SexoSelec = $("#SexoSelec").val();
        NacioSelec = $("#NacioSelec").val();
        FonoMovilCgFm = $("#FonoMovCargFam").val();
        ComuCgFm = $("#ComuCargFam").val();
        FonoFijCgFm = $("#FonoFijoCargFam").val();
        FechNacCgFm = $("#FechNacGarFam").val();
        EmailCgFm = $("#EmaiCarFam").val();
        CallePjeCgFm = $("#CallPjeCargFam").val();
        NumCasaCgFm = $("#NumCasaCargFam").val();
        VilPoblCgFm = $("#Villa_PoblCargFam").val();
        DescrCgFm = $("#DescrCargFam").val();
           var data = {
                Rut_Benef: RutCgFm,
                Nombre: NomCgFm,
                ApPat: ApPatCgFm,
                ApMat: ApMatCgFm,
                Telefono1: FonoMovilCgFm,
                Telefono2: FonoFijCgFm,
                Fecha_Nac: FechNacCgFm,
                Cod_Sexo: SexoSelec,
                Calle_Pje: CallePjeCgFm,
                Num_Casa: NumCasaCgFm,
                Villa_Pobl: VilPoblCgFm,
                Comuna_Id: ComuCgFm,
                Provincia_Id: CodCiud,
                email: EmailCgFm,
                Rut_Empleado: RutEmp,
                Id_Nac: NacioSelec,
                Descripcion: DescrCgFm
           }
            var url = "/CargFam/GrabCargFam";
            event.preventDefault();            
            $.post(url, data)
                .done(function (data) {
                    alertify.success(" Datos Grabados ", "Atención");
                })
                .fail(function (data) {
                    alertify.error(" Error De Grabación, Verifique!!! ", "Error");
                })
                .error(function (error) {
                    window.location.href = "/Error/ErrorGeneral/";
                })
                .always(function (data) {
                    $("#RutEmp").val("");
                    $("#RutCargFam").val("");
                    $("#NomCargFam").val("");
                    $("#ApPatCargFam").val("");
                    $("#ApMatCargFam").val("");
                    $("#FonoMovCargFam").val("");
                    $("#FonoFijoCargFam").val("");
                    $("#FechNacGarFam").val("");
                    $("#SexoSelec").val("Seleccione Sexo");
                    $("#CallPjeCargFam").val("");
                    $("#NumCasaCargFam").val("");
                    $("#Villa_PoblCargFam").val("");
                    $("#ComuCargFam").val("Seleccione Comuna");
                    $("#ModNomCiuCargFam").val("");
                    $("#CodCiud").val("");
                    $("#EmaiCarFam").val("");
                    $("#NacioSelec").val("Seleccione Nacionalidad");
                    $("#DescrCargFam").val("");
                    $("#AgrCargFam").modal("hide");
                    window.location.reload(true);
                })
    })

    //boton edicion de Datos
    $("body").on("click", "#TablaCargFam TBODY .Edit", function (event) {
        event.preventDefault();
        $("#ModCargFam").modal("show");
        var row = $(this).closest("tr");
        RutCgFm = row.find("td").eq(0).html();
        type: 'Post';
        var data = { Rut_Benef: RutCgFm };
        var url = "/CargFam/BuscCargFam";
        $.post(url, data)
            .done(function (data) {
                // pasa los datos devueltos a un arreglo
                var DatosCarFam = data[0];
                // pasa los datos del arreglo a las cajas
                $("#ModRutCargFam").val(DatosCarFam.Rut_Benef);
                $("#ModNomCargFam").val(DatosCarFam.Nombre);
                $("#ModApPatCargFam").val(DatosCarFam.ApPat);
                $("#ModApMatCargFam").val(DatosCarFam.ApMat);
                $("#ModFonoMovCargFam").val(DatosCarFam.Telefono1);
                $("#ModFonoFijoCargFam").val(DatosCarFam.Telefono2);
                $("#ModFechNacGarFam").val(DatosCarFam.Fecha_Nacimiento);
                $("#ModSexoSelec").val(DatosCarFam.Cod_Sexo);
                $("#ModEmaiCarFam").val(DatosCarFam.email);
                $("#ModCallPjeCargFam").val(DatosCarFam.Calle_Pje);
                $("#ModNumCasaCargFam").val(DatosCarFam.Num_Casa);
                $("#ModVilla_PoblCargFam").val(DatosCarFam.Villa_Pobl);
                $("#ModComuCargFam").val(DatosCarFam.Comuna_Id);
                $("#ModNomCiuCargFam").val(BuscaCiudad());
                $("#ModNacioSelec").val(DatosCarFam.Id_Nac);
                $("#ModDescrCargFam").val(DatosCarFam.Descripcion);
                $("#ModRutEmp").val(DatosCarFam.Rut_Empleado);
            })
            .error(function (error) {
                window.location.href = "/Error/ErrorGeneral/";
            })
    })

    //Modifica la Comuna de la Carga Familiar
    $("#ModComuCargFam").change('click', function (event) {
        event.preventDefault();
        type: 'Post';
        ComuCgFm = $("#ModComuCargFam").val();
        var data = { Comuna_Id: ComuCgFm };
        var url = "/CargFam/CargCiu";
        $.post(url, data)
            .done(function (data) {
                var DatosDev = data[0];
                CodCiud = DatosDev["Provincia_Id"]
                $("#ModNomCiuCargFam").val(DatosDev["Provincia_Nombre"])
            })
    })
    
    //Modifica Datos Cargas Familiares
    $("#BtnModCargFam").click(function (event) {
        SexoSelec          = document.getElementById("ModSexoSelec").value;        
        NacioSelec         = document.getElementById("ModNacioSelec").value;
        ComCargFam         = document.getElementById("ModComuCargFam").value;
        ModRutCgFm         = $("#ModRutCargFam").val();
        NomCargFam         = $("#ModNomCargFam").val();
        ApPatCargFam       = $("#ModApPatCargFam").val();
        ApeMatCargFam      = $("#ModApMatCargFam").val();
        FonoMovilCargFam   = $("#ModFonoMovCargFam").val();
        FonoFijoCagFam     = $("#ModFonoFijoCargFam").val();
        FechaNacCargFam    = $("#ModFechNacGarFam").val();
        Calle_Pje_CargFam  = $("#ModCallPjeCargFam").val();
        NumCasaCargFam     = $("#ModNumCasaCargFam").val();
        Villa_Pobl_CargFam = $("#ModVilla_PoblCargFam").val();       
        CiuCargFam         = $("#ModNomCiuCargFam").val();
        EmailCargFAm       = $("#ModEmaiCarFam").val();
        DescrCargFam = $("#ModDescrCargFam").val();
        RutEmp = $("#ModRutEmp").val();
        var data = {
            Rut_Benef: ModRutCgFm,
            Nombre: NomCargFam,
            ApPat: ApPatCargFam,
            ApMat: ApeMatCargFam,
            Telefono1: FonoMovilCargFam,
            Telefono2: FonoFijoCagFam,
            Fecha_Nac: FechaNacCargFam,
            Cod_Sexo: SexoSelec,
            Calle_Pje: Calle_Pje_CargFam,
            Num_Casa: NumCasaCargFam,
            Villa_Pobl: Villa_Pobl_CargFam,
            Comuna_Id: ComCargFam,
            Provincia_Id: CodCiud,
            email: EmailCargFAm,
            Rut_Empleado: RutEmp,
            Id_Nac: NacioSelec,
            Descripcion: DescrCargFam
        };
        var url = "/CargFam/ModCargFam";
        event.preventDefault();
        $.post(url, data)
            .done(function (data) {
                alertify.success(" Datos Modificados ", "Atención");
            })
            .fail(function (data) {
                alertify.error(" Error De Grabación, Verifique!!! ", "Error");
            })
            .error(function (error) {
                window.location.href = "/Error/ErrorGeneral/";
            })
            .always(function (data) {
                $("#ModRutEmp").val("");
                $("#ModRutCargFam").val("");
                $("#ModNomCargFam").val("");
                $("#ModApPatCargFam").val("");
                $("#ModApMatCargFam").val("");
                $("#ModFonoMovCargFam").val("");
                $("#ModFonoFijoCargFam").val("");
                $("#ModFechNacGarFam").val("");
                $("#ModSexoSelec").val("Seleccione Sexo");
                $("#ModCallPjeCargFam").val("");
                $("#ModNumCasaCargFam").val("");
                $("#ModVilla_PoblCargFam").val("");
                $("#ModComuCargFam").val("Seleccione Comuna");
                $("#ModNomCiuCargFam").val("");
                $("#ModCodCiud").val("");
                $("#ModEmaiCarFam").val("");
                $("#ModNacioSelec").val("Seleccione Nacionalidad");
                $("#ModDescrCargFam").val("");
                $("#AgrCargFam").modal("hide");
                window.location.reload(true);
            })
    })

    //Manipulador del evento Delete (Eliminar)
    $("body").on("click", "#TablaEmpleados TBODY .Delete", function (event) {
        event.preventDefault();
        if (confirm("Do you want to delete this row?")) {
            var row = $(this).closest("tr");
            RutCgFm = row.find("td").eq(0).html();
            var data = { Rut_Benef: RutCgFm };
            var url = "/CargFam/ElimCargFam";
            $.post(url, data)
                .done(function (data) {
                    alertify.success(" Carga Eliminada ", "Atención");
                })
                .error(function (error) {
                    window.location.href = "/Error/ErrorGeneral/";
                })
                .always(function (data) {
                    $("#AgrCargFam").modal("hide");
                    window.location.reload(true);
                })
        }
    });
})

//formatea el objeto de fecha
$.datepicker.regional['es'] = {
    closeText: 'Cerrar',
    prevText: '< Ant',
    nextText: 'Sig >',
    currentText: 'Hoy',
    monthNames: ['Enero', 'Febrero', 'Marzo', 'Abril', 'Mayo', 'Junio', 'Julio', 'Agosto', 'Septiembre', 'Octubre', 'Noviembre', 'Diciembre'],
    monthNamesShort: ['Ene', 'Feb', 'Mar', 'Abr', 'May', 'Jun', 'Jul', 'Ago', 'Sep', 'Oct', 'Nov', 'Dic'],
    dayNames: ['Domingo', 'Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes', 'Sábado'],
    dayNamesShort: ['Dom', 'Lun', 'Mar', 'Mié', 'Juv', 'Vie', 'Sáb'],
    dayNamesMin: ['Do', 'Lu', 'Ma', 'Mi', 'Ju', 'Vi', 'Sá'],
    weekHeader: 'Sm',
    dateFormat: 'dd/mm/yy',
    firstDay: 1,
    isRTL: false,
    showMonthAfterYear: false,
    yearSuffix: ''
};
$.datepicker.setDefaults($.datepicker.regional['es']);

//permite identificar la fila seleccionada del WebGrid
$(function () {
    var row = $("#TablaEmpleados TBODY tr:eq(0)");
    if ($("#TablaEmpleados TBODY tr").length > 1) {
        //row.remove();
    }
    else {
        row.find(".label").html("");
        row.find(".text").val("");
        row.find(".link").hide();
    }
});

//funcion Busca Ciudad
function BuscaCiudad() {
    type: 'Post';
    var ComuPaso = $("#ModComuCargFam").val();
    var data = { Comuna_Id: ComuPaso };
    var url = "/CargFam/CargCiu";
    $.post(url, data)
        .done(function (data) {
            DatosDev = data[0];
            CodCiud = DatosDev["Provincia_Id"];
            return $("#ModNomCiuCargFam").val(DatosDev["Provincia_Nombre"]);
        })
        .error(function (error) {
            window.location.href = "/Error/ErrorGeneral/";
        })
}   


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
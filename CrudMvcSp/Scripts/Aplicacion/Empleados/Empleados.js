var NomEmp, ApPatEmp, ApMatEmp, AnexoEmp;
var EmaEmp, FechIncEmp, CallPjeEmp, NumCasaEmp;
var Villa_PoblEmp, CodCiudad, FonoPer, EmailPer;
var FechNacEmp, PerEmerEmp, FonPerEmerEmp, Ret;
var DeptSelec, CargEmp, RutEmpre, AfpSelec;
var SalSelec, SexoSelec, NacioSelec, ComuEmp;
var CodCiud, FechNacEmp, RutEmp, EDCodCiud;
var ComuPaso, DatosDev, EDCodCiud;
//var formdata;

$(document).ready(function () {
    //activa camara
    //Webcam.set({
    //    width: 150,
    //    height: 150,
    //    image_format: 'jpeg',
    //    jpeg_quality: 90
    //});
    //Webcam.attach('#my_camera');

    //permite mostrar las cajas de fecha como calendarios DtPicker, y formateados al formato nacional
    // Fecha de Incorporacion
    $(function () {
        $("#FechIncEmp").datepicker({
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

    //Fecha de Nacimiento
    $(function () {
        $("#FechNacEmp").datepicker({
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
        $("#EDFechIncEmp").datepicker({
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
        $("#EDFechNacEmp").datepicker({
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

    //carga Modal Ingreso de Empleados
    $("#BtnNueEmpl").click(function (event) {
        event.preventDefault();
        $("#AgrEmpleados").modal("show");
    });
    // fin modal cargos

        $("#AfpSelec").change('click', function (event) {
            event.preventDefault();
            AfpSelec = $("#AfpSelec").val();
        })

        $("#SalSelec").change('click', function (event) {
            event.preventDefault();
            SalSelec = $("#SalSelec").val();
        })

        $("#SexoSelec").change('click', function (event) {
            event.preventDefault();
            SexoSelec = $("#SexoSelec").val();
        })

        $("#NacioSelec").change('click', function (event) {
            event.preventDefault();
            NacioSelec = $("#NacioSelec").val();
        })

        $("#ComuEmp").change('click', function (event) {
            event.preventDefault();
            ComuEmp = $("#ComuEmp").val();
            if (ComuEmp == "") {
                alertify.error("La Comuna NO Puede Estar Vacio!", "Verifique");
                $("#ComuEmp").focus();
            }
            else {
                var data = { Comuna_Id: ComuEmp };
                var url = "/Empleados/CargCiu";
                $.post(url, data)
                    .done(function (data) {
                        var DatosDev = data[0];
                        CodCiud = DatosDev["Provincia_Id"]
                        $("#NomCiu").val(DatosDev["Provincia_Nombre"])
                    })
            }
        })

    //Graba Los Datos Seleccionados
    $("#BtnGrabEmp").click(function (event) {
        RutEmp = $("#RutEmp").val();
        NomEmp = $("#NomEmp").val();
        ApPatEmp = $("#ApPatEmp").val();
        ApMatEmp = $("#ApMatEmp").val();
        DeptSelec = $("#DeptSelec").val();
        CargEmp = $("#CargSelec").val();
        AnexoEmp = $("#AnexoEmp").val();
        EmaEmp = $("#EmaEmp").val();
        FechIncEmp = $("#FechIncEmp").val();
        RutEmpre = $("#RutEmpre").val();
        AfpSelec = $("#AfpSelec").val();
        SalSelec = $("#SalSelec").val();
        SexoSelec = $("#SexoSelec").val();
        NacioSelec = $("#NacioSelec").val();
        CallPjeEmp = $("#CallPjeEmp").val();
        NumCasaEmp = $("#NumCasaEmp").val();
        Villa_PoblEmp = $("#Villa_PoblEmp").val();
        ComuEmp = $("#ComuEmp").val();
        FonoPer = $("#FonoPer").val();
        EmailPer = $("#EmailPer").val();
        FechNacEmp = $("#FechNacEmp").val();
        PerEmerEmp = $("#PerEmerEmp").val();
        FonPerEmerEmp = $("#FonPerEmerEmp").val();
        Ret = 'N';
        var data = {
            Rut_Empleado: RutEmp,
            Nombre: NomEmp,
            ApePat: ApPatEmp,
            ApeMat: ApMatEmp,
            Id_Depto: DeptSelec,
            Id_Carg: CargEmp,
            Anexo: AnexoEmp,
            EmailEmp: EmaEmp,
            Fecha_Incorporacion: FechIncEmp,
            Rut_Empresa: RutEmpre,
            Id_Sexo: SexoSelec,
            Id_Nac: NacioSelec,
            //Foto_Usuario: file,
            Fecha_Despido: '',
            Retirado: Ret,
            Cod_Afp: AfpSelec,
            Cod_Salud: SalSelec,
            Calle_Pje: CallPjeEmp,
            NumCasa: NumCasaEmp,
            Vill_Pobl: Villa_PoblEmp,
            Comuna_Id: ComuEmp,
            Provincia_Id: CodCiud,
            Fono: FonoPer,
            Persona_Emergencia: PerEmerEmp,
            Fono_Emergencia: FonPerEmerEmp,
            Email: EmailPer,
            Fecha_Nacimiento: FechNacEmp                
        };
        var url = "/Empleados/GrabEmpl";
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
                    $("#NomEmp").val("");
                    $("#ApPatEmp").val("");
                    $("#ApMatEmp").val("");
                    $("#DeptSelec").val("");
                    $("#CargSelec").val("");
                    $("#AnexoEmp").val("");
                    $("#EmaEmp").val("");
                    $("#FechIncEmp").val("");
                    $("#foto").val("");
                    $("#RutEmpre").val("");
                    $("#AfpSelec").val("");
                    $("#SalSelec").val("");
                    $("#SexoSelec").val("");
                    $("#NacioSelec").val("");
                    $("#CallPjeEmp").val("");
                    $("#NumCasaEmp").val("");
                    $("#Villa_PoblEmp").val("");
                    $("#ComuEmp").val("");
                    $("#NomCiu").val("");
                    $("#FonoPer").val("");
                    $("#EmailPer").val("");
                    $("#FechNacEmp").val("");
                    $("#PerEmerEmp").val("");
                    $("#FonPerEmerEmp").val("");
                    $("#AgrEmpleados").modal("hide");
                    window.location.reload(true);
                })
    });    

    $("#EDComuEmp").change('click', function (event) {
        event.preventDefault();
        type: 'Post';
        ComuEmp = $("#EDComuEmp").val();
        var data = { Comuna_Id: ComuEmp };
        var url = "/Empleados/CargCiu";
        $.post(url, data)
            .done(function (data) {
                DatosDev = data[0];
                EDCodCiud = DatosDev["Provincia_Id"]
                $("#EDNomCiu").val(DatosDev["Provincia_Nombre"])
            })
            .error(function (error) {
                window.location.href = "/Error/ErrorGeneral/";
            })
    })   

    //Manipulador del evento Edit(ar)
    $("body").on("click", "#TablaEmpleados TBODY .Edit", function (event) {
        event.preventDefault();
        $("#ModEmpleados").modal("show");
        var row = $(this).closest("tr");
        RutEmp = row.find("td").eq(0).html();
        type: 'Post';
        var data = { Rut_Empleado: RutEmp };
        var url = "/Empleados/BuscEmp";    
        $.post(url, data)
            .done(function (data) {
                // pasa los datos devueltos a un arreglo
                var DatosEmp = data[0];
                // pasa los datos del arreglo a las cajas
                //$("#user_img").val(DatosEmp.Foto_Usuario)
                $("#EDRutEmp").val(RutEmp);
                $("#EDComuEmp").val(DatosEmp.Comuna_Id);
                ComuPaso = DatosEmp.Comuna_Id;
                $("EDNomCiu").val(BuscaCiudad());
                $("#EDNomEmp").val(DatosEmp.Nombre);
                $("#EDApPatEmp").val(DatosEmp.ApePat)
                $("#EDApMatEmp").val(DatosEmp.ApeMat)
                $("#EDDeptSelec").val(DatosEmp.Id_Depto)
                $("#EDCargSelec").val(DatosEmp.Id_Carg);
                $("#EDAnexoEmp").val(DatosEmp.Anexo)
                $("#EDEmaEmp").val(DatosEmp.EmailEmp)
                $("#EDFechIncEmp").val(DatosEmp.Fecha_Incorporacion)
                $("#EDRutEmpre").val(DatosEmp.Rut_Empresa);
                $("#EDAfpSelec").val(DatosEmp.Cod_Afp);
                $("#EDSalSelec").val(DatosEmp.Cod_Salud);
                $("#EDSexoSelec").val(DatosEmp.Id_Sexo);
                $("#EDNacioSelec").val(DatosEmp.Id_Nac);
                $("#EDCallPjeEmp").val(DatosEmp.Calle_Pje)
                $("#EDNumCasaEmp").val(DatosEmp.NumCasa)
                $("#EDVilla_PoblEmp").val(DatosEmp.Vill_Pobl)
                $("#EDFonoPer").val(DatosEmp.Fono)
                $("#EDEmailPer").val(DatosEmp.Email)
                $("#EDFechNacEmp").val(DatosEmp.Fecha_Nacimiento)
                $("#EDPerEmerEmp").val(DatosEmp.Persona_Emergencia)
                $("#EDFonPerEmerEmp").val(DatosEmp.Fono_Emergencia)
            })
            .error(function (error) {
                window.location.href = "/Error/ErrorGeneral/";
            })
    });

    // Moodifica Datos del Empleado
    $("#BtnModEmp").click(function (event) {
        DeptSelec  = document.getElementById("EDDeptSelec").value;
        CargEmp    = document.getElementById("EDCargSelec").value;
        RutEmpre   = document.getElementById("EDRutEmpre").value;
        AfpSelec   = document.getElementById("EDAfpSelec").value;
        SalSelec   = document.getElementById("EDSalSelec").value;
        SexoSelec  = document.getElementById("EDSexoSelec").value;
        NacioSelec = document.getElementById("EDNacioSelec").value;               
        NomEmp        = $("#EDNomEmp").val();
        ApPatEmp      = $("#EDApPatEmp").val();
        ApMatEmp      = $("#EDApMatEmp").val();
        AnexoEmp      = $("#EDAnexoEmp").val();
        EmaEmp        = $("#EDEmaEmp").val();
        FechIncEmp    = $("#EDFechIncEmp").val();
        CallPjeEmp    = $("#EDCallPjeEmp").val();
        NumCasaEmp    = $("#EDNumCasaEmp").val();
        Villa_PoblEmp = $("#EDVilla_PoblEmp").val();
        ComPaso       = $("#EDComuEmp").val();
        CodCiudad     = EDCodCiud;
        FonoPer       = $("#EDFonoPer").val();
        EmailPer      = $("#EDEmailPer").val();
        FechNacEmp    = $("#EDFechNacEmp").val();
        PerEmerEmp    = $("#EDPerEmerEmp").val();
        FonPerEmerEmp = $("#EDFonPerEmerEmp").val();
        /*Foto_User = formdata;*/
        var data = {
            Rut_Empleado: RutEmp,
            Nombre: NomEmp,
            ApePat: ApPatEmp,
            ApeMat: ApMatEmp,
            Id_Depto: DeptSelec,
            Id_Carg: CargEmp,
            Anexo: AnexoEmp,
            EmailEmp: EmaEmp,
            Fecha_Incorporacion: FechIncEmp,
            Rut_Empresa: RutEmpre,
            Id_Sexo: SexoSelec,
            Id_Nac: NacioSelec,
            Foto_Usuario : '',
            Cod_Afp: AfpSelec,
            Cod_Salud: SalSelec,
            Calle_Pje: CallPjeEmp,
            NumCasa: NumCasaEmp,
            Vill_Pobl: Villa_PoblEmp,
            Comuna_Id: ComPaso,
            Provincia_Id: CodCiudad,
            Fono: FonoPer,
            Persona_Emergencia: PerEmerEmp,
            Fono_Emergencia: FonPerEmerEmp,
            Email: EmailPer,
            Fecha_Nacimiento: FechNacEmp            
        };
        var url = "/Empleados/ModEmpl";
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
                $("#EDRutEmp").val("");
                $("#EDNomEmp").val("");
                $("#EDApPatEmp").val("");
                $("#EDApMatEmp").val("");
                $("#EDDeptSelec").val("");
                $("#EDCargSelec").val("");
                $("#EDAnexoEmp").val("");
                $("#EDEmaEmp").val("");
                $("#EDFechIncEmp").val("");
                $("#TomaFoto").val("");
                $("#EDRutEmpre").val("");
                $("#EDAfpSelec").val("");
                $("#EDSalSelec").val("");
                $("#EDSexoSelec").val("");
                $("#EDNacioSelec").val("");
                $("#EDCallPjeEmp").val("");
                $("#EDNumCasaEmp").val("");
                $("#EDVilla_PoblEmp").val("");
                $("#EDComuEmp").val("");
                $("#EDNomCiu").val("");
                $("#EDFonoPer").val("");
                $("#EDEmailPer").val("");
                $("#EDFechNacEmp").val("");
                $("#EDPerEmerEmp").val("");
                $("#EDFonPerEmerEmp").val("");
                $("#ModEmpleados").modal("hide");
                window.location.reload(true);
            })
    })

    $("body").on("click", "#TablaEmpleados TBODY .Info", function (event) {
        //event.preventDefault();
        var row = $(this).closest("tr");
        RutEmp = row.find("td").eq(0).html();
        var data = { Rut_Empleado: RutEmp };
        var url = "/Empleados/FichEmp";
        $.post(url, data)
            .done(function (data) {
                alertify.success(" Informe Terminado ", "Atención");
        })
            .fail(function (data) {
                alertify.error(" Error De Lectura, Verifique!!! ", "Error");
         })
    });

    //Manipulador del evento Delete (Eliminar)
    $("body").on("click", "#TablaEmpleados TBODY .Delete", function (event) {
        event.preventDefault();
        if (confirm("Do you want to delete this row?")) {
            var row = $(this).closest("tr");
            RutEmp = row.find("td").eq(0).html();
            var data = { Rut_Empleado: RutEmp };
            var url = "/Empleados/EliminaEmpleado";
            $.post(url, data)
                .done(function (data) {
                    alertify.success(" Empleado Despedido ", "Atención");
                })
                .error(function (error) {
                    window.location.href = "/Error/ErrorGeneral/";
                })
                .always(function (data) {
                    $("#AgrEmpleados").modal("hide");
                    window.location.reload(true);
                })
         }
    });

    $("#BtnImpFich").click(function (event) {
        event.preventDefault();
        type: 'Post';
        var data = { Rut_Empleado: RutEmp };
        var url = "/Empleados/FichaEmplPdf";
        $.post(url, data)
            .done(function (data) {
                $("#ModEmpleados").modal("hide");
            })
            .error(function (error) {
                window.location.href = "/Error/ErrorGeneral/";
            })
    });

    //captura imagen y toma foto
    //$("#TomaFoto").click(function (event) {
    //    event.preventDefault();
    //    // take snapshot and get image data
    //    Webcam.snap(function (data_uri) {
    //        document.getElementById("#TomaFoto").innerHTML = '<img id="base64image" src="' + data_uri + '"/>';
    //    });
    //    var file = document.getElementById("base64image").src;
    //    var formdata = new FormData();
    //    formdata.append("base64image", file);
    //});
 });

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
    var ComuPaso = $("#EDComuEmp").val();
    var data = { Comuna_Id: ComuPaso };
    var url = "/Empleados/CargCiu";
      $.post(url, data)
          .done(function (data) {
              DatosDev = data[0];
              EDCodCiud = DatosDev["Provincia_Id"];
              return $("#EDNomCiu").val(DatosDev["Provincia_Nombre"]);
              //var nomcity = DatosDev["Provincia_Nombre"];
              //return nomcity;
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

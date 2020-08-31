﻿var NomEmp, ApPatEmp, ApMatEmp, AnexoEmp;
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

    $("#RutEmp").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            RutEmp = $("#RutEmp").val();
            if (RutEmp == "") {
                toastr["error"]("El Rut NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#RutEmp").focus();
            }
            else {
                $("#NomEmp").focus();
            }
        }
    })

    $("#NomEmp").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            NomEmp = $("#NomEmp").val();
            if (NomEmp == "") {
                toastr["error"]("El Nombre NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#NomEmp").focus();
            }
            else {
                $("#ApPatEmp").focus();
            }
        }
    })

    $("#ApPatEmp").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            ApPatEmp = $("#ApPatEmp").val();
            if (ApPatEmp == "") {
                toastr["error"]("El Apellido Paterno NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#ApPatEmp").focus();
            }
            else {
                $("#ApMatEmp").focus();
            }
        }
    })

    $("#ApMatEmp").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            ApMatEmp = $("#ApMatEmp").val();
            if (ApMatEmp == "") {
                toastr["error"]("El Apellido Materno NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#ApMatEmp").focus();
            }
            else {
                $("#DeptSelec").focus();
            }
        }
    })

    $("#DeptSelec").change('click', function (event) {
        event.preventDefault();
        DeptSelec = $("#DeptSelec").val();
        if (DeptSelec == "") {
            toastr["error"]("El Departamento NO Puede Estar Vacio!", "Verifique");
            toastr.options = {
                "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
            };
            $("#DeptSelec").focus();
        }
        else {
            $("#CargSelec").focus();
        }
    })  

    $("#CargSelec").change('click', function (event) {
        event.preventDefault();
        CargEmp = $("#CargSelec").val();
        if (CargEmp == "") {
            toastr["error"]("El Cargo NO Puede Estar Vacio!", "Verifique");
            toastr.options = {
                "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
            };
            $("#CargSelec").focus();
        }
        else {
            $("#AnexoEmp").focus();
        }
    })

    $("#AnexoEmp").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            AnexoEmp = $("#AnexoEmp").val();
            if (AnexoEmp == "") {
                toastr["error"]("El Anexo NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#AnexoEmp").focus();
            }
            else {
                $("#EmaEmp").focus();
            }    
        }
    })

    $("#EmaEmp").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            EmaEmp = $("#EmaEmp").val();
            if (EmaEmp == "") {
                toastr["error"]("El Email NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#EmaEmp").focus();
            }
            else {
                $("#FechIncEmp").focus();
            }
        }
    })

    $("#FechIncEmp").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            FechIncEmp = $("#FechIncEmp").val();
            if (FechIncEmp == "") {
                toastr["error"]("La Fecha de Inicio NO Puede Estar Vacia!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#FechIncEmp").focus();
            }
            else {
                $("#RutEmpre").focus();
            }
        }
    })

    $("#RutEmpre").change('click', function (event) {
        event.preventDefault();
        RutEmpre = $("#RutEmpre").val();
        if (RutEmpre == "") {
            toastr["error"]("El Rut Empresa NO Puede Estar Vacia!", "Verifique");
            toastr.options = {
                "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
            };
            $("#RutEmpre").focus();
        }
        else {
            $("#AfpSelec").focus();
        }
    })

    $("#AfpSelec").change('click', function (event) {
        event.preventDefault();
        AfpSelec = $("#AfpSelec").val();
        if (AfpSelec == "") {
            toastr["error"]("La Afp NO Puede Estar Vacio!", "Verifique");
            toastr.options = {
                "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
            };
            $("#AfpSelec").focus();
        }
        else {
            $("#SalSelec").focus();
        }
    })
    
    $("#SalSelec").change('click', function (event) {
        event.preventDefault();
        SalSelec = $("#SalSelec").val();
        if (SalSelec == "") {
            toastr["error"]("El Sistema De Salud NO Puede Estar Vacio!", "Verifique");
            toastr.options = {
                "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
            };
            $("#SalSelec").focus();
        }
        else {
            $("#SexoSelec").focus();
        }
    })

    $("#SexoSelec").change('click', function (event) {
        event.preventDefault();
        SexoSelec = $("#SexoSelec").val();
        if (SexoSelec == "") {
            toastr["error"]("El Sexo NO Puede Estar Vacio!", "Verifique");
            toastr.options = {
                "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
            };
            $("#SexoSelec").focus();
        }
        else {
            $("#NacioSelec").focus();
        }
    })

    $("#NacioSelec").change('click', function (event) {
        event.preventDefault();
        NacioSelec = $("#NacioSelec").val();
        if (NacioSelec == "") {
            toastr["error"]("La Nacionalidad NO Puede Estar Vacio!", "Verifique");
            toastr.options = {
                "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
            };
            $("#NacioSelec").focus();
        }
        else {
            $("#CallPjeEmp").focus();
        }
    })

    $("#CallPjeEmp").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            CallPjeEmp = $("#CallPjeEmp").val();
            if (CallPjeEmp == "") {
                toastr["error"]("La Calle/Pasaje NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#CallPjeEmp").focus();
            }
            else {
                $("#NumCasaEmp").focus();
            }
        }
    })

    $("#NumCasaEmp").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            NumCasaEmp = $("#NumCasaEmp").val();
            if (NumCasaEmp == "") {
                toastr["error"]("El Número De Casa NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#NumCasaEmp").focus();
            }
            else {
                $("#Villa_PoblEmp").focus();
            }
        }
    })

    $("#Villa_PoblEmp").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            Villa_PoblEmp = $("#Villa_PoblEmp").val();
            if (Villa_PoblEmp == "") {
                toastr["error"]("La Villa/Población NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#Villa_PoblEmp").focus();
            }
            else {
                $("#ComuEmp").focus();
            }
        }
    })

    $("#ComuEmp").change('click', function (event) {
        event.preventDefault();
        ComuEmp = $("#ComuEmp").val();
        if (ComuEmp == "") {
            toastr["error"]("La Comuna NO Puede Estar Vacio!", "Verifique");
            toastr.options = {
                "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
            };
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
            CodCiudad = CodCiud;
            $("#FonoPer").focus();
        }
    })
    
    $("#FonoPer").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            FonoPer = $("#FonoPer").val();
            if (FonoPer == "") {
                toastr["error"]("El Fono Personal NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                return false;
            }
            else {
                $("#EmailPer").focus();
            }
        }
    })

    $("#EmailPer").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            EmailPer = $("#EmailPer").val();
            if (EmailPer == "") {
                toastr["error"]("El Email Personal NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#EmailPer").focus();
            }
            else {
                $("#FechNacEmp").focus();
            }
        }
    })

    $("#FechNacEmp").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            FechNacEmp = $("#FechNacEmp").val();
            if (FechNacEmp == "") {
                toastr["error"]("La Fecha de Nacimiento NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#FechNacEmp").focus();
            }
            else {
                $("#PerEmerEmp").focus();
            }
        }
    })

    $("#PerEmerEmp").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            PerEmerEmp = $("#PerEmerEmp").val();
            if (PerEmerEmp == "") {
                toastr["error"]("La Persona De Emergencia NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#PerEmerEmp").focus();
            }
            else {
                $("#FonPerEmerEmp").focus();
            }
        }
    })

    $("#FonPerEmerEmp").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            FonPerEmerEmp = $("#FonPerEmerEmp").val();
            if (FonPerEmerEmp == "") {
                toastr["error"]("El Fono Persona de Emergencia NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#FonPerEmerEmp").focus();
            }
            else {
                $("#BtnGrabEmp").focus();
            }
        }
    })
    
    //Graba Los Datos Seleccionados
    $("#BtnGrabEmp").click(function (event) {  
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
            Foto_Usuario: file,
            Fecha_Despido: '',
            Retirado: Ret,
            Cod_Afp: AfpSelec,
            Cod_Salud: SalSelec,
            Calle_Pje: CallPjeEmp,
            NumCasa: NumCasaEmp,
            Vill_Pobl: Villa_PoblEmp,
            Comuna_Id: ComuEmp,
            Provincia_Id: CodCiudad,
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
                    toastr["success"](" Datos Grabados ", "Atención")
                    toastr.options = {
                        "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false, "positionClass": "toast-top-center", "preventDuplicates": false,
                        "onclick": null, "showDuration": "400", "hideDuration": "1000", "timeOut": "5000",
                        "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    };
                })
            .fail(function (data) {
                    toastr["error"](" Error De Grabación, Verifique!!! ", "Error")
                    toastr.options = {
                        "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false,
                        "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "400",
                        "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                        "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                    }
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
                toastr["success"](" Datos Grabados ", "Atención")
                toastr.options = {
                    "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false, "positionClass": "toast-top-center", "preventDuplicates": false,
                    "onclick": null, "showDuration": "400", "hideDuration": "1000", "timeOut": "5000",
                    "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
            })
            .fail(function (data) {
                toastr["error"](" Error De Grabación, Verifique!!! ", "Error")
                toastr.options = {
                    "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "400",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                }
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
            toastr["success"](" Informe Terminado ", "Atención")
            toastr.options = {
                "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false, "positionClass": "toast-top-center", "preventDuplicates": false,
                "onclick": null, "showDuration": "400", "hideDuration": "1000", "timeOut": "5000",
                "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
        })
         .fail(function (data) {
                toastr["error"](" Error De Lectura, Verifique!!! ", "Error")
                toastr.options = {
                    "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "400",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                }
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
                toastr["success"](" Empleado Despedido ", "Atención")
                toastr.options = {
                    "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false, "positionClass": "toast-top-center", "preventDuplicates": false,
                    "onclick": null, "showDuration": "400", "hideDuration": "1000", "timeOut": "5000",
                    "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }                    
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
}   
   

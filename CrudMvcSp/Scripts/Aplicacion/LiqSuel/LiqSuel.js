﻿

$(document).ready(function () {
    
    $("#BtnNueLiqSueld").click(function (event) {
        event.preventDefault();
        $("#AgrLiqSueld").modal("show");
    })

    //formatea el campo fecha
    $(function () {
        $("#FechLiq").datepicker({
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

    //verifica si el empleado esta en la tabla de empleados
    $("#RutEmp").on('keyup', function (e) {
        //permite capturar el valor de la tecla pulsada
        var keycode = e.keyCode || e.which;
        //verifica si el codigo de la tecla es ENTER
        if (keycode == 13) {
            var RutEmple = $("#RutEmp").val();
            var data = { Rut_Empleado: RutEmple };
            var url = "/LiqSueld/BuscEmp";
            $.post(url, data)
                .done(function (data) {
                    if (data == 1) { $("#ListTipRem").focus(); }
                    else {
                        toastr["error"](" Empleado Incorrecto, Verifique ", "Atención")
                        toastr.options = {
                            "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false, "positionClass": "toast-top-center", "preventDuplicates": false,
                            "onclick": null, "showDuration": "400", "hideDuration": "1000", "timeOut": "5000",
                            "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn",
                            "hideMethod": "fadeOut"
                        };
                        $("#RutEmp").val("");
                        $("#RutEmp").focus();
                    }
                });
        }
    });

        //Add Header Row with TextBoxes.
        var row = $("<TR />");
        $("#WebGrid TR").eq(0).find("TH").each(function () {
            row.append("<th><input type = 'text' /></th>");
        });
        $("#WebGrid TR").eq(0).after(row);

        //Applying the QuickSearch Plugin to each TextBox.
        $("#WebGrid TR").eq(1).find("INPUT").each(function (i) {
            $(this).quicksearch("#WebGrid tr:not(:has(th))", {
                'testQuery': function (query, txt, row) {
                    return $(row).children(":eq(" + i + ")").text().toLowerCase().indexOf(query[0].toLowerCase()) != -1;
                }
            });
        });

    //Calculos de la Liquidacion de Sueldo




    //Calcula Las Horas Extras
    $("#CantHrsExt").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            //Cantidad Horas Extras
            CantHrsExt = $("#CantHrsExt").val();
            if (CantHrsExt <= "40") {
                //horas Extras
                var factor1 = 0.2333333 / 45; // 45 es la jornada semanal
                var factor2 = 50 / 100 + 1
                var TotFactores = factor1 * factor2
                SuelBase = $("#SueldBas").val();
                //precio de la hora Extra
                ValorHrExt = TotFactores * SuelBase;
                // saldo Total de las Horas Extras.
                totHrsExt = (ValorHrExt * CantHrsExt);
                //convierte a entero
                totHrsExt = totHrsExt | 0;
                $("#ValHrsExt").val(totHrsExt);
                $("#ValComi").focus();
            }
            else {
                toastr["error"](" No Puede Haber Más de 40 Horas Extras Al Mes ", "Atención")
                toastr.options = {
                    "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false, "positionClass": "toast-top-center", "preventDuplicates": false,
                    "onclick": null, "showDuration": "400", "hideDuration": "1000", "timeOut": "5000",
                    "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
                $("#CantHrsExt").val("")
                $("#CantHrsExt").focus();
            }            
        }
    })


    




    // grabar datos 
    $("#BtnGrabLiqSueld").click(function (event) {
        RutEmp = $("#RutEmp").val();
        TipRem = $("#ListTipRem").val();
        fechLLiq = $("#FechLiq").val();
        SuelBase = $("#SueldBas").val();
        DiasTrab = $("#DiasTrab").val();
        PorcGrat = $("#PorcGrat").val();
        ValorGrat = $("#ValorGrat").val();     
        ValComi = $("#ValComi").val();
        Bon = $("#Bonos").val();
        ValColac = $("#ValCola").val();
        ValMov = $("#ValMov").val();
        CodAfp = $("#AfpSelec").val();
        NomAfp = $("#MontoAfp").val();
        NomSal = $("#SalSelec").val();
        MonSal = $("#MontoSalud").val();
        ValSegCe = $("#ValCesantia").val();
        ValTotImp = $("#TotImp").val();
        ValApv = $("#ValApv").val();
        OtDesc = $("#OtDesc").val();
        TotPagar = $("#TotPagar").val();

        if (Verifica() != false) {
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
            var url = "LiqSueld/GrabLiqSueld";
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
                    $("#ListTipRem").val("");
                    $("#FechLiq").val("");
                    $("#SueldBas").val("");
                    $("#DiasTrab").val("");
                    $("#PorcGrat").val("");
                    $("#ValorGrat").val("");
                    $("#CantHrsExt").val("");
                    $("#ValHrsExt").val("");
                    $("#ValComi").val("");
                    $("#Bonos").val("");
                    $("#ValCola").val("");
                    $("#ValMov").val("");
                    $("#AfpSelec").val("");
                    $("#MontoAfp").val("");
                    $("#SalSelec").val("");
                    $("#MontoSalud").val("");
                    $("#ValCesantia").val("");
                    $("#TotImp").val("");
                    $("#ValApv").val("");
                    $("#OtDesc").val("");
                    $("#TotPagar").val("");
                    $("#AgrLiqSueld").modal("hide");
                    window.location.reload(true);
                })
        }
        else {
            toastr["error"]("Hay Datos Que Faltan, Verifique", "Error")
            toastr.options = {
                "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false,
                "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "400",
                "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
            }
        }
    })


   

              
})

// verifica que los campos ingresados no esten vacios
function Verifica() {
    if (RutEmp == "") {
        toastr["error"]("El Rut Empleado NO Puede Estar Vacio!", "Verifique");
        toastr.options = {
            "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
            "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
            "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
            "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
        };
        return false;
    }

    if (RutCgFm == "") {
        toastr["error"]("El Rut NO Puede Estar Vacio!", "Verifique");
        toastr.options = {
            "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
            "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
            "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
            "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
        };
        return false;
    }

    if (NomCgFm == "") {
        toastr["error"]("El Nombre NO Puede Estar Vacio!", "Verifique");
        toastr.options = {
            "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
            "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
            "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
            "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
        };
        return false;
    }

    if (ApPatCgFm == "") {
        toastr["error"]("El Apellido NO Puede Estar Vacio!", "Verifique");
        toastr.options = {
            "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
            "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
            "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
            "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
        };
        return false;
    }

    if (ApMatCgFm == "") {
        toastr["error"]("El Apellido Materno NO Puede Estar Vacio!", "Verifique");
        toastr.options = {
            "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
            "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
            "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
            "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
        };
        return false;
    }

    if (FonoMovilCgFm == "") {
        toastr["error"]("El Fono Movil NO Puede Estar Vacio!", "Verifique");
        toastr.options = {
            "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
            "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
            "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
            "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
        };
        return false;
    }

    if (FonoFijCgFm == "") {
        toastr["error"]("El Fono Fijo NO Puede Estar Vacio!", "Verifique");
        toastr.options = {
            "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
            "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
            "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
            "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
        };
        return false;
    }

    if (FechNacCgFm == "") {
        toastr["error"]("La Fecha de Nacimiento NO Puede Estar Vacia!", "Verifique");
        toastr.options = {
            "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
            "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
            "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
            "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
        };
        return false;
    }

    if (SexoSelec == "") {
        toastr["error"]("El Sexo NO Puede Estar Vacio!", "Verifique");
        toastr.options = {
            "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
            "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
            "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
            "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
        };
        return false;
    }

    if (CallePjeCgFm == "") {
        toastr["error"]("La Calle/Pje NO Puede Estar Vacio!", "Verifique");
        toastr.options = {
            "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
            "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
            "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
            "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
        };
        return false;
    }

    if (NumCasaCgFm == "") {
        toastr["error"]("El Número NO Puede Estar Vacio!", "Verifique");
        toastr.options = {
            "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
            "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
            "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
            "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
        };
        return false;
    }

    if (ComuCgFm == "") {
        toastr["error"]("La Comuna NO Puede Estar Vacio!", "Verifique");
        toastr.options = {
            "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
            "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
            "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
            "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
        };
        return false;
    }

    if (CodCiud == "") {
        toastr["error"]("La Ciudad NO Puede Estar Vacio!", "Verifique");
        toastr.options = {
            "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
            "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
            "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
            "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
        };
        return false;
    }

    if (EmailCgFm == "") {
        toastr["error"]("El Email NO Puede Estar Vacio!", "Verifique");
        toastr.options = {
            "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
            "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
            "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
            "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
        };
        return false;
    }

    if (DescrCgFm == "") {
        toastr["error"]("La Descripción NO Puede Estar Vacia!", "Verifique");
        toastr.options = {
            "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
            "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
            "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
            "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
        };
        return false;
    }
}
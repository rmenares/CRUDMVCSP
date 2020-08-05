﻿
var RutEmple, TipContrat, DiasTrab

//Imponibles
var SuelBase, PorcCom, CantHrsExt, totHrsExt, PorcCom, ValCom, Bonos, Gratificacion, TotImponible;

//Desc Previsionales
var cod_afp, CodigoAfp, NomAfp, PorcAfp, MontAfp;
var csalud, CodSalud, NomSalud, PorcSalud, MonSalud, TotDescPrev;

// Impuestos
var ImptoDesde, ImptoHasta, ImptoFactor, ImptoCantAReb, ImptoTasaImpto, ImptoAPagar, TotImpuesto; 

//calcula el valor del Seguro de Cesantia
var TipContrat, MontEmpl, MontTrab, sumcesa, ValorCesantia, Cotizacion;
 
//Haberes
var ValMovi, ValColac, ValViat, ValorCesantia, TotHaberes;

// Otros Descuentos
var DesctoTrab, RemuNeta, ValPrestamos, ValOtDesc, TotOtDesc, Anticipos, Antcip, TotalPagar;
var AlcLiq, TotPag;

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
            RutEmple = $("#RutEmp").val();
            if (RutEmple == "") {
                toastr["error"](" Dato Debe Estar VACIO!!!! ", "Atención")
                toastr.options = {
                    "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false, "positionClass": "toast-top-center", "preventDuplicates": false,
                    "onclick": null, "showDuration": "400", "hideDuration": "1000", "timeOut": "5000",
                    "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
                $("#RutEmp").focus();
                return false;
            }
            else {
                var data = { Rut_Empleado: RutEmple };
                var url = "/LiqSueld/BuscEmp";
                $.post(url, data)
                .done(function (data) {
                    if (data == 1) {
                        $("#ListTipRem").focus();
                    }
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
                        return false;
                    }
                });
            }
        }
    });

    //Seleccciona el tipo de remuneracion y 
    $("#ListTipRem").change('click', function (e) {
        e.preventDefault();
        //calcula el valor del Seguro de Cesantia
        var tipRem = $("#ListTipRem").val();
        var data = { Id_Tip_Contrato: tipRem };
        var url = "/LiqSueld/BuscaValSegCes";
        $.post(url, data)
            .done(function (data) {
                var DatosDev = data[0];
                TipContrat = DatosDev["Tipo_Contrato"];
                MontEmpl = DatosDev["Monto_Empleador"];
                MontTrab = DatosDev["Monto_Trabajador"];

                if ((TipContrat == "Plazo Fijo") || (TipContrat == "Plazo Indefinido Mayor"))
                {
                    Cotizacion = MontEmpl;
                }
                if (TipContrat == "Plazo Indefinido") {
                    Cotizacion = MontTrab
                }
                $("#FechLiq").focus();
            });
    });
 
    //Ingresa o acepta la fecha de liquidación
    $("#FechLiq").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            var f = new Date();
            var fecha = f.getDate() + "/" + "0"+(f.getMonth() + 1) + "/" + f.getFullYear();
            $("#FechLiq").val(fecha);
            $("#SueldBas").focus();
        }
    })

    // Ingreso del Sueldo Base
    $("#SueldBas").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            SuelBase = document.getElementById("SueldBas").value;
            if (isNaN(SuelBase) || (SuelBase ==  "")) {
                toastr["error"](" Dato Debe Ser Numérico ", "Atención")
                toastr.options = {
                    "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false, "positionClass": "toast-top-center", "preventDuplicates": false,
                    "onclick": null, "showDuration": "400", "hideDuration": "1000", "timeOut": "5000",
                    "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn",
                    "hideMethod": "fadeOut" };
                $("#SueldBas").val("");
                $("#SueldBas").focus();
                return false;
            }
            else {
                $("#DiasTrab").focus();
            }
        }
    })

    //dias trabajados
    $("#DiasTrab").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            DiasTrab = $("#DiasTrab").val();
            if (isNaN(DiasTrab) || (DiasTrab == "")) {
                toastr["error"](" Dato Debe Ser Numérico ", "Atención")
                toastr.options = {
                    "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false, "positionClass": "toast-top-center", "preventDuplicates": false,
                    "onclick": null, "showDuration": "400", "hideDuration": "1000", "timeOut": "5000",
                    "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
                $("#DiasTrab").val("");
                $("#DiasTrab").focus();
                return false;
            }
            else { $("#CantHrsExt").focus();}                                
        }
    })

    //Calculos de la Liquidacion de Sueldo
    $("#CantHrsExt").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            //Cantidad Horas Extras
            CantHrsExt = $("#CantHrsExt").val();
            if (isNaN(CantHrsExt) || (CantHrsExt == "")) {
                toastr["error"](" Dato Debe Ser Numérico ", "Atención")
                toastr.options = {
                    "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false, "positionClass": "toast-top-center", "preventDuplicates": false,
                    "onclick": null, "showDuration": "400", "hideDuration": "1000", "timeOut": "5000",
                    "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
                $("#CantHrsExt").val("");
                $("#CantHrsExt").focus();
                return false;
            }
            else {
                //Calcula Las Horas Extras
                if (CantHrsExt <= "40") {
                    //horas Extras
                    var factor1 = 0.2333333 / 45; // 45 es la jornada semanal
                    var factor2 = 50 / 100 + 1
                    var TotFactores = factor1 * factor2
                    SuelBase = $("#SueldBas").val();
                    //precio de la hora Extra
                    ValorHrExt = TotFactores * SuelBase;
                    // saldo Total de las Horas Extras.
                    TotHrsExt = parseInt(ValorHrExt * CantHrsExt);
                    // muestra el valor a pagar por horas extras
                    $("#ValHrsExt").val(new Intl.NumberFormat("de-DE").format(TotHrsExt));
                    $("#PorcCom").focus();
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
        }
    })

    //Calulo de Comisiones
    $("#PorcCom").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            PorcCom = $("#PorcCom").val();
            if (isNaN(PorcCom) || (PorcCom=="")) {
                toastr["error"](" Dato Debe Ser Numérico ", "Atención")
                toastr.options = {
                    "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false, "positionClass": "toast-top-center", "preventDuplicates": false,
                    "onclick": null, "showDuration": "400", "hideDuration": "1000", "timeOut": "5000",
                    "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
                $("#PorcCom").val("");
                $("#PorcCom").focus();
                return false;
            }
            else {
                SuelBase = $("#SueldBas").val();
                ValCom = parseInt((SuelBase * PorcCom) / 100);
                //muestra el Valor de la comision.
                $("#ValorCom").val(new Intl.NumberFormat("de-DE").format(ValCom));
                $("#Bonos").focus();
            }
        }
    })
    
    $("#Bonos").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            Bonos = $("#Bonos").val();
            if (isNaN(Bonos) ||(Bonos == "")) {
                toastr["error"](" Dato Debe Ser Numérico ", "Atención")
                toastr.options = {
                    "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false, "positionClass": "toast-top-center", "preventDuplicates": false,
                    "onclick": null, "showDuration": "400", "hideDuration": "1000", "timeOut": "5000",
                    "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
                $("#Bonos").val("");
                $("#Bonos").focus();
                return false;
            }
            else {
                // Calculo de la Gratificación
                var Ganancias = (parseInt(SuelBase) + parseInt(ValCom) + parseInt(TotHrsExt) + parseInt(Bonos));

                var SuelDevengado = ((Ganancias * 25) / 100);
                var SueldMin = 320500;
                var GratMensual = ((SueldMin * 4.75) / 12);
                var Grat2 = (GratMensual * 4.75);
                var TopeGratMensual = parseInt(Grat2 / 12);

                if (SuelDevengado > TopeGratMensual) {

                    Gratificacion = TopeGratMensual;

                    $("#ValGrat").val(new Intl.NumberFormat("de-DE").format(Gratificacion));
                }
                if (SuelDevengado < TopeGratMensual) {

                    Gratificacion = SuelDevengado;

                    $("#ValGrat").val(new Intl.NumberFormat("de-DE").format(Gratificacion));
                }
                valgrat = $("#ValGrat").val();
                //fin calculo de la gratificacion

                //calculo de la Remuneracion Imponible
                TotImponible = parseInt(Ganancias) + parseInt(Gratificacion);

                //calculo del valor del seguro de cesantia
                ValorCesantia = parseInt((TotImponible * Cotizacion) / 100);

                $("#ValCesantia").val(new Intl.NumberFormat("de-DE").format(ValorCesantia));

                $("#TotImponible").val(new Intl.NumberFormat("de-DE").format(TotImponible));
                $("#CpTotImponible").val(new Intl.NumberFormat("de-DE").format(TotImponible));

                //Calculo de Impuestos
                SuelBase = $("#SueldBas").val();
                var data = { Desde: SuelBase };
                var url = "/LiqSueld/BuscImpto";
                $.post(url, data)
                    .done(function (data) {
                        var DatosDevImptos = data[0];
                        ImptoDesde     = DatosDevImptos["Desde"];
                        ImptoHasta     = DatosDevImptos["Hasta"];
                        ImptoFactor    = DatosDevImptos["Factor"];
                        ImptoCantAReb  = DatosDevImptos["CantAReb"];
                        ImptoTasaImpto = DatosDevImptos["TasaImpEfec"];

                        TotImpuesto = parseInt(SuelBase * ImptoFactor)

                        $("#TotImp").val(new Intl.NumberFormat("de-DE").format(TotImpuesto));

                        $("#RebaImpto").val(ImptoCantAReb);

                        ImptoAPagar = ( parseInt(SuelBase * ImptoFactor) - ImptoCantAReb);

                        $("#ImpAPagar").val(new Intl.NumberFormat("de-DE").format(ImptoAPagar));

                    })
                $("#ValMov").focus();
            }     
        }
    })

    $("#ValMov").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            ValMovi = $("#ValMov").val();
            if (isNaN(ValMovi) || (ValMovi == "")) {
                toastr["error"](" Dato Debe Ser Numérico ", "Atención")
                toastr.options = {
                    "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false, "positionClass": "toast-top-center", "preventDuplicates": false,
                    "onclick": null, "showDuration": "400", "hideDuration": "1000", "timeOut": "5000",
                    "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
                $("#ValMov").val("");
                $("#ValMov").focus();
                return false;
            }
            else {
                $("#ValMov").val(new Intl.NumberFormat("de-DE").format(ValMovi));
                $("#ValCola").focus();
            }
        }
    })
    
    $("#ValCola").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            ValColac = $("#ValCola").val();
            if (isNaN(ValColac) || (ValCola == "")) {
                toastr["error"](" Dato Debe Ser Numérico ", "Atención")
                toastr.options = {
                    "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false, "positionClass": "toast-top-center", "preventDuplicates": false,
                    "onclick": null, "showDuration": "400", "hideDuration": "1000", "timeOut": "5000",
                    "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
                $("#ValCola").val("");
                $("#ValCola").focus();
                return false;
            }
            else {
                $("#ValCola").val(new Intl.NumberFormat("de-DE").format(ValColac));
                $("#ValViatico").focus();
            }
        }
    })

    $("#ValViatico").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            ValViat = $("#ValViatico").val();
            if (isNaN(ValViat) || ValViat == "") {
                toastr["error"](" Dato Debe Ser Numérico ", "Atención")
                toastr.options = {
                    "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false, "positionClass": "toast-top-center", "preventDuplicates": false,
                    "onclick": null, "showDuration": "400", "hideDuration": "1000", "timeOut": "5000",
                    "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
                $("#ValViatico").val("");
                $("#ValViatico").focus();
                return false;
            }
            else {
                $("#ValViatico").val(new Intl.NumberFormat("de-DE").format(ValViat));
                $("#AfpSelec").focus();
            }
            TotHaberes = (parseInt(ValMovi) + parseInt(ValColac) + parseInt(ValViat) + TotImponible );
            $("#TotHaber").val(new Intl.NumberFormat("de-DE").format(TotHaberes));
            $("#AfpSelec").focus();
        }
    })
    
    $("#AfpSelec").change('click', function (e) {
        e.preventDefault();
        cod_afp = $("#AfpSelec").val();
        var data = { Cod_Afp: cod_afp };
        var url = "/LiqSueld/BuscaValAfp";
        $.post(url, data)
            .done(function (data) {
                var DatosDevAfp = data[0];
                CodigoAfp = DatosDevAfp["Cod_Afp"];
                NomAfp = DatosDevAfp["Nom_Afp"];
                PorcAfp = DatosDevAfp["Porc_Desc"];
                //SuelBase = $("#SueldBas").val();
                MontAfp = parseInt((SuelBase * PorcAfp) / 100);
                $("#MontoAfp").val(new Intl.NumberFormat("de-DE").format(MontAfp));
            });
        $("#SalSelec").focus();
    });

    $("#SalSelec").change('click', function (e) {    
        e.preventDefault();
        csalud = $("#SalSelec").val();
        var data = { Cod_Salud: csalud };       
        var url = "/LiqSueld/BuscaValSal";
        $.post(url, data)
            .done(function (data) {
                var DatosDevSal = data[0];
                CodSalud = DatosDevSal["Cod_Salud"];
                NomSalud = DatosDevSal["Nombre_Salud"];
                PorcSalud = DatosDevSal["Porc_Cotiz"];

                MonSalud = parseInt((SuelBase * PorcSalud) / 100);

                $("#MontoSalud").val(new Intl.NumberFormat("de-DE").format(MonSalud));

                // totales prevsionales
                TotDescPrev = ( parseInt(MontAfp) + parseInt(MonSalud) + parseInt(ValorCesantia));
                $("#TotDescPrev").val(new Intl.NumberFormat("de-DE").format(TotDescPrev)  );
                $("#CPTotDescPrev").val(new Intl.NumberFormat("de-DE").format(TotDescPrev));
                RemuNeta = TotImponible - TotDescPrev; 
                $("#RemNeta").val(new Intl.NumberFormat("de-DE").format(RemuNeta));

            })
    })


    $("#ValPrestmos").on('keyup', function (e) {
        e.preventDefault();
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            ValPrestamos = $("#ValPrestmos").val();
            if (ValPrestamos == "") {
                ValPrestamos = 0;
                $("#OtDesc").focus();
            }
            $("#OtDesc").focus();
        }
    })

    $("#OtDesc").on('keyup', function (e) {
        e.preventDefault();
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            ValOtDesc = $("#OtDesc").val();
            if (ValOtDesc == "") {
                ValOtDesc = 0;
            }
            else {

                TotOtDesc = parseInt(ValPrestamos + ValOtDesc);

                $("#TotDesc").val(new Intl.NumberFormat("de-DE").format(TotOtDesc));

                $("#Anticipos").focus();
            }            
        }
    })

    $("#Anticipos").on('keyup', function (e) {
        e.preventDefault();
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            Antcip = $("#Anticipos").val();
            if (Antcip == "") {
                Antcip = 0;
            }
            else {
                //Saldo Finales
                AlcLiq = (TotHaberes - TotOtDesc);

                TotPag = (AlcLiq - Antcip);

                $("#TotPagar").val(new Intl.NumberFormat("de-DE").format(TotPag));
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

      
            var data = {
                //Rut_Benef:    
                //Nombre:       
                //ApPat:        
                //ApMat:        
                //Telefono1:    
                //Telefono2:    
                //Fecha_Nac:    
                //Cod_Sexo:     
                //Calle_Pje:    
                //Num_Casa:     
                //Villa_Pobl:   
                //Comuna_Id:    
                //Provincia_Id: 
                //email:        
                //Rut_Empleado: 
                //Id_Nac:       
                //Descripcion:  
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
    })


    //Add Header Row with TextBoxes.
    var row = $("<TR />");
    $("#TablaLiqSueld TR").eq(0).find("TH").each(function () {
        row.append("<th><input type = 'text' /></th>");
    });
    $("#TablaLiqSueld TR").eq(0).after(row);

    //Applying the QuickSearch Plugin to each TextBox.
    $("#TablaLiqSueld TR").eq(1).find("INPUT").each(function (i) {
        $(this).quicksearch("#TablaLiqSueld tr:not(:has(th))", {
            'testQuery': function (query, txt, row) {
                return $(row).children(":eq(" + i + ")").text().toLowerCase().indexOf(query[0].toLowerCase()) != -1;
            }
        });
    });
             

              
})


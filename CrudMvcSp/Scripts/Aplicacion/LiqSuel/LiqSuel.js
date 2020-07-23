var SuelBase, PorcCom, CantHrsExt, totHrsExt;
var CodigoAfp, NomAfp, PorcAfp, MontAfp;
var CodSalud, NomSalud, PorcSalud;
var TipContrat, MontEmpl, MontTrab;

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
                        var sumcesa = (MontEmpl + MontTrab);
                        var ValorCesantia = ( (SuelBase * sumcesa) / 100);
                        $("#ValCesantia").val(ValorCesantia);
                    });
                $("#DiasTrab").focus();
            }
        }
    })

    //dias trabajados
    $("#DiasTrab").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            var DiasTrab = $("#DiasTrab").val();
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
            else { $("#PorcCom").focus();}                                
        }
    })

    //Calculos de la Liquidacion de Sueldo

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
                PorcCom = ((SuelBase * PorcCom) / 100);
                // lo convierte a entero
                PorcCom = PorcCom | 0;
                //muestra el Valor de la comision.
                $("#ValorCom").val(PorcCom);
                $("#CantHrsExt").focus();
            }
        }
    })

    //Calcula Las Horas Extras
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
                if (CantHrsExt <= "40") {
                    //horas Extras
                    var factor1 = 0.2333333 / 45; // 45 es la jornada semanal
                    var factor2 = 50 / 100 + 1
                    var TotFactores = factor1 * factor2
                    SuelBase = $("#SueldBas").val();
                    //precio de la hora Extra
                    ValorHrExt = TotFactores * SuelBase;
                    // saldo Total de las Horas Extras.
                    TotHrsExt = (ValorHrExt * CantHrsExt);
                    //convierte a entero
                    TotHrsExt = TotHrsExt | 0;
                    $("#ValHrsExt").val(TotHrsExt);

                    // Calculo de la Gratificación
                    var Ganancias = (SuelBase + PorcCom + TotHrsExt);
                    var SuelDevengado = ((Ganancias * 25) / 100);
                    //SuelDevengado = SuelDevengado | 0;

                    var SueldMin = 320500;

                    var GratMensual = ((SueldMin * 4, 75) / 12);

                    var Grat2 = (GratMensual * 4, 75);

                    var TopeGratMensual = (Grat2 / 12);

                    if (SuelDevengado > TopeGratMensual) {
                        $("#ValGrat").val(TopeGratMensual);
                    }
                    if (SuelDevengado < TopeGratMensual) {
                        $("#ValGrat").val(SuelDevengado);
                    }
                    $("#Bonos").focus();
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
            else {$("#ValCola").focus();  }     
        }
    })

    $("#ValCola").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            ValColac = $("#ValCola").val();
            if (isNaN(ValColac) || (ValCola =="")) {
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
            else { $("#ValMov").focus(); }
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
            else { $("#AfpSelec").focus(); }
        }
    })


    $("#AfpSelec").dblclick(function (e) {
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
                MontAfp = ((SuelBase * PorcAfp) / 100);
                //MontAfp = MontAfp | 0;
                $("#MontoAfp").val(MontAfp);
            });
        $("#SalSelec").focus();
    })

    $("#SalSelec").dblclick(function (e) {
        e.preventDefault();
        cod_salud = $("#SalSelec").val();
        var data = { Cod_Salud: cod_salud };
        var url = "/LiqSueld/BuscaValSal";
        $.post(url, data)
            .done(function (data) {
                var DatosDevSal = data[0];
                CodSalud = DatosDevSal["Cod_Salud"];
                NomSalud = DatosDevSal["Nombre_Salud"];
                PorcSalud = DatosDevSal["Porc_Cotiz"];
                //SuelBase = $("#SueldBas").val();
                MonSalud = ((SuelBase * PorcSalud) / 100);
                $("#MontoSalud").val(MonSalud);
            })
        
    })


    



    //$("#Cerrar").click(function (event) {
    //    event.preventDefault();
    //    RutEmple = "";
    //    fecha = "";
    //    SuelBase = 0;
    //    PorcCom = 0;
    //    CantHrsExt = 0;
    //    totHrsExt = 0;
    //    CodigoAfp = 0;
    //    NomAfp = 0;
    //    PorcAfp = 0;
    //    MontAfp = 0;
    //    Ganancias = 0;
    //    SuelDevengado = 0;
    //})

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


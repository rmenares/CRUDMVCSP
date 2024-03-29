﻿
var RutEmple, TipContrat, FechLiq, DiasTrab, TipRem;
var FechLiq2;

//Imponibles
var SuelBase, CantHrsExt, ValorHrExt, TotHrsExt, PorcCom, ValCom, Bonos, Gratificacion, TotImponible;

// Gratificacion
var Ganancias, SuelDevengado, SueldMin, GratMensual, Grat2, TopeGratMensual, Gratificacion, valgrat;

//Desc Previsionales
var Cod_Afp, CodigoAfp, NomAfp, PorcAfp, MontAfp;
var CSalud, CodSalud, NomSalud, PorcSalud, MonSalud, TotDescPrev;

// Impuestos
var ImptoDesde, ImptoHasta, ImptoFactor, ImptoCantAReb, ImptoTasaImpto, ImptoAPagar, TotImpuesto; 

//calcula el valor del Seguro de Cesantia
var Id_Seg_Ces, TipContrat, MontEmpl, MontTrab, sumcesa, Cotizacion, ValorCesantia;
 
//Haberes
var ValMovi, ValColac, ValViat, TotHaberes;

// Otros Descuentos
var DesctoTrab, RemuNeta, ValPrestamos, ValOtDesc, TotOtDesc, Anticipos, Antcip, TotalPagar;
var AlcLiq, TotPag;

var TipRem2, RutEmp2, FechLiq2, SuelBase2, DiasTrab2, TotHrsExt2, PorcCom2, ValCom2, Bonos2, Gratificacion2;
var TotImponible2, ValMovi2, ValColac2, ValViat2, TotHaberes2, Cod_Afp2, MontAfp2, CSalud2, MonSalud2;
var Id_Seg_Ces2, ValorCesantia2, TotDescPrev2, RemuNeta2, TotImponible2, TotImpto2, ImptoCantAReb2, ImptoAPagar2;
var ValPrestamos2,  ValOtDesc2, TotOtDesc2, Antcip2, TotPag2;

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

    $(function () {
        $("ModFechLiq").datepicker({
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
        if ( (keycode == 13) )  {
            RutEmple = $("#RutEmp").val();
            if (RutEmple == "") {
                alertify.error(" Dato Debe Estar VACIO!!!! ", "Atención");
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
                            alertify.error(" Empleado Incorrecto, Verifique ", "Atención");
                            $("#RutEmp").val("");
                            $("#RutEmp").focus();
                            return false;
                        }
                    })
                    .error(function (error) {
                        window.location.href = "/Error/ErrorGeneral/";
                    });

            }
        }
    });

    //Seleccciona el tipo de remuneracion y 
    $("#ListTipRem").change('click', function (e) {
        e.preventDefault();
        //calcula el valor del Seguro de Cesantia
        TipRem = $("#ListTipRem").val();
        var data = { Id_Tip_Contrato: TipRem };
        var url = "/LiqSueld/BuscaValSegCes";
        $.post(url, data)
            .done(function (data) {
                var DatosDev = data[0];
                Id_Seg_Ces = DatosDev["Id_Tip_Contrato"];
                TipContrat = DatosDev["Tipo_Contrato"];
                MontEmpl = DatosDev["Monto_Empleador"];
                MontTrab = DatosDev["Monto_Trabajador"];
                if ((TipContrat == "Plazo Fijo") || (TipContrat == "Plazo Indefinido Mayor")) {
                    Cotizacion = MontEmpl;
                }
                if (TipContrat == "Plazo Indefinido") {
                    Cotizacion = MontTrab
                }
                $("#FechLiq").focus();
            })
            .error(function (error) {
                window.location.href = "/Error/ErrorGeneral/";
            });
    });

    //Ingresa o acepta la fecha de liquidación
    $("#FechLiq").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            var f = new Date();
            var fecha = f.getDate() + "/" + "0" + (f.getMonth() + 1) + "/" + f.getFullYear();
            $("#FechLiq").val(fecha);
            $("#SueldBas").focus();
        }
    })

    // Ingreso del Sueldo Base
    $("#SueldBas").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            SuelBase = document.getElementById("SueldBas").value;
            if (isNaN(SuelBase) || (SuelBase == "")) {
                alertify.error(" Dato Debe Ser Numérico ", "Atención");
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
                alertify.error(" Dato Debe Ser Numérico ", "Atención");
                $("#DiasTrab").val("");
                $("#DiasTrab").focus();
                return false;
            }
            else { $("#CantHrsExt").focus(); }
        }
    })

    //Calculos de la Liquidacion de Sueldo
    $("#CantHrsExt").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            //Cantidad Horas Extras
            CantHrsExt = $("#CantHrsExt").val();
            if (isNaN(CantHrsExt) || (CantHrsExt == "")) {
                alertify.error(" Dato Debe Ser Numérico ", "Atención");
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
                    alertify.error(" No Puede Haber Más de 40 Horas Extras Al Mes ", "Atención");
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
            if (isNaN(PorcCom) || (PorcCom == "")) {
                alertify.error(" Dato Debe Ser Numérico ", "Atención");
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
            if (isNaN(Bonos) || (Bonos == "")) {
                alertify.error(" Dato Debe Ser Numérico ", "Atención");
                $("#Bonos").val("");
                $("#Bonos").focus();
                return false;
            }
            else {
                // Calculo de la Gratificación
                Ganancias = (parseInt(SuelBase) + parseInt(ValCom) + parseInt(TotHrsExt) + parseInt(Bonos));
                SuelDevengado = ((Ganancias * 25) / 100);
                SueldMin = 320500;
                GratMensual = ((SueldMin * 4.75) / 12);
                Grat2 = (GratMensual * 4.75);
                TopeGratMensual = parseInt(Grat2 / 12);

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
                        ImptoDesde = DatosDevImptos["Desde"];
                        ImptoHasta = DatosDevImptos["Hasta"];
                        ImptoFactor = DatosDevImptos["Factor"];
                        ImptoCantAReb = DatosDevImptos["CantAReb"];
                        ImptoTasaImpto = DatosDevImptos["TasaImpEfec"];
                        TotImpuesto = parseInt(SuelBase * ImptoFactor)
                        ImptoAPagar = (parseInt(SuelBase * ImptoFactor) - parseInt(ImptoCantAReb));
                        $("#TotImp").val(new Intl.NumberFormat("de-DE").format(TotImpuesto));
                        $("#RebaImpto").val(new Intl.NumberFormat("de-DE").format(parseInt(ImptoCantAReb)));
                        $("#ImpAPagar").val(new Intl.NumberFormat("de-DE").format(ImptoAPagar));
                    })
                    .error(function (error) {
                        window.location.href = "/Error/ErrorGeneral/";
                    });
                $("#ValMov").focus();
            }
        }
    })

    $("#ValMov").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            ValMovi = $("#ValMov").val();
            if (isNaN(ValMovi) || (ValMovi == "")) {
                alertify.error(" Dato Debe Ser Numérico ", "Atención");
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
                alertify.error(" Dato Debe Ser Numérico ", "Atención");
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
                alertify.error(" Dato Debe Ser Numérico ", "Atención");
                $("#ValViatico").val("");
                $("#ValViatico").focus();
                return false;
            }
            else {
                $("#ValViatico").val(new Intl.NumberFormat("de-DE").format(ValViat));
                $("#AfpSelec").focus();
            }
            TotHaberes = (parseInt(ValMovi) + parseInt(ValColac) + parseInt(ValViat) + TotImponible);
            $("#TotHaber").val(new Intl.NumberFormat("de-DE").format(TotHaberes));
            $("#AfpSelec").focus();
        }
    })

    $("#AfpSelec").change('click', function (e) {
        e.preventDefault();
        Cod_Afp = $("#AfpSelec").val();
        var data = { Cod_Afp: Cod_Afp };
        var url = "/LiqSueld/BuscaValAfp";
        $.post(url, data)
            .done(function (data) {
                var DatosDevAfp = data[0];
                CodigoAfp = DatosDevAfp["Cod_Afp"];
                NomAfp = DatosDevAfp["Nom_Afp"];
                PorcAfp = DatosDevAfp["Porc_Desc"];
                MontAfp = parseInt((SuelBase * PorcAfp) / 100);
                $("#MontoAfp").val(new Intl.NumberFormat("de-DE").format(MontAfp));
            });
        $("#SalSelec").focus();
    });

    $("#SalSelec").change('click', function (e) {
        e.preventDefault();
        CSalud = $("#SalSelec").val();
        var data = { Cod_Salud: CSalud };
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
                TotDescPrev = (parseInt(MontAfp) + parseInt(MonSalud) + parseInt(ValorCesantia));
                $("#TotDescPrev").val(new Intl.NumberFormat("de-DE").format(TotDescPrev));
                $("#CPTotDescPrev").val(new Intl.NumberFormat("de-DE").format(TotDescPrev));
                RemuNeta = TotImponible - TotDescPrev - ImptoAPagar;
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
                TotOtDesc = parseInt(parseInt(ValPrestamos) + parseInt(ValOtDesc));
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
            if ( (isNaN(Antcip)) || (Antcip == "") ) {
                Antcip = 0;
            }
            else {
                //Saldo Finales
                AlcLiq = ((parseInt(TotHaberes) + parseInt(TotOtDesc)) + parseInt(RemuNeta));
                TotPag = (parseInt(AlcLiq) - parseInt(Antcip));
                $("#TotPagar").val(new Intl.NumberFormat("de-DE").format(parseInt(TotPag)));
            }
        }
    })

    // grabar datos 
    $("#BtnGrabLiqSueld").click(function (event) {
        RutEmp2 = $("#RutEmp").val();
        TipRem2 = $("#ListTipRem").val();
        FechLiq2 = $("#FechLiq").val();
        SuelBase2 = $("#SueldBas").val();
        DiasTrab2 = $("#DiasTrab").val();
        CantHrsExt2 = $("#CantHrsExt").val();
        TotHrsExt2 = $("#ValHrsExt").val();
        PorcCom2 = $("#PorcCom").val();
        ValCom2 = $("#ValorCom").val();
        Bonos2 = $("#Bonos").val();
        Gratificacion2 = $("#ValGrat").val();
        TotImponible2 = $("#TotImponible").val();
        ValMovi2 = $("#ValMov").val();
        ValColac2 = $("#ValCola").val();
        ValViat2 = $("#ValViatico").val();
        TotHaberes2 = $("#TotHaber").val();
        Cod_Afp2 = $("#AfpSelec").val();
        MontAfp2 = $("#MontoAfp").val();
        CSalud2 = $("#SalSelec").val();
        MonSalud2 = $("#MontoSalud").val();
        Id_Seg_Ces2 = Id_Seg_Ces;
        ValorCesantia2 = $("#ValCesantia").val();
        TotDescPrev2 = $("#TotDescPrev").val();
        RemuNeta2 = $("#RemNeta").val();
        TotImponible2 = $("#TotImp").val();
        TotImpto2 = $("#TotImp").val();
        ImptoCantAReb2 = $("#RebaImpto").val();
        ImptoAPagar2 = $("#ImpAPagar").val();
        ValPrestamos2 = $("#ValPrestmos").val();
        ValOtDesc2 = $("#OtDesc").val();
        TotOtDesc2 = $("#TotDesc").val();
        Antcip2 = $("#Anticipos").val();
        TotPag2 = $("#TotPagar").val();
        var data = {
            Rut_Empleado: RutEmp2,
            Id_Tipo_Renumeracion: TipRem2,
            Fecha_Liquidacion: FechLiq2,
            Sueldo_Base: SuelBase2,
            Dias_Trabajados: DiasTrab2,
            PorcComision: PorcCom2,
            Valor_Com: ValCom2,
            Cant_Horas_Extras: CantHrsExt2,
            Total_Horas_Extras: TotHrsExt2,
            Bonos: Bonos2,
            Gratificacion: Gratificacion2,
            TotalImponible: TotImponible2,
            Colacion: ValColac2,
            Movilizacion: ValMovi2,
            Viaticos: ValViat2,
            TotalHaberes: TotHaberes2,
            CodAfp: Cod_Afp2,
            Valor_Afp: MontAfp2,
            Cod_Salud: CSalud2,
            Valor_Salud: MonSalud2,
            Id_Seg_Cesantia: Id_Seg_Ces2,
            Valor_Seg_Cesantia: ValorCesantia2,
            TotalDescSegSocial: TotDescPrev2,
            Valor_Impuesto: TotImpto2,
            RebaImpto: ImptoCantAReb2,
            ImpAPagar: ImptoAPagar2,
            RemNeta: RemuNeta2,
            Prestamos: ValPrestamos2,
            TotalDesctos: TotOtDesc2,
            Otrs_Descuentos: ValOtDesc2,
            Anticipos: Antcip2,
            Total_Pagar: TotPag2
        };
        var url = "LiqSueld/GrabLiqSueld";
        event.preventDefault();
        $.post(url, data)
            .done(function (data) {
                alertify.success(" Datos Grabados ", "Atención");
            })
            .fail(function (data) {
                alertify.error(" Error De Grabación, Verifique!!! ", "Error")
            })
            .error(function (error) {
                window.location.href = "/Error/ErrorGeneral/";
            })
            .always(function (data) {
                $("#ListTipRem").val("Seleccione Tipo Remuneración");
                $("#RutEmp").val("");
                $("#FechLiq").val("");
                $("#SueldBas").val("");
                $("#DiasTrab").val("");
                $("#CantHrsExt").val("");
                $("#ValHrsExt").val("");
                $("#PorcCom").val("");
                $("#ValorCom").val("");
                $("#Bonos").val("");
                $("#ValGrat").val("");
                $("#TotImponible").val("");
                $("#ValMov").val("");
                $("#ValCola").val("");
                $("#ValViatico").val("");
                $("#TotHaber").val("");
                $("#AfpSelec").val("Seleccione AFP");
                $("#MontoAfp").val("");
                $("#SalSelec").val("Seleccione Salud");
                $("#MontoSalud").val("");
                $("#ValCesantia").val("");
                $("#TotDescPrev").val("");
                $("#RemNeta").val("");
                $("#TotImp").val("");
                $("#RebaImpto").val("");
                $("#ImpAPagar").val("");
                $("#ValPrestmos").val("");
                $("#OtDesc").val("");
                $("#TotDesc").val("");
                $("#Anticipos").val("");
                $("#TotPagar").val("");
                $("#AgrLiqSueld").modal("hide");
                window.location.reload(true);
            })
    })
    
    //Manipulador del evento Edit(ar)
    $("body").on("click", "#TablaLiqSueld TBODY .Edit", function (event) {
        event.preventDefault();
        $("#ModLiqSueld").modal("show");
        var row = $(this).closest("tr");
        RutEmp = row.find("td").eq(0).html();
        FechLiq = row.find("td").eq(2).html();
        type: 'Post';
        var data = { Rut_Empleado: RutEmp, Fecha_Liquidacion: FechLiq};
        var url = "LiqSueld/BuscLiqSueld";
        $.post(url, data)
            .done(function (data) {
                // pasa los datos devueltos a un arreglo
                var DatosLiqSueld = data[0];
                // pasa los datos del arreglo a las cajas
                $("#ModRutEmp").val(DatosLiqSueld.Rut_Empleado);
                $("#ModListTipRem").val(DatosLiqSueld.Id_Tipo_Renumeracion);
                $("#ModFechLiq").val(DatosLiqSueld.Fecha_Liquidacion);
                $("#ModSueldBas").val(DatosLiqSueld.Sueldo_Base);
                $("#ModDiasTrab").val(DatosLiqSueld.Dias_Trabajados);
                $("#ModCantHrsExt").val(DatosLiqSueld.Cant_Horas_Extras);
                $("#ModValHrsExt").val(DatosLiqSueld.Total_Horas_Extras);
                $("#ModPorcCom").val(DatosLiqSueld.PorcComision );
                $("#ModValorCom").val(DatosLiqSueld.Valor_Com);
                $("#ModBonos").val(DatosLiqSueld.Bonos);
                $("#ModValGrat").val(DatosLiqSueld.Gratificacion);
                $("#ModTotImponible").val(DatosLiqSueld.TotalImponible);
                $("#ModValMov").val(DatosLiqSueld.Movilizacion);
                $("#ModValCola").val(DatosLiqSueld.Colacion);
                $("#ModValViatico").val(DatosLiqSueld.Viaticos);
                $("#ModTotHaber").val(DatosLiqSueld.TotalHaberes);
                $("#ModAfpSelec").val(DatosLiqSueld.CodAfp);
                $("#ModMontoAfp").val(DatosLiqSueld.Valor_Afp);
                $("#ModSalSelec").val(DatosLiqSueld.Cod_Salud);
                $("#ModMontoSalud").val(DatosLiqSueld.Valor_Salud);
                $("#ModValCesantia").val(DatosLiqSueld.Valor_Seg_Cesantia);
                $("#ModTotDescPrev").val(DatosLiqSueld.TotalDescSegSocial);
                $("#ModCpTotImponible").val(DatosLiqSueld.TotalImponible);
                $("#ModCPTotDescPrev").val(DatosLiqSueld.TotalDescSegSocial);
                $("#ModRemNeta").val(DatosLiqSueld.RemNeta);
                $("#ModTotImp").val(DatosLiqSueld.Valor_Impuesto);
                $("#ModRebaImpto").val(DatosLiqSueld.RebaImpto);
                $("#ModImpAPagar").val(DatosLiqSueld.ImpAPagar);
                $("#ModValPrestmos").val(DatosLiqSueld.Prestamos);
                $("#ModOtDesc").val(DatosLiqSueld.Otrs_Descuentos);
                $("#ModTotDesc").val(DatosLiqSueld.TotalDesctos);
                $("#ModAnticipos").val(DatosLiqSueld.Anticipos);
                $("#ModTotPagar").val(DatosLiqSueld.Total_Pagar);
            })
            .error(function (error) {
                window.location.href = "/Error/ErrorGeneral/";
            })
    });

    //Exportar a Pdf
    $("#ImpriLiq").click(function (event) {
        event.preventDefault();
        RutEmp = $("#ModRutEmp").val();
        FechLiq = $("#ModFechLiq").val();
        type: 'Post';
        var data = { Rut_Empleado: RutEmp, Fecha_Liquidacion: FechLiq };
        var url = "LiqSueld/ImpLiqSuel";
        $.post(url, data)
            .done(function (data) {
                alertify.success(" Liquidación Lista ", "Atención");
                $("#ModLiqSueld").modal("hide");
                window.location.reload(true);
            })
            .error(function (error) {
                window.location.href = "/Error/ErrorGeneral/";
            })
    });

    // Exportar a XLSX
    $("#ImpriXLS").click(function (e) {
        event.preventDefault();
        RutEmp = $("#ModRutEmp").val();
        FechLiq = $("#ModFechLiq").val();
        type: 'Post';
        var data = { Rut_Empleado: RutEmp, Fecha_Liquidacion: FechLiq };
        var url = "LiqSueld/ImpLiqSuelXLS";
        $.post(url, data)
            .done(function (data) {
                alertify.success(" Liquidación Lista ", "Atención");
                $("#ModLiqSueld").modal("hide");
                window.location.reload(true);
            })
    });

    //agrega fila con cajas de busqueda 
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
    // fin de cajas de busqueda
});

//permite identificar la fila seleccionada del WebGrid
$(function () {
    var row = $("#TablaLiqSueld TBODY tr:eq(0)");
    if ($("#TablaLiqSueld TBODY tr").length > 1) {
        //row.remove();
    }
    else {
        row.find(".label").html("");
        row.find(".text").val("");
        row.find(".link").hide();
    }
});   


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
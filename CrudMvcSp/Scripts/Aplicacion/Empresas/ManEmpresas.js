var RutEmp, CiudEmp, ComuEmp;
var CiudEmp2, ComuEmp2;

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
        var RutEmp = $("#RutEmp").val();
        if (RutEmp == "") {
            toastr["error"]("El Rut NO Puede Estar Vacio!", "Verifique");
            toastr.options = {
                "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
            };
            return false;
        }
        else {         
            var NomEmp = $("#NomEmp").val();
            var CallPjeAvdaEmp = $("#CallPjeEmp").val();
            var NumEmp = $("#NumEmp").val();
            var VilPobEmp = $("#VilpobEmp").val();
            var FonoEmp = $("#FonoEmp").val();
            var CorreoEmp = $("#EmaEmp").val();
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
                    toastr["success"]("Datos De Empresa Grabados", "Atención")
                    toastr.options = {
                        "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false, "positionClass": "toast-top-center",
                        "preventDuplicates": false, "onclick": null, "showDuration": "350", "hideDuration": "1000", "timeOut": "5000",
                        "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    }
                })
                .fail(function (data) {
                    toastr["error"]("Problemas De Grabación", "Verifique")
                    toastr.options = {
                        "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false, "positionClass": "toast-top-center",
                        "preventDuplicates": false, "onclick": null, "showDuration": "200", "hideDuration": "1000",
                        "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear",
                        "showMethod": "fadeIn", "hideMethod": "fadeOut"
                    }
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
        }
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
                toastr["success"]("Datos Modificados", "Atención")
                toastr.options = {
                    "closeButton": false, "debug": false,
                    "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false,
                    "onclick": null, "showDuration": "400",
                    "hideDuration": "1000", "timeOut": "5000",
                    "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
            })
            .fail(function (data) {
                toastr["error"]("Error De Modificación", "Error")
                toastr.options = {
                    "closeButton": false, "debug": false,
                    "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false,
                    "onclick": null, "showDuration": "400",
                    "hideDuration": "1000", "timeOut": "5000",
                    "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                }
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

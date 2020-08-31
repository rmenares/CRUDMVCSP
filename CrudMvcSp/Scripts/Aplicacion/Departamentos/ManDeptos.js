var iddepto, Nomdepto;

$(document).ready(function () {
                    //Carga Modal
    $("#BtnNueDep").click(function (event) {
        event.preventDefault();
        $("#AgrDep").modal("show");
    });
    //fin de carga Modal

    $("#NomDep").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            var Nomdepto = $("#NomDep").val();
            if (Nomdepto == "") {
                toastr["error"]("Nombre Departamento NO Puede Estar Vacío!!!!", "Atención")
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null,
                    "showDuration": "300", "hideDuration": "1000", "timeOut": "5000",
                    "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear",
                    "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#NomDep").focus();
            }
            else {
                $("#BtnGrab").focus();
            }
        }
    })

    $("#BtnGrab").click(function (event) {
       $("#BtnGrab").attr('value', 'Grabando....');
       var data = { NomDepto: Nomdepto }
       var url = "/Deptos/GrabaDepto";
       event.preventDefault();
       $.post(url, data)
        .done(function (data) {
            toastr["success"]("Datos Grabados", "Atención")
            toastr.options = {
                "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false,
                "positionClass": "toast-top-center", "preventDuplicates": false,
                "onclick": null, "showDuration": "400", "hideDuration": "1000", "timeOut": "5000",
                "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            };
        })
        .fail(function (data) {
            toastr["error"]("Error De Grabación", "Error")
            toastr.options = {
                "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false,
                "positionClass": "toast-top-center", "preventDuplicates": false,
                "onclick": null, "showDuration": "400", "hideDuration": "1000", "timeOut": "5000",
                "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn",
                "hideMethod": "fadeOut"
            }
        })
        .always(function (data) {
            $("#NomDep").val("");
            $("#AgrDep").modal("hide");
            window.location.reload(true);
        })
    });

    //detecta la fila seleccionada en en webgrid 
    $("body").on("click", "#Tabldepto td", function () {
        var row = $(this).closest("tr");
        iddepto = row.find("td").eq(0).html();
        var nombdep = row.find("td").eq(1).html();
        $("#ModNomDep").val(nombdep);
        $("#ModDep").modal("show");
    })

    // Modificación de datos
    $("#BtnMod").click(function (event) {
        event.preventDefault();
        nombdep = $("#ModNomDep").val();
        //$("#EdDep").attr('value', 'Actualizando.....');
        var data = { Id_Depto: iddepto, NomDepto: nombdep }
        var url = "/Deptos/EditDept"
        $.post(url, data)
            .done(function (data) {
                toastr["success"]("Datos Modificados", "Atención")
                toastr.options = {
                    "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false, "positionClass": "toast-top-center", "preventDuplicates": false,
                    "onclick": null, "showDuration": "400", "hideDuration": "1000", "timeOut": "5000",
                    "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn",
                    "hideMethod": "fadeOut"
                };
            })
            .fail(function (data) {
                toastr["error"]("Error De Modificación", "Error")
                toastr.options = {
                    "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "400",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                }
            })
            .always(function (data) {
                $("#ModNomDep").val("");
                $("#ModDep").modal("hide");
                window.location.reload(true);
            })
    })
    //Fin Modificacion de Datos
})
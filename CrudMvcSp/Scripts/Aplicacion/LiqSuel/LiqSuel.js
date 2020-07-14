

$(document).ready(function () {


    $("#BtnNueLiqSueld").click(function (event) {
        event.preventDefault();
        $("#AgrLiqSueld").modal("show");
    })



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
                    if (data == 1) { $("#RutCargFam").focus(); }
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


   

              
})
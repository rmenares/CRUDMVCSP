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
    
    //verifica si el empleado esta en la tabla de empleados
    $("#RutEmp").on('keyup', function (e) {
        //permite capturar el valor de la tecla pulsada
        var keycode = e.keyCode || e.which;
        //verifica si el codigo de la tecla es ENTER
        if (keycode == 13) {
            RutEmp = $("#RutEmp").val();
            if (RutEmp == "") {
                toastr["error"]("El Rut Empleado NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#RutEmp").focus();
            }
            else {
                var data = { Rut_Empleado: RutEmp };
                var url = "/CargFam/BuscEmp";
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
        }
    });
    
    $("#RutCargFam").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            RutCgFm = $("#RutCargFam").val();
            if (RutCgFm == "") {
                toastr["error"]("El Rut NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#RutCargFam").focus();
            }
            else {  $("#NomCargFam").focus(); }
        }
    })

    $("#NomCargFam").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            NomCgFm = $("#NomCargFam").val();
            if (NomCgFm == "") {
                toastr["error"]("El Nombre NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#NomCargFam").focus();
            }
            else {
                $("#ApPatCargFam").focus();
            }
        }
    })
    
    $("#ApPatCargFam").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            ApPatCgFm = $("#ApPatCargFam").val();
            if (NomCgFm == "") {
                if (ApPatCgFm == "") {
                    toastr["error"]("El Apellido NO Puede Estar Vacio!", "Verifique");
                    toastr.options = {
                        "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                        "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                        "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                        "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                    };
                    $("#ApPatCargFam").focus();
                }
                else {
                    $("#ApMatCargFam").focus();
                }
            }
        }
    })
    
    $("#ApMatCargFam").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) { 
            ApMatCgFm = $("#ApMatCargFam").val();
            if (ApMatCgFm == "") {
                toastr["error"]("El Apellido Materno NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#ApMatCargFam").focus();
            }
            else {
                $("#FonoMovCargFam").focus();
            }
        }
    })

    $("#FonoMovCargFam").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            FonoMovilCgFm = $("#FonoMovCargFam").val();
            if (FonoMovilCgFm == "") {
                toastr["error"]("El Fono Movil NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#FonoMovCargFam").focus();
            }
            else {
                $("#FonoFijoCargFam").focus();
            }
        }
    })

    $("#FonoFijoCargFam").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            FonoFijCgFm = $("#FonoFijoCargFam").val();
            if (FonoFijCgFm == "") {
                toastr["error"]("El Fono Fijo NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#FonoFijoCargFam").focus();
            }
            else {
                $("#FechNacGarFam").focus();
            }
        }
    })

    $("#FechNacGarFam").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            FechNacCgFm = $("#FechNacGarFam").val();
            if (FechNacCgFm == "") {
                toastr["error"]("La Fecha de Nacimiento NO Puede Estar Vacia!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#FechNacGarFam").focus();
            }
            else {
                $("#SexoSelec").focus();
            }
        }
    })

    //captura el Codigo de dropdownList Sexo Seleccionado
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
            $("#EmaiCarFam").focus();
        }        
    })

    $("#EmaiCarFam").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            EmailCgFm = $("#EmaiCarFam").val();
            if (EmailCgFm == "") {
                toastr["error"]("El Email NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#EmaiCarFam").focus();
            }
            else {
                $("#CallPjeCargFam").focus();
            }
        }
    })

    $("#CallPjeCargFam").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            CallePjeCgFm = $("#CallPjeCargFam").val();
            if (CallePjeCgFm == "") {
                toastr["error"]("La Calle/Pje NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#CallPjeCargFam").focus();
            }
            else {
                $("#NumCasaCargFam").focus();
            }
        }
    })

    $("#NumCasaCargFam").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            NumCasaCgFm = $("#NumCasaCargFam").val();
            if (NumCasaCgFm == "") {
                toastr["error"]("El Número NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#NumCasaCargFam").focus();
            }
            else{
                $("#Villa_PoblCargFam").focus();          
            }
        }
    })

    $("#Villa_PoblCargFam").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            VilPoblCgFm = $("#Villa_PoblCargFam").val();
            if (VilPoblCgFm == "") {
                toastr["error"]("El Dato NO Puede Estar Vacio!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#Villa_PoblCargFam").focus();
            }
            else{
                $("#ComuCargFam").focus();
            }
        }
    })

    //captura el valor de dropdownList Comuna y entrega la ciudad
    $("#ComuCargFam").change('click', function (event) {
        event.preventDefault();
        type: 'Post';
        ComuCgFm = $("#ComuCargFam").val();
        if (ComuCgFm == "") {
            toastr["error"]("La Comuna NO Puede Estar Vacio!", "Verifique");
            toastr.options = {
                "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
            };
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

    //captura el Codigo de dropdownList Nacionalidad Seleccionado
    $("#NacioSelec").change('click', function (event) {
        event.preventDefault();
        NacioSelec = $("#NacioSelec").val();
        if (NacioSelec == "") {
            toastr["error"]("Debe Seleccionar Una Nacionalidad!", "Verifique");
            toastr.options = {
                "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
            };
            $("#NacioSelec").focus();
        }
        else {
            $("#DescrCargFam").focus();
        }
    })

    $("#DescrCargFam").on('keyup', function (e) {
        var keycode = e.keyCode || e.which;
        if (keycode == 13) {
            DescrCgFm = $("#DescrCargFam").val();
            if (DescrCgFm == "") {
                toastr["error"]("La Descripción NO Puede Estar Vacia!", "Verifique");
                toastr.options = {
                    "closeButton": true, "debug": false, "newestOnTop": false, "progressBar": false,
                    "positionClass": "toast-top-center", "preventDuplicates": false, "onclick": null, "showDuration": "300",
                    "hideDuration": "1000", "timeOut": "5000", "extendedTimeOut": "1000", "showEasing": "swing",
                    "hideEasing": "linear", "showMethod": "fadeIn", "hideMethod": "fadeOut"
                };
                $("#DescrCargFam").focus();
            }
            else {
                $("#BtnGrabEmp").focus();
            }
        }
    })

    //Graba Carga Familiar       
    $("#BtnGrabEmp").click(function (event) {
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
            var url = "CargFam/GrabCargFam";
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
        }
        var url = "/CargFam/ModCargFam";
        event.preventDefault();
        $.post(url, data)
            .done(function (data) {
                toastr["success"](" Datos Modificados ", "Atención")
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
                    toastr["success"](" Carga Eliminada ", "Atención")
                    toastr.options = {
                        "closeButton": false, "debug": false, "newestOnTop": false, "progressBar": false, "positionClass": "toast-top-center", "preventDuplicates": false,
                        "onclick": null, "showDuration": "400", "hideDuration": "1000", "timeOut": "5000",
                        "extendedTimeOut": "1000", "showEasing": "swing", "hideEasing": "linear", "showMethod": "fadeIn",
                        "hideMethod": "fadeOut"
                    }
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
}   


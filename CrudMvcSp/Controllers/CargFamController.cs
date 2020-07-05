using System;
using System.IO;
using System.Web;
using System.Text;
using System.Linq;
using OfficeOpenXml;
using System.Web.Mvc;
using iTextSharp.text;
using Xceed.Words.NET;
using CrudMvcSp.Models;
using System.Diagnostics;
using Xceed.Document.NET;
using iTextSharp.text.pdf;
using System.Web.WebPages;
using System.Collections.Generic;
using Paragraph = Xceed.Document.NET.Paragraph;

namespace CrudMvcSp.Controllers
{
    public class CargFamController : Controller
    {
        EmpleadosEntities CargFam = new EmpleadosEntities();

        #region LLena los DropdownList
            EmpleadosEntities Empleados = new EmpleadosEntities();
            EmpleadosEntities Comun = new EmpleadosEntities();
            EmpleadosEntities Ciud = new EmpleadosEntities();
            EmpleadosEntities Nacion = new EmpleadosEntities();
            EmpleadosEntities Sexo = new EmpleadosEntities();
        #endregion

        // GET: CargFam
        #region Carg_CargFam
        public ActionResult Index()
        {
            using (CargFam = new EmpleadosEntities())
            {
                var ListCargFam = CargFam.Sp_Mues_CargFam().ToList();

                var ListCom = Comun.Sp_Mues_Comunas().ToList();
                ViewBag.ListComu = new SelectList(ListCom, "Comuna_Id", "Comuna");

                var LisSex = Sexo.Sexo.ToList();
                ViewBag.ListSexos = new SelectList(LisSex, "Id_Sexo", "Descripcion");

                var LisNac = Nacion.Nacionalidad.ToList();
                ViewBag.ListNacion = new SelectList(LisNac, "Id_Nac", "Descripcion");

                return View(ListCargFam);
            }                
        }
        #endregion

        #region Busca_Empleados
        //busca el rut del empleado y verifica si este esta en la tabla de empleados
        public ActionResult BuscEmp(Empleados emplead)
        {
            int Verifica;
            using (Empleados = new EmpleadosEntities())
            {
                var BuscEmp = Empleados.Sp_Sel_Empleado(emplead.Rut_Empleado).ToList();
                if(BuscEmp.Count != 0)
                { Verifica = 1; }
                else
                { Verifica = 0; }
                return Json(Verifica);
            }
        }
        #endregion

        #region Busca_Ciudad
        //Toma El Valor de la Comuna y lo Verifica en la Base de Datos
        [HttpPost]
        public ActionResult CargCiu(int Comuna_Id)
        {
           var ListCiu = Ciud.Sp_Sel_CiudadesxComu(Comuna_Id).ToList();
           return Json(ListCiu);
        }
        #endregion

        #region Graba_Carga_Familiar
        [HttpPost]
        public ActionResult GrabCargFam(Carg_Familiar Carg_Fam)
        {
            using (CargFam = new EmpleadosEntities())
            {
                var GrabCargFam = CargFam.Sp_Ins_Carg_Familiar(
                                    Carg_Fam.Rut_Benef,      Carg_Fam.Nombre,     Carg_Fam.ApPat,
                                    Carg_Fam.ApMat,          Carg_Fam.Telefono1,  Carg_Fam.Telefono2,
                                    Carg_Fam.Fecha_Nac,      Carg_Fam.Cod_Sexo,   Carg_Fam.Calle_Pje,
                                    Carg_Fam.Num_Casa,       Carg_Fam.Villa_Pobl, Carg_Fam.Comuna_Id,
                                    Carg_Fam.Provincia_Id,   Carg_Fam.email,      Carg_Fam.Rut_Empleado,
                                    Carg_Fam.Id_Nac,         Carg_Fam.Descripcion);
                return Json(GrabCargFam);
            }
        }
        #endregion

        #region Busca_CargaFamiliar
        public ActionResult BuscCargFam(Carg_Familiar BuscCargFam)
        {
            using (CargFam = new EmpleadosEntities())
            {
                var BucaEmpleado = CargFam.Sp_Sel_CargFamxRut(BuscCargFam.Rut_Benef).ToList();
                return Json(BucaEmpleado);
            }
        }
        #endregion

        #region Modifica_Carga_Fam
        [HttpPost]
        public ActionResult ModCargFam(Carg_Familiar CargFami)
        {
            using (CargFam = new EmpleadosEntities())
            {
                var ModCargFam = CargFam.Sp_UPD_Carg_Familiar(
                                CargFami.Rut_Benef,     CargFami.Nombre,      CargFami.ApPat,
                                CargFami.ApMat,         CargFami.Telefono1,   CargFami.Telefono2,
                                CargFami.Fecha_Nac,     CargFami.Cod_Sexo,    CargFami.Calle_Pje,
                                CargFami.Num_Casa,      CargFami.Villa_Pobl,  CargFami.Comuna_Id,
                                CargFami.Provincia_Id,  CargFami.email,       
                                CargFami.Id_Nac,        CargFami.Descripcion);


                  return Json(ModCargFam);
            }
        }
        #endregion

        #region Elimina_Carga_Familiar
        public ActionResult ElimCargFam(Carg_Familiar CargFami)
        {
            using (CargFam = new EmpleadosEntities())
            {
                var ElimCargFam = CargFam.Sp_Del_Carga_Familiar(CargFami.Rut_Benef);
                return Json(ElimCargFam);
            }
        }
        #endregion

        //Exportaciones


    }
}
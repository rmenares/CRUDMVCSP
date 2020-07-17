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
    public class LiqSueldController : Controller
    {
        #region LLena_las_Instancias
        EmpleadosEntities LiqSueld = new EmpleadosEntities();
        EmpleadosEntities Empl = new EmpleadosEntities();
        EmpleadosEntities TipRemu = new EmpleadosEntities();
        EmpleadosEntities ManAfp = new EmpleadosEntities();
        EmpleadosEntities ManSalud = new EmpleadosEntities();
        #endregion

        // GET: LiqSueld
        #region Muest_Liq_suel
        public ActionResult Index()
        {
            using (LiqSueld = new EmpleadosEntities())
            {
                var ListLiqSueld = LiqSueld.SP_Mues_liqSueldo().ToList();

                //Carga Y Lista El Tipo de Remuneracion
                var TipRem = TipRemu.Sp_Mues_TipRem().ToList();
                ViewBag.ListTipRem = new SelectList(TipRem, "Id_Tipo", "Descr_Tipo");

                var ListAfp = ManAfp.Sp_Mues_Afp().ToList();
                ViewBag.ListAfps = new SelectList(ListAfp, "Cod_Afp", "Nom_Afp");

                var LisSal = ManSalud.Sp_Mues_Salud().ToList();
                ViewBag.ListSalud = new SelectList(LisSal, "Cod_Salud", "Nombre_Salud");

                return View(ListLiqSueld);
            }
        }
        #endregion
        
        #region Busca_Empleados
        //busca el rut del empleado y verifica si este esta en la tabla de empleados
        public ActionResult BuscEmp(Empleados emplead)
        {
            int Verifica;
            using (Empl = new EmpleadosEntities())
            {
                var BuscEmp = Empl.Sp_Sel_Empleado(emplead.Rut_Empleado).ToList();
                if (BuscEmp.Count != 0)
                { Verifica = 1; }
                else
                { Verifica = 0; }
                return Json(Verifica);
            }
        }
        #endregion

        #region Busca_Valor_AFP
        public ActionResult BuscaValAfp(Afp afp)
        {
            using (ManAfp = new EmpleadosEntities())
            {
                var BuscAfp = ManAfp.Sp_Mues_Afp_ID(afp.Cod_Afp).ToList();
                return Json(BuscAfp);
            }
        }
        #endregion

        #region Busca_Valor_Salud
        public ActionResult BuscaValSal(Salud salud)
        {
            using (ManSalud = new EmpleadosEntities())
            {
                var BuscSalud = ManSalud.Sp_Mues_Salud_ID(salud.Cod_Salud).ToList();
                return Json(BuscSalud);
            }
        }
        #endregion

    }
}
﻿using System;
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
        EmpleadosEntities Cesantia = new EmpleadosEntities();
        EmpleadosEntities Imptos = new EmpleadosEntities();
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
               
                var LisCesa = Cesantia.Sp_Mues_Seg_Cesantia().ToList();
                ViewBag.ListSegCes = new SelectList(LisCesa, "Id_Tip_Contrato", "Tipo_Contrato");

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

        #region Busca_Val_Seg_Cesantia
        public ActionResult BuscaValSegCes(Seg_Cesantia seg_Cesantia)
        {
            using (Cesantia = new EmpleadosEntities())
            {
                var ValSegCes = Cesantia.Sp_Sel_Seg_Cesantia_Id(seg_Cesantia.Id_Tip_Contrato).ToList();
                return Json(ValSegCes);
            }
        }
        #endregion

        #region buscaTablaImpto
        public ActionResult BuscImpto(SP_BusRangImpxSueldo_Result ImptoMen)
        {
            using (Imptos = new EmpleadosEntities())
            {
                var TablImpto = Imptos.SP_BusRangImpxSueldo(ImptoMen.Desde).ToList();
                return Json(TablImpto);
            }
        }
        #endregion

        #region Graba_Liquidacion
        [HttpPost]
        public ActionResult GrabLiqSueld(Liquidacion_Sueldo LiqiSueld)
        {
            using (LiqSueld = new EmpleadosEntities())
            {
                var GrabLiq = LiqSueld.Sp_Ins_LiqSueldo(
                     LiqiSueld.Rut_Empleado,           LiqiSueld.Id_Tipo_Renumeracion,             LiqiSueld.Fecha_Liquidacion,
                     LiqiSueld.Sueldo_Base,            LiqiSueld.Dias_Trabajados,                  LiqiSueld.PorcComision,
                     LiqiSueld.Valor_Com,              LiqiSueld.Cant_Horas_Extras,                LiqiSueld.Total_Horas_Extras,
                     LiqiSueld.Bonos,                  LiqiSueld.Gratificacion,                    LiqiSueld.TotalImponible,
                     LiqiSueld.Colacion,               LiqiSueld.Movilizacion,                     LiqiSueld.Viaticos,
                     LiqiSueld.TotalHaberes,           LiqiSueld.CodAfp,                           LiqiSueld.Valor_Afp,
                     LiqiSueld.Cod_Salud,              LiqiSueld.Valor_Salud,                      LiqiSueld.Id_Seg_Cesantia,
                     LiqiSueld.Valor_Seg_Cesantia,     LiqiSueld.TotalDescSegSocial,               LiqiSueld.Valor_Impuesto,
                     LiqiSueld.RebaImpto,              LiqiSueld.ImpAPagar,                        LiqiSueld.RemNeta,
                     LiqiSueld.Prestamos,              LiqiSueld.TotalDesctos,                     LiqiSueld.Otrs_Descuentos,
                     LiqiSueld.Anticipos,              LiqiSueld.Total_Pagar );
                return Json(GrabLiq);
            }
        }
        #endregion
               
        #region Busca_Liquidacion 
        public ActionResult BuscLiqSueld(Liquidacion_Sueldo LiqiSueld)
        {
            using (LiqSueld = new EmpleadosEntities())
            {
                var BusLiq = LiqSueld.SP_Sel_liqSueldoXRyM(LiqiSueld.Rut_Empleado, Convert.ToString(LiqiSueld.Fecha_Liquidacion)).ToList();
                return Json(BusLiq);
            }
        }
        #endregion





        //Exportaciones

    }
}
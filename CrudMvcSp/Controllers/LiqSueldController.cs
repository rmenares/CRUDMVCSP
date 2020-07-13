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

        #endregion
                       
        // GET: LiqSueld
        #region Muest_Liq_suel
        public ActionResult Index()
        {
            using(LiqSueld = new EmpleadosEntities())
            {
                var ListLiqSueld = LiqSueld.SP_Mues_liqSueldo().ToList();

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








    }

}
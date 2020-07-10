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
        EmpleadosEntities LiqSueld = new EmpleadosEntities();
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
    }
}
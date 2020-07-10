using System;
using System.IO;
using System.Web;
using System.Text;
using System.Linq;
using OfficeOpenXml;
using System.Web.UI;
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
    public class LoginController : Controller
    {
        // GET: Login
        EmpleadosEntities pass = new EmpleadosEntities();

        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]

        public ActionResult Index()
        {
            return View();
        }

        [HttpPost]
        public ActionResult Index(Login login)
        {
            var Existe = pass.SP_Autoriza(login.User_Id, login.PassWord).FirstOrDefault();
            if (Existe != null)
            {
                Session["User"] = login.User_Id;
                return RedirectToAction("Index", "Home");
            }
            else
            { return Json(Existe); }
        }
    }
}
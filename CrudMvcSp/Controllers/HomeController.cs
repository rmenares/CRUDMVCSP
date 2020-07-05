using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace CrudMvcSp.Controllers
{
    public class HomeController : Controller
    {
        public ActionResult Index()
        {
            return View();
        }

        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";
            return View();
        }

        public ActionResult Contact()
        {
            ViewBag.Message = "Your contact page.";
            return View();
        }

        public ActionResult Salida()
        {
            Session.Clear(); //borra todas las sesiones
            Session.Abandon(); //destruye la sesión y el evento Session_OnEnd es lanzado.
            Session["User"] = null;
            return RedirectToAction("Index", "Login");
        }
    }
}
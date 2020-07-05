using System;
using System.Web;
using System.Linq;
using System.Web.UI;
using System.Web.Mvc;
using CrudMvcSp.Models;
using System.Collections.Generic;

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
using System;
using System.Linq;
using System.Web.UI;
using System.Web.Mvc;
using CrudMvcSp.Models;

namespace CrudMvcSp.Controllers
{
    public class LoginController : Controller
    {
        // GET: Login
        private EmpleadosEntities pass = new EmpleadosEntities();

        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult Index()
        {
            return View();
        }

        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        [HttpPost]
        public ActionResult Index(Login login)
        {
            try {
                var Existe = pass.SP_Autoriza(login.Username, login.Password).FirstOrDefault();
                if (Existe != null)
                {
                    Session["User"] = login.Username;

                    return RedirectToAction("Index", "Home");
                }
                else
                { return Json(Existe); }
            }
            catch (Exception ex) {
                Response.StatusCode = 500;
                Response.StatusDescription = ex.Message;
                return Json(Response);
            }            
        }
    }
}
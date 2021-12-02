using System.Web.UI;
using System.Web.Mvc;

namespace CrudMvcSp.Controllers
{
    public class HomeController : Controller
    {
       
        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult Index()
        {

            return View();
        }

        [AllowAnonymous]
        public ActionResult About()
        {
            ViewBag.Message = "Your application description page.";
            return View();
        }

        [AllowAnonymous]
        public ActionResult Contact()
        {
            ViewBag.Message = "Pagina de Contacto.";
            return View();
        }

        [OutputCache(Location = OutputCacheLocation.None, NoStore = true)]
        public ActionResult Salida()
        {
            // Session.Clear(); //borra todas las sesiones
            Session.Abandon(); //destruye la sesión y el evento Session_OnEnd es lanzado.
            Session["User"] = null;
            return RedirectToAction("Index", "Login");
        }
    }
}
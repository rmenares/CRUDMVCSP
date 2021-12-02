using System.Web;
using System.Web.Optimization;

namespace CrudMvcSp
{
    public class BundleConfig
    {
        // Para obtener más información sobre las uniones, visite https://go.microsoft.com/fwlink/?LinkId=301862
        public static void RegisterBundles(BundleCollection bundles)
        {
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                         "~/Scripts/jquery-{version}.js",
                         "~/Scripts/jquery-ui-1.12.1.min.js",
                         "~/Scripts/jquery.min.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                        "~/Scripts/jquery.validate*"));

            // Utilice la versión de desarrollo de Modernizr para desarrollar y obtener información. De este modo, estará
            // para la producción, use la herramienta de compilación disponible en https://modernizr.com para seleccionar solo las pruebas que necesite.
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                      "~/Scripts/bootstrap.js"));

            bundles.Add(new ScriptBundle("~/bundles/Alertify").Include(
                   "~/Scripts/alertify.js",
                   "~/Scripts/alertify.min.js"));

            bundles.Add(new ScriptBundle("~/Script/WebGrid").Include(
                      "~/Scripts/webGrid.js"));

            bundles.Add(new ScriptBundle("~/Scripts/fontawesome/fontawesome").Include(
                        "~/Scripts/fontawesome/fontawesome.js",
                        "~/Scripts/fontawesome/fontawesome.min.js"));

            bundles.Add(new StyleBundle("~/Content/fontawesome").Include(
                        "~/Content/fontawesome-all.css",
                        "~/Content/fontawesome-all.min.css",
                        "~/Content/fontawesome.css",
                        "~/Content/fontawesome.min.css"));

            bundles.Add(new StyleBundle("~/Content/css").Include(
                      "~/Content/bootstrap.css",
                      "~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Content/Alertify").Include(
                 "~/Content/alertifyjs/alertify.min.css",
                 "~/Content/alertifyjs/themes/default.min.css"));
        }
    }
}

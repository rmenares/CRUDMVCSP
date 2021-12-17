using System;
using System.Web;
using System.Linq;
using System.Web.Mvc;
using System.Web.Routing;
using CrudMvcSp.Controllers;
using System.Web.Optimization;
using System.Collections.Generic;

namespace CrudMvcSp
{
    public class MvcApplication : System.Web.HttpApplication
    {
        protected void Application_Start()
        {
            AreaRegistration.RegisterAllAreas();
            FilterConfig.RegisterGlobalFilters(GlobalFilters.Filters);
            RouteConfig.RegisterRoutes(RouteTable.Routes);
            BundleConfig.RegisterBundles(BundleTable.Bundles);
        }

        //protected void Application_Error()
        //{
        //    Exception ex = Server.GetLastError();
        //    HttpException httpexception = ex as HttpException;
        //    String accion = "";
        //    if (httpexception.GetHttpCode() == 404)
        //    {
        //        accion = "Error404";
        //    }
        //    else
        //    {
        //        accion = "ErrorGeneral";
        //    }
        //    Context.ClearError();
        //    RouteData rutaerror = new RouteData();
        //    rutaerror.Values.Add("controller", "Error");
        //    rutaerror.Values.Add("action", accion);
        //    IController controlador = new ErrorController();
        //    controlador.Execute(
        //        new RequestContext(new HttpContextWrapper(Context), rutaerror));
        //}

        protected void Application_Error()
        {
          HttpContext httpContext = HttpContext.Current;
            if (httpContext != null)
            {
                RequestContext requestContext = ((MvcHandler)httpContext.CurrentHandler).RequestContext;
                /* When the request is ajax the system can automatically handle a mistake with a JSON response. 
                   Then overwrites the default response */
                if (requestContext.HttpContext.Request.IsAjaxRequest())
                {
                    httpContext.Response.Clear();
                    string controllerName = requestContext.RouteData.GetRequiredString("controller");
                    IControllerFactory factory = ControllerBuilder.Current.GetControllerFactory();
                    IController controller = factory.CreateController(requestContext, controllerName);
                    ControllerContext controllerContext = new ControllerContext(requestContext, (ControllerBase)controller);
                
                    JsonResult jsonResult = new JsonResult
                    {
                        Data = new { success = false, serverError = "500" },
                        JsonRequestBehavior = JsonRequestBehavior.AllowGet
                    };
                    jsonResult.ExecuteResult(controllerContext);

                    //httpContext.Response.Redirect(url: "Error/ErrorGeneral");

                    //httpContext.Response.End();
                }
                else
                {
                    //httpContext.Response.Redirect("~/Error");
                    httpContext.Response.Redirect(url:"Error/Error404");
                }
            }
        }
    }
}

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
        string url;

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

        #region Imprime_Liq Sueld_PDF
        public ActionResult ImpLiqSuel(Liquidacion_Sueldo LiqiSueld)
        {
            using (LiqSueld = new EmpleadosEntities())
            {
                var BusLiq = LiqSueld.SP_Sel_LiqSuelRyMPDF(LiqiSueld.Rut_Empleado, Convert.ToString(LiqiSueld.Fecha_Liquidacion)).ToList();

                //crea pdf
                iTextSharp.text.Document document = new iTextSharp.text.Document();
                document.SetPageSize(PageSize.A4);
                document.SetMargins(14.2f, 14.2f, 29f, 31f);

                PdfWriter writer = PdfWriter.GetInstance(document,
                 new FileStream(@"C:\Users\Rodrigo_Menares\Downloads\Liquidacion_" + BusLiq[0].Nombre + "_" + BusLiq[0].ApePat+".pdf", FileMode.Create));

                //hace la insercion del pie de pagina
                writer.PageEvent = new HeadFooter();

                document.Open();
                //insercion de imagenes
                url = Server.MapPath("/Imagenes/bg.jpg");
                iTextSharp.text.Image image = iTextSharp.text.Image.GetInstance(url);
                image.ScaleToFit(140f, 120f);
                image.Alignment = Element.ALIGN_LEFT;
                document.Add(image);
                // fin de insercion de imagenes

                //fuente, tamaño y color de cabecera
                BaseFont bf = BaseFont.CreateFont(BaseFont.HELVETICA_BOLD, BaseFont.CP1250, BaseFont.EMBEDDED);
                iTextSharp.text.Font fontText2 = new iTextSharp.text.Font(bf, 12, 4, BaseColor.BLUE);

                //creacion e insercion de titulos al documento
                iTextSharp.text.Paragraph titulo = new iTextSharp.text.Paragraph(string.Format("Liquidación de Sueldo"), fontText2);
                //titulo.SpacingBefore = 200;
                //titulo.SpacingAfter = 0;
                titulo.Alignment = 1; //0-Left, 1 middle,2 Right
                                      //inserta al documento
                document.Add(titulo);
                //inserta nueva linea al texto
                document.Add(Chunk.NEWLINE);

                // instancia la tabla y le indica la cantidad de columnas
                PdfPTable table1 = new PdfPTable(6);
                PdfPTable table2 = new PdfPTable(6);
                PdfPTable table3 = new PdfPTable(6);
                PdfPTable table4 = new PdfPTable(6);
                PdfPTable table5 = new PdfPTable(6);
                PdfPTable table6 = new PdfPTable(6);
                PdfPTable table7 = new PdfPTable(6);
                PdfPTable table8 = new PdfPTable(6);
                PdfPTable table9 = new PdfPTable(6);
                PdfPTable table10 = new PdfPTable(6);
                PdfPTable table11 = new PdfPTable(6);
                PdfPTable table12 = new PdfPTable(6);
                PdfPTable table13 = new PdfPTable(6);
                PdfPTable table14 = new PdfPTable(6);
                PdfPTable table15 = new PdfPTable(6);
                PdfPTable table16 = new PdfPTable(6);
                PdfPTable table17 = new PdfPTable(6);
                PdfPTable table18 = new PdfPTable(6);
                PdfPTable table19 = new PdfPTable(6);

                //indica q ancho de la hoja va a ocupar la tabla
                table1.WidthPercentage = 95;
                table2.WidthPercentage = 95;
                table3.WidthPercentage = 95;
                table4.WidthPercentage = 95;
                table5.WidthPercentage = 95;
                table6.WidthPercentage = 95;
                table7.WidthPercentage = 95;
                table8.WidthPercentage = 95;
                table9.WidthPercentage = 95;
                table10.WidthPercentage = 95;
                table11.WidthPercentage = 95;
                table12.WidthPercentage = 95;
                table13.WidthPercentage = 95;
                table14.WidthPercentage = 95;
                table15.WidthPercentage = 95;
                table16.WidthPercentage = 95;
                table17.WidthPercentage = 95;
                table18.WidthPercentage = 95;
                table19.WidthPercentage = 95;

                // celda con espacio en blanco
                PdfPCell col1 = new PdfPCell();
                PdfPCell col2 = new PdfPCell();
                PdfPCell col3 = new PdfPCell();
                PdfPCell col4 = new PdfPCell();
                PdfPCell col5 = new PdfPCell();
                PdfPCell col6 = new PdfPCell();

                //esto es para estilo de letra de la tabla
                BaseFont bf2 = BaseFont.CreateFont(BaseFont.TIMES_BOLD, BaseFont.CP1250, BaseFont.EMBEDDED);
                //tamaño y color
                iTextSharp.text.Font fontText = new iTextSharp.text.Font(bf2, 10, 0, BaseColor.BLACK);
                iTextSharp.text.Font fontText3 = new iTextSharp.text.Font(bf2, 8, 0, BaseColor.BLACK);

                col1 = new PdfPCell(new iTextSharp.text.Paragraph("Nombre", fontText));
                col1.BackgroundColor = BaseColor.LIGHT_GRAY;
                table1.AddCell(col1);
                col2 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Nombre, fontText3));
                col2.HorizontalAlignment = Element.ALIGN_CENTER;
                table1.AddCell(col2);
                col3 = new PdfPCell(new iTextSharp.text.Paragraph("Apellido Paterno", fontText));
                col3.BackgroundColor = BaseColor.LIGHT_GRAY;
                table1.AddCell(col3);
                col4 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].ApePat, fontText3));
                col4.HorizontalAlignment = Element.ALIGN_CENTER;
                table1.AddCell(col4);
                col5 = new PdfPCell(new iTextSharp.text.Paragraph(""));
                table1.AddCell(col5);
                col6 = new PdfPCell(new iTextSharp.text.Paragraph(""));
                table1.AddCell(col6);
                document.Add(table1);

                col1 = new PdfPCell(new iTextSharp.text.Paragraph("Rut_Empleado", fontText));
                col1.BackgroundColor = BaseColor.LIGHT_GRAY;
                table2.AddCell(col1);
                col2 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Rut_Empleado, fontText3));
                col2.HorizontalAlignment = Element.ALIGN_CENTER;
                table2.AddCell(col2);
                col3 = new PdfPCell(new iTextSharp.text.Paragraph("Tipo Contrato", fontText));
                col3.BackgroundColor = BaseColor.LIGHT_GRAY;
                table2.AddCell(col3);
                col4 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Descr_Tipo, fontText3));
                col4.HorizontalAlignment = Element.ALIGN_CENTER;
                table2.AddCell(col4);
                col5 = new PdfPCell(new iTextSharp.text.Paragraph("Fecha", fontText));
                col5.BackgroundColor = BaseColor.LIGHT_GRAY;
                table2.AddCell(col5);
                col6 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Fecha_Liquidacion, fontText3));
                col6.HorizontalAlignment = Element.ALIGN_CENTER;
                table2.AddCell(col6);
                document.Add(table2);

                col1 = new PdfPCell(new iTextSharp.text.Paragraph("Sueldo Base", fontText));
                col1.BackgroundColor = BaseColor.LIGHT_GRAY;
                table3.AddCell(col1);
                col2 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Sueldo_Base, fontText3));
                col2.HorizontalAlignment = Element.ALIGN_CENTER;
                table3.AddCell(col2);
                col3 = new PdfPCell(new iTextSharp.text.Paragraph("Dias", fontText));
                col3.BackgroundColor = BaseColor.LIGHT_GRAY;
                table3.AddCell(col3);
                col4 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Dias_Trabajados, fontText3));
                col4.HorizontalAlignment = Element.ALIGN_CENTER;
                table3.AddCell(col4);
                col5 = new PdfPCell(new iTextSharp.text.Paragraph(""));
                table3.AddCell(col5);
                col6 = new PdfPCell(new iTextSharp.text.Paragraph(""));
                table3.AddCell(col6);
                document.Add(table3);

                col1 = new PdfPCell(new iTextSharp.text.Paragraph("Horas Extras", fontText));
                col1.BackgroundColor = BaseColor.LIGHT_GRAY;
                table4.AddCell(col1);
                col2 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Cant_Horas_Extras, fontText3));
                col2.HorizontalAlignment = Element.ALIGN_CENTER;
                table4.AddCell(col2);
                col3 = new PdfPCell(new iTextSharp.text.Paragraph("Total", fontText));
                col3.BackgroundColor = BaseColor.LIGHT_GRAY;
                table4.AddCell(col3);
                col4 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Total_Horas_Extras, fontText3));
                col4.HorizontalAlignment = Element.ALIGN_CENTER;
                table4.AddCell(col4);
                col5 = new PdfPCell(new iTextSharp.text.Paragraph(""));
                table4.AddCell(col5);
                col6 = new PdfPCell(new iTextSharp.text.Paragraph(""));
                table4.AddCell(col6);
                document.Add(table4);

                col1 = new PdfPCell(new iTextSharp.text.Paragraph("% Comision", fontText));
                col1.BackgroundColor = BaseColor.LIGHT_GRAY;
                table5.AddCell(col1);
                col2 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Cant_Horas_Extras, fontText3));
                col2.HorizontalAlignment = Element.ALIGN_CENTER;
                table5.AddCell(col2);
                col3 = new PdfPCell(new iTextSharp.text.Paragraph("Total Comision", fontText));
                col3.BackgroundColor = BaseColor.LIGHT_GRAY;
                table5.AddCell(col3);
                col4 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Total_Horas_Extras, fontText3));
                col4.HorizontalAlignment = Element.ALIGN_CENTER;
                table5.AddCell(col4);
                col5 = new PdfPCell(new iTextSharp.text.Paragraph(""));
                table5.AddCell(col5);
                col6 = new PdfPCell(new iTextSharp.text.Paragraph(""));
                table5.AddCell(col6);
                document.Add(table5);

                col1 = new PdfPCell(new iTextSharp.text.Paragraph("Bonos", fontText));
                col1.BackgroundColor = BaseColor.LIGHT_GRAY;
                table6.AddCell(col1);
                col2 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Bonos, fontText3));
                col2.HorizontalAlignment = Element.ALIGN_CENTER;
                table6.AddCell(col2);
                col3 = new PdfPCell(new iTextSharp.text.Paragraph("Gratificación", fontText));
                col3.BackgroundColor = BaseColor.LIGHT_GRAY;
                table6.AddCell(col3);
                col4 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Gratificacion, fontText3));
                col4.HorizontalAlignment = Element.ALIGN_CENTER;
                table6.AddCell(col4);
                col5 = new PdfPCell(new iTextSharp.text.Paragraph(""));
                table6.AddCell(col5);
                col6 = new PdfPCell(new iTextSharp.text.Paragraph(""));
                table6.AddCell(col6);
                document.Add(table6);

                col1 = new PdfPCell(new iTextSharp.text.Paragraph("Total Imponible", fontText));
                col1.BackgroundColor = BaseColor.LIGHT_GRAY;
                col1.HorizontalAlignment = Element.ALIGN_CENTER;
                col1.Colspan = 3;
                table7.AddCell(col1);
                col2 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].TotalImponible, fontText3));
                col2.BackgroundColor = BaseColor.LIGHT_GRAY;
                col2.HorizontalAlignment = Element.ALIGN_CENTER;
                col2.Colspan = 3;
                table7.AddCell(col2);
                document.Add(table7);

                col1 = new PdfPCell(new iTextSharp.text.Paragraph("Movilización", fontText));
                col1.BackgroundColor = BaseColor.LIGHT_GRAY;
                table8.AddCell(col1);
                col2 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Movilizacion, fontText3));
                col2.HorizontalAlignment = Element.ALIGN_CENTER;
                table8.AddCell(col2);
                col3 = new PdfPCell(new iTextSharp.text.Paragraph("Colación", fontText));
                col3.BackgroundColor = BaseColor.LIGHT_GRAY;
                table8.AddCell(col3);
                col4 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Colacion, fontText3));
                col4.HorizontalAlignment = Element.ALIGN_CENTER;
                table8.AddCell(col4);
                col5 = new PdfPCell(new iTextSharp.text.Paragraph("Viaticos", fontText));
                col5.BackgroundColor = BaseColor.LIGHT_GRAY;
                table8.AddCell(col5);
                col6 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Viaticos, fontText3));
                col6.HorizontalAlignment = Element.ALIGN_CENTER;
                table8.AddCell(col6);
                document.Add(table8);

                col1 = new PdfPCell(new iTextSharp.text.Paragraph("Total haberes", fontText));
                col1.BackgroundColor = BaseColor.LIGHT_GRAY;
                col1.HorizontalAlignment = Element.ALIGN_CENTER;
                col1.Colspan = 3;
                table9.AddCell(col1);
                col2 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].TotalHaberes, fontText3));
                col2.BackgroundColor = BaseColor.LIGHT_GRAY;
                col2.HorizontalAlignment = Element.ALIGN_CENTER;
                col2.Colspan = 3;
                table9.AddCell(col2);
                document.Add(table9);

                col1 = new PdfPCell(new iTextSharp.text.Paragraph("Afp", fontText));
                col1.BackgroundColor = BaseColor.LIGHT_GRAY;
                table10.AddCell(col1);
                col2 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Nom_Afp, fontText3));
                col2.HorizontalAlignment = Element.ALIGN_CENTER;
                table10.AddCell(col2);
                col3 = new PdfPCell(new iTextSharp.text.Paragraph("Monto Afp", fontText));
                col3.BackgroundColor = BaseColor.LIGHT_GRAY;
                table10.AddCell(col3);
                col4 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Valor_Afp, fontText3));
                col4.HorizontalAlignment = Element.ALIGN_CENTER;
                table10.AddCell(col4);
                col5 = new PdfPCell(new iTextSharp.text.Paragraph(""));
                table10.AddCell(col5);
                col6 = new PdfPCell(new iTextSharp.text.Paragraph(""));
                table10.AddCell(col6);
                document.Add(table10);


                col1 = new PdfPCell(new iTextSharp.text.Paragraph("Salud", fontText));
                col1.BackgroundColor = BaseColor.LIGHT_GRAY;
                table11.AddCell(col1);
                col2 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Nombre_Salud, fontText3));
                col2.HorizontalAlignment = Element.ALIGN_CENTER;
                table11.AddCell(col2);
                col3 = new PdfPCell(new iTextSharp.text.Paragraph("Monto Salud", fontText));
                col3.BackgroundColor = BaseColor.LIGHT_GRAY;
                table11.AddCell(col3);
                col4 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Valor_Salud, fontText3));
                col4.HorizontalAlignment = Element.ALIGN_CENTER;
                table11.AddCell(col4);
                col5 = new PdfPCell(new iTextSharp.text.Paragraph(""));
                table11.AddCell(col5);
                col6 = new PdfPCell(new iTextSharp.text.Paragraph(""));
                table11.AddCell(col6);
                document.Add(table11);


                col1 = new PdfPCell(new iTextSharp.text.Paragraph("Seg Cesantia", fontText));
                col1.BackgroundColor = BaseColor.LIGHT_GRAY;
                table12.AddCell(col1);
                col2 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Valor_Seg_Cesantia, fontText3));
                col2.HorizontalAlignment = Element.ALIGN_CENTER;
                table12.AddCell(col2);
                col3 = new PdfPCell(new iTextSharp.text.Paragraph(""));
                table12.AddCell(col3);
                col4 = new PdfPCell(new iTextSharp.text.Paragraph(""));
                table12.AddCell(col4);
                col5 = new PdfPCell(new iTextSharp.text.Paragraph(""));
                table12.AddCell(col5);
                col6 = new PdfPCell(new iTextSharp.text.Paragraph(""));
                table12.AddCell(col6);
                document.Add(table12);

                col1 = new PdfPCell(new iTextSharp.text.Paragraph("Total Descuentos Previsionales", fontText));
                col1.BackgroundColor = BaseColor.LIGHT_GRAY;
                col1.HorizontalAlignment = Element.ALIGN_CENTER;
                col1.Colspan = 3;
                table13.AddCell(col1);
                col2 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].TotalDescSegSocial, fontText3));
                col2.BackgroundColor = BaseColor.LIGHT_GRAY;
                col2.HorizontalAlignment = Element.ALIGN_CENTER;
                col2.Colspan = 3;
                table13.AddCell(col2);
                document.Add(table13);

                col1 = new PdfPCell(new iTextSharp.text.Paragraph("Remuneración Imponible", fontText));
                col1.BackgroundColor = BaseColor.LIGHT_GRAY;
                table14.AddCell(col1);
                col2 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].TotalImponible, fontText3));
                col2.HorizontalAlignment = Element.ALIGN_CENTER;
                table14.AddCell(col2);
                col3 = new PdfPCell(new iTextSharp.text.Paragraph("Descuentos Previsionales", fontText));
                col3.BackgroundColor = BaseColor.LIGHT_GRAY;
                table14.AddCell(col3);
                col4 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].TotalDescSegSocial, fontText3));
                col4.HorizontalAlignment = Element.ALIGN_CENTER;
                table14.AddCell(col4);
                col5 = new PdfPCell(new iTextSharp.text.Paragraph("Remuneración Neta", fontText));
                col5.BackgroundColor = BaseColor.LIGHT_GRAY;
                table14.AddCell(col5);
                col6 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].RemNeta, fontText3));
                col6.HorizontalAlignment = Element.ALIGN_CENTER;
                table14.AddCell(col6);
                document.Add(table14);

                col1 = new PdfPCell(new iTextSharp.text.Paragraph("Calculo de Impuesto a La Renta", fontText));
                col1.BackgroundColor = BaseColor.LIGHT_GRAY;
                col1.HorizontalAlignment = Element.ALIGN_CENTER;
                col1.Colspan = 6;
                table15.AddCell(col1);
                document.Add(table15);

                col1 = new PdfPCell(new iTextSharp.text.Paragraph("Valor Impuesto", fontText));
                col1.BackgroundColor = BaseColor.LIGHT_GRAY;
                table16.AddCell(col1);
                col2 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Valor_Impuesto, fontText3));
                col2.HorizontalAlignment = Element.ALIGN_CENTER;
                table16.AddCell(col2);
                col3 = new PdfPCell(new iTextSharp.text.Paragraph("Rebaja Al Impuesto", fontText));
                col3.BackgroundColor = BaseColor.LIGHT_GRAY;
                table16.AddCell(col3);
                col4 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].RebaImpto, fontText3));
                col4.HorizontalAlignment = Element.ALIGN_CENTER;
                table16.AddCell(col4);
                col5 = new PdfPCell(new iTextSharp.text.Paragraph("Impuesto A Pagar", fontText));
                col5.BackgroundColor = BaseColor.LIGHT_GRAY;
                table16.AddCell(col5);
                col6 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].ImpAPagar, fontText3));
                col6.HorizontalAlignment = Element.ALIGN_CENTER;
                table16.AddCell(col6);
                document.Add(table16);

                col1 = new PdfPCell(new iTextSharp.text.Paragraph("Descuentos y Alcance Liquido", fontText));
                col1.BackgroundColor = BaseColor.LIGHT_GRAY;
                col1.HorizontalAlignment = Element.ALIGN_CENTER;
                col1.Colspan = 6;
                table17.AddCell(col1);
                document.Add(table17);

                col1 = new PdfPCell(new iTextSharp.text.Paragraph("Prestamos", fontText));
                col1.BackgroundColor = BaseColor.LIGHT_GRAY;
                table18.AddCell(col1);
                col2 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Prestamos, fontText3));
                col2.HorizontalAlignment = Element.ALIGN_CENTER;
                table18.AddCell(col2);
                col3 = new PdfPCell(new iTextSharp.text.Paragraph("Otros Descuentos", fontText));
                col3.BackgroundColor = BaseColor.LIGHT_GRAY;
                table18.AddCell(col3);
                col4 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Otrs_Descuentos, fontText3));
                col4.HorizontalAlignment = Element.ALIGN_CENTER;
                table18.AddCell(col4);
                col5 = new PdfPCell(new iTextSharp.text.Paragraph("Total Descuentos", fontText));
                col5.BackgroundColor = BaseColor.LIGHT_GRAY;
                table18.AddCell(col5);
                col6 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].TotalDesctos, fontText3));
                col6.HorizontalAlignment = Element.ALIGN_CENTER;
                table18.AddCell(col6);
                document.Add(table18);

                col1 = new PdfPCell(new iTextSharp.text.Paragraph("Anticipos", fontText));
                col1.BackgroundColor = BaseColor.LIGHT_GRAY;
                table19.AddCell(col1);
                col2 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Anticipos, fontText3));
                col2.HorizontalAlignment = Element.ALIGN_CENTER;
                table19.AddCell(col2);
                col3 = new PdfPCell(new iTextSharp.text.Paragraph("Total A Pagar", fontText));
                col3.BackgroundColor = BaseColor.LIGHT_GRAY;
                table19.AddCell(col3);
                col4 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Total_Pagar, fontText3));
                col4.HorizontalAlignment = Element.ALIGN_CENTER;
                table19.AddCell(col4);
                col5 = new PdfPCell(new iTextSharp.text.Paragraph(""));
                table19.AddCell(col5);
                col6 = new PdfPCell(new iTextSharp.text.Paragraph(""));
                table19.AddCell(col6);
                document.Add(table19);

                //cierra el documento
                document.Close();
                return File("application/pdf", "Liquidación"+BusLiq[0].Nombre + BusLiq[0].ApePat+".pdf");
            }
        }
        #endregion


        #region Inserta_Pie_de_Pagina_al_Pdf
        class HeadFooter : PdfPageEventHelper
        {
            public override void OnEndPage(PdfWriter writer, iTextSharp.text.Document document)
            {
                PdfPCell _cell4 = new PdfPCell();
                PdfPTable tblFooter = new PdfPTable(2);
                tblFooter.TotalWidth = document.PageSize.Width - document.LeftMargin - document.RightMargin;
                tblFooter.DefaultCell.Border = 0;
                tblFooter.AddCell(new iTextSharp.text.Paragraph());

                _cell4 = new PdfPCell(new iTextSharp.text.Paragraph(""));
                _cell4.Border = 0;

                _cell4 = new PdfPCell(new iTextSharp.text.Paragraph("Página " + writer.PageNumber));
                _cell4.HorizontalAlignment = Element.ALIGN_RIGHT;
                _cell4.Border = 0;

                tblFooter.AddCell(_cell4);

                tblFooter.WriteSelectedRows(0, -1, document.LeftMargin, writer.PageSize.GetBottom(document.BottomMargin) - 5, writer.DirectContent);
            }
        }
        #endregion


    }
}
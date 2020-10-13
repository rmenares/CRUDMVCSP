using System;
using System.IO;
using System.Linq;
using OfficeOpenXml;
using System.Web.Mvc;
using System.Drawing;
using iTextSharp.text;
using CrudMvcSp.Models;
using System.Diagnostics;
using iTextSharp.text.pdf;
using OfficeOpenXml.Style;

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
                     LiqiSueld.Rut_Empleado, LiqiSueld.Id_Tipo_Renumeracion, LiqiSueld.Fecha_Liquidacion,
                     LiqiSueld.Sueldo_Base, LiqiSueld.Dias_Trabajados, LiqiSueld.PorcComision,
                     LiqiSueld.Valor_Com, LiqiSueld.Cant_Horas_Extras, LiqiSueld.Total_Horas_Extras,
                     LiqiSueld.Bonos, LiqiSueld.Gratificacion, LiqiSueld.TotalImponible,
                     LiqiSueld.Colacion, LiqiSueld.Movilizacion, LiqiSueld.Viaticos,
                     LiqiSueld.TotalHaberes, LiqiSueld.CodAfp, LiqiSueld.Valor_Afp,
                     LiqiSueld.Cod_Salud, LiqiSueld.Valor_Salud, LiqiSueld.Id_Seg_Cesantia,
                     LiqiSueld.Valor_Seg_Cesantia, LiqiSueld.TotalDescSegSocial, LiqiSueld.Valor_Impuesto,
                     LiqiSueld.RebaImpto, LiqiSueld.ImpAPagar, LiqiSueld.RemNeta,
                     LiqiSueld.Prestamos, LiqiSueld.TotalDesctos, LiqiSueld.Otrs_Descuentos,
                     LiqiSueld.Anticipos, LiqiSueld.Total_Pagar);
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
                 new FileStream(@"C:\Users\Rodrigo_Menares\Downloads\Liquidacion_" + BusLiq[0].Nombre + "_" + BusLiq[0].ApePat + ".pdf", FileMode.Create));

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
                table1.WidthPercentage = 90;
                table2.WidthPercentage = 90;
                table3.WidthPercentage = 90;
                table4.WidthPercentage = 90;
                table5.WidthPercentage = 90;
                table6.WidthPercentage = 90;
                table7.WidthPercentage = 90;
                table8.WidthPercentage = 90;
                table9.WidthPercentage = 90;
                table10.WidthPercentage = 90;
                table11.WidthPercentage = 90;
                table12.WidthPercentage = 90;
                table13.WidthPercentage = 90;
                table14.WidthPercentage = 90;
                table15.WidthPercentage = 90;
                table16.WidthPercentage = 90;
                table17.WidthPercentage = 90;
                table18.WidthPercentage = 90;
                table19.WidthPercentage = 90;

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
                col3 = new PdfPCell(new iTextSharp.text.Paragraph("Dias Trabajados", fontText));
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
                col2 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].PorcComision, fontText3));
                col2.HorizontalAlignment = Element.ALIGN_CENTER;
                table5.AddCell(col2);
                col3 = new PdfPCell(new iTextSharp.text.Paragraph("Total Comision", fontText));
                col3.BackgroundColor = BaseColor.LIGHT_GRAY;
                table5.AddCell(col3);
                col4 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Valor_Com, fontText3));
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

                for (int i = 0; i <= 10; i++)
                {
                    Chunk c1 = new Chunk("\n");
                    document.Add(c1);
                }

                PdfPTable table20 = new PdfPTable(1);
                table20.WidthPercentage = 45;
                PdfPCell col7 = new PdfPCell();
                col7 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Nombre + " " + BusLiq[0].ApePat));
                col7.HorizontalAlignment = Element.ALIGN_CENTER;
                table20.AddCell(col7);
                document.Add(table20);

                PdfPTable table21 = new PdfPTable(1);
              table21.WidthPercentage = 45;
                PdfPCell col8 = new PdfPCell();
                col8 = new PdfPCell(new iTextSharp.text.Paragraph(BusLiq[0].Rut_Empleado));
                col8.HorizontalAlignment = Element.ALIGN_CENTER;
                table21.AddCell(col8);
                document.Add(table21);

                //cierra el documento
                document.Close();

                // busca el camino y abre el archivo para su visualizacion
                string Path = "C:/Users/Rodrigo_Menares/Downloads/";
                Process.Start(Path + "Liquidacion_" + BusLiq[0].Nombre + "_" + BusLiq[0].ApePat + ".pdf");
            }
            return View();
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

        #region Imprime_Liq_Sueld_XLS
        public ActionResult ImpLiqSuelXLS(Liquidacion_Sueldo LiqiSueld)
        {
            using (LiqSueld = new EmpleadosEntities())
            {
                var BusLiq = LiqSueld.SP_Sel_LiqSuelRyMPDF(LiqiSueld.Rut_Empleado, Convert.ToString(LiqiSueld.Fecha_Liquidacion)).ToList();

                ExcelPackage excel = new ExcelPackage();

                //agrega 1 hoja al libro y le da un nombre
                ExcelWorksheet worksheet = excel.Workbook.Worksheets.Add("Liquidación_Sueldo_"+BusLiq[0].Nombre+"_"+BusLiq[0].ApePat);

                //get the image from disk
                //System.Drawing.Image image = System.Drawing.Image.FromFile(Server.MapPath("/Imagenes/bg.jpg"));
                // var excelImage = worksheet.Drawings.AddPicture("My Logo", image);
                //add the image to row 0, column A
                //excelImage.SetPosition(0, 0, 0, 0);

                // asigna el rango de despliegue de la cabecera
                worksheet.Cells["A2:B2"].Value = "Liquidación De Sueldos";
                worksheet.Cells["A2:B2"].Merge = true;
                //le da estilo a la cabecera
                worksheet.Cells["A2:B2"].Style.Font.Bold = true;
                worksheet.Cells["A2:B2"].Style.Font.Size = 14;
                worksheet.Cells["A2:B2"].Style.Font.Color.SetColor(Color.Black);
                worksheet.Cells["A2:B2"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                //fija los bordes de las celdas y el tipo 
                worksheet.Cells["B4:G22"].Style.Border.Top.Style = ExcelBorderStyle.Thick;
                worksheet.Cells["B4:G22"].Style.Border.Left.Style = ExcelBorderStyle.Thick;
                worksheet.Cells["B4:G22"].Style.Border.Right.Style = ExcelBorderStyle.Thick;
                worksheet.Cells["B4:G22"].Style.Border.Bottom.Style = ExcelBorderStyle.Thick;

                // los titulos 
                worksheet.Cells["B4"].Value = "Nombre";
                worksheet.Cells["B4"].Style.Font.Bold = true;
                worksheet.Cells["B4"].Style.Font.Size = 12;
                worksheet.Cells["B4"].Style.Fill.PatternType =  ExcelFillStyle.Solid;
                worksheet.Cells["B4"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["B4"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["D4"].Value = "Apellido Paterno";
                worksheet.Cells["D4"].Style.Font.Bold = true;
                worksheet.Cells["D4"].Style.Font.Size = 12;
                worksheet.Cells["D4"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["D4"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["D4"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["B5"].Value = "Rut_Empleado";
                worksheet.Cells["B5"].Style.Font.Bold = true;
                worksheet.Cells["B5"].Style.Font.Size = 12;
                worksheet.Cells["B5"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["B5"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["B5"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["D5"].Value = "Tipo Contrato";
                worksheet.Cells["D5"].Style.Font.Bold = true;
                worksheet.Cells["D5"].Style.Font.Size = 12;
                worksheet.Cells["D5"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["D5"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["D5"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["F5"].Value = "Fecha";
                worksheet.Cells["F5"].Style.Font.Bold = true;
                worksheet.Cells["F5"].Style.Font.Size = 12;
                worksheet.Cells["F5"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["F5"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["F5"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["B6"].Value = "Sueldo Base";
                worksheet.Cells["B6"].Style.Font.Bold = true;
                worksheet.Cells["B6"].Style.Font.Size = 12;
                worksheet.Cells["B6"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["B6"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["B6"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["D6"].Value = "Dias Trabajados";
                worksheet.Cells["D6"].Style.Font.Bold = true;
                worksheet.Cells["D6"].Style.Font.Size = 12;
                worksheet.Cells["D6"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["D6"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["D6"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["B7"].Value = "Horas Extras";
                worksheet.Cells["B7"].Style.Font.Bold = true;
                worksheet.Cells["B7"].Style.Font.Size = 12;
                worksheet.Cells["B7"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["B7"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["B7"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["D7"].Value = "Total";
                worksheet.Cells["D7"].Style.Font.Bold = true;
                worksheet.Cells["D7"].Style.Font.Size = 12;
                worksheet.Cells["D7"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["D7"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["D7"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["B8"].Value = "% Comision";
                worksheet.Cells["B8"].Style.Font.Bold = true;
                worksheet.Cells["B8"].Style.Font.Size = 12;
                worksheet.Cells["B8"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["B8"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["B8"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["D8"].Value = "Total Comision";
                worksheet.Cells["D8"].Style.Font.Bold = true;
                worksheet.Cells["D8"].Style.Font.Size = 12;
                worksheet.Cells["D8"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["D8"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["D8"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["B9"].Value = "Bonos";
                worksheet.Cells["B9"].Style.Font.Bold = true;
                worksheet.Cells["B9"].Style.Font.Size = 12;
                worksheet.Cells["B9"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["B9"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["B9"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["D9"].Value = "Gratificación";
                worksheet.Cells["D9"].Style.Font.Bold = true;
                worksheet.Cells["D9"].Style.Font.Size = 12;
                worksheet.Cells["D9"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["D9"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["D9"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["B10:D10"].Value = "Total Imponible";
                worksheet.Cells["B10:D10"].Merge = true;
                worksheet.Cells["B10:D10"].Style.Font.Bold = true;
                worksheet.Cells["B10:D10"].Style.Font.Size = 14;
                worksheet.Cells["B10:D10"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["B10:D10"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["B10:D10"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["B11"].Value = "Movilización";
                worksheet.Cells["B11"].Style.Font.Bold = true;
                worksheet.Cells["B11"].Style.Font.Size = 12;
                worksheet.Cells["B11"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["B11"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["B11"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["D11"].Value = "Colación";
                worksheet.Cells["D11"].Style.Font.Bold = true;
                worksheet.Cells["D11"].Style.Font.Size = 12;
                worksheet.Cells["D11"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["D11"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["D11"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["F11"].Value = "Viaticos";
                worksheet.Cells["F11"].Style.Font.Bold = true;
                worksheet.Cells["F11"].Style.Font.Size = 12;
                worksheet.Cells["F11"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["F11"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["F11"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["B12:D12"].Value = "Total Haberes";
                worksheet.Cells["B12:D12"].Merge = true;
                worksheet.Cells["B12:D12"].Style.Font.Bold = true;
                worksheet.Cells["B12:D12"].Style.Font.Size = 14;
                worksheet.Cells["B12:D12"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["B12:D12"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["B12:D12"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["B13"].Value = "AFP";
                worksheet.Cells["B13"].Style.Font.Bold = true;
                worksheet.Cells["B13"].Style.Font.Size = 12;
                worksheet.Cells["B13"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["B13"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["B13"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["D13"].Value = "Monto AFP";
                worksheet.Cells["D13"].Style.Font.Bold = true;
                worksheet.Cells["D13"].Style.Font.Size = 12;
                worksheet.Cells["D13"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["D13"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["D13"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["B14"].Value = "Salud";
                worksheet.Cells["B14"].Style.Font.Bold = true;
                worksheet.Cells["B14"].Style.Font.Size = 12;
                worksheet.Cells["B14"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["B14"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["B14"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["D14"].Value = "Monto Salud";
                worksheet.Cells["D14"].Style.Font.Bold = true;
                worksheet.Cells["D14"].Style.Font.Size = 12;
                worksheet.Cells["D14"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["D14"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["D14"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["B15"].Value = "Seg Cesantia";
                worksheet.Cells["B15"].Style.Font.Bold = true;
                worksheet.Cells["B15"].Style.Font.Size = 12;
                worksheet.Cells["B15"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["B15"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["B15"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["B16:D16"].Value = "Total Descuentos Previsionales";
                worksheet.Cells["B16:D16"].Merge = true;
                worksheet.Cells["B16:D16"].Style.Font.Bold = true;
                worksheet.Cells["B16:D16"].Style.Font.Size = 14;
                worksheet.Cells["B16:D16"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["B16:D16"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["B16:D16"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["B17"].Value = "Remuneración Imponible";
                worksheet.Cells["B17"].Style.Font.Bold = true;
                worksheet.Cells["B17"].Style.Font.Size = 12;
                worksheet.Cells["B17"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["B17"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["B17"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["D17"].Value = "Descuentos Previsionales";
                worksheet.Cells["D17"].Style.Font.Bold = true;
                worksheet.Cells["D17"].Style.Font.Size = 12;
                worksheet.Cells["D17"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["D17"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["D17"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["F17"].Value = "Remuneración Neta";
                worksheet.Cells["F17"].Style.Font.Bold = true;
                worksheet.Cells["F17"].Style.Font.Size = 12;
                worksheet.Cells["F17"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["F17"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["F17"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["B18:G18"].Value = "Calculo de Impuesto a La Renta";
                worksheet.Cells["B18:G18"].Merge = true;
                worksheet.Cells["B18:G18"].Style.Font.Bold = true;
                worksheet.Cells["B18:G18"].Style.Font.Size = 14;
                worksheet.Cells["B18:G18"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["B18:G18"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["B18:G18"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["B19"].Value = "Valor Impuesto";
                worksheet.Cells["B19"].Style.Font.Bold = true;
                worksheet.Cells["B19"].Style.Font.Size = 12;
                worksheet.Cells["B19"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["B19"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["B19"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["D19"].Value = "Rebaja Al Impuesto";
                worksheet.Cells["D19"].Style.Font.Bold = true;
                worksheet.Cells["D19"].Style.Font.Size = 12;
                worksheet.Cells["D19"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["D19"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["D19"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["F19"].Value = "Impuesto A Pagar";
                worksheet.Cells["F19"].Style.Font.Bold = true;
                worksheet.Cells["F19"].Style.Font.Size = 12;
                worksheet.Cells["F19"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["F19"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["F19"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["B20:G20"].Value = "Descuentos y Alcance Liquido";
                worksheet.Cells["B20:G20"].Merge = true;
                worksheet.Cells["B20:G20"].Style.Font.Bold = true;
                worksheet.Cells["B20:G20"].Style.Font.Size = 14;
                worksheet.Cells["B20:G20"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["B20:G20"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["B20:G20"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["B21"].Value = "Prestamos";
                worksheet.Cells["B21"].Style.Font.Bold = true;
                worksheet.Cells["B21"].Style.Font.Size = 12;
                worksheet.Cells["B21"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["B21"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["B21"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["D21"].Value = "Otros Descuentos";
                worksheet.Cells["D21"].Style.Font.Bold = true;
                worksheet.Cells["D21"].Style.Font.Size = 12;
                worksheet.Cells["D21"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["D21"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["D21"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["F21"].Value = "Total Descuentos";
                worksheet.Cells["F21"].Style.Font.Bold = true;
                worksheet.Cells["F21"].Style.Font.Size = 12;
                worksheet.Cells["F21"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["F21"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["F21"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["B22"].Value = "Anticipos";
                worksheet.Cells["B22"].Style.Font.Bold = true;
                worksheet.Cells["B22"].Style.Font.Size = 12;
                worksheet.Cells["B22"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["B22"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["B22"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                worksheet.Cells["D22"].Value = "Total A Pagar";
                worksheet.Cells["D22"].Style.Font.Bold = true;
                worksheet.Cells["D22"].Style.Font.Size = 14;
                worksheet.Cells["D22"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["D22"].Style.Fill.BackgroundColor.SetColor(Color.Gray);
                worksheet.Cells["D22"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Left;

                // Fin de Titulos
                

                // Datos
                worksheet.Cells["C4"].Value = BusLiq[0].Nombre;
                worksheet.Cells["C4"].Style.Font.Size = 10;
                worksheet.Cells["C4"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["E4"].Value = BusLiq[0].ApePat;
                worksheet.Cells["E4"].Style.Font.Size = 10;
                worksheet.Cells["E4"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["C5"].Value = BusLiq[0].Rut_Empleado;
                worksheet.Cells["C5"].Style.Font.Size = 10;
                worksheet.Cells["C5"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["E5"].Value = BusLiq[0].Descr_Tipo;
                worksheet.Cells["E5"].Style.Font.Size = 10;
                worksheet.Cells["E5"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["G5"].Value = BusLiq[0].Fecha_Liquidacion;
                worksheet.Cells["G5"].Style.Font.Size = 10;
                worksheet.Cells["G5"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["C6"].Value = BusLiq[0].Sueldo_Base;
                worksheet.Cells["C6"].Style.Font.Size = 10;
                worksheet.Cells["C6"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["E6"].Value = BusLiq[0].Dias_Trabajados;
                worksheet.Cells["E6"].Style.Font.Size = 10;
                worksheet.Cells["E6"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["C7"].Value = BusLiq[0].Cant_Horas_Extras;
                worksheet.Cells["C7"].Style.Font.Size = 10;
                worksheet.Cells["C7"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["E7"].Value = BusLiq[0].Total_Horas_Extras;
                worksheet.Cells["E7"].Style.Font.Size = 10;
                worksheet.Cells["E7"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["C8"].Value = BusLiq[0].PorcComision;
                worksheet.Cells["C8"].Style.Font.Size = 10;
                worksheet.Cells["C8"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["E8"].Value = BusLiq[0].Valor_Com;
                worksheet.Cells["E8"].Style.Font.Size = 10;
                worksheet.Cells["E8"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["C9"].Value = BusLiq[0].Bonos;
                worksheet.Cells["C9"].Style.Font.Size = 10;
                worksheet.Cells["C9"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["E9"].Value = BusLiq[0].Gratificacion;
                worksheet.Cells["E9"].Style.Font.Size = 10;
                worksheet.Cells["E9"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["E10:G10"].Value = BusLiq[0].TotalImponible;
                worksheet.Cells["E10:G10"].Merge = true;
                worksheet.Cells["E10:G10"].Style.Font.Size = 12;
                worksheet.Cells["E10:G10"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["E10:G10"].Style.Fill.BackgroundColor.SetColor(Color.GreenYellow);
                worksheet.Cells["E10:G10"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["C11"].Value = BusLiq[0].Movilizacion;
                worksheet.Cells["C11"].Style.Font.Size = 10;
                worksheet.Cells["C11"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["E11"].Value = BusLiq[0].Colacion;
                worksheet.Cells["E11"].Style.Font.Size = 10;
                worksheet.Cells["E11"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["G11"].Value = BusLiq[0].Viaticos;
                worksheet.Cells["G11"].Style.Font.Size = 10;
                worksheet.Cells["G11"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["E12:G12"].Value = BusLiq[0].TotalHaberes;
                worksheet.Cells["E12:G12"].Merge = true;
                worksheet.Cells["E12:G12"].Style.Font.Size = 12;
                worksheet.Cells["E12:G12"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["E12:G12"].Style.Fill.BackgroundColor.SetColor(Color.GreenYellow);
                worksheet.Cells["E12:G12"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["C13"].Value = BusLiq[0].Nom_Afp;
                worksheet.Cells["C13"].Style.Font.Size = 10;
                worksheet.Cells["C13"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["E13"].Value = BusLiq[0].Valor_Afp;
                worksheet.Cells["E13"].Style.Font.Size = 10;
                worksheet.Cells["E13"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["C14"].Value = BusLiq[0].Nombre_Salud;
                worksheet.Cells["C14"].Style.Font.Size = 10;
                worksheet.Cells["C14"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["E14"].Value = BusLiq[0].Valor_Salud;
                worksheet.Cells["E14"].Style.Font.Size = 10;
                worksheet.Cells["E14"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["E15"].Value = BusLiq[0].Valor_Seg_Cesantia;
                worksheet.Cells["E15"].Style.Font.Size = 10;
                worksheet.Cells["E15"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["E16:G16"].Value = BusLiq[0].TotalDescSegSocial;
                worksheet.Cells["E16:G16"].Merge = true;
                worksheet.Cells["E16:G16"].Style.Font.Size = 12;
                worksheet.Cells["E16:G16"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["E16:G16"].Style.Fill.BackgroundColor.SetColor(Color.GreenYellow);
                worksheet.Cells["E16:G16"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["C17"].Value = BusLiq[0].TotalImponible;
                worksheet.Cells["C17"].Style.Font.Size = 10;
                worksheet.Cells["C17"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["E17"].Value = BusLiq[0].TotalDescSegSocial;
                worksheet.Cells["E17"].Style.Font.Size = 10;
                worksheet.Cells["E17"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["G17"].Value = BusLiq[0].RemNeta;
                worksheet.Cells["G17"].Style.Font.Size = 10;
                worksheet.Cells["G17"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["C19"].Value = BusLiq[0].Valor_Impuesto;
                worksheet.Cells["C19"].Style.Font.Size = 10;
                worksheet.Cells["C19"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["E19"].Value = BusLiq[0].RebaImpto;
                worksheet.Cells["E19"].Style.Font.Size = 10;
                worksheet.Cells["E19"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["G19"].Value = BusLiq[0].ImpAPagar;
                worksheet.Cells["G19"].Style.Font.Size = 10;
                worksheet.Cells["G19"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["C21"].Value = BusLiq[0].Prestamos;
                worksheet.Cells["C21"].Style.Font.Size = 10;
                worksheet.Cells["C21"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["E21"].Value = BusLiq[0].Otrs_Descuentos;
                worksheet.Cells["E21"].Style.Font.Size = 10;
                worksheet.Cells["E21"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["G21"].Value = BusLiq[0].TotalDesctos;
                worksheet.Cells["G21"].Style.Font.Size = 10;
                worksheet.Cells["G21"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["C22"].Value = BusLiq[0].Anticipos;
                worksheet.Cells["C22"].Style.Font.Size = 10;
                worksheet.Cells["C22"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["E22"].Value = BusLiq[0].Total_Pagar;
                worksheet.Cells["E22"].Style.Font.Size = 12;
                worksheet.Cells["E22"].Style.Fill.PatternType = ExcelFillStyle.Solid;
                worksheet.Cells["E22"].Style.Fill.BackgroundColor.SetColor(Color.GreenYellow);
                worksheet.Cells["E22"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                //Fin de Datos
                //firmas
                worksheet.Cells["B26:G27"].Style.Border.Top.Style = ExcelBorderStyle.Thick;
                worksheet.Cells["B26:G27"].Style.Border.Left.Style = ExcelBorderStyle.Thick;
                worksheet.Cells["B26:G27"].Style.Border.Right.Style = ExcelBorderStyle.Thick;
                worksheet.Cells["B26:G27"].Style.Border.Bottom.Style = ExcelBorderStyle.Thick;

                worksheet.Cells["B26:G26"].Value = BusLiq[0].Nombre + " " + BusLiq[0].ApePat;
                worksheet.Cells["B26:G26"].Merge = true;
                worksheet.Cells["B26:G26"].Style.Font.Bold = true;
                worksheet.Cells["B26:G26"].Style.Font.Size = 14;
                worksheet.Cells["B26:G26"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                worksheet.Cells["B27:G27"].Value = BusLiq[0].Rut_Empleado;
                worksheet.Cells["B27:G27"].Merge = true;
                worksheet.Cells["B27:G27"].Style.Font.Bold = true;
                worksheet.Cells["B27:G27"].Style.Font.Size = 14;
                worksheet.Cells["B27:G27"].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                // fin de firmas

                // agrega pie de Pagina
                //worksheet.HeaderFooter.OddFooter.RightAlignedText = string.Format("Footer: Page {0} of {1}", ExcelHeaderFooter.PageNumber, ExcelHeaderFooter.NumberOfPages); // add the page number to the footer plus the total number of pages

                // Auto Ajusta el tamaño de Las Columnas
                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();

                // Graba la planilla
                FileInfo fi = new FileInfo(@"C:\Users\Rodrigo_Menares\Downloads\Liquidacion_" + BusLiq[0].Nombre + "_" + BusLiq[0].ApePat + ".xlsx");
                excel.SaveAs(fi);

                //abre excel y el documento
                Process.Start("Excel", Convert.ToString(fi));
            }
            return View();
        }
        #endregion
    }

}
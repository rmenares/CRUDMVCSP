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
    public class NacionalidadController : Controller
    {
        EmpleadosEntities ManNac = new EmpleadosEntities();

        #region Carga_Nacionalidades
        // GET: Nacionalidad
        public ActionResult Index()
        {
            using (ManNac = new EmpleadosEntities())
            {
                try
                {
                    var ListNac = ManNac.Nacionalidad.ToList();                        
                    return View(ListNac);
                }
                catch (Exception) { throw; }
            }
        }
        #endregion

        #region Graba_Nacionalidades
        [HttpPost]
        public ActionResult GrabaNacionalidad(Nacionalidad nacionalidad)
        {
            using (var ManNac = new EmpleadosEntities())
            {
                var GrabNac = ManNac.Sp_Ins_Nacionalidad(nacionalidad.Descripcion);
                return Json(GrabNac);
            }
        }
        #endregion

        #region Modifica_Nacionalidades
        [HttpPost]
        public ActionResult EditNac(Nacionalidad nacionalidad)
        {
            using (var ManNac = new EmpleadosEntities())
            {
                var UpdNac = ManNac.Sp_UPD_Nacionalidad(nacionalidad.Id_Nac, nacionalidad.Descripcion);
            }
            return RedirectToAction("Index");
        }
        #endregion

        //Exportaciones
        #region Crea_Pdf                       
        public ActionResult GetPdf()
        {
            using (var ManNac = new EmpleadosEntities())
            {
                var ListNac = ManNac.Nacionalidad.ToList();

                MemoryStream ms = new MemoryStream();

                iTextSharp.text.Document document = new iTextSharp.text.Document();
                document.SetPageSize(PageSize.A4);
                document.SetMargins(50, 50, 50, 50);

                PdfWriter pdf = PdfWriter.GetInstance(document, ms);

                //agrega el autor del documento
                document.AddAuthor("Rodrigo Menares Guzman");
                // document.AddTitle("Listado_de_Cargos");

                //hace la insercion del pie de pagina
                pdf.PageEvent = new HeadFooter();

                document.Open();
                //insercion de imagenes
                string url = Server.MapPath("/Imagenes/bg.jpg");
                iTextSharp.text.Image image = iTextSharp.text.Image.GetInstance(url);
                image.ScaleToFit(140f, 120f);
                image.Alignment = Element.ALIGN_LEFT;
                document.Add(image);
                // fin de insercion de imagenes

                //fuente, tamaño y color de cabecera
                BaseFont bf = BaseFont.CreateFont(BaseFont.HELVETICA_BOLD, BaseFont.CP1250, BaseFont.EMBEDDED);
                iTextSharp.text.Font fontText2 = new iTextSharp.text.Font(bf, 16, 4, BaseColor.BLUE);

                //creacion e insercion de titulos al documento
                iTextSharp.text.Paragraph titulo = new iTextSharp.text.Paragraph(string.Format("Listado de Nacionalidades"), fontText2);
                titulo.Alignment = 1; //0-Left, 1 middle,2 Right

                //inserta al documento
                document.Add(titulo);
                //inserta nueva linea al texto
                document.Add(iTextSharp.text.Chunk.NEWLINE);

                //esto es para estilo de letra de la tabla
                BaseFont bf2 = BaseFont.CreateFont(BaseFont.TIMES_BOLD, BaseFont.CP1250, BaseFont.EMBEDDED);
                //tamaño y color
                iTextSharp.text.Font fontText = new iTextSharp.text.Font(bf2, 10, 0, BaseColor.BLACK);

                iTextSharp.text.Font fontText3 = new iTextSharp.text.Font(bf2, 10, 0, BaseColor.WHITE);

                // instancia la tabla y le indica la cantidad de columnas
                PdfPTable table = new PdfPTable(2);
                //indica q ancho de la hoja va a ocupar la tabla
                table.WidthPercentage = 95;

                // instancia para la generacion de celdas en la tabla                
                PdfPCell _cell = new PdfPCell();

                //genera la cabecera de la tabla
                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Código Nacionalidad", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Nacionalidad", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                //llena la tabla y ademas le da la alineacion a los datos
                foreach (var item in ListNac)
                {
                    PdfPCell _cell2 = new PdfPCell();

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Id_Nac.ToString(), fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_RIGHT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Descripcion, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(_cell2);
                }

                //agrega la tabla al documento
                document.Add(table);

                //cierra el documento
                document.Close();

                //vacia la memoria(documento) hacia memory stream
                byte[] byteStream = ms.ToArray();
                ms = new MemoryStream();
                ms.Write(byteStream, 0, byteStream.Length);
                ms.Position = 0;

                //esto permite que el archivo pdf se muestre por pantalla en el explorador y a su vez sea guardado en el disco
                return File(ms, "application/pdf", "ListaNacionalidades.pdf");
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

        #region Crea_Excel
        public void GetXls()
        {
            using (var ManNac = new EmpleadosEntities())
            {
                var ListNac = ManNac.Nacionalidad.ToList();

                ExcelPackage excel = new ExcelPackage();

                //agrega 1 hoja al libro y le da un nombre
                excel.Workbook.Worksheets.Add("Lista_Nacionalidades");

                // crea la cabecera
                var headerRow = new System.Collections.Generic.List<string[]>() {

                   new string[] { "Código Nación", "Nación" }
                 };

                // Le da un Nombre a la Hoja
                var worksheet = excel.Workbook.Worksheets["Lista_Nacionalidades"];

                // asigna el rango de despliegue de la cabecera
                //string headerRange = "A1:" + Char.ConvertFromUtf32(headerRow[0].Length + 64) + "1";
                string headerRange = "A2:B2";

                // Agrega la Cabecera a la hoja de trabajo
                worksheet.Cells[headerRange].LoadFromArrays(headerRow);

                //le da estilo a la cabecera
                worksheet.Cells[headerRange].Style.Font.Bold = true;
                worksheet.Cells[headerRange].Style.Font.Size = 14;
                worksheet.Cells[headerRange].Style.Font.Color.SetColor(System.Drawing.Color.Blue);
                worksheet.Cells[headerRange].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                int rowStart = 3; //  fila (de inicio) en la que se empiezan a dejar los datos
                // carga los datos a las filas y les da format
                foreach (var item in ListNac)
                {
                    worksheet.Cells[string.Format("A{0}", rowStart)].Value = item.Id_Nac;
                    worksheet.Cells[string.Format("A{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("A{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Right;
                    worksheet.Cells[string.Format("A{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("B{0}", rowStart)].Value = item.Descripcion;
                    worksheet.Cells[string.Format("B{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("B{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("B{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    rowStart++;
                }
                // Auto Ajusta el tamaño de Las Columnas
                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();

                // Graba la planilla
                Response.Clear();
                Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                Response.AddHeader("content-disposition", "attachment;filename=\"ListaNacionalidad.xlsx\"");
                Response.BinaryWrite(excel.GetAsByteArray());
                Response.End();
            }
        }
        #endregion

        #region Crea_CSV
        public FileResult GetCsv()
        {
            using (var ManNac = new EmpleadosEntities())
            {
                var ListNac = ManNac.Nacionalidad.ToList();

                List<object> customers = (from customer in ListNac
                                          select new[] {
                                              customer.Id_Nac.ToString(),
                                              customer.Descripcion }).ToList<object>();
                //Insert the Column Names.
                customers.Insert(0, new string[2] { "Codigo Nacionalidad", "Nombre Nacionalidad" });

                StringBuilder sb = new StringBuilder();

                for (int i = 0; i < customers.Count; i++)
                {
                    string[] customer = (string[])customers[i];
                    for (int j = 0; j < customer.Length; j++)
                    {
                        //Append data with separator.
                        sb.Append(customer[j] + ',');
                    }
                    //Append new line character.
                    sb.Append("\r\n");
                }
                return File(Encoding.UTF8.GetBytes(sb.ToString()), "text/csv", "ListaNacionalidades.csv");
            }
        }
        #endregion

        #region Crea_DOC
        public ActionResult GetDocx()
        {
            using (var ManNac = new EmpleadosEntities())
            {
                var ListNac = ManNac.Nacionalidad.ToList();

                //Ubicacion de Archivo
                string filename = @"C:\Users\Rodrigo_Menares\Downloads\ListaNacionalidades.docx";
                var doc = DocX.Create(filename);

                //Carga una imagen en formato JPG
                var image = doc.AddImage(Server.MapPath("/Imagenes/bg.jpg"));
                // Set Picture Height and Width.
                var picture = image.CreatePicture(50, 50);
                picture.Width = 50;
                picture.Height = 50;

                //Titulo Del Documento
                string title = "Lista De Cargos";

                //Formato del Titulo
                Formatting titleFormat = new Formatting();
                //Specify font family  
                titleFormat.FontFamily = new Xceed.Document.NET.Font("Arial Black");
                //Specify font size y color del texto 
                titleFormat.Size = 14D;
                titleFormat.Position = 40;
                titleFormat.FontColor = System.Drawing.Color.Orange;
                titleFormat.UnderlineColor = System.Drawing.Color.Gray;
                titleFormat.Italic = true;

                //combina el titulo con el formato definido
                Xceed.Document.NET.Paragraph paragraphTitle = doc.InsertParagraph(title, false, titleFormat);

                // alinea el titulo al centro
                paragraphTitle.Alignment = Alignment.center;

                //Insert text  
                Table tbl = doc.AddTable(ListNac.Count + 1, 2);

                //hace que la tabla este al centro de la pagina
                tbl.Alignment = Alignment.center;
                tbl.Design = TableDesign.ColorfulList;

                //agrega los titulos de la tabla
                tbl.Rows[0].Cells[0].Paragraphs.First().Append("Código Nacionalidad").FontSize(12D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[1].Paragraphs.First().Append("Nombre Nacionalidad").FontSize(12D).Alignment = Alignment.center;

                //llena las celdas con los datos 
                int fila = 1;
                int columna = 0;
                foreach (var item in ListNac)
                {
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Id_Nac)).FontSize(12D).Alignment = Alignment.right;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Descripcion)).FontSize(12D).Alignment = Alignment.center;
                    fila++;
                    columna = 0;
                }
                //inserta la tabla dentro del documento
                doc.InsertTable(tbl);

                //Genera el Pie de Pagina del Documento
                doc.AddFooters();
                //Indica que que la primera página tendrá pies de página independientes
                doc.DifferentFirstPage = true;
                //Indica que que la página par e impar tendrá pies de página separados
                doc.DifferentOddAndEvenPages = true;
                Footer footer_main = doc.Footers.First;
                Paragraph pFooter = footer_main.Paragraphs.First();
                pFooter.Alignment = Alignment.center;
                pFooter.Append("Página ").Bold();
                pFooter.AppendPageNumber(PageNumberFormat.normal).Bold();
                pFooter.Append("/").Bold();
                pFooter.AppendPageCount(PageNumberFormat.normal).Bold();

                //graba el documento
                doc.Save();

                //abre word y el documento
                Process.Start("WINWORD", filename);

                return RedirectToAction("Index");
            }
        }
        #endregion
    }
}
using System;
using System.IO;
using System.Linq;
using System.Text;
using OfficeOpenXml;
using System.Web.Mvc;
using Xceed.Words.NET;
using iTextSharp.text;
using CrudMvcSp.Models;
using System.Diagnostics;
using Xceed.Document.NET;
using iTextSharp.text.pdf;
using System.Collections.Generic;
using Paragraph = Xceed.Document.NET.Paragraph;

namespace CrudMvcSp.Controllers
{
    public class CargosController : Controller
    {
        private EmpleadosEntities Cargos = new EmpleadosEntities();

        // GET: Cargos

        #region Carga_Cargos

        public ActionResult Index()
        {
            using (Cargos = new EmpleadosEntities())
            {
                var ListCargos = Cargos.Cargos.ToList();
                return View(ListCargos);
            }
        }

        #endregion Carga_Cargos

        #region Graba_Cargos

        [HttpPost]
        public ActionResult GrabaCargos(Cargos cargos)
        {
            using (var Cargos = new EmpleadosEntities())
            {
                var GrabaCarg = Cargos.Sp_Ins_Cargos(cargos.Descr_Cargo);
                return Json(GrabaCarg);
            }
        }

        #endregion Graba_Cargos

        #region Actualiza_Cargos

        [HttpPost]
        public ActionResult EditCarg(Cargos cargos)
        {
            using (var Cargos = new EmpleadosEntities())
            {
                var UpdCargos = Cargos.Sp_UPD_Cargos(cargos.Id_Carg, cargos.Descr_Cargo);
            }
            return RedirectToAction("Index");
        }

        #endregion Actualiza_Cargos

        //Exportaciones

        #region Crea_Pdf

        public ActionResult GetPdf()
        {
            using (var Cargos = new EmpleadosEntities())
            {
                var ListCargos = this.Cargos.Cargos.ToList();
                MemoryStream ms = new MemoryStream();

                iTextSharp.text.Document document = new iTextSharp.text.Document();
                document.SetPageSize(PageSize.A4);
                document.SetMargins(50, 50, 50, 50);

                PdfWriter pdf = PdfWriter.GetInstance(document, ms);

                //agrega el autor del documento
                document.AddAuthor("Rodrigo Menares Guzman");

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
                //this is a possible style
                //NORMAL = 0;
                //BOLD = 1;
                //ITALIC = 2;
                //UNDERLINE = 4;
                //STRIKETHRU = 8;
                //BOLDITALIC = 3;
                //UNDEFINED = -1;
                //DEFAULTSIZE = 12;

                //creacion e insercion de titulos al documento
                iTextSharp.text.Paragraph titulo = new iTextSharp.text.Paragraph(string.Format("Listado de Cargos"), fontText2);
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
                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Código Cargo", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Cargos", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                //llena la tabla y ademas le da la alineacion a los datos
                foreach (var item in ListCargos)
                {
                    PdfPCell _cell2 = new PdfPCell();

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Id_Carg.ToString(), fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_RIGHT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Descr_Cargo, fontText));
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
                return File(ms, "application/pdf", "ListaCargos.pdf");
            }
        }

        #endregion Crea_Pdf

        #region Inserta_Pie_de_Pagina_al_Pdf

        private class HeadFooter : PdfPageEventHelper
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

        #endregion Inserta_Pie_de_Pagina_al_Pdf

        #region Crea_Excel

        public void GetXls()
        {
            using (var Cargos = new EmpleadosEntities())
            {
                var ListCargos = this.Cargos.Cargos.ToList();

                ExcelPackage excel = new ExcelPackage();

                //agrega 1 hoja al libro y le da un nombre
                excel.Workbook.Worksheets.Add("Lista_Cargos");

                // crea la cabecera
                var headerRow = new System.Collections.Generic.List<string[]>() {
                   new string[] { "Código Cargo", "Cargos" }
                 };

                // Le da un Nombre a la Hoja
                var worksheet = excel.Workbook.Worksheets["Lista_Cargos"];

                // asigna el rango de despliegue de la cabecera
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
                foreach (var item in ListCargos)
                {
                    worksheet.Cells[string.Format("A{0}", rowStart)].Value = item.Id_Carg;
                    worksheet.Cells[string.Format("A{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("A{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Right;
                    worksheet.Cells[string.Format("A{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("B{0}", rowStart)].Value = item.Descr_Cargo;
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
                Response.AddHeader("content-disposition", "attachment;filename=\"ListaCargos.xlsx\"");
                Response.BinaryWrite(excel.GetAsByteArray());
                Response.End();
            }
        }

        #endregion Crea_Excel

        #region Crea_CSV

        public FileResult GetCsv()
        {
            using (var Deptos = new EmpleadosEntities())
            {
                var ListCargos = Cargos.Cargos.ToList();

                List<object> customers = (from customer in ListCargos
                                          select new[] {customer.Id_Carg.ToString(),
                                                        customer.Descr_Cargo}).ToList<object>();

                //Insert the Column Names.
                customers.Insert(0, new string[2] { "Código Cargo", "Nombre Cargo" });
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
                return File(Encoding.UTF8.GetBytes(sb.ToString()), "text/csv", "ListaCargos.csv");
            }
        }

        #endregion Crea_CSV

        #region Crea_DOC

        public ActionResult GetDocx()
        {
            using (var Cargos = new EmpleadosEntities())
            {
                var ListCargos = this.Cargos.Cargos.ToList();

                //Ubicacion de Archivo
                string filename = @"C:\Users\Rodrigo_Menares\Downloads\ListaCargos.docx";
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
                Xceed.Document.NET.Table tbl = doc.AddTable(ListCargos.Count + 1, 2);

                //hace que la tabla este al centro de la pagina
                tbl.Alignment = Alignment.center;
                tbl.Design = TableDesign.ColorfulList;

                //agrega los titulos de la tabla
                tbl.Rows[0].Cells[0].Paragraphs.First().Append("Código Cargo").FontSize(12D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[1].Paragraphs.First().Append("Nombre Cargo").FontSize(12D).Alignment = Alignment.center;

                //llena las celdas con los datos
                int fila = 1;
                int columna = 0;
                foreach (var item in ListCargos)
                {
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Id_Carg)).FontSize(12D).Alignment = Alignment.right;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Descr_Cargo)).FontSize(12D).Alignment = Alignment.center;
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

        #endregion Crea_DOC
    }
}
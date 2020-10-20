using System;
using System.IO;
using System.Linq;
using System.Text;
using OfficeOpenXml;
using System.Web.Mvc;
using Xceed.Words.NET;
using iTextSharp.text;
using CrudMvcSp.Models;
using Xceed.Document.NET;
using System.Diagnostics;
using iTextSharp.text.pdf;
using System.Collections.Generic;
using Paragraph = Xceed.Document.NET.Paragraph;

namespace CrudMvcSp.Controllers
{
    public class CargFamController : Controller
    {
        private string url;

        #region Carga_Las_Instamcias

        private EmpleadosEntities CargFam = new EmpleadosEntities();
        private EmpleadosEntities Empleados = new EmpleadosEntities();
        private EmpleadosEntities Comun = new EmpleadosEntities();
        private EmpleadosEntities Ciud = new EmpleadosEntities();
        private EmpleadosEntities Nacion = new EmpleadosEntities();
        private EmpleadosEntities Sexo = new EmpleadosEntities();

        #endregion Carga_Las_Instamcias

        // GET: CargFam

        #region Carg_CargFam

        public ActionResult Index()
        {
            using (CargFam = new EmpleadosEntities())
            {
                var ListCargFam = CargFam.Sp_Mues_CargFam().ToList();

                var ListCom = Comun.Sp_Mues_Comunas().ToList();
                ViewBag.ListComu = new SelectList(ListCom, "Comuna_Id", "Comuna");

                var LisSex = Sexo.Sexo.ToList();
                ViewBag.ListSexos = new SelectList(LisSex, "Id_Sexo", "Descripcion");

                var LisNac = Nacion.Nacionalidad.ToList();
                ViewBag.ListNacion = new SelectList(LisNac, "Id_Nac", "Descripcion");

                return View(ListCargFam);
            }
        }

        #endregion Carg_CargFam

        #region Busca_Empleados

        //busca el rut del empleado y verifica si este esta en la tabla de empleados
        public ActionResult BuscEmp(Empleados emplead)
        {
            int Verifica;
            using (Empleados = new EmpleadosEntities())
            {
                var BuscEmp = Empleados.Sp_Sel_Empleado(emplead.Rut_Empleado).ToList();
                if (BuscEmp.Count != 0)
                { Verifica = 1; }
                else
                { Verifica = 0; }
                return Json(Verifica);
            }
        }

        #endregion Busca_Empleados

        #region Busca_Ciudad

        //Toma El Valor de la Comuna y lo Verifica en la Base de Datos
        [HttpPost]
        public ActionResult CargCiu(int Comuna_Id)
        {
            var ListCiu = Ciud.Sp_Sel_CiudadesxComu(Comuna_Id).ToList();
            return Json(ListCiu);
        }

        #endregion Busca_Ciudad

        #region Graba_Carga_Familiar

        [HttpPost]
        public ActionResult GrabCargFam(Carg_Familiar Carg_Fam)
        {
            using (CargFam = new EmpleadosEntities())
            {
                var GrabCargFam = CargFam.Sp_Ins_Carg_Familiar(
                                    Carg_Fam.Rut_Benef, Carg_Fam.Nombre, Carg_Fam.ApPat,
                                    Carg_Fam.ApMat, Carg_Fam.Telefono1, Carg_Fam.Telefono2,
                                    Carg_Fam.Fecha_Nac, Carg_Fam.Cod_Sexo, Carg_Fam.Calle_Pje,
                                    Carg_Fam.Num_Casa, Carg_Fam.Villa_Pobl, Carg_Fam.Comuna_Id,
                                    Carg_Fam.Provincia_Id, Carg_Fam.email, Carg_Fam.Rut_Empleado,
                                    Carg_Fam.Id_Nac, Carg_Fam.Descripcion);
                return Json(GrabCargFam);
            }
        }

        #endregion Graba_Carga_Familiar

        #region Busca_CargaFamiliar

        public ActionResult BuscCargFam(Carg_Familiar BuscCargFam)
        {
            using (CargFam = new EmpleadosEntities())
            {
                var BucaEmpleado = CargFam.Sp_Sel_CargFamxRut(BuscCargFam.Rut_Benef).ToList();
                return Json(BucaEmpleado);
            }
        }

        #endregion Busca_CargaFamiliar

        #region Modifica_Carga_Fam

        [HttpPost]
        public ActionResult ModCargFam(Carg_Familiar CargFami)
        {
            using (CargFam = new EmpleadosEntities())
            {
                var ModCargFam = CargFam.Sp_UPD_Carg_Familiar(
                                CargFami.Rut_Benef, CargFami.Nombre, CargFami.ApPat,
                                CargFami.ApMat, CargFami.Telefono1, CargFami.Telefono2,
                                CargFami.Fecha_Nac, CargFami.Cod_Sexo, CargFami.Calle_Pje,
                                CargFami.Num_Casa, CargFami.Villa_Pobl, CargFami.Comuna_Id,
                                CargFami.Provincia_Id, CargFami.email,
                                CargFami.Id_Nac, CargFami.Descripcion);

                return Json(ModCargFam);
            }
        }

        #endregion Modifica_Carga_Fam

        #region Elimina_Carga_Familiar

        public ActionResult ElimCargFam(Carg_Familiar CargFami)
        {
            using (CargFam = new EmpleadosEntities())
            {
                var ElimCargFam = CargFam.Sp_Del_Carga_Familiar(CargFami.Rut_Benef);
                return Json(ElimCargFam);
            }
        }

        #endregion Elimina_Carga_Familiar

        //Exportaciones

        #region Crea_PDF

        public ActionResult CargFamPDF()
        {
            using (CargFam = new EmpleadosEntities())
            {
                var ListCargFam = CargFam.Sp_Mues_CargFam().ToList();

                MemoryStream ms = new MemoryStream();
                iTextSharp.text.Document document = new iTextSharp.text.Document();
                document.SetPageSize(PageSize.A4.Rotate());
                document.SetMargins(14.2f, 14.2f, 29f, 31f);

                PdfWriter pdf = PdfWriter.GetInstance(document, ms);

                //hace la insercion del pie de pagina
                pdf.PageEvent = new HeadFooter();

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
                iTextSharp.text.Font fontText2 = new iTextSharp.text.Font(bf, 10, 4, BaseColor.BLUE);

                //creacion e insercion de titulos al documento
                iTextSharp.text.Paragraph titulo = new iTextSharp.text.Paragraph(string.Format("Listado de Cargas Familiares"), fontText2);
                //titulo.SpacingBefore = 200;
                //titulo.SpacingAfter = 0;
                titulo.Alignment = 1; //0-Left, 1 middle,2 Right
                //inserta al documento
                document.Add(titulo);
                //inserta nueva linea al texto
                document.Add(Chunk.NEWLINE);

                //esto es para estilo de letra de la tabla
                BaseFont bf2 = BaseFont.CreateFont(BaseFont.TIMES_BOLD, BaseFont.CP1250, BaseFont.EMBEDDED);
                //tamaño y color
                iTextSharp.text.Font fontText = new iTextSharp.text.Font(bf2, 8, 0, BaseColor.BLACK);
                iTextSharp.text.Font fontText3 = new iTextSharp.text.Font(bf2, 8, 0, BaseColor.WHITE);

                // instancia la tabla y le indica la cantidad de columnas
                PdfPTable table = new PdfPTable(15);

                //indica q ancho de la hoja va a ocupar la tabla
                table.WidthPercentage = 95;

                // instancia para la generacion de celdas en la tabla
                PdfPCell _cell = new PdfPCell();

                //genera la cabecera de la tabla
                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Rut", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Nombre", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Ap. Paterno", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Ap. Materno", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Fono Movil", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Fono Fijo", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Fecha Nacimiento", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Sexo", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Dirección", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Villa", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Comuna", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Ciudad", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Correo", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Nombre Empleado", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Comentario", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                //llena la tabla y ademas le da la alineacion a los datos
                foreach (var item in ListCargFam)
                {
                    PdfPCell _cell2 = new PdfPCell();

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Rut_Carga, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Nombre, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Paterno, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Materno, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Fono_Movil, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Fono_Fijo, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Fecha_Nacimiento, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Sexo, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Direccion, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Villa, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Comuna, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Ciudad, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Email, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Nombre_Empleado, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Comentarios, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
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
                return File(ms, "application/pdf", "ListaCargFam.pdf");
            }
        }

        #endregion Crea_PDF

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

        public void CargFamXls()
        {
            using (CargFam = new EmpleadosEntities())
            {
                var ListCargFam = CargFam.Sp_Mues_CargFam().ToList();

                ExcelPackage excel = new ExcelPackage();
                //agrega 1 hoja al libro y le da un nombre
                excel.Workbook.Worksheets.Add("Lista_Cargas_familiares");
                // crea la cabecera
                var headerRow = new System.Collections.Generic.List<string[]>() {
                   new string[] { "Rut", "Nombre", "Ap. Paterno" , "Ap. Materno", "Fono Movil", "Fono Fijo",
                                  "Fech. Nacimiento", "Sexo", "Dirección", "Villa", "Comuna", "Ciudad", "Correo",
                                  "Nombre Empleado", "Comentarios"}
                 };
                // Le da un Nombre a la Hoja
                var worksheet = excel.Workbook.Worksheets["Lista_Cargas_familiares"];
                // asigna el rango de despliegue de la cabecera
                //string headerRange = "A1:" + Char.ConvertFromUtf32(headerRow[0].Length + 64) + "1";
                string headerRange = "A2:O2";

                // Agrega la Cabecera a la hoja de trabajo
                worksheet.Cells[headerRange].LoadFromArrays(headerRow);

                //le da estilo a la cabecera
                worksheet.Cells[headerRange].Style.Font.Bold = true;
                worksheet.Cells[headerRange].Style.Font.Size = 15;
                worksheet.Cells[headerRange].Style.Font.Color.SetColor(System.Drawing.Color.Black);
                worksheet.Cells[headerRange].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                int rowStart = 3; //  fila (de inicio) en la que se empiezan a dejar los datos
                // carga los datos a las filas y les da format
                foreach (var item in ListCargFam)
                {
                    worksheet.Cells[string.Format("A{0}", rowStart)].Value = item.Rut_Carga;
                    worksheet.Cells[string.Format("A{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("A{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("A{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("B{0}", rowStart)].Value = item.Nombre;
                    worksheet.Cells[string.Format("B{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("B{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("B{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("C{0}", rowStart)].Value = item.Paterno;
                    worksheet.Cells[string.Format("C{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("C{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("C{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("D{0}", rowStart)].Value = item.Materno;
                    worksheet.Cells[string.Format("D{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("D{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("D{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("E{0}", rowStart)].Value = item.Fono_Movil;
                    worksheet.Cells[string.Format("E{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("E{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("E{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("F{0}", rowStart)].Value = item.Fono_Fijo;
                    worksheet.Cells[string.Format("F{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("F{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("F{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("G{0}", rowStart)].Value = item.Fecha_Nacimiento;
                    worksheet.Cells[string.Format("G{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("G{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("G{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("H{0}", rowStart)].Value = item.Sexo;
                    worksheet.Cells[string.Format("H{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("H{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("H{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("I{0}", rowStart)].Value = item.Direccion;
                    worksheet.Cells[string.Format("I{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("I{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("I{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("J{0}", rowStart)].Value = item.Villa;
                    worksheet.Cells[string.Format("J{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("J{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("J{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("K{0}", rowStart)].Value = item.Comuna;
                    worksheet.Cells[string.Format("K{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("K{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("K{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("L{0}", rowStart)].Value = item.Ciudad;
                    worksheet.Cells[string.Format("L{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("L{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("L{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("M{0}", rowStart)].Value = item.Email;
                    worksheet.Cells[string.Format("M{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("M{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("M{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("N{0}", rowStart)].Value = item.Nombre_Empleado;
                    worksheet.Cells[string.Format("N{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("N{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("N{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("O{0}", rowStart)].Value = item.Comentarios;
                    worksheet.Cells[string.Format("O{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("O{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("O{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    rowStart++;
                }
                // Auto Ajusta el tamaño de Las Columnas
                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();

                // Graba la planilla
                Response.Clear();
                Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                Response.AddHeader("content-disposition", "attachment;filename=\"ListaCargFam.xlsx\"");
                Response.BinaryWrite(excel.GetAsByteArray());
                Response.End();
            }
        }

        #endregion Crea_Excel

        #region Crea_CSV

        public FileResult CargFamCsv()
        {
            using (CargFam = new EmpleadosEntities())
            {
                var ListCargFam = CargFam.Sp_Mues_CargFam().ToList();
                List<object> customers = (from customer in ListCargFam
                                          select new[] {
                        customer.Rut_Carga,   customer.Nombre,    customer.Paterno,     customer.Materno,
                        customer.Fono_Movil,  customer.Fono_Fijo, customer.Fecha_Nacimiento, customer.Sexo,
                        customer.Direccion,   customer.Villa,     customer.Comuna,   customer.Ciudad,
                        customer.Email, customer.Nombre_Empleado, customer.Comentarios }).ToList<object>();
                //Insert the Column Names.
                customers.Insert(0, new string[15] { "Rut", "Nombre", "Ap. Paterno" , "Ap. Materno", "Fono Movil", "Fono Fijo",
                                                     "Fech. Nacimiento", "Sexo", "Dirección", "Villa", "Comuna", "Ciudad",
                                                     "Correo", "Nombre Empleado", "Comentarios"  });
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
                return File(Encoding.UTF8.GetBytes(sb.ToString()), "text/csv", "ListaEmpleados.csv");
            }
        }

        #endregion Crea_CSV

        #region Crea_DOC

        public ActionResult CargFamDocx()
        {
            using (CargFam = new EmpleadosEntities())
            {
                var ListCargFam = CargFam.Sp_Mues_CargFam().ToList();

                //Ubicacion de Archivo
                string filename = @"C:\Users\Rodrigo_Menares\Downloads\ListaCargFam.docx";
                var doc = DocX.Create(filename);

                //cambia la orientacion de la pagina
                doc.PageLayout.Orientation = Orientation.Landscape;

                //Carga una imagen en formato JPG
                var image = doc.AddImage(Server.MapPath("/Imagenes/bg.jpg"));
                // Set Picture Height and Width.
                var picture = image.CreatePicture(50, 50);
                picture.Width = 50;
                picture.Height = 50;

                //Titulo Del Documento
                string title = "Lista De Cargas Familiares";
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

                //define las dimensiones de la tabla (tbl(f,c))
                Table tbl = doc.AddTable(ListCargFam.Count + 1, 11);

                //hace que la tabla este al centro de la pagina
                tbl.Alignment = Alignment.center;
                tbl.Design = TableDesign.ColorfulList;
                tbl.AutoFit = AutoFit.Contents;

                //agrega los titulos de la tabla
                tbl.Rows[0].Cells[0].Paragraphs.First().Append("Rut").FontSize(8D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[1].Paragraphs.First().Append("Nombre").FontSize(8D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[2].Paragraphs.First().Append("Ap. Paterno").FontSize(8D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[3].Paragraphs.First().Append("Fono Movil").FontSize(8D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[4].Paragraphs.First().Append("Fecha Nacimiento").FontSize(8D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[5].Paragraphs.First().Append("Sexo").FontSize(8D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[6].Paragraphs.First().Append("Dirección").FontSize(8D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[7].Paragraphs.First().Append("Comuna").FontSize(8D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[8].Paragraphs.First().Append("Correo").FontSize(8D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[9].Paragraphs.First().Append("Nombre Empleado").FontSize(8D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[10].Paragraphs.First().Append("Comentarios").FontSize(8D).Alignment = Alignment.center;
                //llena las celdas con los datos
                int fila = 1;
                int columna = 0;
                foreach (var item in ListCargFam)
                {
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Rut_Carga)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Nombre)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Paterno)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Fono_Movil)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Fecha_Nacimiento)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Sexo)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Direccion)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Comuna)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Email)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Nombre_Empleado)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Comentarios)).FontSize(8D).Alignment = Alignment.left;
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
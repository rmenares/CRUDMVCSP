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
using Table = Xceed.Document.NET.Table;

namespace CrudMvcSp.Controllers
{
    public class EmpleadosController : Controller
    {
        string url;
        EmpleadosEntities Empleados = new EmpleadosEntities();

        #region LLena los DropdownList
        EmpleadosEntities Cargos = new EmpleadosEntities();
        EmpleadosEntities Deptos = new EmpleadosEntities();
        EmpleadosEntities ManEmp = new EmpleadosEntities();
        EmpleadosEntities Comun = new EmpleadosEntities();
        EmpleadosEntities Ciud = new EmpleadosEntities();
        EmpleadosEntities Nacion = new EmpleadosEntities();
        EmpleadosEntities Sexo = new EmpleadosEntities();
        EmpleadosEntities ManAfp = new EmpleadosEntities();
        EmpleadosEntities ManSalud = new EmpleadosEntities();
        #endregion

        // GET: Empleados
        #region Carga_Empleados
        public ActionResult Index()
        {
            using (Empleados = new EmpleadosEntities())
            {
                var ListEmpleados = Empleados.SP_Mues_Empleado().ToList();

                var LisDep = Deptos.Departamento.ToList();
                ViewBag.ListDeptos = new SelectList(LisDep, "Id_Depto", "NomDepto");

                var LisCarg = Cargos.Cargos.ToList();
                ViewBag.ListCargos = new SelectList(LisCarg, "Id_Carg", "Descr_Cargo");

                var ListEmp = ManEmp.Sp_Mues_Empresas().ToList();
                ViewBag.ListaEmpr = new SelectList(ListEmp, "Rut_Empresa", "Nombre_Empresa");

                var ListAfp = ManAfp.Sp_Mues_Afp().ToList();
                ViewBag.ListAfps = new SelectList(ListAfp, "Cod_Afp", "Nom_Afp", "Porc_Desc");

                var LisSal = ManSalud.Sp_Mues_Salud().ToList();
                ViewBag.ListSalud = new SelectList(LisSal, "Cod_Salud", "Nombre_Salud", "Porc_Cotiz");

                var LisSex = Sexo.Sexo.ToList();
                ViewBag.ListSexos = new SelectList(LisSex, "Id_Sexo", "Descripcion");

                var LisNac = Nacion.Nacionalidad.ToList();
                ViewBag.ListNacion = new SelectList(LisNac, "Id_Nac", "Descripcion");

                var ListCom = Comun.Sp_Mues_Comunas().ToList();
                ViewBag.ListComu = new SelectList(ListCom, "Comuna_Id", "Comuna");

                return View(ListEmpleados);               
            }
        }
        #endregion
        
        #region Busca_Ciudad
        //Toma El Valor de la Comuna y lo Verifica en la Base de Datos
        [HttpPost]
        public ActionResult CargCiu(int Comuna_Id)
        {
                var ListCiu = Ciud.Sp_Sel_CiudadesxComu(Comuna_Id).ToList();
                return Json(ListCiu);
        }
        #endregion

        #region Graba_Empleados
        [HttpPost]
        public ActionResult GrabEmpl(Empleados emplead)
        { 
            using (Empleados = new EmpleadosEntities())
            {
                var GrabEmple = Empleados.Sp_Ins_Empleados(
                     emplead.Rut_Empleado,        emplead.Nombre,        emplead.ApePat,   emplead.ApeMat,
                     emplead.Id_Depto,            emplead.Id_Carg,       emplead.Anexo,    emplead.EmailEmp,
                     emplead.Fecha_Incorporacion, emplead.Rut_Empresa,   emplead.Id_Sexo,  emplead.Id_Nac, 
                     emplead.Foto_Usuario,        emplead.Fecha_Despido, emplead.Retirado, emplead.Cod_Afp,
                     emplead.Cod_Salud,           emplead.Calle_Pje,     emplead.NumCasa,  emplead.Vill_Pobl,
                     emplead.Comuna_Id,           emplead.Provincia_Id,  emplead.Fono,     emplead.Persona_Emergencia,
                     emplead.Fono_Emergencia,     emplead.Email,         emplead.Fecha_Nacimiento);
                return Json(GrabEmple);
            }
        }
        #endregion

        #region Busca_Empleados
        public ActionResult BuscEmp(Empleados emplead)
        {
            using (Empleados = new EmpleadosEntities())
            {
                var BuscEmp = Empleados.Sp_Sel_Empleado(emplead.Rut_Empleado).ToList();
                return Json(BuscEmp);
            }
        }
        #endregion

        #region Modifica_Empleados
        [HttpPost]
        public ActionResult ModEmpl(Empleados empleados)
        {
            using (Empleados = new EmpleadosEntities())
            {
                var ModEmple = Empleados.Sp_UPD_Empleado(
                     empleados.Rut_Empleado,        empleados.Nombre,             empleados.ApePat,    empleados.ApeMat,
                     empleados.Id_Depto,            empleados.Id_Carg,            empleados.Anexo,     empleados.EmailEmp,
                     empleados.Fecha_Incorporacion, empleados.Rut_Empresa,        empleados.Id_Sexo,   empleados.Id_Nac,
                     empleados.Foto_Usuario,        empleados.Cod_Afp,            empleados.Cod_Salud, empleados.Calle_Pje,
                     empleados.NumCasa,             empleados.Vill_Pobl,          empleados.Comuna_Id, empleados.Provincia_Id,
                     empleados.Fono,                empleados.Persona_Emergencia, empleados.Fono_Emergencia,
                     empleados.Email,               empleados.Fecha_Nacimiento);
                return Json(ModEmple);
            }
        }
        #endregion

        #region Elimina_Empleado
        public ActionResult EliminaEmpleado(Empleados empleados)
        {
            using (Empleados = new EmpleadosEntities())
            {
                var ElimEmpleado = Empleados.Sp_Del_Empleados(empleados.Rut_Empleado);
                return Json(ElimEmpleado);
            }
        }
        #endregion

        //Exportaciones

        #region Ficha_Empleado
        public ActionResult FichEmp(Empleados empleados)
        {
            using (Empleados = new EmpleadosEntities())
            {
                var FichEmpleado = Empleados.SP_Mues_Empleado_PDF(empleados.Rut_Empleado).ToList();

                //Ubicacion de Archivo
                string filename = @"C:\Users\Rodrigo_Menares\Downloads\Ficha_"+ FichEmpleado[0].Nombre +"_"+ FichEmpleado[0].Apellido+".docx";
                var doc = DocX.Create(filename);

                //cambia la orientacion de la pagina
                doc.PageLayout.Orientation = Orientation.Landscape;

                //Carga una imagen en formato JPG
                var image = doc.AddImage(Server.MapPath("/Imagenes/bg.jpg"));
                // Set Picture Height and Width.
                var picture = image.CreatePicture(50, 50);
                picture.Width = 50;
                picture.Height = 50;

                // Insert Picture in paragraph.
                var p = doc.InsertParagraph("");
                //alinea la imagen a la esquina superior izquierda del documento
                p.Alignment = Alignment.left;
                p.AppendPicture(picture);

                //Titulo Del Documento
                string title = "Ficha De Empleado";
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
                Paragraph paragraphTitle = doc.InsertParagraph(title, false, titleFormat);

                // alinea el titulo al centro
                paragraphTitle.Alignment = Alignment.center;

                //define las dimensiones de la tabla (tbl(f,c))
                Table tbl = doc.AddTable(FichEmpleado.Count + 1, 14);
    
                //hace que la tabla este al centro de la pagina           
                tbl.Design = TableDesign.ColorfulList;
                tbl.AutoFit = AutoFit.Contents;
                
                //agrega los titulos de la tabla
                tbl.Rows[0].Cells[0].Paragraphs.First().Append("Rut").FontSize(10D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[1].Paragraphs.First().Append("Nombre").FontSize(10D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[2].Paragraphs.First().Append("Apellido").FontSize(10D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[3].Paragraphs.First().Append("Departamento").FontSize(10D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[4].Paragraphs.First().Append("Cargo").FontSize(10D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[5].Paragraphs.First().Append("Dirección").FontSize(10D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[6].Paragraphs.First().Append("Comuna").FontSize(10D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[7].Paragraphs.First().Append("Ciudad").FontSize(10D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[8].Paragraphs.First().Append("Fono").FontSize(10D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[9].Paragraphs.First().Append("Correo").FontSize(10D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[10].Paragraphs.First().Append("Nacionalidad").FontSize(10D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[11].Paragraphs.First().Append("Sexo").FontSize(10D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[12].Paragraphs.First().Append("Afp").FontSize(10D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[13].Paragraphs.First().Append("Salud").FontSize(10D).Alignment = Alignment.center;
                //llena las celdas con los datos 
                int fila = 1;
                int columna = 0;
                foreach (var item in FichEmpleado)
                {
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Rut)).FontSize(8D).Alignment = Alignment.center;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Nombre)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Apellido)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Departamento)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Cargo)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Direccion)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Comuna)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Ciudad)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Fono)).FontSize(8D).Alignment = Alignment.center;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Correo)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Nacionalidad)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Sexo)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Nombre_AFP)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.SALUD)).FontSize(8D).Alignment = Alignment.left;
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
            }
            return RedirectToAction("Index");
        }
        #endregion
        
        #region Crea_PDF
        public ActionResult ListEmpleados()
        {
            using (Empleados = new EmpleadosEntities())
            {
                var ListEmpl = Empleados.SP_Mues_Empleado().ToList();
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
                iTextSharp.text.Font fontText2 = new iTextSharp.text.Font(bf, 12, 4, BaseColor.BLUE);

                //creacion e insercion de titulos al documento
                iTextSharp.text.Paragraph titulo = new iTextSharp.text.Paragraph(string.Format("Listado de Empleados"), fontText2);
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
                PdfPTable table = new PdfPTable(13);

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

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Apellido", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Departamento", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Cargo", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Direccion", fontText3));
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

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Fono", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Correo", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Nacionalidad", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Nombre_AFP", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("SALUD", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                //llena la tabla y ademas le da la alineacion a los datos
                foreach (var item in ListEmpl)
                {
                    PdfPCell _cell2 = new PdfPCell();

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Rut.ToString(), fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Nombre, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Apellido.ToString(), fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Departamento, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Cargo.ToString(), fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Direccion, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Comuna.ToString(), fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Ciudad, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Fono.ToString(), fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Correo, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Nacionalidad.ToString(), fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.Nombre_AFP.ToString(), fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(item.SALUD, fontText));
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
                return File(ms, "application/pdf", "ListaEmpleados.pdf");
            }
        }
        #endregion


        #region Ficha_Empleado_PDF
        public ActionResult FichaEmplPdf(Empleados empleados)
        {
            using (Empleados = new EmpleadosEntities())
            {
                var FichEmpleado = Empleados.SP_Mues_Empleado_PDF(empleados.Rut_Empleado).ToList();

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
                iTextSharp.text.Font fontText2 = new iTextSharp.text.Font(bf, 12, 4, BaseColor.BLUE);

                //creacion e insercion de titulos al documento
                iTextSharp.text.Paragraph titulo = new iTextSharp.text.Paragraph(string.Format("Ficha de Empleado"), fontText2);
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
                PdfPTable table = new PdfPTable(13);

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

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Apellido", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Departamento", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Cargo", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Direccion", fontText3));
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

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Fono", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Correo", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Nacionalidad", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("Nombre_AFP", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                _cell = new PdfPCell(new iTextSharp.text.Paragraph("SALUD", fontText3));
                _cell.BackgroundColor = iTextSharp.text.BaseColor.DARK_GRAY;
                _cell.HorizontalAlignment = Element.ALIGN_CENTER;
                table.AddCell(_cell);

                foreach (var FichEmp in FichEmpleado)
                {
                    PdfPCell _cell2 = new PdfPCell();

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(FichEmp.Rut.ToString(), fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(FichEmp.Nombre, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(FichEmp.Apellido.ToString(), fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(FichEmp.Departamento, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(FichEmp.Cargo.ToString(), fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(FichEmp.Direccion, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(FichEmp.Comuna.ToString(), fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(FichEmp.Ciudad, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(FichEmp.Fono.ToString(), fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_CENTER;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(FichEmp.Correo, fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(FichEmp.Nacionalidad.ToString(), fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(FichEmp.Nombre_AFP.ToString(), fontText));
                    _cell2.HorizontalAlignment = Element.ALIGN_LEFT;
                    table.AddCell(_cell2);

                    _cell2 = new PdfPCell(new iTextSharp.text.Paragraph(FichEmp.SALUD, fontText));
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
                return File(ms, "application/pdf", "ListaEmpleados.pdf");
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
            using (Empleados = new EmpleadosEntities())
            {
                var ListEmpl = Empleados.SP_Mues_Empleado().ToList();
                ExcelPackage excel = new ExcelPackage();
                //agrega 1 hoja al libro y le da un nombre
                excel.Workbook.Worksheets.Add("Lista_Empleados");
                // crea la cabecera
                var headerRow = new System.Collections.Generic.List<string[]>() {
                   new string[] {"Rut", "Nombre", "Apellido" , "Departamento" , "Cargo" , "Direccion",
                    "Comuna", "Ciudad", "Fono", "Correo", "Nacionalidad", "Sexo", "Nombre_AFP", "SALUD" }
                 };

                // Le da un Nombre a la Hoja
                var worksheet = excel.Workbook.Worksheets["Lista_Empleados"];
                // asigna el rango de despliegue de la cabecera
                //string headerRange = "A1:" + Char.ConvertFromUtf32(headerRow[0].Length + 64) + "1";
                string headerRange = "A2:N2";

                // Agrega la Cabecera a la hoja de trabajo
                worksheet.Cells[headerRange].LoadFromArrays(headerRow);

                //le da estilo a la cabecera
                worksheet.Cells[headerRange].Style.Font.Bold = true;
                worksheet.Cells[headerRange].Style.Font.Size = 14;
                worksheet.Cells[headerRange].Style.Font.Color.SetColor(System.Drawing.Color.Black);
                worksheet.Cells[headerRange].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;

                int rowStart = 3; //  fila (de inicio) en la que se empiezan a dejar los datos
                // carga los datos a las filas y les da format
                foreach (var item in ListEmpl)
                {
                    worksheet.Cells[string.Format("A{0}", rowStart)].Value = item.Rut;
                    worksheet.Cells[string.Format("A{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("A{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("A{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("B{0}", rowStart)].Value = item.Nombre;
                    worksheet.Cells[string.Format("B{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("B{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("B{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("C{0}", rowStart)].Value = item.Apellido;
                    worksheet.Cells[string.Format("C{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("C{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("C{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("D{0}", rowStart)].Value = item.Departamento;
                    worksheet.Cells[string.Format("D{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("D{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("D{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("E{0}", rowStart)].Value = item.Cargo;
                    worksheet.Cells[string.Format("E{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("E{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("E{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("F{0}", rowStart)].Value = item.Direccion;
                    worksheet.Cells[string.Format("F{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("F{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("F{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("G{0}", rowStart)].Value = item.Comuna;
                    worksheet.Cells[string.Format("G{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("G{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("G{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("H{0}", rowStart)].Value = item.Ciudad;
                    worksheet.Cells[string.Format("H{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("H{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("H{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("I{0}", rowStart)].Value = item.Fono;
                    worksheet.Cells[string.Format("I{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("I{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("I{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("J{0}", rowStart)].Value = item.Correo;
                    worksheet.Cells[string.Format("J{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("J{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("J{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("K{0}", rowStart)].Value = item.Nacionalidad;
                    worksheet.Cells[string.Format("K{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("K{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("K{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("L{0}", rowStart)].Value = item.Sexo;
                    worksheet.Cells[string.Format("L{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("L{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("L{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("M{0}", rowStart)].Value = item.Nombre_AFP;
                    worksheet.Cells[string.Format("M{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("M{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("M{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    worksheet.Cells[string.Format("N{0}", rowStart)].Value = item.SALUD;
                    worksheet.Cells[string.Format("N{0}", rowStart)].Style.Font.Size = 12;
                    worksheet.Cells[string.Format("N{0}", rowStart)].Style.HorizontalAlignment = OfficeOpenXml.Style.ExcelHorizontalAlignment.Center;
                    worksheet.Cells[string.Format("N{0}", rowStart)].Style.Font.Color.SetColor(System.Drawing.Color.Blue);

                    rowStart++;
                }
                // Auto Ajusta el tamaño de Las Columnas
                worksheet.Cells[worksheet.Dimension.Address].AutoFitColumns();

                // Graba la planilla
                Response.Clear();
                Response.ContentType = "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet";
                Response.AddHeader("content-disposition", "attachment;filename=\"ListaEmpleados.xlsx\"");
                Response.BinaryWrite(excel.GetAsByteArray());
                Response.End();
            }
        }
        #endregion

        #region Crea_CSV
        public FileResult GetCsv()
        {
            using (Empleados = new EmpleadosEntities())
            {
                var ListEmpl = Empleados.SP_Mues_Empleado().ToList();

                List<object> customers = (from customer in ListEmpl
                    select new[] {                                              
                        customer.Rut,   customer.Nombre,    customer.Apellido,     customer.Departamento,
                        customer.Cargo, customer.Direccion, customer.Comuna,       customer.Ciudad,
                        customer.Fono,  customer.Correo,    customer.Nacionalidad, customer.Sexo,
                        customer.Nombre_AFP, customer.SALUD }).ToList<object>();

                //Insert the Column Names.
                customers.Insert(0, new string[14] {"Rut", "Nombre", "Apellido", "Departamento", "Cargo",
                                                    "Dirección", "Comuna", "Ciudad", "Fono", "Correo",
                                                    "Nacionalidad", "Sexo", "Afp", "Salud" });
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
        #endregion

        #region Crea_DOC
        public ActionResult GetDocx()
        {
            using (Empleados = new EmpleadosEntities())
            {
                var ListEmpl = Empleados.SP_Mues_Empleado().ToList();

                //Ubicacion de Archivo
                string filename = @"C:\Users\Rodrigo_Menares\Downloads\ListaEmpleados.docx";
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
                string title = "Lista De Empleados";
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
                Table tbl = doc.AddTable(ListEmpl.Count + 1, 14);

                //hace que la tabla este al centro de la pagina
                tbl.Alignment = Alignment.center;
                tbl.Design = TableDesign.ColorfulList;
                tbl.AutoFit = AutoFit.Contents;

                //agrega los titulos de la tabla
                tbl.Rows[0].Cells[0].Paragraphs.First().Append("Rut").FontSize(8D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[1].Paragraphs.First().Append("Nombre").FontSize(8D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[2].Paragraphs.First().Append("Apellido").FontSize(8D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[3].Paragraphs.First().Append("Departamento").FontSize(8D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[4].Paragraphs.First().Append("Cargo").FontSize(8D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[5].Paragraphs.First().Append("Dirección").FontSize(8D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[6].Paragraphs.First().Append("Comuna").FontSize(8D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[7].Paragraphs.First().Append("Ciudad").FontSize(8D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[8].Paragraphs.First().Append("Fono").FontSize(8D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[9].Paragraphs.First().Append("Correo").FontSize(8D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[10].Paragraphs.First().Append("Nacionalidad").FontSize(8D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[11].Paragraphs.First().Append("Sexo").FontSize(8D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[12].Paragraphs.First().Append("Afp").FontSize(8D).Alignment = Alignment.center;
                tbl.Rows[0].Cells[13].Paragraphs.First().Append("Salud").FontSize(8D).Alignment = Alignment.center;
                //llena las celdas con los datos 
                int fila = 1;
                int columna = 0;
                foreach (var item in ListEmpl)
                {
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Rut)).FontSize(8D).Alignment = Alignment.center;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Nombre)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Apellido)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Departamento)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Cargo)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Direccion)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Comuna)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Ciudad)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Fono)).FontSize(8D).Alignment = Alignment.center;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Correo)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Nacionalidad)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Sexo)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.Nombre_AFP)).FontSize(8D).Alignment = Alignment.left;
                    columna++;
                    tbl.Rows[fila].Cells[columna].Paragraphs.First().Append(Convert.ToString(item.SALUD)).FontSize(8D).Alignment = Alignment.left;
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

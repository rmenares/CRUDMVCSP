//------------------------------------------------------------------------------
// <auto-generated>
//     Este código se generó a partir de una plantilla.
//
//     Los cambios manuales en este archivo pueden causar un comportamiento inesperado de la aplicación.
//     Los cambios manuales en este archivo se sobrescribirán si se regenera el código.
// </auto-generated>
//------------------------------------------------------------------------------

namespace CrudMvcSp.Models
{
    using System;
    using System.Collections.Generic;
    using System.ComponentModel.DataAnnotations;

    public partial class Cargas_Familiares
    {

        [Key]
        public int Id_Tram_Carg { get; set; }

        [Display(Name = "Codigo_Tramo")]
        public string Tramo { get; set; }

        [Display(Name = "Valor Inicial")]
        public string Desde { get; set; }

        [Display(Name = "Linite Superior")]
        public string Hasta { get; set; }

        [Display(Name = "Valor A Pagar")]
        public string ValorPagarCarg { get; set; }
    }
}

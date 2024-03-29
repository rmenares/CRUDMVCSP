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

    public partial class Carg_Familiar
    {
        [Key]
        [Display(Name = "Rut_Carga")]
        [Required(ErrorMessage = "Dato Obligatorio")]
        public string Rut_Benef { get; set; }

        [Display(Name = "Nombre_Carga")]
        [Required(ErrorMessage = "Dato Obligatorio")]
        public string Nombre { get; set; }

        [Display(Name = "Apellido Paterno")]
        [Required(ErrorMessage = "Dato Obligatorio")]
        public string ApPat { get; set; }

        [Display(Name = "Apellido Materno")]
        public string ApMat { get; set; }

        [Required(ErrorMessage = "Dato Obligatorio")]
        public string Telefono1 { get; set; }

        [Required(ErrorMessage = "Dato Obligatorio")]
        public string Telefono2 { get; set; }

        [Required(ErrorMessage = "Dato Obligatorio")]
        public Nullable<System.DateTime> Fecha_Nac { get; set; }

        [Required(ErrorMessage = "Dato Obligatorio")]
        public Nullable<int> Cod_Sexo { get; set; }

        [Required(ErrorMessage = "Dato Obligatorio")]
        public string Calle_Pje { get; set; }

        [Required(ErrorMessage = "Dato Obligatorio")]
        public string Num_Casa { get; set; }

        [Required(ErrorMessage = "Dato Obligatorio")]
        public string Villa_Pobl { get; set; }

        [Required(ErrorMessage = "Dato Obligatorio")]
        public Nullable<int> Comuna_Id { get; set; }

        [Required(ErrorMessage = "Dato Obligatorio")]
        public Nullable<int> Provincia_Id { get; set; }

        [Required(ErrorMessage = "Dato Obligatorio")]
        public string email { get; set; }

        [Required(ErrorMessage = "Dato Obligatorio")]
        public string Rut_Empleado { get; set; }

        [Required(ErrorMessage = "Dato Obligatorio")]
        public Nullable<int> Id_Nac { get; set; }

        [Required(ErrorMessage = "Dato Obligatorio")]
        public string Descripcion { get; set; }
        
        public virtual Comuna Comuna { get; set; }
        public virtual Empleados Empleados { get; set; }
        public virtual Nacionalidad Nacionalidad { get; set; }
        public virtual Sexo Sexo { get; set; }
    }
}

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
    
    public partial class Empresa
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Empresa()
        {
            this.Empleados = new HashSet<Empleados>();
        }
    
        public int Id_Empresa { get; set; }
        public string Rut_Empresa { get; set; }
        public string Nombre_Empresa { get; set; }
        public string Calle_Pje_Avda { get; set; }
        public string Numero { get; set; }
        public string Vill_Pobl { get; set; }
        public int Comuna_Id { get; set; }
        public int Provincia_Id { get; set; }
        public string fono { get; set; }
        public string emailemp { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Empleados> Empleados { get; set; }
    }
}

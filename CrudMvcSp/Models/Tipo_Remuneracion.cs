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
    
    public partial class Tipo_Remuneracion
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Tipo_Remuneracion()
        {
            this.Liquidacion_Sueldo = new HashSet<Liquidacion_Sueldo>();
        }
    
        public int Id_Tipo { get; set; }
        public string Descr_Tipo { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Liquidacion_Sueldo> Liquidacion_Sueldo { get; set; }
    }
}

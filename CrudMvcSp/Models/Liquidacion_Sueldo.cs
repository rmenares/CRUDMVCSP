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
    
    public partial class Liquidacion_Sueldo
    {
        public int Id_Liq { get; set; }
        public string Rut_Empleado { get; set; }
        public int Id_Tipo_Renumeracion { get; set; }
        public System.DateTime Fecha_Liquidacion { get; set; }
        public string Sueldo_Base { get; set; }
        public string Dias_Trabajados { get; set; }
        public string PorcComision { get; set; }
        public string Valor_Com { get; set; }
        public string Cant_Horas_Extras { get; set; }
        public string Total_Horas_Extras { get; set; }
        public string Bonos { get; set; }
        public string Gratificacion { get; set; }
        public string TotalImponible { get; set; }
        public string Colacion { get; set; }
        public string Movilizacion { get; set; }
        public string Viaticos { get; set; }
        public string TotalHaberes { get; set; }
        public int CodAfp { get; set; }
        public string Valor_Afp { get; set; }
        public int Cod_Salud { get; set; }
        public string Valor_Salud { get; set; }
        public int Id_Seg_Cesantia { get; set; }
        public string Valor_Seg_Cesantia { get; set; }
        public string TotalDescSegSocial { get; set; }
        public string Valor_Impuesto { get; set; }
        public string RebaImpto { get; set; }
        public string ImpAPagar { get; set; }
        public string RemNeta { get; set; }
        public string Prestamos { get; set; }
        public string TotalDesctos { get; set; }
        public string Otrs_Descuentos { get; set; }
        public string Anticipos { get; set; }
        public string Total_Pagar { get; set; }
    
        public virtual Tipo_Remuneracion Tipo_Remuneracion { get; set; }
    }
}

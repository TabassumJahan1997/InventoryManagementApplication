using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryDatabaseModel.Models
{
    public class Order
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int OrderID { get; set; }


        [Required]
        [Column(TypeName = "date")]
        [Display(Name = "Order Date")]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime OrderDate { get; set; }


        [Column(TypeName = "date")]
        [Display(Name = "Delivery Date")]
        [DisplayFormat(DataFormatString = "{0:yyyy-MM-dd}", ApplyFormatInEditMode = true)]
        public DateTime? DeliveryDate { get; set; }


        [Required]
        [EnumDataType(typeof(Status))]
        public Status Status { get; set; }


        [Required]
        [ForeignKey("Customer")]
        public int CustomerID { get; set; }


        public Customer? Customer { get; set; } = default!;


        public virtual ICollection<OrderItem> OrderItems { get; set; } = new List<OrderItem>();
    }
}

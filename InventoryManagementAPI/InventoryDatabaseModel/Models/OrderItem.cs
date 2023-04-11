using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryDatabaseModel.Models
{
    public class OrderItem
    {
        [ForeignKey("Order")]
        public int OrderID { get; set; }


        [ForeignKey("Product")]
        public int ProductID { get; set; }


        [Required]
        public int Quantity { get; set; }


        public virtual Order? Order { get; set; }

        public virtual Product? Product { get; set; }
    }
}

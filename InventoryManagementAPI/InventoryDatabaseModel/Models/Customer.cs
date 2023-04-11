using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryDatabaseModel.Models
{
    public class Customer
    {
        [Key]
        [DatabaseGenerated(DatabaseGeneratedOption.Identity)]
        public int CustomerID { get; set; }


        [Required]
        [StringLength(50)]
        [Display(Name = "Customer Name")]
        public string CustomerName { get; set; } = default!;


        [Required]
        [StringLength(200)]
        public string Address { get; set; } = default!;


        [Required]
        [StringLength(50)]
        public string Email { get; set; } = default!;


        public virtual ICollection<Order> Orders { get; set; } = new List<Order>();
    }
}

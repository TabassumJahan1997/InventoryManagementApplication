using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryDatabaseModel.ViewModels
{
    public class CustomerViewModel
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

        public bool CanDelete { get; set; }
    }
}

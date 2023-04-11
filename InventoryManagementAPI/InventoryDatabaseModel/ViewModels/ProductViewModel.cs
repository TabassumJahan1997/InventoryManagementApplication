using InventoryDatabaseModel.Models;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations.Schema;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryDatabaseModel.ViewModels
{
    public class ProductViewModel
    {
        public int ProductID { get; set; }


        [Required]
        [StringLength(50)]
        [Display(Name = "Product Name")]
        public string ProductName { get; set; } = default!;


        [Required]
        [Column(TypeName = "money")]
        [DisplayFormat(DataFormatString = "{0:0.00}")]
        public decimal Price { get; set; }


        [StringLength(250)]
        public string? Picture { get; set; } = default!;


        [Column(TypeName = "bit")]
        public bool IsAvailable { get; set; }


        public bool CanDelete { get; set; }

    }
}

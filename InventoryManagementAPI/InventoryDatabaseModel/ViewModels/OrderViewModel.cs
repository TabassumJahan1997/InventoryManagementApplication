using InventoryDatabaseModel.Models;
using Microsoft.AspNetCore.Routing.Constraints;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Security.Principal;
using System.Text;
using System.Threading.Tasks;

namespace InventoryDatabaseModel.ViewModels
{
    public class OrderViewModel
    {
        public int OrderID { get; set; }
        public DateTime OrderDate { get; set; }
        public DateTime? DeliveryDate { get; set; }
        public Status Status { get; set; }
        public int CustomerID { get; set; }
        public string CustomerName { get; set; } = default!;
        public decimal OrderPrice { get; set; }
    }
}

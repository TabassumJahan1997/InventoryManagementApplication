using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryDatabaseModel.Models
{
    public class User
    {
        public int Id { get; set; }
        public string? FirstName { get; set; } = default!;
        public string? LastName { get; set; } = default!;
        public string? UserName { get; set; } = default!;
        public string? Password { get; set; } = default!;
        public string? Token { get; set; } = default!;
        public string? Role { get; set; } = default!;
        public string? Email { get; set; } = default!;
    }
}

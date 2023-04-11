using InventoryDatabaseModel.Models;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace InventoryDatabaseModel.Context
{
    public class InventoryDbContext:DbContext
    {
        public InventoryDbContext(DbContextOptions<InventoryDbContext> options) : base(options)
        {

        }

        public DbSet<User> tblUser { get; set; }
        public DbSet<Customer> tblCustomer { get; set; } = default!;
        public DbSet<Order> tblOrder { get; set; } = default!;
        public DbSet<OrderItem> tblOrderItem { get; set; } = default!;
        public DbSet<Product> tblProduct { get; set; } = default!;


        protected override void OnModelCreating(ModelBuilder modelBuilder)
        {
            modelBuilder.Entity<OrderItem>().HasKey(o => new { o.OrderID, o.ProductID });
        }


        protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
        {
            base.OnConfiguring(optionsBuilder);
            optionsBuilder.UseSqlServer("Server = .; Database = InventoryManagementDB; Trusted_Connection = True; TrustServerCertificate = True;");
        }
    }
}

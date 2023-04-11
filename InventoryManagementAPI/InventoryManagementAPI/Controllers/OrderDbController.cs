using InventoryDatabaseModel.Context;
using InventoryDatabaseModel.Models;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace InventoryManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderDbController : ControllerBase
    {
        private readonly InventoryDbContext context;

        public OrderDbController(InventoryDbContext context)
        {
            this.context = context;
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetAllOrders()
        {
            var allOrders = await context.tblOrder.ToListAsync();
            return Ok(allOrders);
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrderById(int id)
        {
            try
            {
                var order = await context.tblOrder.FirstOrDefaultAsync(x => x.OrderID == id);
                if (order == null)
                {
                    return NotFound();
                }
                return Ok(order);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateOrder(int id, Order order)
        {
            if(id != order.OrderID)
            {
                return BadRequest();
            }

            try
            {
                context.Entry(order).State = EntityState.Modified;
                await context.SaveChangesAsync();
                return Ok("Order updated successfully");
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPut("VM/{id}")]
        public async Task<IActionResult> UpdateOrderWithOrderItems(int id, Order order)
        {
            if(id != order.OrderID)
            {
                return BadRequest();
            }

            var existOrder = await context.tblOrder.Include(x=>x.OrderItems).FirstAsync(x=>x.OrderID == id);

            context.tblOrderItem.RemoveRange(existOrder.OrderItems);

            foreach (var item in order.OrderItems)
            {
                context.tblOrderItem.Add(new OrderItem
                {
                    OrderID = order.OrderID,
                    ProductID = item.ProductID,
                    Quantity = item.Quantity
                });
            }

            try
            {
                context.Entry(existOrder).State = EntityState.Modified;
                await context.SaveChangesAsync();
                return Ok("Order updated");
            }
            catch (Exception)
            {

                throw;
            }
        }
       
        [HttpPost]
        public async Task<ActionResult<Order>> InsertOrder(Order order)
        {
            try
            {
                context.tblOrder.Add(order);
                await context.SaveChangesAsync();
                return Ok("Order Saved");
            }
            catch (Exception)
            {

                throw;
            }
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            try
            {
                var order = await context.tblOrder.FirstOrDefaultAsync(x => x.OrderID == id);

                if (order == null)
                {
                    return NotFound("Order no found");
                }

                context.tblOrder.Remove(order);
                await context.SaveChangesAsync();
                return Ok("Order Deleted");
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}

using InventoryDatabaseModel.Models;
using InventoryDatabaseModel.ViewModels;
using InventoryRepositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class OrderController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IGenericRepo<Order> orderRepo;
        private readonly IGenericRepo<OrderItem> orderItemRepo;

        public OrderController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.orderRepo = this.unitOfWork.GetRepo<Order>();
            this.orderItemRepo = this.unitOfWork.GetRepo<OrderItem>();
        }


        [HttpGet]
        public async Task<ActionResult<IEnumerable<Order>>> GetAllOrders()
        {
            try
            {
                var allOrders = await orderRepo.GetAllAsync();
                return Ok(allOrders);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("VM")]
        public async Task<ActionResult<IEnumerable<OrderViewModel>>> GetOrderVMData()
        {
            List<OrderViewModel> vmDataList = new List<OrderViewModel>();

            var orders = await orderRepo.GetAllAsync(x=>x.Include(o=>o.OrderItems).ThenInclude(p=>p.Product).Include(c=>c.Customer));

            vmDataList = orders.Select(o => new OrderViewModel
            {
                OrderID = o.OrderID,
                OrderDate = o.OrderDate,
                DeliveryDate = o.DeliveryDate,
                Status = o.Status,
                CustomerID = o.CustomerID,
                CustomerName = o.Customer.CustomerName,
                OrderPrice = o.OrderItems.Sum(x=>x.Quantity*x.Product.Price)
            }).
            ToList();

            return Ok(vmDataList);
        }

        
        [HttpGet("{id}")]
        public async Task<ActionResult<Order>> GetOrderById(int id)
        {
            try
            {
                var order = await orderRepo.GetAsync(x => x.OrderID == id);

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
        
        [HttpGet("{id}/OrderItems")]
        public async Task<ActionResult<Order>> GetOrderWithOrderItems(int id)
        {
            var order = await this.orderRepo.GetAsync(o => o.OrderID == id, x => x.Include(o => o.OrderItems).ThenInclude(oi => oi.Product).Include(o => o.Customer));

            if (order == null)
            {
                return NotFound();
            }
            return order;
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
                await orderRepo.UpdateAsync(order);
                await unitOfWork.CompleteAsync();
                return Ok("Order Updated");
            }
            catch (Exception)
            {

                throw;
            }
        }
        
        [HttpPut("VM/{id}")]
        public async Task<IActionResult> UpdateOrderWithOrderItem(int id, Order order)
        {
            if(id != order.OrderID)
            {
                return BadRequest();
            }
            try
            {
                await orderRepo.UpdateAsync(order);
                await unitOfWork.CompleteAsync();
                return Ok("Order updated successfully");
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
                await orderRepo.AddAsync(order);
                await unitOfWork.CompleteAsync();
                return Ok("Order saved successfully");
            }
            catch (Exception)
            {

                throw;
            }
        }
        
        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteOrder(int id)
        {
            var orderToDelete = await orderRepo.GetAsync(x => x.OrderID == id);

            try
            {
                if(orderToDelete == null)
                {
                    return NotFound();
                }
                await orderRepo.DeleteAsync(orderToDelete);
                await unitOfWork.CompleteAsync();
                return Ok("Product deleted");
            }
            catch (Exception)
            {

                throw;
            }
        }

    }
}

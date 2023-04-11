using InventoryDatabaseModel.Models;
using InventoryDatabaseModel.ViewModels;
using InventoryRepositories.Interfaces;
using Microsoft.AspNetCore.Components.Forms;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace InventoryManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class CustomerController : ControllerBase
    {
        private readonly IUnitOfWork unitOfWork;
        private readonly IGenericRepo<Customer> customerRepo;

        public CustomerController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            customerRepo = this.unitOfWork.GetRepo<Customer>();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Customer>>> GetAllCustomers()
        {
            try
            {
                var allCustomers = await customerRepo.GetAllAsync();
                return Ok(allCustomers);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("VM")]
        public async Task<ActionResult<IEnumerable<CustomerViewModel>>> GetAllCustomerVMdata()
        {

            List<CustomerViewModel> customerVmList = new List<CustomerViewModel>();

            try
            {
                var customerVmData = await customerRepo.GetAllAsync(c => c.Include(o=>o.Orders));

                customerVmList = customerVmData.Select(vm=> new CustomerViewModel
                {
                    CustomerID= vm.CustomerID,
                    CustomerName = vm.CustomerName,
                    Email = vm.Email,
                    Address= vm.Address,
                    CanDelete = vm.Orders.Count == 0
                })
                .ToList();

                return Ok(customerVmList);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("CustomersWithOrders")]
        public async Task<ActionResult<IEnumerable<Customer>>> GetCustomersWithOrders()
        {
            try
            {
                var customersWithOrders = await customerRepo.GetAllAsync(c=>c.Include(o=>o.Orders));

                return Ok(customersWithOrders);
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Customer>> GetCustomerById(int id)
        {
            try
            {
                var customer = await customerRepo.GetAsync(x=>x.CustomerID == id);

                if(customer != null)
                {
                    return Ok(customer);
                }
                return NotFound("Customer Not Found");
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpGet("{id}/WithOrders")]
        public async Task<ActionResult<Customer>> GetCustomerWithOrders(int id)
        {
            try
            {
                var customer = await customerRepo.GetAsync(c => c.CustomerID == id, c => c.Include(o => o.Orders));

                if(customer != null)
                {
                    return Ok(customer);
                }
                return NotFound("Customer Not Found");
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPut("{id}")]
        public async Task<ActionResult<Customer>> UpdateCustomer(int id, Customer customer)
        {
            if(customer.CustomerID != id)
            {
                return BadRequest("Invalid id and customer");
            }
            try
            {
                await customerRepo.UpdateAsync(customer);
                await unitOfWork.CompleteAsync();

                return Ok(customer);
            }
            catch (Exception)
            {

                throw;
            }

        }

        [HttpPost]
        public async Task<ActionResult<Customer>> InsertCustomer(Customer customer)
        {
            try
            {
                if(customer != null)
                {
                    await customerRepo.AddAsync(customer);
                    await unitOfWork.CompleteAsync();

                    return Ok(customer);
                }
                return BadRequest("Failed to insert new customer");
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> Delete(int id)
        {
            try
            {
                var customerToDelete = await customerRepo.GetAsync(x=>x.CustomerID == id);

                if(customerToDelete != null)
                {
                    await customerRepo.DeleteAsync(customerToDelete);
                    await unitOfWork.CompleteAsync();

                    return Ok(customerToDelete);
                }
                return NotFound("Customer Not Found");
            }
            catch (Exception)
            {

                throw;
            }
        }
    }
}

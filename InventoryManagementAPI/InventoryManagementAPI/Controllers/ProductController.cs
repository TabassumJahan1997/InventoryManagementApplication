using InventoryDatabaseModel.Models;
using InventoryDatabaseModel.ViewModels;
using InventoryRepositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Identity.Client;

namespace InventoryManagementAPI.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class ProductController : ControllerBase
    {
        

        private readonly IWebHostEnvironment host;
        private readonly IUnitOfWork unitOfWork;
        private readonly IGenericRepo<Product> productRepo;

        public ProductController(IWebHostEnvironment host, IUnitOfWork unitOfWork)
        {
            this.host = host;
            this.unitOfWork = unitOfWork;
            this.productRepo = this.unitOfWork.GetRepo<Product>();
        }

        [HttpGet]
        public async Task<ActionResult<IEnumerable<Product>>> GetAllProductsData()
        {
            var allProducts = await productRepo.GetAllAsync();
            return Ok(allProducts.ToList());
        }

        [HttpGet("VM")]
        public async Task<ActionResult<IEnumerable<ProductViewModel>>> GetAllProductViewModelData()
        {
            var productData = await productRepo.GetAllAsync(product => product.Include(x => x.OrderItems));

            List<ProductViewModel> productVmDataList = new List<ProductViewModel>();

            productVmDataList = productData.ToList().Select(productVm => new ProductViewModel
            {
                ProductID = productVm.ProductID,
                ProductName = productVm.ProductName,
                Price = productVm.Price,
                IsAvailable = productVm.IsAvailable,
                Picture = productVm.Picture,
                CanDelete = !productVm.OrderItems.Any()
            })
            .ToList();

            return Ok(productVmDataList);

        }

        [HttpGet("{id}")]
        public async Task<ActionResult<Product>> GetProductById(int id)
        {
            try
            {
                var product = await productRepo.GetAsync(p => p.ProductID == id);

                if (product == null)
                {
                    return NotFound("Sorry !! Product with this id not found");
                }
                else
                {
                    return Ok(product);
                }
            }
            catch (Exception)
            {

                throw;
            }

        }

        [HttpGet("GetImage")]
        public IActionResult GetImage(string filename)
        {
            var imagePath = Path.Combine(host.WebRootPath, "Pictures", filename);
            var imageFileStream = System.IO.File.OpenRead(imagePath);
            return File(imageFileStream, "image/jpeg"); // assuming the image is a JPEG file
        }

        [HttpPut("{id}")]
        public async Task<ActionResult> UpdateProduct(int id, Product product)
        {
            try
            {
                var productToUpdate = await productRepo.GetAsync(x=>x.ProductID == id);

                if (id != product.ProductID)
                {
                    return BadRequest("Not a valid product to update");
                }
                else
                {
                    if(product.Picture != null)
                    {
                        DeleteFile(productToUpdate.Picture);
                    }

                    await productRepo.UpdateAsync(product);
                    await unitOfWork.CompleteAsync();
                    return Ok("Product updated");
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPut("{id}/VM")]
        public async Task<IActionResult> UpdateProductVM(int id, ProductInputModel inputModel)
        {
            try
            {
                if (id != inputModel.ProductID)
                {
                    return BadRequest("Not a valid product to update");
                }

                var productToUpdate = await productRepo.GetAsync(x => x.ProductID == id);

                if (productToUpdate != null)
                {
                    productToUpdate.ProductName = inputModel.ProductName;
                    productToUpdate.Price = inputModel.Price;
                    productToUpdate.IsAvailable = inputModel.IsAvailable;

                    await productRepo.UpdateAsync(productToUpdate);
                    await unitOfWork.CompleteAsync();
                    return Ok();
                }
                else
                {
                    return NotFound("No Product Found To Update");
                }
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost]
        public async Task<ActionResult<Product>> InsertProduct(Product product)
        {
            try
            {
                if(product != null)
                {
                    await productRepo.AddAsync(product);
                    await unitOfWork.CompleteAsync();

                    return Ok("New Product Inserted");
                }
                else
                {
                    return BadRequest("No Data Found To Insert");
                }

            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost("VM")]
        public async Task<ActionResult<Product>> InsertProductInputVM(ProductInputModel inputModel)
        {
            var newProduct = new Product();
            newProduct.ProductName = inputModel.ProductName;
            newProduct.Price = inputModel.Price;
            newProduct.IsAvailable= inputModel.IsAvailable;

            try
            {
                if(newProduct != null)
                {
                    await productRepo.AddAsync(newProduct);
                    await unitOfWork.CompleteAsync();

                    return Ok(newProduct);
                }
                return BadRequest();
            }
            catch (Exception)
            {

                throw;
            }
        }

        [HttpPost("Upload/{id}")]
        public async Task<ImagePathResponse> UploadPicture(int id, IFormFile picture)
        {
            var productToUploadPic = await productRepo.GetAsync(x=>x.ProductID == id);

            if (productToUploadPic != null)
            {
                string ext = Path.GetExtension(picture.FileName);
                string fileName = Guid.NewGuid().ToString() + ext;
                string pathToSave = Path.Combine(host.WebRootPath, "Pictures", fileName);

                FileStream stream = new FileStream(pathToSave, FileMode.Create);
                picture.CopyTo(stream);
                stream.Close();

                productToUploadPic.Picture = fileName;
                await productRepo.UpdateAsync(productToUploadPic);
                await unitOfWork.CompleteAsync();
                return new ImagePathResponse
                {
                    ImagePath = picture.FileName
                };

            }
            else
            {
                return new ImagePathResponse();
            }
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteProduct(int id)
        {
            var productToDelete = await productRepo.GetAsync(x => x.ProductID == id);

            if(productToDelete == null)
            {
                return NotFound("No Product Found To Delete");
            }
            else
            {
                DeleteFile(productToDelete.Picture);
                await productRepo.DeleteAsync(productToDelete);
                await unitOfWork.CompleteAsync();
                return Ok("Product Deleted");
            }
        }

        [NonAction]
        public void DeleteFile(string fileName)
        {
            string filePath = Path.Combine(host.WebRootPath, "Pictures", fileName);
            if (System.IO.File.Exists(filePath))
            {
                System.IO.File.Delete(filePath);
            }
        }
    }
}

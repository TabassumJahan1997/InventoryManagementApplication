using InventoryDatabaseModel.Models;
using InventoryRepositories.Interfaces;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;

namespace InventoryManagementAPI.Controllers
{
    [Route("api/[controller]/[action]")]
    [ApiController]
    public class UserController : ControllerBase
    {
        public readonly IUnitOfWork unitOfWork;
        public readonly IGenericRepo<User> userRepo;

        public UserController(IUnitOfWork unitOfWork)
        {
            this.unitOfWork = unitOfWork;
            this.userRepo = this.unitOfWork.GetRepo<User>();
        }

        // Registration

        [HttpPost]
        public async Task<IActionResult> RegisterUser([FromBody] User userobj)
        {
            if (userobj == null)
            {
                return BadRequest(new { Message = "Data not provided" });
            }

            try
            {
                var result = await this.userRepo.Register(userobj);
                if (result)
                {
                    await unitOfWork.CompleteAsync();
                    return Ok(new { Message = "User Registered Successfully. " });
                }
                else
                {
                    return BadRequest(new { Message = "Failed to register" });
                }
            }
            catch (Exception)
            {

                throw;
            }


        }


        [HttpPost]
        public async Task<ActionResult> AuthenticateUser([FromBody] User user)
        {
            if (user == null)
            {
                return BadRequest(new { Message = "Data not provided" });
            }

            try
            {
                var result = await this.userRepo.Authenticate(user);

                if (result)
                {
                    var userForToken = await this.userRepo.FindUserByUserName(user.UserName);

                    //string jwtToken = await this.userRepo.CreateJWTToken(userForToken);

                    //string jwtToken = this.CreateJWTToken(userForToken);

                    string jwtToken = await userRepo.CreateJwtToken(userForToken);

                    await unitOfWork.CompleteAsync();
                    return Ok(new
                    {
                        Message = "User log in Successful. ",
                        Token = jwtToken
                    });
                }
                else
                {
                    return BadRequest(new { Message = "Failed to log in" });
                }
            }
            catch (Exception)
            {

                throw;
            }

        }

        //[NonAction]
        //public string CreateJWTToken(User user)
        //{
        //    var jwtTokenHandler = new JwtSecurityTokenHandler();
        //    var key = Encoding.ASCII.GetBytes("supersecret.....");
        //    var identity = new ClaimsIdentity(new Claim[]
        //    {
        //        new Claim(ClaimTypes.Role , user.Role),
        //        new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}")
        //    });

        //    var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

        //    var tokenDescriptor = new SecurityTokenDescriptor
        //    {
        //        Subject = identity,
        //        //Expires = DateTime.Now.AddDays(1),
        //        Expires = DateTime.Now.AddSeconds(10),
        //        SigningCredentials = credentials
        //    };
        //    var token = jwtTokenHandler.CreateToken(tokenDescriptor);
        //    return jwtTokenHandler.WriteToken(token);
        //}
    }
}

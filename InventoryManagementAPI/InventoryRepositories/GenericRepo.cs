using InventoryRepositories.Interfaces;
using Microsoft.EntityFrameworkCore.Query;
using Microsoft.EntityFrameworkCore;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Linq.Expressions;
using System.Text;
using System.Threading.Tasks;
using InventoryDatabaseModel.Models;
using InventoryDatabaseModel.Context;
using System.Security.Cryptography;
using Microsoft.IdentityModel.Tokens;
using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text.RegularExpressions;
using Microsoft.AspNetCore.Hosting;

namespace InventoryRepositories
{
    public class GenericRepo<T> : IGenericRepo<T> where T : class, new()
    {
        private InventoryDbContext db = default!;
        private DbSet<T> dbSet = default!;
        //private readonly IWebHostEnvironment host;
        public GenericRepo(InventoryDbContext db)
        {
            this.db = db;
            this.dbSet = this.db.Set<T>();
            //this.host = host;
        }

        public async Task AddAsync(T item)
        {
            await dbSet.AddAsync(item);
        }

        public async Task AddRange(IEnumerable<T> items)
        {
            await dbSet.AddRangeAsync(items);
        }

        public async Task DeleteAsync(T item)
        {
            var r = dbSet.Remove(item);
            await Task.FromResult(r);
        }

        public Task DeleteRange(IEnumerable<T> items)
        {
            dbSet.RemoveRange(items);
            return Task.CompletedTask;
        }

        public async Task<IEnumerable<T>> GetAllAsync()
        {
            return await dbSet.ToListAsync();
        }

        public async Task<IEnumerable<T>> GetAllAsync(string[] includes)
        {
            var data = dbSet.AsQueryable(); ;
            foreach (var s in includes)
            {
                data = data.Include(s);
            }
            return await data.ToListAsync();
        }
        public async Task<T> GetAsync(Expression<Func<T, bool>> predicate)
        {
            var data = dbSet.AsQueryable();

            return await data.FirstAsync(predicate);
        }
        public async Task<T> GetAsync(Expression<Func<T, bool>> predicate, Func<IQueryable<T>, IIncludableQueryable<T, object>> includes)
        {
            var data = dbSet.AsQueryable();
            if (includes != null)
            {
                data = includes(data);
            }
            return await data.FirstAsync(predicate);
        }

        public async Task<IEnumerable<T>> GetAllAsync(Func<IQueryable<T>, IIncludableQueryable<T, object>> includes)
        {
            var data = dbSet.AsQueryable();

            data = includes(data);

            return await data.ToListAsync();
        }

        public Task UpdateAsync(T item)
        {
            this.db.Entry(item).State = EntityState.Modified;
            return Task.CompletedTask;
        }

        public async Task<IEnumerable<T>> GetAllAsync(Expression<Func<T, bool>> predicate)
        {
            return await dbSet.AsQueryable().Where(predicate).ToListAsync();
        }


        //-----------------LOG IN and REGISTRATION-------------------

        private static RNGCryptoServiceProvider rng = new RNGCryptoServiceProvider();

        private static readonly int SaltSize = 16;
        private static readonly int HashSize = 20;
        private static readonly int Iterations = 10000;


        public async Task<User> FindUserByUserName(string username)
        {
            try
            {
                var user = await db.tblUser.FirstOrDefaultAsync(x => x.UserName == username);
                return user;
            }
            catch (Exception)
            {
                throw;
            }

        }


        // Hash password

        public static string HashPassword(string password)
        {
            byte[] salt;
            rng.GetBytes(salt = new byte[SaltSize]);
            var key = new Rfc2898DeriveBytes(password, salt, Iterations);
            var hash = key.GetBytes(HashSize);

            var hashBytes = new byte[SaltSize + HashSize];
            Array.Copy(salt, 0, hashBytes, 0, SaltSize);
            Array.Copy(hash, 0, hashBytes, SaltSize, HashSize);

            var base64Hash = Convert.ToBase64String(hashBytes);
            return base64Hash;
        }


        // Verify Password

        public static bool VerifyPassword(string password, string base64Hash)
        {
            var hashBytes = Convert.FromBase64String(base64Hash);

            var salt = new byte[SaltSize];
            Array.Copy(hashBytes, 0, salt, 0, SaltSize);

            var key = new Rfc2898DeriveBytes(password, salt, Iterations);
            byte[] hash = key.GetBytes(HashSize);

            for (var i = 0; i < HashSize; i++)
            {
                if (hashBytes[i + SaltSize] != hash[i])
                    return false;
            }
            return true;
        }



        // Authenticate

        public async Task<bool> Authenticate(User user)
        {
            var userToLogin = await db.tblUser.FirstOrDefaultAsync(x => x.UserName == user.UserName);

            bool isPassVerified = VerifyPassword(user.Password, userToLogin.Password);

            //userToLogin.Token = CreateJWTToken(userToLogin);

            if (user.UserName != null && isPassVerified == true)
            {
                return true;
            }
            else
            {
                return false;
            }
        }


        public string CreateJWTToken(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("supersecret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role , user.Role),
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                //Expires = DateTime.Now.AddDays(1),
                Expires = DateTime.Now.AddSeconds(10),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }


        // Register
        public async Task<bool> Register(User data)
        {
            if (await IsUsernameExists(data.UserName)) return false;

            if (await IsEmailExists(data.Email)) return false;

            if (!(CheckPasswordStrength(data.Password) == "")) return false;

            var hashedPassword = HashPassword(data.Password);

            data.Password = hashedPassword;
            //data.Role = data.Role.ToString();
            data.Role = "Admin";

            await db.tblUser.AddAsync(data);
            return true;
        }


        // check for duplicate username

        private async Task<bool> IsUsernameExists(string username)
        {
            return await db.tblUser.AnyAsync(x => x.UserName == username);
        }


        // check for duplicate email

        private async Task<bool> IsEmailExists(string email)
        {
            return await db.tblUser.AnyAsync(x => x.Email == email);
        }


        // check for strong password

        private string CheckPasswordStrength(string password)
        {
            StringBuilder sb = new StringBuilder();

            if (password.Length < 8)
                sb.Append("Password must carry atleast 8 characters" + Environment.NewLine);

            if (!(Regex.IsMatch(password, "[a-z]")))
                sb.Append("Password must contain atleast one lowercase character" + Environment.NewLine);

            if (!(Regex.IsMatch(password, "[A-Z]")))
                sb.Append("Password must contain atleast one uppercase character" + Environment.NewLine);

            if (!(Regex.IsMatch(password, "[0-9]")))
                sb.Append("Password must contain atleast one numeric character" + Environment.NewLine);

            if (!(Regex.IsMatch(password, "[<,>,!,@,#,$,%,^,&,*,(,),{,},\\[,\\],\\,/,.,',\",`,_]")))
                sb.Append("Password must contain atleast one special character" + Environment.NewLine);

            return sb.ToString();
        }


        public async Task<bool> UpdateUser(int id, User data)
        {
            var userToUpdate = await db.tblUser.FirstOrDefaultAsync(x => x.Id == id);
            try
            {
                db.tblUser.Update(userToUpdate);
                return true;
            }
            catch (Exception)
            {

                throw;
            }
        }


        public async Task<string> CreateJwtToken(User user)
        {
            var jwtTokenHandler = new JwtSecurityTokenHandler();
            var key = Encoding.ASCII.GetBytes("supersecret.....");
            var identity = new ClaimsIdentity(new Claim[]
            {
                new Claim(ClaimTypes.Role , user.Role),
                new Claim(ClaimTypes.Name, $"{user.FirstName} {user.LastName}")
            });

            var credentials = new SigningCredentials(new SymmetricSecurityKey(key), SecurityAlgorithms.HmacSha256);

            var tokenDescriptor = new SecurityTokenDescriptor
            {
                Subject = identity,
                //Expires = DateTime.Now.AddDays(1),
                Expires = DateTime.Now.AddSeconds(10),
                SigningCredentials = credentials
            };
            var token = jwtTokenHandler.CreateToken(tokenDescriptor);
            return jwtTokenHandler.WriteToken(token);
        }

        
    }
}

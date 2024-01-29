using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks; // Add this for Task
using API.Data;
using API.DTO;
using API.Entities;
using API.Interfaces;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    public class AccountController : BaseApiController
    {
        private readonly DataContext _DbContext;
        private readonly ITokenService _tokenService;


        public AccountController(DataContext DbContext,ITokenService tokenService)
        {
            _DbContext = DbContext;
            _tokenService = tokenService;
        }

        [HttpPost("register")] //POST(Create):  api/account/register
        public async Task<ActionResult<User>> Register(Register register)
        {
            if (await UserExist(register.Username))
            {
                return BadRequest("Username is already taken");
            }

            using var hmac = new HMACSHA512();

            var user = new AppUser
            {
                UserName = register.Username.ToLower(),
                PasswordHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(register.Password)),
                PasswordSalt = hmac.Key
            };

            _DbContext.Users.Add(user);
            await _DbContext.SaveChangesAsync();

            return new User {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };  
        }

        [HttpPost("login")]
        public async Task<ActionResult<User>> Login(Login login)
        {

            var user = await _DbContext.Users.SingleOrDefaultAsync(x => x.UserName == login.Username);

            if (user == null) return Unauthorized("Invalid Username"); // To check if there's a username in database and if it does not it will print error
            using var hmac = new HMACSHA512(user.PasswordSalt);

            var computedHash = hmac.ComputeHash(Encoding.UTF8.GetBytes(login.Password));

            for (int i = 0; i < computedHash.Length; i++)
            {
                if (computedHash[i] != user.PasswordHash[i]) return Unauthorized("Invalid Password");

            }
             return new User {
                Username = user.UserName,
                Token = _tokenService.CreateToken(user)
            };  

        }
        public async Task<bool> UserExist(string username)
        {
            return await _DbContext.Users.AnyAsync(x => x.UserName == username.ToLower());
        }
    }
}

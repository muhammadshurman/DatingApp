using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    
    public class UsersController : BaseApiController
    {
        private readonly DataContext _dbContext;

        public UsersController(DataContext dbContext)
        {
            _dbContext = dbContext;
        }
        [AllowAnonymous]
        [HttpGet]
        public async Task<ActionResult<IEnumerable<AppUser>>> GetAllUsers()
        {
            var users = await _dbContext.Users.ToListAsync();
            return users;
        }
        
        [HttpGet("{id}")]
        public async Task<ActionResult<AppUser>> GetUserById(int id)
        {
            return await _dbContext.Users.FindAsync(id);

        }
    }
}
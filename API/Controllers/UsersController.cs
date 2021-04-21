using Microsoft.AspNetCore.Mvc;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;

namespace API.Controllers
{
    
    public class UsersController : BaseApiController
    {
        private readonly DataContext _context;

        public UsersController(DataContext context)
        {
            _context = context;

        }
        [HttpGet] //because we are getting data from this controller
        [AllowAnonymous]
        //sending list of users
        public  async Task<ActionResult<IEnumerable<AppUser>>> GetUsers()
        {
            return await _context.Users.ToListAsync();

        }
        [Authorize]
        [HttpGet("{id}")]  //api/users/3 for example
        public async Task<ActionResult<AppUser>> GetUsers(int id)
        {
            return await _context.Users.FindAsync(id);

        }
    }
}
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.Entities;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace API.Controllers
{
    public class ErrorController : BaseApiController
    {
        private readonly DataContext _context;

        public ErrorController(DataContext context)
        {
            _context = context;
        }
        [Authorize]
        [HttpGet("Auth")]
        public ActionResult<string> GetSecret()
        {
            return "Secret Text";
        }


        [HttpGet("not-found")]
        public ActionResult<AppUser> GetNotFound()
        {
            var userNotFound = _context.Users.Find(-1);
            if (userNotFound == null) return NotFound();
            return userNotFound;
        }

        [HttpGet("server-error")]
        public ActionResult<string> GetServerError()
        {
            var serverError = _context.Users.Find(-1);
            var serverToReturn = serverError.ToString();

            return serverToReturn;
        }

         [HttpGet("bad-request")]
        public ActionResult<AppUser> GetBadRequest(){
            return BadRequest("404 Not Found");
        }
    }
}
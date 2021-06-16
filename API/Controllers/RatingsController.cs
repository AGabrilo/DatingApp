using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.Data;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;

namespace API.Controllers
{
    [Authorize]
    public class RatingsController : BaseApiController
    {
        private readonly IUserRepository _userRepository;
        private readonly IRatingRepository _ratingRepository;
        private readonly DataContext _context;
        private readonly UserManager<AppUser> _userManager;
        public RatingsController(UserManager<AppUser> userManager, IUserRepository userRepository, IRatingRepository ratingRepository, DataContext context)
        {
            _userManager = userManager;
            _context = context;

            _ratingRepository = ratingRepository;

            _userRepository = userRepository;
        }

        [HttpPost("{username}/rateValue/{value}")]
        public async Task<ActionResult> AddRating(string username, int value)

        {

            var ratingUserId = User.GetUserId();

            var ratedUser = await _userRepository.GetUserByUsernameAsync(username);

            var ratingUser = await _ratingRepository.GetUserWithRatings(ratingUserId);

            if (ratedUser == null) return NotFound();

            if (ratingUser.UserName == username) return BadRequest("You cannot rate yourself");

            var userRate = await _ratingRepository.GetUserRating(ratingUserId, ratedUser.Id);

            if (userRate != null) return BadRequest("You already rated this user");
            

            userRate = new Rating
            {

                RatingUserId = ratingUserId,

                RatedUserId = ratedUser.Id,

                RateValue = value

            };

            if (userRate != null)

                ratingUser.RatedUsers.Add(userRate);

            if (await _userRepository.SaveAllAsync()) return Ok();
            return BadRequest("Failed to rate user");

        }


        [HttpGet("users-with-ratings")]
        public async Task<ActionResult> GetUserRatings()
        {
            var ratings = await _userManager.Users.Include(r => r.RatedByUsers).Select(u => new {
               u.Id,
               Username=u.UserName,
               ratings=u.RatedByUsers.Select(r=> r.RateValue).ToList()
           }).ToListAsync();
            return Ok(ratings);
        }
        
    }
}
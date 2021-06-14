using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Extensions;
using API.Helpers;
using API.Interfaces;
using AutoMapper;
using AutoMapper.QueryableExtensions;
using Microsoft.EntityFrameworkCore;

namespace API.Data
{
    public class RatingRepository : IRatingRepository
    {
        // 
        private readonly DataContext _context;
        public RatingRepository(DataContext context)
        {
            _context = context;
        }

        public  async Task<Rating> GetRatingsOfUser(RatingParams ratingParams)
        {
             return await _context.Ratings
            .Include(x => x.RateValue)
            .FirstOrDefaultAsync(x => x.RatedUserId==ratingParams.UserId);
        }

        public async Task<Rating> GetUserRating(int sourceUserId, int ratedUserId)
        {
           return await _context.Ratings.FindAsync(sourceUserId,ratedUserId);
        }

       public async Task<PagedList<RatingDto>> GetUserRatings(RatingParams ratingParams)
        {
            var users= _context.Users.OrderBy(u => u.UserName).AsQueryable();
            var ratings= _context.Ratings.AsQueryable();

            if(ratingParams.Predicate== "rated")
            {
                ratings=ratings.Where(rate => rate.RatingUserId==ratingParams.UserId);
                users= ratings.Select(rate => rate.RatedUser);
            }
            if(ratingParams.Predicate=="ratedBy")
            {
                ratings=ratings.Where(rate => rate.RatedUserId==ratingParams.UserId);
                users= ratings.Select(rate => rate.RatingUser);
            }

            var ratedUsers= users.Select(user => new RatingDto{
              Username=user.UserName,
               KnownAs=user.KnownAs,
               Age=user.DateOfBirth.CalculateAge(),
               PhotoUrl=user.Photos.FirstOrDefault(p => p.IsMain).Url,
               City=user.City,
               Id=user.Id
            });

            return await PagedList<RatingDto>.CreateAsync(ratedUsers,ratingParams.PageNumber,ratingParams.PageSize);
        }
        public async Task<AppUser> GetUserWithRatings(int userId)
        {
            return await _context.Users
            .Include(x => x.RatedUsers)
            .FirstOrDefaultAsync(x => x.Id==userId);
        }
    }
}
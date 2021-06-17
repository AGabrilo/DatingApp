using System.Collections.Generic;
using System.Threading.Tasks;
using API.DTOs;
using API.Entities;
using API.Helpers;

namespace API.Interfaces
{
    public interface IRatingRepository
    {
        Task<Rating> GetUserRating(int ratingUserId,int ratedUserId);
        Task<Rating> Check(int ratingUserId,int ratedUserId);
        Task<PagedList<RatingDto>> GetUserRatings(RatingParams ratingParams);
        Task<AppUser> GetUserWithRatings(int userId);
        Task<Rating> GetRatingsOfUser(RatingParams ratingParams);
        Task<IEnumerable<RatingDto>> GetRatingsAsync();

    }
}
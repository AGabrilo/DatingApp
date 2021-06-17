using API.Entities;

namespace API.DTOs
{
    public class RatingDto
    {
        public int RatingUserId { get; set; }
        public int RatedUserId { get; set; }
        public int RateValue { get; set; }
         public string Username { get; set; }
        public int Age { get; set; }
        public string KnownAs { get; set; }
        public string PhotoUrl { get; set; }
        public string City { get; set; }
    }
}
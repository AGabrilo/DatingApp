namespace API.Entities
{
    public class Rating
    {
        public AppUser RatingUser { get; set; }
        public int RatingUserId { get; set; }
        public AppUser RatedUser { get; set; }
        public int RatedUserId { get; set; }
        public int RateValue { get; set; }
    }
}
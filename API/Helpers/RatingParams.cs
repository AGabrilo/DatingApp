namespace API.Helpers
{
    public class RatingParams:PaginationParams
    {
        public int UserId { get; set; }
        public string Predicate { get; set; }
    }
}
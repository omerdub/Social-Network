namespace FakelookAPI.Entities.Responses
{
    public class ErrorResponse
    {
        public string Message { get; private set; }

        public ErrorResponse(string message)
        {
            Message = message;
        }
    }
}

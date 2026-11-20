namespace UmbracoTechnical.Services;

public interface IReadingTimeService
{
    int CalculateReadingTime(string? content, int wordsPerMinute = 200);
}

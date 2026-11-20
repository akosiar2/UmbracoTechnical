using System.Text.RegularExpressions;
using static System.Net.Mime.MediaTypeNames;

namespace UmbracoTechnical.Services;

public class ReadingTimeService : IReadingTimeService
{
    public int CalculateReadingTime(string? content, int wordsPerMinute = 200)
    {
        if (string.IsNullOrWhiteSpace(content) || wordsPerMinute <= 0)
        {
            return 0;
        }
        // Strip HTML tags if content comes from a Rich Text Editor
        string plainText = Regex.Replace(content, "<.*?>", string.Empty);
        // Count words splitting by whitespace
        char[] delimiters = [' ', '\r', '\n', '\t'];
        int wordCount = plainText.Split(delimiters, StringSplitOptions.RemoveEmptyEntries).Length;
        if (wordCount == 0)
        {
            return 0;
        }
        // Minimum of 1 minute if there are words
        int minutes = (int)Math.Ceiling((double)wordCount / wordsPerMinute);
        return Math.Max(1, minutes);
    }
}


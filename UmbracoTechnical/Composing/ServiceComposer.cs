using Umbraco.Cms.Core.Composing;
using UmbracoTechnical.Services;

namespace UmbracoTechnical.Composing;

public class ServiceComposer : IComposer
{
    public void Compose(IUmbracoBuilder builder)
    {
        // Singleton is appropriate because ReadingTimeService is stateless and thread-safe
        builder.Services.AddSingleton<IReadingTimeService, ReadingTimeService>();
    }
}
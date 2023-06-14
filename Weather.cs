using System.Text.Json.Nodes;

namespace WorkerService1;

internal class Weather
{
    private readonly ConfigOptions _options;
    
    public Weather(ConfigOptions options)
    {
        _options = options;
    }
    
    public async Task<string> CheckWeather()
    {
        var client = new HttpClient();
        var request = new HttpRequestMessage
        {
            Method = HttpMethod.Get,
            RequestUri = new Uri(_options.WeatherUri),
            Headers =
            {
                {"X-RapidAPI-Key",_options.XRapidAPIKey},
                {"X-RapidAPI-Host",_options.XRapidAPIHost}
            }
        };
        var response = await client.SendAsync(request);
        var responseContent = await response.Content.ReadAsStringAsync();
        var responseJson = JsonObject.Parse(responseContent);
        var tempInC = responseJson["current"]["temp_c"];
        return tempInC.ToString();
    }
}
using MQTTnet;
using MQTTnet.Client;

namespace WorkerService1;

internal class Publish
{
    private readonly IMqttClient _client;
    private readonly Weather _weather;
    public Publish(IMqttClient client,Weather weather)
    {
        _client = client;
        _weather = weather;
    }
    
    public async Task PublishTime()
    {
        var time = DateTime.Now.ToString();
        if (_client != null && _client.IsConnected)
        {
            var timeMessage = new MqttApplicationMessageBuilder()
                .WithTopic("Time")
                .WithPayload(time)
                .WithAtLeastOnceQoS()
                .Build();
            await _client.PublishAsync(timeMessage);
        }
    }
    public async Task PublishWeatherData()
    {
        var responseMessage = await _weather.CheckWeather();
        if (_client != null && _client.IsConnected)
        {
            var weatherMessage = new MqttApplicationMessageBuilder()
                .WithTopic("Weather")
                .WithPayload(responseMessage)
                .WithAtLeastOnceQoS()
                .Build();
            await _client.PublishAsync(weatherMessage);
        }
    }
}
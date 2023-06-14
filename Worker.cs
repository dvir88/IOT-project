using MQTTnet;
using MQTTnet.Client;
using MQTTnet.Client.Options;

namespace WorkerService1;

public class Worker : BackgroundService
{
    private readonly ILogger<Worker> _logger;
    private readonly IMqttClient _client;
    private readonly ConfigOptions _options;
    private readonly Weather _weather;
    private readonly Publish _publish;

    public Worker(ILogger<Worker> logger,ConfigOptions options)
    {
        _logger = logger;
        _options = options;
        _weather = new Weather(options);

        var mqttFactory = new MqttFactory();
         _client = mqttFactory.CreateMqttClient();
        var clientOptions = new MqttClientOptionsBuilder()
                             .WithClientId(Guid.NewGuid().ToString())
                             .WithTcpServer("enter-your-local-ip-address", 7001)
                             .WithCleanSession()
                             .Build();

        _client.UseConnectedHandler(e =>
        {
            Console.WriteLine("connected");
        });
        _client.UseDisconnectedHandler(e =>
        {
            Console.WriteLine("disconnected");
        });
        _client.ConnectAsync(clientOptions);
        
        _publish = new Publish(_client,_weather);
    }

    protected override async Task ExecuteAsync(CancellationToken stoppingToken)
    {
        while (!stoppingToken.IsCancellationRequested)
        {
            await _publish.PublishWeatherData();
            await _publish.PublishTime();
            await Task.Delay(5000, stoppingToken);
        }
    }
}
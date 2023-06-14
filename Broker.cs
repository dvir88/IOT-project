using System.Text;
using Azure.Storage.Blobs;
using MQTTnet;
using MQTTnet.Server;

namespace MqttBroker;
public class Broker
{
    private static ConfigOptions? _config;

    public Broker(ConfigOptions config)
     {
        _config = config;
         InitBroker();
     }

    private static async void InitBroker()
     {
         var option = new MqttServerOptionsBuilder().WithDefaultEndpoint().WithDefaultEndpointPort(7001).WithApplicationMessageInterceptor(OnNewMessage);
         var mqttServer = new MqttFactory().CreateMqttServer();
         await mqttServer.StartAsync(option.Build());
        Console.WriteLine(mqttServer.IsStarted);
     }

     private static async void OnNewMessage(MqttApplicationMessageInterceptorContext context)
     {
        var payload = context.ApplicationMessage?.Payload == null ? null : Encoding.UTF8.GetString(context.ApplicationMessage?.Payload);
        await UploadToCloud(payload);
     }

    private static async Task UploadToCloud(string payload)
    {
        string connectionString = _config.ConnectionString;
        string containerName = _config.container;

        BlobServiceClient blobService = new BlobServiceClient(connectionString);
        BlobContainerClient containerClient = blobService.GetBlobContainerClient(containerName);
        BlobClient blobClient = containerClient.GetBlobClient("mqttblob");
        await using var stream = new MemoryStream(Encoding.UTF8.GetBytes(payload));
        await blobClient.UploadAsync(stream, true);
    }
}
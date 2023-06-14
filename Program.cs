using WorkerService1;

IHost host = Host.CreateDefaultBuilder(args)
    .ConfigureServices((hostContext,services) =>
    {
        IConfiguration configuration = hostContext.Configuration;
        ConfigOptions options = configuration.GetSection("WeatherApi").Get<ConfigOptions>();

        services.AddSingleton(options);
        services.AddHostedService<Worker>();
    })
    .Build();

host.Run();
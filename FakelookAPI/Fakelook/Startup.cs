using FakelookAPI.DAL.Data;
using FakelookAPI.DAL.Repositories.RefreshTokenRepository;
using FakelookAPI.DAL.Repositories.UserRepository;
using FakelookAPI.Entities.Models;
using FakelookAPI.Entities.Requests;
using FakelookAPI.Filters;
using FakelookAPI.Services.Auth;
using FakelookAPI.Services.Authenticators;
using FakelookAPI.Services.PasswordHelpers;
using FakelookAPI.Validators.AuthValidator;
using FakelookAPI.Validators.RefreshTokenValidator;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.IdentityModel.Tokens;
using System;
using System.Text;

namespace FakelookAPI
{
    public class Startup
    {
        private readonly IConfiguration _configuration;

        public Startup(IConfiguration configuration)
        {
            _configuration = configuration;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddCors(options =>
            {
                options.AddPolicy("AllowSpecificOrigin",
                    builder => builder.WithOrigins("http://localhost:3000")
                        .AllowAnyMethod()
                        .AllowAnyHeader()
                        .AllowCredentials());
            });

            services.AddAuthentication(JwtBearerDefaults.AuthenticationScheme)
            .AddJwtBearer(options =>
            {
                AuthenticationConfiguration authenticationConfiguration = new AuthenticationConfiguration();
                _configuration.Bind("Authentication", authenticationConfiguration);
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateLifetime = true,
                    ValidateIssuerSigningKey = true,
                    IssuerSigningKey = new SymmetricSecurityKey(Encoding.UTF8.GetBytes(authenticationConfiguration.AccessTokenSecret)),
                    ValidateIssuer = true,
                    ValidIssuer = authenticationConfiguration.Issuer,
                    ValidateAudience = true,
                    ValidAudience = authenticationConfiguration.Audience,
                    ClockSkew = TimeSpan.Zero
                };
            });

            services.AddLogging(loggingBuilder => loggingBuilder.AddConsole());

            string connectionString = _configuration.GetConnectionString("DefaultConnection");
            services.AddDbContext<FakelookDbContext>(options => options.UseSqlServer(connectionString));
            services.AddScoped<IFakelooklDbContext, FakelookDbContext>();
            services.AddTransient<IAuthValidator<RegisterUserRequest>, AuthValidator>();
            services.AddTransient<IUserRepository, UserRepository>();
            services.AddTransient<IRefreshTokenRepository, RefreshTokenRepository>();
            services.AddTransient<IAuthenticator, Authenticator>();
            services.AddTransient<IRefreshTokenValidator, RefreshTokenValidator>();
            services.AddSingleton<IJwtHandler, JwtHandler>();
            services.AddSingleton<IPasswordHelper, _passwordHelper>();

            services.AddControllers(options => { options.Filters.Add(new ExceptionHandler(new Logger<ExceptionHandler>(new LoggerFactory()))); });
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env, IFakelooklDbContext ctx)
        {
            app.UseRouting();
            app.UseAuthentication();
            app.UseAuthorization();
            app.UseCors("AllowSpecificOrigin");

            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "Default",
                    pattern: "api/{controller}/{action}");
            });
        }
    }
}

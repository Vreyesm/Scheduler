using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Builder;
using Microsoft.AspNetCore.Hosting;
using Microsoft.AspNetCore.HttpsPolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.SpaServices.AngularCli;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Configuration;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Logging;
using Microsoft.Extensions.Options;
using Scheduler.Data;

namespace Scheduler
{
    public class Startup
    {
        private IHostingEnvironment Environment { get; set; }

        public Startup(IConfiguration configuration, IHostingEnvironment env)
        {
            Configuration = configuration;
            Environment = env;
        }

        public IConfiguration Configuration { get; }

        // This method gets called by the runtime. Use this method to add services to the container.
        public void ConfigureServices(IServiceCollection services)
        {
            // Database connection based on current environment
            if (Environment.IsProduction())
            {
                services.AddDbContext<DataContext>(options =>
                // Docker
                //options.UseNpgsql("Host=postgres;Database=seea;Username=postgres;Password=123"));
                // AWS RDS
                options.UseNpgsql("Host=scheduler.cym7tqfeyz7n.us-east-1.rds.amazonaws.com;Database=scheduler;Username=vreyesm;Password=putaclaveqla"));
            }
            else
            {
                services.AddDbContext<DataContext>(options =>
                options.UseNpgsql("Host=localhost;Database=scheduler;Username=postgres;Password=123"));
            }


            // In production, the Angular files will be served from this directory
            services.AddSpaStaticFiles(configuration =>
            {
                configuration.RootPath = "Client/dist/Client";
            });

            services.AddMvc().SetCompatibilityVersion(CompatibilityVersion.Version_2_2);
        }

        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IHostingEnvironment env)
        {
            if (env.IsDevelopment())
            {
                app.UseDeveloperExceptionPage();
            }
            else
            {
                app.UseHsts();
            }

            // app.UseHttpsRedirection();
            app.UseMvc();

            if (env.IsProduction())
            {
                app.UseStaticFiles();
                app.UseSpaStaticFiles();

                app.UseSpa(spa =>
                {
                    spa.Options.SourcePath = "Client";
                    if (env.IsDevelopment())
                    {
                        spa.UseAngularCliServer(npmScript: "start");
                    }
                });
            }

        }
    }
}

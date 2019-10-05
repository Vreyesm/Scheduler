using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;
using Microsoft.Extensions.Hosting;
using Microsoft.Extensions.Logging;
using Scheduler.Controllers;
using Scheduler.Data;
using Scheduler.Models;

namespace Scheduler.Services {
    public class RequestService : IHostedService, IDisposable {
        private readonly IServiceScopeFactory _scopeFactory;
        private Timer _timer;
        private readonly ILogger<RequestService> _logger;

        public RequestService (ILogger<RequestService> logger, IServiceScopeFactory scopeFactory) {
            _logger = logger;
            _scopeFactory = scopeFactory;
        }

        public Task StartAsync (CancellationToken cancellationToken) {
            double TimeOfExecution = 3;

            DateTime now = DateTime.Now;
            DateTime today3am = now.Date.AddHours (TimeOfExecution);
            DateTime next3am = now <= today3am ? today3am : today3am.AddDays (1);

            _timer = new Timer (CheckRequestsExpiration, null, next3am - DateTime.Now, TimeSpan.FromHours (24));
            return Task.CompletedTask;
        }

        private void CheckRequestsExpiration (object state) {
            DateTime now = DateTime.Now;
            _logger.LogDebug ("Checking for outdated requests on: " + now.ToString ("MM/dd/yyyy HH:mm:ss"));

            using (var scope = _scopeFactory.CreateScope ()) {
                var dbContext = scope.ServiceProvider.GetRequiredService<DataContext> ();
                var requests = dbContext.AssignationRequests.Where (a => a.Special).ToList ();
                //DateTime now = new DateTime();

                foreach (AssignationRequest request in requests) {
                    if (request.Expiration < now) {
                        if (request.Accepted) {
                            Classroom c = request.Classroom;
                            Section s = request.Section;
                            c.MarkBLock (request.Day, request.Block, false);
                            s.MarkBLock (request.Day, request.Block, false);
                            Assignation assignation = request.Assignation;
                            dbContext.Entry (assignation.Classroom).State = EntityState.Modified;
                            dbContext.Entry (assignation.Section).State = EntityState.Modified;
                            dbContext.Assignations.Remove (assignation);
                        }

                        dbContext.AssignationRequests.Remove (request);
                    }
                }

                dbContext.SaveChanges ();
            }
        }

        public Task StopAsync (CancellationToken cancellationToken) {
            _timer.Change (Timeout.Infinite, 0);
            //_logger.LogDebug("SHUT DOWN");
            return Task.CompletedTask;
        }

        public void Dispose () {
            //throw new NotImplementedException();
        }
    }
}
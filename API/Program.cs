using API.Data;
using Microsoft.EntityFrameworkCore;
var MyAllowSpecificOrigins = "_myAllowSpecificOrigins"; 
var builder = WebApplication.CreateBuilder(args);

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();
builder.Services.AddDbContext<DataContext>(opt =>
{
    opt.UseSqlite(builder.Configuration.GetConnectionString("DefaultConnection"));
});
builder.Services.AddCors(options =>
{
    options.AddPolicy(name: MyAllowSpecificOrigins,
                      policy =>
                      {
                          policy.WithOrigins("http://localhost:4200");
                      });
});
var app = builder.Build();

// Configure the HTTP request pipeline.


app.UseHttpsRedirection();

app.UseAuthorization();

app.UseCors(MyAllowSpecificOrigins);
app.MapControllers();

app.Run();

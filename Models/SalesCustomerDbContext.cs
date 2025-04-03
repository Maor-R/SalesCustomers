using Microsoft.EntityFrameworkCore;

namespace SalesCustomer.Models
{
    public class SalesCustomerDbContext:DbContext
    {
        public SalesCustomerDbContext(DbContextOptions<SalesCustomerDbContext> options) : base(options)
        {}
            
        public DbSet<SalesCustomers> SalesCustomers { get; set; }
    }
}

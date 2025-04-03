#nullable disable
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Rendering;
using Microsoft.EntityFrameworkCore;
using SalesCustomer.Models;

namespace SalesCustomer.Controllers
{
    public class SalesCustomersController : Controller
    {
        private readonly SalesCustomerDbContext _context;

        public SalesCustomersController(SalesCustomerDbContext context)
        {
            _context = context;
        }

        // GET: SalesCustomers
        public async Task<IActionResult> Index()
        {
            return View(await _context.SalesCustomers.ToListAsync());
        }


        // GET: SalesCustomers/AddOrEdit
        public IActionResult AddOrEdit(int id = 0)
        {
            if (id == 0)
                return View(new SalesCustomers());
            else
                return View(_context.SalesCustomers.Find(id));
        }

        // POST: SalesCustomers/AddOrEdit
        // To protect from overposting attacks, enable the specific properties you want to bind to.
        // For more details, see http://go.microsoft.com/fwlink/?LinkId=317598.
        [HttpPost]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> AddOrEdit([Bind("CustomerID,CustomerName,BillToCustomerID,CustomerCategoryID," +
            "BuyingGroupID,PrimaryContactPersonID,AlternateContactPersonID,DeliveryMethodID,DeliveryCityID,PostalCityID, CreditLimit," +
            " AccountOpenedDate, StandardDiscountPercentage,IsStatementSent, IsOnCreditHold, PaymentDays, PhoneNumber, FaxNumber," +
            "DeliveryRun, RunPosition, WebsiteURL, DeliveryAddressLine1, DeliveryAddressLine2, DeliveryPostalCode" +
            ",PostalAddressLine1, PostalAddressLine2, PostalPostalCode, LastEditedBy, ValidFrom, ValidTo")] SalesCustomers customer)
        {
            if (ModelState.IsValid)
            {
                if (customer.CustomerID == 0)
                {
                    customer.AccountOpenedDate = DateTime.Now;
                    _context.Add(customer);
                }
                else
                    _context.Update(customer);
                await _context.SaveChangesAsync();
                return RedirectToAction(nameof(Index));
            }
            return View(customer);
        }


        // POST: SalesCustomers/Delete/5
        [HttpPost, ActionName("Delete")]
        [ValidateAntiForgeryToken]
        public async Task<IActionResult> DeleteConfirmed(int id)
        {
            var customer = await _context.SalesCustomers.FindAsync(id);
            _context.SalesCustomers.Remove(customer);
            await _context.SaveChangesAsync();
            return RedirectToAction(nameof(Index));
        }
    }
}

using System;
using System.Data.Entity.Spatial;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace SalesCustomer.Migrations
{
    public partial class InitialCreate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Sales.Customers",
                columns: table => new
                {
                    CustomerID = table.Column<int>(type: "int", nullable: false)
                        .Annotation("SqlServer:Identity", "1, 1"),
                    CustomerName = table.Column<string>(type: "nvarchar(100)", nullable: false),
                    BillToCustomerID = table.Column<int>(type: "int", nullable: false),
                    CustomerCategoryID = table.Column<int>(type: "int", nullable: false),
                    BuyingGroupID = table.Column<int>(type: "int", nullable: true),
                    PrimaryContactPersonID = table.Column<int>(type: "int", nullable: false),

                    AlternateContactPersonID = table.Column<int>(type: "int", nullable: true),
                    DeliveryMethodID = table.Column<int>(type: "int", nullable: false),
                    DeliveryCityID = table.Column<int>(type: "int", nullable: false),
                    PostalCityID = table.Column<int>(type: "int", nullable: false),
                    CreditLimit = table.Column<decimal>(type: "decimal(18, 2)", nullable: true),
                    AccountOpenedDate = table.Column<DateTime>(type: "date", nullable: false),
                    StandardDiscountPercentage = table.Column<decimal>(type: "decimal(18, 3)", nullable: false),
                    IsStatementSent = table.Column<bool>(type: "bit", nullable: false),
                    IsOnCreditHold = table.Column<bool>(type: "bit", nullable: false),
                    PaymentDays = table.Column<int>(type: "int", nullable: false),

                    PhoneNumber = table.Column<string>(type: "nvarchar(20)", nullable: false),
                    FaxNumber = table.Column<string>(type: "nvarchar(20)", nullable: false),
                    DeliveryRun = table.Column<string>(type: "nvarchar(5)", nullable: true),

                    RunPosition = table.Column<string>(type: "nvarchar(5)", nullable: true),
                    WebsiteURL = table.Column<string>(type: "nvarchar(256)", nullable: false),
                    DeliveryAddressLine1 = table.Column<string>(type: "nvarchar(60)", nullable: false),
                    DeliveryAddressLine2 = table.Column<string>(type: "nvarchar(60)", nullable: true),

                    PostalAddressLine1 = table.Column<string>(type: "nvarchar(60)", nullable: false),
                    PostalAddressLine2 = table.Column<string>(type: "nvarchar(60)", nullable: true),
                    PostalPostalCode = table.Column<string>(type: "nvarchar(10)", nullable: false),
                    LastEditedBy = table.Column<int>(type: "int", nullable: false),
                    ValidFrom = table.Column<DateTime>(type: "datetime2", nullable: false),
                    ValidTo = table.Column<DateTime>(type: "datetime2", nullable: false),
     
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Sales.Customers", x => x.CustomerID);
                });
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Sales.Customers");
        }
    }
}

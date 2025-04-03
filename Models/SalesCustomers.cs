using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Data.Entity.Spatial;

namespace SalesCustomer.Models
{
    public class SalesCustomers
    {
        [Key]
        public int CustomerID { get; set; }

        [Column(TypeName ="nvarchar(100)")]
        [MaxLength(100,ErrorMessage ="Maximum 100 characters only.")]
        public string CustomerName { get; set; }

        public int BillToCustomerID { get; set; }
        public int CustomerCategoryID { get; set; }
        public int BuyingGroupID { get; set; }
        public int PrimaryContactPersonID { get; set; }
        public int AlternateContactPersonID { get; set; }
        public int DeliveryMethodID { get; set; }
        public int DeliveryCityID { get; set; }
        public int PostalCityID { get; set; }

        [RegularExpression(@"^(0|-?\d{0,16}(\.\d{0,2})?)$")]
        public decimal CreditLimit { get; set; }

        public DateTime AccountOpenedDate { get; set; }

        [RegularExpression(@"^(0|-?\d{0,16}(\.\d{0,3})?)$")]
        public decimal StandardDiscountPercentage { get; set; }

        public bool IsStatementSent { get; set; }
        public bool IsOnCreditHold { get; set; }

        public int PaymentDays { get; set; }


        [Column(TypeName = "nvarchar(20)")]
        [MaxLength(20, ErrorMessage = "Maximum 20 characters only.")]
        public string PhoneNumber { get; set; }

        [Column(TypeName = "nvarchar(20)")]
        [MaxLength(20, ErrorMessage = "Maximum 20 characters only.")]
        public string FaxNumber { get; set; }

        [Column(TypeName = "nvarchar(5)")]
        [MaxLength(5, ErrorMessage = "Maximum 5 characters only.")]
        public string DeliveryRun { get; set; }

        [Column(TypeName = "nvarchar(5)")]
        [MaxLength(5, ErrorMessage = "Maximum 5 characters only.")]
        public string RunPosition { get; set; }


        [Column(TypeName = "nvarchar(256)")]
        [MaxLength(256, ErrorMessage = "Maximum 256 characters only.")]
        public string WebsiteURL { get; set; }


        [Column(TypeName = "nvarchar(60)")]
        [MaxLength(60, ErrorMessage = "Maximum 60 characters only.")]
        public string DeliveryAddressLine1 { get; set; }


        [Column(TypeName = "nvarchar(60)")]
        [MaxLength(60, ErrorMessage = "Maximum 60 characters only.")]
        public string DeliveryAddressLine2 { get; set; }

        [Column(TypeName = "nvarchar(60)")]
        [MaxLength(60, ErrorMessage = "Maximum 60 characters only.")]
        public string DeliveryPostalCode { get; set; }

   

        [Column(TypeName = "nvarchar(60)")]
        [MaxLength(60, ErrorMessage = "Maximum 60 characters only.")]
        public string PostalAddressLine1 { get; set; }

        [Column(TypeName = "nvarchar(60)")]
        [MaxLength(60, ErrorMessage = "Maximum 60 characters only.")]
        public string PostalAddressLine2 { get; set; }

        [Column(TypeName = "nvarchar(10)")]
        [MaxLength(10, ErrorMessage = "Maximum 10 characters only.")]
        public string PostalPostalCode { get; set; }

        public int LastEditedBy { get; set; }
        public DateTime ValidFrom { get; set; }
        public DateTime ValidTo { get; set; }



    }
}

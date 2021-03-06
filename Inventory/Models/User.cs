using System;
using System.Collections.Generic;

namespace Inventory.Models
{
    public partial class User
    {
        public User()
        {
            Orders = new HashSet<Order>();
        }

        public int Id { get; set; }
        public string? FirstName { get; set; }
        public string? LastName { get; set; }
        public string? Address { get; set; }
        public string? Email { get; set; }
        public int? Phone { get; set; }

        public virtual ICollection<Order> Orders { get; set; }
    }
}

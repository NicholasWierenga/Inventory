using System;
using System.Collections.Generic;

namespace Inventory.Models
{
    public partial class ProductInv
    {
        public int Id { get; set; }
        public string? ProductName { get; set; }
        public int? OnHand { get; set; }
        public int? Sales { get; set; }
        public string? ItemId { get; set; }
    }
}

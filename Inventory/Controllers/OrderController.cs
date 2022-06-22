using Inventory.Models;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class OrderController : ControllerBase
    {
        readonly InventoryContext inventoryContext = new InventoryContext();

        [HttpGet("showAllOrders")]
        public List<Order> showAllOrders()
        {
            return inventoryContext.Orders.ToList();
        }

        [HttpPost("createOrder")]
        public void createOrder(Order newOrder)
        {
            inventoryContext.Orders.Add(newOrder);
            inventoryContext.SaveChanges();
        }

        [HttpPost("createUser")]
        public void createUser(User newUser)
        {
            inventoryContext.Users.Add(newUser);
            inventoryContext.SaveChanges();
        }

        [HttpDelete("deleteOrder/{id}")]
        public void deleteOrder(int id) 
        {
            inventoryContext.Remove(inventoryContext.Orders.Find(id));
            inventoryContext.SaveChanges();
        }

        [HttpPut("updateOrder/{id}")]
        public string updateOrder(int id, Order updatedOrder)
        {
            Order o = inventoryContext.Orders.Find(id);

            o.Quantity = updatedOrder.Quantity;
            o.OrderDate = updatedOrder.OrderDate;

            inventoryContext.Orders.Update(o);
            inventoryContext.SaveChanges();
            return $"Order at id of {o.OrderId} has been updated.";
        }
        [HttpGet("getOrdersByUserId/{id}")]
        public List<Order> getOrdersByUserId(int id)
        {
            List<Order> orders = inventoryContext.Orders.Where(o => o.UserId == id).ToList();
            return orders;
        }
    }
}

using Inventory.Models;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        readonly InventoryContext inventoryContext = new InventoryContext();

        [HttpGet("showAllUsers")]
        public List<User> showAllUsers()
        {
            return inventoryContext.Users.ToList();
        }

        [HttpPost("createUser")]
        public void createUser(User newUser)
        {
            inventoryContext.Users.Add(newUser);
            inventoryContext.SaveChanges();
        }

        [HttpDelete("deleteUser/{id}")]
        public void deleteUser(int id) // This isn't used anywhere and can be deleted if we want.
        {
            inventoryContext.Remove(inventoryContext.Users.Find(id));
            inventoryContext.SaveChanges();
        }
    }
}

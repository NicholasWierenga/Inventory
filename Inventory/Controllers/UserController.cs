using Inventory.Models;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class UserController : ControllerBase
    {
        readonly InventoryContext inventoryContext = new InventoryContext();

        // We call this for when we add a new user to add it to the end of allUsers array.
        // This avoids constantly calling the DB for all users just to get the one new one.
        [HttpGet("newestUser")]
        public User newestUser() 
        {
            return inventoryContext.Users.ToList().Last();
        }

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
            inventoryContext.Users.Remove(inventoryContext.Users.Find(id));
            inventoryContext.SaveChanges();
        }
    }
}

using Inventory.Models;
using Microsoft.AspNetCore.Mvc;
using LocationExtra;

namespace Inventory.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class LocationController : ControllerBase
    {
        KrogerDal api = new KrogerDal();

        // We need to get location information because the search does not itself
        [HttpGet("getLocation/{locationID}")] 
        public Location getLocation(string locationID)
        {
            return api.getLocation(locationID);
        }
    }
}

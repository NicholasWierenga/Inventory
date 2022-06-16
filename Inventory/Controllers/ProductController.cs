﻿using GC_Cars_Web_App.Models;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        KrogerDal api = new KrogerDal();

        [HttpGet("SearchProducts/&{term}&{locationId}&{productId}&{brand}&{fulfillment}&{limit}")]
        public Product SearchProducts(string term, string locationId, string productId , string brand, string fulfillment, int limit = -1)
        { // TODO - think about making a new object that holds an product object and quantity remaining, sales figures for past 7, etc.
          // so we would want to return something looking like List<Object(Product, quantity remaining, sales figures)>
          // we need to get the database products table going then we can call in the db table and merge it with the Product list we get here.

            return api.SearchProducts(term, locationId, productId, brand, fulfillment, limit); // This is just to see if we can talk to the API.
        }
    }
}
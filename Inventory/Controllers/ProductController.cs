using Inventory.Models;
using Microsoft.AspNetCore.Mvc;

namespace Inventory.Controllers
{
    [ApiController]
    [Route("[controller]")]
    public class ProductController : ControllerBase
    {
        KrogerDal api = new KrogerDal();
        readonly InventoryContext inventoryContext = new InventoryContext();

        [HttpGet("SearchProducts/&{term}&{locationId}&{productId}&{brand}")]
        public Product SearchProducts(string term, string locationId, string productId , string brand)
        { // TODO - think about making a new object that holds an product object and quantity remaining, sales figures for past 7, etc.
          // so we would want to return something looking like List<Object(Product, quantity remaining, sales figures)>
          // we need to get the database products table going then we can call in the db table and merge it with the Product list we get here.

            return api.SearchProducts(term, locationId, productId, brand);
        }

        [HttpGet("showAllProducts")]
        public List<ProductInv> showAllProducts()
        {
            return inventoryContext.Products.ToList();
        }

        [HttpPost("createProduct")]
        public void createProduct(ProductInv newProduct)
        {
            inventoryContext.Products.Add(newProduct);
            inventoryContext.SaveChanges();
        }

        [HttpDelete("deleteProduct/{id}")]
        public void deleteProduct(int id) // This isn't used anywhere and can be deleted if we want.
        {
            inventoryContext.Remove(inventoryContext.Products.Find(id));
            inventoryContext.SaveChanges();
        }
        
        [HttpPost("updateProduct/{id}")]
        public string updateProduct(int id, ProductInv updatedProduct)
        {
            ProductInv p = inventoryContext.Products.Find(id);
            p.ProductName = updatedProduct.ProductName;
            p.OnHand = updatedProduct.OnHand;
            p.LowQuant = updatedProduct.LowQuant;
            p.Description = updatedProduct.Description;
            p.Sales = updatedProduct.Sales;

            inventoryContext.Update(p);
            inventoryContext.SaveChanges();
            return $"{p.ProductName} has been updated.";
        }
    }
}
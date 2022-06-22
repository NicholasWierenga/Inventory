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
        public Product SearchProducts(string term, string locationId, string productId, string brand)
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

        [HttpPost("createProductInvs")]
        public void createProductInv(ProductInv newProductInvs)
        {
            inventoryContext.Products.Add(newProductInvs);
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
            ProductInv productInv = inventoryContext.Products.Find(id);
            productInv.ProductName = updatedProduct.ProductName;
            productInv.OnHand = updatedProduct.OnHand;
            productInv.Sales = updatedProduct.Sales;
            productInv.ItemId = updatedProduct.ItemId;

            inventoryContext.Products.Update(productInv);
            inventoryContext.SaveChanges();
            return $"{productInv.ProductName} has been updated.";
        }
    }
}
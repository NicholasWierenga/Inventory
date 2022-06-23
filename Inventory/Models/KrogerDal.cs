using System.Net;
using LocationExtra;
using Newtonsoft.Json;
using Newtonsoft.Json.Linq;
using RestSharp;
using TypeMerger;

namespace Inventory.Models
{
    public class KrogerDal
    {
        public Token GetToken() // We need to get a new token using our credentials to use the API.
        {
            var client = new RestClient("https://api.kroger.com/v1/connect/oauth2/token");

            var request = new RestRequest();
            request.Method = Method.Post;
            request.Timeout = -1;
            request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
            request.AddHeader("Cache-Control", "no-cache");
            request.AddParameter("grant_type", "client_credentials");
            request.AddParameter("client_id", "inventory4-cb1553e29211093b11e9438d9967dbda392671584998637784");
            request.AddParameter("client_secret", "Kxc-8oZKoKfE7dq5EGwteVG2B7aVOs132-Y85oUU"); // remember to move this to a secret file later.
            request.AddParameter("scope", "product.compact profile.compact");
            
            RestResponse response = client.Execute<Token>(request);

            // response.content gives a big string of a JSON object, one bit is called access_token, which is the only thing we want
            return JsonConvert.DeserializeObject<Token>(response.Content);
        }

        public string CallAPI(string endpoint)
        {
            Token token = GetToken();

            string url = "https://api.kroger.com/v1/" + endpoint;

            var client = new RestClient(url);

            var request = new RestRequest();
            request.Method = Method.Get;

            request.AddHeader("Cache-Control", "no-cache");
            request.AddHeader("Authorization", "Bearer " + token.access_token);

            RestResponse response = client.Execute(request);
            
            return response.Content;
        }

        public Product SearchProducts(string term, string locationId, string productId, string brand)
        {
            int startAt = 0;
            string url = "products?";

            if (term != "emptyString")
                url += $"&filter.term={term}";

            if (locationId != "emptyString")
                url += $"&filter.locationId={locationId}";

            if (productId != "emptyString")
                url += $"&filter.productId={productId}";

            if (brand != "emptyString")
                url += $"&filter.brand={brand}";

            url += $"&filter.limit=50";
            var jObjectResult = new JObject();
            string result = CallAPI(url); // filter.start skips the first startAt products in the search. The min is 1 and max it can skip is 1000.

            while (startAt < 250) // TODO: Insert a break if the CallAPI starts returning nothing.
            {
                startAt += 50; // We can get a response containing 50 products at most, so that's why we have to keep looping until we hit 250.
                JObject jObject = JObject.Parse(result);
                jObjectResult.Merge(jObject); // Merges our json strings together.

                result = CallAPI(url + $"&filter.start={startAt}");
            }

            Product searchedProducts = JsonConvert.DeserializeObject<Product>(jObjectResult.ToString());

            return searchedProducts;
        }

        public Location getLocation(string locationId)
        {
            string url = $"locations/{locationId}";

            string result = CallAPI(url);

            Location location = JsonConvert.DeserializeObject<Location>(result);

            return location;
        }
    }
}

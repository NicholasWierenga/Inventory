using System.Net;
using Newtonsoft.Json;
using RestSharp;

namespace GC_Cars_Web_App.Models
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
            //request.AddHeader("Authorization", "Basic base64(inventory4-cb1553e29211093b11e9438d9967dbda392671584998637784:Kxc-8oZKoKfE7dq5EGwteVG2B7aVOs132-Y85oUU)");
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
            Console.WriteLine(response.Content);
            
            return response.Content;
        }

        public Product SearchProducts(string term, string locationId, string productId, string brand, string fulfillment, int limit)
        {
            string url = "products?";

            if (term != "emptyString") 
                url += $"&filter.term={term}";

            if (locationId != "emptyString")
                url += $"&filter.locationId={locationId}";

            if (productId != "emptyString")
                url += $"&filter.productId={productId}";

            if (brand != "emptyString")
                url += $"&filter.brand={brand}";

            if (fulfillment != "emptyString")
                url += $"&filter.fulfillment={fulfillment}";

            if (limit != -1)
                url += $"&filter.limit={limit}";

            string result = CallAPI(url);

            Product searchedProducts = JsonConvert.DeserializeObject<Product>(result);

            return searchedProducts;
        }

        public string CallAPI2(string endpoint) // I'm keeping this to look at.
        {
            string url = "https://localhost:7103/GC_Dealership/" + endpoint;
            Console.WriteLine(url);
            HttpWebRequest request = WebRequest.CreateHttp(url);
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();


            StreamReader rd = new StreamReader(response.GetResponseStream());

            string JSON = rd.ReadToEnd();

            return JSON;
        }

        // The API Docs said that refreshing tokens was a thing and that there was supposed to be a refresh_token in our response JSON above, but there isn't one.
        // I think they removed that feature, because tokens last a lot shorter than they did than what the doc examples suggest.
        // The code below is to refresh a token. We're keeping it for if I misunderstood something and there actually is a refresh_token somewhere.
        // We get a new token every time we make an API call instead, which could be fixed by keeping track of when the token was generated and making
        // a new token once it passes the 30 minute mark.

        //public void RefreshToken() // The token only lasts for so long, so we'll need to refresh it over the programs lifetime.
        //{ kroger API lies, refreshing isn't a thing
        //    var client = new RestClient("https://api.kroger.com/v1/connect/oauth2/token");

        //    var request = new RestRequest("resource", Method.Post);
        //    request.Timeout = -1;
        //    request.AddHeader("Content-Type", "application/x-www-form-urlencoded");
        //    //request.AddHeader("Authorization", "Basic base64(inventory4-cb1553e29211093b11e9438d9967dbda392671584998637784:Kxc-8oZKoKfE7dq5EGwteVG2B7aVOs132-Y85oUU)");
        //    request.AddHeader("Cache-Control", "no-cache"); // maybe get rid of
        //    request.AddParameter("grant_type", $"refresh_token&refresh_token={token}");
        //    request.AddParameter("client_id", "inventory4-cb1553e29211093b11e9438d9967dbda392671584998637784");
        //    request.AddParameter("client_secret", "Kxc-8oZKoKfE7dq5EGwteVG2B7aVOs132-Y85oUU"); // remember to move this to a secret file later.

        //    RestResponse response = client.Execute(request);
        //    Console.WriteLine(response.Content);

        //    token = JObject.Parse(response.Content)["access_token"].ToString();
        //}
    }
}

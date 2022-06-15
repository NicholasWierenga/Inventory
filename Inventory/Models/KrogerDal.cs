using Newtonsoft.Json;
using System.Net;

namespace GC_Cars_Web_App.Models
{
    public class KrogerDal
    {
        public string CallAPI(string endpoint)
        {
            string url = "https://localhost:7103/GC_Dealership/" + endpoint;
            Console.WriteLine(url);
            HttpWebRequest request = WebRequest.CreateHttp(url);
            HttpWebResponse response = (HttpWebResponse)request.GetResponse();

            StreamReader rd = new StreamReader(response.GetResponseStream());

            string JSON = rd.ReadToEnd();

            return JSON;
        }

        public List<Car> GetCars()
        {
            string result = CallAPI("AllCars");

            List<Car> cars = JsonConvert.DeserializeObject<List<Car>>(result);

            return cars;
        }

        public List<Car> SearchForCars(string Make, string Model, int Year, string Color)
        {
            string result = CallAPI($"SearchForCar/{Make}&{Model}&{Year}&{Color}");

            List<Car> cars = JsonConvert.DeserializeObject<List<Car>>(result);

            return cars;
        }
    }
}

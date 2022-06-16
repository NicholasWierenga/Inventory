public class Product
{
    public Datum[] data { get; set; }
    public Meta meta { get; set; }
}

public class Meta
{
    public Pagination pagination { get; set; }
}

public class Pagination
{
    public int start { get; set; }
    public int limit { get; set; }
    public int total { get; set; }
}

public class Datum
{
    public string productId { get; set; }
    public string upc { get; set; }
    public Aislelocation[] aisleLocations { get; set; }
    public string brand { get; set; }
    public string[] categories { get; set; }
    public string countryOrigin { get; set; }
    public string description { get; set; }
    public Image[] images { get; set; }
    public Item[] items { get; set; }
    public Iteminformation itemInformation { get; set; }
    public Temperature temperature { get; set; }
}

public class Iteminformation
{
    public string depth { get; set; }
    public string height { get; set; }
    public string width { get; set; }
}

public class Temperature
{
    public string indicator { get; set; }
    public bool heatSensitive { get; set; }
}

public class Aislelocation
{
    public string bayNumber { get; set; }
    public string description { get; set; }
    public string number { get; set; }
    public string numberOfFacings { get; set; }
    public string side { get; set; }
    public string shelfNumber { get; set; }
    public string shelfPositionInBay { get; set; }
}

public class Image
{
    public string perspective { get; set; }
    public Size[] sizes { get; set; }
    public bool featured { get; set; }
}

public class Size
{
    public string size { get; set; }
    public string url { get; set; }
}

public class Item
{
    public string itemId { get; set; }
    public bool favorite { get; set; }
    public Fulfillment fulfillment { get; set; }
    public Price price { get; set; }
    public string size { get; set; }
    public string soldBy { get; set; }
}

public class Fulfillment
{
    public bool curbside { get; set; }
    public bool delivery { get; set; }
    public bool inStore { get; set; }
    public bool shipToHome { get; set; }
}

public class Price
{
    public float regular { get; set; }
    public float promo { get; set; }
}

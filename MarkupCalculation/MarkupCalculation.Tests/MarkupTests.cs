using System;
using MarkupCalculation;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using Microsoft.VisualStudio.TestTools.UnitTesting;

namespace MarkupCalculation.Tests
{
    [TestClass]
    public class MarkupTests
    {
        [TestMethod]
        public void SuccessTest()
        {
            Itinerary published = new Itinerary();
            published.Airline = "SkyTravel";
            published.BaseFareInUSD = 140;
            published.DestinationAirportCode = "NYC";
            published.FlightTime = TimeSpan.Parse("2:0:0");
            published.MarkupInUSD = 0;
            published.NumberOfStops = 2;
            published.OriginAirportCode = "WAS";
            published.TotalLayoverTime = TimeSpan.Parse("2:12:14");
            published.UtcArrivalTime = DateTime.UtcNow;
            published.UtcDepartureTime = DateTime.UtcNow + TimeSpan.Parse("1:0:0");

            List<Itinerary> discounted = new List<Itinerary>();
            for (int i = 0; i < 10; i++)
            {
                Itinerary test = new Itinerary();
                test.Airline = "SkyTravel";
                test.BaseFareInUSD = published.BaseFareInUSD - 25 - i;
                test.DestinationAirportCode = "NYC";
                test.FlightTime = TimeSpan.Parse("1:"+i*5+":0");
                test.MarkupInUSD = i + 10;
                test.NumberOfStops = (int)(i / 3);
                test.OriginAirportCode = "WAS";
                test.TotalLayoverTime = published.TotalLayoverTime - TimeSpan.Parse("0:" + i*5 + ":0");
                test.UtcArrivalTime = DateTime.UtcNow;
                test.UtcDepartureTime = DateTime.UtcNow + TimeSpan.Parse("1:0:0");
                discounted.Add(test);
            }

            List<bool> businessRulesSuccess = null;

            foreach (var element in discounted)
            {
                businessRulesSuccess.Add(BusinessRulesTests.IsFewerStops(published,element));
                businessRulesSuccess.Add(BusinessRulesTests.IsFlightShorter(published, element));
                businessRulesSuccess.Add(BusinessRulesTests.IsShorterLayover(published,element));
                businessRulesSuccess.Add(BusinessRulesTests.IsMarkupAppropriate(element));
                businessRulesSuccess.Add(BusinessRulesTests.IsRateRelevant(published,element));
                businessRulesSuccess.Add(BusinessRulesTests.IsItineraryValid(published,element));
            }
            Assert.IsFalse(businessRulesSuccess.Contains(false));
        }
    }
}

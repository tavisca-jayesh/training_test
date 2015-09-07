using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;

namespace MarkupCalculation
{
    public class BusinessRulesTests
    {
        public static bool IsFewerStops(Itinerary published, Itinerary element)
        {
            var _ret_val = false;
            if (published == null || element == null)
                throw new ArgumentNullException("The argument passed is null");
            _ret_val = published.NumberOfStops > element.NumberOfStops;
            return _ret_val;
        }

        public static bool IsFlightShorter(Itinerary published, Itinerary element)
        {
            var _ret_val = false;
            if (published == null || element == null)
                throw new ArgumentNullException("The argument passed is null");
            _ret_val = published.FlightTime > element.FlightTime;
            return _ret_val;
        }

        public static bool IsShorterLayover(Itinerary published, Itinerary element)
        {
            var _ret_val = false;
            if (published == null || element == null)
                throw new ArgumentNullException("The argument passed is null");
            _ret_val = published.TotalLayoverTime > element.TotalLayoverTime;
            return _ret_val;
        }

        public static bool IsMarkupAppropriate(Itinerary element)
        {
            var _ret_val = false;
            if (element == null)
                throw new ArgumentNullException("The argument passed is null");
            _ret_val = element.MarkupInUSD > 10;
            return _ret_val;
        }

        public static bool IsRateRelevant(Itinerary published, Itinerary element)
        {
            var _ret_val = false;
            if (published == null || element == null)
                throw new ArgumentNullException("The argument passed is null");
            _ret_val = published.TotalFareInUSD - element.TotalFareInUSD > 15;
            return _ret_val;
        }

        public static bool IsItineraryValid(Itinerary published, Itinerary element)
        {
            var _ret_val = false;
            if (published == null || element == null)
                throw new ArgumentNullException("The argument passed is null");

            _ret_val = published.NumberOfStops < element.NumberOfStops;
            return _ret_val;
        }
    }
}

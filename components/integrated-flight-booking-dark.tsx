
"use client";

import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Calendar, Search, ArrowLeft, Plane, X, Check } from "lucide-react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Command, CommandEmpty, CommandGroup, CommandInput, CommandItem } from "@/components/ui/command";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css"; 
import { motion } from "framer-motion";
import airportData from "../public/airports.json"; // Adjust this path according to your structure
import Image from "next/image";
interface Airport {
  name: string;
  code: string;
  city: string;
  country: string;
}

interface Flight {
  id: string;
  airline: string;
  flightNumber: string;
  departure: string;
  arrival: string;
  duration: string;
  stops: string;
  price: string;
}

interface FlightDetails {
  outbound: {
    date: string;
    from: string;
    to: string;
    airline: string;
    flightNumber: string;
    aircraft: string;
    duration: string;
    departureTime: string;
    arrivalTime: string;
  };
  inbound: {
    date: string;
    from: string;
    to: string;
    airline: string;
    flightNumber: string;
    aircraft: string;
    duration: string;
    departureTime: string;
    arrivalTime: string;
  };
  layover?: {
    duration: string;
  };
}
const airports: Airport[] = [
  {
    "name": "Indira Gandhi International Airport",
    "code": "DEL",
    "city": "New Delhi",
    "country": "India"
  },
  {
    "name": "Chhatrapati Shivaji Maharaj International Airport",
    "code": "BOM",
    "city": "Mumbai",
    "country": "India"
  },
  {
    "name": "John F. Kennedy International Airport",
    "code": "JFK",
    "city": "New York",
    "country": "United States"
  },
  {
    "name": "Dubai International Airport",
    "code": "DXB",
    "city": "Dubai",
    "country": "United Arab Emirates"
  },
  {
    "name": "Heathrow Airport",
    "code": "LHR",
    "city": "London",
    "country": "United Kingdom"
  },
  {
    "name": "Singapore Changi Airport",
    "code": "SIN",
    "city": "Singapore",
    "country": "Singapore"
  },
  {
    "name": "Los Angeles International Airport",
    "code": "LAX",
    "city": "Los Angeles",
    "country": "United States"
  },
  {
    "name": "Beijing Capital International Airport",
    "code": "PEK",
    "city": "Beijing",
    "country": "China"
  },
  {
    "name": "Sydney Kingsford Smith International Airport",
    "code": "SYD",
    "city": "Sydney",
    "country": "Australia"
  },
  {
    "name": "Tokyo Haneda Airport",
    "code": "HND",
    "city": "Tokyo",
    "country": "Japan"
  }
]

const flightData: Flight[] = [
  { id: "1", airline: "Emirates", flightNumber: "AT 4324", departure: "9:45 AM", arrival: "11:45 AM", duration: "2h 10min", stops: "Non stop", price: "AED 2,456.90" },
  { id: "2", airline: "Lufthansa", flightNumber: "AT 4534", departure: "11:45 PM", arrival: "6:45 AM", duration: "4h 10min", stops: "2 stops", price: "AED 2,456.90" },
  { id: "3", airline: "Emirates", flightNumber: "AT 4324", departure: "9:45 AM", arrival: "11:45 AM", duration: "7h 10min", stops: "1 stop", price: "AED 1,456.90", },
  { id: "4", airline: "Emirates", flightNumber: "AT 4324", departure: "11:45 PM", arrival: "6:45 AM", duration: "19h 10min", stops: "1 stop", price: "AED 1,456.90" },
  { id: "5", airline: "Lufthansa", flightNumber: "AT 4324", departure: "9:45 AM", arrival: "11:45 AM", duration: "7h 10min", stops: "Non stop", price: "AED 1,456.90"},
  { id: "6", airline: "Lufthansa", flightNumber: "AT 4324, Indigo • 6E 783", departure: "11:45 PM", arrival: "6:45 AM", duration: "4h 10min", stops: "Non stop", price: "AED 1,456.90" },
]




const sampleFlightDetails: FlightDetails = {
  outbound: {
    date: "Sat 28 Sept",
    from: "DXB • Dubai International Airport",
    to: "JFK • John F. Kennedy International Airport",
    airline: "Emirates",
    flightNumber: "EK202",
    aircraft: "Economy • Boeing 777",
    duration: "14h 30m",
    departureTime: "2:15 PM",
    arrivalTime: "8:45 AM",
  },
  inbound: {
    date: "Mon 30 Sept",
    from: "JFK • John F. Kennedy International Airport",
    to: "DXB • Dubai International Airport",
    airline: "Emirates",
    flightNumber: "EK203",
    aircraft: "Economy • Boeing 777",
    duration: "14h 45m",
    departureTime: "9:15 PM",
    arrivalTime: "5:00 PM",
  },
  layover: {
    duration: "2h 30m"
  }
};

// Get airline logo based on airline name
const getAirlineLogo = (airline: string) => {
  switch (airline) {
    case 'Emirates':
      return '/images/emirates-logo.png'; 
    case 'Lufthansa':
      return '/images/lufthansa-logo.png'; 
    default:
      return '/placeholder.svg'; 
  }
};

// Airport selection component
const AirportSelect = ({
  value,
  onChange,
  label,
  placeholder,
  airports,
}: {
  value: string;
  onChange: (value: string) => void;
  label: string;
  placeholder: string;
  airports: Airport[];
}) => (
  <div className="space-y-2">
    <Label htmlFor={label} className="text-gray-300">{label}</Label>
    <Popover>
      <PopoverTrigger asChild>
        <Button
          variant="outline"
          role="combobox"
          className="w-full justify-between bg-gray-700/50 border-gray-600 text-white hover:bg-gray-600/50 hover:text-white"
        >
          {value ? airports.find((airport) => airport.code === value)?.city || placeholder : placeholder}
          <span className="ml-2 h-4 w-4 shrink-0 opacity-50">&#9660;</span>
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-full p-0 bg-gray-800 border-gray-700">
        <Command>
          <CommandInput placeholder="Search airport..." className="text-gray-200" />
          <CommandEmpty>No airport found.</CommandEmpty>
          <CommandGroup>
            {/* {Array.isArray(airports) && airports.length > 0 ? (
              airports.map((airport) => ( */}
                         {airports?.length > 0 ? ( // Add a check here
              airports.map((airport) => (
                <CommandItem
                  key={airport.code}
                  onSelect={() => onChange(airport.code)}
                  className="text-gray-200 hover:bg-gray-700"
                >
                  <div className="flex justify-between w-full">
                    <span>{airport.city}</span>
                    <span className="text-gray-400">{airport.code}</span>
                  </div>
                  <p className="text-sm text-gray-400">{airport.name}</p>
                </CommandItem>
              ))
            ) : (
              <CommandEmpty>No airports available.</CommandEmpty>
            )}
          </CommandGroup>
        </Command>
      </PopoverContent>
    </Popover>
  </div>
);

// Loading Animation Component
const LoadingAnimation = ({ searchProgress }: { searchProgress: number }) => (
  <div className="fixed inset-0 bg-black/50 backdrop-blur-sm flex items-center justify-center z-50">
    <Card className="w-80 bg-gray-900 border-gray-800">
      <CardContent className="p-6 space-y-4">
        <div className="flex justify-between items-center">
          <div className="text-sm font-medium text-gray-400">Searching for flights...</div>
          <X className="text-gray-500 cursor-pointer" size={20} />
        </div>
        <div className="flex justify-center">
          <motion.div
            className="w-12 h-12"
            animate={{
              y: [0, -10, 0],
              rotate: [0, -5, 5, 0],
            }}
            transition={{
              duration: 3,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          >
            <svg viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M21.75 12L3 3L5.25 12L3 21L21.75 12Z" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
            </svg>
          </motion.div>
        </div>
        <div className="space-y-2">
          <LoadingStep label="Searching 400+ flights" isComplete={searchProgress >= 33} isInProgress={searchProgress < 33} />
          <LoadingStep label="Attaching company rules" isComplete={searchProgress >= 66} isInProgress={searchProgress >= 33 && searchProgress < 66} />
          <LoadingStep label="Serving best results" isComplete={searchProgress >= 100} isInProgress={searchProgress >= 66 && searchProgress < 100} />
        </div>
      </CardContent>
    </Card>
  </div>
);

const LoadingStep = ({ label, isComplete, isInProgress }: { label: string; isComplete: boolean; isInProgress: boolean }) => (
  <div className="flex items-center space-x-2">
    {isComplete ? (
      <Check className="text-green-500" size={20} />
    ) : isInProgress ? (
      <motion.div
        className="w-5 h-5 border-2 border-blue-500 border-t-transparent rounded-full"
        animate={{ rotate: 360 }}
        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
      />
    ) : (
      <div className="w-5 h-5 border-2 border-gray-600 rounded-full" />
    )}
    <span className={`text-sm ${isComplete || isInProgress ? 'text-gray-200' : 'text-gray-400'}`}>{label}</span>
  </div>
);

export function IntegratedFlightBookingDark() {
  const [isLoading, setIsLoading] = useState(false);
  const [showResults, setShowResults] = useState(false);
  const [showFlightDetails, setShowFlightDetails] = useState(false);
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  const [departureDate, setDepartureDate] = useState<Date | null>(null); // Separate for departure
  const [returnDate, setReturnDate] = useState<Date | null>(null); // Separate for return
  const [searchProgress, setSearchProgress] = useState(0);
  const [airports, setAirports] = useState<Airport[]>(airportData.airports); // Use imported JSON data directly
  useEffect(() => {
    async function fetchAirports() {
      try {
        const response = await fetch('/airports.json'); // Adjust path as needed
        const data = await response.json();
        setAirports(data); // Set fetched airports data
      } catch (error) {
        console.error('Error fetching airports:', error);
        setAirports([]); // Handle error by setting to empty array
      }
    }
    fetchAirports();
  }, []);


  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoading(true);
    setSearchProgress(0);
    const interval = setInterval(() => {
      setSearchProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval);
          setIsLoading(false);
          setShowResults(true);
          return 100;
        }
        return prev + 1;
      });
    }, 30);
  };

  const handleSelectFlight = () => {
    setShowFlightDetails(true);
  };

  const handleBackToResults = () => {
    setShowFlightDetails(false);
  };

  return (
    <div className="bg-gray-900 min-h-screen">
      {/* Loading Animation */}
      {isLoading && <LoadingAnimation searchProgress={searchProgress} />}

      {/* Search Form */}
      {!showResults && !showFlightDetails && (
        <div className="min-h-screen bg-gradient-to-b from-gray-900 to-black flex items-center justify-center p-4">
          <Card className="w-full max-w-3xl bg-gray-800/50 backdrop-blur-sm border-gray-700">
            <CardContent className="p-6">
              <h1 className="text-2xl font-semibold text-center mb-6 text-gray-200">Flight Booking</h1>
              <Tabs defaultValue="flights" className="mb-6">
                <TabsList className="grid w-full grid-cols-1 bg-gray-700/50">
                  <TabsTrigger value="flights" className="data-[state=active]:bg-teal-500 data-[state=active]:text-white text-gray-300">
                    Flights
                  </TabsTrigger>
                </TabsList>
              </Tabs>
              <form onSubmit={handleSearch} className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <AirportSelect value={from} onChange={setFrom} label="Where from?" placeholder="Select origin" airports={airports} />
                  <AirportSelect value={to} onChange={setTo} label="Where to?" placeholder="Select destination" airports={airports} />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="departureDate" className="text-gray-300">Departure Date</Label>
                    <DatePicker
                      id="departureDate"
                      selected={departureDate}
                      onChange={(date: Date | null) => setDepartureDate(date)}
                      className="pl-10 bg-gray-700/50 border-gray-600 text-white w-full"
                      placeholderText="Select departure date"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="returnDate" className="text-gray-300">Return Date</Label>
                    <DatePicker
                      id="returnDate"
                      selected={returnDate}
                      onChange={(date: Date | null) => setReturnDate(date)}
                      className="pl-10 bg-gray-700/50 border-gray-600 text-white w-full"
                      placeholderText="Select return date"
                    />
                    <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
                  </div>
                </div>
                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-500 text-white">
                  <Search className="mr-2" size={18} />
                  Search flights
                </Button>
              </form>
            </CardContent>
          </Card>
        </div>
      )}

      {/* Search Results */}
      {showResults && !showFlightDetails && (
        <div className="min-h-screen bg-gray-900 text-gray-200">
          <div className="bg-gray-800 shadow">
            <div className="max-w-7xl mx-auto px-4 py-4">
              <form onSubmit={handleSearch} className="flex justify-between items-center">
                <div className="flex items-center space-x-4">
                  <AirportSelect value={from} onChange={setFrom} label="From" placeholder="Select origin" airports={airports} />
                  <AirportSelect value={to} onChange={setTo} label="To" placeholder="Select destination" airports={airports} />
                  <div>
                    <Label htmlFor="departureDate" className="sr-only">Departure Date</Label>
                    <DatePicker
                      id="departureDate"
                      selected={departureDate}
                      onChange={(date: Date | null) => setDepartureDate(date)}
                      className="w-32 border-none shadow-none text-sm font-medium bg-gray-800 text-gray-200"
                      placeholderText="Select departure date"
                    />
                  </div>
                  <div>
                    <Label htmlFor="returnDate" className="sr-only">Return Date</Label>
                    <DatePicker
                      id="returnDate"
                      selected={returnDate}
                      onChange={(date: Date | null) => setReturnDate(date)}
                      className="w-32 border-none shadow-none text-sm font-medium bg-gray-800 text-gray-200"
                      placeholderText="Select return date"
                    />
                  </div>
                </div>
                <Button type="submit" className="bg-teal-600 hover:bg-teal-500 text-white">
                  <Search className="mr-2" size={18} />
                  Search
                </Button>
              </form>
            </div>
          </div>

          {/* Flights List */}
          <div className="max-w-7xl mx-auto px-4 py-8">
            <h1 className="text-2xl font-bold mb-4 text-gray-200">Flight results</h1>
            <p className="text-gray-400 mb-6">Showing {flightData.length} of {flightData.length} results</p>
            <Card className="bg-gray-800 border-gray-700">
              <CardContent className="p-6">
                {flightData.map((flight) => (
                  <div key={flight.id} className="flex justify-between items-center border-b border-gray-700 py-4 hover:bg-gray-800 transition-colors duration-200">
                    <div className="flex items-center space-x-4">
                      <img src={getAirlineLogo(flight.airline)} alt={flight.airline} className="w-8 h-8" />
                      <div>
                        <p className="font-medium text-gray-200">{flight.departure} - {flight.arrival}</p>
                        <p className="text-sm text-gray-400">{flight.airline} • {flight.flightNumber}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-gray-300">{flight.duration}</p>
                      <p className="text-sm text-gray-400">{flight.stops}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-medium text-gray-300">from</p>
                      <p className="text-lg font-bold text-gray-200">{flight.price}</p>
                    </div>
                    <Button className="bg-teal-700 hover:bg-teal-600 text-white" onClick={handleSelectFlight}>Select</Button>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>
        </div>
      )}

      {/* Flight Details */}
      {showFlightDetails && (
        <div className="min-h-screen bg-gray-900 p-4">
          <Card className="w-full max-w-4xl mx-auto bg-gray-900 border-gray-800">
            <CardContent className="p-6 space-y-6">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <Button variant="ghost" size="icon" onClick={handleBackToResults} className="text-gray-400 hover:text-gray-300">
                    <ArrowLeft className="h-4 w-4" />
                  </Button>
                  <h2 className="text-2xl font-bold text-gray-200">Flight details</h2>
                </div>
                <Button className="bg-teal-700 hover:bg-teal-600 text-white">Book now</Button>
              </div>
              <div className="bg-gray-800 rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-300">{sampleFlightDetails.outbound.date}</p>
                  <p className="text-sm text-gray-400">{sampleFlightDetails.outbound.duration}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-gray-200">{sampleFlightDetails.outbound.departureTime}</p>
                    <p className="font-medium text-gray-300">{sampleFlightDetails.outbound.from.split('•')[0].trim()}</p>
                    <p className="text-sm text-gray-400">{sampleFlightDetails.outbound.from.split('•')[1].trim()}</p>
                  </div>
                  <Plane className="text-teal-500 rotate-90" size={24} />
                  <div className="space-y-1 text-right">
                    <p className="text-2xl font-bold text-gray-200">{sampleFlightDetails.outbound.arrivalTime}</p>
                    <p className="font-medium text-gray-300">{sampleFlightDetails.outbound.to.split('•')[0].trim()}</p>
                    <p className="text-sm text-gray-400">{sampleFlightDetails.outbound.to.split('•')[1].trim()}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  <p>{sampleFlightDetails.outbound.airline} • {sampleFlightDetails.outbound.flightNumber}</p>
                  <p>{sampleFlightDetails.outbound.aircraft}</p>
                </div>
              </div>

              {/* Inbound Flight Details */}
              <div className="bg-gray-800 rounded-lg p-4 space-y-4">
                <div className="flex justify-between items-center">
                  <p className="font-medium text-gray-300">{sampleFlightDetails.inbound.date}</p>
                  <p className="text-sm text-gray-400">{sampleFlightDetails.inbound.duration}</p>
                </div>
                <div className="flex justify-between items-center">
                  <div className="space-y-1">
                    <p className="text-2xl font-bold text-gray-200">{sampleFlightDetails.inbound.departureTime}</p>
                    <p className="font-medium text-gray-300">{sampleFlightDetails.inbound.from.split('•')[0].trim()}</p>
                    <p className="text-sm text-gray-400">{sampleFlightDetails.inbound.from.split('•')[1].trim()}</p>
                  </div>
                  <Plane className="text-teal-500 rotate-90" size={24} />
                  <div className="space-y-1 text-right">
                    <p className="text-2xl font-bold text-gray-200">{sampleFlightDetails.inbound.arrivalTime}</p>
                    <p className="font-medium text-gray-300">{sampleFlightDetails.inbound.to.split('•')[0].trim()}</p>
                    <p className="text-sm text-gray-400">{sampleFlightDetails.inbound.to.split('•')[1].trim()}</p>
                  </div>
                </div>
                <div className="text-sm text-gray-400">
                  <p>{sampleFlightDetails.inbound.airline} • {sampleFlightDetails.inbound.flightNumber}</p>
                  <p>{sampleFlightDetails.inbound.aircraft}</p>
                </div>
              </div>

              {/* Layover Information */}
              {sampleFlightDetails.layover && (
                <div className="text-center text-sm text-gray-400 bg-gray-800 p-2 rounded">
                  <span className="inline-block mr-1">&#9200;</span>
                  Layover: {sampleFlightDetails.layover.duration}
                </div>
              )}
            </CardContent>
          </Card>
        </div>
      )}
    </div>
  );
}

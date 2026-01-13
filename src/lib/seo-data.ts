import { SEOPageProps } from "@/components/features/SEOPageTemplate";

export const seoPagesData: Record<string, SEOPageProps> = {
  "best-hotels-paris": {
    title: "Best Hotels in Paris: Luxury & Comfort Guide 2024",
    subtitle: "Discover the top-rated hotels in the City of Light, from Eiffel Tower views to boutique gems.",
    description: "Paris offers a stunning array of accommodation options. Whether you're looking for a romantic getaway near the Eiffel Tower, a luxury stay in the Golden Triangle, or a charming boutique hotel in Le Marais, our curated list helps you find the perfect place to stay.",
    heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?auto=format&fit=crop&q=80",
    city: "Paris",
    type: "hotel",
    items: [
      {
        title: "The Ritz Paris",
        description: "Experience world-class service at the legendary Ritz Paris. Located in the heart of the city, this historic hotel offers luxury suites, a spa, and exquisite dining.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80",
        rating: 5.0,
        location: "15 Place Vendôme, 75001 Paris",
        price: "From €1,200/night",
        features: ["Michelin-starred dining", "Luxury Spa", "Historic Architecture", "Central Location"]
      },
      {
        title: "Shangri-La Paris",
        description: "Former residence of Prince Roland Bonaparte, offering breathtaking views of the Eiffel Tower and the Seine River.",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80",
        rating: 4.9,
        location: "10 Avenue d'Iéna, 75116 Paris",
        price: "From €1,100/night",
        features: ["Eiffel Tower Views", "Asian-French Fusion Dining", "Indoor Pool", "Palatial Rooms"]
      },
      {
        title: "Le Meurice",
        description: "Ideally located opposite the Tuileries Garden, Le Meurice combines 18th-century opulence with contemporary chic.",
        image: "https://images.unsplash.com/photo-1520250497591-112f2f40a3f4?auto=format&fit=crop&q=80",
        rating: 4.8,
        location: "228 Rue de Rivoli, 75001 Paris",
        price: "From €950/night",
        features: ["Alain Ducasse Restaurant", "Spa Valmont", "Pet Friendly", "Artistic Decor"]
      }
    ],
    faqs: [
      {
        question: "What is the best area to stay in Paris for first-timers?",
        answer: "The 1st Arrondissement (Louvre area) or the 7th (near Eiffel Tower) are excellent for first-time visitors due to their proximity to major landmarks."
      },
      {
        question: "Are luxury hotels in Paris pet-friendly?",
        answer: "Many high-end hotels like Le Meurice and The Ritz welcome pets, but it's always best to check their specific pet policy beforehand."
      }
    ],
    relatedLinks: [
      { title: "Airport Taxi Paris", href: "/airport-taxi-paris" },
      { title: "Chauffeur Service Paris", href: "/chauffeur-service" }
    ]
  },
  "best-hotels-istanbul": {
    title: "Best Hotels in Istanbul: Where East Meets West",
    subtitle: "Stay in the heart of history with our guide to Istanbul's finest hotels.",
    description: "Istanbul's hotel scene is as diverse as its history. From Ottoman palaces turned into luxury hotels along the Bosphorus to modern skyscrapers in Levent, find your perfect stay.",
    heroImage: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?auto=format&fit=crop&q=80",
    city: "Istanbul",
    type: "hotel",
    items: [
      {
        title: "Ciragan Palace Kempinski",
        description: "The only Ottoman Imperial Palace and Hotel on the Bosphorus. A true symbol of luxury and history.",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80",
        rating: 5.0,
        location: "Çırağan Cd. No:32, Beşiktaş",
        price: "From €600/night",
        features: ["Bosphorus Views", "Infinity Pool", "Historical Palace", "Luxury Spa"]
      },
      {
        title: "Four Seasons Hotel Istanbul at Sultanahmet",
        description: "Housed in a century-old neoclassic Turkish prison, steps away from the Blue Mosque and Hagia Sophia.",
        image: "https://images.unsplash.com/photo-1566665797739-1674de7a421a?auto=format&fit=crop&q=80",
        rating: 4.9,
        location: "Tevkifhane Sk. No:1, Sultanahmet",
        price: "From €700/night",
        features: ["Rooftop Terrace", "Historic Landmark", "Walking Distance to Sights", "Private Courtyard"]
      },
      {
        title: "The Peninsula Istanbul",
        description: "Located in the historic Karaköy district, offering stunning water views and world-class hospitality.",
        image: "https://images.unsplash.com/photo-1590490360182-c33d57733427?auto=format&fit=crop&q=80",
        rating: 4.9,
        location: "Karaköy, Beyoğlu",
        price: "From €800/night",
        features: ["Waterfront Dining", "Holistic Spa", "Modern Luxury", "Galataport Access"]
      }
    ],
    faqs: [
      {
        question: "Which side of Istanbul is better to stay on?",
        answer: "For sightseeing, the European side (Sultanahmet or Beyoğlu) is best. For a local vibe and food, the Asian side (Kadikoy) is great."
      },
      {
        question: "Do hotels in Istanbul offer airport transfers?",
        answer: "Many luxury hotels offer transfers, but they can be expensive. We recommend booking a private airport transfer for better value."
      }
    ],
    relatedLinks: [
      { title: "Airport Taxi Istanbul", href: "/airport-taxi-istanbul" },
      { title: "City Transfers Turkey", href: "/city-to-city" }
    ]
  },
  "best-hotels-makkah": {
    title: "Best Hotels in Makkah Near Haram",
    subtitle: "Top-rated accommodation for your spiritual journey, steps away from the Kaaba.",
    description: "Finding the right hotel in Makkah is crucial for a comfortable Umrah or Hajj. We've selected the best hotels offering direct Haram views and easy access to the Grand Mosque.",
    heroImage: "/images/hero/makkah.jpg",
    city: "Makkah",
    type: "hotel",
    items: [
      {
        title: "Fairmont Makkah Clock Royal Tower",
        description: "A beacon of hospitality in the Holy City, located within the Abraj Al Bait complex, steps from the Haram.",
        image: "https://images.unsplash.com/photo-1570777937083-f4c084930198?auto=format&fit=crop&q=80",
        rating: 5.0,
        location: "King Abdul Aziz Endowment",
        price: "From $250/night",
        features: ["Kaaba Views", "Direct Haram Access", "Multiple Restaurants", "Shopping Mall Access"]
      },
      {
        title: "Swissôtel Makkah",
        description: "Known for its modern design and direct entrance to the Masjid Al Haram via Ajyad Street.",
        image: "https://images.unsplash.com/photo-1596394516093-501ba68a0ba6?auto=format&fit=crop&q=80",
        rating: 4.8,
        location: "Abraj Al Bait Complex",
        price: "From $180/night",
        features: ["Direct Haram Access", "Contemporary Rooms", "Fine Dining", "Efficient Service"]
      },
      {
        title: "Conrad Makkah",
        description: "Luxury accommodation in the heart of Makkah, featuring spacious rooms and stunning views.",
        image: "https://images.unsplash.com/photo-1560662105-57f8ad6ae2d1?auto=format&fit=crop&q=80",
        rating: 4.9,
        location: "Ibrahim Al Khalil Street",
        price: "From $220/night",
        features: ["Executive Lounge", "Spacious Suites", "Near Haram", "Modern Amenities"]
      }
    ],
    faqs: [
      {
        question: "Which hotels have the best view of the Kaaba?",
        answer: "Fairmont Makkah, Raffles Makkah Palace, and Pullman ZamZam offer some of the best direct views of the Kaaba."
      },
      {
        question: "How far is Jeddah airport from Makkah?",
        answer: "Jeddah Airport (JED) is approximately 60-90 minutes away from Makkah by car or taxi."
      }
    ],
    relatedLinks: [
      { title: "Jeddah to Makkah Taxi", href: "/jeddah-to-makkah-taxi" },
      { title: "Makkah to Madina Transfer", href: "/city-transfers-makkah-madina" }
    ]
  },
  "best-hotels-madina": {
    title: "Best Hotels in Madina Near Masjid Nabawi",
    subtitle: "Comfortable and convenient stays in the City of the Prophet.",
    description: "Stay close to the Prophet's Mosque with our selection of the best hotels in Madina. Enjoy peace of mind and spiritual tranquility with premium services.",
    heroImage: "/images/hero/madina.jpg",
    city: "Madina",
    type: "hotel",
    items: [
      {
        title: "Dar Al Iman InterContinental",
        description: "Ideally located in the courtyard of the Prophet's Mosque, offering unparalleled convenience.",
        image: "https://images.unsplash.com/photo-1590073844006-33379778ae09?auto=format&fit=crop&q=80",
        rating: 4.9,
        location: "Central Area",
        price: "From $200/night",
        features: ["Steps from Haram", "Luxury Dining", "24h Room Service", "Spacious Rooms"]
      },
      {
        title: "Oberoi Madina",
        description: "Situated directly opposite the Prophet's Mosque, known for its elegant atmosphere and excellent service.",
        image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?auto=format&fit=crop&q=80",
        rating: 5.0,
        location: "North Central Area",
        price: "From $300/night",
        features: ["Direct Haram View", "Luxury Spa", "Indian Cuisine", "Butler Service"]
      },
      {
        title: "Anwar Al Madina Mövenpick",
        description: "The city's largest hotel, linked to a shopping mall and offering extensive facilities for families.",
        image: "https://images.unsplash.com/photo-1562790351-d273a961e05b?auto=format&fit=crop&q=80",
        rating: 4.7,
        location: "Central Area",
        price: "From $150/night",
        features: ["Shopping Mall Access", "Large Capacity", "Multiple Restaurants", "Family Rooms"]
      }
    ],
    faqs: [
      {
        question: "Are there women-only hotels in Madina?",
        answer: "While there are no exclusively women-only hotels, many hotels offer women-only floors or sections upon request."
      },
      {
        question: "Is there a train station near Madina hotels?",
        answer: "Yes, the Haramain High-Speed Railway station is about 15-20 minutes drive from the central hotel area."
      }
    ],
    relatedLinks: [
      { title: "Madina Airport Taxi", href: "/airport-taxi-madina" },
      { title: "Makkah to Madina Transfer", href: "/city-transfers-makkah-madina" }
    ]
  },
  "best-hotels-antalya": {
    title: "Best Hotels in Antalya: Turkish Riviera Resorts",
    subtitle: "Experience luxury and sun on the Mediterranean coast.",
    description: "Antalya is the pearl of the Turkish Riviera. From all-inclusive mega-resorts in Lara Beach to boutique hotels in the historic Kaleiçi, find your paradise.",
    heroImage: "/images/hero/antalya.jpg",
    city: "Antalya",
    type: "hotel",
    items: [
      {
        title: "Regnum Carya",
        description: "A luxury all-inclusive resort offering world-class golf courses, private beaches, and spectacular entertainment.",
        image: "https://images.unsplash.com/photo-1582719508461-905c673771fd?auto=format&fit=crop&q=80",
        rating: 5.0,
        location: "Belek, Antalya",
        price: "From €500/night",
        features: ["Golf Course", "Private Beach", "Luxury Villas", "Concerts"]
      },
      {
        title: "Akra Hotel",
        description: "Located in the city center with stunning views of the Mediterranean and the Taurus Mountains.",
        image: "https://images.unsplash.com/photo-1571003123894-1f0594d2b5d9?auto=format&fit=crop&q=80",
        rating: 4.8,
        location: "Muratpaşa, Antalya",
        price: "From €150/night",
        features: ["City Center", "Infinity Pool", "Wellness Club", "Sea Views"]
      },
      {
        title: "Rixos Premium Belek",
        description: "A premium holiday experience with a huge aquapark, luxury spa, and gourmet dining options.",
        image: "https://images.unsplash.com/photo-1561501900-3701fa6a0864?auto=format&fit=crop&q=80",
        rating: 4.9,
        location: "Belek, Antalya",
        price: "From €400/night",
        features: ["Land of Legends Access", "700m Beach", "Sports Academy", "Kids Club"]
      }
    ],
    faqs: [
      {
        question: "When is the best time to visit Antalya?",
        answer: "May to October offers the best beach weather, while spring and autumn are great for sightseeing and golf."
      },
      {
        question: "How far are the resorts from Antalya Airport?",
        answer: "Lara Beach resorts are 15-20 mins away, while Belek resorts are about 30-40 mins from AYT airport."
      }
    ],
    relatedLinks: [
      { title: "Antalya Airport Taxi", href: "/airport-taxi-antalya" },
      { title: "Istanbul to Antalya Transfer", href: "/city-to-city" }
    ]
  },
  "best-hotels-dubai": {
    title: "Best Hotels in Dubai: Ultimate Luxury Guide",
    subtitle: "From 7-star luxury to desert retreats, explore the best stays in Dubai.",
    description: "Dubai defines modern luxury. Stay in the world's tallest building, on a man-made island, or in a desert palace. Our guide covers the absolute best hotels in the Emirate.",
    heroImage: "/images/hero/dubai.jpg",
    city: "Dubai",
    type: "hotel",
    items: [
      {
        title: "Burj Al Arab Jumeirah",
        description: "The world's most luxurious hotel, known for its distinctive sail shape and unparalleled service.",
        image: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?auto=format&fit=crop&q=80",
        rating: 5.0,
        location: "Jumeirah Beach Road",
        price: "From $1,500/night",
        features: ["7-Star Rating", "Private Butler", "Helipad", "Underwater Restaurant"]
      },
      {
        title: "Atlantis, The Palm",
        description: "An iconic resort on Palm Jumeirah featuring a massive waterpark and underwater suites.",
        image: "https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?auto=format&fit=crop&q=80",
        rating: 4.8,
        location: "Palm Jumeirah",
        price: "From $400/night",
        features: ["Aquaventure Waterpark", "Lost Chambers Aquarium", "Celebrity Chef Dining", "Private Beach"]
      },
      {
        title: "Armani Hotel Dubai",
        description: "Located within the Burj Khalifa, offering sophisticated style designed by Giorgio Armani.",
        image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?auto=format&fit=crop&q=80",
        rating: 4.9,
        location: "Downtown Dubai, Burj Khalifa",
        price: "From $600/night",
        features: ["In Burj Khalifa", "Direct Mall Access", "Minimalist Luxury", "Fountain Views"]
      }
    ],
    faqs: [
      {
        question: "Is it better to stay in Downtown or the Marina?",
        answer: "Downtown is best for shopping and sightseeing (Burj Khalifa, Mall). Marina is better for beach access and nightlife."
      },
      {
        question: "Is alcohol allowed in Dubai hotels?",
        answer: "Yes, alcohol is served in licensed bars and restaurants within hotels in Dubai."
      }
    ],
    relatedLinks: [
      { title: "Airport Taxi Dubai", href: "/airport-taxi-dubai" },
      { title: "Chauffeur Service Dubai", href: "/chauffeur-service" }
    ]
  },
  "airport-taxi-paris": {
    title: "Best Airport Taxi & Transfers in Paris (CDG/Orly)",
    subtitle: "Reliable, comfortable, and fixed-price transfers to/from Paris airports.",
    description: "Navigate Paris airports with ease. Whether arriving at Charles de Gaulle (CDG), Orly (ORY), or Beauvais (BVA), our private transfer service ensures a stress-free journey to your hotel or destination.",
    heroImage: "https://images.unsplash.com/photo-1499856871940-a09627c6dcf6?auto=format&fit=crop&q=80",
    city: "Paris",
    type: "transfer",
    items: [
      {
        title: "Private Sedan Transfer",
        description: "Comfortable ride for up to 3 passengers. Perfect for couples or small families.",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80",
        features: ["Meet & Greet", "Flight Tracking", "Fixed Price", "Free Waiting Time"],
        price: "From €65",
        location: "CDG to City Center"
      },
      {
        title: "Luxury Mercedes E-Class",
        description: "Travel in style with our business class vehicles. Ideal for corporate travelers.",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80",
        features: ["Professional Chauffeur", "Leather Interior", "Bottled Water", "Priority Service"],
        price: "From €95",
        location: "CDG to City Center"
      },
      {
        title: "Minivan Group Transfer",
        description: "Spacious van for up to 7 passengers with luggage. Great for groups and large families.",
        image: "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?auto=format&fit=crop&q=80",
        features: ["Ample Luggage Space", "Child Seats Available", "Group Discounts", "Door-to-Door"],
        price: "From €110",
        location: "CDG to City Center"
      }
    ],
    faqs: [
      {
        question: "How do I find my driver at CDG airport?",
        answer: "Your driver will be waiting in the arrival hall with a name sign after you collect your luggage and pass customs."
      },
      {
        question: "Is the price fixed or metered?",
        answer: "All our transfer prices are fixed and confirmed at the time of booking. No hidden fees or meter surprises."
      }
    ],
    relatedLinks: [
      { title: "Best Hotels Paris", href: "/best-hotels-paris" },
      { title: "Hourly Chauffeur Paris", href: "/hourly-booking" }
    ]
  },
  "airport-taxi-istanbul": {
    title: "Istanbul Airport Taxi & VIP Transfers (IST/SAW)",
    subtitle: "Seamless transfers from New Istanbul Airport and Sabiha Gokcen.",
    description: "Avoid the chaos of public transport. Book a private, sanitized, and comfortable transfer from Istanbul's airports directly to your hotel in Sultanahmet, Taksim, or anywhere in the city.",
    heroImage: "/images/hero/istanbul.jpg",
    city: "Istanbul",
    type: "transfer",
    items: [
      {
        title: "Standard Private Transfer",
        description: "Reliable transfer in a comfortable sedan or hatchback.",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80",
        features: ["24/7 Service", "English Speaking Support", "Tolls Included", "Free Cancellation"],
        price: "From €40",
        location: "IST to City Center"
      },
      {
        title: "VIP Mercedes Vito",
        description: "The most popular choice in Istanbul. Luxury van with leather seats and privacy.",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80",
        features: ["Luxury Interior", "WiFi Onboard", "Fridge/Drinks", "Up to 6 Pax"],
        price: "From €50",
        location: "IST to City Center"
      },
      {
        title: "Large Group Sprinter",
        description: "Minibus for larger groups up to 13-16 passengers.",
        image: "https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80",
        features: ["High Capacity", "AC Climate Control", "Ample Luggage", "Professional Driver"],
        price: "From €70",
        location: "IST to City Center"
      }
    ],
    keywords: [
      "Istanbul Airport Taxi",
      "IST Airport Transfer",
      "Sabiha Gokcen Transfer",
      "Istanbul Chauffeur Service",
      "VIP Transfer Istanbul",
      "Istanbul Airport Shuttle",
      "Luxury Van Istanbul"
    ],
    faqs: [
      {
        question: "How long is the drive from IST to Sultanahmet?",
        answer: "It usually takes 45-60 minutes depending on traffic."
      },
      {
        question: "Can I pay in Euros or Dollars?",
        answer: "Yes, you can pay online in your preferred currency or cash to the driver (though online booking is recommended)."
      }
    ],
    relatedLinks: [
      { title: "Best Hotels Istanbul", href: "/best-hotels-istanbul" },
      { title: "Istanbul Tours", href: "/tours-activities" }
    ]
  },
  "airport-taxi-dubai": {
    title: "Dubai Airport Transfer & Luxury Chauffeur (DXB)",
    subtitle: "Experience premium travel in Dubai with our VIP fleet.",
    description: "Book reliable airport transfers from DXB and DWC. Professional chauffeurs, luxury cars, and fixed prices for your Dubai journey.",
    heroImage: "https://images.unsplash.com/photo-1512453979798-5ea904a848bd?auto=format&fit=crop&q=80",
    city: "Dubai",
    type: "transfer",
    keywords: [
      "Dubai Airport Taxi",
      "DXB Transfer",
      "Dubai Chauffeur",
      "Luxury Car Rental Dubai",
      "Dubai Airport Limousine",
      "Dubai Hotel Transfer"
    ],
    items: [
      {
        title: "Lexus ES/Toyota Camry",
        description: "Standard luxury taxis commonly used in Dubai, clean and efficient.",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80",
        features: ["Metered/Fixed Rates", "RTA Regulated", "Clean Vehicles", "Professional Drivers"],
        price: "From AED 100",
        location: "DXB to Downtown"
      },
      {
        title: "BMW 7 Series / Mercedes S-Class",
        description: "Top-tier luxury sedans for VIP arrivals.",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80",
        features: ["First Class Comfort", "Uniformed Chauffeur", "Airport Meet & Assist", "Luxury Amenities"],
        price: "From AED 350",
        location: "DXB to Downtown"
      },
      {
        title: "GMC Yukon / Chevrolet Tahoe",
        description: "Large SUVs perfect for families with plenty of luggage.",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80",
        features: ["Spacious", "Leather Seats", "Safe & Secure", "Family Friendly"],
        price: "From AED 250",
        location: "DXB to Downtown"
      }
    ],
    faqs: [
      {
        question: "Is Uber available at Dubai Airport?",
        answer: "Yes, Uber and Careem are available, but booking a private transfer ensures a fixed price and meet & greet service."
      },
      {
        question: "How much is a taxi from Dubai Airport to Marina?",
        answer: "It typically costs between AED 100-150 depending on the vehicle type and time of day."
      }
    ],
    relatedLinks: [
      { title: "Best Hotels Dubai", href: "/best-hotels-dubai" },
      { title: "Dubai City Tour", href: "/tours-activities" }
    ]
  },
  "airport-taxi-antalya": {
    title: "Antalya Airport Transfers & Shuttle (AYT)",
    subtitle: "Fast and affordable transfers to Belek, Lara, Kemer, and Side.",
    description: "Start your holiday right. We offer private transfers from Antalya Airport to all major resort areas. No waiting for buses, direct to your hotel door.",
    heroImage: "/images/hero/antalya.jpg",
    city: "Antalya",
    type: "transfer",
    items: [
      {
        title: "Economy Sedan",
        description: "Budget-friendly private transfer for couples.",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80",
        features: ["AC", "Direct to Hotel", "Best Price", "2 Pax"],
        price: "From €35",
        location: "AYT to Belek"
      },
      {
        title: "Private Minivan",
        description: "Comfortable van for families going to resorts.",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80",
        features: ["Child Seats", "Spacious", "Fixed Price", "Up to 6 Pax"],
        price: "From €45",
        location: "AYT to Belek"
      },
      {
        title: "VIP Sprinter Bus",
        description: "For large groups and golf bags.",
        image: "https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80",
        features: ["Golf Equipment Space", "Luxury Interior", "Group Travel", "13+ Pax"],
        price: "From €60",
        location: "AYT to Belek"
      }
    ],
    faqs: [
      {
        question: "Do you provide child seats?",
        answer: "Yes, we provide child seats free of charge upon request."
      },
      {
        question: "How long is the transfer to Alanya?",
        answer: "Alanya is quite far, taking about 2 hours from Antalya Airport."
      }
    ],
    relatedLinks: [
      { title: "Best Hotels Antalya", href: "/best-hotels-antalya" },
      { title: "Istanbul to Antalya Transfer", href: "/city-to-city" }
    ]
  },
  "jeddah-to-makkah-taxi": {
    title: "Jeddah Airport to Makkah Taxi & Umrah Transfers",
    subtitle: "Reliable and spiritual journey from Jeddah Airport to your hotel in Makkah.",
    description: "Perform your Umrah with peace of mind. Our specialized Jeddah to Makkah transfer service offers GMCs, Camrys, and Hiace buses for pilgrims.",
    heroImage: "/images/hero/makkah.jpg",
    city: "Makkah",
    type: "transfer",
    items: [
      {
        title: "GMC Yukon / Chevy Tahoe",
        description: "The preferred choice for families and pilgrims with luggage.",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80",
        features: ["Spacious", "Powerful AC", "7 Seats", "Luggage Space"],
        price: "From SAR 350",
        location: "Jeddah to Makkah"
      },
      {
        title: "Toyota Camry",
        description: "Economical and comfortable sedan for small groups.",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80",
        features: ["Budget Friendly", "AC", "Comfortable", "4 Pax"],
        price: "From SAR 200",
        location: "Jeddah to Makkah"
      },
      {
        title: "Toyota Hiace",
        description: "Standard bus for groups of pilgrims.",
        image: "https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80",
        features: ["10-14 Seats", "Group Travel", "Economical", "AC"],
        price: "From SAR 400",
        location: "Jeddah to Makkah"
      }
    ],
    faqs: [
      {
        question: "Can the driver pick me up in Ihram?",
        answer: "Yes, our drivers are accustomed to picking up pilgrims in Ihram from the airport."
      },
      {
        question: "How long does it take to reach Makkah?",
        answer: "The journey takes about 60 to 90 minutes depending on traffic and checkpoints."
      }
    ],
    relatedLinks: [
      { title: "Best Hotels Makkah", href: "/best-hotels-makkah" },
      { title: "Makkah to Madina Taxi", href: "/city-transfers-makkah-madina" }
    ]
  },
  "city-transfers-makkah-madina": {
    title: "Makkah to Madina Taxi & City Transfers",
    subtitle: "Comfortable intercity transfers between the Holy Cities.",
    description: "Travel between Makkah and Madina in comfort. We offer private VIP transfers that are faster and more convenient than the bus.",
    heroImage: "/images/hero/madina.jpg",
    city: "Madina",
    type: "transfer",
    items: [
      {
        title: "VIP GMC Transfer",
        description: "Luxury travel between the two Holy Cities.",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80",
        features: ["Door to Door", "No Stops", "Luxury Comfort", "4-5 Hours"],
        price: "From SAR 800",
        location: "Makkah to Madina"
      },
      {
        title: "Hyundai Staria / H1",
        description: "Modern van perfect for families.",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80",
        features: ["Spacious", "Modern", "7-8 Pax", "AC"],
        price: "From SAR 700",
        location: "Makkah to Madina"
      },
      {
        title: "Private Bus (Coaster)",
        description: "For large groups performing Umrah together.",
        image: "https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80",
        features: ["20+ Seats", "Group Rates", "Luggage Trailer", "Experienced Driver"],
        price: "From SAR 1200",
        location: "Makkah to Madina"
      }
    ],
    faqs: [
      {
        question: "Is the train better than a taxi?",
        answer: "The Haramain train is faster, but a taxi offers door-to-door service, which is better if you have a lot of luggage or elderly family members."
      },
      {
        question: "How long is the drive?",
        answer: "The drive between Makkah and Madina takes approximately 4 to 5 hours on the highway."
      }
    ],
    relatedLinks: [
      { title: "Best Hotels Madina", href: "/best-hotels-madina" },
      { title: "Jeddah to Makkah Taxi", href: "/jeddah-to-makkah-taxi" }
    ]
  }
};

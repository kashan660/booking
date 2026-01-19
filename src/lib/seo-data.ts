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
    title: "Paris Airport Transfer: CDG, Orly & Beauvais Private Taxi",
    subtitle: "Skip the metro hassle. Direct, fixed-price private transfers from Charles de Gaulle (CDG) and Orly (ORY) to your Paris hotel.",
    description: "Welcome to the City of Light. Start your Parisian journey with zero stress. Our professional drivers track your flight and greet you at the arrival terminal with a name sign. Whether you're heading to a hotel near the Eiffel Tower, Disneyland Paris, or a business meeting in La Défense, our fleet of comfortable sedans and vans ensures a smooth ride through Paris traffic.",
    heroImage: "https://images.unsplash.com/photo-1502602898657-3e91760cbb34?q=80&w=2070&auto=format&fit=crop",
    city: "Paris",
    type: "transfer",
    items: [
      {
        title: "Economy Sedan (Peugeot 508 / Toyota)",
        description: "Efficient and comfortable transport for up to 3 passengers. Perfect for couples or solo travelers looking for a reliable airport pickup without the premium price tag.",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80",
        features: ["Meet & Greet Included", "Fixed Price (No Meter)", "Flight Tracking", "1 Hour Free Waiting"],
        price: "From €65",
        location: "CDG to City Center"
      },
      {
        title: "Business Class (Mercedes E-Class)",
        description: "Travel in sophistication. Our business class service offers leather interiors, bottled water, and a highly professional chauffeur. Ideal for corporate travelers.",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80",
        features: ["Priority Pickup", "Leather Interior", "English Speaking Driver", "Business Amenities"],
        price: "From €95",
        location: "CDG to City Center"
      },
      {
        title: "Family Van (Mercedes V-Class)",
        description: "Space for the whole family and all your luggage. Our luxury vans comfortably seat 7 passengers, making them perfect for groups or trips to Disneyland Paris.",
        image: "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?auto=format&fit=crop&q=80",
        features: ["7 Seats + Luggage", "Child Seats Available", "Group Travel", "Disneyland Transfers"],
        price: "From €110",
        location: "CDG to City Center"
      }
    ],
    faqs: [
      {
        question: "How do I find my driver at CDG airport?",
        answer: "Your driver will be waiting in the arrival hall immediately after you exit customs, holding a sign with your name on it."
      },
      {
        question: "Is the price fixed or metered?",
        answer: "All our transfer prices are fixed and confirmed at the time of booking. There are no hidden fees for traffic or luggage."
      }
    ],
    relatedLinks: [
      { title: "Best Hotels Paris", href: "/best-hotels-paris" },
      { title: "Hourly Chauffeur Paris", href: "/hourly-booking" }
    ]
  },
  "airport-taxi-istanbul": {
    title: "Istanbul Airport Transfer: IST & Sabiha Gokcen VIP Taxi",
    subtitle: "Avoid the chaos. Premium private transfers from New Istanbul Airport (IST) and Sabiha Gokcen (SAW) directly to your hotel.",
    description: "Istanbul is a sprawling metropolis, and navigating public transport with luggage can be daunting. Our VIP transfer service offers a sanctuary of calm. Enjoy a sanitized, private ride in a luxury Mercedes Vito directly to Sultanahmet, Taksim, or Beşiktaş. We monitor your flight for delays and ensure a seamless handover from arrival gate to hotel lobby.",
    heroImage: "https://images.unsplash.com/photo-1524231757912-21f4fe3a7200?q=80&w=2070&auto=format&fit=crop",
    city: "Istanbul",
    type: "transfer",
    items: [
      {
        title: "Private Sedan (Fiat Egea / Renault)",
        description: "A cost-effective private transfer solution. Clean, air-conditioned, and strictly private vehicles for up to 3 passengers.",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80",
        features: ["24/7 Service", "English Speaking Support", "Tolls Included", "Free Cancellation"],
        price: "From €40",
        location: "IST to Sultanahmet"
      },
      {
        title: "VIP Mercedes Vito",
        description: "The gold standard for Istanbul transfers. These custom-designed luxury vans feature leather reclining seats, privacy glass, ambient lighting, and often Wi-Fi.",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80",
        features: ["Luxury Interior", "WiFi Onboard", "Fridge/Drinks", "Up to 6 Pax"],
        price: "From €50",
        location: "IST to Taksim/Sultanahmet"
      },
      {
        title: "Large Group Sprinter",
        description: "Ideal for tour groups or large families. Our Mercedes Sprinters accommodate up to 16 passengers with ample space for luggage.",
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
        question: "How long is the drive from New Istanbul Airport (IST) to Sultanahmet?",
        answer: "The journey typically takes 45 to 60 minutes, depending on traffic conditions. Our drivers use real-time navigation to find the fastest route."
      },
      {
        question: "Can I pay in Euros or Dollars?",
        answer: "Yes, while online payment is preferred, you can pay the driver in EUR, USD, or Turkish Lira."
      }
    ],
    relatedLinks: [
      { title: "Best Hotels Istanbul", href: "/best-hotels-istanbul" },
      { title: "Istanbul Tours", href: "/tours-activities" }
    ]
  },
  "airport-taxi-dubai": {
    title: "Dubai Airport Transfer: VIP & Luxury Chauffeur Service",
    subtitle: "Arrive in style with Dubai's #1 rated private transfer service. From DXB to your hotel door in pure comfort.",
    description: "Experience the epitome of luxury travel in Dubai. Whether you need a seamless pickup from Dubai International Airport (DXB), a VIP chauffeur for business meetings, or a family-friendly transfer to Palm Jumeirah, our fleet of premium vehicles ensures a stress-free start to your journey. Skip the taxi queues and step into a world of comfort, punctuality, and fixed-price reliability.",
    heroImage: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=2070&auto=format&fit=crop",
    city: "Dubai",
    type: "transfer",
    keywords: [
      "Dubai Airport Taxi",
      "DXB Transfer",
      "Dubai Chauffeur",
      "Luxury Car Rental Dubai",
      "Dubai Airport Limousine",
      "Dubai Hotel Transfer",
      "Palm Jumeirah Taxi",
      "Burj Khalifa Transfer"
    ],
    items: [
      {
        title: "Standard Luxury Sedan (Lexus ES)",
        description: "The perfect balance of comfort and affordability. Our immaculately clean Lexus ES sedans offer a smooth ride for up to 3 passengers, ideal for couples and business travelers.",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80",
        features: ["All-Inclusive Fixed Rates", "Free Waiting Time (60 mins)", "Professional Uniformed Driver", "Flight Monitoring"],
        price: "From AED 120",
        location: "DXB to Downtown / Marina"
      },
      {
        title: "VIP First Class (Mercedes S-Class)",
        description: "Make a statement upon arrival. Sink into the leather seats of a pristine Mercedes S-Class or BMW 7 Series. Includes meet & greet service inside the terminal.",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80",
        features: ["VIP Meet & Greet", "Bottled Water & Wi-Fi", "Executive Chauffeur", "Ultimate Privacy"],
        price: "From AED 350",
        location: "DXB to Palm Jumeirah"
      },
      {
        title: "Family SUV (GMC Yukon XL)",
        description: "Traveling with family or extra luggage? Our spacious American SUVs provide ample room for 6 passengers and 6 suitcases without compromising on luxury.",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80",
        features: ["Spacious Interior", "Child Seats Available", "Extra Luggage Capacity", "Safe & Secure"],
        price: "From AED 250",
        location: "DXB to JBR / Marina"
      }
    ],
    faqs: [
      {
        question: "Why book a private transfer instead of a regular taxi?",
        answer: "Regular airport taxis often have long queues and variable metered rates. Our private transfers offer fixed prices, no waiting time, and a professional meet & greet service in the arrival hall."
      },
      {
        question: "Can I book a transfer to Abu Dhabi?",
        answer: "Absolutely. We provide seamless inter-city transfers from Dubai Airport to Abu Dhabi hotels, Yas Island, and more."
      }
    ],
    relatedLinks: [
      { title: "Best Hotels Dubai", href: "/best-hotels-dubai" },
      { title: "Dubai City Tours", href: "/tours-activities" }
    ]
  },
  "airport-taxi-antalya": {
    title: "Antalya Airport Transfers: Direct to Belek, Lara & Side",
    subtitle: "Start your Turkish Riviera holiday in comfort. Private shuttles from AYT Airport to all resorts.",
    description: "Don't wait for the tour bus to fill up. Our private Antalya Airport transfers get you to the beach faster. Whether you're heading to a golf resort in Belek, a family hotel in Lara Beach, or the historic ruins of Side, our fleet of modern vehicles ensures a cool, comfortable, and direct journey.",
    heroImage: "https://images.unsplash.com/photo-1542051841857-5f90071e7989?q=80&w=2070&auto=format&fit=crop",
    city: "Antalya",
    type: "transfer",
    items: [
      {
        title: "Economy Sedan",
        description: "Perfect for couples. A private, air-conditioned sedan that takes you directly to your hotel without any stops.",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80",
        features: ["AC", "Direct to Hotel", "Best Price", "2 Pax"],
        price: "From €35",
        location: "AYT to Lara/Belek"
      },
      {
        title: "Private Minivan (Mercedes Vito)",
        description: "The most comfortable choice for families. Plenty of space for strollers, golf bags, and suitcases.",
        image: "https://images.unsplash.com/photo-1617788138017-80ad40651399?auto=format&fit=crop&q=80",
        features: ["Child Seats Free", "Spacious", "Fixed Price", "Up to 6 Pax"],
        price: "From €45",
        location: "AYT to Belek"
      },
      {
        title: "VIP Sprinter Bus",
        description: "Organizing a golf trip? Our Sprinter buses have huge trunks specifically designed to carry multiple golf bags and large groups.",
        image: "https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80",
        features: ["Golf Equipment Space", "Luxury Interior", "Group Travel", "13+ Pax"],
        price: "From €60",
        location: "AYT to Belek"
      }
    ],
    faqs: [
      {
        question: "Do you provide child seats?",
        answer: "Yes, child seats are available free of charge. Please request them when booking."
      },
      {
        question: "How long is the transfer to Alanya?",
        answer: "Alanya is approximately 125km from Antalya Airport, taking about 1 hour and 45 minutes to 2 hours."
      }
    ],
    relatedLinks: [
      { title: "Best Hotels Antalya", href: "/best-hotels-antalya" },
      { title: "Istanbul to Antalya Transfer", href: "/city-to-city" }
    ]
  },
  "jeddah-to-makkah-taxi": {
    title: "Jeddah Airport to Makkah: Umrah Taxi & VIP Transfers",
    subtitle: "Perform your Umrah with peace of mind. Reliable, spiritual journeys from Jeddah Airport (JED) to Makkah hotels.",
    description: "Your spiritual journey begins the moment you land. We specialize in transporting pilgrims from King Abdulaziz International Airport to the Holy City of Makkah. Our drivers are respectful, experienced with pilgrim needs, and knowledgeable about Makkah's hotels. Choose from spacious GMCs for families or comfortable sedans for quick trips.",
    heroImage: "https://images.unsplash.com/photo-1565552629477-0df6019181f5?q=80&w=2070&auto=format&fit=crop",
    city: "Makkah",
    type: "transfer",
    items: [
      {
        title: "GMC Yukon / Chevy Tahoe",
        description: "The preferred choice for families performing Umrah. These large American SUVs offer immense space, powerful air conditioning, and a smooth ride for up to 7 passengers.",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80",
        features: ["Spacious", "Powerful AC", "7 Seats", "Luggage Space"],
        price: "From SAR 350",
        location: "Jeddah to Makkah"
      },
      {
        title: "Toyota Camry",
        description: "Reliable, clean, and economical. The Toyota Camry is the standard for comfortable sedan travel in Saudi Arabia.",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80",
        features: ["Budget Friendly", "AC", "Comfortable", "4 Pax"],
        price: "From SAR 200",
        location: "Jeddah to Makkah"
      },
      {
        title: "Toyota Hiace",
        description: "Traveling with a larger group? Our Hiace buses are perfect for groups of 10-14 pilgrims with luggage.",
        image: "https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80",
        features: ["10-14 Seats", "Group Travel", "Economical", "AC"],
        price: "From SAR 400",
        location: "Jeddah to Makkah"
      }
    ],
    faqs: [
      {
        question: "Can the driver pick me up in Ihram?",
        answer: "Yes, absolutely. Our drivers are accustomed to serving pilgrims and will assist with your luggage."
      },
      {
        question: "How long does it take to reach Makkah?",
        answer: "The journey from Jeddah Airport to the Haram area typically takes 60 to 90 minutes."
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
  },
  "airport-taxi-london": {
    title: "London Airport Transfer: Heathrow, Gatwick & Stansted Taxi",
    subtitle: "Reliable, fixed-price transfers from all London airports to the city center.",
    description: "Navigate London's busy streets with ease. Whether you're landing at Heathrow, Gatwick, Stansted, or Luton, our professional drivers provide a seamless connection to your hotel or business meeting. Avoid the stress of the Tube with luggage and enjoy a private ride in comfort.",
    heroImage: "https://images.unsplash.com/photo-1513635269975-59663e0ac1ad?q=80&w=2070&auto=format&fit=crop",
    city: "London",
    type: "transfer",
    items: [
      {
        title: "Standard Sedan (Toyota Prius / Ford Mondeo)",
        description: "Efficient and eco-friendly transport for up to 3 passengers. Ideal for quick trips to the city.",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80",
        features: ["Meet & Greet", "Fixed Price", "Flight Tracking", "ULEZ Compliant"],
        price: "From £60",
        location: "LHR to Central London"
      },
      {
        title: "Business Class (Mercedes E-Class)",
        description: "Travel in executive comfort. Perfect for business travelers requiring a quiet and professional environment.",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80",
        features: ["Leather Seats", "Bottled Water", "Priority Pickup", "Professional Chauffeur"],
        price: "From £90",
        location: "LHR to Central London"
      },
      {
        title: "MPV (VW Transporter / Mercedes V-Class)",
        description: "Spacious transport for groups and families. Accommodates up to 7 passengers with luggage comfortably.",
        image: "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?auto=format&fit=crop&q=80",
        features: ["7 Seats", "Large Luggage Capacity", "Group Travel", "Family Friendly"],
        price: "From £110",
        location: "LHR to Central London"
      }
    ],
    faqs: [
      {
        question: "Does the price include congestion charges?",
        answer: "Yes, all our fixed prices include the Congestion Charge and ULEZ fees where applicable."
      },
      {
        question: "Where will the driver meet me at Heathrow?",
        answer: "Your driver will be waiting in the arrival hall with a name board, typically near the information desk or Costa Coffee."
      }
    ],
    relatedLinks: [
      { title: "Best Hotels London", href: "#" },
      { title: "London City Tours", href: "/tours-activities" }
    ]
  },
  "airport-taxi-newyork": {
    title: "New York Airport Transfer: JFK, Newark & LaGuardia Limo",
    subtitle: "Arrive in the Big Apple in style. VIP transfers to Manhattan.",
    description: "Skip the long taxi lines and confusing subway system. Our private car service ensures a smooth ride from JFK, Newark (EWR), or LaGuardia (LGA) directly to your Manhattan hotel. From yellow cabs to luxury black cars, we have the perfect ride for your New York adventure.",
    heroImage: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?q=80&w=2070&auto=format&fit=crop",
    city: "New York",
    type: "transfer",
    items: [
      {
        title: "Luxury Sedan (Lincoln Continental)",
        description: "Classic American luxury. A smooth and quiet ride into the city, perfect for couples or solo travelers.",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80",
        features: ["Meet & Greet", "All Tolls Included", "Professional Driver", "Comfortable Seating"],
        price: "From $100",
        location: "JFK to Manhattan"
      },
      {
        title: "SUV (Cadillac Escalade)",
        description: "The ultimate VIP experience. Spacious, powerful, and imposing, the Escalade is the choice for celebrities and executives.",
        image: "https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&q=80",
        features: ["VIP Service", "6 Passengers", "Huge Luggage Space", "Privacy Glass"],
        price: "From $180",
        location: "JFK to Manhattan"
      },
      {
        title: "Sprinter Van",
        description: "Ideal for large groups or bands. High-roof comfort with plenty of room for everyone.",
        image: "https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80",
        features: ["14 Passengers", "High Ceiling", "Group Transfer", " ample storage"],
        price: "From $250",
        location: "JFK to Manhattan"
      }
    ],
    faqs: [
      {
        question: "Are tolls included in the price?",
        answer: "Yes, our fixed rates include all bridge and tunnel tolls."
      },
      {
        question: "How long does it take to get to Times Square?",
        answer: "From JFK, it typically takes 45-60 minutes, but can take longer during rush hour."
      }
    ],
    relatedLinks: [
      { title: "Best Hotels New York", href: "#" },
      { title: "NYC Helicopter Tour", href: "/tours-activities" }
    ]
  },
  "airport-taxi-tokyo": {
    title: "Tokyo Airport Transfer: Narita & Haneda Private Taxi",
    subtitle: "Seamless transfers from Narita and Haneda to Tokyo hotels.",
    description: "Tokyo's transport system is efficient but can be overwhelming with luggage. Our private airport transfer service offers a stress-free door-to-door solution. Whether arriving at Narita (NRT) or Haneda (HND), our drivers will greet you and transport you safely to your accommodation in Shinjuku, Shibuya, or Ginza.",
    heroImage: "https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?q=80&w=1988&auto=format&fit=crop",
    city: "Tokyo",
    type: "transfer",
    items: [
      {
        title: "Standard Sedan (Toyota Crown)",
        description: "Experience Japanese hospitality in a clean and comfortable sedan. The standard for reliability.",
        image: "https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&q=80",
        features: ["Immaculately Clean", "White Glove Service", "Fixed Rate", "3 Pax"],
        price: "From ¥25,000",
        location: "NRT to Tokyo"
      },
      {
        title: "Minivan (Toyota Alphard)",
        description: "The epitome of luxury MPV travel. Known as the 'Executive Lounge', it offers incredible comfort and space.",
        image: "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?auto=format&fit=crop&q=80",
        features: ["Executive Seats", "Quiet Cabin", "Privacy Curtains", "5 Pax"],
        price: "From ¥35,000",
        location: "NRT to Tokyo"
      },
      {
        title: "Luxury Van (Toyota Hiace Grand Cabin)",
        description: "Perfect for larger groups with many suitcases. Spacious and practical.",
        image: "https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80",
        features: ["9 Pax", "Large Luggage Area", "Group Travel", "AC"],
        price: "From ¥40,000",
        location: "NRT to Tokyo"
      }
    ],
    faqs: [
      {
        question: "Do drivers speak English?",
        answer: "Yes, we assign English-speaking drivers for international arrivals to ensure smooth communication."
      },
      {
        question: "Is it expensive compared to the Narita Express?",
        answer: "For solo travelers, the train is cheaper. However, for groups of 3 or more, a private transfer offers competitive value with door-to-door convenience."
      }
    ],
    relatedLinks: [
      { title: "Best Hotels Tokyo", href: "#" },
      { title: "Mt Fuji Tour", href: "/tours-activities" }
    ]
  },
  "airport-taxi-singapore": {
    title: "Singapore Airport Transfer: Changi Airport VIP Taxi",
    subtitle: "Premium transfers from the world's best airport to Marina Bay and beyond.",
    description: "Arrive in the Lion City with ease. Our private transfer service from Changi Airport (SIN) ensures a smooth transition to your hotel. Enjoy the lush greenery of the East Coast Parkway in the comfort of a premium vehicle.",
    heroImage: "https://images.unsplash.com/photo-1525625293386-3f8f99389edd?q=80&w=2052&auto=format&fit=crop",
    city: "Singapore",
    type: "transfer",
    items: [
      {
        title: "Executive Sedan (Mercedes E-Class)",
        description: "Stylish and comfortable transport for business or leisure. Enjoy the ride in one of Singapore's most popular luxury cars.",
        image: "https://images.unsplash.com/photo-1563720223185-11003d516935?auto=format&fit=crop&q=80",
        features: ["Meet & Greet", "ERP Included", "Professional Driver", "3 Pax"],
        price: "From SGD 80",
        location: "Changi to City"
      },
      {
        title: "Luxury MPV (Toyota Alphard)",
        description: "Spacious and luxurious, perfect for families or executives who value extra legroom and comfort.",
        image: "https://images.unsplash.com/photo-1566008885218-90abf9200ddb?auto=format&fit=crop&q=80",
        features: ["Luxury Seating", "Dual AC", "6 Pax", "VIP Experience"],
        price: "From SGD 100",
        location: "Changi to City"
      },
      {
        title: "Large Van (Toyota Combi)",
        description: "The practical choice for larger groups with luggage. Reliable and spacious.",
        image: "https://images.unsplash.com/photo-1552168324-d612d77725e3?auto=format&fit=crop&q=80",
        features: ["13 Pax", "Group Transfer", "Luggage Space", "Economical"],
        price: "From SGD 120",
        location: "Changi to City"
      }
    ],
    faqs: [
      {
        question: "Are there late-night surcharges?",
        answer: "Our fixed prices include all surcharges, so you don't have to worry about late-night fees."
      },
      {
        question: "How long does the transfer take?",
        answer: "The journey from Changi Airport to the city center typically takes about 20-30 minutes."
      }
    ],
    relatedLinks: [
      { title: "Best Hotels Singapore", href: "#" },
      { title: "Singapore City Tour", href: "/tours-activities" }
    ]
  }
};

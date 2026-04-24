import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const cities = [
  {
    name: "Houston",
    slug: "houston",
    state: "TX",
    country: "USA",
    heroImage: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?w=1200&h=800&fit=crop",
    seoTitle: "Packers and Movers in Houston, TX | Affordable Moving Services",
    description: "Professional packers and movers in Houston, Texas. Local and long-distance moving services with packing, storage, and furniture assembly. Get a free quote today!",
    keywords: ["packers and movers houston", "houston movers", "moving company houston tx", "houston moving services", "local movers houston"],
    content: `
      <h2>Professional Packers and Movers in Houston, TX</h2>
      <p>Looking for reliable packers and movers in Houston? We provide comprehensive moving services throughout the Houston metropolitan area, including Sugar Land, The Woodlands, Pearland, and surrounding communities.</p>
      
      <h3>Our Houston Moving Services</h3>
      <ul>
        <li><strong>Local Moving:</strong> Apartment, house, and condo moves within Houston and Harris County</li>
        <li><strong>Long-Distance Moving:</strong> Interstate moves from Houston to anywhere in the USA</li>
        <li><strong>Packing Services:</strong> Full and partial packing with quality materials</li>
        <li><strong>Storage Solutions:</strong> Short-term and long-term climate-controlled storage</li>
        <li><strong>Commercial Moving:</strong> Office relocations and business moves</li>
        <li><strong>Furniture Assembly:</strong> Disassembly and reassembly of furniture</li>
      </ul>

      <h3>Why Choose Our Houston Movers?</h3>
      <p>Houston's hot and humid climate requires special care when moving. Our experienced team understands the unique challenges of moving in Houston, from navigating busy highways like I-10 and I-45 to handling moves in high-rise buildings downtown.</p>
      
      <ul>
        <li>Licensed and insured moving company</li>
        <li>Experienced with Houston's neighborhoods and traffic patterns</li>
        <li>Climate-controlled trucks for Houston's heat</li>
        <li>Competitive pricing with transparent quotes</li>
        <li>Same-day and next-day moving available</li>
      </ul>

      <h3>Houston Neighborhoods We Serve</h3>
      <p>We provide moving services throughout Greater Houston, including:</p>
      <ul>
        <li>Downtown Houston and Midtown</li>
        <li>The Heights and Garden Oaks</li>
        <li>Memorial and Energy Corridor</li>
        <li>Galleria and Uptown</li>
        <li>Montrose and Museum District</li>
        <li>Sugar Land and Missouri City</li>
        <li>The Woodlands and Spring</li>
        <li>Pearland and Friendswood</li>
        <li>Katy and Cypress</li>
      </ul>

      <h3>Get Your Free Houston Moving Quote</h3>
      <p>Ready to move? Contact us today for a free, no-obligation quote. Our Houston moving specialists are available 7 days a week to answer your questions and help plan your move.</p>
    `,
    faqs: [
      {
        question: "How much do movers cost in Houston?",
        answer: "Moving costs in Houston typically range from $300-$600 for local moves (studio to 2-bedroom) and $1,500-$5,000+ for long-distance moves. Final cost depends on distance, home size, services needed, and move date. We provide free quotes with transparent pricing."
      },
      {
        question: "Do you provide packing materials?",
        answer: "Yes! We offer complete packing services including boxes, bubble wrap, packing paper, tape, and furniture blankets. You can purchase materials separately or include full packing service in your quote."
      },
      {
        question: "How far in advance should I book movers in Houston?",
        answer: "We recommend booking 2-4 weeks in advance, especially during peak season (May-September). However, we often accommodate last-minute moves within 24-48 hours based on availability."
      },
      {
        question: "Are you licensed and insured?",
        answer: "Yes, we are fully licensed and insured. We carry liability insurance and cargo insurance to protect your belongings during the move. All our movers are background-checked and trained professionals."
      },
      {
        question: "Do you move during Houston's hot summer months?",
        answer: "Absolutely! Our trucks are equipped to handle Houston's heat and humidity. We take extra precautions during summer months, including climate-controlled trucks and proper hydration for our crew."
      }
    ],
    published: true,
  },
  {
    name: "Austin",
    slug: "austin",
    state: "TX",
    country: "USA",
    heroImage: "https://images.unsplash.com/photo-1531218150217-54595bc2b934?w=1200&h=800&fit=crop",
    seoTitle: "Packers and Movers in Austin, TX | Trusted Moving Company",
    description: "Top-rated packers and movers in Austin, Texas. Residential and commercial moving services with expert packing, storage, and furniture handling. Free estimates available!",
    keywords: ["packers and movers austin", "austin movers", "moving company austin tx", "austin moving services", "local movers austin"],
    content: `
      <h2>Trusted Packers and Movers in Austin, TX</h2>
      <p>Welcome to Austin's premier moving service! Whether you're relocating within the city or moving to Austin from another state, our professional movers make your transition smooth and stress-free.</p>
      
      <h3>Austin Moving Services</h3>
      <ul>
        <li><strong>Residential Moving:</strong> Apartments, condos, townhomes, and houses</li>
        <li><strong>Student Moving:</strong> UT Austin dorm and apartment moves</li>
        <li><strong>Tech Company Relocations:</strong> Office moves for Austin's tech industry</li>
        <li><strong>Long-Distance Moving:</strong> Interstate moves to and from Austin</li>
        <li><strong>Packing and Unpacking:</strong> Professional packing services available</li>
        <li><strong>Storage Solutions:</strong> Secure storage facilities in Austin</li>
      </ul>

      <h3>Why Austin Residents Choose Us</h3>
      <p>Austin's rapid growth and unique neighborhoods require movers who know the area. Our team is familiar with Austin's traffic patterns, parking restrictions, and building requirements.</p>
      
      <ul>
        <li>Experienced with high-rise moves downtown</li>
        <li>Knowledge of UT Austin campus moves</li>
        <li>Familiar with Austin's historic neighborhoods</li>
        <li>Eco-friendly moving practices (Keep Austin Green!)</li>
        <li>Flexible scheduling for busy professionals</li>
      </ul>

      <h3>Areas We Serve in Austin</h3>
      <ul>
        <li>Downtown Austin and Rainey Street</li>
        <li>South Congress (SoCo) and South Lamar</li>
        <li>East Austin and Mueller</li>
        <li>North Austin and Domain</li>
        <li>West Lake Hills and Tarrytown</li>
        <li>Round Rock and Cedar Park</li>
        <li>Pflugerville and Georgetown</li>
        <li>Lakeway and Bee Cave</li>
      </ul>

      <h3>Request Your Free Austin Moving Quote</h3>
      <p>Get started with a free estimate! Our Austin moving experts are ready to help you plan your move. Contact us today via phone, email, or WhatsApp.</p>
    `,
    faqs: [
      {
        question: "What's the average cost of movers in Austin?",
        answer: "Local moves in Austin typically cost $350-$700 for apartments and $800-$1,500 for houses. Long-distance moves start at $2,000. Prices vary based on distance, home size, and services. We provide detailed quotes with no hidden fees."
      },
      {
        question: "Can you handle moves in Austin's downtown high-rises?",
        answer: "Yes! We're experienced with high-rise moves in downtown Austin. We coordinate with building management, reserve elevators, and ensure compliance with all building requirements."
      },
      {
        question: "Do you move UT Austin students?",
        answer: "Absolutely! We offer special rates for student moves, including dorm moves, apartment relocations, and storage between semesters. We're familiar with UT campus logistics and parking."
      },
      {
        question: "What about parking permits in Austin neighborhoods?",
        answer: "We handle all parking permit requirements for Austin moves. Our team coordinates with the city and neighborhood associations to ensure proper permits for moving trucks."
      },
      {
        question: "Are you eco-friendly movers?",
        answer: "Yes! We use reusable moving crates when possible, recycle packing materials, and maintain fuel-efficient trucks. We're committed to keeping Austin green while providing excellent service."
      }
    ],
    published: true,
  },
  {
    name: "Dallas",
    slug: "dallas",
    state: "TX",
    country: "USA",
    heroImage: "https://images.unsplash.com/photo-1552083974-186346191183?w=1200&h=800&fit=crop",
    seoTitle: "Packers and Movers in Dallas, TX | Professional Moving Services",
    description: "Reliable packers and movers in Dallas, Texas. Full-service moving company offering local, long-distance, and commercial moves. Licensed, insured, and affordable!",
    keywords: ["packers and movers dallas", "dallas movers", "moving company dallas tx", "dallas moving services", "local movers dallas"],
    content: `
      <h2>Professional Packers and Movers in Dallas, TX</h2>
      <p>Moving in Dallas or the DFW Metroplex? Our experienced team provides comprehensive moving services throughout Dallas, Fort Worth, and surrounding areas. From downtown high-rises to suburban homes, we handle it all.</p>
      
      <h3>Dallas Moving Services</h3>
      <ul>
        <li><strong>Local Moving:</strong> Moves within Dallas and DFW Metroplex</li>
        <li><strong>Long-Distance Moving:</strong> Interstate relocations from Dallas</li>
        <li><strong>Corporate Relocation:</strong> Employee moves and office relocations</li>
        <li><strong>Luxury Moving:</strong> White-glove service for high-value items</li>
        <li><strong>Packing Services:</strong> Professional packing and custom crating</li>
        <li><strong>Storage Solutions:</strong> Climate-controlled storage facilities</li>
      </ul>

      <h3>Why Choose Our Dallas Moving Company?</h3>
      <p>Dallas is a sprawling metroplex with diverse neighborhoods and unique moving challenges. Our team knows Dallas inside and out, from navigating the Dallas North Tollway to handling moves in Uptown's luxury buildings.</p>
      
      <ul>
        <li>Licensed by the Texas Department of Motor Vehicles</li>
        <li>Fully insured with comprehensive coverage</li>
        <li>Experienced with Dallas's luxury high-rises</li>
        <li>Corporate relocation specialists</li>
        <li>Same-day service available</li>
        <li>Bilingual staff (English/Spanish)</li>
      </ul>

      <h3>Dallas-Fort Worth Areas We Serve</h3>
      <ul>
        <li>Downtown Dallas and Uptown</li>
        <li>Highland Park and University Park</li>
        <li>Plano and Frisco</li>
        <li>Irving and Las Colinas</li>
        <li>Richardson and Garland</li>
        <li>Fort Worth and Arlington</li>
        <li>McKinney and Allen</li>
        <li>Carrollton and Lewisville</li>
      </ul>

      <h3>Get Your Free Dallas Moving Estimate</h3>
      <p>Ready for a stress-free move? Contact our Dallas moving team for a free quote. We're available 7 days a week to answer questions and schedule your move.</p>
    `,
    faqs: [
      {
        question: "How much do movers cost in Dallas?",
        answer: "Dallas moving costs range from $400-$800 for local apartment moves and $1,000-$2,000 for house moves. Long-distance moves from Dallas start at $2,500. We provide detailed estimates based on your specific needs."
      },
      {
        question: "Do you serve the entire DFW Metroplex?",
        answer: "Yes! We provide moving services throughout Dallas, Fort Worth, Arlington, Plano, Frisco, Irving, and all surrounding DFW cities. No move is too far within the Metroplex."
      },
      {
        question: "Can you handle corporate relocations?",
        answer: "Absolutely! We specialize in corporate relocations, including employee moves, office relocations, and executive transfers. We work with HR departments to provide seamless relocation services."
      },
      {
        question: "What about moving luxury items and antiques?",
        answer: "We offer white-glove moving services for luxury items, antiques, art, and high-value possessions. This includes custom crating, special handling, and additional insurance coverage."
      },
      {
        question: "Do you provide storage in Dallas?",
        answer: "Yes! We have climate-controlled storage facilities in Dallas with 24/7 security. Perfect for temporary storage during moves or long-term storage needs."
      }
    ],
    published: true,
  },
  {
    name: "San Antonio",
    slug: "san-antonio",
    state: "TX",
    country: "USA",
    heroImage: "https://images.unsplash.com/photo-1583225214464-9296029427aa?w=1200&h=800&fit=crop",
    seoTitle: "Packers and Movers in San Antonio, TX | Affordable Moving Company",
    description: "Expert packers and movers in San Antonio, Texas. Residential and commercial moving services with professional packing, storage, and military relocation support.",
    keywords: ["packers and movers san antonio", "san antonio movers", "moving company san antonio tx", "san antonio moving services", "military movers san antonio"],
    content: `
      <h2>Expert Packers and Movers in San Antonio, TX</h2>
      <p>San Antonio's trusted moving company! We provide professional moving services throughout San Antonio and surrounding areas, including military relocations for Joint Base San Antonio personnel.</p>
      
      <h3>San Antonio Moving Services</h3>
      <ul>
        <li><strong>Residential Moving:</strong> Homes, apartments, and condos</li>
        <li><strong>Military Relocation:</strong> PCS moves for JBSA personnel</li>
        <li><strong>Senior Moving:</strong> Specialized service for senior citizens</li>
        <li><strong>Long-Distance Moving:</strong> Interstate moves from San Antonio</li>
        <li><strong>Packing Services:</strong> Full-service packing and unpacking</li>
        <li><strong>Storage Solutions:</strong> Secure storage facilities</li>
      </ul>

      <h3>Why San Antonio Trusts Us</h3>
      <p>San Antonio's rich history and military presence require movers who understand the community. We're proud to serve both civilian and military families with professional, affordable moving services.</p>
      
      <ul>
        <li>Military relocation specialists (PCS moves)</li>
        <li>Experienced with historic home moves</li>
        <li>Senior-friendly moving services</li>
        <li>Bilingual team (English/Spanish)</li>
        <li>Affordable rates for all budgets</li>
        <li>Licensed and insured</li>
      </ul>

      <h3>San Antonio Areas We Serve</h3>
      <ul>
        <li>Downtown San Antonio and River Walk</li>
        <li>Alamo Heights and Terrell Hills</li>
        <li>Stone Oak and Sonterra</li>
        <li>The Dominion and Shavano Park</li>
        <li>Helotes and Leon Valley</li>
        <li>New Braunfels and Schertz</li>
        <li>Boerne and Fair Oaks Ranch</li>
        <li>Universal City and Converse</li>
      </ul>

      <h3>Request Your Free San Antonio Moving Quote</h3>
      <p>Get your free moving estimate today! Our San Antonio team is ready to help with your residential, commercial, or military move. Contact us now!</p>
    `,
    faqs: [
      {
        question: "How much do movers cost in San Antonio?",
        answer: "San Antonio moving costs typically range from $300-$600 for local apartment moves and $700-$1,500 for house moves. We offer competitive rates and military discounts for JBSA personnel."
      },
      {
        question: "Do you handle military PCS moves?",
        answer: "Yes! We specialize in military relocations for Joint Base San Antonio (JBSA) personnel. We understand PCS timelines, weight allowances, and military moving requirements."
      },
      {
        question: "Can you move historic homes in San Antonio?",
        answer: "Absolutely! We have experience moving items from San Antonio's historic homes and neighborhoods. We take extra care with antique furniture and historic properties."
      },
      {
        question: "Do you offer senior moving services?",
        answer: "Yes! We provide specialized senior moving services including downsizing assistance, patient packing, and coordination with retirement communities and assisted living facilities."
      },
      {
        question: "What's your cancellation policy?",
        answer: "We offer flexible cancellation up to 48 hours before your move date with no penalty. We understand that plans change and work with you to reschedule when needed."
      }
    ],
    published: true,
  },
  {
    name: "Phoenix",
    slug: "phoenix",
    state: "AZ",
    country: "USA",
    heroImage: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?w=1200&h=800&fit=crop",
    seoTitle: "Packers and Movers in Phoenix, AZ | Top-Rated Moving Services",
    description: "Professional packers and movers in Phoenix, Arizona. Local and long-distance moving with expert packing, climate-controlled storage, and same-day service available.",
    keywords: ["packers and movers phoenix", "phoenix movers", "moving company phoenix az", "phoenix moving services", "local movers phoenix"],
    content: `
      <h2>Top-Rated Packers and Movers in Phoenix, AZ</h2>
      <p>Phoenix's premier moving company! We provide professional moving services throughout the Phoenix metropolitan area, including Scottsdale, Tempe, Mesa, and Glendale. Beat the heat with our efficient, reliable movers.</p>
      
      <h3>Phoenix Moving Services</h3>
      <ul>
        <li><strong>Local Moving:</strong> Moves within Phoenix and surrounding cities</li>
        <li><strong>Long-Distance Moving:</strong> Interstate relocations from Arizona</li>
        <li><strong>Commercial Moving:</strong> Office and business relocations</li>
        <li><strong>Packing Services:</strong> Heat-safe packing for Phoenix climate</li>
        <li><strong>Storage Solutions:</strong> Climate-controlled storage facilities</li>
        <li><strong>Piano Moving:</strong> Specialized piano and heavy item moving</li>
      </ul>

      <h3>Why Choose Our Phoenix Movers?</h3>
      <p>Phoenix's extreme heat requires special moving considerations. Our team is trained to handle moves in Arizona's desert climate, protecting your belongings from heat damage while working efficiently.</p>
      
      <ul>
        <li>Heat-resistant packing materials</li>
        <li>Climate-controlled trucks</li>
        <li>Early morning moves to avoid peak heat</li>
        <li>Experienced with Phoenix's sprawling layout</li>
        <li>Licensed and insured in Arizona</li>
        <li>Same-day service available</li>
      </ul>

      <h3>Phoenix Metro Areas We Serve</h3>
      <ul>
        <li>Downtown Phoenix and Midtown</li>
        <li>Scottsdale and Paradise Valley</li>
        <li>Tempe and ASU area</li>
        <li>Mesa and Gilbert</li>
        <li>Chandler and Ahwatukee</li>
        <li>Glendale and Peoria</li>
        <li>Surprise and Avondale</li>
        <li>Fountain Hills and Cave Creek</li>
      </ul>

      <h3>Get Your Free Phoenix Moving Quote</h3>
      <p>Ready to move? Contact our Phoenix moving specialists for a free estimate. We're available 7 days a week to help plan your move and answer any questions.</p>
    `,
    faqs: [
      {
        question: "How much do movers cost in Phoenix?",
        answer: "Phoenix moving costs range from $350-$700 for local apartment moves and $800-$1,800 for house moves. Long-distance moves from Phoenix start at $2,000. We provide transparent pricing with no hidden fees."
      },
      {
        question: "How do you handle Phoenix's extreme heat?",
        answer: "We schedule moves early in the morning when possible, use climate-controlled trucks, provide heat-resistant packing materials, and ensure our crew stays hydrated. Your belongings are protected from heat damage."
      },
      {
        question: "Can you move during Phoenix summers?",
        answer: "Yes! We move year-round in Phoenix. Summer moves are scheduled for early morning hours (starting at 6-7 AM) to avoid peak heat. Our trucks are climate-controlled to protect your items."
      },
      {
        question: "Do you serve all Phoenix suburbs?",
        answer: "Absolutely! We serve the entire Phoenix metropolitan area including Scottsdale, Tempe, Mesa, Gilbert, Chandler, Glendale, Peoria, Surprise, and all surrounding cities."
      },
      {
        question: "What about moving pianos in the heat?",
        answer: "We specialize in piano moving with climate-controlled transport. Pianos are especially sensitive to heat and humidity, so we take extra precautions to protect them during Phoenix moves."
      }
    ],
    published: true,
  },
];

async function main() {
  console.log("🌱 Seeding cities...");

  for (const city of cities) {
    await prisma.movingCity.upsert({
      where: { slug: city.slug },
      update: city,
      create: city,
    });
    console.log(`✅ Created/Updated: ${city.name}, ${city.state}`);
  }

  console.log("✅ Cities seeded successfully!");
  console.log("\n📍 Created city pages:");
  cities.forEach(city => {
    console.log(`   - /movers/${city.slug} (${city.name}, ${city.state})`);
  });
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

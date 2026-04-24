import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const mediaItems = [
  // Hero Images
  {
    title: "Moving Truck Hero",
    alt: "Professional moving truck ready for service",
    url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=1920&h=1080&fit=crop",
    category: "hero",
    tags: ["truck", "moving", "professional"],
    width: 1920,
    height: 1080,
  },
  {
    title: "Packing Boxes Hero",
    alt: "Organized packing boxes for moving",
    url: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=1920&h=1080&fit=crop",
    category: "hero",
    tags: ["packing", "boxes", "organized"],
    width: 1920,
    height: 1080,
  },
  {
    title: "Happy Family Moving",
    alt: "Happy family in their new home",
    url: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1920&h=1080&fit=crop",
    category: "hero",
    tags: ["family", "happy", "home"],
    width: 1920,
    height: 1080,
  },

  // Service Images
  {
    title: "Local Moving Service",
    alt: "Local moving service with professional movers",
    url: "https://images.unsplash.com/photo-1600880292089-90a7e086ee0c?w=800&h=600&fit=crop",
    category: "service",
    tags: ["local", "moving", "service"],
    width: 800,
    height: 600,
  },
  {
    title: "Long Distance Moving",
    alt: "Long distance moving truck on highway",
    url: "https://images.unsplash.com/photo-1464207687429-7505649dae38?w=800&h=600&fit=crop",
    category: "service",
    tags: ["long-distance", "highway", "truck"],
    width: 800,
    height: 600,
  },
  {
    title: "Packing Services",
    alt: "Professional packing services with bubble wrap",
    url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
    category: "service",
    tags: ["packing", "professional", "supplies"],
    width: 800,
    height: 600,
  },
  {
    title: "Storage Solutions",
    alt: "Clean storage facility for moving items",
    url: "https://images.unsplash.com/photo-1595428774223-ef52624120d2?w=800&h=600&fit=crop",
    category: "service",
    tags: ["storage", "facility", "secure"],
    width: 800,
    height: 600,
  },
  {
    title: "Commercial Moving",
    alt: "Office furniture being moved by professionals",
    url: "https://images.unsplash.com/photo-1497366216548-37526070297c?w=800&h=600&fit=crop",
    category: "service",
    tags: ["commercial", "office", "business"],
    width: 800,
    height: 600,
  },
  {
    title: "Furniture Assembly",
    alt: "Professional furniture assembly service",
    url: "https://images.unsplash.com/photo-1556228578-0d85b1a4d571?w=800&h=600&fit=crop",
    category: "service",
    tags: ["assembly", "furniture", "tools"],
    width: 800,
    height: 600,
  },

  // City Images
  {
    title: "New York City Skyline",
    alt: "New York City skyline for moving services",
    url: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=1200&h=800&fit=crop",
    category: "city",
    tags: ["new-york", "nyc", "skyline"],
    width: 1200,
    height: 800,
  },
  {
    title: "Los Angeles Downtown",
    alt: "Los Angeles downtown area",
    url: "https://images.unsplash.com/photo-1534190239940-9ba8944ea261?w=1200&h=800&fit=crop",
    category: "city",
    tags: ["los-angeles", "california", "downtown"],
    width: 1200,
    height: 800,
  },
  {
    title: "Chicago Architecture",
    alt: "Chicago city architecture and buildings",
    url: "https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=1200&h=800&fit=crop",
    category: "city",
    tags: ["chicago", "illinois", "architecture"],
    width: 1200,
    height: 800,
  },
  {
    title: "Houston Cityscape",
    alt: "Houston Texas cityscape",
    url: "https://images.unsplash.com/photo-1577471488278-16eec37ffcc2?w=1200&h=800&fit=crop",
    category: "city",
    tags: ["houston", "texas", "cityscape"],
    width: 1200,
    height: 800,
  },
  {
    title: "Miami Beach",
    alt: "Miami Florida beach and city view",
    url: "https://images.unsplash.com/photo-1506966953602-c20cc11f75e3?w=1200&h=800&fit=crop",
    category: "city",
    tags: ["miami", "florida", "beach"],
    width: 1200,
    height: 800,
  },
  {
    title: "Seattle Skyline",
    alt: "Seattle Washington skyline with Space Needle",
    url: "https://images.unsplash.com/photo-1541029071515-84cc54f84dc5?w=1200&h=800&fit=crop",
    category: "city",
    tags: ["seattle", "washington", "space-needle"],
    width: 1200,
    height: 800,
  },
  {
    title: "Boston Historic",
    alt: "Boston Massachusetts historic buildings",
    url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=800&fit=crop",
    category: "city",
    tags: ["boston", "massachusetts", "historic"],
    width: 1200,
    height: 800,
  },
  {
    title: "San Francisco Golden Gate",
    alt: "San Francisco with Golden Gate Bridge",
    url: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=1200&h=800&fit=crop",
    category: "city",
    tags: ["san-francisco", "california", "golden-gate"],
    width: 1200,
    height: 800,
  },

  // Blog/General Images
  {
    title: "Moving Checklist",
    alt: "Person checking moving checklist",
    url: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?w=800&h=600&fit=crop",
    category: "blog",
    tags: ["checklist", "planning", "organization"],
    width: 800,
    height: 600,
  },
  {
    title: "Packing Tips",
    alt: "Organized packing with labels",
    url: "https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&h=600&fit=crop",
    category: "blog",
    tags: ["tips", "packing", "organization"],
    width: 800,
    height: 600,
  },
];

async function main() {
  console.log("🌱 Seeding media gallery...");

  for (const item of mediaItems) {
    await prisma.mediaGallery.upsert({
      where: { url: item.url },
      update: item,
      create: {
        ...item,
        uploadedBy: "system",
      },
    });
  }

  console.log("✅ Media gallery seeded successfully!");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });

// Test script for blog creation API
const testBlogCreation = async () => {
  const testData = {
    title: "Test Blog Post",
    slug: "test-blog-post",
    excerpt: "This is a test excerpt for the blog post.",
    content: "<p>This is a test blog post content with <strong>rich text formatting</strong>.</p><p>It includes multiple paragraphs and formatting.</p>",
    category: "travel",
    tags: "test, blog, travel",
    featuredImage: "https://example.com/image.jpg",
    published: false
  };

  try {
    console.log("🧪 Testing blog creation API...");
    console.log("📤 Sending data:", JSON.stringify(testData, null, 2));
    
    const response = await fetch("http://localhost:3000/api/blog", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(testData),
    });

    console.log(`📡 Response status: ${response.status}`);
    const responseData = await response.json();
    console.log("📥 Response data:", JSON.stringify(responseData, null, 2));

    if (response.ok) {
      console.log("✅ Blog creation test successful!");
    } else {
      console.log("❌ Blog creation test failed:", responseData);
    }
  } catch (error) {
    console.error("💥 Test failed with error:", error);
  }
};

// Run the test
testBlogCreation();
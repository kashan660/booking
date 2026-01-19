"use client";

import { Mail, Phone, MapPin, Send } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function ContactForm() {
  const searchParams = useSearchParams();
  const subject = searchParams.get("subject") || "";

  return (
    <div className="bg-slate-50 p-8 rounded-xl">
      <h2 className="text-2xl font-bold mb-6">Send us a message</h2>
      <form className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium mb-2">First Name</label>
            <Input placeholder="John" />
          </div>
          <div>
            <label className="block text-sm font-medium mb-2">Last Name</label>
            <Input placeholder="Doe" />
          </div>
        </div>
        
        <div>
          <label className="block text-sm font-medium mb-2">Email</label>
          <Input type="email" placeholder="john@example.com" />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Subject</label>
          <Input placeholder="Booking inquiry" defaultValue={subject} />
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Message</label>
          <textarea 
            className="w-full min-h-[150px] p-3 rounded-md border border-input bg-background ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
            placeholder="How can we help you?"
          ></textarea>
        </div>

        <Button className="w-full">
          Send Message <Send className="ml-2 h-4 w-4" />
        </Button>
      </form>
    </div>
  );
}

export default function ContactPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-8">Contact Us</h1>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
        <div>
          <p className="text-xl text-muted-foreground mb-8">
            Have questions about your booking or need assistance? Our 24/7 support team is here to help.
          </p>

          <div className="space-y-6 mb-12">
            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Phone className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Phone & WhatsApp</h3>
                <p className="text-muted-foreground">+44 7466 779542</p>
                <p className="text-sm text-muted-foreground mt-1">Available 24/7</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <Mail className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Email</h3>
                <p className="text-muted-foreground">support@lugvia.com</p>
                <p className="text-sm text-muted-foreground mt-1">We reply within 2 hours</p>
              </div>
            </div>

            <div className="flex items-start space-x-4">
              <div className="bg-primary/10 p-3 rounded-full">
                <MapPin className="h-6 w-6 text-primary" />
              </div>
              <div>
                <h3 className="font-semibold text-lg">Office</h3>
                <p className="text-muted-foreground">
                  123 Business Street<br />
                  Tech City, TC 90210
                </p>
              </div>
            </div>
          </div>
        </div>

        <Suspense fallback={<div className="bg-slate-50 p-8 rounded-xl h-[600px] animate-pulse"></div>}>
          <ContactForm />
        </Suspense>
      </div>
    </div>
  );
}

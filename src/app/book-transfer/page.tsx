import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Book Airport Transfer | Lugvia",
  description: "Book your luxury airport transfer securely.",
};

export default function BookTransferPage() {
  return (
    <div className="min-h-screen flex flex-col">
      <div className="bg-slate-900 text-white py-12 text-center">
        <h1 className="text-3xl font-bold mb-2">Book Your Transfer</h1>
        <p className="text-slate-300">Secure booking powered by our trusted partner</p>
      </div>
      
      <div className="flex-1 w-full h-[800px] relative">
        <iframe 
          src="https://tpo.lu/hZW5cbuI"
          className="absolute inset-0 w-full h-full border-0"
          title="Book Airport Transfer"
          allow="geolocation; microphone; camera"
        />
      </div>
    </div>
  );
}

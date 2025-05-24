import Navbar from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function PricingPage() {
  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-28 pb-12">
        <h1 className="text-4xl font-bold mb-2 text-center">Pricing</h1>
        <p className="text-lg text-gray-400 mb-10 text-center">Simple and transparent pricing for everyone.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 w-full max-w-5xl">
          {/* Free Plan */}
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-8 flex flex-col items-center shadow-lg">
            <h2 className="text-xl font-bold mb-2">Interview Coder <span className="text-yellow-400 text-sm font-normal">Free</span></h2>
            <p className="text-gray-400 mb-6">Try it and see</p>
            <div className="text-4xl font-bold mb-2">$0 <span className="text-base font-normal text-gray-400">/ month</span></div>
            <ul className="text-gray-300 text-sm space-y-2 my-6">
              <li>◯ Evaluate features</li>
              <li>◯ Normal agent models</li>
            </ul>
            <Button asChild className="w-full bg-yellow-400 text-black font-semibold mt-auto hover:bg-yellow-300">
              <Link href="/signup">Get Started →</Link>
            </Button>
          </div>
          {/* Pro Yearly Plan */}
          <div className="bg-[#181818] border-2 border-yellow-400 rounded-2xl p-8 flex flex-col items-center shadow-2xl relative scale-105 z-10">
            <div className="absolute top-4 right-4 flex items-center gap-2">
              <span className="bg-yellow-400 text-black text-xs font-bold px-3 py-1 rounded-full shadow">Most popular</span>
              <span className="text-yellow-400 text-2xl">✔</span>
            </div>
            <h2 className="text-xl font-bold mb-2">Interview Coder <span className="text-yellow-400">Pro</span></h2>
            <p className="text-gray-400 mb-6">Yearly subscription</p>
            <div className="text-4xl font-bold mb-2">$25 <span className="text-base font-normal text-gray-400">/ month</span></div>
            <div className="text-gray-500 text-xs mb-2">$300 billed annually</div>
            <ul className="text-gray-300 text-sm space-y-2 my-6">
              <li>✔ Unlimited yearly usage</li>
              <li>✔ Solving and debugging</li>
              <li>✔ Most powerful agent models</li>
              <li>✔ 24/7 customer support</li>
            </ul>
            <Button asChild className="w-full bg-yellow-400 text-black font-semibold mt-auto hover:bg-yellow-300">
              <Link href="/checkout?plan=annual">Subscribe →</Link>
            </Button>
          </div>
          {/* Pro Monthly Plan */}
          <div className="bg-[#111] border border-gray-800 rounded-2xl p-8 flex flex-col items-center shadow-lg">
            <div className="absolute top-4 right-4 text-yellow-400 text-2xl">✔</div>
            <h2 className="text-xl font-bold mb-2">Interview Coder <span className="text-yellow-400">Pro</span></h2>
            <p className="text-gray-400 mb-6">Monthly subscription</p>
            <div className="text-4xl font-bold mb-2">$60 <span className="text-base font-normal text-gray-400">/ month</span></div>
            <ul className="text-gray-300 text-sm space-y-2 my-6">
              <li>✔ Unlimited monthly usage</li>
              <li>✔ Solving and debugging</li>
              <li>✔ Most powerful agent models</li>
              <li>✔ 24/7 customer support</li>
            </ul>
            <Button asChild className="w-full bg-yellow-400 text-black font-semibold mt-auto hover:bg-yellow-300">
              <Link href="/checkout?plan=monthly">Subscribe →</Link>
            </Button>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
} 
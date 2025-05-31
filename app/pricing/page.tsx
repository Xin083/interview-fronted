"use client"
import Navbar from "@/components/sections/Navbar";
import { Footer } from "@/components/sections/Footer";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import { useLanguage } from "@/lib/i18n/LanguageContext";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function PricingPage() {
  const { t } = useLanguage()
  const [isRedirectingAnnual, setIsRedirectingAnnual] = useState(false);
  const [isRedirectingMonthly, setIsRedirectingMonthly] = useState(false);
  const router = useRouter();

  const handleSubscribe = async (subscriptionType: 'annual' | 'monthly') => {
    const isAnnual = subscriptionType === 'annual';
    if (isAnnual) {
      setIsRedirectingAnnual(true);
    } else {
      setIsRedirectingMonthly(true);
    }

    try {
      // First check if user is authenticated
      const response = await fetch('/api/stripe/create-checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ subscriptionType }),
      });

      const data = await response.json();

      if (response.status === 401 && data.code === 'AUTH_REQUIRED') {
        // User is not authenticated, redirect to signin
        router.push('/signin?redirect=/checkout');
        return;
      }

      if (response.ok && data.url) {
        // Redirect to Stripe Checkout
        window.location.assign(data.url);
      } else {
        console.error('Failed to create Stripe Checkout Session:', data.error);
        alert('Failed to initiate checkout. Please try again later.');
      }
    } catch (error) {
      console.error('Error during checkout initiation:', error);
      alert('An unexpected error occurred. Please try again later.');
    } finally {
      if (isAnnual) {
        setIsRedirectingAnnual(false);
      } else {
        setIsRedirectingMonthly(false);
      }
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex flex-col">
      <Navbar />
      <main className="flex-1 flex flex-col items-center justify-center px-4 pt-28 pb-12">
        {/*<h1 className="text-4xl font-bold mb-2 text-center">Pricing</h1>*/}
        <h2 className="text-4xl sm:text-5xl font-bold mb-4" style={{
          textShadow: "0 0 20px rgba(255, 255, 255, 0.3)"
        }}>
          <span className="white-gradient">{t("nav.pricing")}</span>
        </h2>
        <p className="text-lg text-gray-400 mb-10 text-center">Simple and transparent pricing for everyone.</p>
        <div className="grid grid-cols-1 md:grid-cols-3 w-full max-w-7xl">
          {/* Free Plan */}
          <div className="bg-[#111] border border-gray-800 rounded-2xl py-14 px-10 min-h-[400px] flex flex-col shadow-lg">
            <div>
              <h2 className="text-2xl font-bold text-white mb-1">
                Interview Coder <span className="text-yellow-200">Free</span>
              </h2>
              <p className="text-lg text-gray-400 mb-8">Try it and see</p>
              <div className="flex items-end mb-2">
                <span className="text-6xl font-extrabold text-white">¥0</span>
                <span className="text-xl text-gray-400 ml-2 mb-1">/ month</span>
              </div>
              <div className="w-full border-t border-gray-700 my-8" />
              <ul className="text-gray-300 text-base space-y-3 mb-8">
                <li className="flex items-center gap-2">
                  <span className="text-lg text-white">✔</span>
                  Evaluate features
                </li>
                <li className="flex items-center gap-2">
                  <span className="text-lg text-white">✔</span>
                  Normal agent models
                </li>
              </ul>
            </div>
            <Button asChild className="w-full bg-yellow-400 text-black font-semibold mt-auto hover:bg-yellow-300">
              <Link href="/signup">Get Started →</Link>
            </Button>
          </div>
          {/* Pro Yearly Plan */}
          <div className="bg-[#181818] border-2 border-yellow-400 rounded-2xl py-14 px-10 min-h-[400px] flex flex-col shadow-2xl relative">
            {/* 高亮描边勾选标志 */}
            <div className="absolute top-6 right-6">
              <span className="inline-block rounded-full border-4 border-yellow-200 bg-yellow-200/20 p-2 shadow-[0_0_16px_4px_rgba(255,255,0,0.5)]">
                <svg width="32" height="32" viewBox="0 0 32 32" fill="none">
                  <circle cx="16" cy="16" r="14" stroke="#FFD600" strokeWidth="3" fill="none" />
                  <path d="M10 17l4 4 8-8" stroke="#FFD600" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </span>
            </div>
            <h2 className="text-2xl font-bold text-white mb-1">
              Interview Coder <span className="text-yellow-200">Pro</span>
            </h2>
            <div className="text-base text-yellow-200 font-semibold mb-4">Most popular</div>
            <div className="flex items-end mb-2">
              <span className="text-6xl font-extrabold text-white">¥25</span>
              <span className="text-xl text-gray-400 ml-2 mb-1">/ month</span>
            </div>
            <div className="flex items-center w-full my-6">
              <div className="flex-1 border-t border-gray-700"></div>
              <span className="mx-4 text-gray-500 text-base">¥300 billed annually</span>
              <div className="flex-1 border-t border-gray-700"></div>
            </div>
            <ul className="text-gray-300 text-base space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <span className="text-yellow-300 text-lg">✔ </span>
                Unlimited yearly usage
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-300 text-lg">✔</span>
                Solving and debugging
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-300 text-lg">✔ </span>
                Most powerful agent models
              </li>
              <li className="flex items-center gap-2">
                <span className="text-yellow-300 text-lg">✔</span>
                24/7 customer support
              </li>
            </ul>
            <Button
              onClick={() => handleSubscribe('annual')}
              disabled={isRedirectingAnnual}
              className="w-full bg-yellow-400 text-black font-semibold mt-auto hover:bg-yellow-300 shadow-[0_4px_32px_0_rgba(255,255,0,0.25)] rounded-full text-lg py-4"
            >
              {isRedirectingAnnual ? 'Redirecting...' : 'Subscribe →'}
            </Button>
          </div>
          {/* Pro Monthly Plan */}
          <div className="bg-[#111] border border-gray-800 rounded-2xl py-14 px-10 min-h-[400px] flex flex-col shadow-lg relative">
            {/* 勾选标志（如需） */}
            {/* <div className="absolute top-4 right-4 text-yellow-400 text-2xl">✔</div> */}
            <h2 className="text-2xl font-bold text-white mb-1">
              Interview Coder <span className="text-yellow-200">Pro</span>
            </h2>
            <p className="text-lg text-gray-400 mb-8">Monthly subscription</p>
            <div className="flex items-end mb-2">
              <span className="text-6xl font-extrabold text-white">¥60</span>
              <span className="text-xl text-gray-400 ml-2 mb-1">/ month</span>
            </div>
            <div className="w-full border-t border-gray-700 my-8" />
            <ul className="text-gray-300 text-base space-y-3 mb-8">
              <li className="flex items-center gap-2">
                <span className="text-lg text-white">✔</span>
                Unlimited monthly usage
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg text-white">✔</span>
                Solving and debugging
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg text-white">✔</span>
                Most powerful agent models
              </li>
              <li className="flex items-center gap-2">
                <span className="text-lg text-white">✔</span>
                24/7 customer support
              </li>
            </ul>
            <Button
              onClick={() => handleSubscribe('monthly')}
              disabled={isRedirectingMonthly}
              className="w-full bg-yellow-400 text-black font-semibold mt-auto hover:bg-yellow-300 shadow-[0_4px_32px_0_rgba(255,255,0,0.25)]"
            >
              {isRedirectingMonthly ? 'Redirecting...' : 'Subscribe →'}
            </Button>
          </div>
        </div>
      </main>
    </div>
  );
} 
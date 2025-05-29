"use client"
import Navbar from "@/components/sections/Navbar"
// import { BackgroundBeamsWithCollision } from "@/components/ui/background-beams"
import { CommandsSection } from "@/components/sections/CommandsSection"
import { FaqSection } from "@/components/sections/FaqSection"
import { Footer } from "@/components/sections/Footer"
import { HeroSection } from "@/components/sections/HeroSection"
import PricingPage from "@/app/pricing/page"


import { StepsSection } from "@/components/sections/StepsSection"
import { CompanySection } from "@/components/sections/CompanySection"
import { VideoSection } from "@/components/sections/VideoSection"
import { IOSNotice } from "@/components/ui/ios-notice"
import {
  PriceIncreaseBanner,
  BANNER_DISMISSED_KEY
} from "@/components/sections/PriceIncreaseBanner"
import { useEffect, useState } from "react"
import UndetectabilitySection from "@/components/sections/UndetectabilitySection"
import {useLanguage} from "@/lib/i18n/LanguageContext";

export default function Home() {
  const [showBanner, setShowBanner] = useState(false)

  useEffect(() => {
    if (window.location.hash) {
      const id = window.location.hash.replace('#', '');
      setTimeout(() => {
        const el = document.getElementById(id);
        if (el) {
          el.scrollIntoView({ behavior: "smooth" });
        }
      }, 50);
    }
  }, []);

  // useEffect(() => {
  //   function scrollToHash() {
  //     if (window.location.hash) {
  //       const id = window.location.hash.replace('#', '');
  //       // 尝试多次，直到元素出现
  //       let tries = 0;
  //       const maxTries = 10;
  //       const tryScroll = () => {
  //         const el = document.getElementById(id);
  //         if (el) {
  //           el.scrollIntoView({ behavior: "smooth" });
  //         } else if (tries < maxTries) {
  //           tries++;
  //           setTimeout(tryScroll, 50);
  //         }
  //       };
  //       tryScroll();
  //     }
  //   }
  //
  //   // 首次加载
  //   scrollToHash();
  //
  //   // hash 变化时也滚动
  //   window.addEventListener('hashchange', scrollToHash);
  //
  //   return () => {
  //     window.removeEventListener('hashchange', scrollToHash);
  //   };
  // }, []);


  useEffect(() => {
    // Check if banner was previously dismissed
    const isDismissed = localStorage.getItem(BANNER_DISMISSED_KEY)
    if (!isDismissed) {
      setShowBanner(true)
    }
  }, [])

  const handleDismiss = () => {
    localStorage.setItem(BANNER_DISMISSED_KEY, "true")
    setShowBanner(false)
  }

  const { t } = useLanguage()
  return (
      <div className="relative w-screen overflow-x-hidden hero-gradient  select-none">
          {/* <PriceIncreaseBanner isVisible={showBanner} onDismiss={handleDismiss} /> */}
          <Navbar showBanner={showBanner}/>
          <HeroSection/>
          <CompanySection/>
          <div id="proof">
              <VideoSection/>
          </div>
          <div id="undetectability">
              <UndetectabilitySection/>
          </div>

          <div id="how-to-use">
              <StepsSection/>
          </div>
          <CommandsSection/>

          <div id="pricing">
              <PricingPage/>
          </div>

          <div id="faq">
              <FaqSection/>
          </div>
          <Footer/>
          <IOSNotice/>
      </div>
  )
}

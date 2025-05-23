"use client"
import { motion } from "framer-motion"
import { Button } from "@/components/ui/button"
import { HeroVideo } from "@/components/ui/hero-video"
import { WingsBackground } from "@/components/ui/WingsBackground"
import Image from "next/image"
import Link from "next/link"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export const HeroSection = () => {
  const { t } = useLanguage()

  return (
    <main className="relative min-h-[90vh] overflow-hidden flex flex-col items-center justify-center pt-36">
      {/* <WingsBackground /> */}
      <button className="relative inline-flex h-7 overflow-hidden rounded-full p-[1px]  mb-9">
        <span className="absolute inset-[-1000%] animate-[spin_2s_linear_infinite] bg-[conic-gradient(from_90deg_at_50%_50%,#FFFF00_0%,transparent_50%,#FFFF00_100%)]" />
        <span className="inline-flex h-full w-full cursor-pointer items-center justify-center rounded-full bg-slate-950 px-3 py-1 text-sm font-medium text-white backdrop-blur-3xl">
          <a href="#" className="text-lg inline-flex h-full px-3 py-1 w-full cursor-pointer items-center justify-center rounded-full bg-stone-900 backdrop-blur-3xl">
            This still works.
            <span className="ml-1 font-semibold text-primary">Here's how we know.
              <span aria-hidden="true"> -&gt;</span>
          </span>
          </a>

        </span>
      </button>
      <div className="container relative z-10 px-4 text-center max-w-3xl mx-auto">
        <motion.h2
            initial={{opacity: 0, scale: 0.5}}
            animate={{opacity: 1, scale: 1}}
            transition={{duration: 0.5, delay: 0.4}}
            className="text-4xl sm:text-5xl lg:text-6xl font-medium tracking-tight leading-[1.3]"
        >
          <span className="white-gradient pb-6  ">{t("hero.tagline")}</span>
        </motion.h2>

        <motion.h1
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.2 }}
          className="mb-12 text-center text-md lg:text-[16px] lg:px-24 font-medium text-[#B3B3B3] font-['Inter']"
          style={{
            fontFamily: '"Inter", "Inter Placeholder", sans-serif',
            fontWeight: 500
          }}
        >
          {t("hero.subtitle")}
        </motion.h1>

        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="flex flex-col sm:flex-row gap-4 justify-center items-center"
        >
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className="
                  bg-yellow-300 text-black
                  px-8 py-3 h-14 min-w-[240px]
                  rounded-full text-lg font-semibold
                  shadow-[0_0_24px_4px_rgba(255,255,0,0.25)]
                  ring-2 ring-yellow-200/60
                  hover:bg-yellow-200 transition-all
                "
              >
                <div className="flex items-center gap-2">
                  <Image src="/apple.svg" alt="Apple" width={20} height={20} className="w-6 h-6" />
                  {t("hero.downloadMac")}
                </div>
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              className="
                mt-2 rounded-2xl border border-yellow-200/30
                bg-black/90 shadow-lg shadow-yellow-200/10
                min-w-[260px] p-2
              "
            >
              <DropdownMenuItem>
                <Link href="https://github.com/InterviewCoder863/Interview-coder/releases/download/v1.0.2/Interview-Coder-arm64.dmg" className="w-full">
                  {t("hero.macSilicon")}
                </Link>
              </DropdownMenuItem>
              <DropdownMenuItem>
                <Link href="https://github.com/InterviewCoder863/Interview-coder/releases/download/v1.0.2/Interview-Coder-x64.dmg" className="w-full">
                  {t("hero.macIntel")}
                </Link>
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
          <Button
            variant="highlight"
            className="
              border border-yellow-300 bg-transparent text-yellow-300
              px-8 py-3 h-14 min-w-[240px]
              rounded-full text-lg font-semibold
              shadow-[0_0_24px_4px_rgba(255,255,0,0.25)]
              ring-2 ring-yellow-200/60
              hover:bg-yellow-200/10 hover:text-black transition-all
            "
          >
            <Link
              href="https://github.com/InterviewCoder863/Interview-coder/releases/download/v1.0.2/Interview.Coder-Windows-1.0.19.exe"
              className="flex items-center gap-2"
            >
              <Image src="/windows.svg" alt="Windows" width={20} height={20} className="w-6 h-6" />
              {t("hero.downloadWindows")}
            </Link>
          </Button>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.8 }}
          className="mt-8"
        >
          <HeroVideo />
        </motion.div>
      </div>
    </main>
  )
}

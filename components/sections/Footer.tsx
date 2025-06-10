"use client"

import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { useState, useEffect } from "react"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/lib/i18n/LanguageContext"

export function Footer() {
  const { t } = useLanguage()

  return (
    <footer className="border-t border-neutral-800 bg-neutral-900/50 backdrop-blur-sm relative overflow-hidden">
      <div className="container mx-auto px-4 py-24 z-10 relative">


        <div className="grid grid-cols-1 md:grid-cols-12 gap-8 justify-center pl-32 pr-32 pt-8 pb-60">

          
          {/* Left Column */}
          <div className="md:col-span-4 flex flex-col gap-6">
            <div className="flex items-center justify-left gap-8">
              <Image
                src="/logo.svg"
                alt="Interview Coder"
                width={36}
                height={36}
                className="w-10 h-10 rounded-full"
              />
              <span className="font-bold text-xl text-yellow-200">
                Interview Coder
              </span>
            </div>

            <div className="text-neutral-300/90 text-sm max-w-sm ml-2">
              {/*{t("footer.description")}*/}
              Interview Coder is a desktop app designed to help job seekers ace technical interviews by providing real-time assistance with coding questions.
            </div>

            <div className="bg-neutral-900 border border-neutral-800 rounded-full px-4 py-2 flex items-center gap-2 w-fit">
              <div className="relative">
                <div className="w-2 h-2 bg-green-500 rounded-full" />
                <div className="absolute inset-0 w-2 h-2 bg-green-500 rounded-full animate-ping" />
              </div>
              <span className="text-neutral-300/90 text-sm max-w-sm ml-2">
                {t("footer.allSystemsOnline")}
              </span>
            </div>
          </div>

          {/* Middle Column - Support */}
          <div className="md:col-start-10 md:col-span-4 flex flex-col gap-4">
            <h3 className="text-neutral-400 font-semibold ">
              {t("footer.support")}
            </h3>
            <div className="flex flex-col gap-2">
              <Link
                href="/contact"
                className="text-neutral-500 hover:text-neutral-300 text-sm"
              >
                {t("footer.contact")}
              </Link>
              <Link
                href="/policies"
                className="text-neutral-500 hover:text-neutral-300 text-sm"
              >
                {t("footer.refundPolicy")}
              </Link>
              <Link
                href="/policies"
                className="text-neutral-500 hover:text-neutral-300 text-sm"
              >
                {t("footer.cancellationPolicy")}
              </Link>
              <Link
                href="/policies"
                className="text-neutral-500 hover:text-neutral-300 text-sm"
              >
                {t("footer.termsOfService")}
              </Link>
            </div>
          </div>

          {/* Right Column - Download */}
          {/* <div className="md:col-span-4 flex flex-col gap-4 ml-80">
            <h3 className="text-neutral-400 font-semibold">
              {t("footer.download")}
            </h3>
            <div className="flex flex-col gap-4">
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button className="text-black gap-2 text-sm font-medium h-10 bg-primary hover:bg-primary/90 w-fit">
                    <div className="flex items-center gap-2">
                      {t("footer.download")}
                    </div>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-[280px] bg-[#1A1A1A] backdrop-blur-lg border-white/10 rounded-xl py-2 space-y-1">
                  <DropdownMenuItem asChild>
                    <Link
                      href="https://github.com/ibttf/interview-coder/releases/download/v1.0.19/Interview-Coder-arm64.dmg"
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-[#ABABAB] hover:text-white"
                    >
                      <Image
                        src="/apple-white.svg"
                        alt="Apple"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                      {t("hero.macSilicon")}
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem asChild>
                    <Link
                      href="https://github.com/ibttf/interview-coder/releases/download/v1.0.19/Interview-Coder-x64.dmg"
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-[#ABABAB] hover:text-white"
                    >
                      <Image
                        src="/apple-white.svg"
                        alt="Apple"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                      {t("hero.macIntel")}
                    </Link>
                  </DropdownMenuItem>
                  <div className="h-px bg-white/10 mx-3 my-1" />
                  <DropdownMenuItem asChild>
                    <Link
                      href="https://github.com/ibttf/interview-coder/releases/download/v1.0.19/Interview.Coder-Windows-1.0.19.exe"
                      className="w-full flex items-center gap-2 px-3 py-2.5 text-[#ABABAB] hover:text-white"
                    >
                      <Image
                        src="/windows_white.svg"
                        alt="Windows"
                        width={16}
                        height={16}
                        className="w-4 h-4"
                      />
                      {t("hero.downloadWindows")}
                    </Link>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div> */}

          
        </div>



        
        {/* Large Faded Text Effect */}
        <div className="absolute bottom-0 left-1/2 transform -translate-x-1/2 translate-y-[10%] text-center pointer-events-none z-0">
          <span
            // className="text-[150px] lg:text-[200px] font-bold text-white opacity-100 leading-none"
            className="text-center mt-20 text-[min(12vw,12rem)] font-bold bg-clip-text text-transparent bg-gradient-to-b from-neutral-950 to-primary/20 inset-x-0 lg:-mb-5 select-none whitespace-nowrap"
            style={{
              backgroundImage: 'linear-gradient(to bottom, rgba(255,255,255,0.15), rgba(255,255,255,0))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              textShadow: '0 0 8px rgba(200,200,200,50)'
            }}
          >
            Interview Coder
          </span>
        </div>

        {/* Bottom Section */}
        {/*<div className="flex flex-col sm:flex-row justify-between items-center mt-12 pt-8 border-t border-neutral-800 z-10 relative">
          <p className="text-neutral-500 text-sm mb-4 sm:mb-0">
            {t("footer.allRightsReserved")}
          </p>
          <Link href="https://twitter.com/interviewcoder" target="_blank">
            <Image
              src="/twitter.svg"
              alt="Twitter"
              width={20}
              height={20}
              className="opacity-50 hover:opacity-100 transition-opacity"
            />
          </Link>
        </div>*/}
      </div>
    </footer>
  )
}

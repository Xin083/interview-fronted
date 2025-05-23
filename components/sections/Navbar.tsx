"use client"

import Link from "next/link"
import Image from "next/image"
import { useEffect, useState, useRef } from "react"
import { supabase } from "@/lib/supabase/client"
import { useRouter } from "next/navigation"
import { cn } from "@/lib/utils"
import { ChevronDown, Menu, Lock, Star } from "lucide-react"
import { Avatar, AvatarFallback, AvatarImage } from "../ui/avatar"
import { Button } from "../ui/button"
import { Skeleton } from "../ui/skeleton"
import { useQueryClient, useQuery } from "@tanstack/react-query"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu"
import { Badge } from "../ui/badge"
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger
} from "@/components/ui/tooltip"
import { LanguageToggle } from "../ui/LanguageToggle"
import { useLanguage } from "@/lib/i18n/LanguageContext"

async function fetchUserAndSubscription() {
  const {
    data: { session }
  } = await supabase.auth.getSession()
  if (!session) return { user: null, subscription: null }

  const { data: subscription } = await supabase
    .from("subscriptions")
    .select("*")
    .eq("user_id", session.user.id)
    .single()

  return { user: session.user, subscription }
}

async function fetchGitHubStars() {
  try {
  const response = await fetch(
    "https://api.github.com/repos/ibttf/interview-coder"
  )
    if (!response.ok) throw new Error("Network error")
  const data = await response.json()
    return data.stargazers_count || 0
  } catch (e) {
    return 0
  }
}

const GitHubStarsButton = ({
  githubData,
  isLoading
}: {
  githubData: number | undefined
  isLoading: boolean
}) => {
  if (isLoading) {
    return <Skeleton className="h-6 w-[80px] mr-4" />
  }

  return (
    <Link
      href="https://github.com/ibttf/interview-coder"
      target="_blank"
      rel="noopener noreferrer"
      className="rounded-full flex items-center gap-2 text-[#989898] hover:text-white transition-colors px-3 py-1.5 hover:bg-white/10"
    >
      <Image
        src="/github.svg"
        alt="GitHub"
        width={20}
        height={20}
        className="w-5 h-5"
      />
      <span className="text-sm">{githubData || 911}</span>
    </Link>
  )
}

interface NavbarProps {
  showBanner?: boolean
}

export default function Navbar({ showBanner = false }: NavbarProps) {
  const [scrollProgress, setScrollProgress] = useState(0)
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [windowWidth, setWindowWidth] = useState(0)
  const mobileMenuRef = useRef<HTMLDivElement>(null)
  const menuButtonRef = useRef<HTMLButtonElement>(null)
  const router = useRouter()
  const [isSigningOut, setIsSigningOut] = useState(false)
  const queryClient = useQueryClient()
  const { t } = useLanguage()
  const [highlight, setHighlight] = useState<{ left: number; width: number } | null>(null)
  const navRef = useRef<HTMLDivElement>(null)
  const floatZone = 10; // px
  const maxDown = 30;   // px
  const [navOffset, setNavOffset] = useState(10)
  const lastScrollY = useRef(0)

  const { data, isLoading: loading } = useQuery({
    queryKey: ["user-nav"],
    queryFn: fetchUserAndSubscription,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    refetchInterval: 1000 * 60 * 5 // Refetch every 5 minutes
  })

  const { data: githubData, isLoading: githubLoading } = useQuery({
    queryKey: ["github-stars"],
    queryFn: fetchGitHubStars,
    staleTime: 1000 * 60 * 5, // Consider data fresh for 5 minutes
    refetchInterval: 1000 * 60 * 5 // Refetch every 5 minutes
  })

  const user = data?.user
  const subscription = data?.subscription
  const isSubscribed = subscription?.status === "active"

  // Add window width tracking
  useEffect(() => {
    setWindowWidth(window.innerWidth)
    const handleResize = () => setWindowWidth(window.innerWidth)
    window.addEventListener("resize", handleResize)
    return () => window.removeEventListener("resize", handleResize)
  }, [])

  // Add click outside handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (
        mobileMenuRef.current &&
        !mobileMenuRef.current.contains(event.target as Node) &&
        !menuButtonRef.current?.contains(event.target as Node)
      ) {
        setMobileMenuOpen(false)
      }
    }
    document.addEventListener("mousedown", handleClickOutside)
    return () => document.removeEventListener("mousedown", handleClickOutside)
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const progress = Math.min(1, window.scrollY / (window.innerHeight * 0.1))
      setScrollProgress(progress)
    }

    window.addEventListener("scroll", handleScroll)
    handleScroll()

    return () => {
      window.removeEventListener("scroll", handleScroll)
    }
  }, [])

  useEffect(() => {
    const handleScroll = () => {
      const y = window.scrollY;
      if (y <= 0) {
        setNavOffset(10);
      } else if (y > 10 && y < floatZone) {
        setNavOffset((y / floatZone) * maxDown);
      } else {
        setNavOffset(maxDown);
      }
    };
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleSignOut = async () => {
    try {
      setIsSigningOut(true)
      const { error } = await supabase.auth.signOut()
      if (error) throw error

      // Invalidate and remove all queries from the cache
      await queryClient.invalidateQueries()
      queryClient.removeQueries()

      // Then navigate
      router.push("/")
    } catch (error) {
      console.error("Error signing out:", error)
      setIsSigningOut(false)
    }
  }

  const handleMouseEnter = (e: React.MouseEvent<HTMLElement>) => {
    const parent = navRef.current
    const rect = (e.target as HTMLElement).getBoundingClientRect()
    const parentRect = parent!.getBoundingClientRect()
    setHighlight({
      left: rect.left - parentRect.left,
      width: rect.width
    })
  }

  const renderAuthSection = () => {
    if (loading) {
      return (
        <>
          <div className="hidden md:flex items-center gap-4">
            <Skeleton className="h-9 w-[100px]" />
            <Skeleton className="h-9 w-[100px]" />
            <Skeleton className="h-8 w-8 rounded-full" />
          </div>
        </>
      )
    }

    if (user) {
      return (
        <>
          {/* <GitHubStarsButton
            githubData={githubData}
            isLoading={githubLoading}
          /> */}
          {/*<LanguageToggle />*/}
          {!isSubscribed && (
              // <Button
              //   onClick={() => router.push("/checkout")}
              //   className="relative"
              // >
              // <Lock className="w-4 h-4 mr-2 text-black" />
              // {t("nav.signup")}
              // </Button>
              // <div
              //     className="absolute -top-1 -right-1 bg-primary text-black text-[6px] font-semibold px-2.5 rounded-full">
              <></>
                )}
                <DropdownMenu>
                  <DropdownMenuTrigger asChild>
                    <button className="flex items-center gap-2 hover:opacity-80 transition-opacity">
                      <ChevronDown className="w-4 h-4 text-[#989898]"/>
                      <div className="relative">
                        <Avatar className="h-8 w-8">
                          <AvatarImage src={user.user_metadata?.avatar_url}/>
                          <AvatarFallback className="bg-primary text-xs">
                            {user.email?.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        {isSubscribed ? (
                            <div
                                className="absolute -top-1 -right-3 bg-primary text-black text-[6px] font-semibold px-1.5 rounded-full">
                              {t("misc.pro")}
                            </div>
                        ) : (
                            <div className="absolute -top-1 -right-3 bg-gray-500 text-white text-[10px] font-semibold px-1.5 rounded-full">
                                {t('misc.free')}
                            </div>
                            )}
                      </div>
                    </button>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent
                      align="end"
                      className="w-56 bg-[#1A1A1A] backdrop-blur-lg border-white/10 rounded-xl py-2 space-y-1"
                  >
                    <DropdownMenuItem asChild>
                      <Link
                          href="/settings"
                          className="cursor-pointer text-[#ABABAB] hover:text-white px-3 py-2.5"
                      >
                        {t("nav.settings")}
                      </Link>
                    </DropdownMenuItem>
                    <DropdownMenuItem asChild>
                      <Link
                          href="/help"
                          className="cursor-pointer text-[#ABABAB] hover:text-white px-3 py-2.5"
                      >
                        {t("nav.help")}
                      </Link>
                    </DropdownMenuItem>
                    <div className="h-px bg-white/10 mx-3 my-1"/>
                    <DropdownMenuItem
                        onClick={handleSignOut}
                        disabled={isSigningOut}
                        className="cursor-pointer text-[#FF4545] hover:text-red-400 px-3 py-2.5 disabled:opacity-50 disabled:cursor-not-allowed"
                    >
                      {isSigningOut ? t("nav.signingOut") : t("nav.logout")}
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </>
          )
          }

          return (
          <>
            {/* <GitHubStarsButton githubData={githubData} isLoading={githubLoading} /> */}
            {/*<LanguageToggle />*/}
        <Link href="/signin">
          <Button variant="ghost" className="text-[#989898] hover:text-white">
            {t("nav.login")}
          </Button>
        </Link>
        <Link href="/signup">
          <Button className="bg-primary text-black hover:bg-primary/90 h-9 px-6">
            {t("nav.signup")}
          </Button>
        </Link>
      </>
    )
  }

  return (
    <>
      <nav
        className={cn(
          "fixed left-1/2 z-50 -translate-x-1/2 flex items-center transition-all duration-700 backdrop-blur-xl",//top-3
          "w-[1000px] h-[40px] rounded-full",
          navOffset > 10
            ? "border border-white/10 shadow-lg"
            : "border-transparent shadow-none"
        )}
        style={{
          transform: `translate(-50%, ${navOffset}px)`,
          background: navOffset === 10 ? "rgba(0,0,0,0.0)" : "hero-gradient"
        }}
      >
        <div className="flex-1 flex items-center justify-between pl-3 pr-2 w-full">
          <Link
            href="/"
            className="text-white hover:text-white/80 transition-colors flex items-center gap-2 shrink-0"
          >
            <Image
              src="/logo.svg"
              alt="Interview Coder"
              width={24}
              height={24}
              className="w-6 h-6 rounded-full"
            />
            <span
              className="text-sm font-semibold transition-opacity duration-300 md:block hidden"
              style={{
                opacity: Math.max(0, 1 - scrollProgress * 2)
              }}
            >
              Interview Coder
            </span>
          </Link>

          <div className="flex-1 flex items-center justify-center">
            <div
              className="hidden md:flex items-center gap-8 absolute left-1/2 -translate-x-1/2"
              style={{
                justifyContent: "center"
              }}
            >

              <div className="hidden md:flex items-center gap-6 relative"
                style={{ minHeight: 40 }}
                ref={navRef}
                onMouseLeave={() => setHighlight(null)}
              >
                {highlight && (
                  <div
                    className="absolute top-1/2 -translate-y-1/2 h-9 bg-white/10 rounded-full transition-all duration-300 z-0"
                    style={{
                      left: highlight.left,
                      width: highlight.width,
                      pointerEvents: "none"
                    }}
                  />
                )}
                <Link
                  href="/#proof"
                  className="relative z-10 text-[#989898] hover:text-white transition-colors text-sm flex items-center gap-1.5 px-2 py-2"
                  onMouseEnter={handleMouseEnter}
                >
                  {t("misc.proof")}
                </Link>
                <Link
                  href="/help"
                  className="relative z-10 text-[#989898] hover:text-white transition-colors text-sm px-2 py-2"
                  onMouseEnter={handleMouseEnter}
                >
                  {t("nav.help")}
                </Link>
                <Link
                  href="/#pricing"
                  className="relative z-10 text-[#989898] hover:text-white transition-colors text-sm px-2 py-2"
                  onMouseEnter={handleMouseEnter}
                >
                  {t("nav.pricing")}
                </Link>

                <Link
                  // href="/#still_working"
                  href="/#how-to-use"
                  className="relative z-10 text-[#989898] hover:text-white transition-colors text-sm px-2 py-2 flex items-center"
                  onMouseEnter={handleMouseEnter}
                >
                  Does it work?
                  <span className="inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold focus:outline-hidden focus:ring-2 focus:ring-ring focus:ring-offset-2 relative bg-primary/10 text-primary hover:opacity-90 transition-all border border-primary/40 [text-shadow:0_0_10px_hsl(60_100%_50%_/_0.5)] [box-shadow:0_0_20px_hsl(60_100%_50%_/_0.3)] before:absolute before:-inset-0.5 before:bg-primary/20 before:rounded-full before:blur-[8px] before:-z-10 ml-2">
                    NEW
                  </span>
                </Link>
              </div>
            </div>
          </div>

          <div className="hidden md:flex items-center gap-4 shrink-0">
            {renderAuthSection()}
          </div>

          <button
            ref={menuButtonRef}
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className={cn(
              "md:hidden p-2 hover:bg-white/5 rounded-lg transition-colors",
              mobileMenuOpen && "bg-white/5"
            )}
          >
            <Menu className="w-5 h-5 text-white" />
          </button>
        </div>

        {/* Mobile Menu */}
        {mobileMenuOpen && (
          <div
            ref={mobileMenuRef}
            className="absolute  left-0 right-0 top-14 z-50 md:hidden border-t border-white/10 bg-black/90 backdrop-blur-xl rounded-b-2xl shadow-lg"
          >
            <div className="px-6 py-4 space-y-4">
              <Link
                href="/#proof"
                className="text-[#989898] hover:text-white transition-colors text-sm flex items-center gap-1.5"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("misc.proof")}
              </Link>
              <Link
                href="/help"
                className="text-[#989898] hover:text-white transition-colors text-sm"
                onClick={() => setMobileMenuOpen(false)}
              >
                {t("nav.help")}
              </Link>
              {!loading && (
                <div className="pt-2 border-t border-white/10 w-fit ">
                  {/* <GitHubStarsButton
                    githubData={githubData}
                    isLoading={githubLoading}
                  /> */}
                  {user ? (
                    <>
                      {!isSubscribed && (
                        <Button
                          onClick={() => router.push("/")}
                          className="relative"
                        >
                          <Lock className="w-4 h-4 mr-2 text-black" />
                          {t("nav.signup")}
                        </Button>
                      )}
                      <div className="flex items-center gap-3 py-2">
                        <Avatar className="h-8 w-8">
                          <AvatarImage
                            src={user.user_metadata?.avatar_url}
                          />
                          <AvatarFallback className="bg-primary text-xs">
                            {user.email?.slice(0, 2).toUpperCase()}
                          </AvatarFallback>
                        </Avatar>
                        <div className="flex flex-col">
                          <span className="text-sm text-white">
                            {user.email}
                          </span>
                        </div>
                      </div>
                      <Link
                        href="/settings"
                        className="block text-[#989898] hover:text-white transition-colors text-sm py-2"
                      >
                        Settings
                      </Link>
                      <button
                        onClick={handleSignOut}
                        className="w-full text-left text-[#FF4545] hover:text-red-400 text-sm py-2"
                      >
                        Log out
                      </button>
                    </>
                  ) : (
                    <>
                      <Button
                        variant="outline"
                        className="text-left w-full"
                      >
                        <Link
                          href="/signin"
                          className="block text-[#989898] hover:text-white transition-colors text-sm"
                        >
                          Sign in
                        </Link>
                      </Button>
                      <div className="space-y-2 mt-2">
                        <Button variant="default" className="w-full">
                          <Link
                            href="https://github.com/InterviewCoder863/Interview-coder/releases/download/v1.0.2/Interview-Coder-arm64.dmg"
                            className="flex items-center gap-2 justify-center w-full bg-primary hover:bg-primary/90 text-black transition-all px-4 py-1.5 text-sm font-medium rounded-md"
                          >
                            <Image
                              src="/apple.svg"
                              alt="Apple"
                              width={16}
                              height={16}
                              className="w-4 h-4"
                            />
                            Download for Mac (Apple Silicon)
                          </Link>
                        </Button>
                        <Button variant="default" className="w-full">
                          <Link
                            href="https://github.com/InterviewCoder863/Interview-coder/releases/download/v1.0.2/Interview-Coder-x64.dmg"
                            className="flex items-center gap-2 justify-center w-full bg-primary hover:bg-primary/90 text-black transition-all px-4 py-1.5 text-sm font-medium rounded-md"
                          >
                            <Image
                              src="/apple.svg"
                              alt="Apple"
                              width={16}
                              height={16}
                              className="w-4 h-4"
                            />
                            Download for Mac (Intel)
                          </Link>
                        </Button>

                        <Button variant="default" className="w-full">
                          <Link
                            href="https://github.com/InterviewCoder863/Interview-coder/releases/download/v1.0.2/Interview.Coder-Windows-1.0.19.exe"
                            className="flex items-center justify-center w-full bg-primary hover:bg-primary/90 text-black transition-all px-4 py-1.5 text-sm font-medium rounded-md"
                          >
                            <Image
                              src="/windows_black.svg"
                              alt="Windows"
                              width={16}
                              height={16}
                              className="w-4 h-4"
                            />
                            Download for Windows
                          </Link>
                        </Button>
                      </div>
                    </>
                  )}
                </div>
              )}
            </div>
          </div>
        )}
      </nav>
    </>
  )
}

"use client"

import * as React from "react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"
import { cva } from "class-variance-authority"
import { ChevronDown } from "lucide-react"
import { cn } from "@/lib/utils"
import Link from "next/link"
import { useAuth } from "@/app/contexts/AuthContext"
import { useEffect, useState } from "react"

const NavigationMenu = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.Root>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.Root>
>(({ className, ...props }, ref) => {
  const { user, logout } = useAuth()
  const [profileComplete, setProfileComplete] = useState(true)

  useEffect(() => {
    const checkProfile = async () => {
      if (user) {
        try {
          const res = await fetch(`/api/users?userID=${encodeURIComponent(user.userID || user.email)}`)
          if (res.ok) {
            const profile = await res.json()
            if (!profile.region || !profile.linkedin) {
              setProfileComplete(false)
            } else {
              setProfileComplete(true)
            }
          }
        } catch (err) {
          console.error("Failed to check profile:", err)
        }
      }
    }
    checkProfile()
  }, [user])

  return (
    <NavigationMenuPrimitive.Root
      ref={ref}
      className={cn(
        "relative z-10 flex w-full items-center justify-between bg-[#F4F1ED] px-4 py-3 rounded-md",
        className
      )}
      {...props}
    >
      {/* Left Side Links */}
      <NavigationMenuList className="flex gap-3">
        <NavigationMenuItem>
          <Link href="/" className="px-4 py-2 hover:underline">
            Home
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/browse" className="px-4 py-2 hover:underline">
            Browse Professionals
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/talent-requests" className="px-4 py-2 hover:underline">
            Talent Requests
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/how-it-works" className="px-4 py-2 hover:underline">
            How It Works
          </Link>
        </NavigationMenuItem>
        <NavigationMenuItem>
          <Link href="/contact" className="px-4 py-2 hover:underline">
            Contact
          </Link>
        </NavigationMenuItem>
      </NavigationMenuList>

      {/* Right Side Auth Buttons */}
      <div className="flex items-center gap-3">
        {user ? (
          <>
            <span className="text-sm text-gray-700 flex items-center gap-2">
              {user.fullName || user.email}
              {!profileComplete && (
                <Link
                  href="/profile/create"
                  className="ml-2 text-xs bg-yellow-400 text-gray-800 px-2 py-1 rounded"
                >
                  Profile Incomplete
                </Link>
              )}
            </span>
            <button
              onClick={logout}
              className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              href="/login"
              className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700"
            >
              Login
            </Link>
            <Link
              href="/signup"
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
            >
              Sign Up
            </Link>
          </>
        )}
      </div>
    </NavigationMenuPrimitive.Root>
  )
})
NavigationMenu.displayName = NavigationMenuPrimitive.Root.displayName

// List Component
const NavigationMenuList = React.forwardRef<
  React.ElementRef<typeof NavigationMenuPrimitive.List>,
  React.ComponentPropsWithoutRef<typeof NavigationMenuPrimitive.List>
>(({ className, ...props }, ref) => (
  <NavigationMenuPrimitive.List
    ref={ref}
    className={cn(
      "group flex flex-wrap items-center justify-start space-x-2",
      className
    )}
    {...props}
  />
))
NavigationMenuList.displayName = NavigationMenuPrimitive.List.displayName

const NavigationMenuItem = NavigationMenuPrimitive.Item

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-10 w-max items-center justify-center rounded-full px-4 py-2 text-sm font-medium text-[#4A3B36] transition-colors bg-white hover:bg-[#A8C09D] hover:text-[#4A3B36] focus:outline-none focus:ring-2 focus:ring-[#A87C6F] data-[state=open]:bg-[#A8C09D] data-[state=open]:text-[#4A3B36]"
)

export {
  navigationMenuTriggerStyle,
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
}

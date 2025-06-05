"use client"

import { useEffect, useState, useCallback } from "react"
import {
  CommandDialog,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
  CommandList,
} from "@/components/ui/command"
import { Button } from "@/components/ui/button"
import { Home, Plus, MessageSquare, DollarSign, User, Settings, LogOut, Search } from "lucide-react"
import { useRouter } from "next/navigation"

const commandGroups = [
  {
    heading: "Navigation",
    commands: [
      { name: "Dashboard", icon: Home, action: "/dashboard" },
      { name: "Create Referral", icon: Plus, action: "/referrals/create" },
      { name: "Messages", icon: MessageSquare, action: "/messages" },
      { name: "Earnings", icon: DollarSign, action: "/earnings" },
      { name: "Profile", icon: User, action: "/profile" },
    ],
  },
  {
    heading: "Actions",
    commands: [
      { name: "New Private Referral", icon: Plus, action: () => console.log("New Private Referral") },
      { name: "New Public Referral", icon: Plus, action: () => console.log("New Public Referral") },
    ],
  },
  {
    heading: "Settings",
    commands: [
      { name: "Account Settings", icon: Settings, action: "/settings" },
      { name: "Notification Preferences", icon: Settings, action: "/settings?tab=notifications" },
      { name: "Logout", icon: LogOut, action: () => console.log("Logout") },
    ],
  },
]

export function CommandPalette() {
  const [open, setOpen] = useState(false)
  const router = useRouter()

  useEffect(() => {
    const down = (e: KeyboardEvent) => {
      if (e.key === "k" && (e.metaKey || e.ctrlKey)) {
        e.preventDefault()
        setOpen((open) => !open)
      }
    }
    document.addEventListener("keydown", down)
    return () => document.removeEventListener("keydown", down)
  }, [])

  const runCommand = useCallback(
    (command: () => unknown | string) => {
      setOpen(false)
      if (typeof command === "string") {
        router.push(command)
      } else {
        command()
      }
    },
    [router],
  )

  return (
    <>
      <Button
        variant="outline"
        className="fixed bottom-4 right-4 h-9 w-9 p-0 hidden md:flex items-center justify-center text-muted-foreground text-body-md"
        onClick={() => setOpen(true)}
        title="Open command palette (Cmd+K)"
      >
        <Search className="h-4 w-4" />
        <span className="sr-only">Open command palette</span>
      </Button>
      <CommandDialog open={open} onOpenChange={setOpen}>
        <CommandInput placeholder="Type a command or search..." />
        <CommandList>
          <CommandEmpty>No results found.</CommandEmpty>
          {commandGroups.map((group) => (
            <CommandGroup key={group.heading} heading={group.heading}>
              {group.commands.map((command) => (
                <CommandItem key={command.name} onSelect={() => runCommand(command.action)} className="cursor-pointer">
                  <command.icon className="mr-2 h-4 w-4" />
                  <span>{command.name}</span>
                </CommandItem>
              ))}
            </CommandGroup>
          ))}
        </CommandList>
      </CommandDialog>
    </>
  )
}

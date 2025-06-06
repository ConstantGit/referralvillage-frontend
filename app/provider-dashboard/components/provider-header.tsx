"use client";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Switch } from "@/components/ui/switch";
import type { ProviderHeaderProps } from "../types";
import { getInitials } from "../types";

export function ProviderHeader({
  provider,
  isAvailable,
  onAvailabilityChange,
}: ProviderHeaderProps) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={provider.avatar} alt={provider.name} />
          <AvatarFallback>{getInitials(provider.name)}</AvatarFallback>
        </Avatar>
        <div>
          <h1 className="text-2xl font-bold">{provider.businessName}</h1>
          <p className="text-muted-foreground">
            {provider.serviceTypes.join(" • ")}
          </p>
        </div>
      </div>
      <div className="flex items-center gap-2">
        <span className="text-sm text-muted-foreground">
          {isAvailable ? "Available for Jobs" : "Unavailable"}
        </span>
        <Switch
          checked={isAvailable}
          onCheckedChange={onAvailabilityChange}
          aria-label="Toggle availability"
        />
      </div>
    </div>
  );
}

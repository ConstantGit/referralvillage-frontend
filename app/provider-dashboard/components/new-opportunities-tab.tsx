"use client";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { formatCurrency, calculateTimeAgo } from "@/app/lib/utils";
import type { NewOpportunitiesTabProps } from "../types";

export function NewOpportunitiesTab({
  opportunities,
  onPurchaseReferral,
}: NewOpportunitiesTabProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
      {opportunities.map((opportunity) => (
        <Card key={opportunity.id} className="p-4 space-y-4">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="font-semibold">{opportunity.title}</h3>
              <p className="text-sm text-muted-foreground">
                {opportunity.location}
              </p>
            </div>
            {opportunity.isHotLead && (
              <Badge variant="destructive">Hot Lead</Badge>
            )}
          </div>

          <div className="space-y-2 text-sm">
            <p>{opportunity.description}</p>
            <div className="flex justify-between items-center">
              <div>
                <p>
                  <span className="font-medium">Budget:</span>{" "}
                  {formatCurrency(opportunity.budget)}
                </p>
                <p>
                  <span className="font-medium">Fee:</span>{" "}
                  {formatCurrency(opportunity.fee)}
                </p>
              </div>
              <div className="text-right">
                <p>
                  <span className="font-medium">Est. Value:</span>{" "}
                  {formatCurrency(opportunity.estimatedJobValue)}
                </p>
                <p className="text-muted-foreground">
                  Posted {calculateTimeAgo(opportunity.postedAt)}
                </p>
              </div>
            </div>
          </div>

          {opportunity.agent && (
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <div className="flex-1">
                  <p className="text-sm font-medium">
                    {opportunity.agent.name}
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {opportunity.agent.agency}
                  </p>
                </div>
                <div className="text-right">
                  <p className="text-sm font-medium">
                    {opportunity.agent.trustScore} / 5
                  </p>
                  <p className="text-sm text-muted-foreground">
                    {opportunity.agent.totalReviews} reviews
                  </p>
                </div>
              </div>
            </div>
          )}

          <Button
            className="w-full"
            onClick={() => onPurchaseReferral(opportunity.id)}
          >
            Purchase Referral ({formatCurrency(opportunity.fee)})
          </Button>
        </Card>
      ))}
    </div>
  );
}

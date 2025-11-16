import { SupplyChainEvent } from "@/types/medication";
import { Package, Truck, Building2, CheckCircle2 } from "lucide-react";
import { Card } from "@/components/ui/card";

interface SupplyChainTimelineProps {
  events: SupplyChainEvent[];
}

const eventIcons = {
  manufactured: Package,
  shipped: Truck,
  received: Building2,
  distributed: CheckCircle2,
};

const SupplyChainTimeline = ({ events }: SupplyChainTimelineProps) => {
  return (
    <div className="space-y-4">
      {events.map((event, index) => {
        const Icon = eventIcons[event.eventType];
        const isLast = index === events.length - 1;

        return (
          <div key={event.eventId} className="relative">
            <div className="flex gap-4">
              <div className="flex flex-col items-center">
                <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center text-primary-foreground shadow-lg">
                  <Icon className="w-6 h-6" />
                </div>
                {!isLast && (
                  <div className="w-0.5 h-full min-h-[60px] bg-border mt-2" />
                )}
              </div>

              <Card className="flex-1 p-4 shadow-sm hover:shadow-md transition-shadow">
                <div className="space-y-2">
                  <div className="flex justify-between items-start">
                    <h4 className="font-semibold text-foreground capitalize">
                      {event.eventType}
                    </h4>
                    <span className="text-sm text-muted-foreground">
                      {new Date(event.timestamp).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'short',
                        day: 'numeric',
                        hour: '2-digit',
                        minute: '2-digit'
                      })}
                    </span>
                  </div>
                  <p className="text-sm text-muted-foreground">
                    {event.description}
                  </p>
                  <div className="flex flex-col gap-1 text-sm">
                    <span className="text-foreground">
                      <strong>Location:</strong> {event.location}
                    </span>
                    <span className="text-foreground">
                      <strong>Organization:</strong> {event.organization}
                    </span>
                  </div>
                </div>
              </Card>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default SupplyChainTimeline;

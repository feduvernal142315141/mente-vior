import {Card, CardContent, CardHeader, CardTitle} from "@/components/ui/card";
import {Building2, Users} from "lucide-react";

interface MetricsCardProps {
    totalOrganization: number;
    totalActiveOrganization: number;
    totalUserActive: number;
}

export function MetricsCards({ totalOrganization, totalActiveOrganization, totalUserActive }: MetricsCardProps) {
    const cards = [
        {
            label: "Total Organizations",
            value: totalOrganization,
            icon: <Building2 className="w-[18px] h-[18px] text-accent-primary stroke-[1.5]" />,
        },
        {
            label: "Total Active Organizations",
            value: totalActiveOrganization,
            icon: <Building2 className="w-[18px] h-[18px] text-accent-primary stroke-[1.5]" />,
        },
        {
            label: "Total Active Users",
            value: totalUserActive,
            icon: <Users className="w-[18px] h-[18px] text-accent-primary stroke-[1.5]" />,
        },
    ];

    return (
        <>
            {cards.map((card, i) => (
                <Card
                    key={i}
                    className="
                        bg-surface-primary 
                        border-border-hairline 
                        elevation-card 
                        hover:elevation-elevated 
                        transition-all 
                        duration-150 
                        hover:-translate-y-[2px]
                        rounded-2xl
                    "
                >
                    <CardHeader className="flex flex-row items-center justify-between pb-3 pt-5 px-5">
                        <CardTitle className="text-[13px] font-semibold text-text-secondary uppercase tracking-wide">
                            {card.label}
                        </CardTitle>
                        <div className="w-9 h-9 rounded-xl bg-accent-soft flex items-center justify-center">
                            {card.icon}
                        </div>
                    </CardHeader>

                    <CardContent className="px-5 pb-5">
                        <div className="text-[34px] font-semibold text-text-primary leading-none mb-1 tracking-tight">
                            {card.value}
                        </div>
                    </CardContent>
                </Card>
            ))}
        </>
    );
}


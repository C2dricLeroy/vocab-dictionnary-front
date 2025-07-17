import { Card } from "@/components/ui/card";
import { Book, Globe, Brain, Rocket, Users, Trophy } from "lucide-react";

const iconMap = {
    book: Book,
    globe: Globe,
    brain: Brain,
    trophy: Trophy,
    users: Users,
    rocket: Rocket,
} as const;

type IconKey = keyof typeof iconMap;

export interface FeatureCardProps {
    icon: IconKey;
    title: string;
    description: string;
}

export default function FeatureCard({ icon, title, description }: FeatureCardProps) {
    const Icon = iconMap[icon];
    return (
        <div className="h-full">
            <Card className="p-6 h-full flex flex-col justify-between">
                <div className="space-y-4">
                    <div className="bg-primary/10 w-12 h-12 rounded-lg flex items-center justify-center">
                        <Icon className="h-6 w-6 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">{title}</h3>
                    <p className="text-gray-500">{description}</p>
                </div>
            </Card>
        </div>
    );
}

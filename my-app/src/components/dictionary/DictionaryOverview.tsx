import { Card, CardContent } from "@/components/ui/card";
import { Dictionary } from "@/models/Dictionary";
import { useTranslations } from "next-intl";

interface DictionaryOverviewProps {
    dictionary: Dictionary;
}

export default function DictionaryOverview({ dictionary }: DictionaryOverviewProps) {
    const t = useTranslations("Dashboard");
    
    return (
        <Card className="p-2 sm:p-4">
            <CardContent className="p-3 sm:p-6 sm:m-2">
                <div className="flex flex-col gap-2 sm:grid sm:grid-cols-3 sm:gap-6">
                    <div className="text-center sm:text-left">
                        <p className="text-xs sm:text-sm text-muted-foreground">
                            {t("Words")}
                        </p>
                        <p className="text-xl sm:text-xl font-semibold tracking-tight">
                            {dictionary.entry_count ?? 0}
                        </p>
                    </div>
                    {dictionary.display_name && (
                        <div className="text-center sm:text-left">
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                {t("Language")}
                            </p>
                            <p className="text-sm sm:text-base font-medium">
                                🌍 {dictionary.display_name}
                            </p>
                        </div>
                    )}
                    {dictionary.created_at && (
                        <div className="text-center sm:text-left">
                            <p className="text-xs sm:text-sm text-muted-foreground">
                                {t("Created on")}
                            </p>
                            <p className="text-sm sm:text-base font-medium">
                                {new Date(dictionary.created_at).toLocaleDateString()}
                            </p>
                        </div>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

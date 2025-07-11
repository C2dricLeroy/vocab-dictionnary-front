import { Card, CardContent } from "@/components/ui/card";
import { Dictionary } from "@/models/Dictionary";

interface DictionaryOverviewProps {
    dictionary: Dictionary;
}

export default function DictionaryOverview({ dictionary }: DictionaryOverviewProps) {
    return (
        <Card>
            <CardContent className="p-4 space-y-3 text-sm">
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <p>✅ <strong>{dictionary.entry_count ?? 0}</strong> mots au total</p>
                    {dictionary.created_at && (
                        <p>📅 Créé le : {new Date(dictionary.created_at).toLocaleDateString()}</p>
                    )}
                    {dictionary.updated_at && (
                        <p>✏️ Dernière modification : {new Date(dictionary.updated_at).toLocaleDateString()}</p>
                    )}
                    {dictionary.display_name && (
                        <p>🌍 Langue : {dictionary.display_name}</p>
                    )}
                </div>
            </CardContent>
        </Card>
    );
}

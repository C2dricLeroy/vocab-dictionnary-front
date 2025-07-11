import { Card, CardContent } from "@/components/ui/card";
import { Dictionary } from "@/models/Dictionary"

interface DictionaryStatsProps {
    dictionary: Dictionary;
}

export default function DictionaryStats({ dictionary }: DictionaryStatsProps) {
    return (
        <Card>
        <CardContent className="p-4 space-y-2">
            <p>✅ <strong>{dictionary.entry_count ?? 0}</strong> mots au total</p>
            {dictionary.created_at && (
                <p>📅 Créé le : {new Date(dictionary.created_at).toLocaleDateString()}</p>
            )}
            {dictionary.updated_at && (
                <p>✏️ Dernière modification : {new Date(dictionary.updated_at).toLocaleDateString()}</p>
            )}
        </CardContent>
        </Card>
    );
}

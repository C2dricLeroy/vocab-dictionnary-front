import { Button } from "@/components/ui/button";
import { Dictionary } from "@/models/Dictionary";


interface DictionaryMetaProps {
  dictionary: Dictionary;
  onEdit?: () => void;
  onDelete?: () => void;
}

export default function DictionaryMeta({
  dictionary,
  onEdit,
  onDelete,
}: DictionaryMetaProps) {
  const {
    id,
    name,
    description,
    display_name,
    entry_count,
    source_language_id,
    target_language_id,
  } = dictionary;

  return (
    <div className="space-y-2 border p-4 rounded-xl shadow-sm">
      <h2 className="text-xl font-semibold">{name}</h2>
      {description && <p className="text-sm text-muted-foreground">{description}</p>}
      <p className="text-sm">Langue : <strong>{display_name}</strong></p>
      <p className="text-xs text-muted-foreground">ID : {id}</p>
      <div className="flex gap-2 mt-2">
        <Button variant="outline" size="sm" onClick={onEdit}>✏️ Modifier</Button>
        <Button variant="destructive" size="sm" onClick={onDelete}>🗑️ Supprimer</Button>
      </div>
    </div>
  );
}

"use client";

import { Link } from "@/i18n/navigation";
import { Button } from "@/components/ui/button";
import { Settings } from "lucide-react";

interface DictionaryMetadataProps {
    dictionaryId: number;
}

export default function DictionaryMetadata({ dictionaryId }: DictionaryMetadataProps) {
    return (
        <Link href={`/dictionary/${dictionaryId}/metadata`}>
            <Button
                variant="ghost"
                size="icon"
                className="
                    text-black
                    dark:text-white
                    hover:text-blue-600
                    dark:hover:text-blue-400
                    hover:bg-muted
                "
                aria-label="Dictionary settings"
            >
                <Settings className="w-5 h-5" />
            </Button>
        </Link>
    );
}

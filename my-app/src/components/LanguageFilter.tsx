"use client";

import * as React from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { useTranslations } from 'next-intl';
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";


interface LanguageFilterProps {
    // eslint-disable-next-line
    onSelectLanguage?: (language: string | null) => void;
}

export default function LanguageFilter({ onSelectLanguage }: LanguageFilterProps) {
    const [open, setOpen] = React.useState(false);
    const [languages, setLanguages] = React.useState<{ value: string, label: string }[]>([]);
    const [value, setValue] = React.useState<string>('');

    const t = useTranslations('LanguageFilter');

    const handleSetValue = (val: string) => {
        setValue(val);
        setOpen(false);
        if (onSelectLanguage) {
            onSelectLanguage(val);
        }
    };

    const handleClearSelection = () => {
        setValue('');
        if (onSelectLanguage) {
            onSelectLanguage(null);
        }
    };

    const fetchAvailableLanguages = async () => {
        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/languages/`, {
                method: 'GET',
                credentials: 'include',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (!response.ok) {
                throw new Error(`Error ${response.status}: Unable to fetch languages`);
            }

            const data = await response.json();
            const formattedLanguages = data.map((lang: any) => ({
                value: lang.code,
                label: lang.name,
            }));
            setLanguages(formattedLanguages);
        } catch (error) {
            console.error("Failed to fetch languages:", error);
        }
    };

    React.useEffect(() => {
        fetchAvailableLanguages();
    }, []);

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button
                    variant="outline"
                    role="combobox"
                    aria-expanded={open}
                    className="w-full justify-between"
                >
                    <div className="w-full flex gap-2 justify-start items-center">
                        {value ? (
                            <div className="flex items-center gap-2 px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium">
                                {languages.find((language) => language.value === value)?.label}
                                <X
                                    className="h-4 w-4 cursor-pointer text-red-500"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        handleClearSelection();
                                    }}
                                />
                            </div>
                        ) : (
                            <span>{t("Select language")}</span>
                        )}
                    </div>
                    <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-full p-0">
                <Command>
                    <CommandInput placeholder={t("Search language")} />
                    <CommandEmpty>{t("No language found")}</CommandEmpty>
                    <CommandGroup>
                        <CommandList>
                            {languages.map((language) => (
                                <CommandItem
                                    key={language.value}
                                    value={language.value}
                                    onSelect={() => {
                                        handleSetValue(language.value);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            value === language.value ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {language.label}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
}

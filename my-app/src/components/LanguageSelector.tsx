"use client";

import { FC, useState} from "react";
import { Check, ChevronsUpDown, X } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
    Command,
    CommandEmpty,
    CommandGroup,
    CommandInput,
    CommandItem,
    CommandList,
} from "@/components/ui/command";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { cn } from "@/lib/utils";
import { Language } from "@/models/Language";
import { useLanguages } from "@/hooks/useLanguages";

interface LanguageSelectorProps {
    selected?: Language | null;
    onChange: (language: Language | null) => void;  // eslint-disable-line
    placeholder?: string;
}

export const LanguageSelector: FC<LanguageSelectorProps> = ({
    selected,
    onChange,
    placeholder = "Select language",
}) => {
    const [open, setOpen] = useState(false);
    const { languages } = useLanguages();

    return (
        <Popover open={open} onOpenChange={setOpen}>
            <PopoverTrigger asChild>
                <Button variant="filter" role="combobox" className="w-full justify-between">
                    <div className="flex items-center gap-2">
                        {selected ? (
                            <div className="flex items-center gap-2 px-2 py-1 rounded-xl border bg-slate-200 text-xs font-medium">
                                {selected.name}
                                <X
                                    className="h-4 w-4 cursor-pointer text-red-500"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onChange(null);
                                    }}
                                />
                            </div>
                        ) : (
                            <span>{placeholder}</span>
                        )}
                    </div>
                    <ChevronsUpDown className="h-4 w-4 shrink-0 opacity-50" />
                </Button>
            </PopoverTrigger>
            <PopoverContent className="z-50 bg-white w-[--radix-popover-trigger-width] p-0">
                <Command>
                    <CommandInput placeholder="Search language" />
                    <CommandEmpty>No language found</CommandEmpty>
                    <CommandGroup>
                        <CommandList>
                            {languages.map((lang) => (
                                <CommandItem
                                    key={lang.code}
                                    value={lang.name}
                                    onSelect={() => {
                                        onChange(lang);
                                        setOpen(false);
                                    }}
                                >
                                    <Check
                                        className={cn(
                                            "mr-2 h-4 w-4",
                                            selected?.code === lang.code ? "opacity-100" : "opacity-0"
                                        )}
                                    />
                                    {lang.name}
                                </CommandItem>
                            ))}
                        </CommandList>
                    </CommandGroup>
                </Command>
            </PopoverContent>
        </Popover>
    );
};

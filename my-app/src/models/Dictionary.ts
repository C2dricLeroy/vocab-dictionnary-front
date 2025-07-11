export class Dictionary {
    constructor(
        id: number,
        name: string,
        description: string | undefined,
        display_name: string | undefined,
        source_language_id: number,
        target_language_id: number,
        user_id?: number | undefined,
        created_at?: Date | undefined,
        updated_at?: Date | undefined,
        entry_count?: number | undefined,
    ) {
        this.id = id;
        this.name = name;
        this.description = description;
        this.display_name = display_name;
        this.source_language_id = source_language_id;
        this.target_language_id = target_language_id;
        this.user_id = user_id;
        this.entry_count = entry_count;
    }
    id: number;
    name: string;
    description?: string | undefined;
    display_name?: string | undefined;
    source_language_id: number;
    target_language_id: number;
    user_id?: number | undefined;
    created_at?: Date | undefined;
    updated_at?: Date | undefined;
    entry_count?: number | undefined;

}
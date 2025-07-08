import { Language } from "@/models/Language";

export interface AddDictionaryFormData {
  name: string;
  description?: string;
  sourceLanguage: Language | null;
  targetLanguage: Language | null;
}
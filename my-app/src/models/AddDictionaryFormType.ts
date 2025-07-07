import { Language } from "@/models/Language";

export interface AddDictionaryFormData {
  name: string;
  sourceLanguage: Language | null;
  targetLanguage: Language | null;
}
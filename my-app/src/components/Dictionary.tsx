
import React from "react";

interface WordEntry {
    word: string;
    translation: string;
    description: string;
}

interface DictionaryData {
    title: string;
    language_name: string;
    description: string;
    words: WordEntry[];
}

interface DictionaryProps {
    dictionaryData: DictionaryData | null;
}

export const Dictionary: React.FC<DictionaryProps> = ({ dictionaryData }) => {
    if (!dictionaryData) {
        return <p>No data available.</p>;
    }

    const {title, language_name, description, words} = dictionaryData;

    return (
        <div className="p-4 border border-gray-300 rounded-md shadow-sm dark:border-gray-700">
            <h2 className="text-xl font-bold mb-2">{title}</h2>
            <p><strong>Language:</strong> {language_name}</p>
            <p><strong>Description:</strong> {description}</p>

            {words && words.length > 0 ? (
                <table className="mt-4 w-full border-collapse">
                    <thead>
                    <tr>
                        <th className="border border-gray-300 px-4 py-2">Word</th>
                        <th className="border border-gray-300 px-4 py-2">Translation</th>
                        <th className="border border-gray-300 px-4 py-2">Description</th>
                    </tr>
                    </thead>
                    <tbody>
                    {dictionaryData.words.map(({word, translation, description}, index) => (
                        <tr key={index}>
                            <td className="border border-gray-300 px-4 py-2">{word}</td>
                            <td className="border border-gray-300 px-4 py-2">{translation}</td>
                            <td className="border border-gray-300 px-4 py-2">{description}</td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            ) : (
                <p>No words available in the dictionary.</p>
            )}
        </div>
    );
};

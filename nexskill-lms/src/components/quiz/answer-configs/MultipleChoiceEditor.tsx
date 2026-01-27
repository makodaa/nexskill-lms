import React from "react";
import { Plus, Trash2 } from "lucide-react";
import type { MultipleChoiceConfig } from "../../../types/quiz";

interface MultipleChoiceEditorProps {
    config: MultipleChoiceConfig;
    onChange: (config: MultipleChoiceConfig) => void;
}

const generateId = () =>
    `${Date.now()}-${Math.random().toString(36).substr(2, 9)}`;

const MultipleChoiceEditor: React.FC<MultipleChoiceEditorProps> = ({
    config,
    onChange,
}) => {
    const addOption = () => {
        onChange({
            ...config,
            options: [
                ...config.options,
                { id: generateId(), text: "", is_correct: false },
            ],
        });
    };

    const removeOption = (id: string) => {
        if (config.options.length <= 2) return;
        onChange({
            ...config,
            options: config.options.filter((opt) => opt.id !== id),
        });
    };

    const updateOption = (
        id: string,
        updates: Partial<(typeof config.options)[0]>
    ) => {
        onChange({
            ...config,
            options: config.options.map((opt) =>
                opt.id === id ? { ...opt, ...updates } : opt
            ),
        });
    };

    const toggleCorrect = (id: string) => {
        if (config.allow_multiple) {
            updateOption(id, {
                is_correct: !config.options.find((o) => o.id === id)
                    ?.is_correct,
            });
        } else {
            onChange({
                ...config,
                options: config.options.map((opt) => ({
                    ...opt,
                    is_correct: opt.id === id,
                })),
            });
        }
    };

    return (
        <div className="space-y-4">
            <div className="flex items-center justify-between">
                <h4 className="text-sm font-medium text-gray-700 dark:text-gray-300">
                    Answer Options
                </h4>
                <button
                    onClick={addOption}
                    className="flex items-center gap-1.5 px-3 py-1.5 text-sm bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors"
                >
                    <Plus className="w-4 h-4" />
                    Add Option
                </button>
            </div>

            <div className="space-y-2">
                {config.options.map((option, index) => (
                    <div
                        key={option.id}
                        className="flex items-center gap-3 p-3 bg-gray-50 dark:bg-slate-700 rounded-lg group"
                    >
                        <label className="flex items-center cursor-pointer">
                            <input
                                type={
                                    config.allow_multiple ? "checkbox" : "radio"
                                }
                                checked={option.is_correct}
                                onChange={() => toggleCorrect(option.id)}
                                className="w-4 h-4 text-green-600 focus:ring-green-500 border-gray-300 rounded"
                            />
                            {option.is_correct && (
                                <span className="ml-2 text-xs text-green-600 dark:text-green-400">
                                    Correct
                                </span>
                            )}
                        </label>

                        <input
                            type="text"
                            value={option.text}
                            onChange={(e) =>
                                updateOption(option.id, {
                                    text: e.target.value,
                                })
                            }
                            placeholder={`Option ${index + 1}`}
                            className="flex-1 px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                        />

                        {config.options.length > 2 && (
                            <button
                                onClick={() => removeOption(option.id)}
                                className="p-2 text-red-600 hover:bg-red-50 dark:hover:bg-red-900/20 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity"
                                title="Remove option"
                            >
                                <Trash2 className="w-4 h-4" />
                            </button>
                        )}
                    </div>
                ))}
            </div>

            <div className="flex flex-col gap-2 pt-3 border-t border-gray-200 dark:border-gray-700">
                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={config.allow_multiple}
                        onChange={(e) =>
                            onChange({
                                ...config,
                                allow_multiple: e.target.checked,
                            })
                        }
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                        Allow multiple selections
                    </span>
                </label>

                <label className="flex items-center gap-2 cursor-pointer">
                    <input
                        type="checkbox"
                        checked={config.randomize_options}
                        onChange={(e) =>
                            onChange({
                                ...config,
                                randomize_options: e.target.checked,
                            })
                        }
                        className="w-4 h-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                    />
                    <span className="text-sm text-gray-700 dark:text-gray-300">
                        Randomize option order
                    </span>
                </label>
            </div>

            {!config.options.some((opt) => opt.is_correct) && (
                <div className="p-3 bg-yellow-50 dark:bg-yellow-900/20 border border-yellow-200 dark:border-yellow-800 rounded-lg">
                    <p className="text-sm text-yellow-800 dark:text-yellow-200">
                        ⚠️ Please mark at least one option as correct
                    </p>
                </div>
            )}
        </div>
    );
};

export default MultipleChoiceEditor;

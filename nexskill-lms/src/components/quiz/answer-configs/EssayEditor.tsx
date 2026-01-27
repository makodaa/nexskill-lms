import React from "react";
import type { EssayConfig } from "../../../types/quiz";

interface EssayEditorProps {
    config: EssayConfig;
    onChange: (config: EssayConfig) => void;
}

const EssayEditor: React.FC<EssayEditorProps> = ({ config, onChange }) => {
    return (
        <div className="space-y-4">
            <div className="p-3 bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-800 rounded-lg">
                <p className="text-sm text-blue-800 dark:text-blue-200">
                    ℹ️ Essay questions always require manual grading
                </p>
            </div>

            <div className="grid grid-cols-2 gap-4">
                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Minimum Words
                    </label>
                    <input
                        type="number"
                        value={config.min_words || ""}
                        onChange={(e) =>
                            onChange({
                                ...config,
                                min_words: e.target.value
                                    ? parseInt(e.target.value)
                                    : undefined,
                            })
                        }
                        min={0}
                        placeholder="Optional"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                        Maximum Words
                    </label>
                    <input
                        type="number"
                        value={config.max_words || ""}
                        onChange={(e) =>
                            onChange({
                                ...config,
                                max_words: e.target.value
                                    ? parseInt(e.target.value)
                                    : undefined,
                            })
                        }
                        min={0}
                        placeholder="Optional"
                        className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                    />
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                    Grading Rubric
                </label>
                <textarea
                    value={config.rubric || ""}
                    onChange={(e) =>
                        onChange({ ...config, rubric: e.target.value })
                    }
                    placeholder="Define the criteria for grading this essay..."
                    rows={6}
                    className="w-full px-3 py-2 border border-gray-300 dark:border-gray-600 rounded-lg bg-white dark:bg-slate-800 text-gray-900 dark:text-white"
                />
                <p className="mt-1 text-xs text-gray-500 dark:text-gray-400">
                    This rubric will help graders evaluate student responses
                    consistently
                </p>
            </div>
        </div>
    );
};

export default EssayEditor;

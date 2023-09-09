type SplitOptions = {
    minLength?: number;
    maxLength?: number;
    overlap?: number;
    splitter?: "sentence" | "paragraph";
    delimiters?: string;
};
export declare function chunk(text: string, options?: SplitOptions): string[];
export {};

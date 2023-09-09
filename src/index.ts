type SplitOptions = {
    minLength?: number;
    maxLength?: number;
    overlap?: number;
    splitter?: "sentence" | "paragraph";
    delimiters?: string;
};

function splitCunk(currChunks: string[], maxLength: number, overlap: number) {
    const chunkString = currChunks.join(" ");
    let subChunk = chunkString.substring(0, maxLength);
    let restChunk = chunkString.substring(maxLength);

    let blankPosition = restChunk.indexOf(" ");
    if (blankPosition == -1) {
        blankPosition = restChunk.indexOf("\n");
    }

    if (blankPosition !== -1) {
        subChunk += restChunk.substring(0, blankPosition);
        restChunk = restChunk.substring(blankPosition);
    }

    let overlapText = "";

    if (overlap) {
        blankPosition = subChunk.lastIndexOf(" ", subChunk.length - overlap);
        if (blankPosition == -1) {
            blankPosition = subChunk.lastIndexOf(
                "\n",
                subChunk.length - overlap
            );
        }

        if (blankPosition !== -1) {
            overlapText = subChunk.substring(blankPosition);
        }
    }

    return [subChunk, restChunk, overlapText];
}

export function chunk(text: string, options: SplitOptions = {}): string[] {
    const {
        minLength = 0,
        maxLength = 1000,
        overlap = 0,
        splitter = "paragraph",
        delimiters = "", // regex
    } = options;

    let regex = delimiters;

    if (delimiters === "") {
        if (splitter === "sentence") {
            regex = "([.!?\\n])\\s*";
        } else {
            regex = "\\n{2,}";
        }
    }

    const baseChunk = text.split(new RegExp(`${regex}`));

    let chunks: string[] = [];
    let currChunks: string[] = [];
    let currChunkLength = 0;

    for (let i = 0; i < baseChunk.length; i += 2) {
        let subChunk = baseChunk[i];
        if (baseChunk[i + 1]) {
            subChunk += baseChunk[i + 1];
        }

        currChunks.push(subChunk);
        currChunkLength += subChunk.length;

        if (currChunkLength >= minLength) {
            const [subChunk, restChunk, overlapText] = splitCunk(
                currChunks,
                maxLength,
                overlap
            );

            chunks.push(subChunk);

            currChunks = [];
            currChunkLength = overlapText.length + restChunk.length;

            if (overlapText && i < baseChunk.length)
                currChunks.push(overlapText);
            if (restChunk) currChunks.push(restChunk);
        }
    }

    if (currChunks.length) {
        const [subChunk, restChunk, _] = splitCunk(
            currChunks,
            maxLength,
            overlap
        );

        if (subChunk) chunks.push(subChunk);
        if (restChunk) chunks.push(restChunk);
    }

    return chunks;
}

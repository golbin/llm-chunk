import { chunk } from "../dist";

const text = `Hello World.
This is
 a test sentence! Have a good day? Haha. Haha`;

let chunks = chunk(text);

console.log("\ndefault, use 'paragraph' splitter: ", chunks);

chunks = chunk(text, { minLength: 7, maxLength: 9 });
console.log("\nmin 7, max 10, use 'paragraph' splitter: ", chunks);

chunks = chunk(text, { splitter: "sentence" });
console.log("\nuse 'sentence' splitter: ", chunks);

chunks = chunk(text, { minLength: 10, splitter: "sentence" });
console.log("\nmin 10, use 'sentence' splitter: ", chunks);

chunks = chunk(text, { overlap: 3, splitter: "sentence" });
console.log("\noverlap 3, use 'sentence' splitter: ", chunks);

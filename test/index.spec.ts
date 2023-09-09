import { chunk } from '../dist'

import { expect } from 'chai';

describe('Text splitter', () => {
    const text = "Hello World.\nThis is\n a test sentence! Have a good day? Haha. Haha";

    it('should not be splitted', async () => {
        const chunks = chunk(text);
        expect(chunks.length).to.equal(1)
    });

    it('should be splitted into 3 chunks', async () => {
        const chunks = chunk(text, { minLength: 7, maxLength: 9 });
        expect(chunks.length).to.equal(3)
    });

    it('should be splitted into 6 chunks', async () => {
        const chunks = chunk(text, { splitter: "sentence" });
        expect(chunks.length).to.equal(6)
    });

    it('should be splitted into 4 chunks', async () => {
        const chunks = chunk(text, { minLength: 10, splitter: "sentence" });
        expect(chunks.length).to.equal(4)
    });

    it('should be overlapped 3 characters at least', async () => {
        const chunks = chunk(text, { overlap: 3, splitter: "sentence" });
        const firstWords = chunks[0].split(' ')
        const secondWords = chunks[1].split(' ')
        const thirdWords = chunks[2].split(' ')

        expect(chunks.length).to.equal(7)
        expect(firstWords[firstWords.length-1]).to.equal(secondWords[1])
        expect(secondWords[secondWords.length-1]).to.equal(thirdWords[1])
    });
});
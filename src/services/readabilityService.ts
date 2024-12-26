import { JSDOM } from 'jsdom';
import { Readability } from '@mozilla/readability';
import axios from 'axios';

export class ReadabilityService {
    async extractContent(url: string): Promise<string> {
        try {
            const response = await axios.get(url);
            const doc = new JSDOM(response.data, { url }).window.document;
            const article = new Readability(doc).parse();
            return article?.content || '';
        } catch (error) {
            console.error('Error extracting content:', error);
            throw new Error('Failed to extract content');
        }
    }
}
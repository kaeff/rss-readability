import axios from 'axios';
import { parseStringPromise } from 'xml2js';
import { ReadabilityService } from './readabilityService';
import { FeedItem, RssFeed } from '../types';

export class RssService {
    private readabilityService: ReadabilityService;

    constructor(readabilityService = new ReadabilityService()) {
        this.readabilityService = readabilityService;
    }

    async fetchAndProcessFeed(url: string, limit: number): Promise<String> {
        const response = await axios.get(url);
        const rssFeed: RssFeed = await this.parseString(response.data);
        await this.replaceItemsWithFullText(rssFeed, limit);
        return this.feedToXml(rssFeed);;
    }

    private feedToXml(rssFeed: RssFeed) {
        const builder = new (require('xml2js')).Builder();
        const xml = builder.buildObject({ rss: { channel: rssFeed } });
        return xml;
    }

    private async replaceItemsWithFullText(rssFeed: RssFeed, limit: number) {
        const items: FeedItem[] = await Promise.all(
            rssFeed.items.slice(0, limit).map(async (item) => {
                try {
                    const content = await this.readabilityService.extractContent(item.link);
                    return { ...item, description: content };
                } catch (error) {
                    console.error(`Failed to extract content for ${item.link}:`, error);
                    return item;
                }
            })
        );
        rssFeed.items = items;
    }

    private async parseString(feedContents: string): Promise<RssFeed> {
        const parsedFeed = await parseStringPromise(feedContents);
        const rssFeed: RssFeed = {
            title: parsedFeed.rss.channel[0].title[0],
            description: parsedFeed.rss.channel[0].description[0],
            link: parsedFeed.rss.channel[0].link[0],
            items: parsedFeed.rss.channel[0].item.map((item: any) => ({
                title: item.title[0],
                link: item.link[0],
                description: item.description[0],
                pubDate: item.pubDate[0]
            }))
        };
        return rssFeed;
    }
}


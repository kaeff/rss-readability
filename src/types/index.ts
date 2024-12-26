export interface FeedItem {
    title: string;
    link: string;
    description: string;
    pubDate: string;
}

export interface RssFeed {
    title: string;
    description: string;
    link: string;
    items: FeedItem[];
}
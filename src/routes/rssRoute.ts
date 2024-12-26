import express from 'express';
import { ReadabilityService } from '../services/readabilityService';
import { RssService } from '../services/rssService';

export function setReadabilityRoutes(app: express.Application) {
    const readabilityService = new ReadabilityService();
    const rssService = new RssService();

    app.get('/doc', async (req: express.Request, res: express.Response) => {
        const url = req.query.url as string;

        if (!url) {
            res.status(400).send('URL is required');
        }

        try {
            const content = await readabilityService.extractContent(url);
            res.set('Content-Type', 'text/html');
            res.send(content);
        } catch (error) {
            res.status(500).send('Error fetching content');
        }
    });

    app.get('/feed', async (req: express.Request, res: express.Response) => {
        const url = req.query.url as string;

        if (!url) {
            res.status(400).send('URL is required');
            return;
        }

        try {
            const rssFeed = await rssService.fetchAndProcessFeed(url);
            res.set('Content-Type', 'application/rss+xml');
            res.send(rssFeed);
        } catch (error) {
            console.error('Error processing feed:', error);
            res.status(500).send('Error processing feed');
        }
    });
}
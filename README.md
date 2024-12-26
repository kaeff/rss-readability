# rss-readability

This project is a Google Cloud Run application that generates an RSS feed by extracting full text content from web pages using the `@mozilla/readability` npm package.

## Project Structure

```
rss-readability
├── src
│   ├── index.ts                # Entry point of the application
│   ├── services
│   │   └── readabilityService.ts # Service for extracting content from URLs
│   ├── routes
│   │   └── rssRoute.ts         # Defines routes for RSS feed generation
│   └── types
│       └── index.ts            # Type definitions for RSS feed
├── package.json                 # NPM package configuration
├── tsconfig.json                # TypeScript configuration
├── Dockerfile                   # Docker configuration for the application
└── cloudbuild.yaml              # Google Cloud Build configuration
```

## Setup Instructions

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd rss-readability
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Build the project:**
   ```
   npm run build
   ```

4. **Run the application locally:**
   ```
   npm start
   ```

## Usage

- The application exposes an endpoint to generate RSS feeds. You can access it by navigating to `http://localhost:<port>/rss` after starting the server.

## Deployment

To deploy the application to Google Cloud Run, use the following command:
```
gcloud builds submit --config cloudbuild.yaml
```

Make sure you have the Google Cloud SDK installed and configured with your project.

## License

This project is licensed under the MIT License.
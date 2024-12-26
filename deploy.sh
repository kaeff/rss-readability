gcloud run deploy rss-readability \
    --region=europe-west1 \
    --allow-unauthenticated \
    --execution-environment=gen2 \
    --port 3000 \
    --source .
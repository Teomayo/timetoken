#!/bin/bash

# Exit on error
set -e

echo "🧹 Cleaning up previous builds..."
rm -rf .output
rm -rf .nuxt
rm -rf .firebase

echo "📦 Installing dependencies..."
npm install

echo "🔨 Building the application..."
npm run build

echo "🚀 Deploying to Firebase..."
# Deploy only hosting since we're using static generation
firebase deploy --only hosting

echo "✅ Deployment complete!"
echo "🌎 Your application should be live at: https://timetoken-57ad5.web.app" 
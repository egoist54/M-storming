#!/bin/bash

# GitHub Pages deploy from branch 배포 스크립트

echo "🔨 Building application..."
npm run build

echo "📦 Preparing docs directory for GitHub Pages..."
rm -rf docs
mkdir -p docs
cp -R dist/public/* docs/

echo "🚫 Creating .nojekyll file to disable Jekyll..."
touch docs/.nojekyll

echo "✅ Deployment preparation complete!"
echo ""
echo "📋 Next steps:"
echo "1. Commit the docs/ folder to your repository:"
echo "   git add docs/"
echo "   git commit -m 'Deploy to GitHub Pages'"
echo "   git push origin main"
echo ""
echo "2. Go to your GitHub repository Settings → Pages"
echo "3. Under 'Build and deployment' → 'Source', select 'Deploy from a branch'"
echo "4. Select branch: 'main' and folder: '/docs'"
echo "5. Click 'Save'"
echo ""
echo "🎉 Your site will be live at https://USERNAME.github.io/REPOSITORY/"

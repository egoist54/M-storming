#!/bin/bash

# GitHub Pages 배포용 빌드 스크립트
echo "🔨 Building for GitHub Pages..."

# Vite 빌드 실행
npm run build

# docs 폴더 생성
echo "📁 Creating docs folder..."
rm -rf docs
cp -r dist/public docs

echo "✅ Build complete! docs/ folder is ready for GitHub Pages deployment."
echo ""
echo "📝 Next steps:"
echo "1. Commit and push the docs/ folder to your repository"
echo "2. Go to GitHub repository Settings → Pages"
echo "3. Set Source to 'Deploy from a branch'"
echo "4. Select branch 'main' and folder '/docs'"
echo "5. Click Save"

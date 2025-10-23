#!/bin/bash
set -e  # Exit immediately if a command exits with a non-zero status
set -u  # Treat unset variables as an error
set -o pipefail  # Propagate pipe failures

# GitHub Pages deploy from branch 배포 스크립트

echo "🔍 Detecting repository information..."

# Get repository name from git remote URL
REPO_URL=$(git config --get remote.origin.url || echo "")
if [ -z "$REPO_URL" ]; then
  echo "❌ Error: No git remote found. Please initialize git and add a remote first."
  exit 1
fi

# Extract repository name from URL
REPO_NAME=$(echo "$REPO_URL" | sed -E 's/.*[:/]([^/]+)\/([^/]+)(\.git)?$/\2/' | sed 's/\.git$//')

echo "📦 Repository name: $REPO_NAME"
echo ""

# Check for custom domain
CUSTOM_DOMAIN="${CUSTOM_DOMAIN:-}"
if [ -n "$CUSTOM_DOMAIN" ]; then
  BASE_PATH="/"
  echo "🌐 Custom domain detected: $CUSTOM_DOMAIN - using base path: /"
elif [[ "$REPO_NAME" =~ \.github\.io$ ]]; then
  BASE_PATH="/"
  echo "🏠 Detected user/organization page - using base path: /"
else
  BASE_PATH="/$REPO_NAME/"
  echo "📂 Detected project page - using base path: /$REPO_NAME/"
fi

echo ""
echo "🔨 Building application with base path: $BASE_PATH"
echo "   Building client..."
npx vite build --base="$BASE_PATH"
echo "   Building server..."
npx esbuild server/index.ts --platform=node --packages=external --bundle --format=esm --outdir=dist

echo ""
echo "📦 Preparing docs directory for GitHub Pages..."
rm -rf docs
mkdir -p docs
cp -R dist/public/* docs/

echo "🚫 Creating .nojekyll file to disable Jekyll..."
touch docs/.nojekyll

# Create CNAME file if custom domain is set
if [ -n "$CUSTOM_DOMAIN" ]; then
  echo "📝 Creating CNAME file for custom domain: $CUSTOM_DOMAIN"
  echo "$CUSTOM_DOMAIN" > docs/CNAME
fi

echo ""
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

if [ -n "$CUSTOM_DOMAIN" ]; then
  SITE_URL="https://$CUSTOM_DOMAIN/"
elif [[ "$REPO_NAME" =~ \.github\.io$ ]]; then
  SITE_URL="https://$REPO_NAME/"
else
  # Extract username from repo URL
  USERNAME=$(echo "$REPO_URL" | sed -E 's/.*[:/]([^/]+)\/([^/]+)(\.git)?$/\1/')
  SITE_URL="https://$USERNAME.github.io/$REPO_NAME/"
fi

echo "🎉 Your site will be live at: $SITE_URL"
echo ""
if [ -n "$CUSTOM_DOMAIN" ]; then
  echo "💡 Custom domain deployment detected"
  echo "   Make sure DNS is configured for: $CUSTOM_DOMAIN"
  echo "   - Add A records to GitHub Pages IPs or"
  echo "   - Add CNAME record pointing to <username>.github.io"
fi

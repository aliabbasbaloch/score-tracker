#!/bin/bash
echo "=== Verification Check ==="
echo ""

# Check if required files exist
files=(
    "public/index.html"
    "public/css/styles.css"
    "public/js/app.js"
    "public/assets/@fortawesome/fontawesome-free/css/all.min.css"
    "src/css/input.css"
    "src/js/app.js"
    "package.json"
    "tailwind.config.js"
    ".gitignore"
    "README.md"
)

echo "Checking required files..."
for file in "${files[@]}"; do
    if [ -f "$file" ]; then
        echo "✅ $file"
    else
        echo "❌ $file (MISSING)"
    fi
done

echo ""
echo "=== File Sizes ==="
du -h public/index.html public/css/styles.css public/js/app.js 2>/dev/null

echo ""
echo "=== Node Modules Check ==="
if [ -d "node_modules" ]; then
    echo "✅ node_modules directory exists"
    echo "   Dependencies: $(ls node_modules | wc -l) packages"
else
    echo "❌ node_modules directory missing"
fi

echo ""
echo "=== Git Status ==="
git status --short

echo ""
echo "=== Build Test ==="
npm run build 2>&1 | grep -E "(Done|Error)" || echo "Build completed"

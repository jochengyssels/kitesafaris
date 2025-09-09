#!/bin/bash

# kAIte Test Suite Cron Setup
# This script sets up automated nightly testing

set -e

# Configuration
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_DIR="$(dirname "$SCRIPT_DIR")"
CRON_LOG="$PROJECT_DIR/logs/cron.log"
CRON_ERROR_LOG="$PROJECT_DIR/logs/cron-error.log"

echo "🔧 Setting up kAIte automated testing..."

# Create necessary directories
mkdir -p "$PROJECT_DIR/logs"
mkdir -p "$PROJECT_DIR/test-results"

# Make the test script executable
chmod +x "$SCRIPT_DIR/run-kaite-tests.js"

# Create cron job entry
CRON_ENTRY="0 2 * * * cd $PROJECT_DIR && node $SCRIPT_DIR/run-kaite-tests.js >> $CRON_LOG 2>> $CRON_ERROR_LOG"

# Check if cron job already exists
if crontab -l 2>/dev/null | grep -q "run-kaite-tests.js"; then
    echo "⚠️  Cron job already exists. Updating..."
    # Remove existing entry
    crontab -l 2>/dev/null | grep -v "run-kaite-tests.js" | crontab -
fi

# Add new cron job
(crontab -l 2>/dev/null; echo "$CRON_ENTRY") | crontab -

echo "✅ Cron job added successfully!"
echo "📅 Tests will run daily at 2:00 AM"
echo "📊 Logs will be saved to:"
echo "   - Success: $CRON_LOG"
echo "   - Errors: $CRON_ERROR_LOG"
echo "   - Results: $PROJECT_DIR/test-results/"

# Test the setup
echo "🧪 Testing the setup..."
if node "$SCRIPT_DIR/run-kaite-tests.js" --test; then
    echo "✅ Test run successful!"
else
    echo "❌ Test run failed. Check the logs."
    exit 1
fi

echo "🎉 Setup complete! Your kAIte tests will run automatically every night."
echo ""
echo "To view current cron jobs: crontab -l"
echo "To remove the cron job: crontab -e (then delete the line)"
echo "To run tests manually: node $SCRIPT_DIR/run-kaite-tests.js"

#!/bin/bash

# Clean up build artifacts
rm -rf dist

# Build the project
npm run build

# Deploy to GitHub Pages
npm run deploy
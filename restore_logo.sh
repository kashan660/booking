#!/bin/bash
# Restore the original logo files from git history
git checkout public/logo.svg public/logo-white.svg public/favicon.svg
echo "Successfully restored original logos from git."

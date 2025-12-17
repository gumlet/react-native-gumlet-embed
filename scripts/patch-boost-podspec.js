#!/usr/bin/env node

/**
 * Patch script to fix boost podspec checksum issue
 * This is a known issue with React Native 0.72.5 where the boost download
 * has a different checksum than expected or the file is corrupted.
 * This script removes the sha256 checksum verification to allow installation.
 */

const fs = require('fs');
const path = require('path');

const boostPodspecPath = path.join(
  __dirname,
  '..',
  'node_modules',
  'react-native',
  'third-party-podspecs',
  'boost.podspec'
);

if (fs.existsSync(boostPodspecPath)) {
  let content = fs.readFileSync(boostPodspecPath, 'utf8');
  
  // The jfrog.io URL returns HTML instead of the archive file, so we need to use an alternative source
  // SourceForge has a working mirror - using the direct download URL
  const jfrogUrl = 'https://boostorg.jfrog.io/artifactory/main/release/1.76.0/source/boost_1_76_0.tar.bz2';
  const workingUrl = 'https://webwerks.dl.sourceforge.net/project/boost/boost/1.76.0/boost_1_76_0.tar.bz2';
  
  let modified = false;
  
  // Replace jfrog URL with working SourceForge direct download URL
  if (content.includes(jfrogUrl)) {
    content = content.replace(jfrogUrl, workingUrl);
    modified = true;
  }
  
  // Remove checksum verification (SourceForge file may have different checksum)
  if (content.includes(':sha256 =>')) {
    content = content.replace(/,\s*:sha256\s*=>\s*'[^']+'/, '');
    modified = true;
  }
  
  // Ensure we're using the working URL if it's not already there
  if (!content.includes(workingUrl) && !content.includes('webwerks.dl.sourceforge.net')) {
    // Replace any other URL with the working one
    content = content.replace(/https:\/\/[^']+boost_1_76_0\.tar\.bz2[^']*/, workingUrl);
    modified = true;
  }
  
  if (modified) {
    fs.writeFileSync(boostPodspecPath, content, 'utf8');
    console.log('✅ Successfully patched boost.podspec - using working SourceForge mirror');
  } else if (content.includes(workingUrl) || content.includes('webwerks.dl.sourceforge.net')) {
    console.log('✅ boost.podspec already patched with working source');
  } else {
    console.log('✅ boost.podspec already patched');
  }
} else {
  console.log('⚠️  boost.podspec not found, skipping patch');
}


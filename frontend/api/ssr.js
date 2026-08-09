import fs from 'fs';
import path from 'path';

// Attempt to load the SSR bundle produced by the Vite build
const serverEntryPath = path.resolve(process.cwd(), 'dist', 'server', 'index.js');

let handler;
try {
  if (fs.existsSync(serverEntryPath)) {
    // Dynamically import the built server entry. Vercel's Node runtime uses ESM support
    // but built file might be ESM; use dynamic import.
    const mod = await import(serverEntryPath);
    handler = mod.default || mod.handler || mod;
  } else {
    console.error('SSR server entry not found:', serverEntryPath);
  }
} catch (err) {
  console.error('Error loading SSR server entry:', err);
}

export default function handler(req, res) {
  res.statusCode = 404;
  res.end('SSR handler disabled. This project is now configured for static SPA deployment.');
}

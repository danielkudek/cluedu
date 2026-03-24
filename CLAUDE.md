# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

**Cluedu** is an AI tutoring app for Polish children ("AI Korepetytor dla dzieci"). It consists of two files:
- `index.html` — single-file SPA (vanilla JS, CSS, HTML, ~1300 lines)
- `api/claude.js` — Vercel serverless function that proxies requests to the Anthropic API

No build system, no package manager (frontend), no test framework. Deploy directly to Vercel.

## Development

**Run locally:** Open `index.html` in a browser, or use a local HTTP server. The `/api/claude` endpoint requires Vercel CLI or a live Vercel environment.

**Deploy:** Push to main branch; Vercel auto-deploys. The API key (`ANTHROPIC_API_KEY`) must be set as a Vercel environment variable.

**Vercel local dev:**
```bash
npm install -g vercel
vercel dev
```

## Architecture

### Frontend (`index.html`)

Six CSS-class-toggled screens (no router):
1. `#screen-access` — password entry (`cluedu2026` default)
2. `#screen-onboarding` — name + grade level
3. `#screen-main` — subject selection + pending tasks
4. `#screen-task` — task input (text / photo / voice)
5. `#screen-chat` — tutoring conversation
6. `#screen-report` — parent stats dashboard

All state lives in `localStorage`. No external JS dependencies.

**Key constants (embedded in JS):**
- `BLOCK_DURATION = 5` (minutes) — block after moderation violations
- `MAX_OFFTOPIC = 5`, `MAX_VULGAR = 3` — violation thresholds
- `MAX_PENDING = 3` — concurrent unfinished tasks
- `HISTORY_LIMIT = 12` — chat messages sent to API

### Backend (`api/claude.js`)

Simple Vercel serverless function:
- `POST /api/claude` — accepts `{ messages[], systemPrompt }`, proxies to Claude Haiku 4.5 with prompt caching on the system prompt
- Max output: 600 tokens
- Model: `claude-haiku-4-5-20251001`

### Dynamic System Prompt

Built client-side based on student name, grade level (`primary`/`middle`/`high`), and subject. Includes:
- 3-level help system (hints → clues → full solution; disabled for creative/essay tasks)
- Server-side moderation flags parsed by the client: `[OFFTOPIC]`, `[VULGAR1]`, `[VULGAR2]`, `[VULGAR3]`, `[REDAGUJ]`
- Special "REDAGUJ" mode for essays — scaffolds thinking instead of writing for the student

### Input Pipeline

Text / photo (compressed to max 1000×1000px grayscale via Canvas API) / voice (Web Speech API) → optional OCR via vision call → chat message → `/api/claude` → parse moderation flags → update localStorage stats + session history.

## Language

All UI text, system prompts, and AI responses are in **Polish**.

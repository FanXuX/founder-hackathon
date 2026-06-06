# Hackathon Scope

## Core Finding

The product should not be framed as a general app for tracking actions and feelings.

The stronger framing is:

> A mobile-first recognition tool that helps early founders notice when a current stuck moment is similar to something they have experienced before.

The key user problem is not lack of reflection. The user is already thinking, writing, replaying, and trying to understand. The problem is that these insights stay fragmented and do not accumulate across moments.

## Sharp One-Sentence Pitch

> We help early founders recognize recurring stuck moments while they are still happening, so yesterday's insight does not disappear the next time the same feeling returns.

## Simple Version

> A founder moment-capture app that connects today's uneasy moment to previous similar moments and shows: this has happened before.

## Target User

Early-stage founders, solo founders, and indie builders who repeatedly feel stuck after high-stakes conversations, decisions, or messages.

Examples:

- After an investor call: "I feel like I did not explain myself clearly."
- After a customer conversation: "Something felt off, but I cannot name it."
- After sending a message: "I keep checking and replaying what I wrote."
- After a meeting: "I wanted to say something, stopped, and kept thinking about it later."

## Painful Workflow

Today, users usually handle these moments by:

- Thinking about it repeatedly.
- Writing fragments in Notes or Notion.
- Talking to a friend or co-founder.
- Asking ChatGPT for interpretation.
- Consuming self-development or psychology content.
- Ignoring it until the same thing happens again.

The failure in the current workflow:

> Each moment is processed separately. The user may get insight once, but the next similar moment still feels like the first time.

## Product Promise

> It is not happening for the first time. It is just the first time you see it.

## MVP Scope

Build the first recognition loop only.

Must include:

- Mobile-first interface.
- Choice between "Now" and "Reflect".
- One natural-language input field.
- Mocked or simple AI matching against previous moments.
- Recognition output using low-certainty language.
- Confirmation: "Does this feel similar?" / "A little" / "Not really".
- A simple traces screen showing two or three connected moments.
- A pattern cue screen that gives the user a phrase to recognize next time.

Do not build for the hackathon:

- Full authentication.
- Complex analytics.
- Full experiment system.
- Projection layer.
- Clinical or psychological labels.
- Charts or scores.
- Long onboarding.
- Full production matching algorithm.

## Demo Flow

Use a fictional founder, for example Lina.

Scenario:

> Lina is building a B2B product. After investor calls, customer conversations, and meetings, she often feels something is off. She writes notes, but each moment stays separate. The app helps her recognize that several moments share the same structure.

Demo steps:

1. Lina opens the app on her phone.
2. She selects "Now".
3. She writes: "In the meeting I wanted to say something, stopped, and kept thinking about it afterward."
4. The app responds: "This feels a little like a previous moment where you wanted to say something but stopped."
5. The app asks: "Does this feel similar?"
6. Lina taps: "A little".
7. The app shows two or three previous moments side by side.
8. The app creates a recognition cue: "Next time you feel: 'Should I say this, or am I not sure?' this may be the same loop."

## AI Leverage

AI is not the product label. AI is the mechanism.

AI helps by:

- Reading messy natural-language reflections.
- Extracting behavioral sequences without forcing forms or tags.
- Matching a current moment to previous similar moments.
- Generating short, careful recognition language.

Why now:

> Before LLMs, users had to manually tag and structure their own reflections. But the exact problem is that the user cannot structure the pattern themselves. AI can now carry the cold-start burden.

## Language Rules

Avoid:

- AI therapist
- Mental health app
- Mood tracker
- Journaling app
- Self-awareness platform
- Emotional regulation tool
- Pattern recognition for everyone

Use instead:

- Recognition tool
- Founder moment capture
- Recurring stuck moments
- Fragmented reflection
- This has happened before
- Connect moments that currently stay separate

## Strong Pitch Structure

First sentence:

> We built a mobile-first recognition tool for early founders who repeatedly feel stuck after calls, messages, and decisions, but cannot connect those moments into a pattern.

Problem:

> Founders already reflect. They write notes, replay conversations, and ask friends or ChatGPT. But those reflections stay fragmented. The next time the same feeling appears, it still feels new.

Solution:

> Our app captures a live or recent moment, matches it to previous similar moments, and gives the founder a simple recognition cue for next time.

Why now:

> LLMs can structure messy personal language without forcing users into tags, forms, or psychological labels.

Wedge:

> Start with founders because they have frequent high-stakes conversations, high uncertainty, and a strong need to learn from their own patterns quickly.

Biggest risk:

> Users may like the insight but not capture moments consistently.

How to test:

> During the hackathon, ask founders whether they have recurring moments after calls or messages that they currently write down but never connect later.

## Evidence To Collect

Ask 3-5 founders:

1. Do you have moments where something feels familiar, but you cannot name what is repeating?
2. After investor, customer, or team conversations, do you replay what happened?
3. Where do you currently put those thoughts?
4. Do those notes help you recognize the same pattern next time?
5. If an app showed you "this is like the last time this happened," would you try it?

Useful evidence quotes would sound like:

- "I have this after investor calls all the time."
- "I write this in Notes but never connect it later."
- "I would try this if it helped me notice the pattern sooner."

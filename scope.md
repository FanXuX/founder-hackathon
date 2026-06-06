# Hackathon Scope

## Core Finding

The product should not be framed as a general app for tracking actions and feelings.

The earlier recognition-tool framing is useful, but the stronger founder use case is more operational:

> A personal operating system for early founders that turns messy brain dumps into structured branches, priorities, suggested actions, and recurring pattern memory.

The key user problem is not only lack of reflection. The user has too many things happening at once: product, fundraising, customer feedback, emotional uncertainty, decisions, messages, and unfinished thoughts. They need the input to be processed into structure they can act on now, while still accumulating into longer-term pattern memory.

The pattern-recognition layer should become part of a larger founder operating system, not the first thing the user has to understand.

## Sharp One-Sentence Pitch

> We built a personal operating system for early founders that turns messy brain dumps into priorities, next actions, and recurring pattern memory.

## Simple Version

> Founders dump everything on their mind; the app turns it into branches, priorities, suggested actions, and signals worth tracking.

## Target User

Early-stage founders, solo founders, and indie builders who constantly switch between product, sales, fundraising, operations, communication, and emotional uncertainty.

Examples:

- "I have investor calls, customer feedback, product issues, and team messages all in my head at once."
- "Everything feels important, and I do not know what to handle first."
- "I write things in Notes or ChatGPT, but they do not become decisions, actions, or learning."
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

> The input is captured, but not operated on. It does not become branches, priorities, actions, or accumulated pattern memory.

The deeper failure:

> Each moment is processed separately. The user may get insight once, but the next similar moment still feels like the first time.

## Product Promise

> Turn founder chaos into structured decisions, actions, and pattern memory.

Secondary emotional promise:

> It is not happening for the first time. It is just the first time you see it.

## Product Logic

The system should process one messy founder input into:

1. Branches: the active areas of concern.
2. Key points: the important extracted information inside each branch.
3. Priority: what matters most now.
4. Suggested action: what the founder should do next.
5. Anchor: a saved signal, phrase, worry, or theme that may repeat later.
6. Pattern memory: repeated anchors that become acknowledged patterns over time.

Recommended vocabulary:

- Branch: an active topic area, such as fundraising, product, customer, team, decision, communication, or personal energy.
- Anchor: a meaningful signal worth saving, such as "I am not explaining clearly" or "onboarding confusion".
- Pattern: an anchor that appears repeatedly across time or contexts.

Processing chain:

```txt
Raw input
→ branches
→ key points
→ priorities
→ suggested actions
→ anchors
→ pattern memory
```

## MVP Scope

Build the first founder brain-dump processing loop.

Must include:

- Mobile-first interface.
- One natural-language brain dump input field.
- AI-style processing into branches.
- Each branch shows category, key point, priority, and suggested next action.
- Extracted anchors that are saved as signals worth tracking.
- A mocked pattern memory section showing when an anchor has appeared before.
- Optional confirmation: "Keep this anchor?" / "Not useful".

Do not build for the hackathon:

- Full authentication.
- Complex analytics.
- Full experiment system.
- Projection layer.
- Clinical or psychological labels.
- Charts or scores.
- Long onboarding.
- Full production matching algorithm.

Optional later additions:

- Choice between "Now" and "Reflect".
- Recognition output using low-certainty language.
- Traces screen showing connected moments.
- Pattern cue screen that gives the user a phrase to recognize next time.

## Example Input And Output

Example founder input:

> Investor call tomorrow, still worried about the pricing page, customer said onboarding is confusing, I have not replied to Alex, feeling stuck about whether to pivot, and I keep thinking I am not explaining the product clearly.

Example processed output:

```txt
Branch: Fundraising
Priority: High
Key point: Investor call tomorrow
Suggested action: Prepare 3 answers around traction, pricing, and why now.
Anchor: explaining the product clearly

Branch: Product
Priority: High
Key point: Customer said onboarding is confusing
Suggested action: Review the first 3 onboarding steps before building new features.
Anchor: onboarding confusion

Branch: Communication
Priority: Medium
Key point: You have not replied to Alex
Suggested action: Send a short holding reply today.
Anchor: open reply

Branch: Strategic uncertainty
Priority: Medium
Key point: You are unsure whether to pivot
Suggested action: Do not decide today. Collect 2 more customer signals.
Anchor: pivot uncertainty

Pattern candidate
Anchor: "I am not explaining the product clearly"
Possible pattern: After high-stakes conversations, you replay whether you communicated clearly.
Keep watching this.
```

## Demo Flow

Use a fictional founder, for example Lina.

Scenario:

> Lina is building a B2B product. She has investor calls, customer feedback, product questions, and unanswered messages in her head at the same time. She normally dumps this into Notes or ChatGPT, but it does not become an operating structure. The app turns her messy input into branches, priorities, actions, and anchors that can become patterns over time.

Demo steps:

1. Lina opens the app on her phone.
2. She brain dumps everything on her mind.
3. The app processes the input into branches: Fundraising, Product, Communication, Strategy, Personal signal.
4. Each branch gets a priority and one suggested next action.
5. The app extracts anchors such as "explaining clearly", "onboarding confusion", and "pivot uncertainty".
6. The app shows one mocked pattern candidate: "This concern about explaining clearly appeared after your last investor/customer conversation too."
7. Lina chooses which anchors to keep tracking.
8. The app ends with a simple next-action list for today.

## AI Leverage

AI is not the product label. AI is the mechanism.

AI helps by:

- Reading messy natural-language founder brain dumps.
- Extracting categories, key points, priorities, and suggested actions.
- Identifying anchors: repeated signals, worries, decisions, or themes worth tracking.
- Matching anchors over time to detect pattern candidates.
- Generating concise operational output instead of long advice.

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

- Founder OS
- Founder brain dump
- Mental inbox for founders
- AI operating layer
- Branches, priorities, actions, and anchors
- Pattern-aware decision system
- This has appeared before
- Connect moments that currently stay separate

## Strong Pitch Structure

First sentence:

> We built a mobile-first founder OS that turns messy brain dumps into branches, priorities, next actions, and pattern memory.

Problem:

> Early founders constantly switch between product, fundraising, customers, messages, and personal uncertainty. Their thoughts are scattered across Notes, Notion, ChatGPT, Slack, and their head. The input gets stored, but it does not become decisions, actions, or learning.

Solution:

> Our app lets founders dump everything in one place, then processes it into branches, priorities, suggested actions, and anchors that become pattern memory over time.

Why now:

> LLMs can structure messy personal language without forcing users into tags, forms, or psychological labels.

Wedge:

> Start with founders because they have frequent high-stakes conversations, constant context switching, high uncertainty, and a strong need to convert messy information into action quickly.

Biggest risk:

> Users may like the structure but not trust the prioritization or return to the system consistently.

How to test:

> During the hackathon, ask founders to paste or speak a real messy brain dump, then see whether the processed branches, priorities, actions, and anchors feel useful enough to use again.

## Evidence To Collect

Ask 3-5 founders:

1. When you have many founder problems in your head at once, where do you put them?
2. Do your notes or ChatGPT conversations become clear priorities and actions?
3. What do you currently do when everything feels important?
4. Would you paste a messy brain dump into a tool if it returned branches, priorities, actions, and signals to track?
5. Which output matters most: categories, priorities, suggested actions, or pattern memory?
6. If the app said "this concern appeared before," would that be useful or distracting?

Useful evidence quotes would sound like:

- "I have ten things in my head and no single place to process them."
- "I use Notes and ChatGPT, but it does not turn into an operating system."
- "If this gave me priorities and next actions, I would use it every morning."
- "The pattern memory is useful if it shows me what keeps coming back."

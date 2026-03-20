# Implement Spec

Read a spec folder and implement the feature task by task.

## Important Guidelines

- **Always use AskUserQuestion tool** when asking the user anything
- **Read before writing** — Read all spec files before touching any code
- **Task by task** — Complete and confirm each task before moving to the next
- **Skip completed tasks** — Tasks marked ✅ are done; skip them without asking
- **Inject standards** — Honor any standards listed in `standards.md`

---

## Process

### Step 1: Ask for the Spec Name

Use AskUserQuestion:

```
Which spec should I implement?

Available specs:
[list folders found in agent-os/specs/]

Enter the spec folder name (or a unique part of it):
```

List the available specs by reading the `agent-os/specs/` directory. If no specs exist:

```
No specs found in agent-os/specs/. Run /shape-spec first to create one.
```

### Step 2: Locate the Spec Folder

Match the user's input against folders in `agent-os/specs/`. Accept partial matches (e.g., "registration" matches `2026-03-19-1630-user-registration-enrollment`).

If multiple folders match, use AskUserQuestion to disambiguate:

```
Multiple specs match "{input}":

1. 2026-03-19-1630-user-registration-enrollment
2. 2026-03-19-1400-user-profile-settings

Which one? (1 or 2)
```

If no folder matches:

```
No spec found matching "{input}".

Available specs:
[list all folders in agent-os/specs/]
```

### Step 3: Read All Spec Files

Read every file present in the spec folder:

- `plan.md` — **Required.** Tasks and implementation details.
- `shape.md` — Context, scope, and decisions. Read if present.
- `standards.md` — Standards to follow during implementation. Read if present.
- `references.md` — Pointers to reference code. Read if present, then read the referenced files.

After reading, summarize to the user:

```
Spec loaded: {spec-folder-name}

**Feature:** {feature name from plan.md}
**Tasks:**
1. ✅ Save spec documentation (already done)
2. [ ] {task 2 title}
3. [ ] {task 3 title}
...

**Standards in effect:** {list from standards.md, or "none"}
**References studied:** {list from references.md, or "none"}

Ready to implement. Starting with Task {N} — {first incomplete task title}.
```

Mark tasks that contain ✅ in their heading as already complete.

### Step 4: Implement Tasks in Order

For each incomplete task, starting from the first:

#### 4a. Announce the task

```
## Task {N}: {title}

{brief description of what will be done}

Starting implementation...
```

#### 4b. Implement the task

Follow the spec exactly. Do not add features, refactor unrelated code, or deviate from the plan unless a blocker requires it.

When reading reference files from `references.md`, read them before writing any code they inform.

When standards are listed in `standards.md`, apply them throughout implementation.

#### 4c. Confirm completion

After finishing the task's code changes, report what was done:

```
Task {N} complete.

Changes made:
- {file}: {what changed}
- {file}: {what changed}
```

Then immediately move to the next incomplete task without asking permission, unless:
- A task explicitly requires a decision or input from the user
- A blocker is encountered that prevents progress

#### 4d. Handle blockers

If a task cannot be completed as specified (missing dependency, ambiguous requirement, conflicting constraint), use AskUserQuestion:

```
Blocked on Task {N}: {title}

Issue: {clear description of the blocker}

Options:
1. {option A}
2. {option B}
3. Skip this task and continue

How should I proceed?
```

### Step 5: Report Completion

After all tasks are done:

```
## Implementation Complete

All tasks from "{spec-folder-name}" have been implemented.

**Summary of changes:**
- {file}: {description}
- {file}: {description}
...

**Next steps** (if applicable):
- {e.g., run migration: node src/db/migrate.js}
- {e.g., restart backend to pick up changes}
- {e.g., verify manually at /route}
```

Surface next steps only if they're mentioned in the spec or are obviously needed (e.g., database migrations, server restarts).

---

## Tips

- **plan.md is the source of truth** — If shape.md and plan.md conflict, follow plan.md.
- **Completed task markers** — A task heading containing ✅ is done; skip it.
- **Partial specs** — Some specs may only have plan.md. That's fine — implement from the plan alone.
- **Standards win** — If the plan says one thing and a standard says another, flag the conflict to the user before proceeding.

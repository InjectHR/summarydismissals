const tree = {
  start: {
    tag: "Coverage",
    question: "Is the employee likely to have access to unfair dismissal protections?",
    context:
      "Check minimum employment period, small business rules, award or enterprise agreement coverage, and whether earnings sit below the current high income threshold. If access is unlikely, still keep general protections, discrimination, contract and policy risks in view.",
    options: [
      {
        label: "Yes or not sure",
        next: "threshold",
        note: "Unfair dismissal access is possible or needs checking."
      },
      {
        label: "Likely no",
        next: "externalRisk",
        note: "Unfair dismissal access may be unavailable, but other claim risks remain."
      }
    ]
  },
  externalRisk: {
    tag: "Other risks",
    question: "Could the dismissal be connected to a protected reason or other legal risk?",
    context:
      "Screen for workplace complaints, leave, injury, discrimination, industrial activity, safety issues, contract terms, unpaid entitlements, whistleblowing and retaliation concerns before deciding how simple the process can be.",
    options: [
      {
        label: "No obvious protected-risk flags",
        next: "threshold",
        note: "No obvious general protections or discrimination flags identified."
      },
      {
        label: "Yes or not sure",
        next: "pause",
        note: "Escalate: possible general protections, discrimination or contract risk."
      }
    ]
  },
  threshold: {
    tag: "Threshold",
    question: "Is the alleged conduct deliberate, serious, or creating an immediate risk?",
    context:
      "Look for conduct that may be inconsistent with continuing employment, or creates serious and imminent safety, reputation, viability or profitability risk.",
    options: [
      {
        label: "Yes, the threshold may be met",
        next: "evidence",
        note: "Potential serious misconduct threshold identified."
      },
      {
        label: "No or not clear",
        next: "ordinary",
        note: "Threshold is not clear enough for summary dismissal."
      }
    ]
  },
  evidence: {
    tag: "Evidence",
    question: "Do you have reliable evidence that the conduct occurred?",
    context:
      "Before deciding, gather incident records, policy materials, witness accounts and the employee's version. Urgency can justify interim controls, not skipping proof.",
    options: [
      {
        label: "Yes, the evidence file is ready",
        next: "notify",
        note: "Evidence file appears ready for allegation notification."
      },
      {
        label: "No, more investigation is needed",
        next: "investigate",
        note: "Investigation needed before any dismissal pathway."
      }
    ]
  },
  notify: {
    tag: "Notice",
    question: "Has the employee been clearly notified of the allegation and possible consequence?",
    context:
      "The notification should be specific enough for the employee to respond. It should not read as though the decision has already been made.",
    options: [
      {
        label: "Yes, clear notice has been given",
        next: "response",
        note: "Employee has been notified of the reason and possible consequence."
      },
      {
        label: "No, pause and notify properly",
        next: "pause",
        note: "Process risk: notification has not happened properly."
      }
    ]
  },
  response: {
    tag: "Response",
    question: "Has the employee had a genuine chance to respond before the decision?",
    context:
      "A genuine chance means the response is listened to and considered. If the outcome is predetermined, the process may be unfair even with a valid reason.",
    options: [
      {
        label: "Yes, response was heard and considered",
        next: "mitigation",
        note: "Employee response has been considered before outcome."
      },
      {
        label: "No, the decision is premature",
        next: "pause",
        note: "Process risk: no genuine opportunity to respond."
      }
    ]
  },
  mitigation: {
    tag: "Judgment",
    question: "Have mitigation, consistency, support-person issues and proportionality been checked?",
    context:
      "Consider length of service, prior record, remorse, explanation, comparable cases, impact on others and whether a lesser outcome is reasonable.",
    options: [
      {
        label: "Yes, those factors have been weighed",
        next: "decision",
        note: "Mitigation, consistency and proportionality have been checked."
      },
      {
        label: "No, complete the judgment check",
        next: "pause",
        note: "Decision risk: proportionality and mitigation not yet checked."
      }
    ]
  },
  decision: {
    tag: "Outcome",
    question: "After considering the response, is immediate dismissal still proportionate?",
    context:
      "If yes, prepare a written outcome that explains the reason, evidence considered, response considered, final pay treatment and next steps. If no, choose a lesser disciplinary outcome.",
    options: [
      {
        label: "Yes, seek final review before action",
        next: "review",
        note: "Summary dismissal may be open, subject to final HR/legal review."
      },
      {
        label: "No, use a lesser outcome",
        next: "lesser",
        note: "Summary dismissal is not proportionate on the current facts."
      }
    ]
  },
  ordinary: {
    tag: "Recommended path",
    question: "Do not use summary dismissal on the current information.",
    context:
      "Manage this through the ordinary misconduct, performance or investigation process. Keep documenting and revisit only if new facts change the seriousness threshold.",
    options: [{ label: "Restart", next: "start", note: "Decision tree restarted." }]
  },
  investigate: {
    tag: "Recommended path",
    question: "Investigate before deciding.",
    context:
      "Secure evidence, consider interim safety steps, interview relevant witnesses and give the employee a fair chance to respond when the allegation is ready.",
    options: [{ label: "Restart", next: "start", note: "Decision tree restarted." }]
  },
  pause: {
    tag: "Recommended path",
    question: "Pause the dismissal pathway.",
    context:
      "The process has a fairness gap. Fix the notification, response, mitigation or decision-making issue before any outcome is communicated.",
    options: [{ label: "Restart", next: "start", note: "Decision tree restarted." }]
  },
  review: {
    tag: "Recommended path",
    question: "Complete final HR or legal review before communicating the outcome.",
    context:
      "Check the policy, contract, award or agreement, final pay obligations, consistency, evidence file and wording of the termination letter.",
    options: [{ label: "Restart", next: "start", note: "Decision tree restarted." }]
  },
  lesser: {
    tag: "Recommended path",
    question: "Choose a proportionate disciplinary outcome.",
    context:
      "Options may include a warning, final warning, training, mediation, transfer of duties or other action supported by policy and the facts.",
    options: [{ label: "Restart", next: "start", note: "Decision tree restarted." }]
  }
};

const orderedSteps = ["start", "externalRisk", "threshold", "evidence", "notify", "response", "mitigation", "decision"];
const state = {
  current: "start",
  history: [],
  notes: []
};

const question = document.querySelector("#tree-question");
const context = document.querySelector("#tree-context");
const tag = document.querySelector("#tree-tag");
const actions = document.querySelector("#tree-actions");
const back = document.querySelector("#tree-back");
const notes = document.querySelector("#tree-notes");
const stepLabel = document.querySelector("#step-label");
const meterFill = document.querySelector("#meter-fill");

function renderTree() {
  const node = tree[state.current];
  const stepIndex = orderedSteps.includes(state.current)
    ? orderedSteps.indexOf(state.current) + 1
    : orderedSteps.length;
  const progress = Math.max(1, stepIndex) / orderedSteps.length;

  tag.textContent = node.tag;
  question.textContent = node.question;
  context.textContent = node.context;
  stepLabel.textContent = orderedSteps.includes(state.current)
    ? `Step ${stepIndex} of ${orderedSteps.length}`
    : "Recommended path";
  meterFill.style.width = `${progress * 100}%`;

  actions.replaceChildren(
    ...node.options.map((option) => {
      const button = document.createElement("button");
      button.type = "button";
      button.textContent = option.label;
      button.addEventListener("click", () => {
        const isRestart = option.next === "start" && state.current !== "start";
        if (isRestart) {
          state.history = [];
          state.notes = [];
        } else {
          state.history.push(state.current);
          state.notes.push(option.note);
        }
        state.current = option.next;
        renderTree();
      });
      return button;
    })
  );

  notes.replaceChildren(
    ...state.notes.map((note) => {
      const item = document.createElement("li");
      item.textContent = note;
      return item;
    })
  );

  if (state.notes.length === 0) {
    const item = document.createElement("li");
    item.textContent = "No answers selected yet.";
    notes.append(item);
  }

  back.style.display = state.history.length ? "inline-flex" : "none";
}

back.addEventListener("click", () => {
  const previous = state.history.pop();
  state.notes.pop();
  state.current = previous || "start";
  renderTree();
});

const checklist = document.querySelector(".checklist-tool");
const statusText = document.querySelector("#checklist-status");
const inputs = [...document.querySelectorAll(".checklist-tool input")];

function updateChecklist() {
  const complete = inputs.filter((input) => input.checked).length;
  statusText.textContent = `${complete} of ${inputs.length} preparation items complete`;
}

checklist.addEventListener("change", updateChecklist);

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.animate(
          [
            { opacity: 0, transform: "translateY(16px)" },
            { opacity: 1, transform: "translateY(0)" }
          ],
          { duration: 520, easing: "cubic-bezier(.2,.8,.2,1)", fill: "both" }
        );
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.16 }
);

document
  .querySelectorAll(".risk-grid article, .timeline article, .case-grid article, .phrase-grid > div")
  .forEach((element) => observer.observe(element));

renderTree();

const tree = {
  coverage: {
    tag: "Claim pathway",
    question: "Does the employee have access to unfair dismissal?",
    context:
      "Screen for the minimum employment period, high income threshold, award or agreement coverage, small business rules and genuine redundancy issues. If they do not have unfair dismissal access, still screen for general protections, discrimination, contract, WHS and other risks.",
    options: [
      {
        label: "Yes, or not sure",
        next: "protections",
        note: "Unfair dismissal access should be assumed or checked before relying on exclusion."
      },
      {
        label: "No, unfair dismissal access appears excluded",
        next: "protections",
        note: "Unfair dismissal access may be excluded, but other legal risks still need to be checked."
      }
    ]
  },
  protections: {
    tag: "Legal risk screen",
    question: "Are there general protections, discrimination, leave, injury, complaint or other protected-rights risks?",
    context:
      "Even where unfair dismissal is unavailable, a dismissal can still create risk if it is connected to workplace rights, complaints, illness or injury, parental or carer's responsibilities, discrimination attributes, union activity, WHS issues or other protected matters.",
    options: [
      {
        label: "No obvious protected-rights issue",
        next: "pathway",
        note: "No obvious general protections or discrimination issue identified, subject to final review."
      },
      {
        label: "Yes, there are risk flags",
        next: "pause",
        note: "Protected-rights risk identified. Pause for HR/legal review before any dismissal pathway."
      }
    ]
  },
  pathway: {
    tag: "Pathway choice",
    question: "Is termination with notice a realistic and safer option?",
    context:
      "The alternative to summary dismissal is termination with notice or payment in lieu. Summary dismissal is only for conduct so serious that continuing the employment relationship during notice would be inappropriate.",
    options: [
      {
        label: "No, immediate termination may be necessary",
        next: "threshold",
        note: "Termination with notice considered; summary dismissal threshold needs testing."
      },
      {
        label: "Yes, notice may be more proportionate",
        next: "noticePath",
        note: "Termination with notice may be a safer or more proportionate pathway."
      }
    ]
  },
  threshold: {
    tag: "Serious misconduct threshold",
    question: "Is the alleged conduct deliberate, serious, or creating an immediate risk?",
    context:
      "Look for conduct that may be inconsistent with continuing employment, or creates serious and imminent safety, reputation, viability or profitability risk. Examples can include theft, fraud, assault, sexual harassment, intoxication at work or refusing a lawful and reasonable instruction.",
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
        next: "admission",
        note: "Evidence file appears ready for allegation notification."
      },
      {
        label: "No, more investigation is needed",
        next: "investigate",
        note: "Investigation needed before any dismissal pathway."
      }
    ]
  },
  admission: {
    tag: "Evidence trap",
    question: "Is the business relying on an admission, confession, CCTV, positive test or ‘caught red handed’ evidence?",
    context:
      "Strong evidence can help establish the conduct, but it does not remove the need for fair process. The employee may still have context, mitigation, an explanation, or a response to the proposed consequence.",
    options: [
      {
        label: "Yes, but we will still run a fair process",
        next: "notify",
        note: "Strong evidence noted, but fair process is still required."
      },
      {
        label: "No, evidence is broader than that",
        next: "notify",
        note: "Proceeding to notification stage."
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
      "Consider length of service, prior record, remorse, explanation, comparable cases, impact on others and whether a lesser outcome or termination with notice is reasonable.",
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
      "If yes, prepare a written outcome that explains the reason, evidence considered, response considered, why notice is inappropriate, final pay treatment and next steps. If no, choose termination with notice or a lesser disciplinary outcome.",
    options: [
      {
        label: "Yes, seek final review before action",
        next: "review",
        note: "Summary dismissal may be open, subject to final HR/legal review."
      },
      {
        label: "No, use notice or a lesser outcome",
        next: "lesser",
        note: "Summary dismissal is not proportionate on the current facts."
      }
    ]
  },
  noticePath: {
    tag: "Recommended path",
    question: "Consider termination with notice instead of summary dismissal.",
    context:
      "If employment should end but the serious misconduct threshold is uncertain or proportionality is weak, termination with notice or payment in lieu may reduce risk. Still check unfair dismissal, general protections, discrimination, contract, award/agreement and final pay obligations.",
    options: [{ label: "Restart", next: "coverage", note: "Decision tree restarted." }]
  },
  ordinary: {
    tag: "Recommended path",
    question: "Do not use summary dismissal on the current information.",
    context:
      "Manage this through the ordinary misconduct, performance or investigation process. Keep documenting and revisit only if new facts change the seriousness threshold.",
    options: [{ label: "Restart", next: "coverage", note: "Decision tree restarted." }]
  },
  investigate: {
    tag: "Recommended path",
    question: "Investigate before deciding.",
    context:
      "Secure evidence, consider interim safety steps, interview relevant witnesses and give the employee a fair chance to respond when the allegation is ready.",
    options: [{ label: "Restart", next: "coverage", note: "Decision tree restarted." }]
  },
  pause: {
    tag: "Recommended path",
    question: "Pause the dismissal pathway.",
    context:
      "The process has a fairness or legal-risk gap. Fix the notification, response, mitigation, protected-rights or decision-making issue before any outcome is communicated.",
    options: [{ label: "Restart", next: "coverage", note: "Decision tree restarted." }]
  },
  review: {
    tag: "Recommended path",
    question: "Complete final HR or legal review before communicating the outcome.",
    context:
      "Check the policy, contract, award or agreement, final pay obligations, consistency, evidence file, general protections risk and wording of the termination letter.",
    options: [{ label: "Restart", next: "coverage", note: "Decision tree restarted." }]
  },
  lesser: {
    tag: "Recommended path",
    question: "Choose termination with notice or a proportionate disciplinary outcome.",
    context:
      "Options may include termination with notice, payment in lieu, a warning, final warning, training, mediation, transfer of duties or other action supported by policy and the facts.",
    options: [{ label: "Restart", next: "coverage", note: "Decision tree restarted." }]
  }
};

const orderedSteps = ["coverage", "protections", "pathway", "threshold", "evidence", "admission", "notify", "response", "mitigation", "decision"];
const state = {
  current: "coverage",
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
        const isRestart = option.next === "coverage" && state.current !== "coverage";
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
  state.current = previous || "coverage";
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
  .querySelectorAll(".risk-grid article, .timeline article, .case-grid article, .phrase-grid > div, .pathway-grid article, .case-table-wrap")
  .forEach((element) => observer.observe(element));

renderTree();

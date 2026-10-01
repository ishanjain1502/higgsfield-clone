import decisions from "../.docs/decisions-v1.json";

export const HIGHLIGHT_REEL_PATH = decisions.O15.highlightReelPath;
export const STEP_QUERY_PARAM = decisions.O15.stepQueryParam;
export const WIZARD_STEPS = decisions.O15.stepValues as readonly string[];
export const RESULT_PATH = decisions.O15.resultPathPattern;

export type WizardStep = (typeof WIZARD_STEPS)[number];

export function isWizardStep(value: string | null): value is WizardStep {
  return value !== null && (WIZARD_STEPS as readonly string[]).includes(value);
}

export function stepIndex(step: WizardStep): number {
  return WIZARD_STEPS.indexOf(step);
}

export function stepHref(step: WizardStep): string {
  return `${HIGHLIGHT_REEL_PATH}?${STEP_QUERY_PARAM}=${step}`;
}

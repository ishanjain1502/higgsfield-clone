"use client";

import { useRouter } from "next/navigation";
import { useState } from "react";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { cn } from "@/lib/utils";
import {
  ONBOARDING_CONTENT_VIBES,
  ONBOARDING_CREATE_TYPES,
  ONBOARDING_INTERESTS,
  type OnboardingPreferences,
} from "@/lib/onboarding-preferences";

function toggleValue(list: string[], value: string): string[] {
  return list.includes(value)
    ? list.filter((v) => v !== value)
    : [...list, value];
}

function OptionGroup({
  title,
  description,
  options,
  selected,
  onChange,
}: {
  title: string;
  description: string;
  options: readonly { value: string; label: string }[];
  selected: string[];
  onChange: (next: string[]) => void;
}) {
  return (
    <div className="flex flex-col gap-3">
      <div>
        <h2 className="text-base font-medium">{title}</h2>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
      <div className="flex flex-wrap gap-2">
        {options.map((option) => {
          const active = selected.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              onClick={() => onChange(toggleValue(selected, option.value))}
              className={cn(
                "rounded-lg border px-3 py-2 text-sm transition-colors",
                active
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-background text-muted-foreground hover:border-foreground/20 hover:text-foreground",
              )}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export function OnboardingForm() {
  const router = useRouter();
  const [prefs, setPrefs] = useState<OnboardingPreferences>({
    createTypes: [],
    interests: [],
    contentVibes: [],
  });
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  async function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    setError(null);
    setSubmitting(true);

    try {
      const response = await fetch("/api/onboarding", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(prefs),
      });

      if (!response.ok) {
        const data = (await response.json()) as { error?: string };
        setError(data.error ?? "Could not save preferences.");
        return;
      }

      router.push("/home");
      router.refresh();
    } catch {
      setError("Network error. Try again.");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card>
        <CardHeader>
          <CardTitle>Tell us what you create</CardTitle>
          <CardDescription>
            Your choices personalize Home and Focus. You can explore everything
            in Studio later.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex flex-col gap-8">
          <OptionGroup
            title="What do you create?"
            description="Pick one or more."
            options={ONBOARDING_CREATE_TYPES}
            selected={prefs.createTypes}
            onChange={(createTypes) =>
              setPrefs((current) => ({ ...current, createTypes }))
            }
          />
          <OptionGroup
            title="What are you interested in?"
            description="Pick one or more."
            options={ONBOARDING_INTERESTS}
            selected={prefs.interests}
            onChange={(interests) =>
              setPrefs((current) => ({ ...current, interests }))
            }
          />
          <OptionGroup
            title="What kind of content do you like?"
            description="Pick one or more."
            options={ONBOARDING_CONTENT_VIBES}
            selected={prefs.contentVibes}
            onChange={(contentVibes) =>
              setPrefs((current) => ({ ...current, contentVibes }))
            }
          />
          {error ? (
            <p className="text-sm text-destructive" role="alert">
              {error}
            </p>
          ) : null}
        </CardContent>
        <CardFooter>
          <Button type="submit" size="lg" disabled={submitting}>
            {submitting ? "Saving…" : "Continue to Home"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}

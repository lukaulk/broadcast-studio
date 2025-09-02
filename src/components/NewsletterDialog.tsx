import { useState } from "react";
import { Mail, CheckCircle2 } from "lucide-react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

/**
 * FeatureSubscribeDialog
 *
 * A shadcn/ui dialog with an email field to subscribe for notifications
 * about a new feature in your app (Broadcast Studio).
 *
 * Usage:
 * <FeatureSubscribeDialog featureName="Live Packet Capture"/>
 */
export default function FeatureSubscribeDialog({
  featureName = "New Feature",
  triggerText = "Notify me",
}: {
  featureName?: string;
  triggerText?: string;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const isValidEmail = (val: string) =>
    /^[\w.!#$%&'*+/=?`{|}~-]+@[\w-]+(?:\.[\w-]+)+$/.test(val);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    setError(null);

    if (!isValidEmail(email)) {
      setError("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      // TODO: Replace with your real API call.
      // Example:
      // await fetch("/api/notify", {
      //   method: "POST",
      //   headers: { "Content-Type": "application/json" },
      //   body: JSON.stringify({ email, feature: featureName }),
      // });
      await new Promise((r) => setTimeout(r, 900));
      setSuccess(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  }

  function reset() {
    setEmail("");
    setSuccess(false);
    setError(null);
  }

  return (
    <Dialog open={open} onOpenChange={(v) => { setOpen(v); if (!v) reset(); }}>
      <DialogTrigger asChild>
        <Button className="rounded-2xl px-4" variant="default">
          <Mail className="mr-2 h-4 w-4" /> {triggerText}
        </Button>
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">Get notified when we launch</DialogTitle>
          <DialogDescription>
            Subscribe to receive an email when <span className="font-medium">{featureName}</span> becomes available in Broadcast Studio.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex items-start gap-3 rounded-xl border p-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5" />
            <div>
              <p className="font-medium">You're on the list!</p>
              <p className="text-sm text-muted-foreground">We'll email {email} as soon as the feature is live.</p>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
            <DialogFooter className="gap-2 sm:gap-0">
              <Button type="button" variant="ghost" onClick={() => setOpen(false)}>
                Cancel
              </Button>
              <Button type="submit" disabled={loading} className="rounded-2xl">
                {loading ? "Subscribing…" : "Subscribe"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}

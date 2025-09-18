import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { CheckCircle2, Mail } from "lucide-react";
import { useId, useState } from "react";

export default function FeatureSubscribeDialog({
  featureName = "New Feature",
  triggerText = "Notify me",
  buttonTrigger,
}: {
  featureName?: string;
  triggerText?: string;
  buttonTrigger?: React.ReactNode;
}) {
  const [open, setOpen] = useState(false);
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const emailId = useId();

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
      await new Promise((r) => setTimeout(r, 900));
      setSuccess(true);
    } catch (err) {
      setError("Something went wrong. Please try again.");
      new Error("Failed to subscribe for notifications: ", { cause: err });
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
    <Dialog
      open={open}
      onOpenChange={(v) => {
        setOpen(v);
        if (!v) reset();
      }}
    >
      <DialogTrigger asChild>
        {buttonTrigger ? (
          buttonTrigger
        ) : (
          <Button className="rounded-2xl px-4" variant="default">
            <Mail className="mr-2 h-4 w-4" /> {triggerText}
          </Button>
        )}
      </DialogTrigger>
      <DialogContent className="sm:max-w-md rounded-2xl">
        <DialogHeader>
          <DialogTitle className="text-xl">
            Get notified when we launch
          </DialogTitle>
          <DialogDescription>
            Subscribe to receive an email when{" "}
            <span className="font-medium">{featureName}</span> becomes available
            in Broadcast Studio.
          </DialogDescription>
        </DialogHeader>

        {success ? (
          <div className="flex items-start gap-3 rounded-xl border p-3">
            <CheckCircle2 className="mt-0.5 h-5 w-5" />
            <div>
              <p className="font-medium">You&apos;re on the list!</p>
              <p className="text-sm text-muted-foreground">
                We&apos;ll email <span className="font-semibold">{email}</span>{" "}
                as soon as the feature is live.
              </p>
            </div>
          </div>
        ) : (
          <form onSubmit={onSubmit} className="grid gap-4">
            <div className="grid gap-2">
              {/* ✅ usando ID único */}
              <Label htmlFor={emailId}>Email</Label>
              <Input
                id={emailId}
                type="email"
                placeholder="you@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                autoComplete="email"
                required
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
            </div>
            <DialogFooter className="">
              <Button
                type="button"
                variant="ghost"
                onClick={() => setOpen(false)}
                className="cursor-pointer"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={loading}
                className="rounded-2xl cursor-pointer"
              >
                {loading ? "Subscribing…" : "Subscribe"}
              </Button>
            </DialogFooter>
          </form>
        )}
      </DialogContent>
    </Dialog>
  );
}


import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Star } from "lucide-react";
import { toast } from "sonner";
import emailjs from "@emailjs/browser";

export const FeedbackDialog = ({ children }: { children?: React.ReactNode }) => {
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [email, setEmail] = useState("");
  const [suggestion, setSuggestion] = useState("");
  const [open, setOpen] = useState(false);

const SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;


  // Initialize EmailJS only once
  useEffect(() => {
    emailjs.init(PUBLIC_KEY);
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (rating === 0) {
      toast.error("Please provide a rating");
      return;
    }

    if (!email.trim()) {
      toast.error("Please provide your email");
      return;
    }

    if (!suggestion.trim()) {
      toast.error("Please share your suggestions");
      return;
    }

    const templateParams = {
      rating,
      email,
      suggestion,
    };

    try {
      await emailjs.send(
        SERVICE_ID,
        TEMPLATE_ID,
        templateParams,
        {
          publicKey: PUBLIC_KEY, // MUST be object (EmailJS v3 change)
        }
      );

      toast.success("Thank you for your feedback!");

      setRating(0);
      setEmail("");
      setSuggestion("");
      setOpen(false);
    } catch (error) {
      console.error("EmailJS Error:", error);
      toast.error("Failed to send feedback. Try again later.");
    }
  };

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        {children ? (
          children
        ) : (
          <Button
            variant="outline"
            size="sm"
            className="w-full md:w-auto bg-orange-500 text-white hover:bg-orange-600"
          >
            Click Here
          </Button>
        )}
      </DialogTrigger>

      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>Help Us Improve</DialogTitle>
          <DialogDescription>
            Your feedback is valuable to us. Please share your experience and suggestions.
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-6 py-4">
          {/* Rating */}
          <div className="space-y-2">
            <Label>Rate Your Experience</Label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="transition-transform hover:scale-110"
                >
                  <Star
                    className={`h-8 w-8 ${
                      star <= (hoveredRating || rating)
                        ? "fill-yellow-400 text-yellow-400"
                        : "text-muted-foreground"
                    }`}
                  />
                </button>
              ))}
            </div>
            {rating > 0 && (
              <p className="text-sm text-muted-foreground">
                You rated: {rating} star{rating !== 1 ? "s" : ""}
              </p>
            )}
          </div>

          {/* Email */}
          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              type="email"
              placeholder="your.email@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>

          {/* Suggestion */}
          <div className="space-y-2">
            <Label htmlFor="suggestion">Tell us how we can improve</Label>
            <Textarea
              id="suggestion"
              placeholder="Share your thoughts, suggestions, or feature requests..."
              value={suggestion}
              onChange={(e) => setSuggestion(e.target.value)}
              rows={5}
              required
            />
          </div>

          {/* Submit */}
          <Button type="submit" className="w-full">
            Submit Feedback
          </Button>
        </form>
      </DialogContent>
    </Dialog>
  );
};

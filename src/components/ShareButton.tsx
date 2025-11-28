import { useState } from "react";
import { Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetHeader, SheetTitle, SheetTrigger } from "@/components/ui/sheet";

export default function ShareButton({ title, text }) {
  const [open, setOpen] = useState(false);

  const shareUrl = window.location.href;
  const shareText = text || "Check this out!";
  const shareTitle = title || "Share this article";

  const handleMobileShare = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title: shareTitle,
          text: shareText,
          url: shareUrl
        });
      } catch (err) {
        console.log("Share cancelled", err);
      }
    } else {
      setOpen(true);
    }
  };

  return (
    <Sheet open={open} onOpenChange={setOpen}>
      <SheetTrigger asChild>
        <Button
          variant="outline"
          size="sm"
          onClick={handleMobileShare}
          className="rounded-full px-5 py-2 font-medium border-slate-300 hover:bg-slate-100 hover:border-slate-400 transition-all shadow-sm flex items-center gap-2"
        >
          <Share2 className="h-4 w-4" />
          Share
        </Button>
      </SheetTrigger>

      {/* DESKTOP POPUP */}
      <SheetContent side="bottom" className="rounded-t-3xl pb-6">
        <SheetHeader>
          <SheetTitle className="text-center">Share via</SheetTitle>
        </SheetHeader>

        <div className="grid grid-cols-4 gap-5 mt-6 place-items-center">

          {/* WhatsApp */}
          <a
            href={`https://wa.me/?text=${encodeURIComponent(shareText + " " + shareUrl)}`}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-1"
          >
            <img src="https://img.icons8.com/color/48/whatsapp--v1.png" className="h-10 w-10" />
            <span className="text-xs">WhatsApp</span>
          </a>

          {/* Telegram */}
          <a
            href={`https://t.me/share/url?url=${shareUrl}&text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-1"
          >
            <img src="https://img.icons8.com/color/48/telegram-app.png" className="h-10 w-10" />
            <span className="text-xs">Telegram</span>
          </a>

          {/* Email */}
          <a
            href={`mailto:?subject=${encodeURIComponent(shareTitle)}&body=${encodeURIComponent(
              shareText + "\n" + shareUrl
            )}`}
            className="flex flex-col items-center gap-1"
          >
            <img src="https://img.icons8.com/color/48/gmail.png" className="h-10 w-10" />
            <span className="text-xs">Email</span>
          </a>

          {/* Twitter */}
          <a
            href={`https://twitter.com/intent/tweet?url=${shareUrl}&text=${encodeURIComponent(shareText)}`}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-1"
          >
            <img src="https://img.icons8.com/ios-filled/50/twitter.png" className="h-10 w-10" />
            <span className="text-xs">Twitter</span>
          </a>

          {/* Facebook */}
          <a
            href={`https://www.facebook.com/sharer/sharer.php?u=${shareUrl}`}
            target="_blank"
            rel="noreferrer"
            className="flex flex-col items-center gap-1"
          >
            <img src="https://img.icons8.com/color/48/facebook-new.png" className="h-10 w-10" />
            <span className="text-xs">Facebook</span>
          </a>

          {/* Copy Link */}
          <button
            onClick={() => {
              navigator.clipboard.writeText(shareUrl);
              setOpen(false);
              alert("Link copied to clipboard!");
            }}
            className="flex flex-col items-center gap-1"
          >
            <img src="https://img.icons8.com/ios-glyphs/30/copy.png" className="h-10 w-10" />
            <span className="text-xs">Copy</span>
          </button>

        </div>
      </SheetContent>
    </Sheet>
  );
}

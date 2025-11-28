// import { Card, CardContent } from "@/components/ui/card";
// import { Sparkles } from "lucide-react";
// import { FeedbackDialog } from "./FeedbackDialog";
// import feedbackImage from "@/assets/feedback-illustration.jpg";

// export const FeedbackSection = () => {
//   return (
//     <Card className="shadow-lg border-primary/30 bg-primary backdrop-blur-sm overflow-hidden relative">
//       <div className="absolute inset-0 bg-gradient-to-br from-primary/10 via-transparent to-accent/10 pointer-events-none" />
//       <CardContent className="p-4 relative">
//         <div className="flex flex-col items-center gap-3 text-center">
         
//           <div>
//             <h1 className="font-bold text-base mb-1 bg-white to-accent bg-clip-text text-transparent">
//               Share Your Feedback
//             </h1>
//             <p className="text-xs text-white/80">
//               Your opinion matters! Help us serve you better
//             </p>
//           </div>
//           <FeedbackDialog />
//         </div>
//       </CardContent>
//     </Card>
//   );
// };



import { FeedbackDialog } from "./FeedbackDialog";
import { MessageCircle, MessageSquare, MessageSquareQuote, PenLine, Sparkles } from "lucide-react";

export const FeedbackSection = () => {
  return (
    <div className="fixed bottom-6 right-6 z-50">
      <FeedbackDialog>
        <div className="p-3 bg-blue-600 rounded-full shadow-lg cursor-pointer hover:bg-blue-900  transition">
          <MessageSquareQuote className="h-5 w-5 text-white" />
        </div>
      </FeedbackDialog>
    </div>
  );
};

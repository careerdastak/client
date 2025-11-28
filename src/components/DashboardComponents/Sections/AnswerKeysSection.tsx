import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";

const answerKeySchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  organization: z.string().min(3, "Organization name is required"),
  date: z.string().min(1, "Release date is required"),
  examDate: z.string().min(1, "Exam date is required"),
  status: z.string().optional(),
});

interface AnswerKeysSectionProps {
  onLogout: () => void;
}

export const AnswerKeysSection = ({ onLogout }: AnswerKeysSectionProps) => {
  const { toast } = useToast();

  const answerKeyForm = useForm<z.infer<typeof answerKeySchema>>({
    resolver: zodResolver(answerKeySchema),
    defaultValues: { title: "", organization: "", date: "", examDate: "", status: "" },
  });

  const onAnswerKeySubmit = (data: z.infer<typeof answerKeySchema>) => {
    console.log("Answer Key Data:", data);
    toast({ title: "Answer Key Posted Successfully" });
    answerKeyForm.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post New Answer Key</CardTitle>
        <CardDescription>Add a new answer key notification</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...answerKeyForm}>
          <form onSubmit={answerKeyForm.handleSubmit(onAnswerKeySubmit)} className="space-y-4">
            <FormField control={answerKeyForm.control} name="title" render={({ field }) => (
              <FormItem><FormLabel>Answer Key Title</FormLabel><FormControl><Input placeholder="e.g., SSC CGL Tier-1 2024 Answer Key" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={answerKeyForm.control} name="organization" render={({ field }) => (
              <FormItem><FormLabel>Organization</FormLabel><FormControl><Input placeholder="e.g., Staff Selection Commission" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField control={answerKeyForm.control} name="date" render={({ field }) => (
                <FormItem><FormLabel>Release Date</FormLabel><FormControl><Input placeholder="e.g., 08 Nov 2024" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={answerKeyForm.control} name="examDate" render={({ field }) => (
                <FormItem><FormLabel>Exam Date</FormLabel><FormControl><Input placeholder="e.g., 16 Sep - 26 Sep 2024" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={answerKeyForm.control} name="status" render={({ field }) => (
                <FormItem><FormLabel>Status (Optional)</FormLabel><FormControl><Input placeholder="e.g., Latest, New" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <Button type="submit" className="w-full">Post Answer Key</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const admitCardSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  organization: z.string().min(3, "Organization name is required"),
  date: z.string().min(1, "Release date is required"),
  examDate: z.string().min(1, "Exam date is required"),
  status: z.string().min(1, "Status is required"),
});

interface AdmitCardsSectionProps {
  onLogout: () => void;
}

export const AdmitCardsSection = ({ onLogout }: AdmitCardsSectionProps) => {
  const { toast } = useToast();

  const admitCardForm = useForm<z.infer<typeof admitCardSchema>>({
    resolver: zodResolver(admitCardSchema),
    defaultValues: { title: "", organization: "", date: "", examDate: "", status: "" },
  });

  const onAdmitCardSubmit = (data: z.infer<typeof admitCardSchema>) => {
    console.log("Admit Card Data:", data);
    toast({ title: "Admit Card Posted Successfully" });
    admitCardForm.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post New Admit Card</CardTitle>
        <CardDescription>Add a new admit card notification</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...admitCardForm}>
          <form onSubmit={admitCardForm.handleSubmit(onAdmitCardSubmit)} className="space-y-4">
            <FormField control={admitCardForm.control} name="title" render={({ field }) => (
              <FormItem><FormLabel>Admit Card Title</FormLabel><FormControl><Input placeholder="e.g., SSC MTS Admit Card 2024" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={admitCardForm.control} name="organization" render={({ field }) => (
              <FormItem><FormLabel>Organization</FormLabel><FormControl><Input placeholder="e.g., Staff Selection Commission" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <FormField control={admitCardForm.control} name="date" render={({ field }) => (
                <FormItem><FormLabel>Release Date</FormLabel><FormControl><Input placeholder="e.g., 10 Nov 2024" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={admitCardForm.control} name="examDate" render={({ field }) => (
                <FormItem><FormLabel>Exam Date</FormLabel><FormControl><Input placeholder="e.g., 30 Nov 2024" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={admitCardForm.control} name="status" render={({ field }) => (
                <FormItem><FormLabel>Status</FormLabel><Select onValueChange={field.onChange} defaultValue={field.value}><FormControl><SelectTrigger><SelectValue placeholder="Select status" /></SelectTrigger></FormControl><SelectContent><SelectItem value="Available">Available</SelectItem><SelectItem value="Coming Soon">Coming Soon</SelectItem></SelectContent></Select><FormMessage /></FormItem>
              )} />
            </div>
            <Button type="submit" className="w-full">Post Admit Card</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
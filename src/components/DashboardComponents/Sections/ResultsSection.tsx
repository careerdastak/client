import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { useToast } from "@/hooks/use-toast";
import { CRUDList } from "@/components/CRUDList";

const resultSchema = z.object({
  title: z.string().min(5, "Title must be at least 5 characters"),
  organization: z.string().min(3, "Organization name is required"),
  date: z.string().min(1, "Date is required"),
  status: z.string().optional(),
});

type ResultData = z.infer<typeof resultSchema> & { id: string };

interface ResultsSectionProps {
  onLogout: () => void;
}

export const ResultsSection = ({ onLogout }: ResultsSectionProps) => {
  const { toast } = useToast();
  const [results, setResults] = useState<ResultData[]>([]);
  const [editingResultId, setEditingResultId] = useState<string | null>(null);

  const resultForm = useForm<z.infer<typeof resultSchema>>({
    resolver: zodResolver(resultSchema),
    defaultValues: { title: "", organization: "", date: "", status: "" },
  });

  const onResultSubmit = (data: z.infer<typeof resultSchema>) => {
    if (editingResultId) {
      setResults(results.map(result => result.id === editingResultId ? { ...data, id: editingResultId } : result));
      setEditingResultId(null);
      toast({ title: "Result Updated Successfully" });
    } else {
      const newResult = { ...data, id: Date.now().toString() };
      setResults([...results, newResult]);
      toast({ title: "Result Posted Successfully" });
    }
    resultForm.reset();
  };

  const handleDeleteResult = (result: ResultData) => {
    setResults(results.filter(r => r.id !== result.id));
    toast({ title: "Result Deleted" });
  };

  return (
    <>
      <Card>
        <CardHeader>
          <CardTitle>Post New Result</CardTitle>
          <CardDescription>Add a new exam result to the Results section</CardDescription>
        </CardHeader>
        <CardContent>
          <Form {...resultForm}>
            <form onSubmit={resultForm.handleSubmit(onResultSubmit)} className="space-y-4">
              <FormField control={resultForm.control} name="title" render={({ field }) => (
                <FormItem><FormLabel>Result Title</FormLabel><FormControl><Input placeholder="e.g., SSC CHSL Tier-1 Exam Result 2024" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={resultForm.control} name="organization" render={({ field }) => (
                <FormItem><FormLabel>Organization</FormLabel><FormControl><Input placeholder="e.g., Staff Selection Commission" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <FormField control={resultForm.control} name="date" render={({ field }) => (
                  <FormItem><FormLabel>Release Date</FormLabel><FormControl><Input placeholder="e.g., 10 Nov 2024" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
                <FormField control={resultForm.control} name="status" render={({ field }) => (
                  <FormItem><FormLabel>Status (Optional)</FormLabel><FormControl><Input placeholder="e.g., Latest, New" {...field} /></FormControl><FormMessage /></FormItem>
                )} />
              </div>
              <Button type="submit" className="w-full">Post Result</Button>
            </form>
          </Form>
        </CardContent>
      </Card>

      <div className="mt-8">
        <CRUDList
          title="Posted Results"
          description="Manage all posted results"
          items={results}
          idKey="id"
          onEdit={(result) => {
            setEditingResultId(result.id);
            resultForm.reset({
              title: result.title,
              organization: result.organization,
              date: result.date,
              status: result.status
            });
          }}
          onDelete={handleDeleteResult}
          renderItem={(result) => (
            <div>
              <h4 className="font-semibold">{result.title}</h4>
              <p className="text-sm text-muted-foreground">{result.organization}</p>
              <p className="text-xs text-muted-foreground mt-1">
                Date: {result.date} | Status: {result.status || 'N/A'}
              </p>
            </div>
          )}
        />
      </div>
    </>
  );
};
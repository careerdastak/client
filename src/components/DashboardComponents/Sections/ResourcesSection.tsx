import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/components/ui/form";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useToast } from "@/hooks/use-toast";

const resourceSchema = z.object({
  category: z.string().min(1, "Category is required"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description must be at least 10 characters"),
  link: z.string().url("Must be a valid URL"),
  institute: z.string().min(2, "Institute name is required"),
  badge: z.string().optional(),
});

interface ResourcesSectionProps {
  onLogout: () => void;
}

export const ResourcesSection = ({ onLogout }: ResourcesSectionProps) => {
  const { toast } = useToast();

  const resourceForm = useForm<z.infer<typeof resourceSchema>>({
    resolver: zodResolver(resourceSchema),
    defaultValues: { category: "", title: "", description: "", link: "", institute: "", badge: "" },
  });

  const onResourceSubmit = (data: z.infer<typeof resourceSchema>) => {
    console.log("Resource Data:", data);
    toast({ title: "Resource Posted Successfully" });
    resourceForm.reset();
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>Post New Resource</CardTitle>
        <CardDescription>Add a new educational resource</CardDescription>
      </CardHeader>
      <CardContent>
        <Form {...resourceForm}>
          <form onSubmit={resourceForm.handleSubmit(onResourceSubmit)} className="space-y-4">
            <FormField control={resourceForm.control} name="category" render={({ field }) => (
              <FormItem>
                <FormLabel>Category</FormLabel>
                <Select onValueChange={field.onChange} defaultValue={field.value}>
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Select category" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="upsc-coaching">UPSC Resources</SelectItem>
                    <SelectItem value="ssc-banking">SSC & Banking</SelectItem>
                    <SelectItem value="engineering-medical">JEE & NEET</SelectItem>
                    <SelectItem value="state-exams">State PSC & Others</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )} />
            <FormField control={resourceForm.control} name="title" render={({ field }) => (
              <FormItem><FormLabel>Resource Title</FormLabel><FormControl><Input placeholder="e.g., BYJU'S IAS Coaching" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={resourceForm.control} name="description" render={({ field }) => (
              <FormItem><FormLabel>Description</FormLabel><FormControl><Textarea placeholder="e.g., Comprehensive UPSC preparation with live classes" className="min-h-[80px]" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <FormField control={resourceForm.control} name="link" render={({ field }) => (
              <FormItem><FormLabel>Link</FormLabel><FormControl><Input placeholder="e.g., https://byjus.com/ias/" {...field} /></FormControl><FormMessage /></FormItem>
            )} />
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField control={resourceForm.control} name="institute" render={({ field }) => (
                <FormItem><FormLabel>Institute Name</FormLabel><FormControl><Input placeholder="e.g., BYJU'S" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
              <FormField control={resourceForm.control} name="badge" render={({ field }) => (
                <FormItem><FormLabel>Badge (Optional)</FormLabel><FormControl><Input placeholder="e.g., Popular, New, Updated" {...field} /></FormControl><FormMessage /></FormItem>
              )} />
            </div>
            <Button type="submit" className="w-full">Post Resource</Button>
          </form>
        </Form>
      </CardContent>
    </Card>
  );
};
import { useState } from "react";
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
import { Trash2, Edit, Plus, Eye } from "lucide-react";
import { Separator } from "@/components/ui/separator";

const questionSchema = z.object({
  question: z.string().min(10, "Question must be at least 10 characters"),
  option1: z.string().min(1, "Option 1 is required"),
  option2: z.string().min(1, "Option 2 is required"),
  option3: z.string().min(1, "Option 3 is required"),
  option4: z.string().min(1, "Option 4 is required"),
  correctAnswer: z.string().min(1, "Correct answer is required"),
  marks: z.string().min(1, "Marks are required"),
  negativeMarks: z.string().optional(),
  subject: z.string().min(1, "Subject is required"),
});

const quizSchema = z.object({
  quizType: z.string().min(1, "Quiz type is required"),
  title: z.string().min(5, "Title must be at least 5 characters"),
  description: z.string().min(10, "Description is required"),
  duration: z.string().min(1, "Duration is required"),
});

type Quiz = {
  id: string;
  quizType: string;
  title: string;
  description: string;
  duration: string;
  questions: Question[];
};

type Question = z.infer<typeof questionSchema> & { id: string };

export const QuizManagement = () => {
  const { toast } = useToast();
  const [quizzes, setQuizzes] = useState<Quiz[]>([]);
  const [selectedQuiz, setSelectedQuiz] = useState<Quiz | null>(null);
  const [editingQuestion, setEditingQuestion] = useState<Question | null>(null);

  const quizForm = useForm<z.infer<typeof quizSchema>>({
    resolver: zodResolver(quizSchema),
    defaultValues: {
      quizType: "",
      title: "",
      description: "",
      duration: "",
    },
  });

  const questionForm = useForm<z.infer<typeof questionSchema>>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      question: "",
      option1: "",
      option2: "",
      option3: "",
      option4: "",
      correctAnswer: "",
      marks: "4",
      negativeMarks: "1",
      subject: "",
    },
  });

  const quizTypes = [
    { value: "JEE", label: "JEE Main/Advanced", subjects: ["Physics", "Chemistry", "Mathematics"] },
    { value: "NEET", label: "NEET UG", subjects: ["Physics", "Chemistry", "Biology"] },
    { value: "UPSC", label: "UPSC Civil Services", subjects: ["History", "Geography", "Polity", "Economy", "Science & Tech", "Current Affairs"] },
    { value: "SSC_CGL", label: "SSC CGL", subjects: ["General Intelligence", "General Awareness", "Quantitative Aptitude", "English"] },
  ];

  const onQuizSubmit = (data: z.infer<typeof quizSchema>) => {
    const newQuiz: Quiz = {
      id: Date.now().toString(),
      quizType: data.quizType,
      title: data.title,
      description: data.description,
      duration: data.duration,
      questions: [],
    };
    setQuizzes([...quizzes, newQuiz]);
    setSelectedQuiz(newQuiz);
    toast({
      title: "Quiz Created Successfully",
      description: `${data.title} has been created. Now add questions.`,
    });
    quizForm.reset();
  };

  const onQuestionSubmit = (data: z.infer<typeof questionSchema>) => {
    if (!selectedQuiz) {
      toast({
        title: "No Quiz Selected",
        description: "Please create or select a quiz first.",
        variant: "destructive",
      });
      return;
    }

    const questionData: Question = {
      ...data,
      id: Date.now().toString(),
    };

    if (editingQuestion) {
      // Update existing question
      const updatedQuestions = selectedQuiz.questions.map((q) =>
        q.id === editingQuestion.id ? { ...questionData, id: editingQuestion.id } : q
      );
      const updatedQuiz = { ...selectedQuiz, questions: updatedQuestions };
      setQuizzes(quizzes.map((q) => (q.id === selectedQuiz.id ? updatedQuiz : q)));
      setSelectedQuiz(updatedQuiz);
      setEditingQuestion(null);
      toast({
        title: "Question Updated",
        description: "The question has been updated successfully.",
      });
    } else {
      // Add new question
      const updatedQuiz = {
        ...selectedQuiz,
        questions: [...selectedQuiz.questions, questionData],
      };
      setQuizzes(quizzes.map((q) => (q.id === selectedQuiz.id ? updatedQuiz : q)));
      setSelectedQuiz(updatedQuiz);
      toast({
        title: "Question Added",
        description: "New question has been added to the quiz.",
      });
    }
    questionForm.reset();
  };

  const deleteQuestion = (questionId: string) => {
    if (!selectedQuiz) return;
    const updatedQuiz = {
      ...selectedQuiz,
      questions: selectedQuiz.questions.filter((q) => q.id !== questionId),
    };
    setQuizzes(quizzes.map((q) => (q.id === selectedQuiz.id ? updatedQuiz : q)));
    setSelectedQuiz(updatedQuiz);
    toast({
      title: "Question Deleted",
      description: "The question has been removed from the quiz.",
    });
  };

  const deleteQuiz = (quizId: string) => {
    setQuizzes(quizzes.filter((q) => q.id !== quizId));
    if (selectedQuiz?.id === quizId) {
      setSelectedQuiz(null);
    }
    toast({
      title: "Quiz Deleted",
      description: "The quiz has been deleted successfully.",
    });
  };

  const editQuestion = (question: Question) => {
    setEditingQuestion(question);
    questionForm.reset(question);
  };

  const currentQuizType = quizTypes.find((qt) => qt.value === (selectedQuiz?.quizType || quizForm.watch("quizType")));

  return (
    <div className="space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Quiz List */}
        <Card className="lg:col-span-1">
          <CardHeader>
            <CardTitle>Existing Quizzes</CardTitle>
            <CardDescription>Manage your quiz collection</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {quizzes.length === 0 ? (
                <p className="text-sm text-muted-foreground text-center py-4">No quizzes created yet</p>
              ) : (
                quizzes.map((quiz) => (
                  <div
                    key={quiz.id}
                    className={`p-3 rounded-lg border cursor-pointer transition-colors ${
                      selectedQuiz?.id === quiz.id ? "bg-primary/10 border-primary" : "hover:bg-accent"
                    }`}
                    onClick={() => setSelectedQuiz(quiz)}
                  >
                    <div className="flex items-start justify-between gap-2">
                      <div className="flex-1 min-w-0">
                        <p className="font-semibold text-sm truncate">{quiz.title}</p>
                        <p className="text-xs text-muted-foreground">{quiz.quizType}</p>
                        <p className="text-xs text-muted-foreground">{quiz.questions.length} questions</p>
                      </div>
                      <div className="flex gap-1">
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7"
                          onClick={(e) => {
                            e.stopPropagation();
                            setSelectedQuiz(quiz);
                          }}
                        >
                          <Eye className="h-3 w-3" />
                        </Button>
                        <Button
                          variant="ghost"
                          size="icon"
                          className="h-7 w-7 text-destructive"
                          onClick={(e) => {
                            e.stopPropagation();
                            deleteQuiz(quiz.id);
                          }}
                        >
                          <Trash2 className="h-3 w-3" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))
              )}
            </div>
          </CardContent>
        </Card>

        {/* Main Panel */}
        <div className="lg:col-span-2 space-y-6">
          {/* Create Quiz Form */}
          <Card>
            <CardHeader>
              <CardTitle>Create New Quiz</CardTitle>
              <CardDescription>Set up a new quiz with type, title, and duration</CardDescription>
            </CardHeader>
            <CardContent>
              <Form {...quizForm}>
                <form onSubmit={quizForm.handleSubmit(onQuizSubmit)} className="space-y-4">
                  <FormField
                    control={quizForm.control}
                    name="quizType"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quiz Type</FormLabel>
                        <Select onValueChange={field.onChange} value={field.value}>
                          <FormControl>
                            <SelectTrigger>
                              <SelectValue placeholder="Select quiz type" />
                            </SelectTrigger>
                          </FormControl>
                          <SelectContent>
                            {quizTypes.map((type) => (
                              <SelectItem key={type.value} value={type.value}>
                                {type.label}
                              </SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={quizForm.control}
                    name="title"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Quiz Title</FormLabel>
                        <FormControl>
                          <Input placeholder="e.g., JEE Main 2024 Mock Test" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={quizForm.control}
                    name="description"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Description</FormLabel>
                        <FormControl>
                          <Textarea placeholder="Quiz description..." {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <FormField
                    control={quizForm.control}
                    name="duration"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel>Duration (minutes)</FormLabel>
                        <FormControl>
                          <Input type="number" placeholder="180" {...field} />
                        </FormControl>
                        <FormMessage />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="w-full">
                    <Plus className="h-4 w-4 mr-2" />
                    Create Quiz
                  </Button>
                </form>
              </Form>
            </CardContent>
          </Card>

          {/* Add/Edit Question Form */}
          {selectedQuiz && (
            <Card>
              <CardHeader>
                <CardTitle>{editingQuestion ? "Edit Question" : "Add Question"}</CardTitle>
                <CardDescription>
                  {selectedQuiz.title} - {selectedQuiz.questions.length} questions
                </CardDescription>
              </CardHeader>
              <CardContent>
                <Form {...questionForm}>
                  <form onSubmit={questionForm.handleSubmit(onQuestionSubmit)} className="space-y-4">
                    <FormField
                      control={questionForm.control}
                      name="subject"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Subject</FormLabel>
                          <Select onValueChange={field.onChange} value={field.value}>
                            <FormControl>
                              <SelectTrigger>
                                <SelectValue placeholder="Select subject" />
                              </SelectTrigger>
                            </FormControl>
                            <SelectContent>
                              {currentQuizType?.subjects.map((subject) => (
                                <SelectItem key={subject} value={subject}>
                                  {subject}
                                </SelectItem>
                              ))}
                            </SelectContent>
                          </Select>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <FormField
                      control={questionForm.control}
                      name="question"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Question</FormLabel>
                          <FormControl>
                            <Textarea placeholder="Enter the question..." {...field} />
                          </FormControl>
                          <FormMessage />
                        </FormItem>
                      )}
                    />
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <FormField
                        control={questionForm.control}
                        name="option1"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Option 1</FormLabel>
                            <FormControl>
                              <Input placeholder="Option 1" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={questionForm.control}
                        name="option2"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Option 2</FormLabel>
                            <FormControl>
                              <Input placeholder="Option 2" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={questionForm.control}
                        name="option3"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Option 3</FormLabel>
                            <FormControl>
                              <Input placeholder="Option 3" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={questionForm.control}
                        name="option4"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Option 4</FormLabel>
                            <FormControl>
                              <Input placeholder="Option 4" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <FormField
                        control={questionForm.control}
                        name="correctAnswer"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Correct Answer</FormLabel>
                            <Select onValueChange={field.onChange} value={field.value}>
                              <FormControl>
                                <SelectTrigger>
                                  <SelectValue placeholder="Select" />
                                </SelectTrigger>
                              </FormControl>
                              <SelectContent>
                                <SelectItem value="1">Option 1</SelectItem>
                                <SelectItem value="2">Option 2</SelectItem>
                                <SelectItem value="3">Option 3</SelectItem>
                                <SelectItem value="4">Option 4</SelectItem>
                              </SelectContent>
                            </Select>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={questionForm.control}
                        name="marks"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Marks</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="4" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                      <FormField
                        control={questionForm.control}
                        name="negativeMarks"
                        render={({ field }) => (
                          <FormItem>
                            <FormLabel>Negative Marks</FormLabel>
                            <FormControl>
                              <Input type="number" placeholder="1" {...field} />
                            </FormControl>
                            <FormMessage />
                          </FormItem>
                        )}
                      />
                    </div>
                    <div className="flex gap-2">
                      <Button type="submit" className="flex-1">
                        {editingQuestion ? "Update Question" : "Add Question"}
                      </Button>
                      {editingQuestion && (
                        <Button
                          type="button"
                          variant="outline"
                          onClick={() => {
                            setEditingQuestion(null);
                            questionForm.reset();
                          }}
                        >
                          Cancel
                        </Button>
                      )}
                    </div>
                  </form>
                </Form>

                {/* Questions List */}
                {selectedQuiz.questions.length > 0 && (
                  <div className="mt-6">
                    <Separator className="my-4" />
                    <h4 className="font-semibold mb-3">Questions ({selectedQuiz.questions.length})</h4>
                    <div className="space-y-3">
                      {selectedQuiz.questions.map((q, index) => (
                        <div key={q.id} className="p-3 border rounded-lg">
                          <div className="flex items-start justify-between gap-2">
                            <div className="flex-1">
                              <p className="font-semibold text-sm">
                                Q{index + 1}. {q.question}
                              </p>
                              <p className="text-xs text-muted-foreground mt-1">
                                Subject: {q.subject} | Marks: +{q.marks} / -{q.negativeMarks || 0}
                              </p>
                            </div>
                            <div className="flex gap-1">
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7"
                                onClick={() => editQuestion(q)}
                              >
                                <Edit className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="icon"
                                className="h-7 w-7 text-destructive"
                                onClick={() => deleteQuestion(q.id)}
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          )}
        </div>
      </div>
    </div>
  );
};

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Clock, Download, User, BookOpen, ChevronLeft, ChevronRight } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

interface Question {
  id: number;
  question: string;
  options: string[];
  correctAnswer: number;
  subject: string;
}

// Sample questions data - Physics, Chemistry, Mathematics (5 each)
const questionsData: Record<string, Question[]> = {
  physics: [
    {
      id: 1,
      question: "The characteristic distance at which quantum gravitational effects are significant, the Planck length, can be obtained from a suitable combination of the fundamental physical constants G, ħ and c. Which of the following correctly gives the Planck length?",
      options: ["G ħ² c³", "G² ħ c", "√(Għ/c³)", "√(ħG/c⁵)"],
      correctAnswer: 2,
      subject: "Physics"
    },
    {
      id: 2,
      question: "A particle of mass m moves in a circular path of radius r under the action of a centripetal force F = kr². What is the time period of revolution?",
      options: ["2π√(m/kr)", "2π√(r/km)", "2π√(m/k)", "2π√(km/r)"],
      correctAnswer: 0,
      subject: "Physics"
    },
    {
      id: 3,
      question: "The wavelength of light in a medium is 4000 Å. If the refractive index of the medium is 1.5, what is the wavelength in vacuum?",
      options: ["2667 Å", "4000 Å", "6000 Å", "8000 Å"],
      correctAnswer: 2,
      subject: "Physics"
    },
    {
      id: 4,
      question: "A charged particle enters a uniform magnetic field with velocity perpendicular to the field. The path of the particle is:",
      options: ["Straight line", "Circle", "Parabola", "Helix"],
      correctAnswer: 1,
      subject: "Physics"
    },
    {
      id: 5,
      question: "The ratio of kinetic energy to total energy of an electron in a Bohr orbit is:",
      options: ["1:1", "1:2", "1:-1", "2:1"],
      correctAnswer: 2,
      subject: "Physics"
    }
  ],
  chemistry: [
    {
      id: 6,
      question: "Which of the following compounds has the highest boiling point?",
      options: ["CH₃OH", "CH₃CH₂OH", "CH₃CH₂CH₂OH", "CH₃OCH₃"],
      correctAnswer: 2,
      subject: "Chemistry"
    },
    {
      id: 7,
      question: "The oxidation state of nitrogen in HNO₃ is:",
      options: ["+3", "+4", "+5", "+6"],
      correctAnswer: 2,
      subject: "Chemistry"
    },
    {
      id: 8,
      question: "Which of the following is an example of a homogeneous catalyst?",
      options: ["Iron in Haber process", "Platinum in catalytic converter", "H₂SO₄ in esterification", "Nickel in hydrogenation"],
      correctAnswer: 2,
      subject: "Chemistry"
    },
    {
      id: 9,
      question: "The hybridization of carbon in diamond is:",
      options: ["sp", "sp²", "sp³", "sp³d"],
      correctAnswer: 2,
      subject: "Chemistry"
    },
    {
      id: 10,
      question: "Which halogen has the highest electron affinity?",
      options: ["F", "Cl", "Br", "I"],
      correctAnswer: 1,
      subject: "Chemistry"
    }
  ],
  mathematics: [
    {
      id: 11,
      question: "If the roots of the equation x² - px + q = 0 differ by 1, then:",
      options: ["p² = 4q + 1", "p² = 4q - 1", "p² + 4q = 1", "p² - 4q = 1"],
      correctAnswer: 0,
      subject: "Mathematics"
    },
    {
      id: 12,
      question: "The value of lim(x→0) (sin x / x) is:",
      options: ["0", "1", "∞", "Does not exist"],
      correctAnswer: 1,
      subject: "Mathematics"
    },
    {
      id: 13,
      question: "The derivative of |x| at x = 0 is:",
      options: ["0", "1", "-1", "Does not exist"],
      correctAnswer: 3,
      subject: "Mathematics"
    },
    {
      id: 14,
      question: "If A and B are two events such that P(A) = 0.3, P(B) = 0.5, and P(A∩B) = 0.2, then P(A∪B) is:",
      options: ["0.6", "0.7", "0.8", "0.9"],
      correctAnswer: 0,
      subject: "Mathematics"
    },
    {
      id: 15,
      question: "The area enclosed by the circle x² + y² = 4 is:",
      options: ["2π", "4π", "8π", "16π"],
      correctAnswer: 1,
      subject: "Mathematics"
    }
  ]
};

type QuestionStatus = "not-visited" | "not-answered" | "answered" | "marked" | "answered-marked";

const Test = () => {
  const { subject } = useParams<{ subject: string }>();
  const navigate = useNavigate();
  const { toast } = useToast();
  
  const [questions] = useState<Question[]>(questionsData[subject || "physics"] || []);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [questionStatus, setQuestionStatus] = useState<Record<number, QuestionStatus>>(
    Object.fromEntries(questions.map(q => [q.id, "not-visited" as QuestionStatus]))
  );
  const [timeRemaining, setTimeRemaining] = useState(3600); // 60 minutes
  const [showResult, setShowResult] = useState(false);
  const [selectedLanguage, setSelectedLanguage] = useState("english");

  // Timer
  useEffect(() => {
    if (showResult) return;
    
    const timer = setInterval(() => {
      setTimeRemaining((prev) => {
        if (prev <= 1) {
          handleSubmit();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [showResult]);

  // Mark first question as visited on mount
  useEffect(() => {
    if (questions.length > 0) {
      setQuestionStatus(prev => ({
        ...prev,
        [questions[0].id]: "not-answered"
      }));
    }
  }, []);

  const formatTime = (seconds: number) => {
    const hrs = Math.floor(seconds / 3600);
    const mins = Math.floor((seconds % 3600) / 60);
    const secs = seconds % 60;
    return `${hrs.toString().padStart(2, '0')}:${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const currentQuestion = questions[currentQuestionIndex];

  const handleAnswerSelect = (optionIndex: number) => {
    setAnswers(prev => ({ ...prev, [currentQuestion.id]: optionIndex }));
    
    const currentStatus = questionStatus[currentQuestion.id];
    if (currentStatus === "marked") {
      setQuestionStatus(prev => ({ ...prev, [currentQuestion.id]: "answered-marked" }));
    } else {
      setQuestionStatus(prev => ({ ...prev, [currentQuestion.id]: "answered" }));
    }
  };

  const handleSaveAndNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      const nextQuestion = questions[currentQuestionIndex + 1];
      setCurrentQuestionIndex(currentQuestionIndex + 1);
      
      if (questionStatus[nextQuestion.id] === "not-visited") {
        setQuestionStatus(prev => ({ ...prev, [nextQuestion.id]: "not-answered" }));
      }
    }
  };

  const handleMarkForReview = () => {
    const hasAnswer = answers[currentQuestion.id] !== undefined;
    setQuestionStatus(prev => ({
      ...prev,
      [currentQuestion.id]: hasAnswer ? "answered-marked" : "marked"
    }));
    handleSaveAndNext();
  };

  const handleClearResponse = () => {
    const newAnswers = { ...answers };
    delete newAnswers[currentQuestion.id];
    setAnswers(newAnswers);
    
    setQuestionStatus(prev => ({
      ...prev,
      [currentQuestion.id]: "not-answered"
    }));
  };

  const handleBack = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleNext = () => {
    handleSaveAndNext();
  };

  const jumpToQuestion = (index: number) => {
    setCurrentQuestionIndex(index);
    const question = questions[index];
    if (questionStatus[question.id] === "not-visited") {
      setQuestionStatus(prev => ({ ...prev, [question.id]: "not-answered" }));
    }
  };

  const handleSubmit = () => {
    setShowResult(true);
  };

  const calculateScore = () => {
    let correct = 0;
    let incorrect = 0;
    let notAnswered = 0;

    questions.forEach(q => {
      if (answers[q.id] !== undefined) {
        if (answers[q.id] === q.correctAnswer) {
          correct++;
        } else {
          incorrect++;
        }
      } else {
        notAnswered++;
      }
    });

    return { correct, incorrect, notAnswered, total: questions.length };
  };

  const getStatusBadge = (status: QuestionStatus) => {
    switch (status) {
      case "not-visited":
        return <Badge variant="outline" className="bg-background">Not Visited</Badge>;
      case "not-answered":
        return <Badge variant="destructive">Not Answered</Badge>;
      case "answered":
        return <Badge className="bg-success">Answered</Badge>;
      case "marked":
        return <Badge className="bg-warning">Marked for Review</Badge>;
      case "answered-marked":
        return <Badge className="bg-purple-500">Answered & Marked for Review</Badge>;
    }
  };

  const getStatusCount = (status: QuestionStatus) => {
    return Object.values(questionStatus).filter(s => s === status).length;
  };

  if (showResult) {
    const score = calculateScore();
    const percentage = ((score.correct / score.total) * 100).toFixed(2);

    return (
      <div className="min-h-screen bg-background flex items-center justify-center p-4">
        <Card className="w-full max-w-2xl">
          <CardContent className="pt-6">
            <div className="text-center space-y-6">
              <h1 className="text-3xl font-bold">Test Completed!</h1>
              
              <div className="grid grid-cols-2 gap-4 max-w-md mx-auto">
                <div className="p-4 bg-success/10 rounded-lg">
                  <div className="text-2xl font-bold text-success">{score.correct}</div>
                  <div className="text-sm text-muted-foreground">Correct</div>
                </div>
                <div className="p-4 bg-destructive/10 rounded-lg">
                  <div className="text-2xl font-bold text-destructive">{score.incorrect}</div>
                  <div className="text-sm text-muted-foreground">Incorrect</div>
                </div>
                <div className="p-4 bg-muted rounded-lg">
                  <div className="text-2xl font-bold">{score.notAnswered}</div>
                  <div className="text-sm text-muted-foreground">Not Answered</div>
                </div>
                <div className="p-4 bg-primary/10 rounded-lg">
                  <div className="text-2xl font-bold text-primary">{percentage}%</div>
                  <div className="text-sm text-muted-foreground">Score</div>
                </div>
              </div>

              <div className="text-lg">
                Your score: <span className="font-bold">{score.correct}/{score.total}</span>
              </div>

              <div className="flex gap-3 justify-center">
                <Button onClick={() => navigate("/resources")}>Back to Resources</Button>
                <Button variant="outline" onClick={() => window.location.reload()}>Retake Test</Button>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-4">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="h-12 w-12 bg-success rounded-full flex items-center justify-center">
                <BookOpen className="h-6 w-6" />
              </div>
              <div>
                <h1 className="font-bold text-lg">NATIONAL TESTING AGENCY</h1>
                <p className="text-xs text-primary-foreground/80">Excellence in Assessment</p>
              </div>
            </div>
            
            <div className="flex items-center gap-3">
              <Button variant="secondary" size="sm" className="gap-2">
                <Download className="h-4 w-4" />
                <span className="hidden sm:inline">Download Paper</span>
              </Button>
              <Select value={selectedLanguage} onValueChange={setSelectedLanguage}>
                <SelectTrigger className="w-32 bg-primary-foreground text-primary">
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="english">English</SelectItem>
                  <SelectItem value="hindi">Hindi</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Tabs */}
      <div className="bg-accent text-accent-foreground">
        <div className="container mx-auto px-4">
          <div className="flex gap-2 overflow-x-auto scrollbar-hide">
            <Button variant={subject === "physics" ? "secondary" : "ghost"} className="rounded-none border-b-2 border-transparent data-[active=true]:border-accent-foreground" onClick={() => navigate("/test/physics")}>
              PHYSICS
            </Button>
            <Button variant={subject === "chemistry" ? "secondary" : "ghost"} className="rounded-none" onClick={() => navigate("/test/chemistry")}>
              CHEMISTRY
            </Button>
            <Button variant={subject === "mathematics" ? "secondary" : "ghost"} className="rounded-none" onClick={() => navigate("/test/mathematics")}>
              MATHEMATICS
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-4">
            {/* User Info Card */}
            <Card className="bg-muted/50">
              <CardContent className="p-4">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm">
                  <div className="flex items-center gap-2">
                    <User className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="text-muted-foreground">Candidate Name: </span>
                      <span className="font-medium text-accent">Your Name</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <BookOpen className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="text-muted-foreground">Subject Name: </span>
                      <span className="font-medium text-accent">{subject?.toUpperCase()}</span>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Clock className="h-4 w-4 text-muted-foreground" />
                    <div>
                      <span className="text-muted-foreground">Remaining Time: </span>
                      <span className="font-medium text-accent">{formatTime(timeRemaining)}</span>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Question Card */}
            <Card>
              <CardContent className="p-6 space-y-6">
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <Badge variant="outline">Question {currentQuestionIndex + 1}:</Badge>
                      {getStatusBadge(questionStatus[currentQuestion.id])}
                    </div>
                    <p className="text-lg leading-relaxed">{currentQuestion.question}</p>
                  </div>
                </div>

                <RadioGroup value={answers[currentQuestion.id]?.toString()} onValueChange={(value) => handleAnswerSelect(parseInt(value))}>
                  <div className="space-y-3">
                    {currentQuestion.options.map((option, index) => (
                      <div key={index} className="flex items-center space-x-3 p-3 rounded-lg border hover:bg-accent/5 transition-colors">
                        <RadioGroupItem value={index.toString()} id={`option-${index}`} />
                        <Label htmlFor={`option-${index}`} className="flex-1 cursor-pointer">
                          ({index + 1}) {option}
                        </Label>
                      </div>
                    ))}
                  </div>
                </RadioGroup>
              </CardContent>
            </Card>

            {/* Action Buttons */}
            <div className="flex flex-wrap gap-2">
              <Button onClick={handleSaveAndNext} className="bg-success hover:bg-success/90">
                Save & Next
              </Button>
              <Button onClick={handleMarkForReview} className="bg-warning hover:bg-warning/90">
                Mark for Review & Next
              </Button>
              <Button onClick={handleClearResponse} variant="outline">
                Clear Response
              </Button>
            </div>

            {/* Navigation */}
            <div className="flex justify-between items-center pt-4 border-t">
              <Button onClick={handleBack} variant="outline" disabled={currentQuestionIndex === 0}>
                <ChevronLeft className="h-4 w-4 mr-1" />
                Back
              </Button>
              <Button onClick={handleNext} variant="outline" disabled={currentQuestionIndex === questions.length - 1}>
                Next
                <ChevronRight className="h-4 w-4 ml-1" />
              </Button>
              <Button onClick={handleSubmit} className="bg-success hover:bg-success/90">
                Submit
              </Button>
            </div>
          </div>

          {/* Right Sidebar - Question Status */}
          <div className="lg:col-span-4">
            <Card className="sticky top-4">
              <CardContent className="p-4 space-y-4">
                <h3 className="font-semibold">Question Status</h3>
                
                <div className="space-y-2 text-sm">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded bg-background border"></div>
                      <span>Not Visited</span>
                    </div>
                    <Badge variant="outline">{getStatusCount("not-visited")}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded bg-destructive"></div>
                      <span>Not Answered</span>
                    </div>
                    <Badge variant="outline">{getStatusCount("not-answered")}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded bg-success"></div>
                      <span>Answered</span>
                    </div>
                    <Badge variant="outline">{getStatusCount("answered")}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded bg-warning"></div>
                      <span>Marked for Review</span>
                    </div>
                    <Badge variant="outline">{getStatusCount("marked")}</Badge>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="h-6 w-6 rounded bg-purple-500"></div>
                      <span>Answered & Marked</span>
                    </div>
                    <Badge variant="outline">{getStatusCount("answered-marked")}</Badge>
                  </div>
                </div>

                <div className="pt-4 border-t">
                  <h4 className="font-medium mb-3">Questions</h4>
                  <div className="grid grid-cols-8 gap-2">
                    {questions.map((q, index) => {
                      const status = questionStatus[q.id];
                      let bgClass = "bg-background border";
                      
                      if (status === "not-answered") bgClass = "bg-destructive text-destructive-foreground";
                      else if (status === "answered") bgClass = "bg-success text-success-foreground";
                      else if (status === "marked") bgClass = "bg-warning text-warning-foreground";
                      else if (status === "answered-marked") bgClass = "bg-purple-500 text-white";
                      
                      return (
                        <button
                          key={q.id}
                          onClick={() => jumpToQuestion(index)}
                          className={`h-10 w-10 rounded flex items-center justify-center text-sm font-medium transition-all hover:scale-110 ${bgClass} ${
                            currentQuestionIndex === index ? "ring-2 ring-primary ring-offset-2" : ""
                          }`}
                        >
                          {index + 1}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Test;

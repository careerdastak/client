import { QuizManagement } from "@/components/QuizManagement";

interface QuizSectionProps {
  onLogout: () => void;
}

export const QuizSection = ({ onLogout }: QuizSectionProps) => {
  return <QuizManagement />;
};
// import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { ImageIcon, FileText, Calculator, Ruler, Minimize2, Calendar, FileType, Type, LucideIcon } from "lucide-react";

// interface Tool {
//   id: string;
//   title: string;
//   description: string;
//   icon: LucideIcon;
//   color: string;
// }

// interface ToolsSidebarProps {
//   activeTool: string | null;
//   onToolClick: (toolId: string) => void;
// }

// export const tools: Tool[] = [
//   {
//     id: "photo-resizer",
//     title: "Photo Resizer",
//     description: "Resize images for documents",
//     icon: ImageIcon,
//     color: "bg-blue-500",
//   },
//   {
//     id: "signature-maker",
//     title: "Signature Maker",
//     description: "Create digital signatures",
//     icon: FileText,
//     color: "bg-green-500",
//   },
//   {
//     id: "percentage-calculator",
//     title: "Percentage Calculator",
//     description: "Calculate marks percentage",
//     icon: Calculator,
//     color: "bg-purple-500",
//   },
//   {
//     id: "dimension-checker",
//     title: "Dimension Checker",
//     description: "Check image dimensions",
//     icon: Ruler,
//     color: "bg-orange-500",
//   },
//   {
//     id: "image-compressor",
//     title: "Image Compressor",
//     description: "Reduce image file size",
//     icon: Minimize2,
//     color: "bg-red-500",
//   },
//   {
//     id: "age-calculator",
//     title: "Age Calculator",
//     description: "Calculate exact age",
//     icon: Calendar,
//     color: "bg-cyan-500",
//   },
//   {
//     id: "format-converter",
//     title: "Format Converter",
//     description: "Convert image formats",
//     icon: FileType,
//     color: "bg-pink-500",
//   },
//   {
//     id: "text-case-converter",
//     title: "Text Case Converter",
//     description: "Convert text case",
//     icon: Type,
//     color: "bg-indigo-500",
//   },
// ];

// export const ToolsSidebar = ({ activeTool, onToolClick }: ToolsSidebarProps) => {
//   return (
//     <div className="space-y-3">
//       <div className="mb-4">
//         <h2 className="text-lg font-semibold mb-1">Student Tools</h2>
//         <p className="text-sm text-muted-foreground">Select a tool to get started</p>
//       </div>
//       {tools.map((tool) => (
//         <Card
//           key={tool.id}
//           className={`shadow-sm hover:shadow-md transition-all cursor-pointer ${
//             activeTool === tool.id ? 'ring-2 ring-primary bg-accent' : ''
//           }`}
//           onClick={() => onToolClick(tool.id)}
//         >
//           <CardHeader className="p-3">
//             <div className="flex items-center gap-2">
//               <div className={`${tool.color} p-2 rounded-md`}>
//                 <tool.icon className="h-4 w-4 text-white" />
//               </div>
//               <div className="flex-1 min-w-0">
//                 <CardTitle className="text-sm leading-tight">{tool.title}</CardTitle>
//                 <CardDescription className="text-xs line-clamp-1">{tool.description}</CardDescription>
//               </div>
//             </div>
//           </CardHeader>
//         </Card>
//       ))}
//     </div>
//   );
// };


import { Card, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import {
  ImageIcon,
  FileText,
  Calculator,
  Ruler,
  Minimize2,
  Calendar,
  FileType,
  Type,
  Keyboard,
  LucideIcon,
} from "lucide-react";

interface Tool {
  id: string;
  title: string;
  description: string;
  icon: LucideIcon;
  color: string;
}

interface ToolsSidebarProps {
  activeTool: string | null;
  onToolClick: (toolId: string) => void;
}

export const tools: Tool[] = [
  {
    id: "photo-resizer",
    title: "Photo Resizer",
    description: "Resize images for documents",
    icon: ImageIcon,
    color: "bg-blue-500",
  },
  {
    id: "signature-maker",
    title: "Signature Maker",
    description: "Create digital signatures",
    icon: FileText,
    color: "bg-green-500",
  },
  {
    id: "percentage-calculator",
    title: "Percentage Calculator",
    description: "Calculate marks percentage",
    icon: Calculator,
    color: "bg-purple-500",
  },
  {
    id: "dimension-checker",
    title: "Dimension Checker",
    description: "Check image dimensions",
    icon: Ruler,
    color: "bg-orange-500",
  },
  {
    id: "image-compressor",
    title: "Image Compressor",
    description: "Reduce image file size",
    icon: Minimize2,
    color: "bg-red-500",
  },
  {
    id: "age-calculator",
    title: "Age Calculator",
    description: "Calculate exact age",
    icon: Calendar,
    color: "bg-cyan-500",
  },
  {
    id: "format-converter",
    title: "Format Converter",
    description: "Convert image formats",
    icon: FileType,
    color: "bg-pink-500",
  },
  {
    id: "text-case-converter",
    title: "Text Case Converter",
    description: "Convert text case",
    icon: Type,
    color: "bg-indigo-500",
  },
  {
    id: "typing-speed-test",
    title: "Typing Speed Test",
    description: "Test your typing speed & accuracy",
    icon: Keyboard,
    color: "bg-teal-600",
  },
];

export const ToolsSidebar = ({ activeTool, onToolClick }: ToolsSidebarProps) => {
  return (
    <div className="space-y-3">
      <div className="mb-4">
        <h2 className="text-lg font-semibold mb-1">Student Tools</h2>
        <p className="text-sm text-muted-foreground">Select a tool to get started</p>
      </div>

      {tools.map((tool) => (
        <Card
          key={tool.id}
          className={`shadow-sm hover:shadow-md transition-all cursor-pointer ${
            activeTool === tool.id ? "ring-2 ring-primary bg-accent" : ""
          }`}
          onClick={() => onToolClick(tool.id)}
        >
          <CardHeader className="p-3">
            <div className="flex items-center gap-3">
              <div className={`${tool.color} p-2 rounded-md`}>
                <tool.icon className="h-4 w-4 text-white" />
              </div>

              <div className="flex-1 min-w-0">
                <CardTitle className="text-sm leading-tight">{tool.title}</CardTitle>
                <CardDescription className="text-xs line-clamp-1">{tool.description}</CardDescription>
              </div>
            </div>
          </CardHeader>
        </Card>
      ))}
    </div>
  );
};

// import { useState, useRef, useEffect } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import { ImageIcon, FileText, Calculator, Ruler, Download, Eraser, Minimize2, Calendar, FileType, Type } from "lucide-react";
// import { toast } from "sonner";
// import { Separator } from "@/components/ui/separator";
// import { ToolsSidebar } from "@/components/ToolsSidebar";

// const Tools = () => {
//   // Active tool state
//   const [activeTool, setActiveTool] = useState<string | null>(null);

//   // Photo Resizer states
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [resizedImage, setResizedImage] = useState<string>("");
//   const [width, setWidth] = useState<number>(800);
//   const [height, setHeight] = useState<number>(600);

//   // Signature Maker states
//   const canvasRef = useRef<HTMLCanvasElement>(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [signatureDataUrl, setSignatureDataUrl] = useState<string>("");

//   // Percentage Calculator states
//   const [marksObtained, setMarksObtained] = useState<string>("");
//   const [totalMarks, setTotalMarks] = useState<string>("");
//   const [percentage, setPercentage] = useState<number | null>(null);
//   const [grade, setGrade] = useState<string>("");

//   // Image Dimension Checker states
//   const [checkImage, setCheckImage] = useState<File | null>(null);
//   const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
//   const [dimensionStatus, setDimensionStatus] = useState<string>("");

//   // Image Compressor states
//   const [compressFile, setCompressFile] = useState<File | null>(null);
//   const [compressedImage, setCompressedImage] = useState<string>("");
//   const [originalSize, setOriginalSize] = useState<number>(0);
//   const [compressedSize, setCompressedSize] = useState<number>(0);
//   const [quality, setQuality] = useState<number>(80);

//   // Age Calculator states
//   const [birthDate, setBirthDate] = useState<string>("");
//   const [referenceDate, setReferenceDate] = useState<string>(new Date().toISOString().split('T')[0]);
//   const [ageResult, setAgeResult] = useState<{ years: number; months: number; days: number } | null>(null);

//   // Format Converter states
//   const [formatFile, setFormatFile] = useState<File | null>(null);
//   const [convertedFormat, setConvertedFormat] = useState<string>("");
//   const [targetFormat, setTargetFormat] = useState<string>("jpeg");

//   // Text Case Converter states
//   const [inputText, setInputText] = useState<string>("");
//   const [convertedText, setConvertedText] = useState<string>("");

//   const handlePhotoResize = () => {
//     if (!selectedFile) {
//       toast.error("Please select an image first!");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const img = new Image();
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         canvas.width = width;
//         canvas.height = height;
//         const ctx = canvas.getContext('2d');
//         if (ctx) {
//           ctx.drawImage(img, 0, 0, width, height);
//           const resizedDataUrl = canvas.toDataURL('image/jpeg', 0.9);
//           setResizedImage(resizedDataUrl);
//           toast.success("Image resized successfully!");
//         }
//       };
//       img.src = e.target?.result as string;
//     };
//     reader.readAsDataURL(selectedFile);
//   };

//   const downloadResizedImage = () => {
//     if (!resizedImage) return;
//     const link = document.createElement('a');
//     link.href = resizedImage;
//     link.download = `resized-${width}x${height}.jpg`;
//     link.click();
//     toast.success("Download started!");
//   };

//   // Signature Maker functions
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     ctx.strokeStyle = '#000000';
//     ctx.lineWidth = 2;
//     ctx.lineCap = 'round';
//   }, []);

//   const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     setIsDrawing(true);
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const rect = canvas.getBoundingClientRect();
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     ctx.beginPath();
//     ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
//   };

//   const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!isDrawing) return;

//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const rect = canvas.getBoundingClientRect();
//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
//     ctx.stroke();
//   };

//   const stopDrawing = () => {
//     setIsDrawing(false);
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     setSignatureDataUrl(canvas.toDataURL('image/png'));
//   };

//   const clearSignature = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;

//     const ctx = canvas.getContext('2d');
//     if (!ctx) return;

//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     setSignatureDataUrl("");
//     toast.success("Signature cleared!");
//   };

//   const downloadSignature = () => {
//     if (!signatureDataUrl) {
//       toast.error("Please create a signature first!");
//       return;
//     }

//     const link = document.createElement('a');
//     link.href = signatureDataUrl;
//     link.download = 'signature.png';
//     link.click();
//     toast.success("Signature downloaded!");
//   };

//   // Percentage Calculator functions
//   const calculatePercentage = () => {
//     const obtained = parseFloat(marksObtained);
//     const total = parseFloat(totalMarks);

//     if (isNaN(obtained) || isNaN(total) || total === 0) {
//       toast.error("Please enter valid marks!");
//       return;
//     }

//     if (obtained > total) {
//       toast.error("Marks obtained cannot be greater than total marks!");
//       return;
//     }

//     const percent = (obtained / total) * 100;
//     setPercentage(percent);

//     // Calculate grade
//     let calculatedGrade = "";
//     if (percent >= 90) calculatedGrade = "A+ (Outstanding)";
//     else if (percent >= 80) calculatedGrade = "A (Excellent)";
//     else if (percent >= 70) calculatedGrade = "B+ (Very Good)";
//     else if (percent >= 60) calculatedGrade = "B (Good)";
//     else if (percent >= 50) calculatedGrade = "C (Average)";
//     else if (percent >= 40) calculatedGrade = "D (Pass)";
//     else calculatedGrade = "F (Fail)";

//     setGrade(calculatedGrade);
//     toast.success("Percentage calculated!");
//   };

//   // Image Dimension Checker functions
//   const handleImageCheck = (file: File) => {
//     setCheckImage(file);

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const img = new Image();
//       img.onload = () => {
//         const dims = { width: img.naturalWidth, height: img.naturalHeight };
//         setImageDimensions(dims);

//         // Check against common requirements
//         let status = `Image dimensions: ${dims.width} x ${dims.height} pixels\n\n`;

//         // Passport size check (200x230)
//         if (dims.width === 200 && dims.height === 230) {
//           status += "✅ Perfect for Passport Size photos\n";
//         } else {
//           status += `❌ Not passport size (required: 200 x 230)\n`;
//         }

//         // Signature check (140x60)
//         if (dims.width === 140 && dims.height === 60) {
//           status += "✅ Perfect for Signature\n";
//         } else {
//           status += `❌ Not signature size (required: 140 x 60)\n`;
//         }

//         // Post card check (1200x1800)
//         if (dims.width === 1200 && dims.height === 1800) {
//           status += "✅ Perfect for Post Card Size\n";
//         } else {
//           status += `❌ Not post card size (required: 1200 x 1800)\n`;
//         }

//         setDimensionStatus(status);
//         toast.success("Image dimensions checked!");
//       };
//       img.src = e.target?.result as string;
//     };
//     reader.readAsDataURL(file);
//   };

//   // Image Compressor function
//   const handleImageCompress = () => {
//     if (!compressFile) {
//       toast.error("Please select an image first!");
//       return;
//     }

//     setOriginalSize(compressFile.size);

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const img = new Image();
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         canvas.width = img.naturalWidth;
//         canvas.height = img.naturalHeight;
//         const ctx = canvas.getContext('2d');
//         if (ctx) {
//           ctx.drawImage(img, 0, 0);
//           const compressedDataUrl = canvas.toDataURL('image/jpeg', quality / 100);
//           setCompressedImage(compressedDataUrl);

//           // Calculate compressed size
//           const base64 = compressedDataUrl.split(',')[1];
//           const compSize = Math.round((base64.length * 3) / 4);
//           setCompressedSize(compSize);

//           toast.success("Image compressed successfully!");
//         }
//       };
//       img.src = e.target?.result as string;
//     };
//     reader.readAsDataURL(compressFile);
//   };

//   const downloadCompressedImage = () => {
//     if (!compressedImage) return;
//     const link = document.createElement('a');
//     link.href = compressedImage;
//     link.download = `compressed-${Date.now()}.jpg`;
//     link.click();
//     toast.success("Download started!");
//   };

//   // Age Calculator function
//   const calculateAge = () => {
//     if (!birthDate) {
//       toast.error("Please enter your birth date!");
//       return;
//     }

//     const birth = new Date(birthDate);
//     const reference = new Date(referenceDate);

//     if (birth > reference) {
//       toast.error("Birth date cannot be after reference date!");
//       return;
//     }

//     let years = reference.getFullYear() - birth.getFullYear();
//     let months = reference.getMonth() - birth.getMonth();
//     let days = reference.getDate() - birth.getDate();

//     if (days < 0) {
//       months--;
//       const prevMonth = new Date(reference.getFullYear(), reference.getMonth(), 0);
//       days += prevMonth.getDate();
//     }

//     if (months < 0) {
//       years--;
//       months += 12;
//     }

//     setAgeResult({ years, months, days });
//     toast.success("Age calculated successfully!");
//   };

//   // Format Converter function
//   const handleFormatConvert = () => {
//     if (!formatFile) {
//       toast.error("Please select an image first!");
//       return;
//     }

//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const img = new Image();
//       img.onload = () => {
//         const canvas = document.createElement('canvas');
//         canvas.width = img.naturalWidth;
//         canvas.height = img.naturalHeight;
//         const ctx = canvas.getContext('2d');
//         if (ctx) {
//           ctx.drawImage(img, 0, 0);
//           const mimeType = targetFormat === 'png' ? 'image/png' : 'image/jpeg';
//           const convertedDataUrl = canvas.toDataURL(mimeType, 0.95);
//           setConvertedFormat(convertedDataUrl);
//           toast.success(`Image converted to ${targetFormat.toUpperCase()}!`);
//         }
//       };
//       img.src = e.target?.result as string;
//     };
//     reader.readAsDataURL(formatFile);
//   };

//   const downloadConvertedImage = () => {
//     if (!convertedFormat) return;
//     const link = document.createElement('a');
//     link.href = convertedFormat;
//     link.download = `converted-${Date.now()}.${targetFormat}`;
//     link.click();
//     toast.success("Download started!");
//   };

//   // Text Case Converter functions
//   const convertToUpperCase = () => {
//     setConvertedText(inputText.toUpperCase());
//     toast.success("Converted to uppercase!");
//   };

//   const convertToLowerCase = () => {
//     setConvertedText(inputText.toLowerCase());
//     toast.success("Converted to lowercase!");
//   };

//   const convertToTitleCase = () => {
//     const titleCase = inputText.toLowerCase().split(' ').map(word => 
//       word.charAt(0).toUpperCase() + word.slice(1)
//     ).join(' ');
//     setConvertedText(titleCase);
//     toast.success("Converted to title case!");
//   };

//   const convertToSentenceCase = () => {
//     const sentenceCase = inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase();
//     setConvertedText(sentenceCase);
//     toast.success("Converted to sentence case!");
//   };

//   const tools = [
//     {
//       id: "photo-resizer",
//       title: "Photo Resizer",
//       description: "Resize images for passport photos, documents, or application forms",
//       icon: ImageIcon,
//       color: "bg-blue-500",
//     },
//     {
//       id: "signature-maker",
//       title: "Signature Maker",
//       description: "Create digital signatures for online applications",
//       icon: FileText,
//       color: "bg-green-500",
//     },
//     {
//       id: "percentage-calculator",
//       title: "Percentage Calculator",
//       description: "Calculate marks percentage, grade points, and cut-off marks",
//       icon: Calculator,
//       color: "bg-purple-500",
//     },
//     {
//       id: "dimension-checker",
//       title: "Image Dimension Checker",
//       description: "Check if your photo meets required dimensions for applications",
//       icon: Ruler,
//       color: "bg-orange-500",
//     },
//     {
//       id: "image-compressor",
//       title: "Image Compressor",
//       description: "Reduce image file size to meet application requirements",
//       icon: Minimize2,
//       color: "bg-red-500",
//     },
//     {
//       id: "age-calculator",
//       title: "Age Calculator",
//       description: "Calculate exact age from date of birth for form filling",
//       icon: Calendar,
//       color: "bg-cyan-500",
//     },
//     {
//       id: "format-converter",
//       title: "Image Format Converter",
//       description: "Convert images between JPG, PNG formats",
//       icon: FileType,
//       color: "bg-pink-500",
//     },
//     {
//       id: "text-case-converter",
//       title: "Text Case Converter",
//       description: "Convert text between uppercase, lowercase, and title case",
//       icon: Type,
//       color: "bg-indigo-500",
//     },
//   ];

//   const handleToolClick = (toolId: string) => {
//     setActiveTool(activeTool === toolId ? null : toolId);
//   };

//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <div className="container mx-auto px-4 py-8">
//         <div className="mb-6">
//           <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Student Tools</h1>
//           <p className="text-muted-foreground">Free tools to help you prepare for government job applications</p>
//         </div>

//         {/* Sidebar + Content Layout */}
//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Left Sidebar with Tool Cards */}
//           <div className="lg:col-span-1">
//             <ToolsSidebar activeTool={activeTool} onToolClick={handleToolClick} />
//           </div>

//           {/* Right Panel - Tool Content */}
//           <div className="lg:col-span-3">
//             {!activeTool && (
//               <Card className="shadow-card">
//                 <CardContent className="py-12 text-center">
//                   <div className="max-w-md mx-auto space-y-4">
//                     <div className="bg-primary/10 p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
//                       <ImageIcon className="h-12 w-12 text-primary" />
//                     </div>
//                     <h3 className="text-xl font-semibold">Select a Tool to Get Started</h3>
//                     <p className="text-muted-foreground">
//                       Choose a tool from the left sidebar to begin using our free student tools
//                     </p>
//                     <div className="pt-4 space-y-2 text-sm text-left bg-accent/50 rounded-lg p-4">
//                       <h4 className="font-semibold mb-2">Preview Features:</h4>
//                       <ul className="space-y-1 text-muted-foreground">
//                         <li>✓ Real-time image processing</li>
//                         <li>✓ Instant calculations and conversions</li>
//                         <li>✓ No file size limits</li>
//                         <li>✓ 100% free to use</li>
//                         <li>✓ No registration required</li>
//                       </ul>
//                     </div>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//         {/* Photo Resizer Tool */}
//         {activeTool === "photo-resizer" && (
//           <Card className="shadow-card animate-fade-in mb-8">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <ImageIcon className="h-5 w-5" />
//               Photo Resizer Tool
//             </CardTitle>
//             <CardDescription>
//               Resize your photos for passport size, documents, or any application requirements
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="space-y-4">
//               <div>
//                 <Label htmlFor="photo-upload">Select Photo</Label>
//                 <Input
//                   id="photo-upload"
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => setSelectedFile(e.target.files?.[0] || null)}
//                   className="mt-2"
//                 />
//               </div>

//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="width">Width (px)</Label>
//                   <Input
//                     id="width"
//                     type="number"
//                     value={width}
//                     onChange={(e) => setWidth(Number(e.target.value))}
//                     className="mt-2"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="height">Height (px)</Label>
//                   <Input
//                     id="height"
//                     type="number"
//                     value={height}
//                     onChange={(e) => setHeight(Number(e.target.value))}
//                     className="mt-2"
//                   />
//                 </div>
//               </div>

//               <div className="flex gap-3">
//                 <Button onClick={handlePhotoResize} className="flex-1">
//                   Resize Photo
//                 </Button>
//                 {resizedImage && (
//                   <Button onClick={downloadResizedImage} variant="outline">
//                     <Download className="h-4 w-4 mr-2" />
//                     Download
//                   </Button>
//                 )}
//               </div>
//             </div>

//             {resizedImage && (
//               <div className="space-y-2">
//                 <Label>Resized Image Preview:</Label>
//                 <div className="border rounded-lg p-4 bg-muted flex justify-center">
//                   <img src={resizedImage} alt="Resized" className="max-w-full h-auto" />
//                 </div>
//               </div>
//             )}

//             <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
//               <h3 className="font-semibold text-sm mb-2">Common Photo Sizes:</h3>
//               <ul className="text-sm space-y-1 text-muted-foreground">
//                 <li>• Passport Size: 200 x 230 pixels or 35mm x 45mm</li>
//                 <li>• Signature: 140 x 60 pixels</li>
//                 <li>• Post Card Size: 1200 x 1800 pixels</li>
//                 <li>• Thumb Impression: 240 x 240 pixels</li>
//               </ul>
//             </div>
//           </CardContent>
//         </Card>
//         )}

//         {/* Signature Maker Tool */}
//         {activeTool === "signature-maker" && (
//           <Card className="shadow-card animate-fade-in mb-8">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <FileText className="h-5 w-5" />
//               Signature Maker Tool
//             </CardTitle>
//             <CardDescription>
//               Create a digital signature for online applications
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="space-y-4">
//               <div>
//                 <Label>Draw Your Signature</Label>
//                 <div className="mt-2 border-2 border-dashed rounded-lg bg-muted/30">
//                   <canvas
//                     ref={canvasRef}
//                     width={600}
//                     height={200}
//                     className="w-full cursor-crosshair"
//                     onMouseDown={startDrawing}
//                     onMouseMove={draw}
//                     onMouseUp={stopDrawing}
//                     onMouseLeave={stopDrawing}
//                   />
//                 </div>
//               </div>

//               <div className="flex gap-3">
//                 <Button onClick={clearSignature} variant="outline" className="flex-1">
//                   <Eraser className="h-4 w-4 mr-2" />
//                   Clear
//                 </Button>
//                 <Button onClick={downloadSignature} className="flex-1">
//                   <Download className="h-4 w-4 mr-2" />
//                   Download Signature
//                 </Button>
//               </div>
//             </div>

//             <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
//               <h3 className="font-semibold text-sm mb-2">Tips:</h3>
//               <ul className="text-sm space-y-1 text-muted-foreground">
//                 <li>• Draw your signature using your mouse or touchpad</li>
//                 <li>• Keep it clear and legible</li>
//                 <li>• Standard signature size: 140 x 60 pixels</li>
//                 <li>• Downloaded as transparent PNG format</li>
//               </ul>
//             </div>
//           </CardContent>
//         </Card>
//         )}

//         {/* Percentage Calculator Tool */}
//         {activeTool === "percentage-calculator" && (
//           <Card className="shadow-card animate-fade-in mb-8">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Calculator className="h-5 w-5" />
//               Percentage Calculator
//             </CardTitle>
//             <CardDescription>
//               Calculate marks percentage and grade points
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="space-y-4">
//               <div className="grid grid-cols-2 gap-4">
//                 <div>
//                   <Label htmlFor="marks-obtained">Marks Obtained</Label>
//                   <Input
//                     id="marks-obtained"
//                     type="number"
//                     placeholder="Enter marks obtained"
//                     value={marksObtained}
//                     onChange={(e) => setMarksObtained(e.target.value)}
//                     className="mt-2"
//                   />
//                 </div>
//                 <div>
//                   <Label htmlFor="total-marks">Total Marks</Label>
//                   <Input
//                     id="total-marks"
//                     type="number"
//                     placeholder="Enter total marks"
//                     value={totalMarks}
//                     onChange={(e) => setTotalMarks(e.target.value)}
//                     className="mt-2"
//                   />
//                 </div>
//               </div>

//               <Button onClick={calculatePercentage} className="w-full">
//                 Calculate Percentage
//               </Button>

//               {percentage !== null && (
//                 <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 space-y-3">
//                   <div className="text-center">
//                     <p className="text-sm text-muted-foreground mb-1">Your Percentage</p>
//                     <p className="text-4xl font-bold text-primary">{percentage.toFixed(2)}%</p>
//                   </div>
//                   <Separator />
//                   <div className="text-center">
//                     <p className="text-sm text-muted-foreground mb-1">Grade</p>
//                     <p className="text-2xl font-semibold">{grade}</p>
//                   </div>
//                 </div>
//               )}
//             </div>

//             <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
//               <h3 className="font-semibold text-sm mb-2">Grading Scale:</h3>
//               <ul className="text-sm space-y-1 text-muted-foreground">
//                 <li>• 90% and above: A+ (Outstanding)</li>
//                 <li>• 80-89%: A (Excellent)</li>
//                 <li>• 70-79%: B+ (Very Good)</li>
//                 <li>• 60-69%: B (Good)</li>
//                 <li>• 50-59%: C (Average)</li>
//                 <li>• 40-49%: D (Pass)</li>
//                 <li>• Below 40%: F (Fail)</li>
//               </ul>
//             </div>
//           </CardContent>
//         </Card>
//         )}

//         {/* Image Dimension Checker Tool */}
//         {activeTool === "dimension-checker" && (
//           <Card className="shadow-card animate-fade-in mb-8">
//           <CardHeader>
//             <CardTitle className="flex items-center gap-2">
//               <Ruler className="h-5 w-5" />
//               Image Dimension Checker
//             </CardTitle>
//             <CardDescription>
//               Check if your photo meets required dimensions for applications
//             </CardDescription>
//           </CardHeader>
//           <CardContent className="space-y-6">
//             <div className="space-y-4">
//               <div>
//                 <Label htmlFor="dimension-check">Select Image to Check</Label>
//                 <Input
//                   id="dimension-check"
//                   type="file"
//                   accept="image/*"
//                   onChange={(e) => {
//                     const file = e.target.files?.[0];
//                     if (file) handleImageCheck(file);
//                   }}
//                   className="mt-2"
//                 />
//               </div>

//               {imageDimensions && (
//                 <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
//                   <div className="space-y-2">
//                     <div className="flex justify-between items-center">
//                       <span className="font-semibold">Width:</span>
//                       <span className="text-lg">{imageDimensions.width}px</span>
//                     </div>
//                     <div className="flex justify-between items-center">
//                       <span className="font-semibold">Height:</span>
//                       <span className="text-lg">{imageDimensions.height}px</span>
//                     </div>
//                   </div>
//                 </div>
//               )}

//               {dimensionStatus && (
//                 <div className="bg-muted rounded-lg p-4">
//                   <h3 className="font-semibold text-sm mb-2">Status Check:</h3>
//                   <pre className="text-sm whitespace-pre-wrap font-mono">{dimensionStatus}</pre>
//                 </div>
//               )}
//             </div>

//             <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
//               <h3 className="font-semibold text-sm mb-2">Common Requirements:</h3>
//               <ul className="text-sm space-y-1 text-muted-foreground">
//                 <li>• Passport Size: 200 x 230 pixels (35mm x 45mm)</li>
//                 <li>• Signature: 140 x 60 pixels</li>
//                 <li>• Post Card Size: 1200 x 1800 pixels</li>
//                 <li>• Thumb Impression: 240 x 240 pixels</li>
//                 <li>• File format: JPG, JPEG, or PNG</li>
//                 <li>• File size: Usually between 10KB - 200KB</li>
//               </ul>
//             </div>
//           </CardContent>
//         </Card>
//         )}

//         {/* Image Compressor Tool */}
//         {activeTool === "image-compressor" && (
//           <Card className="shadow-card animate-fade-in mb-8">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Minimize2 className="h-5 w-5" />
//                 Image Compressor
//               </CardTitle>
//               <CardDescription>
//                 Reduce image file size to meet application requirements
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="compress-upload">Select Image to Compress</Label>
//                   <Input
//                     id="compress-upload"
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => setCompressFile(e.target.files?.[0] || null)}
//                     className="mt-2"
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="quality">Compression Quality: {quality}%</Label>
//                   <input
//                     id="quality"
//                     type="range"
//                     min="10"
//                     max="100"
//                     value={quality}
//                     onChange={(e) => setQuality(Number(e.target.value))}
//                     className="w-full mt-2"
//                   />
//                   <p className="text-sm text-muted-foreground mt-1">
//                     Lower quality = smaller file size
//                   </p>
//                 </div>

//                 <div className="flex gap-3">
//                   <Button onClick={handleImageCompress} className="flex-1">
//                     Compress Image
//                   </Button>
//                   {compressedImage && (
//                     <Button onClick={downloadCompressedImage} variant="outline">
//                       <Download className="h-4 w-4 mr-2" />
//                       Download
//                     </Button>
//                   )}
//                 </div>
//               </div>

//               {compressedImage && (
//                 <div className="space-y-4">
//                   <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <p className="text-sm text-muted-foreground">Original Size</p>
//                         <p className="text-2xl font-bold">{(originalSize / 1024).toFixed(2)} KB</p>
//                       </div>
//                       <div>
//                         <p className="text-sm text-muted-foreground">Compressed Size</p>
//                         <p className="text-2xl font-bold text-primary">{(compressedSize / 1024).toFixed(2)} KB</p>
//                       </div>
//                     </div>
//                     <Separator className="my-3" />
//                     <div className="text-center">
//                       <p className="text-sm text-muted-foreground">Size Reduction</p>
//                       <p className="text-xl font-semibold text-green-600">
//                         {((1 - compressedSize / originalSize) * 100).toFixed(1)}%
//                       </p>
//                     </div>
//                   </div>

//                   <div className="border rounded-lg p-4 bg-muted">
//                     <Label>Compressed Image Preview:</Label>
//                     <div className="mt-2 flex justify-center">
//                       <img src={compressedImage} alt="Compressed" className="max-w-full h-auto max-h-96" />
//                     </div>
//                   </div>
//                 </div>
//               )}

//               <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
//                 <h3 className="font-semibold text-sm mb-2">Tips:</h3>
//                 <ul className="text-sm space-y-1 text-muted-foreground">
//                   <li>• Most applications require file size between 10KB - 200KB</li>
//                   <li>• Start with 80% quality and adjust if needed</li>
//                   <li>• JPEG format usually gives better compression</li>
//                   <li>• Preview the image before downloading</li>
//                 </ul>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Age Calculator Tool */}
//         {activeTool === "age-calculator" && (
//           <Card className="shadow-card animate-fade-in mb-8">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Calendar className="h-5 w-5" />
//                 Age Calculator
//               </CardTitle>
//               <CardDescription>
//                 Calculate exact age from date of birth for form filling
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-4">
//                 <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                   <div>
//                     <Label htmlFor="birth-date">Date of Birth</Label>
//                     <Input
//                       id="birth-date"
//                       type="date"
//                       value={birthDate}
//                       onChange={(e) => setBirthDate(e.target.value)}
//                       className="mt-2"
//                     />
//                   </div>
//                   <div>
//                     <Label htmlFor="reference-date">Reference Date (as on date)</Label>
//                     <Input
//                       id="reference-date"
//                       type="date"
//                       value={referenceDate}
//                       onChange={(e) => setReferenceDate(e.target.value)}
//                       className="mt-2"
//                     />
//                   </div>
//                 </div>

//                 <Button onClick={calculateAge} className="w-full">
//                   Calculate Age
//                 </Button>

//                 {ageResult && (
//                   <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
//                     <h3 className="text-center text-sm text-muted-foreground mb-4">Your Age</h3>
//                     <div className="grid grid-cols-3 gap-4">
//                       <div className="text-center">
//                         <p className="text-3xl font-bold text-primary">{ageResult.years}</p>
//                         <p className="text-sm text-muted-foreground">Years</p>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-3xl font-bold text-primary">{ageResult.months}</p>
//                         <p className="text-sm text-muted-foreground">Months</p>
//                       </div>
//                       <div className="text-center">
//                         <p className="text-3xl font-bold text-primary">{ageResult.days}</p>
//                         <p className="text-sm text-muted-foreground">Days</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>

//               <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
//                 <h3 className="font-semibold text-sm mb-2">Use Cases:</h3>
//                 <ul className="text-sm space-y-1 text-muted-foreground">
//                   <li>• Check age eligibility for government exams</li>
//                   <li>• Calculate age as on specific application date</li>
//                   <li>• Verify minimum/maximum age requirements</li>
//                   <li>• Get exact age for form fields</li>
//                 </ul>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Image Format Converter Tool */}
//         {activeTool === "format-converter" && (
//           <Card className="shadow-card animate-fade-in mb-8">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <FileType className="h-5 w-5" />
//                 Image Format Converter
//               </CardTitle>
//               <CardDescription>
//                 Convert images between different formats (JPG, PNG)
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="format-upload">Select Image to Convert</Label>
//                   <Input
//                     id="format-upload"
//                     type="file"
//                     accept="image/*"
//                     onChange={(e) => setFormatFile(e.target.files?.[0] || null)}
//                     className="mt-2"
//                   />
//                 </div>

//                 <div>
//                   <Label htmlFor="target-format">Convert To</Label>
//                   <select
//                     id="target-format"
//                     value={targetFormat}
//                     onChange={(e) => setTargetFormat(e.target.value)}
//                     className="w-full mt-2 h-10 px-3 rounded-md border border-input bg-background"
//                   >
//                     <option value="jpeg">JPEG / JPG</option>
//                     <option value="png">PNG</option>
//                   </select>
//                 </div>

//                 <div className="flex gap-3">
//                   <Button onClick={handleFormatConvert} className="flex-1">
//                     Convert Format
//                   </Button>
//                   {convertedFormat && (
//                     <Button onClick={downloadConvertedImage} variant="outline">
//                       <Download className="h-4 w-4 mr-2" />
//                       Download
//                     </Button>
//                   )}
//                 </div>
//               </div>

//               {convertedFormat && (
//                 <div className="space-y-2">
//                   <Label>Converted Image Preview:</Label>
//                   <div className="border rounded-lg p-4 bg-muted flex justify-center">
//                     <img src={convertedFormat} alt="Converted" className="max-w-full h-auto max-h-96" />
//                   </div>
//                 </div>
//               )}

//               <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
//                 <h3 className="font-semibold text-sm mb-2">Format Information:</h3>
//                 <ul className="text-sm space-y-1 text-muted-foreground">
//                   <li>• <strong>JPEG:</strong> Smaller file size, best for photos</li>
//                   <li>• <strong>PNG:</strong> Lossless quality, supports transparency</li>
//                   <li>• Most government forms accept both JPG and PNG</li>
//                   <li>• Convert to JPEG for smaller file sizes</li>
//                 </ul>
//               </div>
//             </CardContent>
//           </Card>
//         )}

//         {/* Text Case Converter Tool */}
//         {activeTool === "text-case-converter" && (
//           <Card className="shadow-card animate-fade-in mb-8">
//             <CardHeader>
//               <CardTitle className="flex items-center gap-2">
//                 <Type className="h-5 w-5" />
//                 Text Case Converter
//               </CardTitle>
//               <CardDescription>
//                 Convert text between different cases for proper form filling
//               </CardDescription>
//             </CardHeader>
//             <CardContent className="space-y-6">
//               <div className="space-y-4">
//                 <div>
//                   <Label htmlFor="input-text">Enter Text</Label>
//                   <textarea
//                     id="input-text"
//                     value={inputText}
//                     onChange={(e) => setInputText(e.target.value)}
//                     placeholder="Type or paste your text here..."
//                     className="w-full mt-2 min-h-32 px-3 py-2 rounded-md border border-input bg-background"
//                   />
//                 </div>

//                 <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                   <Button onClick={convertToUpperCase} variant="outline" size="sm">
//                     UPPERCASE
//                   </Button>
//                   <Button onClick={convertToLowerCase} variant="outline" size="sm">
//                     lowercase
//                   </Button>
//                   <Button onClick={convertToTitleCase} variant="outline" size="sm">
//                     Title Case
//                   </Button>
//                   <Button onClick={convertToSentenceCase} variant="outline" size="sm">
//                     Sentence case
//                   </Button>
//                 </div>

//                 {convertedText && (
//                   <div>
//                     <Label>Converted Text:</Label>
//                     <div className="mt-2 p-4 border rounded-lg bg-muted">
//                       <p className="whitespace-pre-wrap">{convertedText}</p>
//                     </div>
//                     <Button
//                       onClick={() => {
//                         navigator.clipboard.writeText(convertedText);
//                         toast.success("Text copied to clipboard!");
//                       }}
//                       variant="outline"
//                       size="sm"
//                       className="mt-2"
//                     >
//                       Copy to Clipboard
//                     </Button>
//                   </div>
//                 )}
//               </div>

//               <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
//                 <h3 className="font-semibold text-sm mb-2">Use Cases:</h3>
//                 <ul className="text-sm space-y-1 text-muted-foreground">
//                   <li>• <strong>UPPERCASE:</strong> For names in some application forms</li>
//                   <li>• <strong>Title Case:</strong> Proper names, addresses</li>
//                   <li>• <strong>Sentence case:</strong> For descriptions and statements</li>
//                   <li>• <strong>lowercase:</strong> For email addresses and usernames</li>
//                 </ul>
//               </div>
//             </CardContent>
//           </Card>
//         )}
//           </div>
//         </div>
//       </div>

//       <Footer />
//     </div>
//   );
// };

// export default Tools;




// import React, { useEffect, useRef, useState } from "react";
// import Header from "@/components/Header";
// import Footer from "@/components/Footer";
// import {
//   Card,
//   CardContent,
//   CardHeader,
//   CardTitle,
//   CardDescription,
// } from "@/components/ui/card";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Label } from "@/components/ui/label";
// import {
//   ImageIcon,
//   FileText,
//   Calculator,
//   Ruler,
//   Download,
//   Eraser,
//   Minimize2,
//   Calendar,
//   FileType,
//   Type,
//   Keyboard,
// } from "lucide-react";
// import { toast } from "sonner";
// import { Separator } from "@/components/ui/separator";
// import { ToolsSidebar } from "@/components/ToolsSidebar";

// // NOTE: This file keeps your original tools (photo resizer, signature maker, etc.)
// // and adds a fully-featured Typing Speed Test with a modal-history (Option C).

// type HistoryEntry = {
//   id: string;
//   date: string;
//   wpm: number;
//   accuracy: number;
//   duration: number;
//   correctChars: number;
//   incorrectChars: number;
//   keystrokes: number;
// };

// const SAMPLE_PARAGRAPHS = [
//   "The quick brown fox jumps over the lazy dog.",
//   "Typing is a vital skill. Consistent daily practice improves speed and accuracy.",
//   "Modern web apps require both accessibility and performance to delight users.",
//   "Small, focused practice sessions are better than infrequent long sessions.",
// ];

// const Tools: React.FC = () => {
//   // --- Sidebar state ---
//   const [activeTool, setActiveTool] = useState<string | null>(null);

//   // -------------------------
//   // Minimal preserved states for original tools
//   // (kept functional as in your original page)
//   // -------------------------
//   // Photo Resizer
//   const [selectedFile, setSelectedFile] = useState<File | null>(null);
//   const [resizedImage, setResizedImage] = useState<string>("");
//   const [width, setWidth] = useState<number>(800);
//   const [height, setHeight] = useState<number>(600);

//   // Signature Maker
//   const canvasRef = useRef<HTMLCanvasElement | null>(null);
//   const [isDrawing, setIsDrawing] = useState(false);
//   const [signatureDataUrl, setSignatureDataUrl] = useState<string>("");

//   // Percentage
//   const [marksObtained, setMarksObtained] = useState<string>("");
//   const [totalMarks, setTotalMarks] = useState<string>("");
//   const [percentage, setPercentage] = useState<number | null>(null);
//   const [grade, setGrade] = useState<string>("");

//   // Image Dimension Checker
//   const [checkImage, setCheckImage] = useState<File | null>(null);
//   const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
//   const [dimensionStatus, setDimensionStatus] = useState<string>("");

//   // Compressor
//   const [compressFile, setCompressFile] = useState<File | null>(null);
//   const [compressedImage, setCompressedImage] = useState<string>("");
//   const [originalSize, setOriginalSize] = useState<number>(0);
//   const [compressedSize, setCompressedSize] = useState<number>(0);
//   const [quality, setQuality] = useState<number>(80);

//   // Age calculator
//   const [birthDate, setBirthDate] = useState<string>("");
//   const [referenceDate, setReferenceDate] = useState<string>(new Date().toISOString().split("T")[0]);
//   const [ageResult, setAgeResult] = useState<{ years: number; months: number; days: number } | null>(null);

//   // Format converter
//   const [formatFile, setFormatFile] = useState<File | null>(null);
//   const [convertedFormat, setConvertedFormat] = useState<string>("");
//   const [targetFormat, setTargetFormat] = useState<string>("jpeg");

//   // Text case converter
//   const [inputText, setInputText] = useState<string>("");
//   const [convertedText, setConvertedText] = useState<string>("");

//   // -------------------------
//   // Photo Resizer functions (kept)
//   // -------------------------
//   const handlePhotoResize = () => {
//     if (!selectedFile) {
//       toast.error("Please select an image first!");
//       return;
//     }
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const img = new Image();
//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         canvas.width = width;
//         canvas.height = height;
//         const ctx = canvas.getContext("2d");
//         if (ctx) {
//           ctx.drawImage(img, 0, 0, width, height);
//           const resizedDataUrl = canvas.toDataURL("image/jpeg", 0.9);
//           setResizedImage(resizedDataUrl);
//           toast.success("Image resized successfully!");
//         }
//       };
//       img.src = e.target?.result as string;
//     };
//     reader.readAsDataURL(selectedFile);
//   };

//   const downloadResizedImage = () => {
//     if (!resizedImage) return;
//     const link = document.createElement("a");
//     link.href = resizedImage;
//     link.download = `resized-${width}x${height}.jpg`;
//     link.click();
//     toast.success("Download started!");
//   };

//   // -------------------------
//   // Signature Maker (kept)
//   // -------------------------
//   useEffect(() => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;
//     ctx.strokeStyle = "#000000";
//     ctx.lineWidth = 2;
//     ctx.lineCap = "round";
//   }, []);

//   const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     setIsDrawing(true);
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const rect = canvas.getBoundingClientRect();
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;
//     ctx.beginPath();
//     ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
//   };

//   const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
//     if (!isDrawing) return;
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const rect = canvas.getBoundingClientRect();
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;
//     ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
//     ctx.stroke();
//   };

//   const stopDrawing = () => {
//     setIsDrawing(false);
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     setSignatureDataUrl(canvas.toDataURL("image/png"));
//   };

//   const clearSignature = () => {
//     const canvas = canvasRef.current;
//     if (!canvas) return;
//     const ctx = canvas.getContext("2d");
//     if (!ctx) return;
//     ctx.clearRect(0, 0, canvas.width, canvas.height);
//     setSignatureDataUrl("");
//     toast.success("Signature cleared!");
//   };

//   const downloadSignature = () => {
//     if (!signatureDataUrl) {
//       toast.error("Please create a signature first!");
//       return;
//     }
//     const link = document.createElement("a");
//     link.href = signatureDataUrl;
//     link.download = "signature.png";
//     link.click();
//     toast.success("Signature downloaded!");
//   };

//   // -------------------------
//   // Percentage Calculator (kept)
//   // -------------------------
//   const calculatePercentage = () => {
//     const obtained = parseFloat(marksObtained);
//     const total = parseFloat(totalMarks);
//     if (isNaN(obtained) || isNaN(total) || total === 0) {
//       toast.error("Please enter valid marks!");
//       return;
//     }
//     if (obtained > total) {
//       toast.error("Marks obtained cannot be greater than total marks!");
//       return;
//     }
//     const percent = (obtained / total) * 100;
//     setPercentage(percent);
//     let calculatedGrade = "";
//     if (percent >= 90) calculatedGrade = "A+ (Outstanding)";
//     else if (percent >= 80) calculatedGrade = "A (Excellent)";
//     else if (percent >= 70) calculatedGrade = "B+ (Very Good)";
//     else if (percent >= 60) calculatedGrade = "B (Good)";
//     else if (percent >= 50) calculatedGrade = "C (Average)";
//     else if (percent >= 40) calculatedGrade = "D (Pass)";
//     else calculatedGrade = "F (Fail)";
//     setGrade(calculatedGrade);
//     toast.success("Percentage calculated!");
//   };

//   // -------------------------
//   // Image Dimension Checker (kept)
//   // -------------------------
//   const handleImageCheck = (file: File) => {
//     setCheckImage(file);
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const img = new Image();
//       img.onload = () => {
//         const dims = { width: img.naturalWidth, height: img.naturalHeight };
//         setImageDimensions(dims);
//         let status = `Image dimensions: ${dims.width} x ${dims.height} pixels\n\n`;
//         if (dims.width === 200 && dims.height === 230) {
//           status += "✅ Perfect for Passport Size photos\n";
//         } else {
//           status += "❌ Not passport size (required: 200 x 230)\n";
//         }
//         if (dims.width === 140 && dims.height === 60) {
//           status += "✅ Perfect for Signature\n";
//         } else {
//           status += "❌ Not signature size (required: 140 x 60)\n";
//         }
//         if (dims.width === 1200 && dims.height === 1800) {
//           status += "✅ Perfect for Post Card Size\n";
//         } else {
//           status += "❌ Not post card size (required: 1200 x 1800)\n";
//         }
//         setDimensionStatus(status);
//         toast.success("Image dimensions checked!");
//       };
//       img.src = e.target?.result as string;
//     };
//     reader.readAsDataURL(file);
//   };

//   // -------------------------
//   // Image Compressor (kept)
//   // -------------------------
//   const handleImageCompress = () => {
//     if (!compressFile) {
//       toast.error("Please select an image first!");
//       return;
//     }
//     setOriginalSize(compressFile.size);
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const img = new Image();
//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         canvas.width = img.naturalWidth;
//         canvas.height = img.naturalHeight;
//         const ctx = canvas.getContext("2d");
//         if (ctx) {
//           ctx.drawImage(img, 0, 0);
//           const compressedDataUrl = canvas.toDataURL("image/jpeg", quality / 100);
//           setCompressedImage(compressedDataUrl);
//           const base64 = compressedDataUrl.split(",")[1] || "";
//           const compSize = Math.round((base64.length * 3) / 4);
//           setCompressedSize(compSize);
//           toast.success("Image compressed successfully!");
//         }
//       };
//       img.src = e.target?.result as string;
//     };
//     reader.readAsDataURL(compressFile);
//   };

//   const downloadCompressedImage = () => {
//     if (!compressedImage) return;
//     const link = document.createElement("a");
//     link.href = compressedImage;
//     link.download = `compressed-${Date.now()}.jpg`;
//     link.click();
//     toast.success("Download started!");
//   };

//   // -------------------------
//   // Age Calculator (kept)
//   // -------------------------
//   const calculateAge = () => {
//     if (!birthDate) {
//       toast.error("Please enter your birth date!");
//       return;
//     }
//     const birth = new Date(birthDate);
//     const reference = new Date(referenceDate);
//     if (birth > reference) {
//       toast.error("Birth date cannot be after reference date!");
//       return;
//     }
//     let years = reference.getFullYear() - birth.getFullYear();
//     let months = reference.getMonth() - birth.getMonth();
//     let days = reference.getDate() - birth.getDate();
//     if (days < 0) {
//       months--;
//       const prevMonth = new Date(reference.getFullYear(), reference.getMonth(), 0);
//       days += prevMonth.getDate();
//     }
//     if (months < 0) {
//       years--;
//       months += 12;
//     }
//     setAgeResult({ years, months, days });
//     toast.success("Age calculated successfully!");
//   };

//   // -------------------------
//   // Format Converter (kept)
//   // -------------------------
//   const handleFormatConvert = () => {
//     if (!formatFile) {
//       toast.error("Please select an image first!");
//       return;
//     }
//     const reader = new FileReader();
//     reader.onload = (e) => {
//       const img = new Image();
//       img.onload = () => {
//         const canvas = document.createElement("canvas");
//         canvas.width = img.naturalWidth;
//         canvas.height = img.naturalHeight;
//         const ctx = canvas.getContext("2d");
//         if (ctx) {
//           ctx.drawImage(img, 0, 0);
//           const mimeType = targetFormat === "png" ? "image/png" : "image/jpeg";
//           const convertedDataUrl = canvas.toDataURL(mimeType, 0.95);
//           setConvertedFormat(convertedDataUrl);
//           toast.success(`Image converted to ${targetFormat.toUpperCase()}!`);
//         }
//       };
//       img.src = e.target?.result as string;
//     };
//     reader.readAsDataURL(formatFile);
//   };

//   const downloadConvertedImage = () => {
//     if (!convertedFormat) return;
//     const link = document.createElement("a");
//     link.href = convertedFormat;
//     link.download = `converted-${Date.now()}.${targetFormat}`;
//     link.click();
//     toast.success("Download started!");
//   };

//   // -------------------------
//   // Text Case Converter (kept)
//   // -------------------------
//   const convertToUpperCase = () => {
//     setConvertedText(inputText.toUpperCase());
//     toast.success("Converted to uppercase!");
//   };
//   const convertToLowerCase = () => {
//     setConvertedText(inputText.toLowerCase());
//     toast.success("Converted to lowercase!");
//   };
//   const convertToTitleCase = () => {
//     const titleCase = inputText
//       .toLowerCase()
//       .split(" ")
//       .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : ""))
//       .join(" ");
//     setConvertedText(titleCase);
//     toast.success("Converted to title case!");
//   };
//   const convertToSentenceCase = () => {
//     if (!inputText) return;
//     const sentenceCase = inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase();
//     setConvertedText(sentenceCase);
//     toast.success("Converted to sentence case!");
//   };

//   // -------------------------
//   // Typing Speed Test states & logic (NEW)
//   // -------------------------
//   const [testText, setTestText] = useState<string>(SAMPLE_PARAGRAPHS[0]);
//   const [customText, setCustomText] = useState<string>("");
//   const [duration, setDuration] = useState<number>(60);
//   const [timeLeft, setTimeLeft] = useState<number>(60);
//   const [running, setRunning] = useState<boolean>(false);
//   const [inputValue, setInputValue] = useState<string>("");
//   const [correctCount, setCorrectCount] = useState<number>(0);
//   const [incorrectCount, setIncorrectCount] = useState<number>(0);
//   const [keystrokes, setKeystrokes] = useState<number>(0);
//   const [startTime, setStartTime] = useState<number | null>(null);
//   const [history, setHistory] = useState<HistoryEntry[]>(() => {
//     try {
//       const raw = localStorage.getItem("typing_history_v1");
//       return raw ? JSON.parse(raw) : [];
//     } catch {
//       return [];
//     }
//   });
//   const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
//   const inputRef = useRef<HTMLInputElement | null>(null);
//   const timerRef = useRef<number | null>(null);

//   useEffect(() => {
//     setTimeLeft(duration);
//   }, [duration]);

//   useEffect(() => {
//     // persist history
//     try {
//       localStorage.setItem("typing_history_v1", JSON.stringify(history));
//     } catch {
//       // ignore
//     }
//   }, [history]);

//   useEffect(() => {
//     if (!running) return;
//     timerRef.current = window.setInterval(() => {
//       setTimeLeft((t) => {
//         if (t <= 1) {
//           if (timerRef.current) {
//             window.clearInterval(timerRef.current);
//             timerRef.current = null;
//           }
//           finishTest();
//           return 0;
//         }
//         return t - 1;
//       });
//     }, 1000);
//     return () => {
//       if (timerRef.current) window.clearInterval(timerRef.current);
//       timerRef.current = null;
//     };
//     // eslint-disable-next-line react-hooks/exhaustive-deps
//   }, [running]);

//   const randomParagraph = () => SAMPLE_PARAGRAPHS[Math.floor(Math.random() * SAMPLE_PARAGRAPHS.length)];

//   const startTest = (useCustom = false) => {
//     const textToUse = useCustom && customText.trim() ? customText.trim() : randomParagraph();
//     setTestText(textToUse);
//     setInputValue("");
//     setCorrectCount(0);
//     setIncorrectCount(0);
//     setKeystrokes(0);
//     setStartTime(Date.now());
//     setTimeLeft(duration);
//     setRunning(true);
//     setTimeout(() => inputRef.current?.focus(), 50);
//     toast.success("Typing test started — good luck!");
//   };

//   const finishTest = () => {
//     if (!running && startTime === null) return; // nothing to finish
//     setRunning(false);
//     const elapsedMs = (Date.now() - (startTime || Date.now())) || 1;
//     const minutes = Math.max(elapsedMs / 60000, 1 / 60000); // avoid 0
//     const wpm = Math.round((correctCount / 5) / minutes);
//     const totalTyped = keystrokes;
//     const accuracy = Math.round((correctCount / Math.max(totalTyped, 1)) * 100);

//     const entry: HistoryEntry = {
//       id: `${Date.now()}`,
//       date: new Date().toISOString(),
//       wpm,
//       accuracy,
//       duration,
//       correctChars: correctCount,
//       incorrectChars: incorrectCount,
//       keystrokes: totalTyped,
//     };

//     setHistory((h) => [entry, ...h].slice(0, 200));
//     toast.success(`Test finished — WPM: ${wpm}, Accuracy: ${accuracy}%`);
//   };

//   const resetTest = () => {
//     setRunning(false);
//     if (timerRef.current) {
//       window.clearInterval(timerRef.current);
//       timerRef.current = null;
//     }
//     setTimeLeft(duration);
//     setInputValue("");
//     setCorrectCount(0);
//     setIncorrectCount(0);
//     setKeystrokes(0);
//     setStartTime(null);
//   };

//   const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     if (!running) return; // ignore input when not running
//     const value = e.target.value;
//     // disallow long paste (safety)
//     if (value.length - inputValue.length > 1) {
//       return;
//     }
//     const newChar = value.charAt(value.length - 1);
//     setKeystrokes((k) => k + 1);

//     const expectedChar = testText.charAt(value.length - 1) || "";
//     if (newChar === expectedChar) setCorrectCount((c) => c + 1);
//     else setIncorrectCount((c) => c + 1);

//     setInputValue(value);

//     if (value.length >= testText.length) finishTest();
//   };

//   const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
//     if (e.key === "Backspace") {
//       setKeystrokes((k) => k + 1);
//       // adjust counts by checking last char in inputValue
//       const prev = inputValue;
//       const removedIndex = prev.length - 1;
//       const removed = prev.charAt(removedIndex) || "";
//       if (removed === testText.charAt(removedIndex)) setCorrectCount((c) => Math.max(0, c - 1));
//       else setIncorrectCount((c) => Math.max(0, c - 1));
//     }
//   };

//   const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
//     e.preventDefault();
//     toast.error("Pasting is disabled during the typing test to ensure fair results.");
//   };

//   const deleteHistory = (id?: string) => {
//     if (!id) {
//       setHistory([]);
//       toast.success("All history cleared");
//       return;
//     }
//     setHistory((h) => h.filter((x) => x.id !== id));
//     toast.success("Entry deleted");
//   };

//   const copySummary = (entry: HistoryEntry) => {
//     const text = `WPM: ${entry.wpm}, Accuracy: ${entry.accuracy}%, Duration: ${entry.duration}s — ${new Date(entry.date).toLocaleString()}`;
//     navigator.clipboard?.writeText(text);
//     toast.success("Result copied to clipboard");
//   };

//   const shareLatest = async () => {
//     if (history.length === 0) {
//       toast.error("No results to share");
//       return;
//     }
//     const latest = history[0];
//     const text = `My typing test result — WPM: ${latest.wpm}, Accuracy: ${latest.accuracy}% (${latest.duration}s)`;
//     try {
//       if ((navigator as any).share) {
//         await (navigator as any).share({ title: "Typing Result", text });
//         toast.success("Share dialog opened");
//       } else {
//         await navigator.clipboard.writeText(text);
//         toast.success("Result copied to clipboard (no native share available)");
//       }
//     } catch {
//       toast.error("Could not share result");
//     }
//   };

//   // -------------------------
//   // Render helpers
//   // -------------------------
//   const renderDefaultCard = () => (
//     <Card>
//       <CardContent className="py-12 text-center">
//         <div className="max-w-md mx-auto space-y-4">
//           <div className="bg-primary/10 p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
//             <ImageIcon className="h-12 w-12 text-primary" />
//           </div>
//           <h3 className="text-xl font-semibold">Select a Tool to Get Started</h3>
//           <p className="text-muted-foreground">
//             Choose a tool from the left sidebar to begin using our free student tools
//           </p>
//         </div>
//       </CardContent>
//     </Card>
//   );

//   // -------------------------
//   // JSX
//   // -------------------------
//   return (
//     <div className="min-h-screen bg-background">
//       <Header />

//       <div className="container mx-auto px-4 py-8">
//         <div className="mb-6">
//           <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Student Tools</h1>
//           <p className="text-muted-foreground">Free tools to help you prepare for government job applications</p>
//         </div>

//         <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
//           {/* Sidebar */}
//           <div className="lg:col-span-1">
//             <ToolsSidebar activeTool={activeTool} onToolClick={(id) => setActiveTool(id)} />
//           </div>

//           {/* Right Panel */}
//           <div className="lg:col-span-3">
//             {!activeTool && renderDefaultCard()}

//             {/* Photo Resizer */}
//             {activeTool === "photo-resizer" && (
//               <Card className="shadow-card animate-fade-in mb-8">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <ImageIcon className="h-5 w-5" />
//                     Photo Resizer Tool
//                   </CardTitle>
//                   <CardDescription>Resize your photos for passport size, documents, or any application requirements</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div>
//                     <Label htmlFor="photo-upload">Select Photo</Label>
//                     <Input id="photo-upload" type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className="mt-2" />
//                   </div>

//                   <div className="grid grid-cols-2 gap-4">
//                     <div>
//                       <Label htmlFor="width">Width (px)</Label>
//                       <Input id="width" type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="mt-2" />
//                     </div>
//                     <div>
//                       <Label htmlFor="height">Height (px)</Label>
//                       <Input id="height" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="mt-2" />
//                     </div>
//                   </div>

//                   <div className="flex gap-3">
//                     <Button onClick={handlePhotoResize} className="flex-1">Resize Photo</Button>
//                     {resizedImage && (
//                       <Button onClick={downloadResizedImage} variant="outline">
//                         <Download className="h-4 w-4 mr-2" />Download
//                       </Button>
//                     )}
//                   </div>

//                   {resizedImage && (
//                     <div className="space-y-2">
//                       <Label>Resized Image Preview:</Label>
//                       <div className="border rounded-lg p-4 bg-muted flex justify-center">
//                         <img src={resizedImage} alt="Resized" className="max-w-full h-auto" />
//                       </div>
//                     </div>
//                   )}
//                 </CardContent>
//               </Card>
//             )}

//             {/* Signature Maker */}
//             {activeTool === "signature-maker" && (
//               <Card className="shadow-card animate-fade-in mb-8">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" />Signature Maker Tool</CardTitle>
//                   <CardDescription>Create a digital signature for online applications</CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div>
//                     <Label>Draw Your Signature</Label>
//                     <div className="mt-2 border-2 border-dashed rounded-lg bg-muted/30">
//                       <canvas ref={canvasRef} width={600} height={200} className="w-full cursor-crosshair" onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} />
//                     </div>
//                   </div>

//                   <div className="flex gap-3">
//                     <Button onClick={clearSignature} variant="outline" className="flex-1">
//                       <Eraser className="h-4 w-4 mr-2" />Clear
//                     </Button>
//                     <Button onClick={downloadSignature} className="flex-1">
//                       <Download className="h-4 w-4 mr-2" />Download Signature
//                     </Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}


          

//             {/* Percentage Calculator Tool */}
//             {activeTool === "percentage-calculator" && (
//               <Card className="shadow-card animate-fade-in mb-8">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Calculator className="h-5 w-5" />
//                     Percentage Calculator
//                   </CardTitle>
//                   <CardDescription>
//                     Calculate marks percentage and grade points
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="space-y-4">
//                     <div className="grid grid-cols-2 gap-4">
//                       <div>
//                         <Label htmlFor="marks-obtained">Marks Obtained</Label>
//                         <Input
//                           id="marks-obtained"
//                           type="number"
//                           placeholder="Enter marks obtained"
//                           value={marksObtained}
//                           onChange={(e) => setMarksObtained(e.target.value)}
//                           className="mt-2"
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="total-marks">Total Marks</Label>
//                         <Input
//                           id="total-marks"
//                           type="number"
//                           placeholder="Enter total marks"
//                           value={totalMarks}
//                           onChange={(e) => setTotalMarks(e.target.value)}
//                           className="mt-2"
//                         />
//                       </div>
//                     </div>

//                     <Button onClick={calculatePercentage} className="w-full">
//                       Calculate Percentage
//                     </Button>

//                     {percentage !== null && (
//                       <div className="bg-primary/10 border border-primary/20 rounded-lg p-6 space-y-3">
//                         <div className="text-center">
//                           <p className="text-sm text-muted-foreground mb-1">Your Percentage</p>
//                           <p className="text-4xl font-bold text-primary">{percentage.toFixed(2)}%</p>
//                         </div>
//                         <Separator />
//                         <div className="text-center">
//                           <p className="text-sm text-muted-foreground mb-1">Grade</p>
//                           <p className="text-2xl font-semibold">{grade}</p>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
//                     <h3 className="font-semibold text-sm mb-2">Grading Scale:</h3>
//                     <ul className="text-sm space-y-1 text-muted-foreground">
//                       <li>• 90% and above: A+ (Outstanding)</li>
//                       <li>• 80-89%: A (Excellent)</li>
//                       <li>• 70-79%: B+ (Very Good)</li>
//                       <li>• 60-69%: B (Good)</li>
//                       <li>• 50-59%: C (Average)</li>
//                       <li>• 40-49%: D (Pass)</li>
//                       <li>• Below 40%: F (Fail)</li>
//                     </ul>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Image Dimension Checker Tool */}
//             {activeTool === "dimension-checker" && (
//               <Card className="shadow-card animate-fade-in mb-8">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Ruler className="h-5 w-5" />
//                     Image Dimension Checker
//                   </CardTitle>
//                   <CardDescription>
//                     Check if your photo meets required dimensions for applications
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="dimension-check">Select Image to Check</Label>
//                       <Input
//                         id="dimension-check"
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => {
//                           const file = e.target.files?.[0];
//                           if (file) handleImageCheck(file);
//                         }}
//                         className="mt-2"
//                       />
//                     </div>

//                     {imageDimensions && (
//                       <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
//                         <div className="space-y-2">
//                           <div className="flex justify-between items-center">
//                             <span className="font-semibold">Width:</span>
//                             <span className="text-lg">{imageDimensions.width}px</span>
//                           </div>
//                           <div className="flex justify-between items-center">
//                             <span className="font-semibold">Height:</span>
//                             <span className="text-lg">{imageDimensions.height}px</span>
//                           </div>
//                         </div>
//                       </div>
//                     )}

//                     {dimensionStatus && (
//                       <div className="bg-muted rounded-lg p-4">
//                         <h3 className="font-semibold text-sm mb-2">Status Check:</h3>
//                         <pre className="text-sm whitespace-pre-wrap font-mono">{dimensionStatus}</pre>
//                       </div>
//                     )}
//                   </div>

//                   <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
//                     <h3 className="font-semibold text-sm mb-2">Common Requirements:</h3>
//                     <ul className="text-sm space-y-1 text-muted-foreground">
//                       <li>• Passport Size: 200 x 230 pixels (35mm x 45mm)</li>
//                       <li>• Signature: 140 x 60 pixels</li>
//                       <li>• Post Card Size: 1200 x 1800 pixels</li>
//                       <li>• Thumb Impression: 240 x 240 pixels</li>
//                       <li>• File format: JPG, JPEG, or PNG</li>
//                       <li>• File size: Usually between 10KB - 200KB</li>
//                     </ul>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Image Compressor Tool */}
//             {activeTool === "image-compressor" && (
//               <Card className="shadow-card animate-fade-in mb-8">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Minimize2 className="h-5 w-5" />
//                     Image Compressor
//                   </CardTitle>
//                   <CardDescription>
//                     Reduce image file size to meet application requirements
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="compress-upload">Select Image to Compress</Label>
//                       <Input
//                         id="compress-upload"
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => setCompressFile(e.target.files?.[0] || null)}
//                         className="mt-2"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="quality">Compression Quality: {quality}%</Label>
//                       <input
//                         id="quality"
//                         type="range"
//                         min="10"
//                         max="100"
//                         value={quality}
//                         onChange={(e) => setQuality(Number(e.target.value))}
//                         className="w-full mt-2"
//                       />
//                       <p className="text-sm text-muted-foreground mt-1">
//                         Lower quality = smaller file size
//                       </p>
//                     </div>

//                     <div className="flex gap-3">
//                       <Button onClick={handleImageCompress} className="flex-1">
//                         Compress Image
//                       </Button>
//                       {compressedImage && (
//                         <Button onClick={downloadCompressedImage} variant="outline">
//                           <Download className="h-4 w-4 mr-2" />
//                           Download
//                         </Button>
//                       )}
//                     </div>
//                   </div>

//                   {compressedImage && (
//                     <div className="space-y-4">
//                       <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
//                         <div className="grid grid-cols-2 gap-4">
//                           <div>
//                             <p className="text-sm text-muted-foreground">Original Size</p>
//                             <p className="text-2xl font-bold">{(originalSize / 1024).toFixed(2)} KB</p>
//                           </div>
//                           <div>
//                             <p className="text-sm text-muted-foreground">Compressed Size</p>
//                             <p className="text-2xl font-bold text-primary">{(compressedSize / 1024).toFixed(2)} KB</p>
//                           </div>
//                         </div>
//                         <Separator className="my-3" />
//                         <div className="text-center">
//                           <p className="text-sm text-muted-foreground">Size Reduction</p>
//                           <p className="text-xl font-semibold text-green-600">
//                             {((1 - compressedSize / originalSize) * 100).toFixed(1)}%
//                           </p>
//                         </div>
//                       </div>

//                       <div className="border rounded-lg p-4 bg-muted">
//                         <Label>Compressed Image Preview:</Label>
//                         <div className="mt-2 flex justify-center">
//                           <img src={compressedImage} alt="Compressed" className="max-w-full h-auto max-h-96" />
//                         </div>
//                       </div>
//                     </div>
//                   )}

//                   <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
//                     <h3 className="font-semibold text-sm mb-2">Tips:</h3>
//                     <ul className="text-sm space-y-1 text-muted-foreground">
//                       <li>• Most applications require file size between 10KB - 200KB</li>
//                       <li>• Start with 80% quality and adjust if needed</li>
//                       <li>• JPEG format usually gives better compression</li>
//                       <li>• Preview the image before downloading</li>
//                     </ul>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Age Calculator Tool */}
//             {activeTool === "age-calculator" && (
//               <Card className="shadow-card animate-fade-in mb-8">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Calendar className="h-5 w-5" />
//                     Age Calculator
//                   </CardTitle>
//                   <CardDescription>
//                     Calculate exact age from date of birth for form filling
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="space-y-4">
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <Label htmlFor="birth-date">Date of Birth</Label>
//                         <Input
//                           id="birth-date"
//                           type="date"
//                           value={birthDate}
//                           onChange={(e) => setBirthDate(e.target.value)}
//                           className="mt-2"
//                         />
//                       </div>
//                       <div>
//                         <Label htmlFor="reference-date">Reference Date (as on date)</Label>
//                         <Input
//                           id="reference-date"
//                           type="date"
//                           value={referenceDate}
//                           onChange={(e) => setReferenceDate(e.target.value)}
//                           className="mt-2"
//                         />
//                       </div>
//                     </div>

//                     <Button onClick={calculateAge} className="w-full">
//                       Calculate Age
//                     </Button>

//                     {ageResult && (
//                       <div className="bg-primary/10 border border-primary/20 rounded-lg p-6">
//                         <h3 className="text-center text-sm text-muted-foreground mb-4">Your Age</h3>
//                         <div className="grid grid-cols-3 gap-4">
//                           <div className="text-center">
//                             <p className="text-3xl font-bold text-primary">{ageResult.years}</p>
//                             <p className="text-sm text-muted-foreground">Years</p>
//                           </div>
//                           <div className="text-center">
//                             <p className="text-3xl font-bold text-primary">{ageResult.months}</p>
//                             <p className="text-sm text-muted-foreground">Months</p>
//                           </div>
//                           <div className="text-center">
//                             <p className="text-3xl font-bold text-primary">{ageResult.days}</p>
//                             <p className="text-sm text-muted-foreground">Days</p>
//                           </div>
//                         </div>
//                       </div>
//                     )}
//                   </div>

//                   <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
//                     <h3 className="font-semibold text-sm mb-2">Use Cases:</h3>
//                     <ul className="text-sm space-y-1 text-muted-foreground">
//                       <li>• Check age eligibility for government exams</li>
//                       <li>• Calculate age as on specific application date</li>
//                       <li>• Verify minimum/maximum age requirements</li>
//                       <li>• Get exact age for form fields</li>
//                     </ul>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Image Format Converter Tool */}
//             {activeTool === "format-converter" && (
//               <Card className="shadow-card animate-fade-in mb-8">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <FileType className="h-5 w-5" />
//                     Image Format Converter
//                   </CardTitle>
//                   <CardDescription>
//                     Convert images between different formats (JPG, PNG)
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="format-upload">Select Image to Convert</Label>
//                       <Input
//                         id="format-upload"
//                         type="file"
//                         accept="image/*"
//                         onChange={(e) => setFormatFile(e.target.files?.[0] || null)}
//                         className="mt-2"
//                       />
//                     </div>

//                     <div>
//                       <Label htmlFor="target-format">Convert To</Label>
//                       <select
//                         id="target-format"
//                         value={targetFormat}
//                         onChange={(e) => setTargetFormat(e.target.value)}
//                         className="w-full mt-2 h-10 px-3 rounded-md border border-input bg-background"
//                       >
//                         <option value="jpeg">JPEG / JPG</option>
//                         <option value="png">PNG</option>
//                       </select>
//                     </div>

//                     <div className="flex gap-3">
//                       <Button onClick={handleFormatConvert} className="flex-1">
//                         Convert Format
//                       </Button>
//                       {convertedFormat && (
//                         <Button onClick={downloadConvertedImage} variant="outline">
//                           <Download className="h-4 w-4 mr-2" />
//                           Download
//                         </Button>
//                       )}
//                     </div>
//                   </div>

//                   {convertedFormat && (
//                     <div className="space-y-2">
//                       <Label>Converted Image Preview:</Label>
//                       <div className="border rounded-lg p-4 bg-muted flex justify-center">
//                         <img src={convertedFormat} alt="Converted" className="max-w-full h-auto max-h-96" />
//                       </div>
//                     </div>
//                   )}

//                   <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
//                     <h3 className="font-semibold text-sm mb-2">Format Information:</h3>
//                     <ul className="text-sm space-y-1 text-muted-foreground">
//                       <li>• <strong>JPEG:</strong> Smaller file size, best for photos</li>
//                       <li>• <strong>PNG:</strong> Lossless quality, supports transparency</li>
//                       <li>• Most government forms accept both JPG and PNG</li>
//                       <li>• Convert to JPEG for smaller file sizes</li>
//                     </ul>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}

//             {/* Text Case Converter Tool */}
//             {activeTool === "text-case-converter" && (
//               <Card className="shadow-card animate-fade-in mb-8">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Type className="h-5 w-5" />
//                     Text Case Converter
//                   </CardTitle>
//                   <CardDescription>
//                     Convert text between different cases for proper form filling
//                   </CardDescription>
//                 </CardHeader>
//                 <CardContent className="space-y-6">
//                   <div className="space-y-4">
//                     <div>
//                       <Label htmlFor="input-text">Enter Text</Label>
//                       <textarea
//                         id="input-text"
//                         value={inputText}
//                         onChange={(e) => setInputText(e.target.value)}
//                         placeholder="Type or paste your text here..."
//                         className="w-full mt-2 min-h-32 px-3 py-2 rounded-md border border-input bg-background"
//                       />
//                     </div>

//                     <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
//                       <Button onClick={convertToUpperCase} variant="outline" size="sm">
//                         UPPERCASE
//                       </Button>
//                       <Button onClick={convertToLowerCase} variant="outline" size="sm">
//                         lowercase
//                       </Button>
//                       <Button onClick={convertToTitleCase} variant="outline" size="sm">
//                         Title Case
//                       </Button>
//                       <Button onClick={convertToSentenceCase} variant="outline" size="sm">
//                         Sentence case
//                       </Button>
//                     </div>

//                     {convertedText && (
//                       <div>
//                         <Label>Converted Text:</Label>
//                         <div className="mt-2 p-4 border rounded-lg bg-muted">
//                           <p className="whitespace-pre-wrap">{convertedText}</p>
//                         </div>
//                         <Button
//                           onClick={() => {
//                             navigator.clipboard.writeText(convertedText);
//                             toast.success("Text copied to clipboard!");
//                           }}
//                           variant="outline"
//                           size="sm"
//                           className="mt-2"
//                         >
//                           Copy to Clipboard
//                         </Button>
//                       </div>
//                     )}
//                   </div>

//                   <div className="bg-accent/10 border border-accent/20 rounded-lg p-4">
//                     <h3 className="font-semibold text-sm mb-2">Use Cases:</h3>
//                     <ul className="text-sm space-y-1 text-muted-foreground">
//                       <li>• <strong>UPPERCASE:</strong> For names in some application forms</li>
//                       <li>• <strong>Title Case:</strong> Proper names, addresses</li>
//                       <li>• <strong>Sentence case:</strong> For descriptions and statements</li>
//                       <li>• <strong>lowercase:</strong> For email addresses and usernames</li>
//                     </ul>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//             {/* Typing Speed Test */}
//             {activeTool === "typing-speed-test" && (
//               <Card className="shadow-card animate-fade-in mb-8">
//                 <CardHeader>
//                   <CardTitle className="flex items-center gap-2">
//                     <Keyboard className="h-5 w-5" />Typing Speed Test
//                   </CardTitle>
//                   <CardDescription>Advanced typing test with WPM, accuracy & modal history</CardDescription>
//                 </CardHeader>

//                 <CardContent>
//                   <div className="grid grid-cols-1 md:grid-cols-3 gap-3 mb-3">
//                     <div>
//                       <Label>Duration</Label>
//                       <div className="mt-2 flex gap-2 flex-wrap">
//                         {[15, 30, 60, 120].map((d) => (
//                           <Button key={d} variant={duration === d ? "default" : "outline"} onClick={() => { setDuration(d); setTimeLeft(d); }}>
//                             {d}s
//                           </Button>
//                         ))}
//                       </div>
//                     </div>

//                     <div>
//                       <Label>Choose Text</Label>
//                       <div className="mt-2 flex gap-2 flex-wrap">
//                         <Button onClick={() => setTestText(SAMPLE_PARAGRAPHS[0])}>Short</Button>
//                         <Button onClick={() => setTestText(SAMPLE_PARAGRAPHS[1])}>Medium</Button>
//                         <Button onClick={() => setTestText(randomParagraph())}>Random</Button>
//                       </div>
//                     </div>

//                     <div>
//                       <Label>Custom Text</Label>
//                       <Input value={customText} onChange={(e) => setCustomText(e.target.value)} placeholder="Enter or paste custom paragraph" />
//                       <div className="flex gap-2 mt-2">
//                         <Button onClick={() => startTest(true)}>Start with Custom</Button>
//                         <Button variant="outline" onClick={() => { setCustomText(""); toast.success("Custom text cleared"); }}>Clear</Button>
//                       </div>
//                     </div>
//                   </div>

//                   <Separator />

//                   <div className="mt-3">
//                     <div className="text-sm text-muted-foreground mb-2">Test passage</div>
//                     <div className="prose p-3 bg-white rounded shadow-inner max-h-40 overflow-auto">{testText}</div>
//                   </div>

//                   <div className="mt-3">
//                     <Label>Type here (paste disabled)</Label>
//                     <input
//                       ref={inputRef}
//                       className="w-full p-3 border rounded mt-2"
//                       value={inputValue}
//                       onChange={handleInputChange}
//                       onKeyDown={handleKeyDown}
//                       onPaste={handlePaste}
//                       disabled={!running}
//                       placeholder={running ? "Start typing..." : "Press Start to begin the test"}
//                     />
//                   </div>

//                   <div className="mt-3 flex flex-col md:flex-row items-start md:items-center justify-between gap-3">
//                     <div className="flex gap-2 items-center">
//                       <Button onClick={() => startTest(false)}>Start</Button>
//                       <Button variant="outline" onClick={resetTest}>Reset</Button>
//                       <Button variant="ghost" onClick={() => { setTestText(randomParagraph()); toast.success("New paragraph loaded"); }}>Shuffle Text</Button>
//                       <Button variant="outline" onClick={() => setIsHistoryOpen(true)}>View History</Button>
//                     </div>

//                     <div className="text-sm text-muted-foreground">
//                       <div>Time left: <strong>{timeLeft}s</strong></div>
//                       <div>Keystrokes: <strong>{keystrokes}</strong></div>
//                     </div>
//                   </div>

//                   <div className="mt-4 grid grid-cols-1 md:grid-cols-3 gap-4">
//                     <div className="p-3 bg-white rounded shadow text-center">
//                       <div className="text-xs text-muted-foreground">WPM</div>
//                       <div className="text-2xl font-semibold">
//                         {(() => {
//                           if (!startTime) return 0;
//                           const elapsedMs = (Date.now() - (startTime || Date.now())) / 1000;
//                           const minutes = Math.max(elapsedMs / 60, 0.001);
//                           const wpm = Math.round(((correctCount) / 5) / minutes);
//                           return wpm;
//                         })()}
//                       </div>
//                     </div>

//                     <div className="p-3 bg-white rounded shadow text-center">
//                       <div className="text-xs text-muted-foreground">Accuracy</div>
//                       <div className="text-2xl font-semibold">{keystrokes === 0 ? 100 : Math.round((correctCount / Math.max(keystrokes, 1)) * 100)}%</div>
//                     </div>

//                     <div className="p-3 bg-white rounded shadow text-center">
//                       <div className="text-xs text-muted-foreground">Progress</div>
//                       <div className="text-lg font-medium">{Math.min(100, Math.round((inputValue.length / Math.max(testText.length, 1)) * 100))}%</div>
//                     </div>
//                   </div>

//                   <div className="mt-4 grid grid-cols-2 md:grid-cols-4 gap-3">
//                     <div className="p-2 bg-white rounded text-center">
//                       <div className="text-xs text-muted-foreground">Correct</div>
//                       <div className="font-semibold text-lg">{correctCount}</div>
//                     </div>
//                     <div className="p-2 bg-white rounded text-center">
//                       <div className="text-xs text-muted-foreground">Incorrect</div>
//                       <div className="font-semibold text-lg">{incorrectCount}</div>
//                     </div>
//                     <div className="p-2 bg-white rounded text-center">
//                       <div className="text-xs text-muted-foreground">Keystrokes</div>
//                       <div className="font-semibold text-lg">{keystrokes}</div>
//                     </div>
//                     <div className="p-2 bg-white rounded text-center">
//                       <div className="text-xs text-muted-foreground">Chars / Text</div>
//                       <div className="font-semibold text-lg">{inputValue.length} / {testText.length}</div>
//                     </div>
//                   </div>

//                   <div className="mt-4 flex gap-2">
//                     <Button onClick={shareLatest}>Share Latest Result</Button>
//                     <Button variant="outline" onClick={() => { navigator.clipboard?.writeText(`Currently: ${Math.round(((correctCount) / 5) / Math.max(((Date.now() - (startTime || Date.now())) / 60000), 0.001))} WPM`); toast.success("Copied quick stat"); }}>Copy Quick Stat</Button>
//                   </div>
//                 </CardContent>
//               </Card>
//             )}
//           </div>
//         </div>
//       </div>

//       <Footer />

//       {/* -------------------------
//           Modal: History (Option C)
//           ------------------------- */}
//       {isHistoryOpen && (
//         <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
//           <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl w-full max-w-2xl max-h-[80vh] overflow-auto">
//             <div className="flex items-center justify-between p-4 border-b">
//               <h3 className="text-lg font-semibold">Typing History</h3>
//               <div className="flex gap-2">
//                 <Button variant="ghost" onClick={() => { deleteHistory(); }}>Clear All</Button>
//                 <Button onClick={() => setIsHistoryOpen(false)}>Close</Button>
//               </div>
//             </div>

//             <div className="p-4 space-y-3">
//               {history.length === 0 && <div className="text-sm text-muted-foreground">No history yet — take a test to create entries.</div>}
//               {history.map((h) => (
//                 <div key={h.id} className="p-3 border rounded flex items-center justify-between">
//                   <div>
//                     <div className="text-sm font-medium">{new Date(h.date).toLocaleString()}</div>
//                     <div className="text-xs text-muted-foreground">WPM: {h.wpm} • Acc: {h.accuracy}% • {h.duration}s</div>
//                   </div>
//                   <div className="flex gap-2">
//                     <Button variant="outline" onClick={() => copySummary(h)}>Copy</Button>
//                     <Button variant="ghost" onClick={() => deleteHistory(h.id)}>Delete</Button>
//                   </div>
//                 </div>
//               ))}
//             </div>
//           </div>
//         </div>
//       )}
//     </div>
//   );
// };

// export default Tools;


import React, { useEffect, useRef, useState } from "react";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  ImageIcon,
  FileText,
  Calculator,
  Ruler,
  Download,
  Eraser,
  Minimize2,
  Calendar,
  FileType,
  Type,
  Keyboard,
  Share2,
  CloudDownload,
} from "lucide-react";
import { toast } from "sonner";
import { Separator } from "@/components/ui/separator";
import { ToolsSidebar } from "@/components/ToolsSidebar";

type HistoryEntry = {
  id: string;
  date: string;
  wpm: number;
  accuracy: number;
  duration: number;
  correctChars: number;
  incorrectChars: number;
  keystrokes: number;
  mode: string;
  difficulty: string;
};

const SAMPLE_PARAGRAPHS = {
  short: [
    "The quick brown fox jumps over the lazy dog.",
    "Practice daily to improve your typing speed.",
    "Focus and breathe — accuracy matters.",
  ],
  long: [
    "Typing is a core skill for modern digital work — regular short practice sessions yield measurable improvements. Start slow, keep your posture good, and focus on accuracy before speed.",
    "When preparing for competitive exams or lengthy form-filling, practice paragraphs similar to the target material. Read carefully and build muscle memory for common words and patterns.",
  ],
};

const WORDS = [
  "design", "react", "component", "function", "state", "hook", "variable", "array", "object", "async",
  "network", "response", "server", "client", "render", "layout", "styles", "access", "token", "auth",
];

const SYMBOLS = "!@#$%^&*()-_=+[]{};:'\",.<>/?\\|`~";

function randomInt(min: number, max: number) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

function generateRandomWords(count: number) {
  const arr = [];
  for (let i = 0; i < count; i++) {
    arr.push(WORDS[Math.floor(Math.random() * WORDS.length)]);
  }
  return arr.join(" ");
}

function generateNumbers(count: number) {
  const arr: string[] = [];
  for (let i = 0; i < count; i++) arr.push(String(randomInt(0, 999)));
  return arr.join(" ");
}

function generateSymbols(count: number) {
  let s = "";
  for (let i = 0; i < count; i++) s += SYMBOLS[Math.floor(Math.random() * SYMBOLS.length)];
  return s;
}

function mixCharacters(length: number, difficulty: "Easy" | "Medium" | "Hard") {
  const pool = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789" + SYMBOLS;
  let adjusted = pool;
  if (difficulty === "Easy") adjusted = "abcdefghijklmnopqrstuvwxyz ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  if (difficulty === "Medium") adjusted =
    "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  let out = "";
  for (let i = 0; i < length; i++) out += adjusted[Math.floor(Math.random() * adjusted.length)];
  return out;
}

const Tools: React.FC = () => {
  // Sidebar state
  const [activeTool, setActiveTool] = useState<string | null>(null);

  // preserve original tool states minimally (kept functional)
  const [selectedFile, setSelectedFile] = useState<File | null>(null);
  const [resizedImage, setResizedImage] = useState<string>("");
  const [width, setWidth] = useState<number>(800);
  const [height, setHeight] = useState<number>(600);

  // signature
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [signatureDataUrl, setSignatureDataUrl] = useState<string>("");

  // percentage
  const [marksObtained, setMarksObtained] = useState<string>("");
  const [totalMarks, setTotalMarks] = useState<string>("");
  const [percentage, setPercentage] = useState<number | null>(null);
  const [grade, setGrade] = useState<string>("");

  // image dimension
  const [checkImage, setCheckImage] = useState<File | null>(null);
  const [imageDimensions, setImageDimensions] = useState<{ width: number; height: number } | null>(null);
  const [dimensionStatus, setDimensionStatus] = useState<string>("");

  // compressor
  const [compressFile, setCompressFile] = useState<File | null>(null);
  const [compressedImage, setCompressedImage] = useState<string>("");
  const [originalSize, setOriginalSize] = useState<number>(0);
  const [compressedSize, setCompressedSize] = useState<number>(0);
  const [quality, setQuality] = useState<number>(80);

  // age
  const [birthDate, setBirthDate] = useState<string>("");
  const [referenceDate, setReferenceDate] = useState<string>(new Date().toISOString().split("T")[0]);
  const [ageResult, setAgeResult] = useState<{ years: number; months: number; days: number } | null>(null);

  // format convert
  const [formatFile, setFormatFile] = useState<File | null>(null);
  const [convertedFormat, setConvertedFormat] = useState<string>("");
  const [targetFormat, setTargetFormat] = useState<string>("jpeg");

  // text case
  const [inputText, setInputText] = useState<string>("");
  const [convertedText, setConvertedText] = useState<string>("");

  // --- Typing advanced states ---
  const [mode, setMode] = useState<
    "short" | "long" | "words" | "numbers" | "symbols" | "mixed" | "custom"
  >("short");
  const [difficulty, setDifficulty] = useState<"Easy" | "Medium" | "Hard">("Easy");
  const [uiStyle, setUiStyle] = useState<"clean" | "gaming" | "duolingo">("clean");

  const [testText, setTestText] = useState<string>(SAMPLE_PARAGRAPHS.short[0]);
  const [customText, setCustomText] = useState<string>("");
  const [duration, setDuration] = useState<number>(60);
  const [timeLeft, setTimeLeft] = useState<number>(60);
  const [running, setRunning] = useState<boolean>(false);
  const [inputValue, setInputValue] = useState<string>("");
  const [correctCount, setCorrectCount] = useState<number>(0);
  const [incorrectCount, setIncorrectCount] = useState<number>(0);
  const [keystrokes, setKeystrokes] = useState<number>(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [history, setHistory] = useState<HistoryEntry[]>(() => {
    try {
      const raw = localStorage.getItem("typing_history_v2");
      return raw ? JSON.parse(raw) : [];
    } catch {
      return [];
    }
  });
  const [isHistoryOpen, setIsHistoryOpen] = useState<boolean>(false);
  const inputRef = useRef<HTMLInputElement | null>(null);
  const timerRef = useRef<number | null>(null);

  // For gaming style: compute per-char status
  const [charStatus, setCharStatus] = useState<("correct" | "incorrect" | "neutral")[]>([]);

  useEffect(() => {
    setTimeLeft(duration);
  }, [duration]);

  useEffect(() => {
    try {
      localStorage.setItem("typing_history_v2", JSON.stringify(history));
    } catch {
      // ignore
    }
  }, [history]);

  useEffect(() => {
    if (!running) return;
    timerRef.current = window.setInterval(() => {
      setTimeLeft((t) => {
        if (t <= 1) {
          if (timerRef.current) {
            window.clearInterval(timerRef.current);
            timerRef.current = null;
          }
          finishTest();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => {
      if (timerRef.current) window.clearInterval(timerRef.current);
      timerRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [running]);

  // -------------------------
  // Original helpers (photo resize etc.) - kept mostly unchanged
  // -------------------------
  const handlePhotoResize = () => {
    if (!selectedFile) {
      toast.error("Please select an image first!");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const resizedDataUrl = canvas.toDataURL("image/jpeg", 0.9);
          setResizedImage(resizedDataUrl);
          toast.success("Image resized successfully!");
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(selectedFile);
  };

  const downloadResizedImage = () => {
    if (!resizedImage) return;
    const link = document.createElement("a");
    link.href = resizedImage;
    link.download = `resized-${width}x${height}.jpg`;
    link.click();
    toast.success("Download started!");
  };

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.strokeStyle = "#000000";
    ctx.lineWidth = 2;
    ctx.lineCap = "round";
  }, []);

  const startDrawing = (e: React.MouseEvent<HTMLCanvasElement>) => {
    setIsDrawing(true);
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.beginPath();
    ctx.moveTo(e.clientX - rect.left, e.clientY - rect.top);
  };

  const draw = (e: React.MouseEvent<HTMLCanvasElement>) => {
    if (!isDrawing) return;
    const canvas = canvasRef.current;
    if (!canvas) return;
    const rect = canvas.getBoundingClientRect();
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.lineTo(e.clientX - rect.left, e.clientY - rect.top);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
    const canvas = canvasRef.current;
    if (!canvas) return;
    setSignatureDataUrl(canvas.toDataURL("image/png"));
  };

  const clearSignature = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext("2d");
    if (!ctx) return;
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    setSignatureDataUrl("");
    toast.success("Signature cleared!");
  };

  const downloadSignature = () => {
    if (!signatureDataUrl) {
      toast.error("Please create a signature first!");
      return;
    }
    const link = document.createElement("a");
    link.href = signatureDataUrl;
    link.download = "signature.png";
    link.click();
    toast.success("Signature downloaded!");
  };

  // Remaining original functions (percentage, image check, compress, age, etc.)
  const calculatePercentage = () => {
    const obtained = parseFloat(marksObtained);
    const total = parseFloat(totalMarks);
    if (isNaN(obtained) || isNaN(total) || total === 0) {
      toast.error("Please enter valid marks!");
      return;
    }
    if (obtained > total) {
      toast.error("Marks obtained cannot be greater than total marks!");
      return;
    }
    const percent = (obtained / total) * 100;
    setPercentage(percent);
    let calculatedGrade = "";
    if (percent >= 90) calculatedGrade = "A+ (Outstanding)";
    else if (percent >= 80) calculatedGrade = "A (Excellent)";
    else if (percent >= 70) calculatedGrade = "B+ (Very Good)";
    else if (percent >= 60) calculatedGrade = "B (Good)";
    else if (percent >= 50) calculatedGrade = "C (Average)";
    else if (percent >= 40) calculatedGrade = "D (Pass)";
    else calculatedGrade = "F (Fail)";
    setGrade(calculatedGrade);
    toast.success("Percentage calculated!");
  };

  const handleImageCheck = (file: File) => {
    setCheckImage(file);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const dims = { width: img.naturalWidth, height: img.naturalHeight };
        setImageDimensions(dims);
        let status = `Image dimensions: ${dims.width} x ${dims.height} pixels\n\n`;
        if (dims.width === 200 && dims.height === 230) {
          status += "✅ Perfect for Passport Size photos\n";
        } else {
          status += "❌ Not passport size (required: 200 x 230)\n";
        }
        if (dims.width === 140 && dims.height === 60) {
          status += "✅ Perfect for Signature\n";
        } else {
          status += "❌ Not signature size (required: 140 x 60)\n";
        }
        if (dims.width === 1200 && dims.height === 1800) {
          status += "✅ Perfect for Post Card Size\n";
        } else {
          status += "❌ Not post card size (required: 1200 x 1800)\n";
        }
        setDimensionStatus(status);
        toast.success("Image dimensions checked!");
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleImageCompress = () => {
    if (!compressFile) {
      toast.error("Please select an image first!");
      return;
    }
    setOriginalSize(compressFile.size);
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const compressedDataUrl = canvas.toDataURL("image/jpeg", quality / 100);
          setCompressedImage(compressedDataUrl);
          const base64 = compressedDataUrl.split(",")[1] || "";
          const compSize = Math.round((base64.length * 3) / 4);
          setCompressedSize(compSize);
          toast.success("Image compressed successfully!");
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(compressFile);
  };

  const downloadCompressedImage = () => {
    if (!compressedImage) return;
    const link = document.createElement("a");
    link.href = compressedImage;
    link.download = `compressed-${Date.now()}.jpg`;
    link.click();
    toast.success("Download started!");
  };

  const calculateAge = () => {
    if (!birthDate) {
      toast.error("Please enter your birth date!");
      return;
    }
    const birth = new Date(birthDate);
    const reference = new Date(referenceDate);
    if (birth > reference) {
      toast.error("Birth date cannot be after reference date!");
      return;
    }
    let years = reference.getFullYear() - birth.getFullYear();
    let months = reference.getMonth() - birth.getMonth();
    let days = reference.getDate() - birth.getDate();
    if (days < 0) {
      months--;
      const prevMonth = new Date(reference.getFullYear(), reference.getMonth(), 0);
      days += prevMonth.getDate();
    }
    if (months < 0) {
      years--;
      months += 12;
    }
    setAgeResult({ years, months, days });
    toast.success("Age calculated successfully!");
  };

  const handleFormatConvert = () => {
    if (!formatFile) {
      toast.error("Please select an image first!");
      return;
    }
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        canvas.width = img.naturalWidth;
        canvas.height = img.naturalHeight;
        const ctx = canvas.getContext("2d");
        if (ctx) {
          ctx.drawImage(img, 0, 0);
          const mimeType = targetFormat === "png" ? "image/png" : "image/jpeg";
          const convertedDataUrl = canvas.toDataURL(mimeType, 0.95);
          setConvertedFormat(convertedDataUrl);
          toast.success(`Image converted to ${targetFormat.toUpperCase()}!`);
        }
      };
      img.src = e.target?.result as string;
    };
    reader.readAsDataURL(formatFile);
  };

  const downloadConvertedImage = () => {
    if (!convertedFormat) return;
    const link = document.createElement("a");
    link.href = convertedFormat;
    link.download = `converted-${Date.now()}.${targetFormat}`;
    link.click();
    toast.success("Download started!");
  };

  // text case converters
  const convertToUpperCase = () => {
    setConvertedText(inputText.toUpperCase());
    toast.success("Converted to uppercase!");
  };
  const convertToLowerCase = () => {
    setConvertedText(inputText.toLowerCase());
    toast.success("Converted to lowercase!");
  };
  const convertToTitleCase = () => {
    const titleCase = inputText
      .toLowerCase()
      .split(" ")
      .map((word) => (word ? word.charAt(0).toUpperCase() + word.slice(1) : ""))
      .join(" ");
    setConvertedText(titleCase);
    toast.success("Converted to title case!");
  };
  const convertToSentenceCase = () => {
    if (!inputText) return;
    const sentenceCase = inputText.charAt(0).toUpperCase() + inputText.slice(1).toLowerCase();
    setConvertedText(sentenceCase);
    toast.success("Converted to sentence case!");
  };

  // -------------------------
  // Typing test: generation & controls
  // -------------------------
  const generateTestText = () => {
    if (mode === "short") {
      const list = SAMPLE_PARAGRAPHS.short;
      return list[Math.floor(Math.random() * list.length)];
    }
    if (mode === "long") {
      const list = SAMPLE_PARAGRAPHS.long;
      return list[Math.floor(Math.random() * list.length)];
    }
    if (mode === "words") {
      const count = difficulty === "Easy" ? 10 : difficulty === "Medium" ? 20 : 40;
      return generateRandomWords(count);
    }
    if (mode === "numbers") {
      const count = difficulty === "Easy" ? 10 : difficulty === "Medium" ? 20 : 40;
      return generateNumbers(count);
    }
    if (mode === "symbols") {
      const count = difficulty === "Easy" ? 20 : difficulty === "Medium" ? 40 : 80;
      return generateSymbols(count);
    }
    if (mode === "mixed") {
      const length = difficulty === "Easy" ? 60 : difficulty === "Medium" ? 120 : 240;
      return mixCharacters(length, difficulty);
    }
    if (mode === "custom") {
      return customText.trim() || SAMPLE_PARAGRAPHS.short[0];
    }
    return SAMPLE_PARAGRAPHS.short[0];
  };

  const startTest = (useCustom = false) => {
    const text = generateTestText();
    setTestText(text);
    setInputValue("");
    setCorrectCount(0);
    setIncorrectCount(0);
    setKeystrokes(0);
    setStartTime(Date.now());
    setTimeLeft(duration);
    setRunning(true);
    setCharStatus(Array(text.length).fill("neutral"));
    setTimeout(() => inputRef.current?.focus(), 50);
    toast.success("Test started — good luck!");
  };

  const finishTest = () => {
    if (!startTime) {
      setRunning(false);
      setStartTime(null);
      return;
    }
    setRunning(false);
    const elapsedMs = Date.now() - startTime;
    const minutes = Math.max(elapsedMs / 60000, 1 / 60000);
    const wpm = Math.round((correctCount / 5) / minutes);
    const totalTyped = keystrokes;
    const accuracy = Math.round((correctCount / Math.max(totalTyped, 1)) * 100);

    const entry: HistoryEntry = {
      id: `${Date.now()}`,
      date: new Date().toISOString(),
      wpm,
      accuracy,
      duration,
      correctChars: correctCount,
      incorrectChars: incorrectCount,
      keystrokes: totalTyped,
      mode,
      difficulty,
    };

    setHistory((h) => [entry, ...h].slice(0, 500));
    toast.success(`Finished — WPM ${wpm}, Acc ${accuracy}%`);
  };

  const resetTest = () => {
    setRunning(false);
    if (timerRef.current) {
      window.clearInterval(timerRef.current);
      timerRef.current = null;
    }
    setTimeLeft(duration);
    setInputValue("");
    setCorrectCount(0);
    setIncorrectCount(0);
    setKeystrokes(0);
    setStartTime(null);
    setCharStatus([]);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!running) return;
    const value = e.target.value;
    // block paste or long insertion
    if (value.length - inputValue.length > 1) return;
    const newChar = value.charAt(value.length - 1);
    setKeystrokes((k) => k + 1);

    const expected = testText.charAt(value.length - 1) || "";
    if (newChar === expected) {
      setCorrectCount((c) => c + 1);
      setCharStatus((st) => {
        const copy = st.slice();
        copy[value.length - 1] = "correct";
        return copy;
      });
    } else {
      setIncorrectCount((c) => c + 1);
      setCharStatus((st) => {
        const copy = st.slice();
        copy[value.length - 1] = "incorrect";
        return copy;
      });
    }

    setInputValue(value);

    // finish early if full
    if (value.length >= testText.length) finishTest();
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace") {
      setKeystrokes((k) => k + 1);
      // adjust counts using last char
      const prev = inputValue;
      const removedIndex = prev.length - 1;
      const removed = prev.charAt(removedIndex) || "";
      if (removed === testText.charAt(removedIndex)) setCorrectCount((c) => Math.max(0, c - 1));
      else setIncorrectCount((c) => Math.max(0, c - 1));
      setCharStatus((st) => {
        const copy = st.slice();
        if (removedIndex >= 0) copy[removedIndex] = "neutral";
        return copy;
      });
    }
  };

  const handlePaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    toast.error("Pasting disabled during test.");
  };

  const deleteHistory = (id?: string) => {
    if (!id) {
      setHistory([]);
      toast.success("History cleared");
      return;
    }
    setHistory((h) => h.filter((x) => x.id !== id));
    toast.success("Entry removed");
  };

  const copySummary = (entry: HistoryEntry) => {
    const text = `WPM: ${entry.wpm}, Accuracy: ${entry.accuracy}%, Duration: ${entry.duration}s, Mode: ${entry.mode}, Difficulty: ${entry.difficulty}`;
    navigator.clipboard?.writeText(text);
    toast.success("Copied");
  };

  const shareLatest = async () => {
    if (history.length === 0) {
      toast.error("No result to share");
      return;
    }
    const latest = history[0];
    const text = `My typing result - WPM: ${latest.wpm}, Accuracy: ${latest.accuracy}%, Mode: ${latest.mode}`;
    try {
      if ((navigator as any).share) {
        await (navigator as any).share({ title: "Typing Result", text });
        toast.success("Share opened");
      } else {
        await navigator.clipboard.writeText(text);
        toast.success("Copied to clipboard");
      }
    } catch {
      toast.error("Share failed");
    }
  };

  // Export history to CSV
  const exportHistoryCSV = () => {
    if (history.length === 0) {
      toast.error("No history to export");
      return;
    }
    const headers = ["date", "wpm", "accuracy", "duration", "correctChars", "incorrectChars", "keystrokes", "mode", "difficulty"];
    const rows = history.map(h => headers.map(hd => (h as any)[hd]));
    const csv = [headers, ...rows].map(r => r.map(c => `"${String(c).replace(/"/g, '""')}"`).join(",")).join("\n");
    const blob = new Blob([csv], { type: "text/csv" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `typing_history_${Date.now()}.csv`;
    a.click();
    URL.revokeObjectURL(url);
    toast.success("CSV exported");
  };

  // small sparkline generator for history WPM
  const renderSparkline = (data: number[]) => {
    if (data.length === 0) return null;
    const w = 120, h = 28;
    const max = Math.max(...data), min = Math.min(...data);
    const points = data.map((v, i) => {
      const x = (i / (data.length - 1 || 1)) * w;
      const y = h - ((v - min) / (Math.max(1, max - min))) * h;
      return `${x.toFixed(1)},${y.toFixed(1)}`;
    }).join(" ");
    return (
      <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} className="inline-block align-middle">
        <polyline points={points} fill="none" stroke="#0ea5e9" strokeWidth={1.5} strokeLinecap="round" strokeLinejoin="round" />
      </svg>
    );
  };

  // Helper: get WPM array for sparkline
  const historyWPM = history.slice(0, 12).map(h => h.wpm).reverse();

  // -------------------------
  // Render UI
  // -------------------------
  return (
    <div className="min-h-screen bg-background">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="mb-6">
          <h1 className="text-3xl md:text-4xl font-bold text-foreground mb-2">Student Tools</h1>
          <p className="text-muted-foreground">Free tools to help you prepare for government job applications</p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6">
          <div className="lg:col-span-1">
            <ToolsSidebar activeTool={activeTool} onToolClick={setActiveTool} />
            
          </div>

          <div className="lg:col-span-3">
            {!activeTool && (
              <Card>
                <CardContent className="py-12 text-center">
                  <div className="max-w-md mx-auto space-y-4">
                    <div className="bg-primary/10 p-6 rounded-full w-24 h-24 mx-auto flex items-center justify-center">
                      <ImageIcon className="h-12 w-12 text-primary" />
                    </div>
                    <h3 className="text-xl font-semibold">Select a Tool to Get Started</h3>
                    <p className="text-muted-foreground">Choose a tool from the left sidebar to begin using our free student tools</p>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Photo Resizer */}
            {activeTool === "photo-resizer" && (
              <Card className="shadow-card mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><ImageIcon className="h-5 w-5" /> Photo Resizer Tool</CardTitle>
                  <CardDescription>Resize your photos for passport size, documents, or application requirements</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div>
                    <Label htmlFor="photo-upload">Select Photo</Label>
                    <Input id="photo-upload" type="file" accept="image/*" onChange={(e) => setSelectedFile(e.target.files?.[0] || null)} className="mt-2" />
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="width">Width (px)</Label>
                      <Input id="width" type="number" value={width} onChange={(e) => setWidth(Number(e.target.value))} className="mt-2" />
                    </div>
                    <div>
                      <Label htmlFor="height">Height (px)</Label>
                      <Input id="height" type="number" value={height} onChange={(e) => setHeight(Number(e.target.value))} className="mt-2" />
                    </div>
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={handlePhotoResize} className="flex-1">Resize Photo</Button>
                    {resizedImage && (
                      <Button onClick={downloadResizedImage} variant="outline">
                        <Download className="h-4 w-4 mr-2" />Download
                      </Button>
                    )}
                  </div>

                  {resizedImage && (
                    <div className="space-y-2">
                      <Label>Resized Image Preview:</Label>
                      <div className="border rounded-lg p-4 bg-muted flex justify-center">
                        <img src={resizedImage} alt="Resized" className="max-w-full h-auto" />
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Signature Maker */}
            {activeTool === "signature-maker" && (
              <Card className="shadow-card mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><FileText className="h-5 w-5" /> Signature Maker Tool</CardTitle>
                  <CardDescription>Create a digital signature for online applications</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  <Label>Draw Your Signature</Label>
                  <div className="mt-2 border-2 border-dashed rounded-lg bg-muted/30">
                    <canvas ref={canvasRef} width={600} height={200} className="w-full cursor-crosshair" onMouseDown={startDrawing} onMouseMove={draw} onMouseUp={stopDrawing} onMouseLeave={stopDrawing} />
                  </div>

                  <div className="flex gap-3">
                    <Button onClick={clearSignature} variant="outline" className="flex-1"><Eraser className="h-4 w-4 mr-2" /> Clear</Button>
                    <Button onClick={downloadSignature} className="flex-1"><Download className="h-4 w-4 mr-2" /> Download Signature</Button>
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Percentage Calculator */}
            {activeTool === "percentage-calculator" && (
              <Card className="shadow-card mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Calculator className="h-5 w-5" /> Percentage Calculator</CardTitle>
                  <CardDescription>Calculate marks percentage and grade points</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-2 gap-4 mb-4">
                    <div>
                      <Label>Marks Obtained</Label>
                      <Input value={marksObtained} onChange={(e) => setMarksObtained(e.target.value)} placeholder="Marks obtained" />
                    </div>
                    <div>
                      <Label>Total Marks</Label>
                      <Input value={totalMarks} onChange={(e) => setTotalMarks(e.target.value)} placeholder="Total marks" />
                    </div>
                  </div>
                  <Button onClick={calculatePercentage}>Calculate Percentage</Button>

                  {percentage !== null && (
                    <div className="mt-4 bg-primary/10 border border-primary/20 rounded-lg p-4">
                      <div className="text-center">
                        <p className="text-sm text-muted-foreground">Your Percentage</p>
                        <p className="text-3xl font-bold text-primary">{percentage.toFixed(2)}%</p>
                        <p className="text-xl mt-2">{grade}</p>
                      </div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Dimension checker */}
            {activeTool === "dimension-checker" && (
              <Card className="shadow-card mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Ruler className="h-5 w-5" /> Image Dimension Checker</CardTitle>
                  <CardDescription>Check if your photo meets required dimensions for applications</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label>Select Image</Label>
                    <Input type="file" accept="image/*" onChange={(e) => { const f = e.target.files?.[0]; if (f) handleImageCheck(f); }} />
                  </div>

                  {imageDimensions && (
                    <div className="mt-4 bg-primary/10 border border-primary/20 rounded p-4">
                      <div className="flex justify-between"><span>Width</span><span>{imageDimensions.width}px</span></div>
                      <div className="flex justify-between"><span>Height</span><span>{imageDimensions.height}px</span></div>
                    </div>
                  )}

                  {dimensionStatus && <pre className="mt-3 bg-muted p-3 rounded font-mono whitespace-pre-wrap">{dimensionStatus}</pre>}
                </CardContent>
              </Card>
            )}

            {/* Image Compressor */}
            {activeTool === "image-compressor" && (
              <Card className="shadow-card mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Minimize2 className="h-5 w-5" /> Image Compressor</CardTitle>
                  <CardDescription>Reduce image file size</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label>Select Image</Label>
                    <Input type="file" accept="image/*" onChange={(e) => setCompressFile(e.target.files?.[0] || null)} />
                  </div>

                  <div className="mt-3">
                    <Label>Quality: {quality}%</Label>
                    <input type="range" min={10} max={100} value={quality} onChange={(e) => setQuality(Number(e.target.value))} className="w-full" />
                    <div className="mt-2 flex gap-2">
                      <Button onClick={handleImageCompress}>Compress</Button>
                      {compressedImage && <Button onClick={downloadCompressedImage} variant="outline"><Download className="h-4 w-4 mr-2" />Download</Button>}
                    </div>
                  </div>

                  {compressedImage && (
                    <div className="mt-3">
                      <div className="bg-primary/10 border rounded p-3">
                        <div className="grid grid-cols-2 gap-4">
                          <div><div className="text-sm text-muted-foreground">Original</div><div className="text-lg font-semibold">{(originalSize/1024).toFixed(2)} KB</div></div>
                          <div><div className="text-sm text-muted-foreground">Compressed</div><div className="text-lg font-semibold">{(compressedSize/1024).toFixed(2)} KB</div></div>
                        </div>
                      </div>
                      <div className="mt-2 border rounded p-3"><img src={compressedImage} alt="compressed preview" className="max-w-full h-auto" /></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Age Calculator */}
            {activeTool === "age-calculator" && (
              <Card className="shadow-card mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Calendar className="h-5 w-5" /> Age Calculator</CardTitle>
                  <CardDescription>Calculate exact age from DOB</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div><Label>Date of Birth</Label><Input type="date" value={birthDate} onChange={(e) => setBirthDate(e.target.value)} /></div>
                    <div><Label>Reference Date</Label><Input type="date" value={referenceDate} onChange={(e) => setReferenceDate(e.target.value)} /></div>
                  </div>
                  <div className="mt-3"><Button onClick={calculateAge}>Calculate Age</Button></div>
                  {ageResult && (
                    <div className="mt-3 grid grid-cols-3 gap-3 text-center bg-primary/10 border rounded p-3">
                      <div><div className="text-2xl font-bold text-primary">{ageResult.years}</div><div className="text-sm text-muted-foreground">Years</div></div>
                      <div><div className="text-2xl font-bold text-primary">{ageResult.months}</div><div className="text-sm text-muted-foreground">Months</div></div>
                      <div><div className="text-2xl font-bold text-primary">{ageResult.days}</div><div className="text-sm text-muted-foreground">Days</div></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* Format Converter */}
            {activeTool === "format-converter" && (
              <Card className="shadow-card mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><FileType className="h-5 w-5" /> Image Format Converter</CardTitle>
                  <CardDescription>Convert between JPG/PNG</CardDescription>
                </CardHeader>
                <CardContent>
                  <div><Label>Select Image</Label><Input type="file" accept="image/*" onChange={(e) => setFormatFile(e.target.files?.[0] || null)} /></div>
                  <div className="mt-3"><Label>Target Format</Label>
                    <select value={targetFormat} onChange={(e) => setTargetFormat(e.target.value)} className="w-full mt-2 p-2 border rounded">
                      <option value="jpeg">JPEG</option>
                      <option value="png">PNG</option>
                    </select>
                  </div>
                  <div className="mt-3">
                    <Button onClick={handleFormatConvert}>Convert</Button>
                    {convertedFormat && <Button onClick={downloadConvertedImage} variant="outline" className="ml-2"><Download className="h-4 w-4 mr-2" />Download</Button>}
                  </div>
                  {convertedFormat && <div className="mt-3 border rounded p-3"><img src={convertedFormat} alt="converted preview" className="max-w-full h-auto" /></div>}
                </CardContent>
              </Card>
            )}

            {/* Text Case Converter */}
            {activeTool === "text-case-converter" && (
              <Card className="shadow-card mb-8">
                <CardHeader>
                  <CardTitle className="flex items-center gap-2"><Type className="h-5 w-5" /> Text Case Converter</CardTitle>
                  <CardDescription>Convert between cases</CardDescription>
                </CardHeader>
                <CardContent>
                  <div>
                    <Label>Enter Text</Label>
                    <textarea value={inputText} onChange={(e) => setInputText(e.target.value)} className="w-full p-2 border rounded min-h-[120px]" placeholder="Type or paste..." />
                  </div>

                  <div className="mt-2 grid grid-cols-2 md:grid-cols-4 gap-2">
                    <Button onClick={convertToUpperCase} variant="outline">UPPERCASE</Button>
                    <Button onClick={convertToLowerCase} variant="outline">lowercase</Button>
                    <Button onClick={convertToTitleCase} variant="outline">Title Case</Button>
                    <Button onClick={convertToSentenceCase} variant="outline">Sentence case</Button>
                  </div>

                  {convertedText && (
                    <div className="mt-3">
                      <Label>Converted</Label>
                      <div className="mt-2 p-3 border rounded bg-muted whitespace-pre-wrap">{convertedText}</div>
                      <div className="mt-2"><Button variant="outline" onClick={() => { navigator.clipboard.writeText(convertedText); toast.success("Copied"); }}>Copy</Button></div>
                    </div>
                  )}
                </CardContent>
              </Card>
            )}

            {/* ----------------- Typing Speed Test (Advanced) ----------------- */}
{activeTool === "typing-speed-test" && (
  <Card className="shadow-card mb-8">
    <CardHeader>
      <CardTitle className="flex items-center gap-2 text-lg md:text-xl">
        <Keyboard className="h-5 w-5" />
        Typing Speed Test (Advanced)
      </CardTitle>
      <CardDescription>Multiple modes, difficulties, styles & history</CardDescription>
    </CardHeader>

    <CardContent>
      {/* Controls responsive grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Mode */}
        <div>
          <Label>Mode</Label>
          <select
            value={mode}
            onChange={(e) => setMode(e.target.value)}
            className="w-full mt-2 p-2 border rounded"
          >
            <option value="short">Short Para</option>
            <option value="long">Long Para</option>
            <option value="words">Random Words</option>
            <option value="numbers">Numbers</option>
            <option value="symbols">Symbols</option>
            <option value="mixed">Mixed</option>
            <option value="custom">Custom</option>
          </select>
        </div>

        {/* Difficulty */}
        <div>
          <Label>Difficulty</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {["Easy", "Medium", "Hard"].map((d) => (
              <Button key={d} variant={difficulty === d ? "default" : "outline"} onClick={() => setDifficulty(d)}>
                {d}
              </Button>
            ))}
          </div>
        </div>

        {/* Duration */}
        <div>
          <Label>Duration</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            {[15, 30, 60, 120].map((s) => (
              <Button key={s} variant={duration === s ? "default" : "outline"} onClick={() => { setDuration(s); setTimeLeft(s); }}>
                {s}s
              </Button>
            ))}
          </div>
        </div>

        {/* UI Style */}
        <div>
          <Label>UI Style</Label>
          <div className="mt-2 flex flex-wrap gap-2">
            <Button variant={uiStyle === "clean" ? "default" : "outline"} onClick={() => setUiStyle("clean")}>Clean</Button>
            <Button variant={uiStyle === "gaming" ? "default" : "outline"} onClick={() => setUiStyle("gaming")}>Gaming</Button>
            <Button variant={uiStyle === "duolingo" ? "default" : "outline"} onClick={() => setUiStyle("duolingo")}>Duolingo</Button>
          </div>
        </div>
      </div>

      {/* Custom mode */}
      {mode === "custom" && (
        <div className="mt-4">
          <Label>Custom Text</Label>
          <textarea
            value={customText}
            onChange={(e) => setCustomText(e.target.value)}
            className="w-full p-2 border rounded min-h-[100px]"
            placeholder="Enter custom text..."
          />
        </div>
      )}

      <Separator className="my-4" />

      {/* Test Display */}
      <div
        className={`p-3 rounded border ${
          uiStyle === "duolingo" ? "bg-gradient-to-r from-emerald-50 to-cyan-50" : "bg-white"
        }`}
      >
        <p className="text-sm text-muted-foreground mb-1">Test Passage</p>

        {uiStyle === "gaming" ? (
          <div className="p-3 rounded max-h-40 overflow-auto font-mono text-sm leading-relaxed">
            {testText.split("").map((ch, idx) => {
              const status = charStatus[idx] || "neutral";
              const cls =
                status === "correct"
                  ? "text-green-600 bg-green-50 px-0.5 rounded"
                  : status === "incorrect"
                  ? "text-red-600 bg-red-50 px-0.5 rounded"
                  : "";
              return <span key={idx} className={cls}>{ch}</span>;
            })}
          </div>
        ) : (
          <div className="p-3 rounded max-h-40 overflow-auto text-sm">{testText}</div>
        )}
      </div>

      {/* Input */}
      <div className="mt-4">
        <Label>Type Here</Label>
        <input
          ref={inputRef}
          value={inputValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onPaste={handlePaste}
          disabled={!running}
          placeholder={running ? "Start typing..." : "Press Start to begin"}
          className={`w-full p-3 border rounded mt-2 text-base ${
            uiStyle === "duolingo" ? "shadow-lg" : ""
          }`}
        />
      </div>

      {/* Buttons & stats */}
      <div className="mt-5 flex flex-col md:flex-row justify-between gap-4">
        <div className="flex flex-wrap gap-2">
          <Button onClick={() => startTest(false)}>Start</Button>
          <Button variant="outline" onClick={resetTest}>Reset</Button>
          <Button variant="ghost" onClick={() => { setTestText(generateTestText()); toast.success("Shuffled"); }}>
            Shuffle
          </Button>
          <Button variant="outline" onClick={() => setIsHistoryOpen(true)}>History</Button>
        </div>

        <div className="text-sm text-muted-foreground">
          <div>⏱ Time Left: <strong>{timeLeft}s</strong></div>
          <div>⌨️ Keystrokes: <strong>{keystrokes}</strong></div>
        </div>
      </div>

      {/* Main stats */}
      <div className="mt-6 grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="p-4 bg-white rounded text-center border">
          <p className="text-xs text-muted-foreground">WPM</p>
          <p className="text-3xl font-semibold">
            {(() => {
              if (!startTime) return 0;
              const elapsed = (Date.now() - startTime) / 60000;
              return Math.round((correctCount / 5) / Math.max(elapsed, 0.001));
            })()}
          </p>
        </div>
        <div className="p-4 bg-white rounded text-center border">
          <p className="text-xs text-muted-foreground">Accuracy</p>
          <p className="text-3xl font-semibold">
            {keystrokes === 0 ? 0 : Math.round((correctCount / keystrokes) * 100)}%
          </p>
        </div>
        <div className="p-4 bg-white rounded text-center border">
          <p className="text-xs text-muted-foreground">Progress</p>
          <p className="text-xl font-semibold">
            {Math.round((inputValue.length / testText.length) * 100)}%
          </p>
        </div>
      </div>

      {/* Minor Stats */}
      <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-3 bg-white rounded text-center border"><p className="text-xs">Correct</p><p className="font-bold">{correctCount}</p></div>
        <div className="p-3 bg-white rounded text-center border"><p className="text-xs">Incorrect</p><p className="font-bold">{incorrectCount}</p></div>
        <div className="p-3 bg-white rounded text-center border"><p className="text-xs">Keystrokes</p><p className="font-bold">{keystrokes}</p></div>
        <div className="p-3 bg-white rounded text-center border"><p className="text-xs">Chars/Text</p><p className="font-bold">{inputValue.length}/{testText.length}</p></div>
      </div>

      {/* Share + Export */}
      <div className="mt-6 flex flex-wrap gap-3">
        <Button onClick={shareLatest}><Share2 className="h-4 w-4 mr-2" />Share</Button>
        <Button variant="outline" onClick={exportHistoryCSV}><CloudDownload className="h-4 w-4 mr-2" />Export CSV</Button>
      </div>
    </CardContent>
  </Card>
)}

          </div>
        </div>
      </div>

      <Footer />

      {/* History Modal */}
      {isHistoryOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/40 p-4">
          <div className="bg-white dark:bg-slate-900 rounded-lg shadow-xl w-full max-w-3xl max-h-[80vh] overflow-auto">
            <div className="flex items-center justify-between p-4 border-b">
              <h3 className="text-lg font-semibold">Typing History</h3>
              <div className="flex gap-2">
                <Button variant="outline" onClick={exportHistoryCSV}>Export CSV</Button>
                <Button variant="destructive" onClick={() => deleteHistory()}>Clear All</Button>
                <Button onClick={() => setIsHistoryOpen(false)}>Close</Button>
              </div>
            </div>

            <div className="p-4 space-y-3">
              {history.length === 0 && <div className="text-sm text-muted-foreground">No history yet.</div>}
              {history.map(h => (
                <div key={h.id} className="p-3 border rounded flex items-center justify-between">
                  <div>
                    <div className="text-sm font-medium">{new Date(h.date).toLocaleString()}</div>
                    <div className="text-xs text-muted-foreground">WPM: {h.wpm} • Acc: {h.accuracy}% • {h.duration}s • {h.mode} / {h.difficulty}</div>
                  </div>
                  <div className="flex gap-2">
                    <Button variant="outline" onClick={() => copySummary(h)}>Copy</Button>
                    <Button variant="ghost" onClick={() => deleteHistory(h.id)}>Delete</Button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Tools;

import { Megaphone } from "lucide-react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";

interface HighlightItem {
    id: number;
    title: string;
    link: string;
    isNew: boolean;
}

const mockHighlights: HighlightItem[] = [
    { id: 1, title: "CTET FEB 2026 Form - Available now.", link: "https://examinationservices.nic.in/examsysctet/root/Home.aspx?enc=Ei4cajBkK1gZSfgr53ImFfEytN2I3LFrLvNrMJcZJNnNSHx65TqX61g0R7v8Uf2m", isNew: true },
    // { id: 2, title: "SSC CGL 2024 Final Result Declared: Check your status!", link: "/results/ssc-cgl-2024", isNew: true },
    // { id: 3, title: "UPSC Civil Services 2025: Application window opening soon.", link: "/admission/upsc-cse-2025", isNew: false },
    // { id: 4, title: "Latest Govt Job Alert: 500+ vacancies in Banking sector.", link: "/latest-jobs", isNew: false },
];

const Highlight = () => {
    const [currentHighlightIndex, setCurrentHighlightIndex] = useState(0);

    useEffect(() => {
        const interval = setInterval(() => {
            setCurrentHighlightIndex((prevIndex) => (prevIndex + 1) % mockHighlights.length);
        }, 5000);

        return () => clearInterval(interval);
    }, []);

    const currentHighlight = mockHighlights[currentHighlightIndex];

    return (
        <div className="bg-gradient-to-r from-blue-700 to-blue-800 text-white shadow-lg">
            <div className="container mx-auto px-4 py-2 flex items-center justify-center space-x-3 overflow-hidden">
                <Megaphone className="h-5 w-5 text-yellow-300" />

                <div className="flex-1 min-w-0 text-center">
                    <Link
                        to={currentHighlight.link}
                        className="text-sm font-medium hover:text-yellow-300 transition-colors whitespace-nowrap overflow-hidden text-ellipsis block"
                        aria-label={`Go to ${currentHighlight.title}`}
                    >
                        {currentHighlight.title}
                        {currentHighlight.isNew && (
                            <span className="ml-2 bg-red-500 text-xs font-bold px-2 py-0.5 rounded-full uppercase tracking-wider">
                                New
                            </span>
                        )}
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default Highlight;

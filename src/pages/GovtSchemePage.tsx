import { useState, useEffect } from 'react';
import { useParams, Link } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Badge } from '@/components/ui/badge';
import { Separator } from '@/components/ui/separator';
import { Calendar, Users, Eye, Share2, Download, ExternalLink } from 'lucide-react';

interface GovtScheme {
  _id: string;
  schemeId: string;
  title: string;
  slug: string;
  category: string;
  ministry: string;
  launchDate: string;
  validTill?: string;
  description: string;
  eligibility: {
    ageLimit?: { min: number; max: number };
    incomeLimit?: { min: number; max: number };
    gender?: string;
    residence?: string;
    otherCriteria?: string[];
  };
  benefits: string[];
  documentsRequired: string[];
  applicationProcess: string[];
  importantDates?: {
    applicationStart?: string;
    applicationEnd?: string;
    lastDateForCorrection?: string;
  };
  financialAssistance?: {
    amount?: number;
    type?: string;
    disbursement?: string;
  };
  contactInfo?: {
    helpline?: string;
    email?: string;
    website?: string;
    officeAddress?: string;
  };
  links?: {
    officialWebsite?: string;
    applyOnline?: string;
    guidelines?: string;
    faq?: string;
  };
  status: {
    isActive: boolean;
    isFeatured: boolean;
    isPublished: boolean;
  };
  meta: {
    views: number;
    shares: number;
    applications: number;
  };
  faqs?: Array<{ question: string; answer: string }>;
}

export const GovtSchemePage = () => {
  const { id } = useParams<{ id: string }>();
  const [scheme, setScheme] = useState<GovtScheme | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchScheme = async () => {
      try {
        const API_BASE_URL = import.meta.env.VITE_BACKEND_URL;
        const response = await fetch(`${API_BASE_URL}/api/govt-schemes/${id}`);
        
        if (!response.ok) {
          throw new Error('Scheme not found');
        }

        const data = await response.json();
        if (data.success) {
          setScheme(data.data);
        } else {
          throw new Error(data.message);
        }
      } catch (err: any) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchScheme();
  }, [id]);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'long',
      year: 'numeric'
    });
  };

  const isApplicationOpen = () => {
    if (!scheme?.importantDates?.applicationStart || !scheme?.importantDates?.applicationEnd) {
      return false;
    }
    const now = new Date();
    const start = new Date(scheme.importantDates.applicationStart);
    const end = new Date(scheme.importantDates.applicationEnd);
    return now >= start && now <= end;
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4">
          <div className="animate-pulse">
            <div className="h-8 bg-gray-200 rounded w-1/3 mb-4"></div>
            <div className="h-4 bg-gray-200 rounded w-1/2 mb-8"></div>
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
              <div className="lg:col-span-2 space-y-4">
                <div className="h-40 bg-gray-200 rounded"></div>
                <div className="h-20 bg-gray-200 rounded"></div>
              </div>
              <div className="space-y-4">
                <div className="h-48 bg-gray-200 rounded"></div>
                <div className="h-32 bg-gray-200 rounded"></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  if (error || !scheme) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-2xl font-bold text-gray-900 mb-4">Scheme Not Found</h1>
          <p className="text-gray-600 mb-8">{error || 'The requested scheme could not be found.'}</p>
          <Link to="/govt-schemes">
            <Button>Browse All Schemes</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="container mx-auto px-4">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <Badge variant="secondary">{scheme.category}</Badge>
            {scheme.status.isFeatured && (
              <Badge variant="default">Featured</Badge>            )}
            {isApplicationOpen() && (
              <Badge variant="default" className="bg-green-100 text-green-800">
                Applications Open
              </Badge>
            )}
          </div>
          <h1 className="text-3xl font-bold text-gray-900 mb-2">{scheme.title}</h1>
          <p className="text-lg text-gray-600 mb-4">{scheme.ministry}</p>
          
          <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
            <div className="flex items-center gap-1">
              <Calendar className="h-4 w-4" />
              <span>Launched: {formatDate(scheme.launchDate)}</span>
            </div>
            {scheme.validTill && (
              <div className="flex items-center gap-1">
                <Calendar className="h-4 w-4" />
                <span>Valid till: {formatDate(scheme.validTill)}</span>
              </div>
            )}
            <div className="flex items-center gap-1">
              <Eye className="h-4 w-4" />
              <span>{scheme.meta.views} views</span>
            </div>
            <div className="flex items-center gap-1">
              <Users className="h-4 w-4" />
              <span>{scheme.meta.applications} applications</span>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Description */}
            <Card>
              <CardHeader>
                <CardTitle>Scheme Overview</CardTitle>
              </CardHeader>
              <CardContent>
                <p className="text-gray-700 leading-relaxed">{scheme.description}</p>
              </CardContent>
            </Card>

            {/* Benefits */}
            <Card>
              <CardHeader>
                <CardTitle>Benefits</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {scheme.benefits.map((benefit, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-green-500 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{benefit}</span>
                    </li>
                  ))}
                </ul>
                {scheme.financialAssistance?.amount && (
                  <div className="mt-4 p-4 bg-blue-50 rounded-lg">
                    <h4 className="font-semibold text-blue-900 mb-2">Financial Assistance</h4>
                    <p className="text-blue-800">
                      ₹{scheme.financialAssistance.amount.toLocaleString('en-IN')} 
                      {scheme.financialAssistance.type && ` - ${scheme.financialAssistance.type}`}
                    </p>
                    {scheme.financialAssistance.disbursement && (
                      <p className="text-blue-700 text-sm mt-1">
                        Disbursement: {scheme.financialAssistance.disbursement}
                      </p>
                    )}
                  </div>
                )}
              </CardContent>
            </Card>

            {/* Eligibility Criteria */}
            <Card>
              <CardHeader>
                <CardTitle>Eligibility Criteria</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {scheme.eligibility.ageLimit && (
                    <div>
                      <h4 className="font-semibold mb-2">Age Limit</h4>
                      <p className="text-gray-700">
                        {scheme.eligibility.ageLimit.min} - {scheme.eligibility.ageLimit.max} years
                      </p>
                    </div>
                  )}
                  
                  {scheme.eligibility.incomeLimit && (
                    <div>
                      <h4 className="font-semibold mb-2">Income Limit</h4>
                      <p className="text-gray-700">
                        ₹{scheme.eligibility.incomeLimit.min?.toLocaleString('en-IN')} - 
                        ₹{scheme.eligibility.incomeLimit.max?.toLocaleString('en-IN')} per annum
                      </p>
                    </div>
                  )}
                  
                  {scheme.eligibility.gender && (
                    <div>
                      <h4 className="font-semibold mb-2">Gender</h4>
                      <p className="text-gray-700">{scheme.eligibility.gender}</p>
                    </div>
                  )}
                  
                  {scheme.eligibility.residence && (
                    <div>
                      <h4 className="font-semibold mb-2">Residence</h4>
                      <p className="text-gray-700">{scheme.eligibility.residence}</p>
                    </div>
                  )}
                  
                  {scheme.eligibility.otherCriteria && scheme.eligibility.otherCriteria.length > 0 && (
                    <div>
                      <h4 className="font-semibold mb-2">Other Criteria</h4>
                      <ul className="space-y-1">
                        {scheme.eligibility.otherCriteria.map((criteria, index) => (
                          <li key={index} className="flex items-start gap-2">
                            <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                            <span className="text-gray-700">{criteria}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Application Process */}
            <Card>
              <CardHeader>
                <CardTitle>Application Process</CardTitle>
              </CardHeader>
              <CardContent>
                <ol className="space-y-3">
                  {scheme.applicationProcess.map((step, index) => (
                    <li key={index} className="flex items-start gap-3">
                      <div className="flex-shrink-0 w-6 h-6 bg-blue-600 text-white rounded-full text-sm flex items-center justify-center font-medium">
                        {index + 1}
                      </div>
                      <span className="text-gray-700 pt-0.5">{step}</span>
                    </li>
                  ))}
                </ol>
              </CardContent>
            </Card>

            {/* Documents Required */}
            <Card>
              <CardHeader>
                <CardTitle>Documents Required</CardTitle>
              </CardHeader>
              <CardContent>
                <ul className="space-y-2">
                  {scheme.documentsRequired.map((document, index) => (
                    <li key={index} className="flex items-start gap-2">
                      <div className="w-1.5 h-1.5 bg-gray-400 rounded-full mt-2 flex-shrink-0"></div>
                      <span className="text-gray-700">{document}</span>
                    </li>
                  ))}
                </ul>
              </CardContent>
            </Card>

            {/* FAQs */}
            {scheme.faqs && scheme.faqs.length > 0 && (
              <Card>
                <CardHeader>
                  <CardTitle>Frequently Asked Questions</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {scheme.faqs.map((faq, index) => (
                      <div key={index}>
                        <h4 className="font-semibold text-gray-900 mb-2">{faq.question}</h4>
                        <p className="text-gray-700">{faq.answer}</p>
                        {index < scheme.faqs!.length - 1 && <Separator className="mt-4" />}
                      </div>
                    ))}
                  </div>
                </CardContent>
              </Card>
            )}
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Important Dates */}
            {scheme.importantDates && (
              <Card>
                <CardHeader>
                  <CardTitle>Important Dates</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {scheme.importantDates.applicationStart && (
                      <div>
                        <p className="text-sm text-gray-500">Application Start</p>
                        <p className="font-medium">{formatDate(scheme.importantDates.applicationStart)}</p>
                      </div>
                    )}
                    {scheme.importantDates.applicationEnd && (
                      <div>
                        <p className="text-sm text-gray-500">Application End</p>
                        <p className="font-medium">{formatDate(scheme.importantDates.applicationEnd)}</p>
                      </div>
                    )}
                    {scheme.importantDates.lastDateForCorrection && (
                      <div>
                        <p className="text-sm text-gray-500">Correction Deadline</p>
                        <p className="font-medium">{formatDate(scheme.importantDates.lastDateForCorrection)}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Contact Information */}
            {scheme.contactInfo && (
              <Card>
                <CardHeader>
                  <CardTitle>Contact Information</CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    {scheme.contactInfo.helpline && (
                      <div>
                        <p className="text-sm text-gray-500">Helpline</p>
                        <p className="font-medium">{scheme.contactInfo.helpline}</p>
                      </div>
                    )}
                    {scheme.contactInfo.email && (
                      <div>
                        <p className="text-sm text-gray-500">Email</p>
                        <a href={`mailto:${scheme.contactInfo.email}`} className="font-medium text-blue-600 hover:underline">
                          {scheme.contactInfo.email}
                        </a>
                      </div>
                    )}
                    {scheme.contactInfo.website && (
                      <div>
                        <p className="text-sm text-gray-500">Website</p>
                        <a href={scheme.contactInfo.website} target="_blank" rel="noopener noreferrer" className="font-medium text-blue-600 hover:underline flex items-center gap-1">
                          Visit Website <ExternalLink className="h-3 w-3" />
                        </a>
                      </div>
                    )}
                    {scheme.contactInfo.officeAddress && (
                      <div>
                        <p className="text-sm text-gray-500">Office Address</p>
                        <p className="font-medium text-sm">{scheme.contactInfo.officeAddress}</p>
                      </div>
                    )}
                  </div>
                </CardContent>
              </Card>
            )}

            {/* Action Buttons */}
            <Card>
              <CardHeader>
                <CardTitle>Quick Actions</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {scheme.links?.applyOnline && isApplicationOpen() && (
                    <Button asChild className="w-full">
                      <a href={scheme.links.applyOnline} target="_blank" rel="noopener noreferrer">
                        Apply Online <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  
                  {scheme.links?.officialWebsite && (
                    <Button variant="outline" asChild className="w-full">
                      <a href={scheme.links.officialWebsite} target="_blank" rel="noopener noreferrer">
                        Official Website <ExternalLink className="ml-2 h-4 w-4" />
                      </a>
                    </Button>
                  )}
                  
                  {scheme.links?.guidelines && (
                    <Button variant="outline" asChild className="w-full">
                      <a href={scheme.links.guidelines} target="_blank" rel="noopener noreferrer">
                        <Download className="mr-2 h-4 w-4" />
                        Download Guidelines
                      </a>
                    </Button>
                  )}
                  
                  <Button variant="outline" className="w-full">
                    <Share2 className="mr-2 h-4 w-4" />
                    Share Scheme
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Scheme ID */}
            <Card>
              <CardHeader>
                <CardTitle>Scheme Details</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-gray-500">Scheme ID:</span>
                    <span className="font-medium">{scheme.schemeId}</span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Status:</span>
                    <Badge variant={scheme.status.isActive ? "default" : "secondary"}>
                      {scheme.status.isActive ? "Active" : "Inactive"}
                    </Badge>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-gray-500">Last Updated:</span>
                    {/* <span className="font-medium">{formatDate(scheme.updatedAt)}</span> */}
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
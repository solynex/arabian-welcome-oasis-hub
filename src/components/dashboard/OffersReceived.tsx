
import React from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, User, Star, MapPin, DollarSign } from 'lucide-react';

interface Offer {
  id: number;
  exporterName: string;
  exporterCountry: string;
  requestTitle: string;
  price: string;
  description: string;
  rating: number;
  experienceYears: number;
  date: string;
  status: 'جديد' | 'تم الرد' | 'مقبول' | 'مرفوض';
}

const OffersReceived = () => {
  const mockOffers: Offer[] = [
    {
      id: 1,
      exporterName: 'شركة التكنولوجيا المتقدمة',
      exporterCountry: 'الصين',
      requestTitle: 'مطلوب استيراد أجهزة كمبيوتر محمولة',
      price: '$45,000 - $85,000',
      description: 'نحن نوفر أجهزة كمبيوتر محمولة عالية الجودة من أفضل الماركات العالمية مع ضمان شامل لمدة عامين.',
      rating: 4.8,
      experienceYears: 15,
      date: '2024-01-15',
      status: 'جديد'
    },
    {
      id: 2,
      exporterName: 'مؤسسة الإلكترونيات الحديثة',
      exporterCountry: 'كوريا الجنوبية',
      requestTitle: 'مطلوب استيراد أجهزة كمبيوتر محمولة',
      price: '$50,000 - $90,000',
      description: 'متخصصون في تصنيع وتصدير أحدث أجهزة الكمبيوتر المحمولة مع مواصفات متقدمة.',
      rating: 4.9,
      experienceYears: 12,
      date: '2024-01-14',
      status: 'تم الرد'
    },
    {
      id: 3,
      exporterName: 'شركة المواد الخام العالمية',
      exporterCountry: 'ماليزيا',
      requestTitle: 'بحث عن موردين للمواد الخام',
      price: '$20,000 - $60,000',
      description: 'لدينا خبرة واسعة في توريد المواد الخام عالية الجودة مع شهادات الجودة الدولية.',
      rating: 4.6,
      experienceYears: 20,
      date: '2024-01-12',
      status: 'مقبول'
    }
  ];

  const handleContactExporter = (exporterName: string) => {
    alert(`بدء محادثة مع ${exporterName}`);
  };

  const handleViewProfile = (exporterName: string) => {
    alert(`عرض ملف ${exporterName} الشخصي`);
  };

  const handleAcceptOffer = (offerId: number) => {
    alert(`تم قبول العرض رقم ${offerId}`);
  };

  const handleRejectOffer = (offerId: number) => {
    alert(`تم رفض العرض رقم ${offerId}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'جديد': return 'destructive';
      case 'تم الرد': return 'outline';
      case 'مقبول': return 'default';
      case 'مرفوض': return 'secondary';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>العروض المستلمة</CardTitle>
        <CardDescription>جميع العروض التي تلقيتها من المصدرين</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {mockOffers.map((offer) => (
            <Card key={offer.id} className="border-l-4 border-l-red-500">
              <CardContent className="p-6">
                <div className="flex items-start justify-between mb-4">
                  <div className="flex items-center space-x-3 space-x-reverse">
                    <Avatar className="h-12 w-12">
                      <AvatarFallback>{offer.exporterName[0]}</AvatarFallback>
                    </Avatar>
                    <div>
                      <h3 className="font-semibold text-lg">{offer.exporterName}</h3>
                      <div className="flex items-center space-x-2 space-x-reverse text-sm text-gray-600">
                        <MapPin className="h-4 w-4" />
                        <span>{offer.exporterCountry}</span>
                        <span>•</span>
                        <span>{offer.experienceYears} سنة خبرة</span>
                      </div>
                      <div className="flex items-center space-x-1 space-x-reverse mt-1">
                        <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                        <span className="text-sm font-medium">{offer.rating}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-left">
                    <Badge variant={getStatusColor(offer.status) as any}>
                      {offer.status}
                    </Badge>
                    <p className="text-sm text-gray-500 mt-1">{offer.date}</p>
                  </div>
                </div>

                <div className="mb-4">
                  <h4 className="font-medium text-gray-800 mb-1">بخصوص: {offer.requestTitle}</h4>
                  <p className="text-gray-600 text-sm">{offer.description}</p>
                </div>

                <div className="flex items-center space-x-2 space-x-reverse mb-4">
                  <DollarSign className="h-5 w-5 text-green-600" />
                  <span className="font-semibold text-green-600">{offer.price}</span>
                </div>

                <div className="flex items-center justify-between">
                  <div className="flex space-x-2 space-x-reverse">
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => handleViewProfile(offer.exporterName)}
                    >
                      <User className="ml-2 h-4 w-4" />
                      عرض الملف
                    </Button>
                    <Button
                      size="sm"
                      className="bg-red-600 hover:bg-red-700"
                      onClick={() => handleContactExporter(offer.exporterName)}
                    >
                      <MessageSquare className="ml-2 h-4 w-4" />
                      تواصل
                    </Button>
                  </div>
                  
                  {offer.status === 'جديد' && (
                    <div className="flex space-x-2 space-x-reverse">
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleRejectOffer(offer.id)}
                      >
                        رفض
                      </Button>
                      <Button
                        size="sm"
                        className="bg-green-600 hover:bg-green-700"
                        onClick={() => handleAcceptOffer(offer.id)}
                      >
                        قبول
                      </Button>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default OffersReceived;

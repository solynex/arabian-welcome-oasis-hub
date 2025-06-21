
import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useRequests } from '@/contexts/RequestsContext';
import { useAuth } from '@/contexts/AuthContext';
import { ArrowRight, MapPin, DollarSign, Package, Truck, CreditCard, Calendar, Building, Lock } from 'lucide-react';

const RequestDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { getRequestById } = useRequests();
  const { user } = useAuth();
  
  const request = getRequestById(parseInt(id || '0'));
  
  if (!request) {
    return (
      <div className="min-h-screen bg-gray-50 p-6">
        <div className="max-w-4xl mx-auto">
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">الطلب غير موجود</h2>
              <Button onClick={() => navigate('/')} className="bg-red-600 hover:bg-red-700">
                العودة للصفحة الرئيسية
              </Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const isSubscribed = user?.userType === 'exporter' && user?.subscriptionPlan;
  const canViewDetails = isSubscribed || user?.userType === 'importer';

  const handleSendOffer = () => {
    if (!user) {
      navigate('/login');
      return;
    }
    if (user.userType !== 'exporter') {
      alert('هذه الميزة متاحة للمصدرين فقط');
      return;
    }
    if (!isSubscribed) {
      alert('يجب الاشتراك أولاً لإرسال العروض');
      return;
    }
    alert(`تم إرسال عرضك لطلب: ${request.title}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <Button variant="ghost" onClick={() => navigate('/')}>
                <ArrowRight className="h-4 w-4 ml-2" />
                العودة للصفحة الرئيسية
              </Button>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              <span className="text-sm text-gray-600">GLOBTRADE</span>
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-6 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content */}
          <div className="lg:col-span-2 space-y-6">
            {/* Request Title */}
            <Card>
              <CardHeader>
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <CardTitle className="text-2xl mb-2">{request.title}</CardTitle>
                    <CardDescription className="text-base">
                      {canViewDetails ? request.description : 'يجب الاشتراك لعرض تفاصيل الطلب الكاملة'}
                    </CardDescription>
                  </div>
                  <Badge variant="default" className="ml-4">
                    {request.status}
                  </Badge>
                </div>
              </CardHeader>
            </Card>

            {/* Basic Information */}
            <Card>
              <CardHeader>
                <CardTitle>معلومات أساسية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Package className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">المنتج</p>
                      <p className="font-medium">{request.product}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <div className="h-5 w-5 bg-red-600 rounded text-xs text-white flex items-center justify-center">
                      #
                    </div>
                    <div>
                      <p className="text-sm text-gray-600">التصنيف</p>
                      <p className="font-medium">{request.category}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <Calendar className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">تاريخ النشر</p>
                      <p className="font-medium">{request.date}</p>
                    </div>
                  </div>
                  <div className="flex items-center space-x-2 space-x-reverse">
                    <MapPin className="h-5 w-5 text-gray-500" />
                    <div>
                      <p className="text-sm text-gray-600">الدولة</p>
                      <p className="font-medium">{canViewDetails ? request.authorCountry : '***'}</p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Detailed Information */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse">
                  {!canViewDetails && <Lock className="h-5 w-5 text-gray-500" />}
                  <span>تفاصيل متقدمة</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                {canViewDetails ? (
                  <div className="space-y-6">
                    <div>
                      <h4 className="font-medium mb-2">المواصفات المطلوبة</h4>
                      <p className="text-gray-700">{request.specifications}</p>
                    </div>
                    
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-medium mb-2">الرقم الجمركي</h4>
                        <p className="text-gray-700">{request.customsCode}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">طريقة الشحن</h4>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <Truck className="h-4 w-4 text-gray-500" />
                          <span>{request.shippingMethod}</span>
                        </div>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">الميناء المفضل</h4>
                        <p className="text-gray-700">{request.port}</p>
                      </div>
                      <div>
                        <h4 className="font-medium mb-2">طريقة الدفع</h4>
                        <div className="flex items-center space-x-2 space-x-reverse">
                          <CreditCard className="h-4 w-4 text-gray-500" />
                          <span>{request.paymentMethod}</span>
                        </div>
                      </div>
                    </div>

                    {request.additionalDetails && (
                      <div>
                        <h4 className="font-medium mb-2">تفاصيل إضافية</h4>
                        <p className="text-gray-700">{request.additionalDetails}</p>
                      </div>
                    )}
                  </div>
                ) : (
                  <div className="text-center py-8">
                    <Lock className="h-16 w-16 text-gray-400 mx-auto mb-4" />
                    <h3 className="text-lg font-medium text-gray-800 mb-2">تفاصيل محدودة للعضوية</h3>
                    <p className="text-gray-600 mb-4">للحصول على جميع التفاصيل وإمكانية التواصل</p>
                    <Button className="bg-red-600 hover:bg-red-700" onClick={() => navigate('/login')}>
                      اشترك الآن
                    </Button>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Company Info */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse">
                  <Building className="h-5 w-5" />
                  <span>معلومات الشركة</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  <div>
                    <p className="text-sm text-gray-600">اسم الشركة</p>
                    <p className="font-medium">{canViewDetails ? request.authorName : '***'}</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-600">الدولة</p>
                    <p className="font-medium">{canViewDetails ? request.authorCountry : '***'}</p>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Budget */}
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center space-x-2 space-x-reverse">
                  <DollarSign className="h-5 w-5" />
                  <span>الميزانية</span>
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="text-center">
                  {canViewDetails ? (
                    <p className="text-2xl font-bold text-green-600">{request.budget}</p>
                  ) : (
                    <div className="flex items-center justify-center space-x-2 space-x-reverse">
                      <Lock className="h-5 w-5 text-gray-400" />
                      <span className="text-gray-500">محجوب</span>
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Actions */}
            <Card>
              <CardHeader>
                <CardTitle>إجراءات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-3">
                <Button 
                  onClick={handleSendOffer}
                  className="w-full bg-red-600 hover:bg-red-700"
                  disabled={!canViewDetails && user?.userType === 'exporter'}
                >
                  {!canViewDetails && user?.userType === 'exporter' ? 'اشترك لإرسال عرض' : 'إرسال عرض'}
                </Button>
                
                {!user && (
                  <Button 
                    variant="outline" 
                    onClick={() => navigate('/login')}
                    className="w-full"
                  >
                    سجل دخول للتواصل
                  </Button>
                )}
                
                <div className="text-center pt-2">
                  <p className="text-sm text-gray-600">{request.offers} عرض مستلم</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestDetails;

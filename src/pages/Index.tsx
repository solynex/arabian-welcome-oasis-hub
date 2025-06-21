
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { MapPin, Building, Calendar, Eye, DollarSign, Lock } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { useRequests } from '@/contexts/RequestsContext';

const Index = () => {
  const navigate = useNavigate();
  const { user } = useAuth();
  const { requests } = useRequests();

  const handleViewRequest = (requestId: number) => {
    navigate(`/request/${requestId}`);
  };

  const isSubscribed = user?.userType === 'exporter' && user?.subscriptionPlan;
  const canViewDetails = isSubscribed || user?.userType === 'importer';

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Navigation */}
      <nav className="bg-white shadow-sm border-b">
        <div className="max-w-6xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4 space-x-reverse">
              <h1 className="text-2xl font-bold text-red-600">GLOBTRADE</h1>
              <span className="text-sm text-gray-500">منصة التجارة العالمية</span>
            </div>
            <div className="flex items-center space-x-4 space-x-reverse">
              {user ? (
                <div className="flex items-center space-x-4 space-x-reverse">
                  <span className="text-sm text-gray-600">مرحباً {user.companyName}</span>
                  <Button onClick={() => navigate('/dashboard')} className="bg-red-600 hover:bg-red-700">
                    لوحة التحكم
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/login')}>
                    تسجيل خروج
                  </Button>
                </div>
              ) : (
                <div className="flex space-x-2 space-x-reverse">
                  <Button onClick={() => navigate('/login')} className="bg-red-600 hover:bg-red-700">
                    تسجيل دخول
                  </Button>
                  <Button variant="outline" onClick={() => navigate('/login')}>
                    حساب جديد
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="bg-gradient-to-r from-red-600 to-red-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">
            منصة GLOBTRADE للتجارة العالمية
          </h1>
          <p className="text-xl md:text-2xl mb-8 opacity-90">
            اكتشف أحدث الفرص التجارية وتواصل مع المستوردين والمصدرين حول العالم
          </p>
          <div className="flex justify-center space-x-4 space-x-reverse">
            <Button 
              size="lg" 
              className="bg-white text-red-600 hover:bg-gray-100"
              onClick={() => navigate('/login')}
            >
              ابدأ التجارة الآن
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-red-600"
            >
              تعرف أكثر
            </Button>
          </div>
        </div>
      </div>

      {/* Stats Section */}
      <div className="bg-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">150+</div>
              <div className="text-gray-600">مستورد نشط</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">230+</div>
              <div className="text-gray-600">مصدر موثوق</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">{requests.length}</div>
              <div className="text-gray-600">طلب نشط</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-red-600 mb-2">85%</div>
              <div className="text-gray-600">معدل نجاح الصفقات</div>
            </div>
          </div>
        </div>
      </div>

      {/* Latest Requests Section */}
      <div className="py-16">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-gray-800 mb-4">أحدث الطلبات التجارية</h2>
            <p className="text-lg text-gray-600">
              تصفح أحدث طلبات الاستيراد والتصدير من شركات موثوقة حول العالم
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {requests.slice(0, 6).map((request) => (
              <Card key={request.id} className="hover:shadow-lg transition-shadow border-l-4 border-l-red-500">
                <CardHeader>
                  <div className="flex items-start justify-between">
                    <Badge variant="destructive" className="text-xs">
                      {request.offerType}
                    </Badge>
                    <span className="text-sm text-gray-500">{request.offers} عرض</span>
                  </div>
                  <CardTitle className="text-lg leading-tight">
                    {request.title}
                  </CardTitle>
                  <CardDescription className="line-clamp-2">
                    {canViewDetails ? request.description : 'تفاصيل محدودة - اشترك لعرض المزيد'}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center space-x-2 space-x-reverse text-sm">
                      <Building className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">الشركة:</span>
                      <span className="font-medium">
                        {canViewDetails ? request.authorName : '***'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse text-sm">
                      <MapPin className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">الدولة:</span>
                      <span className="font-medium">
                        {canViewDetails ? request.authorCountry : '***'}
                      </span>
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse text-sm">
                      <Calendar className="h-4 w-4 text-gray-500" />
                      <span className="text-gray-600">التاريخ:</span>
                      <span className="font-medium">{request.date}</span>
                    </div>
                    
                    <div className="flex items-center space-x-2 space-x-reverse text-sm">
                      {canViewDetails ? (
                        <>
                          <DollarSign className="h-4 w-4 text-green-600" />
                          <span className="font-medium text-green-600">{request.budget}</span>
                        </>
                      ) : (
                        <>
                          <Lock className="h-4 w-4 text-gray-400" />
                          <span className="text-gray-500">ميزانية محجوبة</span>
                        </>
                      )}
                    </div>
                  </div>
                  
                  <Button 
                    onClick={() => handleViewRequest(request.id)}
                    className="w-full mt-4 bg-red-600 hover:bg-red-700"
                  >
                    <Eye className="ml-2 h-4 w-4" />
                    عرض التفاصيل
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center mt-12">
            <Button 
              variant="outline" 
              size="lg"
              onClick={() => navigate('/login')}
            >
              عرض جميع الطلبات
            </Button>
          </div>
        </div>
      </div>

      {/* CTA Section */}
      <div className="bg-gray-800 text-white py-16">
        <div className="max-w-6xl mx-auto px-6 text-center">
          <h2 className="text-3xl font-bold mb-4">ابدأ تجارتك العالمية اليوم</h2>
          <p className="text-lg mb-8 opacity-90">
            انضم إلى آلاف التجار الذين يستخدمون GLOBTRADE لتنمية أعمالهم
          </p>
          <div className="flex justify-center space-x-4 space-x-reverse">
            <Button 
              size="lg" 
              className="bg-red-600 hover:bg-red-700"
              onClick={() => navigate('/login')}
            >
              سجل كمستورد
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-white text-white hover:bg-white hover:text-gray-800"
              onClick={() => navigate('/login')}
            >
              سجل كمصدر
            </Button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-12">
        <div className="max-w-6xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <h3 className="text-lg font-bold mb-4">تواصل معنا</h3>
              <p className="text-gray-400">نحن هنا لمساعدتك في رحلتك التجارية</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">الدعم</h3>
              <p className="text-gray-400">فريق دعم متاح 24/7</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4">خدماتنا</h3>
              <p className="text-gray-400">حلول تجارية متكاملة</p>
            </div>
            <div>
              <h3 className="text-lg font-bold mb-4 flex items-center">
                GLOBTRADE
                <Badge variant="destructive" className="mr-2">G</Badge>
              </h3>
              <p className="text-gray-400">منصة التجارة العالمية</p>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

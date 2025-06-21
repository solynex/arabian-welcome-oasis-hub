
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';
import { TrendingUp, Users, FileText, DollarSign, Search, Crown, AlertCircle } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';

const ExporterDashboard = () => {
  const { user, logout } = useAuth();
  const [activeTab, setActiveTab] = useState('overview');

  const stats = [
    { title: 'العروض المرسلة', value: '28', icon: <FileText className="h-6 w-6" />, color: 'text-blue-600' },
    { title: 'معدل الرد', value: '67%', icon: <TrendingUp className="h-6 w-6" />, color: 'text-green-600' },
    { title: 'الصفقات المكتملة', value: '8', icon: <DollarSign className="h-6 w-6" />, color: 'text-purple-600' },
    { title: 'الطلبات الجديدة', value: '15', icon: <Users className="h-6 w-6" />, color: 'text-red-600' }
  ];

  const availableRequests = [
    { id: 1, title: 'مطلوب استيراد أجهزة كمبيوتر محمولة', company: 'شركة الأندلس للتكنولوجيا', country: 'السعودية', budget: '50,000 - 100,000 دولار', isNew: true },
    { id: 2, title: 'بحث عن موردين للمواد الخام للبلاستيك', company: 'مصنع الخليج للبلاستيك', country: 'الإمارات', budget: '25,000 - 75,000 دولار', isNew: false },
    { id: 3, title: 'استيراد معدات طبية متخصصة', company: 'المركز الطبي المتقدم', country: 'مصر', budget: '100,000+ دولار', isNew: true }
  ];

  const subscriptionPlans = [
    { name: 'باقة مصدر 1', price: '$100', limit: '30 عرض سنوي', current: user?.subscriptionPlan === 'exporter1' },
    { name: 'باقة مصدر 2', price: '$200', limit: '150 عرض سنوي', current: user?.subscriptionPlan === 'exporter2' },
    { name: 'باقة مصدر 3', price: '$500', limit: '350 عرض سنوي', current: user?.subscriptionPlan === 'exporter3' }
  ];

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
            {/* Subscription Status */}
            <Card className="border-red-200 bg-red-50">
              <CardHeader>
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Crown className="h-5 w-5 text-red-600" />
                  <CardTitle className="text-red-700">حالة الاشتراك</CardTitle>
                </div>
              </CardHeader>
              <CardContent>
                <div className="flex items-center justify-between">
                  <div>
                    <p className="font-medium">الباقة الحالية: {subscriptionPlans.find(p => p.current)?.name}</p>
                    <p className="text-sm text-gray-600">المتبقي: 25 عرض من أصل {subscriptionPlans.find(p => p.current)?.limit}</p>
                  </div>
                  <Button className="bg-red-600 hover:bg-red-700">
                    ترقية الباقة
                  </Button>
                </div>
              </CardContent>
            </Card>

            {/* Stats Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {stats.map((stat, index) => (
                <Card key={index}>
                  <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                    <CardTitle className="text-sm font-medium">{stat.title}</CardTitle>
                    <div className={stat.color}>{stat.icon}</div>
                  </CardHeader>
                  <CardContent>
                    <div className="text-2xl font-bold">{stat.value}</div>
                  </CardContent>
                </Card>
              ))}
            </div>

            {/* New Requests in Category */}
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <CardTitle>طلبات جديدة في تصنيفك</CardTitle>
                    <CardDescription>طلبات جديدة في مجال {user?.businessCategory}</CardDescription>
                  </div>
                  <Button variant="outline">
                    <Search className="ml-2 h-4 w-4" />
                    تصفح الكل
                  </Button>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {availableRequests.map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                      <div className="flex-1">
                        <div className="flex items-center space-x-2 space-x-reverse mb-2">
                          <h4 className="font-medium">{request.title}</h4>
                          {request.isNew && <Badge variant="destructive" className="text-xs">جديد</Badge>}
                        </div>
                        <p className="text-sm text-gray-600">{request.company} - {request.country}</p>
                        <p className="text-sm text-red-600 font-medium">الميزانية: {request.budget}</p>
                      </div>
                      <div className="flex space-x-2 space-x-reverse">
                        <Button variant="outline" size="sm">
                          عرض التفاصيل
                        </Button>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">
                          إرسال عرض
                        </Button>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'browse':
        return (
          <Card>
            <CardHeader>
              <CardTitle>تصفح الطلبات</CardTitle>
              <CardDescription>ابحث عن الطلبات المناسبة لشركتك</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {/* Search and Filters */}
                <div className="flex flex-col md:flex-row gap-4">
                  <div className="flex-1">
                    <input
                      type="text"
                      placeholder="ابحث في الطلبات..."
                      className="w-full px-3 py-2 border rounded-md"
                    />
                  </div>
                  <select className="px-3 py-2 border rounded-md">
                    <option>جميع التصنيفات</option>
                    <option>إلكترونيات</option>
                    <option>مواد خام</option>
                    <option>معدات طبية</option>
                  </select>
                  <select className="px-3 py-2 border rounded-md">
                    <option>ج

يع الدول</option>
                    <option>السعودية</option>
                    <option>الإمارات</option>
                    <option>مصر</option>
                  </select>
                </div>

                {/* Results */}
                <div className="space-y-4">
                  {availableRequests.map((request) => (
                    <div key={request.id} className="p-4 border rounded-lg">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="font-medium">{request.title}</h4>
                        {request.isNew && <Badge variant="destructive">جديد</Badge>}
                      </div>
                      <div className="grid grid-cols-2 md:grid-cols-3 gap-4 text-sm text-gray-600 mb-4">
                        <div>الشركة: {request.company}</div>
                        <div>الدولة: {request.country}</div>
                        <div>الميزانية: {request.budget}</div>
                      </div>
                      <div className="flex space-x-2 space-x-reverse">
                        <Button variant="outline" size="sm">عرض التفاصيل</Button>
                        <Button size="sm" className="bg-red-600 hover:bg-red-700">إرسال عرض</Button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </CardContent>
          </Card>
        );

      case 'subscription':
        return (
          <Card>
            <CardHeader>
              <CardTitle>إدارة الاشتراك</CardTitle>
              <CardDescription>اختر الباقة المناسبة لاحتياجاتك</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {subscriptionPlans.map((plan, index) => (
                  <Card key={index} className={plan.current ? 'border-red-500 bg-red-50' : ''}>
                    <CardHeader>
                      <div className="flex items-center justify-between">
                        <CardTitle className="text-lg">{plan.name}</CardTitle>
                        {plan.current && <Badge variant="destructive">الحالية</Badge>}
                      </div>
                      <div className="text-2xl font-bold text-red-600">{plan.price}</div>
                      <CardDescription>{plan.limit}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <Button 
                        className={plan.current ? 'bg-gray-400' : 'bg-red-600 hover:bg-red-700'} 
                        disabled={plan.current}
                        size="sm"
                      >
                        {plan.current ? 'الباقة الحالية' : 'اختيار الباقة'}
                      </Button>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </CardContent>
          </Card>
        );
      
      default:
        return <div>قيد التطوير...</div>;
    }
  };

  return (
    <DashboardLayout
      user={user}
      activeTab={activeTab}
      setActiveTab={setActiveTab}
      onLogout={logout}
      userType="exporter"
    >
      {renderContent()}
    </DashboardLayout>
  );
};

export default ExporterDashboard;

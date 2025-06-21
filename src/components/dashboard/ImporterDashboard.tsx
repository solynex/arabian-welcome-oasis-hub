import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useAuth } from '@/contexts/AuthContext';
import { useRequests } from '@/contexts/RequestsContext';
import { Bell, Plus, MessageSquare, User, Settings, LogOut, TrendingUp, Users, FileText, DollarSign } from 'lucide-react';
import DashboardLayout from '@/components/layout/DashboardLayout';
import RequestForm from './RequestForm';
import MessagesPanel from './MessagesPanel';
import RequestsList from './RequestsList';
import OffersReceived from './OffersReceived';

const ImporterDashboard = () => {
  const { user, logout } = useAuth();
  const { requests } = useRequests();
  const [activeTab, setActiveTab] = useState('overview');
  const [showRequestForm, setShowRequestForm] = useState(false);

  const userRequests = requests.filter(req => req.userId === user?.email);
  const totalOffers = userRequests.reduce((sum, req) => sum + req.offers, 0);
  const completedDeals = userRequests.filter(req => req.status === 'مكتمل').length;

  const stats = [
    { title: 'الطلبات النشطة', value: userRequests.length.toString(), icon: <FileText className="h-6 w-6" />, color: 'text-blue-600' },
    { title: 'العروض المستلمة', value: totalOffers.toString(), icon: <TrendingUp className="h-6 w-6" />, color: 'text-green-600' },
    { title: 'الصفقات المكتملة', value: completedDeals.toString(), icon: <DollarSign className="h-6 w-6" />, color: 'text-purple-600' },
    { title: 'إجمالي القيمة', value: '850,000 ر.س', icon: <DollarSign className="h-6 w-6" />, color: 'text-red-600' }
  ];

  const handleCreateRequest = (requestData: any) => {
    console.log('طلب جديد تم إنشاؤه:', requestData);
    // The request is already added through the RequestsContext
  };

  const renderContent = () => {
    switch (activeTab) {
      case 'overview':
        return (
          <div className="space-y-6">
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

            {/* Recent Activity */}
            <Card>
              <CardHeader>
                <CardTitle>النشاط الأخير</CardTitle>
                <CardDescription>آخر الطلبات والعروض</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {userRequests.slice(0, 3).map((request) => (
                    <div key={request.id} className="flex items-center justify-between p-4 border rounded-lg">
                      <div>
                        <h4 className="font-medium">{request.title}</h4>
                        <p className="text-sm text-gray-500">تاريخ النشر: {request.date}</p>
                      </div>
                      <div className="flex items-center space-x-2 space-x-reverse">
                        <Badge variant={request.status === 'نشط' ? 'default' : request.status === 'مكتمل' ? 'secondary' : 'outline'}>
                          {request.status}
                        </Badge>
                        <span className="text-sm text-gray-500">{request.offers} عرض</span>
                      </div>
                    </div>
                  ))}
                  {userRequests.length === 0 && (
                    <div className="text-center py-8 text-gray-500">
                      لم تقم بإنشاء أي طلبات بعد
                    </div>
                  )}
                </div>
              </CardContent>
            </Card>

            {/* Quick Actions */}
            <Card>
              <CardHeader>
                <CardTitle>إجراءات سريعة</CardTitle>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  <Button 
                    className="h-20 flex flex-col space-y-2 bg-red-600 hover:bg-red-700"
                    onClick={() => setShowRequestForm(true)}
                  >
                    <Plus className="h-6 w-6" />
                    <span>طلب جديد</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col space-y-2"
                    onClick={() => setActiveTab('messages')}
                  >
                    <MessageSquare className="h-6 w-6" />
                    <span>الرسائل</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col space-y-2"
                    onClick={() => setActiveTab('requests')}
                  >
                    <FileText className="h-6 w-6" />
                    <span>طلباتي</span>
                  </Button>
                  <Button 
                    variant="outline" 
                    className="h-20 flex flex-col space-y-2"
                    onClick={() => setActiveTab('offers')}
                  >
                    <TrendingUp className="h-6 w-6" />
                    <span>العروض</span>
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        );
      
      case 'requests':
        return <RequestsList />;
      
      case 'offers':
        return <OffersReceived />;
      
      case 'messages':
        return <MessagesPanel userType="importer" />;
      
      case 'profile':
        return (
          <Card>
            <CardHeader>
              <CardTitle>الملف الشخصي</CardTitle>
              <CardDescription>إدارة معلومات شركتك</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="flex items-center space-x-4 space-x-reverse">
                  <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center">
                    <span className="text-white font-bold text-xl">{user?.companyName?.[0] || 'ش'}</span>
                  </div>
                  <div>
                    <h3 className="text-lg font-semibold">{user?.companyName}</h3>
                    <p className="text-gray-500">{user?.businessCategory}</p>
                  </div>
                </div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="text-sm font-medium">البريد الإلكتروني</label>
                    <p className="text-gray-700">{user?.email}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">الدولة</label>
                    <p className="text-gray-700">{user?.country}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">رقم التسجيل التجاري</label>
                    <p className="text-gray-700">{user?.commercialRegistration}</p>
                  </div>
                  <div>
                    <label className="text-sm font-medium">اكتمال الملف الشخصي</label>
                    <div className="flex items-center space-x-2 space-x-reverse">
                      <div className="flex-1 bg-gray-200 rounded-full h-2">
                        <div 
                          className="bg-red-600 h-2 rounded-full" 
                          style={{ width: `${user?.profileCompletion || 0}%` }}
                        ></div>
                      </div>
                      <span className="text-sm">{user?.profileCompletion}%</span>
                    </div>
                  </div>
                </div>

                <Button className="bg-red-600 hover:bg-red-700">
                  تحديث الملف الشخصي
                </Button>
              </div>
            </CardContent>
          </Card>
        );
      
      default:
        return <div>قيد التطوير...</div>;
    }
  };

  return (
    <>
      <DashboardLayout
        user={user}
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={logout}
      >
        {renderContent()}
      </DashboardLayout>
      
      {showRequestForm && (
        <RequestForm
          onClose={() => setShowRequestForm(false)}
          onSubmit={handleCreateRequest}
        />
      )}
    </>
  );
};

export default ImporterDashboard;

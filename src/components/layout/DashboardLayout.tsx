
import React from 'react';
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { User, Bell, MessageSquare, Settings, LogOut, FileText, TrendingUp, Search, Crown, Users } from 'lucide-react';
import { User as UserType } from '@/contexts/AuthContext';

interface DashboardLayoutProps {
  children: React.ReactNode;
  user: UserType | null;
  activeTab: string;
  setActiveTab: (tab: string) => void;
  onLogout: () => void;
  userType?: 'importer' | 'exporter';
}

const DashboardLayout = ({ children, user, activeTab, setActiveTab, onLogout, userType }: DashboardLayoutProps) => {
  const importerTabs = [
    { id: 'overview', label: 'نظرة عامة', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'requests', label: 'طلباتي', icon: <FileText className="h-4 w-4" /> },
    { id: 'offers', label: 'العروض المستلمة', icon: <Users className="h-4 w-4" /> },
    { id: 'messages', label: 'الرسائل', icon: <MessageSquare className="h-4 w-4" /> },
    { id: 'profile', label: 'الملف الشخصي', icon: <User className="h-4 w-4" /> }
  ];

  const exporterTabs = [
    { id: 'overview', label: 'نظرة عامة', icon: <TrendingUp className="h-4 w-4" /> },
    { id: 'browse', label: 'تصفح الطلبات', icon: <Search className="h-4 w-4" /> },
    { id: 'myoffers', label: 'عروضي', icon: <FileText className="h-4 w-4" /> },
    { id: 'messages', label: 'الرسائل', icon: <MessageSquare className="h-4 w-4" /> },
    { id: 'subscription', label: 'الاشتراك', icon: <Crown className="h-4 w-4" /> },
    { id: 'profile', label: 'الملف الشخصي', icon: <User className="h-4 w-4" /> }
  ];

  const tabs = userType === 'exporter' ? exporterTabs : importerTabs;

  return (
    <div className="min-h-screen bg-gray-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="px-6 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
              <div className="text-white font-bold">G</div>
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-900" style={{ fontFamily: 'Cairo, sans-serif' }}>
                GLOBTRADE
              </h1>
              <p className="text-sm text-red-600">لوحة التحكم</p>
            </div>
          </div>
          
          <div className="flex items-center space-x-4 space-x-reverse">
            <Button variant="ghost" size="icon">
              <Bell className="h-5 w-5" />
            </Button>
            <div className="flex items-center space-x-2 space-x-reverse">
              <div className="text-sm">
                <p className="font-medium">{user?.companyName}</p>
                <p className="text-gray-500">{user?.userType === 'importer' ? 'مستورد' : 'مصدر'}</p>
              </div>
              <Button variant="ghost" size="icon" onClick={onLogout}>
                <LogOut className="h-5 w-5" />
              </Button>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <aside className="w-64 bg-white shadow-sm min-h-screen">
          <nav className="p-4">
            <div className="space-y-2">
              {tabs.map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id)}
                  className={`w-full flex items-center space-x-3 space-x-reverse px-3 py-2 rounded-md text-sm font-medium transition-colors ${
                    activeTab === tab.id
                      ? 'bg-red-100 text-red-700'
                      : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                  }`}
                >
                  {tab.icon}
                  <span>{tab.label}</span>
                </button>
              ))}
            </div>
          </nav>
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {children}
        </main>
      </div>
    </div>
  );
};

export default DashboardLayout;

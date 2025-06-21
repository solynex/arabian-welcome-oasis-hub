
import React, { createContext, useContext, useState, ReactNode } from 'react';

export interface Request {
  id: number;
  title: string;
  description: string;
  product: string;
  category: string;
  customsCode: string;
  specifications: string;
  shippingMethod: string;
  port: string;
  paymentMethod: string;
  offerType: string;
  budget: string;
  additionalDetails: string;
  authorName: string;
  authorCountry: string;
  date: string;
  status: string;
  offers: number;
  userId: string;
}

interface RequestsContextType {
  requests: Request[];
  addRequest: (request: Omit<Request, 'id' | 'offers' | 'date' | 'status'>) => void;
  getRequestById: (id: number) => Request | undefined;
}

const RequestsContext = createContext<RequestsContextType | undefined>(undefined);

export const useRequests = () => {
  const context = useContext(RequestsContext);
  if (!context) {
    throw new Error('useRequests must be used within a RequestsProvider');
  }
  return context;
};

export const RequestsProvider = ({ children }: { children: ReactNode }) => {
  const [requests, setRequests] = useState<Request[]>([
    {
      id: 1,
      title: 'مطلوب استيراد أجهزة كمبيوتر محمولة',
      description: 'نحن بحاجة لاستيراد كمية كبيرة من أجهزة الكمبيوتر المحمولة عالية الجودة للسوق السعودي',
      product: 'أجهزة كمبيوتر محمولة',
      category: 'إلكترونيات',
      customsCode: '8471.30.00',
      specifications: 'معالج Intel Core i7، ذاكرة 16GB، تخزين SSD 512GB',
      shippingMethod: 'شحن بحري',
      port: 'ميناء جدة',
      paymentMethod: 'خطاب ائتمان',
      offerType: 'عرض عادي',
      budget: '50,000 - 100,000 دولار',
      additionalDetails: 'يفضل الماركات العالمية المعروفة مع ضمان شامل',
      authorName: 'شركة الأندلس للتكنولوجيا',
      authorCountry: 'السعودية',
      date: '2024-01-15',
      status: 'نشط',
      offers: 15,
      userId: 'importer1'
    },
    {
      id: 2,
      title: 'بحث عن موردين للمواد الخام للبلاستيك',
      description: 'نبحث عن موردين موثوقين لتوريد المواد الخام عالية الجودة',
      product: 'مواد خام بلاستيكية',
      category: 'مواد خام',
      customsCode: '3901.10.00',
      specifications: 'مواد خام عالية الجودة تتوافق مع المعايير الدولية',
      shippingMethod: 'شحن بحري',
      port: 'ميناء دبي',
      paymentMethod: 'تحويل مصرفي',
      offerType: 'عرض عاجل',
      budget: '25,000 - 75,000 دولار',
      additionalDetails: 'نحتاج شهادات الجودة والمطابقة',
      authorName: 'مصنع الخليج للبلاستيك',
      authorCountry: 'الإمارات',
      date: '2024-01-10',
      status: 'قيد المراجعة',
      offers: 8,
      userId: 'importer2'
    }
  ]);

  const addRequest = (newRequest: Omit<Request, 'id' | 'offers' | 'date' | 'status'>) => {
    const request: Request = {
      ...newRequest,
      id: Date.now(),
      offers: 0,
      date: new Date().toISOString().split('T')[0],
      status: 'نشط'
    };
    setRequests(prev => [request, ...prev]);
  };

  const getRequestById = (id: number) => {
    return requests.find(req => req.id === id);
  };

  return (
    <RequestsContext.Provider value={{ requests, addRequest, getRequestById }}>
      {children}
    </RequestsContext.Provider>
  );
};

import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { X } from 'lucide-react';
import { useRequests } from '@/contexts/RequestsContext';
import { useAuth } from '@/contexts/AuthContext';

interface RequestFormProps {
  onClose: () => void;
  onSubmit: (requestData: any) => void;
}

const RequestForm = ({ onClose, onSubmit }: RequestFormProps) => {
  const { addRequest } = useRequests();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    product: '',
    category: '',
    customsCode: '',
    specifications: '',
    shippingMethod: '',
    port: '',
    paymentMethod: '',
    offerType: '',
    budget: '',
    additionalDetails: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const requestData = {
      ...formData,
      authorName: user?.companyName || 'شركة غير محددة',
      authorCountry: user?.country || 'غير محدد',
      userId: user?.email || 'unknown'
    };
    
    addRequest(requestData);
    onSubmit(requestData);
    onClose();
  };

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <CardHeader className="flex flex-row items-center justify-between">
          <div>
            <CardTitle>إنشاء طلب جديد</CardTitle>
            <CardDescription>أضف تفاصيل طلب الاستيراد الخاص بك وسيتم نشره في الصفحة الرئيسية</CardDescription>
          </div>
          <Button variant="ghost" size="icon" onClick={onClose}>
            <X className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="title">عنوان العرض</Label>
                <Input
                  id="title"
                  value={formData.title}
                  onChange={(e) => handleInputChange('title', e.target.value)}
                  placeholder="أدخل عنوان العرض"
                  required
                />
              </div>
              <div>
                <Label htmlFor="product">المنتج</Label>
                <Input
                  id="product"
                  value={formData.product}
                  onChange={(e) => handleInputChange('product', e.target.value)}
                  placeholder="نوع المنتج المطلوب"
                  required
                />
              </div>
            </div>

            <div>
              <Label htmlFor="description">وصف العرض</Label>
              <Textarea
                id="description"
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                placeholder="وصف تفصيلي للمنتج المطلوب"
                rows={3}
                required
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="category">التصنيف التجاري</Label>
                <Select onValueChange={(value) => handleInputChange('category', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر التصنيف" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="إلكترونيات">إلكترونيات</SelectItem>
                    <SelectItem value="منسوجات">منسوجات</SelectItem>
                    <SelectItem value="آلات ومعدات">آلات ومعدات</SelectItem>
                    <SelectItem value="مواد غذائية">مواد غذائية</SelectItem>
                    <SelectItem value="كيماويات">كيماويات</SelectItem>
                    <SelectItem value="معدات طبية">معدات طبية</SelectItem>
                    <SelectItem value="مواد خام">مواد خام</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="customsCode">الرقم الجمركي</Label>
                <Input
                  id="customsCode"
                  value={formData.customsCode}
                  onChange={(e) => handleInputChange('customsCode', e.target.value)}
                  placeholder="رقم التصنيف الجمركي"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="specifications">المواصفات</Label>
              <Textarea
                id="specifications"
                value={formData.specifications}
                onChange={(e) => handleInputChange('specifications', e.target.value)}
                placeholder="المواصفات التقنية والمعايير المطلوبة"
                rows={3}
              />
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="shippingMethod">طريقة الشحن</Label>
                <Select onValueChange={(value) => handleInputChange('shippingMethod', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر طريقة الشحن" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="شحن بحري">شحن بحري</SelectItem>
                    <SelectItem value="شحن جوي">شحن جوي</SelectItem>
                    <SelectItem value="شحن بري">شحن بري</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="port">الميناء</Label>
                <Input
                  id="port"
                  value={formData.port}
                  onChange={(e) => handleInputChange('port', e.target.value)}
                  placeholder="ميناء الوصول المفضل"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <Label htmlFor="paymentMethod">طريقة الدفع</Label>
                <Select onValueChange={(value) => handleInputChange('paymentMethod', value)}>
                  <SelectTrigger>
                    <SelectValue placeholder="اختر طريقة الدفع" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="خطاب ائتمان">خطاب ائتمان</SelectItem>
                    <SelectItem value="تحويل مصرفي">تحويل مصرفي</SelectItem>
                    <SelectItem value="دفع نقدي">دفع نقدي</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <Label htmlFor="budget">قيمة العرض</Label>
                <Input
                  id="budget"
                  value={formData.budget}
                  onChange={(e) => handleInputChange('budget', e.target.value)}
                  placeholder="الميزانية المتوقعة"
                />
              </div>
            </div>

            <div>
              <Label htmlFor="offerType">نوع العرض</Label>
              <Select onValueChange={(value) => handleInputChange('offerType', value)}>
                <SelectTrigger>
                  <SelectValue placeholder="اختر نوع العرض" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="عرض عادي">عرض عادي</SelectItem>
                  <SelectItem value="عرض عاجل">عرض عاجل</SelectItem>
                  <SelectItem value="مناقصة">مناقصة</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <Label htmlFor="additionalDetails">تفاصيل أخرى</Label>
              <Textarea
                id="additionalDetails"
                value={formData.additionalDetails}
                onChange={(e) => handleInputChange('additionalDetails', e.target.value)}
                placeholder="أي تفاصيل إضافية أو شروط خاصة"
                rows={3}
              />
            </div>

            <div className="flex justify-end space-x-2 space-x-reverse pt-4">
              <Button type="button" variant="outline" onClick={onClose}>
                إلغاء
              </Button>
              <Button type="submit" className="bg-red-600 hover:bg-red-700">
                نشر الطلب
              </Button>
            </div>
          </form>
        </CardContent>
      </Card>
    </div>
  );
};

export default RequestForm;

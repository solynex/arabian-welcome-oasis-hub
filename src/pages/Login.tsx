
import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useAuth } from '@/contexts/AuthContext';
import { useNavigate } from 'react-router-dom';
import { ArrowRight } from 'lucide-react';

const Login = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    email: '',
    companyName: '',
    businessCategory: '',
    country: '',
    commercialRegistration: '',
    userType: 'importer' as 'importer' | 'exporter'
  });
  const [loading, setLoading] = useState(false);
  const { login, register } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      if (isLogin) {
        const success = await login(formData.username, formData.password);
        if (success) {
          navigate('/dashboard');
        } else {
          alert('فشل في تسجيل الدخول. تحقق من البيانات.');
        }
      } else {
        const success = await register(formData);
        if (success) {
          navigate('/dashboard');
        } else {
          alert('فشل في التسجيل. حاول مرة أخرى.');
        }
      }
    } catch (error) {
      alert('حدث خطأ. حاول مرة أخرى.');
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50 flex items-center justify-center p-4" dir="rtl">
      <div className="w-full max-w-md">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center mx-auto mb-4">
            <div className="text-white font-bold text-2xl">G</div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900" style={{ fontFamily: 'Cairo, sans-serif' }}>
            GLOBTRADE
          </h1>
          <p className="text-red-600 font-medium">صانعو الصفقات العالمية</p>
        </div>

        <Card>
          <CardHeader>
            <CardTitle className="text-center">
              {isLogin ? 'تسجيل الدخول' : 'إنشاء حساب جديد'}
            </CardTitle>
            <CardDescription className="text-center">
              {isLogin ? 'ادخل بياناتك للوصول إلى حسابك' : 'أنشئ حسابك للانضمام إلى المنصة'}
            </CardDescription>
          </CardHeader>
          <CardContent>
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <Label htmlFor="username">اسم المستخدم</Label>
                <Input
                  id="username"
                  name="username"
                  value={formData.username}
                  onChange={handleInputChange}
                  required
                />
              </div>

              <div>
                <Label htmlFor="password">كلمة المرور</Label>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  value={formData.password}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {!isLogin && (
                <>
                  <div>
                    <Label htmlFor="email">البريد الإلكتروني</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="companyName">اسم الشركة</Label>
                    <Input
                      id="companyName"
                      name="companyName"
                      value={formData.companyName}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="businessCategory">التصنيف التجاري</Label>
                    <select
                      id="businessCategory"
                      name="businessCategory"
                      value={formData.businessCategory}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    >
                      <option value="">اختر التصنيف</option>
                      <option value="إلكترونيات">إلكترونيات</option>
                      <option value="مواد خام">مواد خام</option>
                      <option value="معدات طبية">معدات طبية</option>
                      <option value="منسوجات">منسوجات</option>
                      <option value="مواد غذائية">مواد غذائية</option>
                    </select>
                  </div>

                  <div>
                    <Label htmlFor="country">الدولة</Label>
                    <Input
                      id="country"
                      name="country"
                      value={formData.country}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="commercialRegistration">رقم التسجيل التجاري</Label>
                    <Input
                      id="commercialRegistration"
                      name="commercialRegistration"
                      value={formData.commercialRegistration}
                      onChange={handleInputChange}
                      required
                    />
                  </div>

                  <div>
                    <Label htmlFor="userType">نوع الحساب</Label>
                    <select
                      id="userType"
                      name="userType"
                      value={formData.userType}
                      onChange={handleInputChange}
                      className="flex h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-sm"
                      required
                    >
                      <option value="importer">مستورد</option>
                      <option value="exporter">مصدر</option>
                    </select>
                  </div>
                </>
              )}

              <Button type="submit" className="w-full bg-red-600 hover:bg-red-700" disabled={loading}>
                {loading ? 'جاري المعالجة...' : (isLogin ? 'تسجيل الدخول' : 'إنشاء الحساب')}
                <ArrowRight className="mr-2 h-4 w-4" />
              </Button>
            </form>

            <div className="mt-4 text-center">
              <button
                type="button"
                onClick={() => setIsLogin(!isLogin)}
                className="text-red-600 hover:underline"
              >
                {isLogin ? 'ليس لديك حساب؟ أنشئ حساب جديد' : 'لديك حساب؟ سجل الدخول'}
              </button>
            </div>

            {isLogin && (
              <div className="mt-4 p-3 bg-blue-50 rounded-md text-sm">
                <p className="font-medium text-blue-800 mb-2">للتجربة استخدم:</p>
                <p className="text-blue-700">مستورد: importer1 / password</p>
                <p className="text-blue-700">مصدر: exporter1 / password</p>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Login;

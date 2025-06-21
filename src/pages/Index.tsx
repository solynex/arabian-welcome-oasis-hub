
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Globe, Users, TrendingUp, Shield, ArrowLeft, Star } from "lucide-react";

const Index = () => {
  const features = [
    {
      icon: <Globe className="h-8 w-8 text-red-600" />,
      title: "شبكة عالمية",
      description: "اتصل مع مصدرين ومستوردين من أكثر من 150 دولة حول العالم"
    },
    {
      icon: <Users className="h-8 w-8 text-red-600" />,
      title: "شركاء موثوقون",
      description: "جميع الشركات محققة ومعتمدة لضمان أعلى مستوى من الثقة"
    },
    {
      icon: <TrendingUp className="h-8 w-8 text-red-600" />,
      title: "نمو الأعمال",
      description: "زد من نطاق عملك وحقق المزيد من الأرباح مع شركائنا"
    },
    {
      icon: <Shield className="h-8 w-8 text-red-600" />,
      title: "حماية كاملة",
      description: "نضمن لك الحماية الكاملة في جميع معاملاتك التجارية"
    }
  ];

  const sampleOffers = [
    {
      id: 1,
      title: "مطلوب استيراد أجهزة كمبيوتر محمولة",
      company: "شركة الأندلس للتكنولوجيا",
      country: "السعودية",
      budget: "50,000 - 100,000 دولار",
      category: "إلكترونيات",
      isUrgent: true,
      responses: 15
    },
    {
      id: 2,
      title: "بحث عن موردين للمواد الخام للبلاستيك",
      company: "مصنع الخليج للبلاستيك",
      country: "الإمارات",
      budget: "25,000 - 75,000 دولار",
      category: "مواد خام",
      isUrgent: false,
      responses: 8
    },
    {
      id: 3,
      title: "استيراد معدات طبية متخصصة",
      company: "المركز الطبي المتقدم",
      country: "مصر",
      budget: "100,000+ دولار",
      category: "معدات طبية",
      isUrgent: true,
      responses: 23
    }
  ];

  const stats = [
    { number: "10,000+", label: "شركة مسجلة" },
    { number: "5,000+", label: "طلب نشط" },
    { number: "500M+", label: "دولار قيمة الصفقات" },
    { number: "150+", label: "دولة" }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 to-red-50" dir="rtl">
      {/* Header */}
      <header className="bg-white shadow-sm border-b">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center space-x-4 space-x-reverse">
            <div className="w-12 h-12 bg-red-600 rounded-full flex items-center justify-center">
              <div className="text-white font-bold text-xl">G</div>
            </div>
            <div>
              <h1 className="text-2xl font-bold text-gray-900" style={{ fontFamily: 'Cairo, sans-serif' }}>
                GLOBTRADE
              </h1>
              <p className="text-sm text-red-600 font-medium">صانعو الصفقات العالمية</p>
            </div>
          </div>
          
          <nav className="hidden md:flex items-center space-x-6 space-x-reverse">
            <Button variant="ghost" className="text-gray-700 hover:text-red-600">
              الرئيسية
            </Button>
            <Button variant="ghost" className="text-gray-700 hover:text-red-600">
              تصفح الطلبات
            </Button>
            <Button variant="ghost" className="text-gray-700 hover:text-red-600">
              عن المنصة
            </Button>
            <Button variant="ghost" className="text-gray-700 hover:text-red-600">
              اتصل بنا
            </Button>
          </nav>

          <div className="flex items-center space-x-3 space-x-reverse">
            <Button variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              تسجيل الدخول
            </Button>
            <Button className="bg-red-600 hover:bg-red-700 text-white">
              انضم الآن
            </Button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="py-20 px-4">
        <div className="container mx-auto text-center">
          <div className="max-w-4xl mx-auto">
            <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6" style={{ fontFamily: 'Cairo, sans-serif' }}>
              منصة <span className="text-red-600">GLOBTRADE</span>
            </h1>
            <h2 className="text-2xl md:text-3xl font-semibold text-red-600 mb-8">
              صانعو الصفقات العالمية
            </h2>
            <p className="text-xl text-gray-600 mb-12 leading-relaxed">
              اكتشف فرص التجارة الدولية وتواصل مع آلاف المصدرين والمستوردين حول العالم. 
              ابدأ رحلتك في التجارة العالمية اليوم واحصل على أفضل الصفقات التجارية.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center mb-16">
              <Button size="lg" className="bg-red-600 hover:bg-red-700 text-white px-8 py-4 text-lg">
                ابدأ التجارة الآن
                <ArrowLeft className="mr-2 h-5 w-5" />
              </Button>
              <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50 px-8 py-4 text-lg">
                تعرف على المنصة
              </Button>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
              {stats.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-3xl md:text-4xl font-bold text-red-600 mb-2">
                    {stat.number}
                  </div>
                  <div className="text-gray-600 font-medium">
                    {stat.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Cairo, sans-serif' }}>
              لماذا تختار GLOBTRADE؟
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              نوفر لك أقوى منصة للتجارة الدولية مع مميزات استثنائية لضمان نجاح أعمالك
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => (
              <Card key={index} className="text-center hover:shadow-lg transition-shadow duration-300 border-red-100">
                <CardHeader>
                  <div className="mx-auto mb-4 p-3 bg-red-50 rounded-full w-fit">
                    {feature.icon}
                  </div>
                  <CardTitle className="text-xl font-bold text-gray-900">
                    {feature.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-gray-600 leading-relaxed">
                    {feature.description}
                  </CardDescription>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Latest Offers Section */}
      <section className="py-20 bg-gradient-to-br from-red-50 to-slate-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4" style={{ fontFamily: 'Cairo, sans-serif' }}>
              أحدث الطلبات التجارية
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              تصفح أحدث طلبات الاستيراد والتصدير من شركات موثوقة حول العالم
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
            {sampleOffers.map((offer) => (
              <Card key={offer.id} className="hover:shadow-lg transition-shadow duration-300 border-red-100">
                <CardHeader>
                  <div className="flex items-start justify-between mb-2">
                    <Badge variant={offer.isUrgent ? "destructive" : "secondary"} className="mb-2">
                      {offer.isUrgent ? "عاجل" : offer.category}
                    </Badge>
                    <div className="flex items-center text-sm text-gray-500">
                      <Star className="h-4 w-4 ml-1 fill-yellow-400 text-yellow-400" />
                      {offer.responses} عرض
                    </div>
                  </div>
                  <CardTitle className="text-lg font-bold text-gray-900 leading-relaxed">
                    {offer.title}
                  </CardTitle>
                </CardHeader>
                <CardContent>
                  <div className="space-y-3">
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">الشركة:</span>
                      <span className="font-medium text-gray-900">{offer.company}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">الدولة:</span>
                      <span className="font-medium text-gray-900">{offer.country}</span>
                    </div>
                    <div className="flex items-center justify-between text-sm">
                      <span className="text-gray-600">الميزانية:</span>
                      <span className="font-medium text-red-600">{offer.budget}</span>
                    </div>
                    <Button className="w-full bg-red-600 hover:bg-red-700 text-white mt-4">
                      عرض التفاصيل
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="text-center">
            <Button size="lg" variant="outline" className="border-red-600 text-red-600 hover:bg-red-50">
              عرض جميع الطلبات
            </Button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="flex items-center space-x-3 space-x-reverse mb-6">
                <div className="w-10 h-10 bg-red-600 rounded-full flex items-center justify-center">
                  <div className="text-white font-bold">G</div>
                </div>
                <div>
                  <h3 className="text-xl font-bold" style={{ fontFamily: 'Cairo, sans-serif' }}>
                    GLOBTRADE
                  </h3>
                  <p className="text-sm text-red-400">صانعو الصفقات العالمية</p>
                </div>
              </div>
              <p className="text-gray-400 leading-relaxed">
                منصة التجارة الدولية الرائدة التي تربط المصدرين والمستوردين حول العالم
              </p>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">خدماتنا</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-red-400 transition-colors">تصفح الطلبات</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors">إنشاء طلب</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors">إدارة العروض</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors">نظام المراسلة</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">الدعم</h4>
              <ul className="space-y-2 text-gray-400">
                <li><a href="#" className="hover:text-red-400 transition-colors">مركز المساعدة</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors">اتصل بنا</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors">الأسئلة الشائعة</a></li>
                <li><a href="#" className="hover:text-red-400 transition-colors">سياسة الخصوصية</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-lg font-semibold mb-4">تواصل معنا</h4>
              <div className="space-y-3 text-gray-400">
                <p>البريد الإلكتروني: info@globtrade.com</p>
                <p>الهاتف: +966 11 123 4567</p>
                <p>العنوان: الرياض، المملكة العربية السعودية</p>
              </div>
            </div>
          </div>

          <div className="border-t border-gray-800 pt-8 mt-12 text-center text-gray-400">
            <p>&copy; 2024 GLOBTRADE. جميع الحقوق محفوظة.</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;

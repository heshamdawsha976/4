import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Switch } from "@/components/ui/switch"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { Settings, Shield, Bell, Database, Mail, Globe, Lock, Crown, Save, RefreshCw } from "lucide-react"

export default function AdminSettings() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-pink-50 via-purple-50 to-indigo-50 p-6">
      <div className="max-w-4xl mx-auto space-y-6">
        {/* Header */}
        <div className="flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold font-arabic bg-gradient-to-r from-pink-600 to-purple-600 bg-clip-text text-transparent">
              إعدادات التطبيق
            </h1>
            <p className="text-muted-foreground font-arabic mt-1">إدارة الإعدادات العامة والأمان والتكامل</p>
          </div>
          <div className="flex items-center gap-3">
            <Badge className="bg-gradient-to-r from-yellow-400 to-amber-500 text-white font-arabic">
              <Crown className="w-4 h-4 ml-1" />
              مالك التطبيق
            </Badge>
          </div>
        </div>

        <Tabs defaultValue="general" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 font-arabic">
            <TabsTrigger value="general" className="flex items-center gap-2">
              <Settings className="w-4 h-4" />
              عام
            </TabsTrigger>
            <TabsTrigger value="security" className="flex items-center gap-2">
              <Shield className="w-4 h-4" />
              الأمان
            </TabsTrigger>
            <TabsTrigger value="notifications" className="flex items-center gap-2">
              <Bell className="w-4 h-4" />
              الإشعارات
            </TabsTrigger>
            <TabsTrigger value="integrations" className="flex items-center gap-2">
              <Database className="w-4 h-4" />
              التكامل
            </TabsTrigger>
            <TabsTrigger value="advanced" className="flex items-center gap-2">
              <Lock className="w-4 h-4" />
              متقدم
            </TabsTrigger>
          </TabsList>

          <TabsContent value="general" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-arabic">معلومات التطبيق</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-arabic">اسم التطبيق</Label>
                    <Input defaultValue="لقاء" className="font-arabic" />
                  </div>
                  <div>
                    <Label className="font-arabic">الإصدار</Label>
                    <Input defaultValue="1.0.0" />
                  </div>
                </div>
                <div>
                  <Label className="font-arabic">وصف التطبيق</Label>
                  <Textarea defaultValue="تطبيق الدردشة الاجتماعي الأول في العالم العربي" className="font-arabic" />
                </div>
                <div>
                  <Label className="font-arabic">رابط الموقع</Label>
                  <Input defaultValue="https://liqaa.app" />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-arabic">إعدادات المستخدمين</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-arabic">السماح بالتسجيل الجديد</Label>
                    <p className="text-sm text-muted-foreground font-arabic">السماح للمستخدمين الجدد بإنشاء حسابات</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-arabic">التحقق من البريد الإلكتروني</Label>
                    <p className="text-sm text-muted-foreground font-arabic">
                      يتطلب تأكيد البريد الإلكتروني للحسابات الجديدة
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-arabic">الموافقة اليدوية</Label>
                    <p className="text-sm text-muted-foreground font-arabic">يتطلب موافقة الإدارة للحسابات الجديدة</p>
                  </div>
                  <Switch />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-arabic">إعدادات الغرف</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-arabic">الحد الأقصى للأعضاء (افتراضي)</Label>
                    <Input type="number" defaultValue="100" />
                  </div>
                  <div>
                    <Label className="font-arabic">مدة الرسالة القصوى (ثانية)</Label>
                    <Input type="number" defaultValue="300" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-arabic">السماح بالغرف الخاصة</Label>
                    <p className="text-sm text-muted-foreground font-arabic">السماح للمستخدمين بإنشاء غرف خاصة</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="security" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-arabic">إعدادات الأمان</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-arabic">التحقق بخطوتين</Label>
                    <p className="text-sm text-muted-foreground font-arabic">
                      إجبار المستخدمين على استخدام التحقق بخطوتين
                    </p>
                  </div>
                  <Switch />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-arabic">تشفير الرسائل</Label>
                    <p className="text-sm text-muted-foreground font-arabic">
                      تشفير جميع الرسائل من النهاية إلى النهاية
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-arabic">حماية من البريد المزعج</Label>
                    <p className="text-sm text-muted-foreground font-arabic">تفعيل نظام الحماية من الرسائل المزعجة</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-arabic">سياسات كلمة المرور</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-arabic">الحد الأدنى لطول كلمة المرور</Label>
                    <Input type="number" defaultValue="8" />
                  </div>
                  <div>
                    <Label className="font-arabic">مدة انتهاء كلمة المرور (أيام)</Label>
                    <Input type="number" defaultValue="90" />
                  </div>
                </div>
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-arabic">يتطلب أحرف خاصة</Label>
                    <p className="text-sm text-muted-foreground font-arabic">يجب أن تحتوي كلمة المرور على أحرف خاصة</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="notifications" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-arabic">إعدادات الإشعارات</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-arabic">إشعارات البريد الإلكتروني</Label>
                    <p className="text-sm text-muted-foreground font-arabic">
                      إرسال إشعارات مهمة عبر البريد الإلكتروني
                    </p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-arabic">إشعارات الهاتف المحمول</Label>
                    <p className="text-sm text-muted-foreground font-arabic">إرسال إشعارات فورية للهواتف المحمولة</p>
                  </div>
                  <Switch defaultChecked />
                </div>
                <Separator />
                <div className="flex items-center justify-between">
                  <div>
                    <Label className="font-arabic">إشعارات النشاط المشبوه</Label>
                    <p className="text-sm text-muted-foreground font-arabic">تنبيهات فورية عند اكتشاف نشاط مشبوه</p>
                  </div>
                  <Switch defaultChecked />
                </div>
              </CardContent>
            </Card>

            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-arabic">إعدادات البريد الإلكتروني</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <Label className="font-arabic">خادم SMTP</Label>
                  <Input placeholder="smtp.gmail.com" />
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <Label className="font-arabic">المنفذ</Label>
                    <Input defaultValue="587" />
                  </div>
                  <div>
                    <Label className="font-arabic">التشفير</Label>
                    <Input defaultValue="TLS" />
                  </div>
                </div>
                <div>
                  <Label className="font-arabic">البريد الإلكتروني للمرسل</Label>
                  <Input placeholder="noreply@liqaa.app" />
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="integrations" className="space-y-6">
            <Card className="border-0 shadow-lg">
              <CardHeader>
                <CardTitle className="font-arabic">التكامل مع الخدمات الخارجية</CardTitle>
              </CardHeader>
              <CardContent className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-blue-500 rounded-lg flex items-center justify-center">
                        <Database className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold font-arabic">قاعدة البيانات</h3>
                        <p className="text-sm text-green-600 font-arabic">متصل</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="font-arabic bg-transparent">
                      إعادة تكوين
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-green-500 rounded-lg flex items-center justify-center">
                        <Mail className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold font-arabic">خدمة البريد</h3>
                        <p className="text-sm text-green-600 font-arabic">متصل</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="font-arabic bg-transparent">
                      اختبار الاتصال
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-purple-500 rounded-lg flex items-center justify-center">
                        <Globe className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold font-arabic">CDN</h3>
                        <p className="text-sm text-yellow-600 font-arabic">بطء طفيف</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="font-arabic bg-transparent">
                      تحسين الأداء
                    </Button>
                  </div>

                  <div className="p-4 border rounded-lg">
                    <div className="flex items-center gap-3 mb-3">
                      <div className="w-10 h-10 bg-orange-500 rounded-lg flex items-center justify-center">
                        <Shield className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold font-arabic">الأمان</h3>
                        <p className="text-sm text-green-600 font-arabic">محمي</p>
                      </div>
                    </div>
                    <Button variant="outline" size="sm" className="font-arabic bg-transparent">
                      فحص الأمان
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="advanced" className="space-y-6">
            <Card className="border-0 shadow-lg border-red-200">
              <CardHeader>
                <CardTitle className="font-arabic text-red-600">منطقة الخطر</CardTitle>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="p-4 bg-red-50 rounded-lg border border-red-200">
                  <h3 className="font-bold font-arabic text-red-700 mb-2">إعادة تعيين التطبيق</h3>
                  <p className="text-sm text-red-600 font-arabic mb-4">
                    سيؤدي هذا إلى حذف جميع البيانات وإعادة التطبيق إلى حالته الأولى
                  </p>
                  <Button variant="destructive" className="font-arabic">
                    إعادة تعيين التطبيق
                  </Button>
                </div>

                <div className="p-4 bg-yellow-50 rounded-lg border border-yellow-200">
                  <h3 className="font-bold font-arabic text-yellow-700 mb-2">تصدير البيانات</h3>
                  <p className="text-sm text-yellow-600 font-arabic mb-4">تصدير جميع بيانات التطبيق كنسخة احتياطية</p>
                  <Button variant="outline" className="font-arabic bg-transparent">
                    تصدير البيانات
                  </Button>
                </div>

                <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <h3 className="font-bold font-arabic text-blue-700 mb-2">وضع الصيانة</h3>
                  <p className="text-sm text-blue-600 font-arabic mb-4">تفعيل وضع الصيانة لمنع الوصول مؤقتاً</p>
                  <Button variant="outline" className="font-arabic bg-transparent">
                    تفعيل وضع الصيانة
                  </Button>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>

        {/* Save Button */}
        <div className="flex justify-end gap-3">
          <Button variant="outline" className="font-arabic bg-transparent">
            <RefreshCw className="w-4 h-4 ml-2" />
            إعادة تحميل
          </Button>
          <Button className="font-arabic">
            <Save className="w-4 h-4 ml-2" />
            حفظ جميع التغييرات
          </Button>
        </div>
      </div>
    </div>
  )
}

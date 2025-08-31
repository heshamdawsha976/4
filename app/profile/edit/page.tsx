import { Button } from "@/components/ui/button"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Switch } from "@/components/ui/switch"
import { Separator } from "@/components/ui/separator"
import { ArrowLeft, Camera, Save, User, Globe, Shield, Bell } from "lucide-react"
import Link from "next/link"

export default function EditProfilePage() {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <div className="border-b">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <Link href="/profile">
                <Button variant="ghost" size="icon">
                  <ArrowLeft className="w-5 h-5" />
                </Button>
              </Link>
              <h1 className="text-2xl font-bold font-arabic">تعديل الملف الشخصي</h1>
            </div>
            <Button className="font-arabic">
              <Save className="w-4 h-4 ml-2" />
              حفظ التغييرات
            </Button>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-8">
          {/* Profile Picture */}
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic flex items-center gap-2">
                <Camera className="w-5 h-5" />
                الصورة الشخصية
              </CardTitle>
            </CardHeader>
            <CardContent>
              <div className="flex items-center gap-6">
                <div className="relative">
                  <Avatar className="w-24 h-24">
                    <AvatarImage src="/arabic-user-avatar.png" />
                    <AvatarFallback className="text-xl font-arabic">أح</AvatarFallback>
                  </Avatar>
                  <Button size="icon" className="absolute -bottom-2 -right-2 rounded-full">
                    <Camera className="w-4 h-4" />
                  </Button>
                </div>
                <div className="space-y-2">
                  <Button variant="outline" className="font-arabic bg-transparent">
                    تغيير الصورة
                  </Button>
                  <Button variant="ghost" className="font-arabic text-destructive">
                    حذف الصورة
                  </Button>
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Basic Information */}
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic flex items-center gap-2">
                <User className="w-5 h-5" />
                المعلومات الأساسية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="firstName" className="font-arabic">
                    الاسم الأول
                  </Label>
                  <Input id="firstName" defaultValue="أحمد" className="font-arabic text-right" dir="rtl" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName" className="font-arabic">
                    اسم العائلة
                  </Label>
                  <Input id="lastName" defaultValue="محمد الثقافي" className="font-arabic text-right" dir="rtl" />
                </div>
              </div>

              <div className="space-y-2">
                <Label htmlFor="username" className="font-arabic">
                  اسم المستخدم
                </Label>
                <Input id="username" defaultValue="ahmed_thaqafi" className="text-right" dir="rtl" />
              </div>

              <div className="space-y-2">
                <Label htmlFor="bio" className="font-arabic">
                  النبذة الشخصية
                </Label>
                <Textarea
                  id="bio"
                  defaultValue="كاتب ومثقف عربي، أحب مناقشة التراث والأدب العربي"
                  className="font-arabic text-right min-h-[100px]"
                  dir="rtl"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="country" className="font-arabic">
                    الدولة
                  </Label>
                  <Select defaultValue="egypt">
                    <SelectTrigger className="font-arabic">
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="egypt" className="font-arabic">
                        مصر
                      </SelectItem>
                      <SelectItem value="saudi" className="font-arabic">
                        السعودية
                      </SelectItem>
                      <SelectItem value="uae" className="font-arabic">
                        الإمارات
                      </SelectItem>
                      <SelectItem value="jordan" className="font-arabic">
                        الأردن
                      </SelectItem>
                      <SelectItem value="lebanon" className="font-arabic">
                        لبنان
                      </SelectItem>
                      <SelectItem value="kuwait" className="font-arabic">
                        الكويت
                      </SelectItem>
                      <SelectItem value="qatar" className="font-arabic">
                        قطر
                      </SelectItem>
                      <SelectItem value="bahrain" className="font-arabic">
                        البحرين
                      </SelectItem>
                      <SelectItem value="oman" className="font-arabic">
                        عمان
                      </SelectItem>
                      <SelectItem value="iraq" className="font-arabic">
                        العراق
                      </SelectItem>
                      <SelectItem value="syria" className="font-arabic">
                        سوريا
                      </SelectItem>
                      <SelectItem value="morocco" className="font-arabic">
                        المغرب
                      </SelectItem>
                      <SelectItem value="tunisia" className="font-arabic">
                        تونس
                      </SelectItem>
                      <SelectItem value="algeria" className="font-arabic">
                        الجزائر
                      </SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="space-y-2">
                  <Label htmlFor="city" className="font-arabic">
                    المدينة
                  </Label>
                  <Input id="city" defaultValue="القاهرة" className="font-arabic text-right" dir="rtl" />
                </div>
              </div>
            </CardContent>
          </Card>

          {/* Contact Information */}
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic flex items-center gap-2">
                <Globe className="w-5 h-5" />
                معلومات الاتصال
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="email" className="font-arabic">
                  البريد الإلكتروني
                </Label>
                <Input id="email" type="email" defaultValue="ahmed@example.com" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="phone" className="font-arabic">
                  رقم الهاتف
                </Label>
                <Input id="phone" defaultValue="+20 123 456 7890" />
              </div>
              <div className="space-y-2">
                <Label htmlFor="website" className="font-arabic">
                  الموقع الشخصي
                </Label>
                <Input id="website" placeholder="https://example.com" />
              </div>
            </CardContent>
          </Card>

          {/* Privacy Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic flex items-center gap-2">
                <Shield className="w-5 h-5" />
                إعدادات الخصوصية
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="font-arabic">إظهار الملف الشخصي للعامة</Label>
                  <p className="text-sm text-muted-foreground font-arabic">السماح للآخرين برؤية ملفك الشخصي</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="font-arabic">إظهار الأنشطة</Label>
                  <p className="text-sm text-muted-foreground font-arabic">عرض نشاطاتك الأخيرة للأصدقاء</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="font-arabic">السماح بالرسائل الخاصة</Label>
                  <p className="text-sm text-muted-foreground font-arabic">تلقي رسائل من المستخدمين الآخرين</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="font-arabic">إظهار الحالة الاتصال</Label>
                  <p className="text-sm text-muted-foreground font-arabic">عرض ما إذا كنت متصلاً أم لا</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Notification Settings */}
          <Card>
            <CardHeader>
              <CardTitle className="font-arabic flex items-center gap-2">
                <Bell className="w-5 h-5" />
                إعدادات الإشعارات
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="font-arabic">إشعارات الغرف</Label>
                  <p className="text-sm text-muted-foreground font-arabic">تلقي إشعارات عند بدء غرف جديدة</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="font-arabic">إشعارات الرسائل</Label>
                  <p className="text-sm text-muted-foreground font-arabic">تلقي إشعارات عند وصول رسائل جديدة</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="font-arabic">إشعارات الهدايا</Label>
                  <p className="text-sm text-muted-foreground font-arabic">تلقي إشعارات عند تلقي هدايا</p>
                </div>
                <Switch defaultChecked />
              </div>

              <Separator />

              <div className="flex items-center justify-between">
                <div className="space-y-1">
                  <Label className="font-arabic">إشعارات الأصدقاء</Label>
                  <p className="text-sm text-muted-foreground font-arabic">تلقي إشعارات عند طلبات الصداقة الجديدة</p>
                </div>
                <Switch defaultChecked />
              </div>
            </CardContent>
          </Card>

          {/* Action Buttons */}
          <div className="flex gap-4">
            <Button className="flex-1 font-arabic">
              <Save className="w-4 h-4 ml-2" />
              حفظ التغييرات
            </Button>
            <Link href="/profile">
              <Button variant="outline" className="font-arabic bg-transparent">
                إلغاء
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}

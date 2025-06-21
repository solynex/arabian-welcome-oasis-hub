
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { MessageSquare, User, Eye, Send } from 'lucide-react';
import { Textarea } from "@/components/ui/textarea";

interface Message {
  id: number;
  senderName: string;
  senderType: 'importer' | 'exporter';
  requestTitle: string;
  content: string;
  date: string;
  isRead: boolean;
}

interface MessagesPanelProps {
  userType: 'importer' | 'exporter';
}

const MessagesPanel = ({ userType }: MessagesPanelProps) => {
  const [selectedMessage, setSelectedMessage] = useState<Message | null>(null);
  const [replyText, setReplyText] = useState('');

  const mockMessages: Message[] = [
    {
      id: 1,
      senderName: 'شركة التصدير العالمية',
      senderType: userType === 'importer' ? 'exporter' : 'importer',
      requestTitle: 'مطلوب استيراد أجهزة كمبيوتر محمولة',
      content: 'مرحباً، نحن مهتمون بطلبكم لاستيراد أجهزة الكمبيوتر المحمولة. لدينا خبرة 15 عاماً في هذا المجال ويمكننا توفير أفضل الأسعار والجودة.',
      date: '2024-01-15',
      isRead: false
    },
    {
      id: 2,
      senderName: 'مؤسسة الشرق الأوسط',
      senderType: userType === 'importer' ? 'exporter' : 'importer',
      requestTitle: 'بحث عن موردين للمواد الخام',
      content: 'نود التواصل معكم بخصوص طلب المواد الخام. نحن نوفر مواد عالية الجودة مع شهادات الجودة الدولية.',
      date: '2024-01-12',
      isRead: true
    },
    {
      id: 3,
      senderName: 'شركة المعدات الطبية المتطورة',
      senderType: userType === 'importer' ? 'exporter' : 'importer',
      requestTitle: 'استيراد معدات طبية متخصصة',
      content: 'بخصوص طلبكم للمعدات الطبية، لدينا جميع الشهادات المطلوبة وخبرة في التصدير للشرق الأوسط.',
      date: '2024-01-10',
      isRead: true
    }
  ];

  const handleViewProfile = (senderName: string) => {
    alert(`عرض ملف ${senderName} - سيتم تطوير هذه الميزة لاحقاً`);
  };

  const handleSendReply = () => {
    if (replyText.trim()) {
      alert('تم إرسال الرد بنجاح');
      setReplyText('');
      setSelectedMessage(null);
    }
  };

  if (selectedMessage) {
    return (
      <Card className="h-full">
        <CardHeader>
          <div className="flex items-center justify-between">
            <div>
              <CardTitle className="flex items-center space-x-2 space-x-reverse">
                <MessageSquare className="h-5 w-5" />
                <span>محادثة مع {selectedMessage.senderName}</span>
              </CardTitle>
              <CardDescription>بخصوص: {selectedMessage.requestTitle}</CardDescription>
            </div>
            <Button variant="outline" onClick={() => setSelectedMessage(null)}>
              العودة للرسائل
            </Button>
          </div>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="bg-gray-50 p-4 rounded-lg">
            <div className="flex items-center space-x-2 space-x-reverse mb-2">
              <Avatar className="h-8 w-8">
                <AvatarFallback>{selectedMessage.senderName[0]}</AvatarFallback>
              </Avatar>
              <div>
                <p className="font-medium">{selectedMessage.senderName}</p>
                <p className="text-sm text-gray-500">{selectedMessage.date}</p>
              </div>
            </div>
            <p className="text-gray-700">{selectedMessage.content}</p>
          </div>

          <div className="flex space-x-2 space-x-reverse">
            <Button variant="outline" onClick={() => handleViewProfile(selectedMessage.senderName)}>
              <User className="ml-2 h-4 w-4" />
              عرض الملف الشخصي
            </Button>
          </div>

          <div className="space-y-2">
            <label className="text-sm font-medium">الرد على الرسالة</label>
            <Textarea
              value={replyText}
              onChange={(e) => setReplyText(e.target.value)}
              placeholder="اكتب ردك هنا..."
              rows={4}
            />
            <Button onClick={handleSendReply} className="bg-red-600 hover:bg-red-700">
              <Send className="ml-2 h-4 w-4" />
              إرسال الرد
            </Button>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center space-x-2 space-x-reverse">
          <MessageSquare className="h-5 w-5" />
          <span>الرسائل</span>
          <Badge variant="destructive" className="mr-2">
            {mockMessages.filter(m => !m.isRead).length}
          </Badge>
        </CardTitle>
        <CardDescription>
          {userType === 'importer' 
            ? 'رسائل من المصدرين المهتمين بطلباتك' 
            : 'رسائل من المستوردين'}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          {mockMessages.map((message) => (
            <div
              key={message.id}
              className={`p-4 border rounded-lg cursor-pointer hover:bg-gray-50 ${
                !message.isRead ? 'border-red-200 bg-red-50' : ''
              }`}
              onClick={() => setSelectedMessage(message)}
            >
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2 space-x-reverse">
                  <Avatar className="h-8 w-8">
                    <AvatarFallback>{message.senderName[0]}</AvatarFallback>
                  </Avatar>
                  <div>
                    <p className="font-medium">{message.senderName}</p>
                    <p className="text-sm text-gray-500">{message.date}</p>
                  </div>
                </div>
                {!message.isRead && (
                  <Badge variant="destructive" className="text-xs">جديد</Badge>
                )}
              </div>
              <p className="text-sm font-medium text-gray-700 mb-1">
                بخصوص: {message.requestTitle}
              </p>
              <p className="text-sm text-gray-600 line-clamp-2">
                {message.content}
              </p>
              <div className="flex justify-end mt-2">
                <Button variant="outline" size="sm">
                  <Eye className="ml-2 h-3 w-3" />
                  قراءة والرد
                </Button>
              </div>
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
};

export default MessagesPanel;

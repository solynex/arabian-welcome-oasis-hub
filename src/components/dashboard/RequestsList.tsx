
import React, { useState } from 'react';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Eye, Edit, Trash2, MessageSquare } from 'lucide-react';

interface Request {
  id: number;
  title: string;
  status: string;
  offers: number;
  date: string;
  category: string;
  budget: string;
}

interface RequestsListProps {
  onEditRequest?: (request: Request) => void;
}

const RequestsList = ({ onEditRequest }: RequestsListProps) => {
  const [requests, setRequests] = useState<Request[]>([
    {
      id: 1,
      title: 'مطلوب استيراد أجهزة كمبيوتر محمولة',
      status: 'نشط',
      offers: 15,
      date: '2024-01-15',
      category: 'إلكترونيات',
      budget: '50,000 - 100,000 دولار'
    },
    {
      id: 2,
      title: 'بحث عن موردين للمواد الخام للبلاستيك',
      status: 'قيد المراجعة',
      offers: 8,
      date: '2024-01-10',
      category: 'مواد خام',
      budget: '25,000 - 75,000 دولار'
    },
    {
      id: 3,
      title: 'استيراد معدات طبية متخصصة',
      status: 'مكتمل',
      offers: 23,
      date: '2024-01-05',
      category: 'معدات طبية',
      budget: '100,000+ دولار'
    }
  ]);

  const handleDeleteRequest = (id: number) => {
    if (confirm('هل أنت متأكد من حذف هذا الطلب؟')) {
      setRequests(requests.filter(req => req.id !== id));
    }
  };

  const handleViewOffers = (requestTitle: string, offersCount: number) => {
    alert(`عرض ${offersCount} عرض مستلم لطلب: ${requestTitle}`);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'نشط': return 'default';
      case 'مكتمل': return 'secondary';
      case 'قيد المراجعة': return 'outline';
      default: return 'outline';
    }
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle>طلباتي</CardTitle>
        <CardDescription>إدارة جميع طلبات الاستيراد الخاصة بك</CardDescription>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>عنوان الطلب</TableHead>
                <TableHead>التصنيف</TableHead>
                <TableHead>الحالة</TableHead>
                <TableHead>العروض</TableHead>
                <TableHead>التاريخ</TableHead>
                <TableHead>الميزانية</TableHead>
                <TableHead>الإجراءات</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {requests.map((request) => (
                <TableRow key={request.id}>
                  <TableCell className="font-medium">{request.title}</TableCell>
                  <TableCell>{request.category}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusColor(request.status) as any}>
                      {request.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    <Button
                      variant="link"
                      className="p-0 h-auto text-red-600"
                      onClick={() => handleViewOffers(request.title, request.offers)}
                    >
                      {request.offers} عرض
                    </Button>
                  </TableCell>
                  <TableCell>{request.date}</TableCell>
                  <TableCell>{request.budget}</TableCell>
                  <TableCell>
                    <div className="flex space-x-1 space-x-reverse">
                      <Button variant="outline" size="sm">
                        <Eye className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <Edit className="h-3 w-3" />
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        onClick={() => handleDeleteRequest(request.id)}
                      >
                        <Trash2 className="h-3 w-3" />
                      </Button>
                      <Button variant="outline" size="sm">
                        <MessageSquare className="h-3 w-3" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
};

export default RequestsList;

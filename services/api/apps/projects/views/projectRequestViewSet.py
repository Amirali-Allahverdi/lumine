from rest_framework.viewsets import ModelViewSet
from ..serializer import ProjectRequestSerializer
from rest_framework.permissions import IsAuthenticated
from core.apiResponse.apiResponse import ApiResponse
from ..models import Project, ProjectRequest
from apps.authentication.models import User
from django.db.models import Q
from core.permissions.IsRequestSendererPermission import IsRequestSenderer
from core.permissions.IsRequestReceiverPermission import IsRequestReceiverer


class ProjectRequestView(ModelViewSet):
    serializer_class = ProjectRequestSerializer
    permission_classes = [IsAuthenticated]
    
    def get_queryset(self):
        user = self.request.user
        queryset = ProjectRequest.objects.filter(Q(sender=user) | Q(receiver=user))

        this_sender = self.request.query_params.get("sender")
        this_receiver = self.request.query_params.get("receiver")
        status = self.request.query_params.get("status")

        if this_sender and not status:
            queryset = ProjectRequest.objects.filter(sender=user)
        elif this_receiver and not status:
            queryset = ProjectRequest.objects.filter(receiver=user)
        elif status and not this_receiver and not this_sender:
            queryset = queryset.filter(status=status)
        elif this_sender and status:
            queryset = ProjectRequest.objects.filter(sender=user, status=status)
        elif this_receiver and status:
            queryset = ProjectRequest.objects.filter(receiver=user, status=status)
        return queryset
    
    def get_permissions(self):
        if self.action in ["destroy", ]:
            return [IsAuthenticated(), IsRequestSenderer()]
        elif self.action in ["partial_update"]:  
            return [IsAuthenticated(), IsRequestReceiverer()]
        return [IsAuthenticated()]
    
    def get_object(self):
        obj = super().get_object()
        user = self.request.user

        if obj.sender != user and obj.receiver != user:
            return ApiResponse.error(
                message="شما دسترسی به این درخواست را ندارید"
            )
        return obj

    def update(self, request, *args, **kwargs):
        return ApiResponse.error(
            message="برای فعلا این بخش وجود ندارد (درحال اپدیت)"
        )

    def partial_update(self, request, *args, **kwargs):
        req = self.get_object()
        serializer = self.get_serializer(req, data=request.data, partial=True)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return ApiResponse.success(
            message="در خواست با موفقیت قبول شد",
            data=serializer.data
        )
    
    def create(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)

        sender = self.request.user
        if "receiver" not in request.data:
            try:
                project = Project.objects.get(id=self.request.data['project'])
                receiver = project.employer
            except:
                return ApiResponse.error(
                    message="پروژه فوق وجود ندارد"
                )
        else:
            try:
                receiver = User.objects.get(id=self.request.data['receiver'])
            except:
                return ApiResponse.error(
                    message="کاربر مد نظر وجود ندارد"
                )
            

        serializer.save(sender=sender, receiver=receiver)

        return ApiResponse.success(
            message="project request send successfully",
            data=serializer.data
        )
    
    def destroy(self, request, *args, **kwargs):
        req = self.get_object()
        
        if req.status in ["accepted"]:
            return ApiResponse.error(
                message="درخواست قبول شده را نمیتوانید حذف کنید"
            )

        req_id = req.id
        req.delete()

        return ApiResponse.success(
            message="درخواست با موفقیت حذف شد",
            data={
                "id": req_id
            }
        )
    
    def retrieve(self, request, *args, **kwargs):
        obj = self.get_object()
        serializer = self.get_serializer(obj)

        return ApiResponse.success(
            message="feched data successfully",
            data=serializer.data
        )
    
    def list(self, request, *args, **kwargs):
        queryset = self.get_queryset()

        page = self.paginate_queryset(queryset)
        if page is not None:
            serializer = self.get_serializer(page, many=True)
            return ApiResponse.success(
                message="requests fetched successfully",
                data=serializer.data
            )

        serializer = self.get_serializer(queryset, many=True)

        return ApiResponse.success(
            message="همه درخواست های کاربر با موفقیت فچ شد",
            data=serializer.data
        )

        
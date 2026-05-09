from django.core.management.base import BaseCommand
from ....authentication.models import Category


class Command(BaseCommand):
    help = "افزودن دسته‌بندی‌های پایه به سیستم"

    def handle(self, *args, **options):

        categories_data = [

            # ========================
            #       MODEL
            # ========================
            {"name": "fashion", "persion_name": "فشن", "type": "model"},
            {"name": "runway", "persion_name": "کت‌واک / رانوی", "type": "model"},
            {"name": "editorial", "persion_name": "ادیتوریال", "type": "model"},
            {"name": "commercial", "persion_name": "تجاری", "type": "model"},
            {"name": "beauty", "persion_name": "زیبایی", "type": "model"},
            {"name": "fitness", "persion_name": "فیتنس", "type": "model"},
            {"name": "sportswear", "persion_name": "ورزشی", "type": "model"},
            {"name": "formalwear", "persion_name": "رسمی", "type": "model"},
            {"name": "casual", "persion_name": "روزمره", "type": "model"},
            {"name": "lifestyle", "persion_name": "لایف‌استایل", "type": "model"},
            {"name": "streetwear", "persion_name": "استریت‌ویر", "type": "model"},
            {"name": "lookbook", "persion_name": "لوک‌بوک", "type": "model"},
            {"name": "product", "persion_name": "مدلینگ محصول", "type": "model"},
            {"name": "ecommerce", "persion_name": "ای‌کامرس", "type": "model"},
            {"name": "advertising", "persion_name": "تبلیغاتی", "type": "model"},
            {"name": "campaign", "persion_name": "کمپین", "type": "model"},
            {"name": "accessories", "persion_name": "اکسسوری", "type": "model"},
            {"name": "underwear", "persion_name": "لباس زیر", "type": "model"},
            {"name": "swimwear", "persion_name": "مایو / شنا", "type": "model"},
            {"name": "hand_modeling", "persion_name": "مدل دست", "type": "model"},
            {"name": "foot_modeling", "persion_name": "مدل پا", "type": "model"},
            {"name": "plus_size", "persion_name": "پلاس‌سایز", "type": "model"},
            {"name": "kids_modeling", "persion_name": "مدلینگ کودک", "type": "model"},
            {"name": "senior_modeling", "persion_name": "مدلینگ سالمندان", "type": "model"},
            {"name": "alternative_modeling", "persion_name": "مدلینگ تتو / آلترناتیو", "type": "model"},
            {"name": "others", "persion_name": "سایر", "type": "model"},

            # ========================
            #       INSTRUCTOR
            # ========================
            {"name": "runway_training", "persion_name": "آموزش کت‌واک", "type": "instructor"},
            {"name": "posing", "persion_name": "تکنیک‌های پوزینگ", "type": "instructor"},
            {"name": "facial_expressions", "persion_name": "بیان چهره", "type": "instructor"},
            {"name": "acting_for_models", "persion_name": "بازیگری برای مدل‌ها", "type": "instructor"},
            {"name": "portfolio_building", "persion_name": "ساخت پورتفولیو", "type": "instructor"},
            {"name": "casting_preparation", "persion_name": "آمادگی تست", "type": "instructor"},
            {"name": "body_language", "persion_name": "زبان بدن", "type": "instructor"},
            {"name": "confidence_training", "persion_name": "تقویت اعتماد به نفس", "type": "instructor"},

            {"name": "makeup", "persion_name": "میکاپ", "type": "instructor"},
            {"name": "skincare", "persion_name": "مراقبت پوست", "type": "instructor"},
            {"name": "hair_styling", "persion_name": "استایل مو", "type": "instructor"},
            {"name": "grooming", "persion_name": "گرومینگ", "type": "instructor"},
            {"name": "fashion_styling", "persion_name": "استایلینگ", "type": "instructor"},
            {"name": "personal_branding", "persion_name": "برندسازی شخصی", "type": "instructor"},

            {"name": "model_photography", "persion_name": "عکاسی مدل", "type": "instructor"},
            {"name": "lighting", "persion_name": "مبانی نورپردازی", "type": "instructor"},
            {"name": "camera_presence", "persion_name": "حضور جلوی دوربین", "type": "instructor"},
            {"name": "video_modeling", "persion_name": "مدلینگ ویدئویی", "type": "instructor"},
            {"name": "social_media", "persion_name": "آموزش شبکه‌های اجتماعی", "type": "instructor"},

            {"name": "fitness_coaching", "persion_name": "مربیگری فیتنس", "type": "instructor"},
            {"name": "nutrition", "persion_name": "تغذیه", "type": "instructor"},
            {"name": "yoga", "persion_name": "یوگا برای مدل‌ها", "type": "instructor"},

            # ========================
            #       EMPLOYER
            # ========================
            {"name": "fashion_show", "persion_name": "شوی فشن", "type": "employer"},
            {"name": "runway_event", "persion_name": "رویداد رانوی", "type": "employer"},
            {"name": "lookbook_shoot", "persion_name": "عکاسی لوک‌بوک", "type": "employer"},
            {"name": "designer_showcase", "persion_name": "شوی طراح", "type": "employer"},

            {"name": "editorial_shoot", "persion_name": "عکاسی ادیتوریال", "type": "employer"},
            {"name": "ecommerce_shoot", "persion_name": "عکاسی ای‌کامرس", "type": "employer"},
            {"name": "catalog_shoot", "persion_name": "عکاسی کاتالوگ", "type": "employer"},
            {"name": "product_photography", "persion_name": "عکاسی محصول", "type": "employer"},
            {"name": "lifestyle_shoot", "persion_name": "عکاسی لایف‌استایل", "type": "employer"},

            {"name": "tv_commercial", "persion_name": "تیزر تلویزیونی", "type": "employer"},
            {"name": "online_advertising", "persion_name": "تبلیغات آنلاین", "type": "employer"},
            {"name": "brand_campaign", "persion_name": "کمپین برند", "type": "employer"},
            {"name": "billboard_campaign", "persion_name": "کمپین بیلبورد", "type": "employer"},

            {"name": "music_video", "persion_name": "موزیک ویدئو", "type": "employer"},
            {"name": "short_film", "persion_name": "فیلم کوتاه", "type": "employer"},
            {"name": "acting_role", "persion_name": "نقش بازیگری", "type": "employer"},

            {"name": "instagram_campaign", "persion_name": "کمپین اینستاگرام", "type": "employer"},
            {"name": "influencer_collab", "persion_name": "همکاری اینفلوئنسری", "type": "employer"},
            {"name": "ugc_content", "persion_name": "محتوای UGC", "type": "employer"},
        ]

        for data in categories_data:
            obj, created = Category.objects.get_or_create(
                name=data["name"],
                defaults={
                    "persion_name": data["persion_name"],
                    "type": data["type"],
                },
            )
            if created:
                self.stdout.write(self.style.SUCCESS(f'✔ {obj.name} اضافه شد'))
            else:
                self.stdout.write(self.style.WARNING(f'⚠ {obj.name} از قبل وجود دارد'))

        self.stdout.write(self.style.SUCCESS("✅ تمامی دسته‌بندی‌ها با موفقیت ثبت شدند"))

# پروژه Bookstore با Supabase

## بخش ۱: طراحی و پیاده‌سازی پایگاه داده
در این پروژه، دو جدول به نام‌های `Books` و `Authors` در پایگاه داده Supabase طراحی شده‌اند.

- جدول `Books`: شامل ستون‌های `book_id` (کلید اصلی)، `title`، `author_id` (کلید خارجی به جدول `Authors`)، `price` و `publish_date` می‌باشد.
- جدول `Authors`: شامل ستون‌های `author_id` (کلید اصلی)، `name` و `country` می‌باشد.

همچنین برای `author_id` در جدول `Books`، ارتباط کلید خارجی به درستی تنظیم شده است.

## بخش ۲: پیاده‌سازی RESTful API
دو endpoint پیاده‌سازی شده است:

1. **`/books`**: برای دریافت لیست کتاب‌ها
    - قابلیت‌های این endpoint:
        - فیلتر کردن کتاب‌ها بر اساس `author_id`
        - مرتب‌سازی کتاب‌ها بر اساس `publish_date`
        - پشتیبانی از pagination با پارامترهای `limit` و `page`
        - دسترسی تنها برای کاربران احراز هویت شده

2. **`/advancedQueries`**: برای انجام کوئری‌های پیچیده SQL
    - قابلیت‌های این endpoint:
        - پیدا کردن نویسندگانی که بیش از ۵ کتاب منتشر کرده‌اند.
        - محاسبه میانگین قیمت کتاب‌ها بر اساس کشور نویسنده.
        - دریافت لیست کتاب‌ها بر اساس سال انتشار و مرتب‌سازی بر اساس قیمت.

### نحوه استفاده:
- برای درخواست GET به `/books` می‌توانید از پارامترهای اختیاری `author_id`، `limit` و `page` استفاده کنید.
- برای درخواست GET به `/advancedQueries` باید نوع کوئری (مثلاً `authorsWithMoreBooks` یا `avgBookPriceByCountry`) را مشخص کنید.
- امنیت از طریق توکن JWT پیاده‌سازی شده است و تنها کاربران احراز هویت شده به اطلاعات دسترسی دارند.

## بخش ۳: کوئری‌های پیشرفته SQL
کوئری‌های زیر در فایل `sql/queries.sql` قرار دارند:
1. پیدا کردن نویسندگانی که بیش از ۵ کتاب منتشر کرده‌اند.
2. محاسبه میانگین قیمت کتاب‌ها بر اساس کشور نویسنده.
3. دریافت لیست کتاب‌ها به همراه نام نویسنده، مرتب شده بر اساس قیمت نزولی و فیلتر بر اساس سال انتشار.

## ساختار پروژه

- **`supabase/functions/advancedQueries/index.ts`**: حاوی کد مربوط به endpoint `advancedQueries` و کوئری‌های پیچیده SQL.
- **`supabase/functions/getBooks/index.ts`**: حاوی کد مربوط به endpoint `getBooks` برای دریافت لیست کتاب‌ها با امکان فیلتر و pagination.
- **`sql/queries.sql`**: حاوی کوئری‌های SQL مورد استفاده در endpoint‌های پیشرفته.

## تنظیمات محیطی (Environment Variables)

برای اجرای صحیح پروژه، فایل `.env` باید شامل موارد زیر باشد:

```env
SUPABASE_URL="<آدرس Supabase شما>"
SUPABASE_SERVICE_KEY="<کلید Supabase شما>"

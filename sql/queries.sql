-- کوئری 1: پیدا کردن نویسندگانی که بیش از ۵ کتاب منتشر کرده‌اند
SELECT name, COUNT(*) AS book_count
FROM Authors
JOIN Books ON Authors.author_id = Books.author_id
GROUP BY Authors.name
HAVING COUNT(*) > 5;

-- کوئری 2: محاسبه میانگین قیمت کتاب‌ها بر اساس کشور نویسنده
SELECT Authors.country, AVG(Books.price) AS avg_price
FROM Books
JOIN Authors ON Authors.author_id = Books.author_id
GROUP BY Authors.country;

-- کوئری 3: دریافت لیست کتاب‌ها به همراه نام نویسنده، مرتب شده بر اساس قیمت نزولی و فیلتر بر اساس سال انتشار
SELECT Books.title, Books.price, Books.publish_date, Authors.name
FROM Books
JOIN Authors ON Authors.author_id = Books.author_id
WHERE EXTRACT(YEAR FROM Books.publish_date) = ${year}
ORDER BY Books.price DESC;

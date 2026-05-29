E-Commerce Website using HTML CSS JS + Python CGI + PostgreSQL

Features:
1. User Register
2. User Login
3. Product list from PostgreSQL
4. Add to Cart using JavaScript localStorage
5. Cart quantity update/remove/clear
6. Checkout and save order in PostgreSQL

Setup:
1. Install psycopg2:
   pip install psycopg2-binary

2. Open PostgreSQL and run sql/database.sql.

3. Update password in cgi-bin/db_config.py

4. Run project from main folder:
   python -m http.server --cgi 8000

5. Open:
   http://localhost:8000/html/index.html

Important:
If CGI does not run, check Python path in first line of CGI files:
#!C:/Python312/python.exe
Change it according to your Python installation.

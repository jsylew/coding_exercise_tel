# How To Run

## Setup Database

Create a new MySQL database with `db.sql`

## Setup Flask

Navigate to `backend` folder and run `pip install -r requirements.txt` in a new virtual environment. Create a new `.env` file and add the following line:

```
MYSQL_URI = "link to the mysql database"
```

## Run Project

1. Start MySQL connection.
2. Navigate to `backend` folder and run `python app.py`
3. Navigate to `frontend` folder and run `npm run start`

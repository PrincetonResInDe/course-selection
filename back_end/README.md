# Backend

## Getting Started

I assume that you have Python 3.8 setup and everything is from the current directory.

Set up virtual environment (Optional but *STRONGLY* Recommended):
```
python -m venv env
```

Install the required packages:
```
pip install -r requirements.txt
```

Create an file called ".env" and add the MongoDB access string in (asked Howard if you need this):
```
echo STRINGHERE > .env
```

Make sure that everything is set up correctly by running the setup test:
```
python setup_test.py
```
You should see some outputs, and as long as you didn't fail any asserts then you are fine.

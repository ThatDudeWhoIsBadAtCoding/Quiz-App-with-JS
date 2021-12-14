from requests import session
import json
import sys
url = "https://opentdb.com/api.php?amount=10&type=multiple"
ses = session()
resp = ses.get(url).json()

print(json.dumps(resp, indent=3))
sys.stdout.flush()

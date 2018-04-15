import requests
import datetime
import json
import datetime
import hashlib
import html

BASE = 'https://wisopt.com/v2'

messageId = '6046'
userid = '4260'
token = 'mytoken'
r = requests.post(BASE + '/getreply', data = {'userId':userid, 'token': token, 'messageId': messageId})

time = str(datetime.datetime.now())

if r.status_code != 200:
	with open('error.log', 'w') as f:
		f.write("errored at %s", time)
	exit(1)

with open('data.raw', 'wb') as f:
	f.write(r.content)

data = r.json()
messages = []

if 'reply' in data:
	for m in data['reply']:
		msg = html.escape(m['reply_message'])
		gender = m['gender']
		sender = hashlib.md5(m['reg_id'].encode('utf-8')).hexdigest()[0:10]
		reply_time = m['reply_time']
		r_type = m['r_type']

		ded = False
		if m['name'].endswith("(Deactivated)"):
			ded = True

		messages.append( (sender, gender, msg, reply_time, r_type, ded) )

	with open('public/data.json', 'w') as outfile:
		json.dump({'time':time, 'messages': messages}, outfile)


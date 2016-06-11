from pymongo import MongoClient
import json
from flask import jsonify

client = MongoClient('127.11.109.130', 27017)
client.pytdl.authenticate('admin', 'gvsjKpXpHuJM')
db = client.pytdl

class func(object):
	
	def insDB(self, tdl):
		insertDb = {'activity' : tdl}
		inside = db.tdltbl.insert(insertDb)
		return(tdl)

	def selDB(self, tdl):
		queryDb = db.tdltbl.find()
		qlist = []
		for a in queryDb:
			qlist.append(a)
		return(str(qlist))

	def updDB(self, tdl, ptdl):
		result = db.tdltbl.update( #upate_many/replace_one/replace_many
			{"activity": ptdl},
			{
				"$set": {
					"activity": tdl
				}
			}
		)
		return(ptdl + tdl)

	def delDB(self, tdl):
		result = db.tdltbl.remove({'activity': tdl})
		return(tdl)



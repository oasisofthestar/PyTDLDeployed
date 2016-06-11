from flask import Flask, render_template, request, redirect, url_for
from app import app
from app import func

apicall = func.func()

@app.route("/", methods=['POST', 'GET'])
def indexd():
	return render_template("index.html")

@app.route('/index')
def index():
	return render_template('index.html')

@app.route('/edit')
def edit():
	return render_template('edit.html')

@app.route("/insDB", methods=["POST"])
def callInsert():
	tdl  = request.form['var']
	return apicall.insDB(tdl)
	#return redirect(url_for('edit'))

@app.route("/selDB", methods=["POST"])
def callSelect():
	tdl  = request.form['var']
	return apicall.selDB(tdl)

@app.route("/delDB", methods=["POST"])
def callDelete():
	tdl  = request.form['var']
	return apicall.delDB(tdl)

@app.route("/updDB", methods=["POST"])
def callUpdate():
	tdl  = request.form['var']
	ptdl = request.form['pval']
	return apicall.updDB(tdl, ptdl)

if __name__ == "__main__":
    app.run()

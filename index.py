import os
from flask import Flask, render_template,redirect,url_for,request
from flask import jsonify
import subprocess
app=Flask(__name__)
@app.route("/",methods=["POST","GET"])
def index():
    if request.method == "POST":
        return redirect(url_for("search"))
    else:
        with open("static/history.txt","w") as file:
            file.write("")
        return render_template("home-page.html")


@app.route("/search", methods=["POST","GET"])
def search():
    if request.method == "POST":
        inp = request.form["searchQueryInput"]
        #if inp is sentence convert into words and append it to list
        words = inp.split(" ")
        prompt = ["ollama","run","initium/law_model","with","reference","to","indian","penal","code","give","me","my","rights"]
        for word in words:
            prompt.append(word)
        output = subprocess.run(prompt,capture_output=True,text=True)
        with open("static/history.txt", "a") as file:
            file.write(inp+"|"+output.stdout+"$")
        
        return redirect(url_for("search"))
    else:
        return render_template("index.html")



if __name__=="__main__":
    app.run()
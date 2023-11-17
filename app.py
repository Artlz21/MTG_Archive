from flask import Flask, render_template, redirect

app = Flask(__name__)

@app.route('/')
def hello():
    return redirect('/home')

# use <> for variables it will use the end portion of the href from anchors(a)
@app.route('/home')
def user():
    return render_template('index.html')

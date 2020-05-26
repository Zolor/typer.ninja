# Copyright 2018 Google LLC
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#     http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

from flask import Flask, render_template, jsonify
import random

# If `entrypoint` is not defined in app.yaml, App Engine will look for an app
# called `app` in `main.py`.
app = Flask(__name__)

# Read in word list into memory
f = open("wordlist.txt", "r")
word_list = []
for i in f.readlines():
    word_list.append(i.rstrip())

@app.route('/', methods=["GET", "POST"])
def index():
    return render_template('index.html')

@app.route('/wordlist')
def wordlist():
    # Randomize words from wordlist into a dict and return jsonify
    item = 0
    word_dict = {}
    while item < 350:
        word_dict[item] = random.choice(word_list)
        item += 1
    return jsonify(word_dict)

if __name__ == '__main__':
    # This is used when running locally only. When deploying to Google App
    # Engine, a webserver process such as Gunicorn will serve the app. This
    # can be configured by adding an `entrypoint` to app.yaml.
    #app.run(host='127.0.0.1', port=8080, debug=True)
    app.run(host='192.168.0.2', port=8080, debug=True)

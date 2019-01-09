# -*- coding: utf-8 -*-
import psycopg2
from flask import Flask, jsonify, request, render_template, session,make_response
from datetime import datetime as dt
import datetime as dt

app = Flask(__name__, static_url_path='', static_folder='../dist/showRoomInfo')
app.config['JSON_AS_ASCII'] = False

@app.route('/dashbord/show', methods=['GET'])
def getAngular():
    return app.send_static_file('index.html')

@app.route('/dashbord/api/date',methods=['GET'])
def getAllDate():
    connection = psycopg2.connect("host=localhost port=5432 dbname=room user=postgres password=postgres")
    cur = connection.cursor()
    cur.execute("select day,count(day) from weather_info,date_trunc('day',date) as day group by day")
    results = cur.fetchall()
    dates=[]
    for result in results:
        date = result[0]
        dates.append(date.strftime('%Y-%m-%d'))
    return jsonify(results=dates)

@app.route('/dashbord/api/room-info/<date>',methods=['GET'])
def getRoomInfo(date):
    targetDate=dt.datetime.strptime(date, '%Y-%m-%d')
    tomorrowDate = targetDate + dt.timedelta(days=1)
    connection = psycopg2.connect("host=192.168.0.116 port=5432 dbname=room user=postgres password=postgres")
    cur = connection.cursor()
    cur.execute("select * from weather_info where date>=%s and date < %s",[targetDate,tomorrowDate])
    results = cur.fetchall()
    room={"temp":[],"humidity":[],"date":[]}
    for result in results:
        temp,humidity,date=result
        room["temp"].append(temp)
        room["humidity"].append(humidity)
        room["date"].append(date.strftime('%H:%M:%S'))
    return jsonify(results=room)

@app.route('/dashbord/api/weather-info/<date>',methods=['GET'])
def getWeatherInfo(date):
    targetDate=dt.datetime.strptime(date, '%Y-%m-%d')
    tomorrowDate = targetDate + dt.timedelta(days=1)
    connection = psycopg2.connect("host=192.168.0.116 port=5432 dbname=room user=postgres password=postgres")
    cur = connection.cursor()
    cur.execute("select * from weather_info_from_openweather where date>=%s and date < %s",[targetDate,tomorrowDate])
    results = cur.fetchall()
    room={"temp":[],"humidity":[],"pressure":[],"date":[]}
    for result in results:
        temp,humidity,pressure,date=result
        room["temp"].append(temp)
        room["humidity"].append(humidity)
        room["pressure"].append(pressure)
        room["date"].append(date.strftime('%H:%M:%S'))
    return jsonify(results=room)

if __name__ == '__main__':
    app.run(host="0.0.0.0",port=8090)

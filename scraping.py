__author__ = 'Arthur'

# import libraries
from bs4 import BeautifulSoup
import urllib.request, re, pandas
import csv
from random import randint
from time import sleep
from time import time

url_dict = {
    "Zagreb": "https://www.wunderground.com/history/airport/LDZA/2013/1/31/MonthlyCalendar.html?req_city=Zagreb&req_statename=Croatia",
    "Krapina": "https://www.wunderground.com/history/airport/LJCE/2013/1/1/MonthlyCalendar.html?req_city=Krapina&req_statename=Croatia",
    "Sisak": "https://www.wunderground.com/history/airport/LDZA/2013/1/31/MonthlyCalendar.html?req_city=Sisak&req_statename=Croatia",
    "Karlovac": "https://www.wunderground.com/history/airport/LJCE/2013/1/31/MonthlyCalendar.html?req_city=Karlovac&req_statename=Croatia",
    "Varazdin": "https://www.wunderground.com/history/airport/LJMB/2013/1/1/MonthlyCalendar.html?req_city=Varazdin=&req_statename=Croatia",
    "Koprivnica": "https://www.wunderground.com/history/airport/LDZA/2013/1/1/MonthlyCalendar.html?req_city=Koprivnica&req_statename=Croatia",
    "Bjelovar": "https://www.wunderground.com/history/airport/LDZA/2013/1/31/MonthlyCalendar.html?req_city=Bjelovar&req_statename=Croatia",
    "Rijeka": "https://www.wunderground.com/history/airport/LDRI/2013/1/31/MonthlyCalendar.html?req_city=Rijeka&req_statename=Croatia",
    "Gospic": "https://www.wunderground.com/history/airport/LDZD/2013/1/31/MonthlyCalendar.html?req_city=Gospic=&req_statename=Croatia",
    "Virovitica": "https://www.wunderground.com/history/airport/LHPP/2013/1/31/MonthlyCalendar.html?req_city=Virovitica&req_statename=Croatia",
    "Pozega": "https://www.wunderground.com/history/airport/LQBK/2013/1/31/MonthlyCalendar.html?req_city=Pozega&req_statename=Croatia",
    "Slavonski Brod": "https://www.wunderground.com/history/airport/LQBK/2013/1/31/MonthlyCalendar.html?req_city=Slavonski+Brod&req_statename=Croatia",
    "Zadar": "https://www.wunderground.com/history/airport/LDZD/2013/1/31/MonthlyCalendar.html?req_city=Zadar&req_statename=Croatia",
    "Osijek": "https://www.wunderground.com/history/airport/LDOS/2013/1/31/MonthlyCalendar.html?req_city=Cepin&req_statename=Croatia",
    "Sibenik": "https://www.wunderground.com/history/airport/LDSP/2013/1/31/MonthlyCalendar.html?req_city=Sibenik&req_statename=Croatia",
    "Vukovar": "https://www.wunderground.com/history/airport/LDOS/2013/1/31/MonthlyCalendar.html?req_city=Vukovar&req_statename=Croatia",
    "Split": "https://www.wunderground.com/history/airport/LDSP/2013/1/31/MonthlyCalendar.html?req_city=Split&req_statename=Croatia",
    "Pazin": "https://www.wunderground.com/history/airport/LDPL/2013/1/31/MonthlyCalendar.html?req_city=Pazin&req_statename=Croatia",
    "Dubrovnik": "https://www.wunderground.com/history/airport/LDDU/2013/1/31/MonthlyCalendar.html?req_city=Dubrovnik&req_statename=Croatia",
    "Cakovec": "https://www.wunderground.com/history/airport/LJMB/2013/1/31/MonthlyCalendar.html?req_city=Cakovec&req_statename=Croatia"
}

df = pandas.DataFrame()
for city in url_dict:
    print("### " + city + " ###")
    # we get the page of the city
    url = url_dict[city]
    l = []
    l_year = []
    for year in [2013, 2014, 2015]:
        for month in range(1, 13):
            # we get the url
            i = url.find("2013")
            a = url[0:i]
            b = str(year) + "/" + str(month) + "/1"
            c = url[(i + 8):]
            new_url = a + b + c
            print(b)
            # we get the soup
            furl = urllib.request.urlopen(new_url)
            soup = BeautifulSoup(furl, 'html.parser')
            # we find our information
            x = soup.find_all("td", class_="show-for-large-up")
            for j in x:
                l.append(j.next_element.strip())
                l_year.append(year)
    print("number of days :", len(l))
    df[city] = l

df["year"] = l_year
print("df :", df.shape)
print("saving data...")
df.to_csv("weather_cities.csv", sep=";", encoding="utf-8", index=None)
print("...done!")
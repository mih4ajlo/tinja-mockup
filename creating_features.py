__author__ = 'Arthur'

# import libraries
import pandas

data = pandas.read_csv("weather_cities.csv", sep=";", encoding="utf-8")
print(data.shape)
data_count = pandas.DataFrame()

cities = ['Karlovac', 'Sibenik', 'Slavonski Brod', 'Koprivnica', 'Zadar', 'Sisak', 'Virovitica', 'Gospic', 'Pozega', 'Vukovar',
          'Varazdin', 'Dubrovnik', 'Pazin', 'Osijek', 'Bjelovar', 'Rijeka', 'Zagreb', 'Split', 'Cakovec', 'Krapina']

for city in cities:
    x = []
    for year in [2013, 2014, 2015]:
        df = data[data.year == year][city]
        x.append(list(df).count("Clear"))
        x.append(list(df).count("Scattered Clouds"))
        x.append(list(df).count("Partly Cloudy"))
    s = sum(x) / 3
    print(s)
    data_count[city] = [s]

data_count = data_count[cities]
print(data_count)
data_count = data_count.T
data_count.columns = ["sunny_days_average_year"]
print(data_count.shape)
print(data_count)
data_count.to_csv("sunny_days.csv", sep=";", encoding="utf-8")

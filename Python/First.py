import  folium, requests, pandas as pd,  branca, json, numpy as np, os, csv
# new json 1
with open("data/MAP.json", "r") as read_file:
    data = json.load(read_file)
    i=0
    with open('data/my_data.csv', 'r') as csvFile:
        reader = csv.reader(csvFile)
        for row in reader:
            if(i!=0):
                # print(row[1])
                data["features"][i-1]["properties"].update({'name': row[0]})
                data["features"][i-1]["properties"].update({'description': row[1]})
            i=i+1

with open('data/data.json', 'w') as outfile:
    json.dump(data, outfile)
# new json 2
with open("data/MAP.json", "r") as read_file:
    data = json.load(read_file)
    i=0
    with open('data/my_data2.csv', 'r') as csvFile:
        reader = csv.reader(csvFile)
        for row in reader:
            if(i!=0):
                print(row[1])
                data["features"][i-1]["properties"].update({'name': row[0]})
                data["features"][i-1]["properties"].update({'description': row[1]})
            i=i+1

with open('data/data2.json', 'w') as outfile:
    json.dump(data, outfile)
# new json 3
with open("data/MAP.json", "r") as read_file:
    data = json.load(read_file)
    i=0
    with open('data/my_data3.csv', 'r') as csvFile:
        reader = csv.reader(csvFile)
        for row in reader:
            if(i!=0):
                print(row[1])
                data["features"][i-1]["properties"].update({'name': row[0]})
                data["features"][i-1]["properties"].update({'description': row[1]})
            i=i+1

with open('data/data3.json', 'w') as outfile:
    json.dump(data, outfile)
# new json 4
with open("data/MAP.json", "r") as read_file:
    data = json.load(read_file)
    i=0
    with open('data/my_data4.csv', 'r') as csvFile:
        reader = csv.reader(csvFile)
        for row in reader:
            if(i!=0):
                print(row[1])
                data["features"][i-1]["properties"].update({'name': row[0]})
                data["features"][i-1]["properties"].update({'description': row[1]})
            i=i+1

with open('data/data4.json', 'w') as outfile:
    json.dump(data, outfile)

states = os.path.join('data','data.json')
states2 = os.path.join('data','data2.json')
states3 = os.path.join('data','data3.json')
states4 = os.path.join('data','data4.json')
rate = os.path.join('data','my_data.csv')
rate2 = os.path.join('data','my_data2.csv')
rate3 = os.path.join('data','my_data3.csv')
rate4 = os.path.join('data','my_data4.csv')
state_data = pd.read_csv(rate)
state_data2 = pd.read_csv(rate2)
state_data3 = pd.read_csv(rate3)
state_data4 = pd.read_csv(rate4)
# print(state_data)

m = folium.Map(location=[45.075, 7.666667], zoom_start=12)
m2 = folium.Map(location=[45.075, 7.666667], zoom_start=10.5)
m3 = folium.Map(location=[45.075, 7.666667], zoom_start=10.5)
m4 = folium.Map(location=[45.075, 7.666667], zoom_start=10.5)
# m.add_child(folium.LatLngPopup())

folium.Choropleth(
    geo_data=states,
    name='choropleth',
    data=state_data,
    columns=['Quartieri','Violazioni'],
    key_on='feature.id',
    fill_color='YlOrRd',
    fill_opacity=0.7,
    line_opacity=0.8,
    legend_name='Numero di Violazioni (%)'
).add_to(m)

folium.Choropleth(
    geo_data=states2,
    name='choropleth',
    data=state_data2,
    columns=['Quartieri','Violazioni'],
    key_on='feature.id',
    fill_color='PuBu',
    fill_opacity=0.7,
    line_opacity=0.8,
    legend_name='Numero di Violazioni2 (%)'
).add_to(m2)

folium.Choropleth(
    geo_data=states3,
    name='choropleth',
    data=state_data3,
    columns=['Quartieri','Violazioni'],
    key_on='feature.id',
    fill_color='PuBu',
    fill_opacity=0.7,
    line_opacity=0.8,
    legend_name='Numero di Violazioni3 (%)'
).add_to(m3)

folium.Choropleth(
    geo_data=states4,
    name='choropleth',
    data=state_data4,
    columns=['Quartieri','Violazioni'],
    key_on='feature.id',
    fill_color='PuBu',
    fill_opacity=0.7,
    line_opacity=0.8,
    legend_name='Numero di Violazioni4 (%)'
).add_to(m4)

# Convert points to GeoJson
folium.features.GeoJson(states,  name='Labels',
               style_function=lambda x: {'color':'transparent','fillColor':'transparent','weight':0},
                tooltip=folium.features.GeoJsonTooltip(fields=['name','description'],
                                              aliases = ['Quartiere','no Violazioni'],
                                              labels=True,
                                              sticky=False
                                             )
                       ).add_to(m)

# Convert points to GeoJson2
folium.features.GeoJson(states2,  name='Labels',
               style_function=lambda x: {'color':'transparent','fillColor':'transparent','weight':0},
                tooltip=folium.features.GeoJsonTooltip(fields=['name','description'],
                                              aliases = ['Quartiere','no Violazioni'],
                                              labels=True,
                                              sticky=False
                                             )
                       ).add_to(m2)
# Convert points to GeoJson3
folium.features.GeoJson(states3,  name='Labels',
               style_function=lambda x: {'color':'transparent','fillColor':'transparent','weight':0},
                tooltip=folium.features.GeoJsonTooltip(fields=['name','description'],
                                              aliases = ['Quartiere','no Violazioni'],
                                              labels=True,
                                              sticky=False
                                             )
                       ).add_to(m3)
# Convert points to GeoJson4
folium.features.GeoJson(states4,  name='Labels',
               style_function=lambda x: {'color':'transparent','fillColor':'transparent','weight':0},
                tooltip=folium.features.GeoJsonTooltip(fields=['name','description'],
                                              aliases = ['Quartiere','no Violazioni'],
                                              labels=True,
                                              sticky=False
                                             )
                       ).add_to(m4)


folium.LayerControl().add_to(m)
m.save('map.html')

folium.LayerControl().add_to(m2)
m2.save('map2.html')
folium.LayerControl().add_to(m3)
m3.save('map3.html')

folium.LayerControl().add_to(m4)
m4.save('map4.html')


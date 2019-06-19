function inside(point, vs) {

    var x = point[0], y = point[1]; //  x=Longitude, y=Latitude

    var inside = false;
    for (var i = 0, j = vs.length - 1; i < vs.length; j = i++) {
        var xi = vs[i][0], yi = vs[i][1];
        var xj = vs[j][0], yj = vs[j][1];

        var intersect = ((yi > y) != (yj > y))
            && (x < (xj - xi) * (y - yi) / (yj - yi) + xi);
        if (intersect) inside = !inside;
    }

    return inside;
};

// array of coordinates of each vertex of the polygon
// var polygon = [ [ 1, 1 ], [ 1, 2 ], [ 2, 2 ], [ 2, 1 ] ];
// console.log(inside([ 1.5, 1.5 ], polygon)); // true
/**
* Funzione per il caricamento a-sincrono di una risorsa
* tramite una XML HTTP Request.
*
* @param {String} url - URL della risorsa da caricare
* @param {loadCallback} success - funzione di callback invocata con il contenuto
*/
function loadASync(url, success) {
    let xhr = new XMLHttpRequest();
    xhr.open("GET", url, true);
    xhr.onreadystatechange = function () {
        if (this.readyState === 4)
            if (okStatus(this.status)) {
                success(this.responseText);
            } else {
                throw "Async request failed (response: " + this.status + ":" + this.statusText + ") for URL " + url;
            }
    };
    xhr.send();
}

/**
 * Checks it the HTTP response code corresponds
 * to a successful request.
 * <ul>
 *    <li>{@code 200} : resource retrieved
 *    <li>{@code 304}: resource not modified  (this response is due to a conditional request)
 * </ul>
 *
 * @param {number} s - status code to be checked
 */
function okStatus(s) {
    return [200, 304].indexOf(s) >= 0;
}

/**
 * Renders a table object into an HTML <table> element.
 *
 * Headers of the table are extracted from first
 * row's properties.
 *
 * @param {[]} data - object with table to be rendered
 * @returns {HTMLTableElement}
 */
function tableToHtmlElement(data) {
    let res = document.createElement("table");
    let html = "<tr>";
    for (let h in data[0])
        if (data[0].hasOwnProperty(h))
            html += "<th>" + h + "</th>";
    html += "</tr>";
    for (let i = 0; i < data.length; ++i) {
        html += "<tr>";
        for (let f in data[i])
            if (data[i].hasOwnProperty(f)){
                html += "<td>" + data[i][f] + "</td>";
            }

        html += "</tr>";
    }
    html += "</table>";
    res.innerHTML = html;
    return res;
}

window.onload = function () {
    loadASync('MAP.json',function (data) {
        //console.log(data);
        var ass_array= [];
        var ass_array2 = [];
        var ass_array3= [];
        var ass_array4= [];
        const index = "Via;Numero Civico;Citt�;Provincia;Paese;Id(Field utile solo al fine dell'ordinamento) ;Quartiere;Longitudine(X);Latitudine(Y);StAddr;CAP;Anno Accertamento;Mese Accertamento;Giorno Accertamento;Numero Verbali;Descrizione Sanzione;Descrizione Paragrafo;Descrizione Capitolo;Descrizione Prontuario";
        let json = JSON.parse(data);
        console.log(json);
        loadASync('FINAL_ALL_GEOCODED_CON_DESCRIZIONE.csv',function (data2) {
            let csv = csvParse(data2);
            //console.log(csv);
            for(let j=1;j<csv.length;j=j+2){
                let coords = [];
                let flag = 0;
                coords[0] = csv[j][index].split(';')[7];
                coords[1] = csv[j][index].split(';')[8];
               // console.log(j + ') ' + coords[0] + ' ' + coords[1]);

                for(let i=0;i<json.features.length;++i){
                    if(inside(coords, json.features[i].geometry.coordinates[0])){
                        for(aa in ass_array){
                            if(aa===json.features[i].id) {
                                flag = 1;
                                ass_array[aa] += +csv[j][index].split(';')[14];
                            }
                        }
                        if(flag===0 ){
                            ass_array[json.features[i].id] = +csv[j][index].split(';')[14];
                        }
                        flag = 0;
                    }
                }
                if(csv[j][index].split(';')[16]==='SANZIONI ED INDENNITA\' DI MORA') {
                    for(let i=0;i<json.features.length;++i){
                        if(inside(coords, json.features[i].geometry.coordinates[0])){
                            for(aa in ass_array2){
                                if(aa===json.features[i].id) {
                                    flag = 1;
                                    ass_array2[aa] += +csv[j][index].split(';')[14];
                                }
                            }
                            if(flag===0 ){
                                ass_array2[json.features[i].id] = +csv[j][index].split(';')[14];
                            }
                            flag = 0;
                        }
                    }
                }
                if(csv[j][index].split(';')[16]==='EVASIONE DEL CANONE') {
                    for(let i=0;i<json.features.length;++i){
                        if(inside(coords, json.features[i].geometry.coordinates[0])){
                            for(aa in ass_array3){
                                if(aa===json.features[i].id) {
                                    flag = 1;
                                    ass_array3[aa] += +csv[j][index].split(';')[14];
                                }
                            }
                            if(flag===0 ){
                                ass_array3[json.features[i].id] = +csv[j][index].split(';')[14];
                            }
                            flag = 0;
                        }
                    }
                }
                if(csv[j][index].split(';')[16]==='DIVIETO DI CIRC. VEICOLI A MOTORE') {
                    for(let i=0;i<json.features.length;++i){
                        if(inside(coords, json.features[i].geometry.coordinates[0])){
                            for(aa in ass_array4){
                                if(aa===json.features[i].id) {
                                    flag = 1;
                                    ass_array4[aa] += +csv[j][index].split(';')[14];
                                }
                            }
                            if(flag===0 ){
                                ass_array4[json.features[i].id] = +csv[j][index].split(';')[14];
                            }
                            flag = 0;
                        }
                    }
                }
            }


            let csvContent = "data:text/csv;charset=utf-8,"+"Quartieri,Violazioni"+'\r\n';
            for(let i=0;i<json.features.length;++i){
                csvContent+= json.features[i].id+','+ass_array[json.features[i].id]+'\r\n'
            }
            console.log(csvContent)
            var encodedUri = encodeURI(csvContent);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "my_data.csv");
            document.body.appendChild(link); // Required for FF

            let csvContent2 = "data:text/csv;charset=utf-8,"+"Quartieri,Violazioni"+'\r\n';
            for(let i=0;i<json.features.length;++i){
                csvContent2+= json.features[i].id+','+ass_array2[json.features[i].id]+'\r\n'
            }
            console.log(csvContent2)
            var encodedUri = encodeURI(csvContent2);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "my_data2.csv");
            document.body.appendChild(link); // Required for FF

            let csvContent3 = "data:text/csv;charset=utf-8,"+"Quartieri,Violazioni"+'\r\n';
            for(let i=0;i<json.features.length;++i){
                csvContent3+= json.features[i].id+','+ass_array3[json.features[i].id]+'\r\n'
            }
            console.log(csvContent3)
            var encodedUri = encodeURI(csvContent3);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "my_data3.csv");
            document.body.appendChild(link); // Required for FF

            let csvContent4 = "data:text/csv;charset=utf-8,"+"Quartieri,Violazioni"+'\r\n';
            for(let i=0;i<json.features.length;++i){
                csvContent4+= json.features[i].id+','+ass_array4[json.features[i].id]+'\r\n'
            }
            console.log(csvContent4)
            var encodedUri = encodeURI(csvContent4);
            var link = document.createElement("a");
            link.setAttribute("href", encodedUri);
            link.setAttribute("download", "my_data4.csv");
            document.body.appendChild(link); // Required for FF

            //link.click(); // This will download the data file named "my_data.csv".
            console.log(ass_array);
            console.log(ass_array2);
            console.log(ass_array3);
            console.log(ass_array4);

            //INIZIO ELE
            let quartieri= new Array();
            let multe= new Array();
            let i=0;
            for(let q in ass_array){
                multe[i]=ass_array[q];
                quartieri[i]=q;
                i++;
            }

            function bubbleSort(arr) {
                let n = arr.length;
                let temp = 0;
                let temp2 = "";
                for(let i=0; i < n; i++){
                    for(let j=1; j < (n-i); j++){
                        if(arr[j-1] > arr[j]){
                            //swap elements
                            temp = arr[j-1];
                            arr[j-1] = arr[j];
                            arr[j] = temp;

                            temp2 = quartieri[j-1];
                            quartieri[j-1] = quartieri[j];
                            quartieri[j] = temp2;
                        }

                    }
                }
            }

            bubbleSort(multe);

            data = [{x: multe,
                y:quartieri,
                type:"bar",
                orientation:"h",
                text: multe.map(String),

                textposition: 'outside',
                hoverinfo: 'none',
                width: 0.8,
                marker: {
                    color: ["#fff360", "#FFED02",
                        "#FFE700", "#FFDA00", "#FFD700", "#FFC501", "#FFCC01",
                        "#FEB800", "#FFAE00", "#FF9F00", "#FF8201",
                        "#FF7500", "#FF5301", "#FF4802", "#FD3D00",
                        "#FE3501", "#FF0F00", "#FE0600", "#E70501",
                        "#C70505", "#9C0707", "#820604",
                        "#720704", "#54080A"]
                }
            }];

            layout = {
                // title: "Numero di multe per quartiere",
                // "titlefont" : {
                //     family: "Calibri, monospace",
                //     size: 30,
                //     color: "black"
                // },
                margin: {l: 150, r:20, b: 50, t:0},
                width:750,
                height:600,
                xaxis: {title: "Numero di Multe",
                    "titlefont" : {
                        family: "Calibri, monospace",
                        size: 15,
                        color: "black"
                    },
                    color: "black",
                    fontFamily: "Calibri, monospace"
                },
                yaxis: { title: "Quartiere",
                    "titlefont" : {
                        family: "Calibri, monospace",
                        size: 15,
                        color: "black"
                    },
                    color: "black",
                    fontFamily: "Calibri, monospace"
                }
            };

            Plotly.plot("bar_plot", data, layout);
            // FINE ELE
        })



        // let tableElement = tableToHtmlElement(json.classifica);
        // for(i=1;i<=2;i++){
        //     tableElement.rows[i].children[0].classList.add('champions');
        //     let span = document.createElement("span");
        //     span.classList.add("tooltip");
        //     span.innerText = "champions";
        //     tableElement.rows[i].children[0].appendChild(span);
        //     tableElement.rows[i].onmouseover = function () {
        //         this.getElementsByClassName('tooltip')[0].style.display='block';
        //     }
        //     tableElement.rows[i].onmouseout = function () {
        //         this.getElementsByClassName('tooltip')[0].style.display='none';
        //     }
        // }
        //
        // tableElement.rows[3].children[0].classList.add('preliminari');
        // for(i=4;i<=5;i++)
        //     tableElement.rows[i].children[0].classList.add('europa');
        // for(i=18;i<=20;i++)
        //     tableElement.rows[i].children[0].classList.add('serieB');
        //
        // console.log(tableElement.rows);
        // let classificaDiv = document.getElementById('classifica');
        // classificaDiv.append(tableElement);
    });
};

//jQuery version
// $(function () {
//     $.get('classifica20170528.json', function (json) {
//         //console.log(json);
//         let tableElement = tableToHtmlElement(json.classifica);
//         $('#classifica').append(tableElement);
//     });
// });
/**
 * Analizza una stringa con un contenuto CSV e
 * produce una array di righe. Ogni riga e' un
 * oggetto che ha come proprieta' le colonne
 * del contenuto CSV (prese dalla prima riga).
 *
 * @param {string} csv - il contenuto CSV
 * @returns {Array} - l'array di oggetti
 */
function csvParse(csv) {
    'use strict';
    let csvRE = /(,|^|\n|\r|\r\n)[ \t]*(?:([^",\n\r]*)|"((?:[^"]*|"")*)")[ \t]*/g;
    let heads = [], rows = [];
    let row, col, line = -1;
    while (true) {
        let match = csvRE.exec(csv);
        if (!match) break;
        if (match[1] !== ',') {
            if (row) rows.push(row);
            line++;
            row = line && {};
            col = 0;
        }
        let cell = match[2] ||
            (match[3] || "").replace(/""/g, '"');
        if (line === 0) heads.push(cell);
        else row[heads[col++] || "C" + col] = cell;
    }

    if (JSON.stringify(row) !== "{}") rows.push(row);
    return rows;
}

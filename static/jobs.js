function tableHeading(ob_temp, labels) {
    var columns = Object.keys(ob_temp);
    var col_temp = "";
    for (var i = 0; i < columns.length; i++) {
        if (columns[i] == "web" || columns[i] == undefined)
            continue;

        col_temp += "<th>" + labels[columns[i]] + "</th>";
    }

    var temps = "<tr>" +
        col_temp +
        "</tr>";

    return temps;
}

function tableRow(ob_temp) {

    var columns = Object.keys(ob_temp);
    var col_temp = "";
    for (var i = 0; i < columns.length; i++) {
        if (columns[i] == "company") {
            col_temp += "<td><a href='" + ob_temp.web + "'>" + ob_temp.company + "</a></td>"
        } else if (columns[i] == "web")
            continue;
        else {
            col_temp += "<td>" + ob_temp[columns[i]] + "</td>";
        }

    }

    var temps = "<tr>" +
        col_temp +
        "</tr>";

    return temps;
}






var companies = [];
var peoples = [];

var companiesUrl = "data/companies.csv";
var peoplesUrl = "data/unemployed.csv";

d3.csv(companiesUrl, function(data) {
    companies = data;

    var template = "";

    for (var i = 0; i < companies.length; i++) {
        var tempC = companies[i]
        template += tableRow(tempC);
    }

    var labelColumns = {
        "company": "Company",
        "web": "Web page",
        "need": "Needs for employees",
        "formal": "Formal education",
        "informal": "Informal education",
        "location": "Location",
        "period": "Period",
        "teach": "Ready to teach"
    }

    var heading = tableHeading(companies[0], labelColumns);

    $("#peopleContainer table").append(heading);
    $("#peopleContainer table").append(template);

});

d3.csv(peoplesUrl, function(data) {
    peoples = data;

    var template = "";

    for (var i = 0; i < peoples.length; i++) {
        var tempP = peoples[i]
        template += tableRow(tempP);
    }

    var labelColumns = {
        "name": "Name",
        "years_we": "Experience years",
        "formal": "Formal education",
        "informal": "Informal education",
        "location": "Location",
        "availability": "Availability",
        "learn": "Ready to Learn?"
    }

    var heading = tableHeading(peoples[0], labelColumns);

    $("#companiesContainer table").append(heading);
    $("#companiesContainer table").append(template);
});
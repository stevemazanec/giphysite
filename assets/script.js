var topics = ["baseball", "golf", "basketball", "soccer", "football", "tennis", "bowling"];

$(document).on("click", ".sport", displayGIFS);

function createButtons() {
    $("#sportsButtons").empty();
    $("#sportsButtons").html("<h2>Click one of the buttons below to see 10 GIFS! <br>")
    for (var i = 0; i < topics.length; i++) {
        var a = $("<button>");
        a.addClass("sport btn btn-primary");
        a.text(topics[i]);
        a.attr("data-name", topics[i]);
        $("#sportsButtons").append(a);
    }
}

createButtons();

$("#addSport").on("click", function (event) {
    event.preventDefault();
    var sport = $("#sports-input").val().trim();
    topics.push(sport);
    createButtons();
})

function emptyDiv() {
    $(".item").remove();
}

function displayGIFS() {
    var sport = $(this).attr("data-name");
    var queryURL = "https://api.giphy.com/v1/gifs/search?api_key=L437LcAQFOqJwMusAP3rrIrNaPyta7XX&q=" + sport + "&limit=10&offset=0=G&lang=en";
    emptyDiv();
    $.ajax({
        url: queryURL,
        method: "GET"
    }).then(function (data) {

        var arrayGIFS = [data.data[0], data.data[1], data.data[2], data.data[3], data.data[4], data.data[5], data.data[6], data.data[7], data.data[8], data.data[9],];
        console.log(arrayGIFS);
        for (var j = 0; j < arrayGIFS.length; j++) {
            if (arrayGIFS[j].rating !== "r" && arrayGIFS[j].rating !== "pg-13") {
                var gifDiv = $("<div class='item'>");
                var image = "<img class='GIF' src =" + arrayGIFS[j].images.fixed_width_still.url + " alt='Sports Image' data-still=" + arrayGIFS[j].images.fixed_width_still.url + " " + "data-animate=" + arrayGIFS[j].images.fixed_width.url + " " + "data-state=still>";
                var rating = "<p class='GIFtitle'> Rated: " + arrayGIFS[j].rating + "</p>"
                gifDiv.append(image);
                gifDiv.append(rating);
                $("#sports").append(gifDiv);
            }

        }
        animateGIF();
    });
}

function animateGIF() {
    $(".GIF").on("click", function () {
        var state = $(this).attr("data-state");
        if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate")
        }
        if (state === "animate") {
            $(this).attr("src", $(this).attr("data-still"))
            $(this).attr("data-state", "still");
        }

    })
}






        // Initial array of emotions
        var emotionArr = ["sad", "disgusted", "happy", "mad", "scared"];

               // Function for displaying button
               function renderButtons() {
  
                // Deleting the buttons prior to adding new movies
                // (this is necessary otherwise you will have repeat buttons)
                $("#buttons-view").empty();
      
                // Looping through the array of emotions
                for (var i = 0; i < emotionArr.length; i++) {
        
                  // Then dynamically generating buttons for each emotion in the array
                  // This code $("<button>") is all jQuery needs to create the beginning and end tag. (<button></button>)
                  var a = $("<button>");
                  // Adding a class of emotion to our button
                  // a.addClass("gif");
                  // Adding a data-attribute
                  a.attr("data-emotion", emotionArr[i]);
                  a.addClass("button action-button shadow animate blue");

                  // Providing the initial button text
                  a.text(emotionArr[i]);
                  // Adding the button to the buttons-view div
                  $("#buttons-view").append(a);
                }
              }
  
          // Calling renderButtons which handles the processing of our emotion array
          renderButtons();

        // This function handles events where one button is clicked
        $("#add-emotion").on("click", function(event) {
          event.preventDefault();
  
          // This line grabs the input from the textbox
          var emotion = $("#emotion-input").val().trim();
  
          // Adding the movie from the textbox to our array
          emotionArr.push(emotion);
          console.log(emotionArr);
          renderButtons();
        });

  // Adding click event listen listener to all buttons
  $(document).on("click", ".button", function() {

      // Grabbing and storing the data-emotion property value from the button
      var emotion = $(this).attr("data-emotion");
      
      // Constructing a queryURL using the emotion name
      var queryURL = "https://api.giphy.com/v1/gifs/search?q=" +
        emotion + "&api_key=r9b4PRRKdDwgT2L0EpBTzZfHJdO0lHYx&limit=10";

    // Performing an AJAX request with the queryURL
    $.ajax({
      url: queryURL,
      method: "GET"
    })
      // After data comes back from the request
      .then(function(response) {
        console.log(queryURL);

        console.log(response);

        // storing the data from the AJAX request in the results variable
        var results = response.data;
 
         // Looping through each result item
         for (var i = 0; i < results.length; i++) {

          // Creating and storing a div tag
          var emotionDiv = $("<div>");

          // Creating a paragraph tag with the result item's rating
          var p = $("<p>").text("Rating: " + results[i].rating);

          // Creating and storing an image tag
          var emotionImage = $("<img>");
          // Setting the src attribute of the image to a property pulled off the result item
          emotionImage.attr("data-still", results[i].images.fixed_height_still.url).addClass("gif").attr("data-animate", results[i].images.fixed_height.url).attr("data-state", "still").attr("src", results[i].images.fixed_height_still.url).attr("title", "Click me to see me move!");

          // Appending the paragraph and image tag to the emotionDiv
          emotionDiv.append(p);
          emotionDiv.append(emotionImage);

          // Prependng the emotionDiv to the HTML page in the "#gifs-appear-here" div
          $("#gifs-appear-here").prepend(emotionDiv);
        }

        $(".gif").on("click", function() {
          // The attr jQuery method allows us to get or set the value of any attribute on our HTML element
          var state = $(this).attr("data-state");
          // If the clicked image's state is still, update its src attribute to what its data-animate value is.
          // Then, set the image's data-state to animate
          // Else set src to the data-still value
          if (state === "still") {
            $(this).attr("src", $(this).attr("data-animate"));
            $(this).attr("data-state", "animate");
          } else {
            $(this).attr("src", $(this).attr("data-still"));
            $(this).attr("data-state", "still");
          }
        });


      });
    });

    $("figure").mouseleave(
      function() {
        $(this).removeClass("hover");
      }
    );
// Initialize Cloud Firestore through Firebase
//var db = firebase.firestore();


//Defining the DOM elements
var submitButton = document.querySelector("#submitButton");
//var listActivities = document.querySelector("#listActivities");

//Attaching a listener function
//addInput.addEventListener('keyup', handleSubmit);
submitButton.addEventListener('click', handleSubmit);

//Setup Firestore Ref
const activityRef = firebase.firestore().collection("activities");



//Listener Function
function handleSubmit(e) {
  if (e.keyCode !== 13 && e.type != "click") {
    return;
  }
  
  //Reading Array when submitting
  var values = $("input[name='report']")
              .map(function(){return $(this).val();}).get();
  var addInput = values;
  
	
  const activity = addInput;
  submitButton.innerHTML = "Creating...";
  if (activity === "") {
    return;
  }
  activityRef.add({
    title: activity,
    //checked: false,
    createdAt: (new Date()).getTime()
  }).then(function(docRef) {
    addInput = "";
    submitButton.innerHTML = "Create";
  }).catch(function(error) {
    console.log(error);
  })
};



// Listener for rendering todos
activityRef.orderBy("createdAt", 'desc').onSnapshot(function(docSnapShot) {
  //listActivities.innerHTML = "";
  docSnapShot.forEach(function(doc) {
    //activity = doc.data();
    //activity.id = doc.id;
	  
	
	    var listEl = document.getElementById('listActivities');
		
		var listTitle = doc.data().title;
		
		var createList = function (arr) {
				var str = '';
				for (var i = 0; i < arr.length; i++) {
					str += '<li>' + arr[i] + '</li>';
				}
				return str;
			}
		
		listEl.innerHTML = createList(listTitle);
		
		$("#list").append(listEl.innerHTML);
    
	
    });
  });


// Initialize Cloud Firestore through Firebase
var db = firebase.firestore();

db.collection("activities").get().then(function(querySnapshot) {
    querySnapshot.forEach(function(doc) {
        console.log(doc.id, " => ", doc.data());
    });
});



//Defining the DOM elements
var addInput = document.querySelector("#addInput");
var submitButton = document.querySelector("#submitButton");
var listActivities = document.querySelector("#listActivities");

//Attaching a listener function
addInput.addEventListener('keyup', handleSubmit);
submitButton.addEventListener('click', handleSubmit);

//Setup Firestore Ref
const activityRef = firebase.firestore().collection("activities");

//Listener Function
function handleSubmit(e) {
  if (e.keyCode !== 13 && e.type != "click") {
    return;
  }
  const activity = addInput.value;
  submitButton.innerHTML = "Creating...";
  if (activity === "") {
    return;
  }
  activityRef.add({
    title: activity,
    //checked: false,
    createdAt: (new Date()).getTime()
  }).then(function(docRef) {
    addInput.value = "";
    submitButton.innerHTML = "Create";
  }).catch(function(error) {
    console.log(error);
  })
};

// Listener for rendering todos
activityRef.orderBy("createdAt", 'desc').onSnapshot(function(docSnapShot) {
  listActivities.innerHTML = "";
  docSnapShot.forEach(function(doc) {
    activity = doc.data();
    activity.id = doc.id;
	  
	  var date = activity.createdAt;
	  var date = new Date(date);
	  var date = new Date().getTime();

	  
	  var dateBlock = document.createElement("p");
	  dateBlock.innerHTML = date;
	  
	 
	 
	  
	  
    /*var checkBox = document.createElement("INPUT");
    checkBox.setAttribute("type", "checkbox");
    checkBox.setAttribute("data-id", activity.id);
    checkBox.checked = activity.checked;
    checkBox.addEventListener('change', handleCheckToggle);
    */
    var titleBlock = document.createElement("p");
    titleBlock.innerHTML = activity.title;
    

    var wrapper= document.createElement('li');
   // wrapper.appendChild(checkBox);
    wrapper.appendChild(titleBlock);
	  wrapper.appendChild(dateBlock);

    listActivities.appendChild(wrapper);
  })
});


/*function handleCheckToggle(e) {
  var targetElement = e.target;
  var checked = targetElement.checked;
  var id = targetElement.dataset.id;
  activityRef.doc(id).update({
    checked: checked,
  })
}*/
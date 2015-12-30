var fileNames =[];
var awardNames = [];
//removeLocalStorage();//for only test,
//load local storage data,when broser is force closed or crashed
// if localStroage.length>0,show the browser has been closed or crashed
if (localStorage.length>0) {
  restoreLocalStorage();
  removeLocalStorage();
}

function readMultipleFiles(evt) {
//Retrieve all the files from the FileList object
  var files = evt.target.files; 
  if (files) {
      for (var i=0, f; f=files[i]; i++) {
            var r = new FileReader();
          r.onload = (function(f) {
              return function(e) {
                  fileNames.push(f.name);
              };
          })(f);
      }   
    } else {
        alert("Failed to load files"); 
   }
}

//restore fileNames and awards from localStorage
function restoreLocalStorage() {
  for (var i = localStorage.length - 1; i >= 0; i--) {
    var key = localStorage.key(i);
    console.log(key);
    if(key.indexOf(".") !=-1) {
      console.log("restorelocalname-===="+localStorage.getItem(key));
      fileNames.push(localStorage.getItem(key));
    } else{
      awardNames.push(localStorage.getItem(key));
    }
    console.log(localStorage.key(i));
  }
}

//remove local storage for only test
function removeLocalStorage() {
  for (var i = localStorage.length - 1; i >= 0; i--) {
    localStorage.removeItem(localStorage.key(i));
  };
}


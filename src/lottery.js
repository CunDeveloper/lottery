var fileNames =[];
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
        r.readAsText(f);
    }   
  } else {
      alert("Failed to load files"); 
 }
}
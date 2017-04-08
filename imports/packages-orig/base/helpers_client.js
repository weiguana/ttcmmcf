/**
 * Return the base64 representation of the image
 */
scorpius.helpers.getBase64Image = function(file, callback) {
  var FR = new FileReader();
  FR.onload = function(e) {
    callback(e.target.result);
  };
  FR.readAsDataURL(file);
};

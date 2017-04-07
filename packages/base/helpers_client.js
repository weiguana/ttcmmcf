/**
 * Return the base64 representation of the image
 */
ttcmmcf.helpers.getBase64Image = function(file, callback) {
    const FR = new FileReader();
    FR.onload = function(e) {
        callback(e.target.result);
    };
    FR.readAsDataURL(file);
};

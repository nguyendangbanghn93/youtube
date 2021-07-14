const uploadCloudinary = (...rest) => {
    let fn = () => { };
    let options = {};
    rest.map((r) => {
        typeof r === "function" && (fn = r);//ok, url, detail
        typeof r === "object" && (options = r);
        return true;
    })
    const myWidget = window.cloudinary.createUploadWidget(
        {
            cloudName: "nguyendangbang",
            uploadPreset: "myUpload",
            cropping: true,//hiện trình cắt
            // showSkipCropButton:true,//hiện nút bỏ qua cắt
            // cropAspectRatio:true,
            // cropShowDimensions:true,
            // croppingCoordinatesMode:"face",
            // public_id: "img",
            autoMinimize: true,//thu nhỏ khi bắt đầu tải lên
            showCompletedButton: true,
            showUploadMoreButton: true,
            singleUploadAutoClose: false,//tự động đóng khi quá trình tải lên hoản tất
            showInsecurePreview: true,
            // multiple :true,//upload nhiều ảnh
            ...options
        },
        (error, result) => {
            if (!error && result && result.event === "success") {
                let url = result.info.url
                if (result?.info?.coordinates?.custom?.[0]) {
                    const [x, y, width, height] = result.info.coordinates.custom[0];
                    const crop = `c_crop,h_${height},w_${width},x_${x},y_${y}/`;
                    url = url.replace("nguyendangbang/image/upload/", `nguyendangbang/image/upload/${crop}`);
                }
                // console.log("Done! Here is the image info: ", url, result.info);
                fn(1, url, result.info) 
            } else {
                fn(0, error, result)
            }
        }
    );
    myWidget.open();
    console.log(myWidget);
};
export default uploadCloudinary;

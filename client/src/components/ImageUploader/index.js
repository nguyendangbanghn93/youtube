import { useRef, useState } from "react";

export default function ImageUploader({ defaultImage }) {
    const [image, setImage] = useState("");
    const [loading, setLoading] = useState(false);
    const onFileChange = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        //multi file
        data.append("file", files[0]);
        data.append("upload_preset", "myUpload");
        setLoading(true);
        const res = await fetch("https://api.cloudinary.com/v1_1/nguyendangbang/image/upload", { method: "POST", body: data });
        const file = await res.json();
        setImage(file.url);
        setLoading(false);
        console.log("Respponse",file)
    }
    return <>
        <input type="file" placeholder="Upload Image" multiple  onChange={onFileChange} />
        {loading ? "...Loading" : <img src={image} style={{ width: "300px" }} />}
    </>
}
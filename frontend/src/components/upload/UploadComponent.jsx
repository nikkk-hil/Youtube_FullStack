import { Input, Button } from "../componentCollection.js";
import { useState, useRef } from "react";
import { publishVideo } from "../../api/video.api.js";

/*
    
*/

function UploadComponent() {
  const videoInputRef = useRef(null);
  const thumbnailInputRef = useRef(null);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [video, setVideo] = useState(null);
  const [thumbnail, setThumbnail] = useState(null);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    setError(null);

    if (!title || title.trim() === "") {
      setError("Title is required.");
      return;
    }
    if (!description || description.trim() === "") {
      setError("Description is required.");
      return;
    }
    if (!video) {
      setError("Video file is required.");
      return;
    }
    if (!thumbnail) {
      setError("Thumbnail file is required.");
      return;
    }

    setLoading(true);

    const formData = new FormData();
    formData.append("title", title);
    formData.append("description", description);
    formData.append("videoFile", video);
    formData.append("thumbnail", thumbnail);

    publishVideo(formData)
      .then((res) => console.log(res.data))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <Input
          label="Enter video title"
          type="text"
          value={title}
          onChange={(e) => {
            setTitle(e.target.value);
            setError("");
          }}
          className="text-xl text-white font-light bg-gray-900 rounded-lg mb-3"
          labelClass="text-white"
        />
        <Input
          label="Enter video description"
          type="text"
          value={description}
          onChange={(e) => {
            setDescription(e.target.value);
            setError("");
          }}
          className="text-xl text-white font-light bg-gray-900 rounded-lg mb-3"
          labelClass="text-white"
        />
        <div>
          <Input
            label="select video file"
            type="file"
            accept="video/*"
            hidden
            onChange={(e) => {
              setVideo(e.target.files[0]);
              setError("");
            }}
            ref={videoInputRef}
            labelClass="text-white"
          />
          <Button
            onClick={() => videoInputRef.current.click()}
            disabled={loading}
          >
            Browse
          </Button>
        </div>

        <div>
          <Input
            label="select thumbnail file"
            type="file"
            accept="image/*"
            hidden
            onChange={(e) => {
              setThumbnail(e.target.files[0]);
              setError("");
            }}
            ref={thumbnailInputRef}
            labelClass="text-white"
          />
          <Button
            disabled={loading}
            onClick={() => {
              thumbnailInputRef.current.click();
              setError("");
            }}
          >
            Browse
          </Button>
        </div>

        {error && (
          <p className="text-red-500 font-light text-center">{error}</p>
        )}

        <Button type="submit" disabled={loading}>
          {loading ? "Uploading..." : "Upload"}
        </Button>
      </form>
    </div>
  );
}

export default UploadComponent;

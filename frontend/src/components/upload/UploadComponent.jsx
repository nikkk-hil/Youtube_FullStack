import { Input, Button } from "../componentCollection.js";
import { useState, useRef } from "react";
import { publishVideo } from "../../api/video.api.js";
import { useNavigate } from "react-router-dom";

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
  const navigate = useNavigate()

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
      .then(() => navigate("/"))
      .catch((err) => console.error(err))
      .finally(() => setLoading(false));
  };

  return (
    <section className="app-page pt-28 pb-10">
      <div className="mx-auto w-full max-w-3xl px-4 sm:px-6">
        <div className="auth-card fade-in-up p-7 sm:p-10">
          <h1 className="display-title text-5xl text-zinc-100">Upload Video</h1>
          <p className="mb-6 text-sm text-zinc-400">Share your latest content with your audience</p>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <Input
              label="Video title"
              type="text"
              value={title}
              onChange={(e) => {
                setTitle(e.target.value);
                setError("");
              }}
            />
            <Input
              label="Description"
              type="text"
              value={description}
              onChange={(e) => {
                setDescription(e.target.value);
                setError("");
              }}
            />

            <div className="flex items-center justify-between rounded-xl border border-zinc-700/80 bg-zinc-900/70 px-3 py-2">
              <Input
                label={video ? `Video selected: ${video.name}` : "Select video file"}
                type="file"
                accept="video/*"
                hidden
                onChange={(e) => {
                  setVideo(e.target.files[0]);
                  setError("");
                }}
                ref={videoInputRef}
                labelClass="!m-0"
              />
              <Button
                type="button"
                onClick={() => videoInputRef.current.click()}
                disabled={loading}
                variant="secondary"
                className="px-3 py-1 text-xs"
              >
                Browse
              </Button>
            </div>

            <div className="flex items-center justify-between rounded-xl border border-zinc-700/80 bg-zinc-900/70 px-3 py-2">
              <Input
                label={thumbnail ? `Thumbnail selected: ${thumbnail.name}` : "Select thumbnail file"}
                type="file"
                accept="image/*"
                hidden
                onChange={(e) => {
                  setThumbnail(e.target.files[0]);
                  setError("");
                }}
                ref={thumbnailInputRef}
                labelClass="!m-0"
              />
              <Button
                type="button"
                disabled={loading}
                onClick={() => {
                  thumbnailInputRef.current.click();
                  setError("");
                }}
                variant="secondary"
                className="px-3 py-1 text-xs"
              >
                Browse
              </Button>
            </div>

            {error && (
              <p className="rounded-lg border border-rose-500/40 bg-rose-950/35 px-3 py-2 text-center text-sm text-rose-300">{error}</p>
            )}

            <Button type="submit" disabled={loading} className="min-w-30">
              {loading ? "Uploading..." : "Upload"}
            </Button>
          </form>
        </div>
      </div>
    </section>
  );
}

export default UploadComponent;

import React, { useState } from "react";
import { useNavigate } from "react-router";

export default function Create() {
  const [form, setForm] = useState({
    username: "",
    caption: "",
    photo: ""
  });

  const navigate = useNavigate();

  function updateForm(value) {
    return setForm((prev) => {
      return { ...prev, ...value };
    });
  }

  function handleImageChange(e) {
    const file = e.target.files[0];
    const reader = new FileReader();
    reader.onloadend = () => {
      updateForm({ photo: reader.result });
    };
    if (file) {
      reader.readAsDataURL(file);
    }
  }

  async function onSubmit(e) {
    e.preventDefault();

    const newPost = { ...form };

    await fetch("http://localhost:5050/post", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(newPost),
    })
    .catch(error => {
      window.alert(error);
      return;
    });

    setForm({ username: "", caption: "", photo: "" });
    navigate("/");
  }

  return (
    <div>
      <h3>Create New Post</h3>
      <form onSubmit={onSubmit}>
        <div className="form-group">
          <label htmlFor="username">Username</label>
          <input
            type="text"
            className="form-control"
            id="username"
            value={form.username}
            onChange={(e) => updateForm({ username: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="caption">Caption</label>
          <input
            type="text"
            className="form-control"
            id="caption"
            value={form.caption}
            onChange={(e) => updateForm({ caption: e.target.value })}
          />
        </div>
        <div className="form-group">
          <label htmlFor="photo">Photo</label>
          <input
            type="file"
            className="form-control"
            id="photo"
            accept="image/*"
            onChange={handleImageChange}
          />
        </div>
        <div className="form-group">
          <input
            type="submit"
            value="Create Post"
            className="btn btn-primary"
          />
        </div>
      </form>
    </div>
  );
}
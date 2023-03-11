// Get reference to the HTML button
const submitBtn = document.getElementById("submit-btn");

// Add an event listener to the button
submitBtn.addEventListener("click", async () => {
  await mergeVideos();
});

async function mergeVideos() {
  const video1 = document.getElementById("video1").files[0];
  const video2 = document.getElementById("video2").files[0];

  if (!video1 || !video2) {
    alert("Please select two video files to merge.");
    return;
  }

  const formData = new FormData();
  formData.append("videos", video1);
  formData.append("videos", video2);

  const token = document.cookie.replace(
    /(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/,
    "$1"
  );

  try {
    const response = await fetch(
      "http://localhost:3000/api/video/merge-video",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (!response.ok) {
      alert(response.json().message);
    }

    if (response.ok) {
      const blob = await response.blob();
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.download = "merged.mp4";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    } else {
      const data = await response.json();
      alert(data.message);
    }
  } catch (err) {
    console.error(err);
    alert("Error occurred while merging videos.");
  }
}
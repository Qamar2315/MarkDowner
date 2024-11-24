const BASE_URL = "http://127.0.0.1:5000"; // Replace with your actual backend URL

const form = document.getElementById("markdown-form");
const markdownInput = document.getElementById("markdown");
const fileInput = document.getElementById("file");
const fileNameDisplay = document.getElementById("file-name");
const errorMessage = document.getElementById("error-message");
const convertButton = document.getElementById("convert-button");

// Update file name display
fileInput?.addEventListener("change", () => {
  const file = fileInput.files[0];
  fileNameDisplay.textContent = file ? file.name : "No file selected";
});

// Handle form submission
form?.addEventListener("submit", async (e) => {
  e.preventDefault();
  errorMessage.classList.add("hidden");
  convertButton.textContent = "Converting...";
  convertButton.disabled = true;

  const formData = new FormData();
  const markdown = markdownInput.value;
  const file = fileInput.files[0];

  if (markdown) formData.append("markdown", markdown);
  if (file) formData.append("file", file);

  try {
    const response = await axios.post(`${BASE_URL}/convert`, formData, {
      responseType: "blob",
      headers: { "Content-Type": "multipart/form-data" },
    });

    const url = window.URL.createObjectURL(response.data);
    const link = document.createElement("a");
    link.href = url;
    link.setAttribute("download", "output.pdf");
    document.body.appendChild(link);
    link.click();
  } catch (error) {
    console.error("Error converting to PDF:", error);
    errorMessage.textContent =
      "Failed to convert Markdown to PDF. Please try again.";
    errorMessage.classList.remove("hidden");
  } finally {
    convertButton.textContent = "Convert to PDF";
    convertButton.disabled = false;
  }
});

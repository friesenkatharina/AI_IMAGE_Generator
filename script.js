const apiKey = "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";

const maxImages = 4; // Number of images to generate for each prompt
let selectedImageNumber = null;

// Function to generate a random number between min and max (inclusive)
function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

// Function to disable the generate button during processing
function disableGenerateButton() {
  document.getElementById("generate").disabled = true;
}

// Function to enable the generate button after process
function enableGenerateButton() {
  document.getElementById("generate").disabled = false;
}

// Function to clear image grid
function clearImageGrid() {
  const imageGrid = document.getElementById("image-grid");
  imageGrid.innerHTML = "";
}

// Function to generate images
async function generateImages(input) {
  disableGenerateButton();
  clearImageGrid();

  const loading = document.getElementById("loading");
  loading.style.display = "block";

  const imageUrls = [];

  for (let i = 0; i < maxImages; i++) {
    // Generate a random number between 1 and 10000 and append it to the prompt
    const randomNumber = getRandomNumber(1, 10000);
    const prompt = `${input} ${randomNumber}`;
    //  random number to prompt to create different results
    const response = await fetch(
      "https://api-inference.huggingface.co/models/prompthero/openjourney",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${apiKey}`,
        },
        body: JSON.stringify({ inputs: prompt }),
      }
    );

    if (!response.ok) {
      alert("Failed to generate image!");
    }

    const blob = await response.blob();
    const imgUrl = URL.createObjectURL(blob);
    imageUrls.push(imgUrl);

    const img = document.createElement("img");
    img.src = imgUrl;
    img.alt = `art-${i + 1}`;
    img.onclick = () => downloadImage(imgUrl, i);
    document.getElementById("image-grid").appendChild(img);
  }

  loading.style.display = "none";
  enableGenerateButton();

  selectedImageNumber = null; // Reset selected image number
}

document.getElementById("generate").addEventListener("click", () => {
  const input = document.getElementById("user-prompt").value;
  generateImages(input);
});

function downloadImage(imgUrl, imageNumber) {
  const link = document.createElement("a");
  link.href = imgUrl;
  // Set filename based on the selected image
  link.download = `image-${imageNumber + 1}.jpg`;
  link.click();
}

// style

// h1
const h1Style = {
  fontSize: "28px",
  fontWeight: "600",
  marginBottom: "15px",
  textAlign: "center",
};

document.querySelectorAll("h1").forEach((h1) => {
  Object.assign(h1.style, h1Style);
});

// paragraph

const pStyle = {
  fontSize: "14px",
  color: "#ccc",
  lineHeight: "1.4rem",
  textAlign: "justify",
};

document.querySelectorAll("p").forEach((p) => {
  Object.assign(p.style, pStyle);
});

// container
const containerStyle = {
  position: "relative",
  width: "40rem",
  color: "#fff",
  background: "rgba(0, 0, 0, 0.44)",
  padding: "20px 30px",
  borderRadius: "16px",
  boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
  backdropFilter: "blur(7.4px)",
  WebkitBackdropFilter: "blur(7.4px)",
  border: "1px solid rgba(0, 0, 0, 0.1)",
};

function createPseudoElement(parent, style) {
  const pseudoElement = document.createElement("div");
  Object.assign(pseudoElement.style, style);
  parent.appendChild(pseudoElement);
}

const container = document.querySelector(".container");
Object.assign(container.style, containerStyle);

const containerBeforeStyle = {
  position: "absolute",
  backgroundColor: "#ed2ff0",
  width: "120px",
  height: "120px",
  filter: "blur(140px)",
  left: "-20%",
  top: "10%",
  zIndex: -1000,
};

const containerAfterStyle = {
  position: "absolute",
  backgroundColor: "#675afe",
  width: "120px",
  height: "120px",
  filter: "blur(140px)",
  right: "-20%",
  bottom: "-10%",
  zIndex: -1000,
};

createPseudoElement(container, containerBeforeStyle);
createPseudoElement(container, containerAfterStyle);
const inputStyle = {
  width: "80%",
  borderRadius: "5px",
  outline: "none",
  border: "1px solid #999",
  padding: "0 15px",
  backgroundColor: "transparent",
  color: "#fff",
  transition: "all 0.3s ease",
};

document.querySelectorAll("input").forEach((input) => {
  Object.assign(input.style, inputStyle);
});
const buttonStyle = {
  width: "20%",
  height: "36px",
  color: "#fff",
  border: "1px solid #ccc",
  background: "#20232c",
  cursor: "pointer",
  borderRadius: "5px",
  fontSize: "0.9rem",
  transition: "all 0.3s ease",
};

document.querySelectorAll("button").forEach((button) => {
  Object.assign(button.style, buttonStyle);
});
const resultStyle = {
  marginTop: "10px",
  width: "100%",
  padding: "10px 0 0",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
};

document.querySelectorAll(".result").forEach((element) => {
  Object.assign(element.style, resultStyle);
});
const imageGridStyle = {
  display: "grid",
  gridTemplateColumns: "repeat(2, 1fr)",
  gap: "10px",
  marginBottom: "10px",
  maxWidth: "80%",
};

const imageGrid = document.getElementById("image-grid");
Object.assign(imageGrid.style, imageGridStyle);

document.querySelectorAll("#image-grid img").forEach((img) => {
  Object.assign(img.style, imageStyle);
});

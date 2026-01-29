const slugify = require('slugify');
const prompt = require('prompt-sync')({sigint: true});

const fs = require("fs");
const path = require("path");
// const title = process.argv[2];
const date = new Date(Date.now());

newPost();

function newPost() {
  const today = formatDateLocal(date);
  const title = prompt("Title (no quotes): ");
  const filePath = generateFilePath(title);
  const content = generateContent(today, title);
  fs.writeFile(filePath, content, { flag: "w+" }, (err) => {
    if (err) return console.log(err);
    console.log(`Created ${filePath}`);
  });
}

function generateFilePath(title) {
  slugTitle = slugify(title, {
    lower: true
  });
  return path.join(__dirname, "..", "src", "blog", `${slugTitle}.md`);
}

function formatDateLocal(date) {
  const year = date.getFullYear();
  // getMonth() returns a 0-indexed value (0 for January), so add 1
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}

function generateContent(today, title) {
  const frontMatter = "---\ntitle: " + title + "\ndate: " + today + "\nlastmod: \ncategories: ['']\ntags: ['']\ndraft: true\n---";
  return frontMatter;
}

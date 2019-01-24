const fs = require("fs");
const path = require("path");
const templatePath = `${__dirname}/template`;
const dirDist = `${__dirname}/modules`;
const { pascalCase, camelCase, hyphenate } = require("./string-utilities");

const transformToPascalCase = (x, newValue) =>
  x.replace(/{pascalCase}/g, pascalCase(newValue));
const transformToCamelCase = (x, newValue) =>
  x.replace(/{camelCase}/g, camelCase(newValue));
const transformToHyphenate = (x, newValue) =>
  x.replace(/{hyphenate}/g, hyphenate(newValue));
const isDirectory = file => fs.lstatSync(file).isDirectory();
const isFile = file => fs.lstatSync(file).isFile();

const readingFile = (name, newLocation, fileName) => (err, fileContent) => {
  if (err) throw err;
  if (name !== undefined) {
    let newFileName = transformToHyphenate(fileName, name);
    let newFileContent = "";

    newFileContent = transformToPascalCase(fileContent, name);
    newFileContent = transformToCamelCase(newFileContent, name);
    newFileContent = transformToHyphenate(newFileContent, name);
    fs.writeFile(`${newLocation}/${newFileName}`, newFileContent, function(
      err
    ) {
      if (err) throw err;

      console.log(`The file ${newFileName} was saved!`);
    });
  } else {
    return;
  }
};

const readingDir = (currentPath, newLocation, name) => (err, files) => {
  if (err) throw err;

  files.map(file => {
    const newCurrentPath = `${currentPath}/${file}`;

    if (isDirectory(newCurrentPath)) {
      const newFolderLocation = `${newLocation}/${file}`;
      if (!fs.existsSync(newFolderLocation)) {
        fs.mkdirSync(newFolderLocation);
      }
      fs.readdir(
        `${newCurrentPath}`,
        readingDir(newCurrentPath, newFolderLocation, name)
      );
    } else if (isFile(newCurrentPath)) {
      fs.readFile(
        `${newCurrentPath}`,
        "utf8",
        readingFile(name, newLocation, file)
      );
    }
  });
};

module.exports = (type, name) => {
  const newPath = `${dirDist}/${type}`;

  if (!fs.existsSync(newPath)) {
    fs.mkdirSync(newPath);
  }

  const currentPath = `${templatePath}/${type}`;
  const newDirName = hyphenate(name);
  const newLocation = `${newPath}/${newDirName}`;

  if (!fs.existsSync(newLocation)) {
    fs.mkdirSync(newLocation);
  }

  fs.readdir(`${currentPath}`, readingDir(currentPath, newLocation, name));

  console.log(`You can find all files here: ${newLocation}`);
  console.log("_________________________");
};

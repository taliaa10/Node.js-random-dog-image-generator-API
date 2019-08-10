const fs = require('fs');
const superagent = require('superagent');

const readFilePro = file => {
  return new Promise((res, rej) => {
    fs.readFile(file, (err, data) => {
      if (err) rej('I could not find that file 😢');
      res(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((res, rej) => {
    fs.writeFile(file, data, err => {
      if (err) PromiseRejectionEvent('Could not write file 😢');
      res('success');
    });
  });
};

///////////////////////////////
// Async/Await

const getDogPic = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`Breed: ${data}`);

    const res1Prom = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res2Prom = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const res3Prom = superagent.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const all = await Promise.all([res1Prom, res1Prom, res3Prom]);
    const imgs = all.map(el => el.body.message);
    console.log(imgs);

    await writeFilePro(`dog-img.txt`, imgs.join('\n'));
    console.log('Random dog image saved to file!');
  } catch (err) {
    console.log(err);
    throw err;
  }
  return '2: READY  🐶';
};
async () => {
  try {
    console.log('1: Will get dog pics!');
    const x = await getDogPic();
    console.log(x);
    console.log('3: Done getting dog pics!');
  } catch (err) {
    console.log('ERROR! 💥');
  }
};

console.log('1: Will get dog pics!');
getDogPic()
  .then(x => {
    console.log(x);
  })
  .catch(err => {
    console.log('ERROR! 💥');
  });
console.log('3: Done getting dog pics!');

// readFilePro(`${__dirname}/dog.txt`)
//   .then(data => {
//     console.log(`Breed: ${data}`);
//     return superagent.get(`https://dog.ceo/api/breed/${data}/images/random`);
//   })
//   .then(res => {
//     console.log(res.body.message);
//     return writeFilePro(`dog-img.txt`, res.body.message);
//   })
//   .then(() => {
//     console.log('Random dog image saved to file!');
//   })
//   .catch(err => {
//     console.log(err.message);
//   });

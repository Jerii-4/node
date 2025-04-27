const fs = require('fs');
const sp = require('superagent');

const readFilePro = (file) => {
  return new Promise((resolve, reject) => {
    fs.readFile(file, (err, data) => {
      if (err) reject('error');
      resolve(data);
    });
  });
};

const writeFilePro = (file, data) => {
  return new Promise((resolve, reject) => {
    fs.writeFile(file, data, (err) => {
      if (err) reject('error');
      resolve('success');
    });
  });
};

const GetDog = async () => {
  try {
    const data = await readFilePro(`${__dirname}/dog.txt`);
    console.log(`breed: ${data}`);

    const res1Pro = sp.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res2Pro = sp.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
    const res3Pro = sp.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );

    const all = await Promise.all([res1Pro, res2Pro, res3Pro]);
    
    const imgs = all.map((el) => el.body.message);
    console.log(imgs);

    
    await writeFilePro('dog_image.txt',imgs.join('\n'));
    console.log('saved');
  } catch (err) {
    console.log(err.message);
    throw err;
  }
  return '2.ready';
};
(async () => {
  try {
    console.log('1.get');
    const x = await GetDog();
    console.log(x);
    console.log('3.done');
  } catch (err) {
    console.log('err');
  }
})();

/*
console.log("1.get")
GetDog().then(x=>{

    console.log(x)
    console.log("3.done")
})
.catch((err) => {
    console.log("er");
  });
*/
/*
readFilePro(`${__dirname}/dog.txt`)
  .then((data) => {
    console.log(`breed: ${data}`);

    return sp.get(
      `https://dog.ceo/api/breed/${data}/images/random`
    );
  })
  .then((res) => {
    console.log(res.body.message);
    return writeFilePro('dog_image.txt', res.body.message);
})
    .then(() => {
        console.log("saved");
  })
  .catch((err) => {
    console.log(err.message);
  }); */

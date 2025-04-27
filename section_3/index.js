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
    fs.writeFile(file,  data,(err) => {
      if (err) reject('error');
      resolve('success');
    });
  });
};

const GetDog = async()=>{
    try{
   const data= await readFilePro(`${__dirname}/dog.txt`)
   console.log(`breed: ${data}`);

   const res = await sp.get(
    `https://dog.ceo/api/breed/${data}/images/random`
  );
  console.log(res.body.message);
  await writeFilePro('dog_image.txt', res.body.message);
  console.log("saved");
}catch(err) {
    console.log(err.message);
  }
}
GetDog();





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

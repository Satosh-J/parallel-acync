
import axios from 'axios'
import async from 'async'

const urls = [
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/1',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/2',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/3',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/4',
]
async function runInParallel (urls: string[], concurrency: number) : Promise<string[]> {
  return async.mapLimit(urls,concurrency, function (url) {
    getFruit(url)
}, function (err, results) {
    // completion function
    if (!err) {
        return results
    } else {
        // handle error here
        console.log(err)
    }
});
}

async function getFruit(url: string) {
    await axios.get(url).then(function(response) {
      console.log(response.data)
    })
    .catch(function(error) {
      console.log({error: error.code})
    });
}

runInParallel(urls, 2)
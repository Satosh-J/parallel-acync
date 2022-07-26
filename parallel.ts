
import axios from 'axios'
var async = require("async");


// For the test assignment, create mock api endpoints.
const urls = [
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/1',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/2',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/3',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/4',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/5',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/6',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/7',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/8',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/9',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/10',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/11',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/12',
]
async function runInParallel(urls: string[], concurrency: number): Promise<string[]> {
  return async.mapLimit(
    urls,
    concurrency,
    async (url: string, callback: (e: Error, result: any) => void) => {
      try {
        const res = await axios.get(url)
        console.log({ data: res.data }) // To check concurrency, it sends amount of "concurrency" request at the same time.
        callback(null, res.data)
      } catch (e) {
        callback(e, null)
      }
    },
    (err: any, results: Array<any>) => {
      // completion function
      if (!err) {
        console.log({ results })
        // return results
      } else {
        // handle error here
        console.log(err)
      }
    }
  );
}

runInParallel(urls, 2)
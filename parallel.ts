
import axios from 'axios'
var async = require("async");

const urls = [
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/1',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/2',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/3',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/4',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/3',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/4',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/3',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/4',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/3',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/4',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/3',
  'https://62ddfee6ccdf9f7ec2cf75a0.mockapi.io/fruits/4',
]
async function runInParallel(urls: string[], concurrency: number): Promise<string[]> {
  return async.mapLimit(
    urls,
    concurrency,
    async (url: string, callback: (e: Error, result: any) => void) => {
      try {
        const res = await axios.get(url)
        console.log({ data: res.data })
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
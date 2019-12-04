export default (req, res) => {
  const { waitingSecond } = req.query

  if(waitingSecond == null) {
    res.end(JSON.stringify({id: 1, name: 'sato'}))
    return
  }

  const _waitingSecond = Number(waitingSecond)
  const sleep = async (second: number) => new Promise(resolve => setTimeout(resolve, second * 1000))
  sleep(_waitingSecond).then(() => {
    res.end(JSON.stringify({id: 1, name: 'sato'}))
  })
}
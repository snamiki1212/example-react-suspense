export default (req, res) => {
  const { waitingTime } = req.query
  if(waitingTime == null) {
    res.end(JSON.stringify({id: 1, name: 'sato'}))
    return
  }
  
  console.log('waiting')
  res.end(JSON.stringify({id: 1, name: 'sato'}))
}
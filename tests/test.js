const stringDate = '2021-04-18'

const fixDate = (date) => {
  const datePieces = date.split('-');
  const numberedDate = []
  datePieces.forEach((piece) => {
    parseInt(piece)
    numberedDate.push(piece)
  })
  return numberedDate.join('-')
}
console.log(fixDate(stringDate));

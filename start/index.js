const users = require('../users')

function getBalance(user) {
  var balance = 0
  var usersBalance = user.balance
  usersBalance = usersBalance.replace('$','')
  usersBalance = usersBalance.replace(',','')
  usersBalance = usersBalance.replace('.','')
  return +usersBalance
}


console.log(
  users.map(getBalance)
)














// function getbalance2(user) {
//   return user
//     .map(u => u.balance)
//     .map(balance => balance.replace('$',''))
//     .map(balance => balance.replace(',',''))
//     .map(balance => balance.replace('.',''))
//     .map(balance => +balance)
// }
// 
// console.log(
//   users.map(getbalance2)
// )
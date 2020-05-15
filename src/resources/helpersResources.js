export const formatDate = (timestamp) => {
  const date = new Date(timestamp)
  const time = date.toLocaleTimeString('en-US')
  return time.substr(0, 5) + time.slice(-2) + ' | ' + date.toLocaleDateString()
}
// using shortIds
const generateID = () => Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);

export const  formatQuestion =  ({ optionOneText, optionTwoText, author }) => ( {
    id: generateID(),
    timestamp: Date.now(),
    author,
    optionOne: {
      votes: [],
      text: optionOneText,
    },
    optionTwo: {
      votes: [],
      text: optionTwoText,
    }
  })
// Write your code here.
import './index.css'

const EmojiCard = props => {
  const {emojiDetails, onClickEmoji} = props
  const {id, emojiName, emojiUrl} = emojiDetails

  const onClickEachEmoji = () => {
    onClickEmoji(id)
  }

  return (
    <li className="emoji-card">
      <button className="emoji-button" type="button" onClick={onClickEachEmoji}>
        <img className="emoji-img" alt={emojiName} src={emojiUrl} />
      </button>
    </li>
  )
}

export default EmojiCard

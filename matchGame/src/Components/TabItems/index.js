import './index.css'

const TabItems = props => {
  const {tabItemDetails, setActiveTabId, isActive} = props
  const {displayText, tabId} = tabItemDetails

  const buttonClassName = isActive ? 'selectItemButton' : 'itemButton'

  const onClickTabOption = () => {
    setActiveTabId(tabId)
  }

  return (
    <li className="listItems">
      <button
        type="button"
        className={buttonClassName}
        onClick={onClickTabOption}
      >
        <p>{displayText}</p>
      </button>
    </li>
  )
}

export default TabItems

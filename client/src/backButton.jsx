import backArrow from './back_arrow'

export default function backButton() {
    return <img
    src={backArrow}
  //   onClick={this.handleBackButtonClick}
    style={{
      position: 'absolute',
      top: '10px',
      left: '10px',
      zIndex: 1,
      cursor: 'pointer',
    }}
    alt="Back"
  />
}
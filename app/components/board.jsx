import React, {PureComponent} from 'react'

const LINE_COLOR = '#ddd', FILL_COLOR = '#fff'
const CANVAS_SIZE = 500
const X_COLOR = '#f1be32', O_COLOR = '#01bBC2'

class Board extends PureComponent {
  static propTypes = {
    gameBoard: React.PropTypes.array.isRequired,
    action: React.PropTypes.func.isRequired,
    player: React.PropTypes.string.isRequired
  }

  constructor(props) {
    super(props)
    this.drawPiece = this.drawPiece.bind(this)
    this.sectionSize = CANVAS_SIZE / 3
  }

  componentDidMount() {
    this.context = this.canvas.getContext('2d')
    this.canvas.width = CANVAS_SIZE
    this.canvas.height = CANVAS_SIZE
    this.context.translate(0.5, 0.5)

    this.drawLines(10, LINE_COLOR)

    this.redrawPieces()
  }

  componentDidUpdate() {
    this.context = this.canvas.getContext('2d')
    this.redrawPieces()
  }

  redrawPieces() {
    this.props.gameBoard.map((player, index) => {
      const coords = {
        x: (index % 3) * this.sectionSize,
        y: Math.floor(index / 3) * this.sectionSize
      }

      this.addPlayingPiece(coords, player)
    })
  }

  drawLines(lineWidth, strokeStyle) {
    var lineStart = 4
    var lineLenght = CANVAS_SIZE - 5
    this.context.lineWidth = lineWidth
    this.context.lineCap = 'round'
    this.context.strokeStyle = strokeStyle
    this.context.beginPath()

    for (let i = 1; i <= 2; i++) {
      this.context.moveTo(lineStart, i * this.sectionSize)
      this.context.lineTo(lineLenght, i * this.sectionSize)
    }

    for (let i = 1; i <= 2; i++) {
      this.context.moveTo(i * this.sectionSize, lineStart)
      this.context.lineTo(i * this.sectionSize, lineLenght)
    }

    this.context.stroke()
  }

  clearPlayingArea (xCordinate, yCordinate) {
    this.context.fillStyle = FILL_COLOR
    this.context.fillRect(
      xCordinate,
      yCordinate,
      this.sectionSize,
      this.sectionSize
    )
  }

  drawPiece(e) {
    let mouse = this.getCanvasMousePosition(e), xCordinate, yCordinate

    for (var x = 0; x < 3; x++) {
      for (var y = 0; y < 3; y++) {
        xCordinate = x * this.sectionSize
        yCordinate = y * this.sectionSize

        if (
            mouse.x >= xCordinate && mouse.x <= xCordinate + this.sectionSize &&
            mouse.y >= yCordinate && mouse.y <= yCordinate + this.sectionSize
          ) {
            this.props.action(x, y)
        }
      }
    }
  }

  getCanvasMousePosition (e) {
    var rect = this.canvas.getBoundingClientRect()

    return {
      x: e.clientX - rect.left,
      y: e.clientY - rect.top
    }
  }

  addPlayingPiece ({x, y}, initialPlayer = false) {
    this.clearPlayingArea(x, y)
    this.drawLines(10, LINE_COLOR)

    const player = initialPlayer ? initialPlayer : this.props.player

    if (player === 'x') {
      this.drawX(x, y)
    } else if (player === 'o') {
      this.drawO(x, y)
    }
  }

  drawX (xCordinate, yCordinate) {
    const offset = 50

    this.context.strokeStyle = X_COLOR
    this.context.beginPath()

    this.context.moveTo(xCordinate + offset, yCordinate + offset)
    this.context.lineTo(xCordinate + this.sectionSize - offset, yCordinate + this.sectionSize - offset)
    this.context.moveTo(xCordinate + offset, yCordinate + this.sectionSize - offset)
    this.context.lineTo(xCordinate + this.sectionSize - offset, yCordinate + offset)

    this.context.stroke()
  }

  drawO (xCordinate, yCordinate) {
    var halfSectionSize = (0.5 * this.sectionSize)
    var centerX = xCordinate + halfSectionSize
    var centerY = yCordinate + halfSectionSize
    var radius = (this.sectionSize - 100) / 2
    var startAngle = 0 * Math.PI
    var endAngle = 2 * Math.PI

    this.context.lineWidth = 10
    this.context.strokeStyle = O_COLOR
    this.context.beginPath()
    this.context.arc(centerX, centerY, radius, startAngle, endAngle)
    this.context.stroke()
  }

  cross () {

  }

  render() {
    return (
        <div className="tic-tac-toe__wrapper">
          <canvas ref={canvas => this.canvas = canvas} className="tic-tac-toe__board" onClick={this.drawPiece}></canvas>
        </div>
    )
  }
}

export default Board

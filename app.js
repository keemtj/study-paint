// code
// 경로그리기: https://developer.mozilla.org/ko/docs/Web/HTML/Canvas/Tutorial/Drawing_shapes
// path method: https://developer.mozilla.org/ko/docs/Web/API/CanvasRenderingContext2D
// sava: https://developer.mozilla.org/en-US/docs/Web/API/HTMLCanvasElement/toDataURL
/**
 * canvas는 context를 갖는 HTML 태그이다
 * canvas는 2개의 사이즈를 갖는다
 * css size, manipulating size
 * canvas의 context는 요소 안에서 픽셀에 접근할 수 있는 방법이다
 * strokeStyle: 라인 색상
 * lineWidth: 라인 두께
 * beginPath: 새로운 경로를 생성함, 이후 그리기 명령들은 경로를 구성하고 만드는데 사용하게 됨
 * 이 메서드가 호출될 때 마다 하위 경로의 모음은 초기화 되고 새로운 도형을 그릴 수 있게 됨
 * moveTo: 펜이나 연필을 종이 위에서 들어 옆으로 옮기는 것으로 보면 된다
 * lineTo: 현재 sub-path의 마지막 점을 특정 좌표와 직선으로 연결한다
 *
 * stroke: 윤곽선을 이용해 도형을 그림
 * fill: 경로의 내부를 채워서 내부가 채워진 도형을 그림
 */

const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor"); // HTMLCollection
// const colors = document.querySelectorAll(".jsColor"); // NodeList
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

// default value
// 코드나 변수 등이 반복된다는 것을 알았을 때 Default변수를 선언해준다.
const INITIAL_STROKE_COLOR = "#2c2c2c";
const INITIAL_FILL_COLOR = "white";
const CANVAS_SIZE = 650;

canvas.width = CANVAS_SIZE;
canvas.height = CANVAS_SIZE;
// stroke(paint)
ctx.strokeStyle = INITIAL_STROKE_COLOR;
ctx.lineWidth = 2.5;
ctx.lineCap = "round";
// fill(fill)
ctx.fillStyle = INITIAL_FILL_COLOR;
ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
// ctx.fillStyle = INITIAL_COLOR;

let painting = false;
let filling = false;

function startPainting() {
  painting = true;
}

function stopPainting() {
  painting = false;
}

// making lines
function onMouseMove(e) {
  const { offsetX: x, offsetY: y } = e;
  if (!painting) {
    // console.log("creating path in", x, y);
    ctx.beginPath(); // 새로운 경로를 만들어줌
    ctx.moveTo(x, y); // 펜을 x, y로 지정된 좌표로 옮김
  } else {
    // console.log("creating line in", x, y);
    ctx.lineTo(x, y); // 이전의 점과 연결
    ctx.stroke();
  }
}

function handleColorClick(e) {
  // const color = e.target.style.backgroundColor; // rgb()
  const { color } = e.target.dataset; // data-color
  ctx.strokeStyle = color;
  ctx.fillStyle = color;
}

function handleRangeChange(e) {
  const lineWidth = e.target.value;
  ctx.lineWidth = lineWidth;
}

function handleModeClick() {
  if (!filling) {
    filling = true;
    mode.innerText = "paint";
  } else {
    filling = false;
    mode.innerText = "fill";
  }
}

function handleCanvasClick() {
  if (filling) {
    ctx.fillRect(0, 0, CANVAS_SIZE, CANVAS_SIZE);
  }
}

function handleContextMenu(e) {
  if (e.target.matches("canvas")) e.preventDefault();
}

function handleSaveClick() {
  // canvas 이미지를 data url로 변환
  const image = canvas.toDataURL("image/png");
  // 다운로드 기능을 위해 'a'태그 생성
  const link = document.createElement("a");
  // href에 data url주소 할당
  link.href = image;
  // filename 지정
  // link.setAttribute("download", "handsome");
  link.download = "fileName";
  // element에 마우스클릭 시뮬레이션
  // button 클릭시 <a href="" download></a>가 시뮬레이션 클릭이 되기 위함
  link.click();
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
  canvas.addEventListener("click", handleCanvasClick);
  canvas.addEventListener("contextmenu", handleContextMenu);
}

[...colors].forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

if (range) {
  // input 이벤트는 change 이벤트와는 달리 value 속성이 바뀔 시마다 반드시 일어난다.
  // 값을 선택하거나 옵션 선택하자마자 일어나지만, 특정 글자를 입력 시에는 입력이 끝나고 value 속성에 적용되어야 발생하는데,
  // 예를 들면, 한글 입력의 경우 한글자가 완성된 뒤 다른 키를 입력(예: 엔터 키)이 일어나야 발생된다.
  // 이 또한 브라우저마다 다르므로 호환성을 확인하여 대응해야 한다. (역자 주)
  // range.addEventListener("change", handleRangeChange);
  range.addEventListener("input", handleRangeChange);
}

if (mode) {
  mode.addEventListener("click", handleModeClick);
}
if (save) {
  save.addEventListener("click", handleSaveClick);
}

// code
// 경로그리기: https://developer.mozilla.org/ko/docs/Web/HTML/Canvas/Tutorial/Drawing_shapes
// path method: https://developer.mozilla.org/ko/docs/Web/API/CanvasRenderingContext2D
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
const colors = document.getElementsByClassName("jsColor");
// const colors = document.querySelectorAll(".jsColor");

canvas.width = 650;
canvas.height = 650;
ctx.strokeStyle = "#2c2c2c";
ctx.lineWidth = 5;
// ctx.lineCap = "round";

let painting = false;

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
  // const color = e.target.style.backgroundColor;
  const { color } = e.target.dataset;
  ctx.strokeStyle = color;
}

if (canvas) {
  canvas.addEventListener("mousemove", onMouseMove);
  canvas.addEventListener("mousedown", startPainting);
  canvas.addEventListener("mouseup", stopPainting);
  canvas.addEventListener("mouseleave", stopPainting);
}
[...colors].forEach((color) =>
  color.addEventListener("click", handleColorClick)
);

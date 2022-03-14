//variáveis
var trex, trexImg;
var edges;
var chao, chaoImg;
var chaoinvisivel;
var nuven, nuvenImg;
var obs1,obs2,obs3,obs4,obs5,obs6;
var pontuacao = 0;
var PLAY;
var END;
var gameState = PLAY;
//pre carregamento de imagem 
function preload() {
  //carregar imagens em variáveis auxiliares
  trexImg = loadAnimation("trex1.png", "trex3.png", "trex4.png");
  chaoImg = loadImage("ground2.png");
  nuvenImg = loadImage("cloud.png");
  obs1 = loadImage("obstacle1.png");
  obs2 = loadImage("obstacle2.png");
  obs3 = loadImage("obstacle3.png");
  obs4 = loadImage("obstacle4.png");
  obs5 = loadImage("obstacle5.png");
  obs6 = loadImage("obstacle6.png");
}

//configuração
function setup() {
  //criação da area do jogo
  createCanvas(600, 200);

  chaoinvisivel = createSprite(200,190,400,10);
  chaoinvisivel.visible = false;
  //criando o trex
  trex = createSprite(50, 160, 20, 50);
  trex.addAnimation("correndo", trexImg);
  trex.scale = 0.5;

  chao = createSprite(200,180,400,20);
  chao.addImage("solo", chaoImg);
  //definindo limites
  edges = createEdgeSprites();

  //var test = Math.round (random(1,100));
  //console.log (test);
  obstaculos = new Group();
  nuves = new Group();
}

function draw() {
  background('white');

  text("pontoação: "+ pontuacao,500,50);
if (gameState === PLAY){
chao.velocityX = -4;
pontuacao = pontuacao+Math.round(frameCount/60);
 if(chao.x<0){
    chao.x = chao.width / 2;
  }
  //pular quando a tecla de espaço for pressionada
  if (keyDown("space")&& trex.y>=160) {
    trex.velocityY = -10;
  }
  //gravidade
  trex.velocityY = trex.velocityY + 0.5;
criarnuvens();
criarobstaculos();
if(obstaculos.isTouching(trex)){
  gameState = END;
}
//console.log(frameCount);
}
else if(gameState === END){
  ground.velocityX = 0;
  obstaculos.setVelocityXEach(0);
  nuves.setVelocityXEach(0);
}

  //colidindo
  trex.collide(chaoinvisivel);
  //trex.collide(edges[3]);
  drawSprites();
}
function criarobstaculos(){
  if (frameCount%60 === 0){
  var obstaculo = createSprite(610,165,10,40);
  obstaculo.velocityX = -6;
  var sorteio = Math.round(random(1,6));
  switch(sorteio){
    case 1:obstaculo.addImage(obs1);
    break;
    case 2:obstaculo.addImage(obs2);
    break;
    case 3:obstaculo.addImage(obs3);
    break;
    case 4:obstaculo.addImage(obs4);
    break;
    case 5:obstaculo.addImage(obs1);
    break;
    case 6:obstaculo.addImage(obs6);
    break;
    default: break;
  }
  obstaculo.scale= 0.5;
  obstaculo.lifetime = 300;
  obstaculos.add(obstaculo);
}}
function criarnuvens(){
  if(frameCount%60 == 0){
nuven = createSprite(610,100,10,10);
nuven.y = Math.round(random(50,100));
nuven.velocityX = -3;
nuven.addImage("nuven",nuvenImg)
nuven.scale = 0.5;
nuven.depth = trex.depth;
trex.depth = trex.depth +1;

console.log(nuven.depth);
console.log(trex.depth);
nuven.lifetime = 220;
nuves.add(nuven);
}
}
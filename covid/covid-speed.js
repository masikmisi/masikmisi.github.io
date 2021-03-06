let covid;
let country;
let infectionRate;
let speed=0;
let dot;
let dotArray;
let countryArray = ['Germany', 'Canada', 'Brazil','Hungary', 'Bulgaria'];
let w = 600;
  let h = 600;
  let margin = 5;
function preload() {
  
  // Get the most recent earthquake in the database
  let url =  '/covid19.json';
  //let covidsummary = 'summary.json';
  //let covidsummary='masikmisi.github.io/blob/master/covid/summary.json';
  let covidsummary = "https://api.covid19api.com/summary";
  summary = loadJSON(covidsummary);
  //covid = loadJSON(url);
}

function setup() {
  //noLoop();
  frameRate(24);
  
  let canvas = createCanvas(w,h);
  canvas.parent('root');
  textFont('Roboto');
  textSize(14);
  
//infectionRate
dotArray = new Array();
let index = 0;
let inf = "infectionRate";
for ( i=0; i<summary.Countries.length; i++){ 

  let country = new String(summary.Countries[i].Country);
  //get the infection number for this day
  let infectionRate = summary.Countries[i].NewConfirmed;
  let dRate = summary.Countries[i].NewDeaths;
  if (infectionRate != 0 && dRate != 0 &&
    (country == 'Germany' || country=='Hungary' || country=='Italy' || country=='Brazil' || country == 'Austria')){
  let infectionPerMinute=infectionRate/24/60;
  let finalinfspeed= map(infectionPerMinute,0, 1440,0, width);
 
  dot = new covid19(country, finalinfspeed, infectionPerMinute, index,inf);
  dotArray.push(dot); 
  index++;
  } else {

  }
  
}


deathRateArray = new Array();
let dindex = 0;
let d = "deathRate";
for ( i=0; i<summary.Countries.length; i++){ 

  country = summary.Countries[i].Country;
  //get the infection number for this day
  let deathRate = summary.Countries[i].NewDeaths;
  let infR = summary.Countries[i].NewConfirmed;
  if (deathRate != 0 && infR != 0  &&
    (country == 'Germany' || country=='Hungary' || country=='Italy' || country=='Brazil' || country == 'Austria')){
  let deathPerMinute=deathRate/24/60;
  let finaldspeed= map(deathPerMinute,0, 1440,0, width);
 
  da = new covid19(country, finaldspeed, deathPerMinute, dindex, d);
  deathRateArray.push(da); 
  dindex++;
  } else {

  }
  
}
   
    
}

function draw() {
  clear();
  background(255);
  //text(round(round(millis(),0)/1000,0), 0,100,180,40);

  for (i=0; i<dotArray.length;i++){
    
    dotArray[i].display();
    dotArray[i].move();
    
  }

  for (k=0; k<deathRateArray.length;k++){
    
    deathRateArray[k].display();
    deathRateArray[k].move();
    
  }

  
}

// dot class
class covid19  {
  constructor(country,finalspeed, infectionRate, id, rateType) {
    this.country = country;
    this.x = 0+margin;
    this.xlabel = 10;
    this.y = 30+(id*100);
    this.contnum = 0;
    this.diameter = 10;
    this.speed = finalspeed;
    this.infectRate = infectionRate;
    this.rateType = rateType;
  }

  move() {
    if(this.x>=width){
      this.x=0;
      this.contnum++;

    } else{
    this.x += this.speed;
    }
  }

  display() {
    noStroke();
    if (this.rateType !="deathRate"){
      textSize(14);
      fill(57,50,50);
      text(this.country, this.xlabel, this.y+15, 300,200);
      textSize(12);
    } else {
      textSize(12);
    }
    if (this.rateType=="deathRate"){
      fill(90,20,100); 
      
    } else{
    
    fill(0,128,128);
    }
    
    if (this.rateType!="deathRate"){
    stroke(12,12,12);
    line(5,this.y,width,this.y);
    noStroke();
    }
    
    ellipse(this.x, this.y, this.diameter, this.diameter);
    
    


    let infectText = "";

    if (this.infectRate < 0.01){ 

      infectText = round(this.infectRate,3);

    } else if (this.infectRate < 0.1){

      infectText = round(this.infectRate,2);

    } else {
      
      infectText = round(this.infectRate,1);

     }
    
    
    if (this.rateType != "deathRate"){
      if (this.contnum <2) {
      
      
      text(this.contnum+" new case",this.xlabel+80, this.y+18,180,40);
      fill(30,30,30);
      text(infectText+" new cases "+"per minute", this.xlabel+80,this.y+36, 180,40);

    } else {

      
      text(this.contnum+" new cases",this.xlabel+80, this.y+18,180,40);
      fill(30,30,30);
      text(infectText+" new cases "+"per minute", this.xlabel+80,this.y+36, 180,40);

    }


    } else {
      if (this.contnum<2){

      text(this.contnum+" death",this.xlabel+260, this.y+18,180,40);
      fill(30,30,30);
      text(infectText+" deaths "+"per minute", this.xlabel+260,this.y+36, 200,40);
      } else{
        text(this.contnum+" deaths",this.xlabel+260, this.y+18,180,40);
      
        fill(30,30,30);
  
        text(infectText+" deaths "+"per minute", this.xlabel+260,this.y+36, 200,40);


      }
    }
    
  }
  
}



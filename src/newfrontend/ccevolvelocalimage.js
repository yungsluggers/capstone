/*
 *                Genetics Algorithm to Grow Your Own Picture
 *
 * Written by Chris Cummins <chrisc.101@gmail.com>
 * Copyright (c) 2013 Chris Cummins
 * https://chriscummins.cc
 * https://chriscummins.cc/genetics
 *
 * Based on `JavaScript Genetic Algorithm' - Copyright (c) 2009 Jacob Seidelin.
 *   jseidelin@nihilogic.dk, http://blog.nihilogic.dk/
 */

/*
 * We lump the API in a `Genetics' namespace.
 */
'use strict';

// the darknet command
// ./darknet classifier one_label cfg/imagenet1k.data cfg/darknet19.cfg darknet19.weights data/dog.jpg dog

/* The analytics pane elements */
var ap;

/* The working area, used by the fitness function to determine an individuals
 * fitness.
 */
var workingCanvas;
var workingCtx;
var workingData = [];

/* The output area, where we display the fittest population.
 */
var outputCanvas;
var outputCtx;

/* The reference area, where we display the target image that we are
 * selecting towards.
 */
var referenceCanvas;
var referenceCtx;
var referenceImage;

/* Genetics options.
 */
var populationSize;
var selectionCutoff;
var mutationChance;
var mutateAmount;
var fittestSurvive;
var randomInheritance;
var diffSquared;

/* Graphics options.
 */
var workingSize;
var polygons;
var vertices;
var fillPolygons;

/* Simulation session variables.
 */
var clock;
var jiffies;
var numberOfImprovements;
var geneSize;
var dnaLength;
var lowestFitness;
var highestFitness;
var population;
var startTime;

var firstIter = 0;

var opacityMin = 0.95;

function setDefaults() {
  populationSize = 50;
  selectionCutoff = .15;
  mutationChance = .01;
  mutateAmount = .10;
  fittestSurvive = false;
  randomInheritance = false;;
  diffSquared = true;

  /* Graphics options.
   */
  workingSize = 75;
  polygons = 25;
  vertices = 3;
  fillPolygons = true;

  geneSize = (6 + vertices * 2);
  dnaLength = polygons;
}

/*
 * When the simulation is paused, this variable is set to the currently
 * elapsed time (in milliseconds). Upon resume, this value is subtracted from
 * the new start time so as to account for the time spent paused. This
 * maintains the accuracy of the elapsed time feedback, as otherwise all time
 * spent in a paused state would still count towards elpased time, which is
 * instead used to measure the active time.
 */
var resumedTime = 0;

/*
 * Determines whether the genetics program is compatible with the host
 * browser. Returns true if yes, else false.
 */
function isSupported() {
  var isSupported = false;

  /* Perform a simple check to verify that getContext() and getImageData() are
   * supported:
   */
  if (referenceCanvas.getContext &&
      referenceCanvas.getContext('2d').getImageData) {
    isSupported = true;
  }

  return isSupported;
}


/*
 * Convert a seconds value to a human-redable string.
 */
function secondsToString(s) {
  var h = Math.floor(s / 3600);
  var m = Math.floor(s % 3600 / 60);

  s = Math.floor(s % 3600 % 60);

  return ((h > 0 ? h + ':' : '') +
          (m > 0 ? (h > 0 && m < 10 ? '0' : '') +
           m + ':' : '0:') + (s < 10 ? '0' : '') + s);
}

function mutateNumber(num) {
  var n = num;
  if (Math.random() < mutationChance) {

     //Apply the random mutation 
    n += Math.random() * mutateAmount * 2 - mutateAmount;

    /* Keep the value in range */
  }
  if (n < 0)
    n = 0;

  if (n > 1)
    n = 1;

  return n;
}

var smooth_value = 1;

Array.prototype.getByIndexWrapped = function(i) {
  if (i == -1) {
    i = this.length - 1;
  }
  i = i % this.length;
  return this[i];
}

function addCurvesToPolygon(polygon) {
  for (var i = 0; i < polygon.vertices.length; i++) {
      var x0 = polygon.vertices.getByIndexWrapped(i-1).x;
      var y0 = polygon.vertices.getByIndexWrapped(i-1).y;
      var x1 = polygon.vertices.getByIndexWrapped(i).x;
      var y1 = polygon.vertices.getByIndexWrapped(i).y;
      var x2 = polygon.vertices.getByIndexWrapped(i+1).x;
      var y2 = polygon.vertices.getByIndexWrapped(i+1).y;
      var x3 = polygon.vertices.getByIndexWrapped(i+2).x;
      var y3 = polygon.vertices.getByIndexWrapped(i+2).y;

      var xc1 = (x0 + x1) / 2.0;
      var yc1 = (y0 + y1) / 2.0;
      var xc2 = (x1 + x2) / 2.0;
      var yc2 = (y1 + y2) / 2.0;
      var xc3 = (x2 + x3) / 2.0;
      var yc3 = (y2 + y3) / 2.0;

      var len1 = Math.sqrt((x1-x0) * (x1-x0) + (y1-y0) * (y1-y0));
      var len2 = Math.sqrt((x2-x1) * (x2-x1) + (y2-y1) * (y2-y1));
      var len3 = Math.sqrt((x3-x2) * (x3-x2) + (y3-y2) * (y3-y2));

      var k1 = len1 / (len1 + len2);
      var k2 = len2 / (len2 + len3);

      var xm1 = xc1 + (xc2 - xc1) * k1;
      var ym1 = yc1 + (yc2 - yc1) * k1;

      var xm2 = xc2 + (xc3 - xc2) * k2;
      var ym2 = yc2 + (yc3 - yc2) * k2;

      // Resulting control points. Here smooth_value is mentioned
      // above coefficient K whose value should be in range [0...1].
      polygon.vertices[i].cp2x = xm1 + (xc2 - xm1) * smooth_value + x1 - xm1;
      polygon.vertices[i].cp2y = ym1 + (yc2 - ym1) * smooth_value + y1 - ym1;

      polygon.vertices.getByIndexWrapped(i+1).cp1x = xm2 + (xc2 - xm2) * smooth_value + x2 - xm2;
      polygon.vertices.getByIndexWrapped(i+1).cp1y = ym2 + (yc2 - ym2) * smooth_value + y2 - ym2;
  }
  return polygon;
}

/*
 * Creates a new individual. Each individual comprises of their string of DNA,
 * and their fitness. In addition, a draw() method is provided for visualising
 * the individual. If mother and father are omitted, a random individual is
 * generated.
 */

 /*
 a gene looks like 
 {
  r: num,
  g: num,
  b: num,
  a: num,
  vertices: [
    {x: num,
     y: num,
     cp1x: num,
     cp1y: num,
     cp2x: num,
     cp2y: num}
  ]
 }

 cp1 is the "left" control point and cp2 is the "right" control point
 */
function Individual(mother, father) {

  /* The individual's genetic composition */
  this.dna = [];

  if (mother && father) {

    /*
     * Breed from mother and father:
     */

    /* Used in random inheritance */
    var inheritSplit = (Math.random() * dnaLength) >> 0;

    for (var i = 0; i < dnaLength; i += 1) {

      /* The parent's gene which will be inherited */
      var inheritedGene;

      if (randomInheritance) {
        /* Randomly inherit genes from parents in an uneven manner */
        inheritedGene = (i < inheritSplit) ? mother : father;
      } else {
        /* Inherit genes evenly from both parents */
        inheritedGene = (Math.random() < 0.5) ? mother : father;
      }

      var gene = {vertices: []};

      /*
       * Create the genes:
       */
      for (var j = 0; j < vertices; j++) {

        /* The DNA strand */
        var x = inheritedGene[i].vertices[j].x;
        var y = inheritedGene[i].vertices[j].y;

        x = mutateNumber(x);
        y = mutateNumber(y);

        gene.vertices.push({x, y});
      }
      gene.r = mutateNumber(inheritedGene[i].r);
      gene.g = mutateNumber(inheritedGene[i].g);
      gene.b = mutateNumber(inheritedGene[i].b);
      gene.a = Math.max(mutateNumber(inheritedGene[i].a), opacityMin);

      this.dna.push(addCurvesToPolygon(gene));
    }

  } else {

    /*
     * Generate a random individual:
     */

    for (var g = 0; g < dnaLength; g += 1) {

      var gene = {};
      gene.vertices = [];

      gene.r = Math.random();
      gene.g = Math.random();
      gene.b = Math.random();
      gene.a = Math.max(Math.random() * Math.random(), opacityMin);

      /* Generate XY positional values */
      var x = Math.random();
      var y = Math.random();

      for (var j = 0; j < vertices; j++) {
        gene.vertices.push({x: x + Math.random() - 0.5, // X
                      y: y + Math.random() - 0.5}); // Y

      }

      this.dna.push(addCurvesToPolygon(gene));
    }
  }

  /*
   * Determine the individual's fitness:
   */

  this.draw(workingCtx, workingSize, workingSize);

  var imageData = workingCtx.getImageData(0, 0,
                                          workingSize,
                                          workingSize).data;
  var diff = 0;

  // var buf = workingCanvas.toBuffer();
  // var str =  "" + index_;
  // if (index_ < 10) {
  //   str = "0" + index_;
  // }
  // fs.writeFileSync("imgs/test.png", buf);

  /*
   * Sum up the difference between the pixel values of the reference
   * image and the current individual. Subtract the ratio of this
   * difference and the largest possible difference from 1 in order
   * to get the fitness.
   */
  if (diffSquared) {  // Sum squared differences.
    for (var p = 0; p < workingSize * workingSize * 4; p++) {
      var dp = imageData[p] - workingData[p];
      diff += dp * dp;
    }

    this.fitness = 1 - diff / (workingSize * workingSize * 4 * 256 * 256);
    //console.log(this.fitness);
  } else {  // Sum differences.
    for (var p = 0; p < workingSize * workingSize * 4; p++)
      diff += Math.abs(imageData[p] - workingData[p]);

    this.fitness = 1 - diff / (workingSize * workingSize * 4 * 256);
    //console.log(this.fitness);
  }
}

/*
 * Draw a representation of a DNA string to a canvas.
 */
Individual.prototype.draw = function(ctx, width, height) {

  /* Set the background */
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, width, height);

  /*
   * Draw each gene sequentially:
   */
  for (var g = 0; g < dnaLength - 1; g++) {

    /* Draw the starting vertex */
    ctx.beginPath();
    ctx.moveTo(this.dna[g].vertices[0].x * width, this.dna[g].vertices[0].y * height);
    /* Create each vertices sequentially */
    for (var i = 0; i <= vertices - 1; i++) {
      // console.log(this.dna[g].vertices[i].cpx);
      if (firstIter < 1) {
        console.log(this.dna[g]);
        firstIter += 1;
      }
      ctx.bezierCurveTo(this.dna[g].vertices[i].cp2x * width,
                 this.dna[g].vertices[i].cp2y * height,
                 this.dna[g].vertices.getByIndexWrapped(i + 1).cp1x * width,
                 this.dna[g].vertices.getByIndexWrapped(i + 1).cp1y * height,
                 this.dna[g].vertices.getByIndexWrapped(i + 1).x * width,
                 this.dna[g].vertices.getByIndexWrapped(i + 1).y * height);
    }

    ctx.closePath();

    var styleString = 'rgba(' +
        ((this.dna[g].r * 255) >> 0) + ',' + // R - int [0,255]
        ((this.dna[g].g * 255) >> 0) + ',' + // G - int [0,255]
        ((this.dna[g].b * 255) >> 0) + ',' + // B - int [0,255]
        this.dna[g].a + ')'; // A - float [0,1]

    if (fillPolygons) {

      /*
       * Create a polygon:
       */
      ctx.fillStyle = styleString;
      ctx.fill();

    } else {

      /*
       * Trace an outline:
       */
      ctx.lineWidth = 1;
      ctx.strokeStyle = styleString;
      ctx.stroke();

    }
  }
};

/*
 * This object represents a entire population, composed of a number of
 * individuals. It provides a iterate() function to breed a new generation.
 */
function Population(size) {
  this.individuals = [];

  /* Generate our random starter culture */
  for (var i = 0; i < size; i++)
    this.individuals.push(new Individual());

}

/*
 * Breed a new generation.
 */
Population.prototype.iterate = function() {

  if (this.individuals.length > 1) {

    /*
     * Breed a new generation:
     */

    var size = this.individuals.length;
    var offspring = [];

    /* The number of individuals from the current generation to select for
     * breeding
     */
    var selectCount = Math.floor(this.individuals.length * selectionCutoff);

    /* The number of individuals to randomly generate */
    var randCount = Math.ceil(1 / selectionCutoff);

    this.individuals = this.individuals.sort(function(a, b) {
      return b.fitness - a.fitness;
    });

    if (fittestSurvive)
      randCount--;

    for (var i = 0; i < selectCount; i++) {

      for (var j = 0; j < randCount; j++) {
        var randIndividual = i;

        while (randIndividual == i)
          randIndividual = (Math.random() * selectCount) >> 0;

        offspring.push(new Individual(this.individuals[i].dna,
                                      this.individuals[randIndividual].dna));
      }
    }

    if (fittestSurvive) {
      this.individuals.length = selectCount;
      this.individuals = this.individuals.concat(offspring);
    } else {
      this.individuals = offspring;
    }

    this.individuals.length = size;

  } else {

    /*
     * Asexual reproduction:
     */

    var parent = this.individuals[0];
    var child = new Individual(parent.dna, parent.dna);

    if (child.fitness > parent.fitness)
      this.individuals = [child];

  }
};


/*
 * Return the fittest individual from the population.
 */
Population.prototype.getFittest = function() {

  return this.individuals.sort(function(a, b) {
    return b.fitness - a.fitness;
  })[0];

};

/*
 * Determines whether the genetics simulation is currently running.
 */
function isRunning() {
  return clock;
}

/*
 * Determines whether the genetics simulation is currently paused.
 */
function isPaused() {
  return jiffies && !clock;
}

/*
 * Determines whether the genetics simulation is currently stopped.
 */
function isStopped() {
  return !isRunning() && !isPaused();
}

/*
 * Upload a new file to use as a reference image.
 */
function fileSelectCb(e) {
  var file = e.target.files[0];

  /* FIXME: AJAX */
  $('#image-upload-form').submit();

  console.log(file.name);
}

/*
 * Set a new image to use as the reference image.
 */
function setImage(src) {
  referenceImage.onload = prepareImage;
  referenceImage.src = src;
}


/*
 * Prepare an image for use as the reference image.
 */
function prepareImage(img, img_width) {
  /* FIXME: add support for images of size other than 350x350. This requires
   * scaling the image and cropping as needed */

  referenceCanvas.width = workingSize;
  referenceCanvas.height = workingSize;

  referenceCtx.drawImage(img,
                         0, 0, 350, 350, 0, 0,
                         workingSize, workingSize);

  var imageData = referenceCtx.getImageData(0, 0,
                                            workingSize,
                                            workingSize).data;

  workingData = [];
  var p = workingSize * workingSize * 4;

  for (var i = 0; i < p; i++) {
    workingData[i] = imageData[i];
  }

  referenceCanvas.width = 350;
  referenceCanvas.height = 350;
  referenceCtx.drawImage(img, 0, 0);
  highestFitness = 0;
  lowestFitness = 100;
}

/*
 * Run the simulation.
 */
function runSimulation() {
  document.body.classList.remove('genetics-inactive');
  document.body.classList.add('genetics-active');

  if (isPaused())
    startTime = new Date().getTime() - resumedTime;

  if (isStopped()) {
    jiffies = 0;
    numberOfImprovements = 0;
    startTime = new Date().getTime();
    population = new Population(populationSize);
  }

  /* Each tick produces a new population and new fittest */
  function tick() {

    /* Breed a new generation */
    population.iterate();
    jiffies++;

    var fittest = population.getFittest();
    var totalTime = ((new Date().getTime() - startTime) / 1000);
    var timePerGeneration = (totalTime / jiffies) * 1000;
    var timePerImprovment = (totalTime / numberOfImprovements) * 1000;
    var currentFitness = (fittest.fitness * 100);

    if (currentFitness > highestFitness) {
      highestFitness = currentFitness;
      /* Improvement was made */
      numberOfImprovements++;
    } else if (currentFitness < lowestFitness) {
      lowestFitness = currentFitness;
    }

    /* Draw the best fit to output */
    fittest.draw(outputCtx, 350, 350);

    /* Write out the internal state to analytics panel */
    ap.elapsedTime.text(secondsToString(Math.round(totalTime)));
    ap.numberOfGenerations.text(jiffies);
    ap.timePerGeneration.text(timePerGeneration.toFixed(2) + ' ms');
    ap.timePerImprovment.text(timePerImprovment.toFixed(2) + ' ms');
    ap.currentFitness.text(currentFitness.toFixed(2) + '%');
    ap.highestFitness.text(highestFitness.toFixed(2) + '%');
    ap.lowestFitness.text(lowestFitness.toFixed(2) + '%');
  }

  /* Begin the master clock */
  clock = setInterval(tick, 0);
}

function init(img, img_width) {

  setDefaults();

  /* Set our page element variables */
  outputCanvas = $('#best_img_canvas')[0];
  outputCtx = outputCanvas.getContext('2d');

  workingCanvas = $('#test_img_canvas')[0];
  workingCtx = workingCanvas.getContext('2d');

  referenceImage = $('#referenceImage')[0];
  referenceCanvas = $('#orig_img_canvas')[0];
  referenceCtx = referenceCanvas.getContext('2d');

  /* Analytics panel */
  ap = {
    elapsedTime: $('#elapsed-time'),
    numberOfGenerations: $('#number-of-generations'),
    timePerGeneration: $('#time-per-generation'),
    timePerImprovment: $('#time-per-improvement'),
    currentFitness: $('#current-fitness'),
    highestFitness: $('#highest-fitness'),
    lowestFitness: $('#lowest-fitness')
  };

  /* Check that we can run the program */
  if (!isSupported())
    alert('Unable to run genetics program!'); /* FIXME: better alert */

  prepareImage(img, img_width);

  // /* prepare our tooltips */
  // $('.conf-option').tooltip('hide');

  //  enable our buttons 
  // $('#start').attr('disabled', false);
  // $('#stop').attr('disabled', false);

  runSimulation();
};
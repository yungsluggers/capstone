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
var Genetics = Genetics || {};

'use strict';

/* The analytics pane elements */
var ap = {
  elapsedTime: null,
  numberOfGenerations: null,
  timePerGeneration: null,
  timePerImprovment: null,
  currentFitness: null,
  highestFitness: null,
  lowestFitness: null
};

var workingSize = 75;

// set all these things before running

var { createCanvas, loadImage, Image } = require('canvas');
var fs = require('file-system');
// Imports the Google Cloud client library
const vision = require('@google-cloud/vision');

// Creates a client
const client = new vision.ImageAnnotatorClient();

/* The working area, used by the fitness function to determine an individuals
 * fitness.
 */
var workingCanvas = createCanvas(workingSize, workingSize);
var workingCtx = workingCanvas.getContext('2d');
var workingData = [];

var index_ = 0;

/* The output area, where we display the fittest population.
 */
var outputCanvas = createCanvas(workingSize, workingSize);
var outputCtx = outputCanvas.getContext('2d');

/* The reference area, where we display the target image that we are
 * selecting towards.
 */
var referenceCanvas = createCanvas(workingSize, workingSize);
var referenceCtx = outputCanvas.getContext('2d');
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
var lowestFitness = 0;
var highestFitness = 100;
var population;
var startTime;

/*
 * When the simulation is paused, this variable is set to the currently
 * elapsed time (in milliseconds). Upon resume, this value is subtracted from
 * the new start time so as to account for the time spent paused. This
 * maintains the accuracy of the elapsed time feedback, as otherwise all time
 * spent in a paused state would still count towards elpased time, which is
 * instead used to measure the active time.
 */
var resumedTime = 0;

function setDefaults() {
  populationSize = 7;
  selectionCutoff = .15;
  mutationChance = 1;
  mutateAmount = .10;
  fittestSurvive = false;
  randomInheritance = false;;
  diffSquared = true;

  /* Graphics options.
   */
  workingSize = 75;
  polygons = 125;
  vertices = 3;
  fillPolygons = true;

  geneSize = (4 + vertices * 2);
  dnaLength = polygons * geneSize;

  prepareImage();
}

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

function getRandomInt(max) {
  return Math.floor(Math.random() * Math.floor(max));
}

/*
 * Convert a seconds value to a human-readable string.
 */
function secondsToString(s) {
  var h = Math.floor(s / 3600);
  var m = Math.floor(s % 3600 / 60);

  s = Math.floor(s % 3600 % 60);

  return ((h > 0 ? h + ':' : '') +
          (m > 0 ? (h > 0 && m < 10 ? '0' : '') +
           m + ':' : '0:') + (s < 10 ? '0' : '') + s);
}

/*
 * Creates a new individual. Each individual comprises of their string of DNA,
 * and their fitness. In addition, a draw() method is provided for visualising
 * the individual. If mother and father are omitted, a random individual is
 * generated.
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

    for (var i = 0; i < dnaLength; i += geneSize) {

      /* The parent's gene which will be inherited */
      var inheritedGene;

      if (randomInheritance) {
        /* Randomly inherit genes from parents in an uneven manner */
        inheritedGene = (i < inheritSplit) ? mother : father;
      } else {
        /* Inherit genes evenly from both parents */
        inheritedGene = (Math.random() < 0.5) ? mother : father;
      }

      /*
       * Create the genes:
       */
      for (var j = 0; j < geneSize; j++) {

        /* The DNA strand */
        var dna = inheritedGene[i + j];

        /* Mutate the gene */
        if (Math.random() < mutationChance) {

          /* Apply the random mutation */
          dna += Math.random() * mutateAmount * 2 - mutateAmount;

          /* Keep the value in range */
          if (dna < 0)
            dna = 0;

          if (dna > 1)
            dna = 1;
        }

        this.dna.push(dna);
      }
    }

  } else {

    /*
     * Generate a random individual:
     */

    for (var g = 0; g < dnaLength; g += geneSize) {

      /* Generate RGBA color values */
      this.dna.push(Math.random(), // R
                    Math.random(), // G
                    Math.random(), // B
                    Math.max(Math.random() * Math.random(), 0.2)); // A

      /* Generate XY positional values */
      var x = Math.random();
      var y = Math.random();

      for (var j = 0; j < vertices; j++) {
        this.dna.push(x + Math.random() - 0.5, // X
                      y + Math.random() - 0.5); // Y
      }
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

//   const fileName = 'img/image.png';

//   // Performs label detection on the local file
//   client
//     .labelDetection(fileName)
//     .then(results => {
//       const labels = results[0].labelAnnotations;
//       console.log('Labels:');
//       labels.forEach(label => console.log(label.description));
//     })
//     .catch(err => {
//       console.error('ERROR:', err);
//     });
}

function prepareImage() {
  /* FIXME: add support for images of size other than 350x350. This requires
   * scaling the image and cropping as needed */

  referenceCanvas.width = workingSize;
  referenceCanvas.height = workingSize;

  const img = fs.readFileSync("./mug.jpg");
  const canvImg = new Image;
  canvImg.src = img;

  referenceCanvas.width = 350;
  referenceCanvas.height = 350;

  referenceCtx.drawImage(canvImg, 0, 0);
  highestFitness = 0;
  lowestFitness = 100;

  var imageData = referenceCtx.getImageData(0, 0,
                                          workingSize,
                                           workingSize).data;

  var buf = referenceCanvas.toBuffer();
  fs.writeFileSync("referenceImage" + ".png", buf);
  index_++;

  workingData = [];
  var p = workingSize * workingSize * 4;

  for (var i = 0; i < p; i++) {
    workingData[i] = imageData[i];
  }

  var buf = referenceCanvas.toBuffer();
  fs.writeFileSync("referenceImage" + ".png", buf);
}


/*
 * Draw a representation of a DNA string to a canvas.
 */
Individual.prototype.draw = function(ctx, width, height, name = "", save = false) {

  /* Set the background */
  ctx.fillStyle = '#000';
  ctx.fillRect(0, 0, width, height);

  /*
   * Draw each gene sequentially:
   */
  for (var g = 0; g < dnaLength; g += geneSize) {

    /* Draw the starting vertex */
    ctx.beginPath();
    ctx.moveTo(this.dna[g + 4] * width, this.dna[g + 5] * height);

    /* Create each vertices sequentially */
    for (var i = 0; i < vertices - 1; i++) {
      ctx.lineTo(this.dna[g + i * 2 + 6] * width,
                 this.dna[g + i * 2 + 7] * height);
    }

    ctx.closePath();

    var styleString = 'rgba(' +
        ((this.dna[g] * 255) >> 0) + ',' + // R - int [0,255]
        ((this.dna[g + 1] * 255) >> 0) + ',' + // G - int [0,255]
        ((this.dna[g + 2] * 255) >> 0) + ',' + // B - int [0,255]
        this.dna[g + 3] + ')'; // A - float [0,1]

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
  if (save) {
    var buf = workingCanvas.toBuffer();
    fs.writeFileSync("imgs/img_" + index_ + name + ".png", buf);
    index_++;
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

        while (randIndividual == i) {
          randIndividual = getRandomInt(this.individuals.length);
        }

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
 * Set a new image to use as the reference image.
 */
function setImage(src) {
  referenceImage.onload = prepareImage;
  referenceImage.src = src;
}

/*
 * Run the simulation.
 */
(function() {
  setDefaults();

  if (isPaused()) {
    startTime = new Date().getTime() - resumedTime;
  }

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
    fittest.draw(outputCtx, workingSize, workingSize, 'fittest', true);
    console.log(fittest.fitness);

    /* Write out the internal state to analytics panel */
    ap.elapsedTime = secondsToString(Math.round(totalTime));
    ap.numberOfGenerations = jiffies;
    ap.timePerGeneration = timePerGeneration.toFixed(2) + ' ms';
    ap.timePerImprovment = timePerImprovment.toFixed(2) + ' ms';
    ap.currentFitness = currentFitness.toFixed(2) + '%';
    ap.highestFitness = highestFitness.toFixed(2) + '%';
    ap.lowestFitness = lowestFitness.toFixed(2) + '%';
  }

  /* Begin the master clock */
  clock = setInterval(tick, 0);
})();

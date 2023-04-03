/**
 * The $Q Super-Quick Recognizer (JavaScript version)
 *
 * Javascript version:
 *
 *  Nathan Magrofuoco
 *  Universite Catholique de Louvain
 *  Louvain-la-Neuve, Belgium
 *  nathan.magrofuoco@uclouvain.be
 *
 * Original $Q authors (C# version):
 *
 *  Radu-Daniel Vatavu, Ph.D.
 *  University Stefan cel Mare of Suceava
 *  Suceava 720229, Romania
 *  radu.vatavu@usm.ro
 *
 *  Lisa Anthony, Ph.D.
 *  Department of CISE
 *  University of Florida
 *  Gainesville, FL, USA 32611
 *  lanthony@cise.ufl.edu
 *
 *  Jacob O. Wobbrock, Ph.D.
 *  The Information School | DUB Group
 *  University of Washington
 *  Seattle, WA, USA 98195-2840
 *  wobbrock@uw.edu
 *
 * The academic publication for the $Q recognizer, and what should be
 * used to cite it, is:
 *
 *    Vatavu, R.-D., Anthony, L. and Wobbrock, J.O. (2018). $Q: A super-quick,
 *    articulation-invariant stroke-gesture recognizer for low-resource devices.
 *    Proceedings of the ACM Conference on Human-Computer Interaction with Mobile
 *    Devices and Services (MobileHCI '18). Barcelona, Spain (September 3-6, 2018).
 *    New York: ACM Press. Article No. 23.
 *    https://dl.acm.org/citation.cfm?id=3229434.3229465
 *
 * This software is distributed under the "New BSD License" agreement:
 *
 * Copyright (c) 2018-2019, Nathan Magrofuoco, Jacob O. Wobbrock, Radu-Daniel Vatavu,
 * and Lisa Anthony. All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *    * Redistributions of source code must retain the above copyright
 *      notice, this list of conditions and the following disclaimer.
 *    * Redistributions in binary form must reproduce the above copyright
 *      notice, this list of conditions and the following disclaimer in the
 *      documentation and/or other materials provided with the distribution.
 *    * Neither the names of the University Stefan cel Mare of Suceava,
 *      University of Washington, nor University of Florida, nor the names of its
 *      contributors may be used to endorse or promote products derived from this
 *      software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS
 * IS" AND ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO,
 * THE IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR
 * PURPOSE ARE DISCLAIMED. IN NO EVENT SHALL Radu-Daniel Vatavu OR Lisa Anthony
 * OR Jacob O. Wobbrock BE LIABLE FOR ANY DIRECT, INDIRECT, INCIDENTAL, SPECIAL,
 * EXEMPLARY, OR CONSEQUENTIAL DAMAGES (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT
 * OF SUBSTITUTE GOODS OR SERVICES; LOSS OF USE, DATA, OR PROFITS; OR BUSINESS
 * INTERRUPTION) HOWEVER CAUSED AND ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT,
 * STRICT LIABILITY, OR TORT (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY
 * OUT OF THE USE OF THIS SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF
 * SUCH DAMAGE.
 **/
//
// Point class
//
export function Point(x, y, id) {
  // constructor
  this.X = x;
  this.Y = y;
  this.ID = id; // stroke ID to which this point belongs (1,2,3,etc.)
  this.IntX = 0; // for indexing into the LUT
  this.IntY = 0; // for indexing into the LUT
}
//
// PointCloud class
//
function PointCloud(name, points) {
  // constructor
  this.Name = name;
  this.Points = Resample(points, NumPoints);
  this.Points = Scale(this.Points);
  this.Points = TranslateTo(this.Points, Origin);
  this.Points = MakeIntCoords(this.Points); // fills in (IntX, IntY) values
  this.LUT = ComputeLUT(this.Points);
}
//
// Result class
//
function Result(name, score, ms) {
  // constructor
  this.Name = name;
  this.Score = score;
  this.Time = ms;
}
//
// QDollarRecognizer constants
//
const NumPointClouds = 0;
const NumPoints = 32;
const Origin = new Point(0, 0, 0);
const MaxIntCoord = 1024; // (IntX, IntY) range from [0, MaxIntCoord - 1]
const LUTSize = 64; // default size of the lookup table is 64 x 64
const LUTScaleFactor = MaxIntCoord / LUTSize; // used to scale from (IntX, IntY) to LUT
//
// QDollarRecognizer class
//
export function QDollarRecognizer() {
  // constructor
  //
  // one predefined point-cloud for each gesture
  //
  this.PointClouds = new Array(NumPointClouds);
  // this.PointClouds[0] = new PointCloud(
  //   'T',
  //   new Array(
  //     new Point(30, 7, 1),
  //     new Point(103, 7, 1),
  //     new Point(66, 7, 2),
  //     new Point(66, 87, 2),
  //   ),
  // );
  // this.PointClouds[1] = new PointCloud(
  //   'N',
  //   new Array(
  //     new Point(177, 92, 1),
  //     new Point(177, 2, 1),
  //     new Point(182, 1, 2),
  //     new Point(246, 95, 2),
  //     new Point(247, 87, 3),
  //     new Point(247, 1, 3),
  //   ),
  // );
  // this.PointClouds[2] = new PointCloud(
  //   'D',
  //   new Array(
  //     new Point(345, 9, 1),
  //     new Point(345, 87, 1),
  //     new Point(351, 8, 2),
  //     new Point(363, 8, 2),
  //     new Point(372, 9, 2),
  //     new Point(380, 11, 2),
  //     new Point(386, 14, 2),
  //     new Point(391, 17, 2),
  //     new Point(394, 22, 2),
  //     new Point(397, 28, 2),
  //     new Point(399, 34, 2),
  //     new Point(400, 42, 2),
  //     new Point(400, 50, 2),
  //     new Point(400, 56, 2),
  //     new Point(399, 61, 2),
  //     new Point(397, 66, 2),
  //     new Point(394, 70, 2),
  //     new Point(391, 74, 2),
  //     new Point(386, 78, 2),
  //     new Point(382, 81, 2),
  //     new Point(377, 83, 2),
  //     new Point(372, 85, 2),
  //     new Point(367, 87, 2),
  //     new Point(360, 87, 2),
  //     new Point(355, 88, 2),
  //     new Point(349, 87, 2),
  //   ),
  // );
  // this.PointClouds[3] = new PointCloud(
  //   'P',
  //   new Array(
  //     new Point(507, 8, 1),
  //     new Point(507, 87, 1),
  //     new Point(513, 7, 2),
  //     new Point(528, 7, 2),
  //     new Point(537, 8, 2),
  //     new Point(544, 10, 2),
  //     new Point(550, 12, 2),
  //     new Point(555, 15, 2),
  //     new Point(558, 18, 2),
  //     new Point(560, 22, 2),
  //     new Point(561, 27, 2),
  //     new Point(562, 33, 2),
  //     new Point(561, 37, 2),
  //     new Point(559, 42, 2),
  //     new Point(556, 45, 2),
  //     new Point(550, 48, 2),
  //     new Point(544, 51, 2),
  //     new Point(538, 53, 2),
  //     new Point(532, 54, 2),
  //     new Point(525, 55, 2),
  //     new Point(519, 55, 2),
  //     new Point(513, 55, 2),
  //     new Point(510, 55, 2),
  //   ),
  // );
  // this.PointClouds[4] = new PointCloud(
  //   'X',
  //   new Array(
  //     new Point(30, 146, 1),
  //     new Point(106, 222, 1),
  //     new Point(30, 225, 2),
  //     new Point(106, 146, 2),
  //   ),
  // );
  // this.PointClouds[5] = new PointCloud(
  //   'H',
  //   new Array(
  //     new Point(188, 137, 1),
  //     new Point(188, 225, 1),
  //     new Point(188, 180, 2),
  //     new Point(241, 180, 2),
  //     new Point(241, 137, 3),
  //     new Point(241, 225, 3),
  //   ),
  // );
  // this.PointClouds[6] = new PointCloud(
  //   'I',
  //   new Array(
  //     new Point(371, 149, 1),
  //     new Point(371, 221, 1),
  //     new Point(341, 149, 2),
  //     new Point(401, 149, 2),
  //     new Point(341, 221, 3),
  //     new Point(401, 221, 3),
  //   ),
  // );
  // this.PointClouds[7] = new PointCloud(
  //   'exclamation',
  //   new Array(
  //     new Point(526, 142, 1),
  //     new Point(526, 204, 1),
  //     new Point(526, 221, 2),
  //   ),
  // );
  // this.PointClouds[8] = new PointCloud(
  //   'line',
  //   new Array(new Point(12, 347, 1), new Point(119, 347, 1)),
  // );
  // this.PointClouds[9] = new PointCloud(
  //   'five-point star',
  //   new Array(
  //     new Point(177, 396, 1),
  //     new Point(223, 299, 1),
  //     new Point(262, 396, 1),
  //     new Point(168, 332, 1),
  //     new Point(278, 332, 1),
  //     new Point(184, 397, 1),
  //   ),
  // );
  // this.PointClouds[10] = new PointCloud(
  //   'null',
  //   new Array(
  //     new Point(382, 310, 1),
  //     new Point(377, 308, 1),
  //     new Point(373, 307, 1),
  //     new Point(366, 307, 1),
  //     new Point(360, 310, 1),
  //     new Point(356, 313, 1),
  //     new Point(353, 316, 1),
  //     new Point(349, 321, 1),
  //     new Point(347, 326, 1),
  //     new Point(344, 331, 1),
  //     new Point(342, 337, 1),
  //     new Point(341, 343, 1),
  //     new Point(341, 350, 1),
  //     new Point(341, 358, 1),
  //     new Point(342, 362, 1),
  //     new Point(344, 366, 1),
  //     new Point(347, 370, 1),
  //     new Point(351, 374, 1),
  //     new Point(356, 379, 1),
  //     new Point(361, 382, 1),
  //     new Point(368, 385, 1),
  //     new Point(374, 387, 1),
  //     new Point(381, 387, 1),
  //     new Point(390, 387, 1),
  //     new Point(397, 385, 1),
  //     new Point(404, 382, 1),
  //     new Point(408, 378, 1),
  //     new Point(412, 373, 1),
  //     new Point(416, 367, 1),
  //     new Point(418, 361, 1),
  //     new Point(419, 353, 1),
  //     new Point(418, 346, 1),
  //     new Point(417, 341, 1),
  //     new Point(416, 336, 1),
  //     new Point(413, 331, 1),
  //     new Point(410, 326, 1),
  //     new Point(404, 320, 1),
  //     new Point(400, 317, 1),
  //     new Point(393, 313, 1),
  //     new Point(392, 312, 1),
  //     new Point(418, 309, 2),
  //     new Point(337, 390, 2),
  //   ),
  // );
  // this.PointClouds[11] = new PointCloud(
  //   'arrowhead',
  //   new Array(
  //     new Point(506, 349, 1),
  //     new Point(574, 349, 1),
  //     new Point(525, 306, 2),
  //     new Point(584, 349, 2),
  //     new Point(525, 388, 2),
  //   ),
  // );
  // this.PointClouds[12] = new PointCloud(
  //   'pitchfork',
  //   new Array(
  //     new Point(38, 470, 1),
  //     new Point(36, 476, 1),
  //     new Point(36, 482, 1),
  //     new Point(37, 489, 1),
  //     new Point(39, 496, 1),
  //     new Point(42, 500, 1),
  //     new Point(46, 503, 1),
  //     new Point(50, 507, 1),
  //     new Point(56, 509, 1),
  //     new Point(63, 509, 1),
  //     new Point(70, 508, 1),
  //     new Point(75, 506, 1),
  //     new Point(79, 503, 1),
  //     new Point(82, 499, 1),
  //     new Point(85, 493, 1),
  //     new Point(87, 487, 1),
  //     new Point(88, 480, 1),
  //     new Point(88, 474, 1),
  //     new Point(87, 468, 1),
  //     new Point(62, 464, 2),
  //     new Point(62, 571, 2),
  //   ),
  // );
  // this.PointClouds[13] = new PointCloud(
  //   'six-point star',
  //   new Array(
  //     new Point(177, 554, 1),
  //     new Point(223, 476, 1),
  //     new Point(268, 554, 1),
  //     new Point(183, 554, 1),
  //     new Point(177, 490, 2),
  //     new Point(223, 568, 2),
  //     new Point(268, 490, 2),
  //     new Point(183, 490, 2),
  //   ),
  // );
  // this.PointClouds[14] = new PointCloud(
  //   'asterisk',
  //   new Array(
  //     new Point(325, 499, 1),
  //     new Point(417, 557, 1),
  //     new Point(417, 499, 2),
  //     new Point(325, 557, 2),
  //     new Point(371, 486, 3),
  //     new Point(371, 571, 3),
  //   ),
  // );
  // this.PointClouds[15] = new PointCloud(
  //   'half-note',
  //   new Array(
  //     new Point(546, 465, 1),
  //     new Point(546, 531, 1),
  //     new Point(540, 530, 2),
  //     new Point(536, 529, 2),
  //     new Point(533, 528, 2),
  //     new Point(529, 529, 2),
  //     new Point(524, 530, 2),
  //     new Point(520, 532, 2),
  //     new Point(515, 535, 2),
  //     new Point(511, 539, 2),
  //     new Point(508, 545, 2),
  //     new Point(506, 548, 2),
  //     new Point(506, 554, 2),
  //     new Point(509, 558, 2),
  //     new Point(512, 561, 2),
  //     new Point(517, 564, 2),
  //     new Point(521, 564, 2),
  //     new Point(527, 563, 2),
  //     new Point(531, 560, 2),
  //     new Point(535, 557, 2),
  //     new Point(538, 553, 2),
  //     new Point(542, 548, 2),
  //     new Point(544, 544, 2),
  //     new Point(546, 540, 2),
  //     new Point(546, 536, 2),
  //   ),
  // );
  //
  // The $Q Point-Cloud Recognizer API begins here -- 3 methods: Recognize(), AddGesture(), DeleteUserGestures()
  //
  this.Recognize = function (points) {
    var t0 = Date.now();
    var candidate = new PointCloud('', points);

    var u = -1;
    var b = +Infinity;
    for (
      var i = 0;
      i < this.PointClouds.length;
      i++ // for each point-cloud template
    ) {
      var d = CloudMatch(candidate, this.PointClouds[i], b);
      if (d < b) {
        b = d; // best (least) distance
        u = i; // point-cloud index
      }
    }
    var t1 = Date.now();
    return u == -1
      ? new Result('No match.', 0.0, t1 - t0)
      : new Result(this.PointClouds[u].Name, b > 1.0 ? 1.0 / b : 1.0, t1 - t0);
  };
  this.AddGesture = function (name, points) {
    this.PointClouds[this.PointClouds.length] = new PointCloud(name, points);
    var num = 0;
    for (var i = 0; i < this.PointClouds.length; i++) {
      if (this.PointClouds[i].Name == name) {
        num++;
      }
    }
    return num;
  };
  this.DeleteUserGestures = function () {
    this.PointClouds.length = NumPointClouds; // clears any beyond the original set
    return NumPointClouds;
  };
}
//
// Private helper functions from here on down
//
function CloudMatch(candidate, template, minSoFar) {
  var n = candidate.Points.length;
  var step = Math.floor(Math.pow(n, 0.5));

  var LB1 = ComputeLowerBound(
    candidate.Points,
    template.Points,
    step,
    template.LUT,
  );
  let LB2 = ComputeLowerBound(
    template.Points,
    candidate.Points,
    step,
    candidate.LUT,
  );

  for (var i = 0, j = 0; i < n; i += step, j++) {
    if (LB1[j] < minSoFar) {
      minSoFar = Math.min(
        minSoFar,
        CloudDistance(candidate.Points, template.Points, i, minSoFar),
      );
    }
    if (LB2[j] < minSoFar) {
      minSoFar = Math.min(
        minSoFar,
        CloudDistance(template.Points, candidate.Points, i, minSoFar),
      );
    }
  }
  return minSoFar;
}
function CloudDistance(pts1, pts2, start, minSoFar) {
  var n = pts1.length;
  var unmatched = new Array(); // indices for pts2 that are not matched
  for (var j = 0; j < n; j++) {
    unmatched[j] = j;
  }
  var i = start; // start matching with point 'start' from pts1
  var weight = n; // weights decrease from n to 1
  var sum = 0.0; // sum distance between the two clouds
  do {
    var u = -1;
    var b = +Infinity;
    for (var j = 0; j < unmatched.length; j++) {
      var d = SqrEuclideanDistance(pts1[i], pts2[unmatched[j]]);
      if (d < b) {
        b = d;
        u = j;
      }
    }
    unmatched.splice(u, 1); // remove item at index 'u'
    sum += weight * b;
    if (sum >= minSoFar) {
      return sum;
    } // early abandoning
    weight--;
    i = (i + 1) % n;
  } while (i != start);
  return sum;
}
function ComputeLowerBound(pts1, pts2, step, LUT) {
  var n = pts1.length;
  var LB = new Array(Math.floor(n / step) + 1);
  var SAT = new Array(n);
  LB[0] = 0.0;
  for (var i = 0; i < n; i++) {
    var x = Math.round(pts1[i].IntX / LUTScaleFactor);
    var y = Math.round(pts1[i].IntY / LUTScaleFactor);
    var index = LUT[x][y];
    var d = SqrEuclideanDistance(pts1[i], pts2[index]);
    SAT[i] = i == 0 ? d : SAT[i - 1] + d;
    LB[0] += (n - i) * d;
  }
  for (var i = step, j = 1; i < n; i += step, j++) {
    LB[j] = LB[0] + i * SAT[n - 1] - n * SAT[i - 1];
  }
  return LB;
}
function Resample(points, n) {
  var I = PathLength(points) / (n - 1); // interval length
  var D = 0.0;
  var newpoints = new Array(points[0]);
  for (var i = 1; i < points.length; i++) {
    if (points[i].ID == points[i - 1].ID) {
      var d = EuclideanDistance(points[i - 1], points[i]);
      if (D + d >= I) {
        var qx =
          points[i - 1].X + ((I - D) / d) * (points[i].X - points[i - 1].X);
        var qy =
          points[i - 1].Y + ((I - D) / d) * (points[i].Y - points[i - 1].Y);
        var q = new Point(qx, qy, points[i].ID);
        newpoints[newpoints.length] = q; // append new point 'q'
        points.splice(i, 0, q); // insert 'q' at position i in points s.t. 'q' will be the next i
        D = 0.0;
      } else {
        D += d;
      }
    }
  }
  if (newpoints.length == n - 1) {
    // sometimes we fall a rounding-error short of adding the last point, so add it if so
    newpoints[newpoints.length] = new Point(
      points[points.length - 1].X,
      points[points.length - 1].Y,
      points[points.length - 1].ID,
    );
  }
  return newpoints;
}
function Scale(points) {
  var minX = +Infinity,
    maxX = -Infinity,
    minY = +Infinity,
    maxY = -Infinity;
  for (var i = 0; i < points.length; i++) {
    minX = Math.min(minX, points[i].X);
    minY = Math.min(minY, points[i].Y);
    maxX = Math.max(maxX, points[i].X);
    maxY = Math.max(maxY, points[i].Y);
  }
  var size = Math.max(maxX - minX, maxY - minY);
  var newpoints = new Array();
  for (var i = 0; i < points.length; i++) {
    var qx = (points[i].X - minX) / size;
    var qy = (points[i].Y - minY) / size;
    newpoints[newpoints.length] = new Point(qx, qy, points[i].ID);
  }
  return newpoints;
}
function TranslateTo(points, pt) {
  // translates points' centroid to pt
  var c = Centroid(points);
  var newpoints = new Array();
  for (var i = 0; i < points.length; i++) {
    var qx = points[i].X + pt.X - c.X;
    var qy = points[i].Y + pt.Y - c.Y;
    newpoints[newpoints.length] = new Point(qx, qy, points[i].ID);
  }
  return newpoints;
}
function Centroid(points) {
  var x = 0.0,
    y = 0.0;
  for (var i = 0; i < points.length; i++) {
    x += points[i].X;
    y += points[i].Y;
  }
  x /= points.length;
  y /= points.length;
  return new Point(x, y, 0);
}
function PathLength(points) {
  // length traversed by a point path
  var d = 0.0;
  for (var i = 1; i < points.length; i++) {
    if (points[i].ID == points[i - 1].ID) {
      d += EuclideanDistance(points[i - 1], points[i]);
    }
  }
  return d;
}
function MakeIntCoords(points) {
  for (var i = 0; i < points.length; i++) {
    points[i].IntX = Math.round(
      ((points[i].X + 1.0) / 2.0) * (MaxIntCoord - 1),
    );
    points[i].IntY = Math.round(
      ((points[i].Y + 1.0) / 2.0) * (MaxIntCoord - 1),
    );
  }
  return points;
}
function ComputeLUT(points) {
  var LUT = new Array();
  for (var i = 0; i < LUTSize; i++) {
    LUT[i] = new Array();
  }

  for (var x = 0; x < LUTSize; x++) {
    for (var y = 0; y < LUTSize; y++) {
      var u = -1;
      var b = +Infinity;
      for (var i = 0; i < points.length; i++) {
        var row = Math.round(points[i].IntX / LUTScaleFactor);
        var col = Math.round(points[i].IntY / LUTScaleFactor);
        var d = (row - x) * (row - x) + (col - y) * (col - y);
        if (d < b) {
          b = d;
          u = i;
        }
      }
      LUT[x][y] = u;
    }
  }
  return LUT;
}
function SqrEuclideanDistance(pt1, pt2) {
  var dx = pt2.X - pt1.X;
  var dy = pt2.Y - pt1.Y;
  return dx * dx + dy * dy;
}
function EuclideanDistance(pt1, pt2) {
  var s = SqrEuclideanDistance(pt1, pt2);
  return Math.sqrt(s);
}

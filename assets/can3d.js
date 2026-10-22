/* Mai can. Plain WebGL, no three.js.
   Cormorant Garamond (400 and 600) and Outfit are OFL subsets from Google Fonts, embedded as woff2. */
(function () {
  var GREEN = "#1f3b2a";
  var PEACH = "#d98a62";
  var CREAM = "#efe8da";
  var SERIF = "'Cormorant Garamond', serif";
  var DISPLAY = SERIF;
  var SANS = "Outfit, sans-serif";
  var CG_B64 = "d09GMgABAAAAAA10AA8AAAAAGgwAAA0YAAQAQgAAAAAAAAAAAAAAAAAAAAAAAAAAGhYbhTgcMAZgP1NUQVRIAIEeEQgKokybVQE2AiQDfAtAAAQgBYQaByAbUBUjAzWSs5JD8VcHtrH14O5ohQppGOYzDY8W4ZBQloll7tFtP6BBI7ligwJT/Txu6+3/YcCQtJAaJVFDUdKMC6yLMi6ywosqj/dP79Z7rT8KYIzWdk78VWLaMluFuQXEP1zmvL9HB9jMOh5Iqakeap0i1MDDnEUZ20k1aEI3ODeoUC0UQgq8fvXigphuyv/a7jCJ9x9NI4TO61SLpLrVrZ41tEL0UuW+/VK7ez+ELnFEKsJF5vkIFxehLnOw9/8c0WZChGXwsQVyQOCQZWVUpagQsrK2L1M9KWt5o4QggvDG9SvP9tWBQACgZBIhdhhdfjsAbHYpyFFWQTFIdr27tAPJSZfmbUFyWd6tA0iQYAWZAMRF8y4dIITJ4BKDyiFDEPtylH6UMxNfeY4rTFa8mhMVp2ZDgoxCwPbqifJbgQ39IR3q+4DTcbm+6itdOCEkQPnFhtyxx7E9oG3hyu3fhMDPBXA1XfZKrXkAhEaxd9zfrPrANWcmhmQoQYSA/uxFoTjT8JZ4+ASExMJFihJNhkCQCRIMgI2A+RgS4JBjGQrBKu+LhRooHZEKJhbMAsIqa5OOIFihOHd8KIyNI0RGGCaKsh/o2aG6wzPF9D2QQolmlKiCGpICDjBvupkVVsQot224fEZ2czIvMwkLoI+qBwD5taMhluDwkitKgH8hfVs4RKlPM++/GoCcEzHIZOKhOncqYUTHCEBcZppxVy1bdSM4AL/OemCCAgJJDANAwcQkgP4AfV8UrjhHhAEBiVoiaQxJ8AfzQZVMrJzSFQgo1lon3fXpshERHp+zXFtd9L6B9cUHzx2y3RYTl36RheZFONh1isSySv8oIaKFGqadaFWtGBVu/ZMAxIOgIUBwz0pwsGHbGHMbhhVkI8rGA5IHDaCfEWHNsvAsYfJInULJcNVKHUcVHqFSKtW0WhCmkYk0XgVXpvBZtBIVaeOHCWgDpTzq7Cpgz1nXqJsklAUA9YQx12Gskrugfc4985F5eI9FYFYvB3As5HQaCQDZLPsxlJFGi34AaSIRgZfc/w8BgR/IayHpR9zn3/T/uzcjeScIofRKWwFQLMYbLRUkrFKC+yK1wBISZWp11e1avgQRnfgGgwQUfJUlgAg78N3c2s+LnNz8kByIsizUW9C4xfr76EZ+vGUg7H7LHv+8fRZSStyNWSRpAEyQirZJqK3VADpifz16i+QJIY+UOGwjjsOV3NUPy8sd58HV7YNi/9dA48nWqzBbA8tsi4S+jrSlCOtSfoPbaSzt/j7G5HLUgM185YBMZ92hSdRVlS6P0O6QYiNdhEpA4FRZp6TfY2zngUtilaP4jH5f+xsJr/uDviFCrZKS2x+QwK63Jg/pM7sA4U0otkOaXAvn9RwasnMF6SONEta3w9t9DcTcnV11J7ZIBQp6P7RndfgIq9xKGybznBFzC4dmnK00a6wKj1IN58T06uAwXYzT/b9RtxkJ2wkFLTxub5nNeHysHMm4k7UJZpi8V43wujc73gcc/ZGqIR+FG9J8dH7NPG0KRTd9uckBcvvLXPZ6G1jKFgaHkxynqgNzjn482wmggvnbmmj+1Scz6gkH+GA8kRTh+YdQ/1TQKtvw/jnw2qri2lmL/F3gYDVmO83sLf+yLA3Um+coV6Mhjcpc20ehJFunFfT7a2GUJBcgW8BJX42Q00dAt4ftfgArECTcTaLmU2CbmzoRzsOQOOTy95d5PaKg8/pzWiDjW52UOC5OALC/hFVzk3maDXNkGDzUOW9WhOhpfx81SJGi0wQpydz2AMfrjmWxe5A7vEFuTcmWA9h+n/T++350a1XBlzBMNjt+sKdCn5fI7Ic0Azx/S8PdK+tnKfiqe5Drd+/cq8UyOWtH72lWZ3JKMqMsp85sgO7QJpmm1pFS4lPDfKrtSwXd5L30r0X63ZqVOo71su67JYkLs36kF7qCkcMq7Sw8Gxz5mZi9erq9Jz1nDl6EjawCmse7gCikyd0vuyjbl6cBPkjUFlq9JRJTWJO3H/Y2SfrALUAcJE3KVPFZHBbbNSS0BHXNDqBYVU5tzCbD4iIVXPdLosIF6caZZ+TnZfdHGzGFJalErDaViEEUMqy+L7sovzMd5vQ1pgR3ulCpoTg90BRRRKCqKFAyIDdrZKM0c5fapS1snqLmdaLroMUotD3HWeRuKPS0WRJoNK0ix9mtvGioBYyCvII2k1IrOhX36jGhgV/sLI5kdtc6xTnehKT7ORg/e/CkJ7L1udrwjaMWq+nD0YhC2tz7souyc57Qv/8WWlGH1W9RIm+PUfvLcuXyJ27d5Cz4S8XmR1ms9aw3XkR7UuoXN85u5DJkOh72yHKkqYymbL2lblJBSlUVExpsd9FHj+vfax6K+OeYfHs/nxLhYrwQnnMySjz6BjaHrvBbYYxWVssk5AoF/PR2i6/L3f562XGqstx4b4y/QtBSYM2UwkHKkG0zFnvcxkC6s7ZEq745jJ024lqcP6+02E0H9mksmczjHtndsjRbbjfV1HDsZS9T85j2cQxJ+c2k5qEoNOs7k68c4OdjXAxKTGHTbFN11IwbNOZi49YQcnnH8S2d7yP4tcMoat4TbUxi1sAJLWTnZ5swhenLtIR+Uad1FksfEZvDGor97OC6IMEUju1jZKkvCXnvmDxmgB8BgYtxP2OfWExh4eUYyae/yN9e2L2RNt+60ru31GlN3Oc7sn9ucCIKxY4x7lVfEoWUPrfn0YO9SgIV4xCZfZ+xjR49tloiqU6p4bqLCwcoERsTMPfuHGfttVkv4ng2YF314C0r1suC59HVXbfCO7d/h2fMGLcSBt1h8e0IkQMu/gR95IJ0Q/tAHx+jqsgG+gjBpyoC7F1KLNVk5Vxb5DTHj0kyaI0UfNLEON5GKdHN3We2/1hnvJ+E7i5O0O/F7JVB9lyma4ISB9fXvzzwWJ3AC57d9Zb4dtg1+ZaV3j2liZbEc2zCb7bcvfLnlLfMbWvmitfmf8yL1PhLvZbG8Snuhk2ZI05/XnGyvll2gtXpLcz1xzbP8oIixZTephvqmj9XK74zDZgO8UoyzGz+In23xogoJEkhNBLiIks32XVjU6opIT6jYXFZfv1Ec5r9U09jY6fdkGk01PX69SVpCbnRMCHMU/BRxQ8fKeASfK7Czw91CwfFpT9G+mC2gaTIKKG/5CeonJAsHdV23r1btPJ7tTX63iCBkyQK8SK02XdDorSFUVtHNRh75rQqttMNlcgZNSSEL4xAFIr88jUq6hVMOVEHtireRJWVRpJcspNBiXm4vmGkTjLoDNPKkb8qpVHrbJYhQp/LmooK2cHlsD2YmeCbHXtEEOa259s7MHyEq/AH7yyjrsByIu9OvYQVY6JU/0TsERGpHqZbAh+FePRH39J5GfHiYcNgTOFo5nfvDHXT1A5ZFlP4FTHPSom9Xn7Uubi2qkac+SkNx4gQhfg0nxaIq+dR8naMim5VHv328WL4nxq1WBWxGOZ+KE8Iza1PsbajJQQ9iNgksLeRaVpnk2WiN00TQjMDrCsjFxNsRLQgs0hbmzYOMhvcLIbk9jHsT6Kl0T+rrZY74YLPHFH6hOpowzT7XrVCLPyb6kmVMLpeUnHKXV9Ps7m1PqLzcm7kZQm75Nczaa5tYHu4w/HVTdCXMf7EZs1cHvfaBG5BsMu3x+D0FOW61WWZjEO1tZGgldCaI1kXSj3GfNgamVWYZLPXLs0xrDtPXNCoHq81ZpZlJxmHZoXYNuUGHaBVW9qv6pIsitj5MyV6cSe33qjPyUysLxfMs6ervSptn2zalpCquyNXN8zSXFCujTPdVSjo0YxNJqtYDU9maJAlhJPDDDVGcouWwEmyZZy6p/Awi+Z0mTaM8/k81ajiSHc9yMUcYhEmw3F5ISqFdgCFr5U9bc6iRLe7Ud/SKqu9PlNqbFasKzYFOjRqQ8UoNgc5OpWENqV2nTOgRViU49tG7cNcedSiRqvoinuIRT3E4aUicSnQv41IiPKxUIQnfWLGjvIxw2AAABjY1twIAKS098kXA7M837cQjF8CgOqXAdEAAC9oFzWz/zPW+sYJAEEQAAACfB9brjGRr+6cX9UfWpFvmlQ40NUHdLUBU4sZ8l9w5tIUgCYMROcLFAHI8wYKAn79EVosCM3DW2uNnXaADIC99LW0eQdna3t/ptNnKVdm0WQ/ZY4SZjaX1wCOS8wEMgQAhb3YmufObsUxBkZ0QgFgGQAyCXbLMpEw1zKxDI9XkshMFkl0GUGsSfESmMHgMzlApQOnQvs8OxfYGSFdR5301kVrLbXSjZKDHcO5V4th3hyw1EX7MpXr4GQdXcD0NpqrlKm617AVUu3q2/Vaan1o7a6CFTu+o/Zs0pUflHK1dYmydGQ+WFc2uY0bNFC2cgjbM6hVsKOgGzKgeZ26a4dsj2dl71arVy21SwfJ5HVz8xa2sFKTZkCsUDIvJRsrE07NLcly7RxVCgwQqPFgWUk183IAAAAA";
  var CG6_B64 = "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";
  var OF_B64 = "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";

  function b64buf(b) {
    var s = atob(b);
    var u = new Uint8Array(s.length);
    for (var i = 0; i < s.length; i++) u[i] = s.charCodeAt(i);
    return u.buffer;
  }

  function loadFonts() {
    var faces = [
      new FontFace("Cormorant Garamond", b64buf(CG_B64), { weight: "400" }),
      new FontFace("Cormorant Garamond", b64buf(CG6_B64), { weight: "600" }),
      new FontFace("Outfit", b64buf(OF_B64), { weight: "100 900" })
    ];
    return Promise.all(faces.map(function (f) {
      return f.load().then(function (loaded) { document.fonts.add(loaded); });
    })).then(function () { return document.fonts.ready; });
  }

  function mul(a, b) {
    var o = new Array(16).fill(0);
    for (var c = 0; c < 4; c++) for (var r = 0; r < 4; r++) {
      var s = 0;
      for (var k = 0; k < 4; k++) s += a[k * 4 + r] * b[c * 4 + k];
      o[c * 4 + r] = s;
    }
    return o;
  }
  function persp(f, asp, n, fa) {
    var t = 1 / Math.tan(f / 2);
    return [t / asp, 0, 0, 0, 0, t, 0, 0, 0, 0, (fa + n) / (n - fa), -1, 0, 0, (2 * fa * n) / (n - fa), 0];
  }
  function rotY(a) {
    var c = Math.cos(a), s = Math.sin(a);
    return [c, 0, -s, 0, 0, 1, 0, 0, s, 0, c, 0, 0, 0, 0, 1];
  }
  function rotX(a) {
    var c = Math.cos(a), s = Math.sin(a);
    return [1, 0, 0, 0, 0, c, s, 0, 0, -s, c, 0, 0, 0, 0, 1];
  }
  function trans(x, y, z) {
    return [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, x, y, z, 1];
  }
  function rng(seed) {
    var s = seed;
    return function () {
      s = (s * 1664525 + 1013904223) % 4294967296;
      return s / 4294967296;
    };
  }

  function pill(g, x, y, w, h) {
    var r = h / 2;
    g.beginPath();
    g.moveTo(x + r, y);
    g.lineTo(x + w - r, y);
    g.arc(x + w - r, y + r, r, -Math.PI / 2, Math.PI / 2);
    g.lineTo(x + r, y + h);
    g.arc(x + r, y + r, r, Math.PI / 2, Math.PI * 1.5);
    g.closePath();
    g.fill();
  }
  function spaced(g, s, cx, y, sp) {
    var chars = Array.from(s);
    var ws = chars.map(function (ch) { return g.measureText(ch).width; });
    var tot = ws.reduce(function (a, b) { return a + b; }, 0) + sp * (ws.length - 1);
    var x = cx - tot / 2;
    var al = g.textAlign;
    g.textAlign = "left";
    chars.forEach(function (ch, i) { g.fillText(ch, x, y); x += ws[i] + sp; });
    g.textAlign = al;
  }
  function row(g, l, r, y, a, b, aw, bw, size, indent) {
    g.textAlign = "left";
    g.font = aw + " " + size + "px " + SANS;
    g.fillText(a, l + (indent || 0), y);
    if (b) {
      g.textAlign = "right";
      g.font = bw + " " + size + "px " + SANS;
      g.fillText(b, r, y);
    }
  }

  function drawFront(g, cx) {
    g.fillStyle = PEACH;
    g.beginPath();
    g.arc(cx + 330, 360, 135, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = GREEN;
    g.textAlign = "center";
    g.textBaseline = "alphabetic";
    g.font = "800 38px " + SANS;
    spaced(g, "LIGHTLY SPARKLING MATCHA", cx, 165, 2);
    g.save();
    g.translate(cx - 20, 610);
    g.rotate(-Math.PI / 2);
    g.font = "600 440px " + DISPLAY;
    g.textBaseline = "middle";
    g.fillText("mai", 0, 0);
    g.restore();
    g.textBaseline = "alphabetic";
    pill(g, cx - 200, 1060, 400, 100);
    g.fillStyle = CREAM;
    g.font = "600 56px " + SERIF;
    g.fillText("yuzu + sea salt", cx, 1126);
    g.fillStyle = GREEN;
    g.font = "700 22px " + SANS;
    spaced(g, "NATURALLY FLAVORED", cx, 1232, 3);
    g.font = "400 27px " + SANS;
    g.fillText("11.2 FL OZ (330 mL)", cx, 1280);
  }

  function drawBack(g, cx) {
    g.textAlign = "center";
    g.textBaseline = "alphabetic";
    g.fillStyle = PEACH;
    g.beginPath();
    g.arc(cx, 92, 13, 0, Math.PI * 2);
    g.fill();
    g.fillStyle = GREEN;
    g.font = "400 56px " + SERIF;
    g.fillText("Light as sea spray.", cx, 185);
    g.fillText("Calm as matcha.", cx, 250);
    g.font = "700 16px " + SANS;
    spaced(g, "REAL MATCHA \u00b7 YUZU", cx, 296, 2);
    spaced(g, "A PINCH OF SEA SALT", cx, 318, 2);
    g.font = "400 44px " + SERIF;
    g.fillText("45 mg caffeine", cx, 374);
    g.font = "700 15px " + SANS;
    spaced(g, "FROM REAL MATCHA", cx, 397, 3);
    g.font = "italic 400 26px " + SERIF;
    g.fillText("Real matcha settles.", cx, 438);
    g.fillText("Tip gently before opening.", cx, 466);
    var l = cx - 235, r = cx + 235, top = 495, bot = 1040, il = l + 14, ir = r - 14;
    g.fillStyle = "rgba(255,255,255,0.35)";
    g.fillRect(l, top, r - l, bot - top);
    g.strokeStyle = GREEN;
    g.lineWidth = 3;
    g.strokeRect(l, top, r - l, bot - top);
    g.fillStyle = GREEN;
    g.textAlign = "left";
    g.font = "900 50px " + SANS;
    g.fillText("Nutrition Facts", il, top + 52);
    g.fillRect(il, top + 64, ir - il, 2);
    row(g, il, ir, top + 90, "1 serving per container", "", "400", "", 18);
    row(g, il, ir, top + 116, "Serving size", "1 can (330mL)", "800", "800", 21);
    g.fillRect(il, top + 128, ir - il, 12);
    row(g, il, ir, top + 160, "Amount per serving", "", "700", "", 14);
    row(g, il, ir, top + 198, "Calories", "25", "900", "900", 36);
    g.fillRect(il, top + 210, ir - il, 6);
    g.textAlign = "right";
    g.font = "700 14px " + SANS;
    g.fillText("% Daily Value*", ir, top + 234);
    var lines = [
      ["Total Fat", " 0g", "0%", 0],
      ["Sodium", " 45mg", "2%", 0],
      ["Total Carbohydrate", " 6g", "2%", 0],
      ["Total Sugars 4g", "", "", 24],
      ["Includes 4g Added Sugars", "", "8%", 44],
      ["Protein", " <1g", "", 0]
    ];
    var y = top + 244;
    lines.forEach(function (line) {
      var a = line[0], amt = line[1], dv = line[2], ind = line[3];
      g.fillRect(il + (ind > 40 ? ind : 0), y, ir - il - (ind > 40 ? ind : 0), 1.5);
      y += 24;
      g.textAlign = "left";
      g.font = (ind ? 400 : 800) + " 18px " + SANS;
      g.fillText(a, il + ind, y);
      if (amt) {
        var w = g.measureText(a).width;
        g.font = "400 18px " + SANS;
        g.fillText(amt, il + ind + w, y);
      }
      if (dv) {
        g.textAlign = "right";
        g.font = "800 18px " + SANS;
        g.fillText(dv, ir, y);
      }
      y += 5;
    });
    g.fillRect(il, y + 2, ir - il, 10);
    g.textAlign = "left";
    g.font = "400 13.5px " + SANS;
    g.fillText("Not a significant source of saturated fat, trans fat, cholesterol,", il, y + 34);
    g.fillText("dietary fiber, vitamin D, calcium, iron and potassium.", il, y + 52);
    g.fillRect(il, y + 62, ir - il, 1.5);
    g.font = "400 12px " + SANS;
    g.fillText("*The % Daily Value (DV) tells you how much a nutrient in a serving of food", il, y + 82);
    g.fillText("contributes to a daily diet. 2,000 calories a day is used for general", il, y + 98);
    g.fillText("nutrition advice.", il, y + 114);
    g.textAlign = "center";
    var ing1 = "CARBONATED WATER, AGAVE SYRUP, MATCHA, CITRIC";
    g.font = "800 16px " + SANS;
    var lw = g.measureText("INGREDIENTS: ").width;
    g.font = "400 16px " + SANS;
    var w1 = g.measureText(ing1).width;
    var sx = cx - (lw + w1) / 2;
    g.textAlign = "left";
    g.font = "800 16px " + SANS;
    g.fillText("INGREDIENTS: ", sx, 1080);
    g.font = "400 16px " + SANS;
    g.fillText(ing1, sx + lw, 1080);
    g.textAlign = "center";
    g.fillText("ACID, SEA SALT, NATURAL FLAVOR.", cx, 1106);
    g.font = "400 15px " + SANS;
    spaced(g, "DISTRIBUTED BY MAI BEVERAGE CO., DENVER, CO", cx, 1146, 2);
    var bx = cx - 290, by = 1215;
    // Blank panel where a barcode will go. No caption and no digits.
    g.fillStyle = "rgba(255,255,255,0.22)";
    g.fillRect(bx, by, 220, 118);
    g.textAlign = "right";
    g.fillStyle = GREEN;
    g.font = "400 32px " + SERIF;
    g.fillText("drinkmai.com", cx + 290, by + 40);
    g.font = "700 15px " + SANS;
    g.fillText("\u267B PLEASE RECYCLE", cx + 290, by + 78);
    g.fillText("BEST BY: SEE BOTTOM OF CAN", cx + 290, by + 108);
  }

  function buildWrap(W, H, outSize) {
    var c = document.createElement("canvas");
    c.width = W;
    c.height = H;
    var g = c.getContext("2d");
    g.fillStyle = CREAM;
    g.fillRect(0, 0, W, H);
    var rand = rng(11);
    var specks = W > 1400 ? 26000 : 12000;
    for (var i = 0; i < specks; i++) {
      var x = rand() * W, y = rand() * H, k = rand();
      g.fillStyle = k < 0.65 ? "rgba(140,115,85,0.22)" : k < 0.9 ? "rgba(70,100,70,0.16)" : "rgba(255,255,255,0.5)";
      g.fillRect(x, y, 1 + rand() * 1.6, 1 + rand() * 1.6);
    }
    drawFront(g, W * 0.25);
    drawBack(g, W * 0.75);
    var out = document.createElement("canvas");
    out.width = outSize;
    out.height = outSize;
    out.getContext("2d").drawImage(c, 0, 0, outSize, outSize);
    return out;
  }

  var VS = "attribute vec3 p;attribute vec3 n;attribute vec2 uv;uniform mat4 M;uniform mat4 VP;varying vec3 vn;varying vec3 vw;varying vec3 vp;varying vec2 vuv;void main(){vec4 w=M*vec4(p,1.0);vw=w.xyz;vp=p;vn=mat3(M)*n;vuv=uv;gl_Position=VP*w;}";
  var FS = "precision mediump float;varying vec3 vn;varying vec3 vw;varying vec3 vp;varying vec2 vuv;uniform sampler2D tex;uniform float mode;uniform vec3 cam;void main(){vec3 N=normalize(vn);vec3 V=normalize(cam-vw);vec3 L=normalize(vec3(0.45,0.8,1.0));vec3 L2=normalize(vec3(-0.9,0.3,0.3));float d=max(dot(N,L),0.0);float d2=max(dot(N,L2),0.0);vec3 H=normalize(L+V);float s=pow(max(dot(N,H),0.0),60.0);vec3 col;if(mode>0.5&&mode<1.5){vec3 t=texture2D(tex,vuv).rgb;float fr=pow(1.0-max(dot(N,V),0.0),3.0);col=t*(0.66+0.36*d+0.1*d2)*(1.0-0.35*fr)+vec3(0.08*s);}else{vec3 R=reflect(-V,N);float env=0.78+0.22*smoothstep(-0.2,0.6,R.y)-0.18*smoothstep(0.2,0.9,-R.y)+0.08*sin(R.x*7.0);float rr=length(vp.xz);float brush=0.012*sin(rr*260.0)+0.008*sin(rr*610.0+vp.x*2.0);if(abs(N.y)<0.5){brush=0.01*sin(vp.y*300.0);}vec3 base=vec3(0.93,0.94,0.96);if(mode>2.5){base*=0.62;}if(mode>1.5&&mode<2.5){base=vec3(0.32,0.33,0.35);}col=base*(0.66+0.3*d+0.12*d2)*env+brush+vec3(0.9*s);if(mode>1.5&&mode<2.5){col=vec3(0.16,0.16,0.17);}}float al=1.0;if(mode>4.5){col=vec3(0.24,0.2,0.16);al=0.34*(1.0-smoothstep(0.55,1.6,length(vp.xz)));}gl_FragColor=vec4(col,al);}";

  function upload(gl, d, mode) {
    var buf = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buf);
    gl.bufferData(gl.ARRAY_BUFFER, new Float32Array(d), gl.STATIC_DRAW);
    return { buf: buf, count: d.length / 8, mode: mode };
  }
  function lathe(gl, prof, seg, mode) {
    var d = [];
    function vert(r, y, v, a, nr, ny) {
      d.push(r * Math.sin(a), y, r * Math.cos(a), nr * Math.sin(a), ny, nr * Math.cos(a), (a + Math.PI / 2) / (Math.PI * 2), v);
    }
    for (var i = 0; i < prof.length - 1; i++) {
      var r0 = prof[i][0], y0 = prof[i][1], v0 = prof[i][2];
      var r1 = prof[i + 1][0], y1 = prof[i + 1][1], v1 = prof[i + 1][2];
      var dx = r1 - r0, dy = y1 - y0, len = Math.hypot(dx, dy) || 1;
      var nr = -dy / len, ny = dx / len;
      for (var k = 0; k < seg; k++) {
        var a0 = -Math.PI / 2 + (k / seg) * Math.PI * 2;
        var a1 = -Math.PI / 2 + ((k + 1) / seg) * Math.PI * 2;
        vert(r0, y0, v0, a0, nr, ny); vert(r1, y1, v1, a0, nr, ny); vert(r1, y1, v1, a1, nr, ny);
        vert(r0, y0, v0, a0, nr, ny); vert(r1, y1, v1, a1, nr, ny); vert(r0, y0, v0, a1, nr, ny);
      }
    }
    return upload(gl, d, mode);
  }
  function stadium(gl, z0, z1, rw, y, mode) {
    var pts = [];
    var i;
    for (i = 0; i <= 24; i++) {
      var a = Math.PI * (i / 24);
      pts.push([rw * Math.cos(a), z1 + rw * Math.sin(a)]);
    }
    for (i = 0; i <= 24; i++) {
      var b = Math.PI + Math.PI * (i / 24);
      pts.push([rw * Math.cos(b), z0 + rw * Math.sin(b)]);
    }
    var cz = (z0 + z1) / 2, d = [];
    for (i = 0; i < pts.length; i++) {
      var p = pts[i], q = pts[(i + 1) % pts.length];
      d.push(0, y, cz, 0, 1, 0, 0, 0, q[0], y, q[1], 0, 1, 0, 0, 0, p[0], y, p[1], 0, 1, 0, 0, 0);
    }
    return upload(gl, d, mode);
  }

  function mount(root) {
    var cv = root.querySelector(".can3d-view");
    var nav = root.querySelector(".can3d-nav");
    var fallback = root.querySelector(".can3d-fallback");
    if (!cv) return;
    var mobile = window.matchMedia("(max-width: 860px)").matches;
    var gl = cv.getContext("webgl", {
      antialias: !mobile,
      alpha: true,
      premultipliedAlpha: false,
      powerPreference: mobile ? "low-power" : "default"
    });
    if (!gl) return;

    function sh(t, s) {
      var o = gl.createShader(t);
      gl.shaderSource(o, s);
      gl.compileShader(o);
      return o;
    }
    var pr = gl.createProgram();
    gl.attachShader(pr, sh(gl.VERTEX_SHADER, VS));
    gl.attachShader(pr, sh(gl.FRAGMENT_SHADER, FS));
    gl.linkProgram(pr);
    if (!gl.getProgramParameter(pr, gl.LINK_STATUS)) return;
    gl.useProgram(pr);

    var R = 1, h = 2.2, top = h + 0.42;
    var seg = mobile ? 96 : 128;
    var body = lathe(gl, [[R, h, 0], [R, -h, 1]], seg, 1);
    var shoulder = lathe(gl, [
      [R, h, 0], [0.985, h + 0.08, 0], [0.93, h + 0.2, 0], [0.87, h + 0.3, 0], [0.86, h + 0.36, 0],
      [0.875, h + 0.4, 0], [0.87, top + 0.03, 0], [0.84, top + 0.04, 0], [0.82, top, 0], [0.8, top - 0.08, 0], [0.76, top - 0.09, 0], [0, top - 0.09, 0]
    ], seg, 0);
    var bottom = lathe(gl, [
      [R, -h, 0], [0.99, -h - 0.08, 0], [0.93, -h - 0.2, 0], [0.82, -h - 0.27, 0], [0.74, -h - 0.25, 0], [0.6, -h - 0.15, 0], [0, -h - 0.08, 0]
    ], seg, 0);
    var lid = top - 0.09;
    var parts = [
      body, shoulder, bottom,
      stadium(gl, 0.28, 0.42, 0.24, lid + 0.003, 3),
      stadium(gl, 0.28, 0.42, 0.215, lid + 0.005, 0),
      stadium(gl, -0.36, 0.02, 0.2, lid + 0.012, 0),
      stadium(gl, -0.4, -0.22, 0.1, lid + 0.014, 2),
      stadium(gl, -0.02, 0.02, 0.055, lid + 0.017, 3)
    ];
    var shadow = stadium(gl, 0, 0, 1.7, -h - 0.27, 5);
    var I = [1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1, 0, 0, 0, 0, 1];
    gl.blendFunc(gl.SRC_ALPHA, gl.ONE_MINUS_SRC_ALPHA);
    var tex = gl.createTexture();
    gl.bindTexture(gl.TEXTURE_2D, tex);
    gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, 1, 1, 0, gl.RGBA, gl.UNSIGNED_BYTE, new Uint8Array([239, 232, 218, 255]));
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MAG_FILTER, gl.LINEAR);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_S, gl.REPEAT);
    gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_WRAP_T, gl.CLAMP_TO_EDGE);

    var st = {
      yaw: 0.42,
      pitch: 0.16,
      dist: 8.05,
      drag: false,
      lx: 0,
      ly: 0,
      spin: true,
      pts: new Map(),
      pinch: 0,
      visible: true,
      aim: null
    };
    root._maiCan = st;

    var aP = gl.getAttribLocation(pr, "p");
    var aN = gl.getAttribLocation(pr, "n");
    var aU = gl.getAttribLocation(pr, "uv");
    var uM = gl.getUniformLocation(pr, "M");
    var uVP = gl.getUniformLocation(pr, "VP");
    var uT = gl.getUniformLocation(pr, "mode");
    var uC = gl.getUniformLocation(pr, "cam");
    gl.enable(gl.DEPTH_TEST);

    var raf = 0, running = false, last = 0, alive = true, shown = false;

    function frame(now) {
      running = true;
      if (!alive || !st.visible || document.hidden) {
        running = false;
        return;
      }
      var dt = Math.min(0.05, (now - last) / 1000);
      last = now;
      if (st.aim && !st.drag) {
        var dy = Math.atan2(Math.sin(st.aim.yaw - st.yaw), Math.cos(st.aim.yaw - st.yaw));
        st.yaw += dy * Math.min(1, dt * 7);
        st.pitch += (st.aim.pitch - st.pitch) * Math.min(1, dt * 7);
        if (Math.abs(dy) < 0.008 && Math.abs(st.aim.pitch - st.pitch) < 0.008) {
          st.yaw = st.aim.yaw;
          st.pitch = st.aim.pitch;
          st.aim = null;
        }
      } else if (st.spin && !st.drag) {
        st.yaw += dt * 0.38;
      }
      var dpr = Math.min(window.devicePixelRatio || 1, mobile ? 1.5 : 2);
      var w = Math.max(1, Math.round(cv.clientWidth * dpr));
      var hh = Math.max(1, Math.round(cv.clientHeight * dpr));
      if (cv.width !== w || cv.height !== hh) {
        cv.width = w;
        cv.height = hh;
      }
      gl.viewport(0, 0, w, hh);
      gl.clearColor(0, 0, 0, 0);
      gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT);
      var VP = mul(persp(0.7, w / hh, 0.1, 100), trans(0, -0.05, -st.dist));
      var M = mul(rotX(st.pitch), rotY(st.yaw));
      gl.uniform3f(uC, 0, 0, st.dist);
      function bind(m) {
        gl.bindBuffer(gl.ARRAY_BUFFER, m.buf);
        gl.enableVertexAttribArray(aP);
        gl.vertexAttribPointer(aP, 3, gl.FLOAT, false, 32, 0);
        gl.enableVertexAttribArray(aN);
        gl.vertexAttribPointer(aN, 3, gl.FLOAT, false, 32, 12);
        gl.enableVertexAttribArray(aU);
        gl.vertexAttribPointer(aU, 2, gl.FLOAT, false, 32, 24);
        gl.uniform1f(uT, m.mode);
        gl.drawArrays(gl.TRIANGLES, 0, m.count);
      }
      gl.depthMask(false);
      gl.uniformMatrix4fv(uVP, false, new Float32Array(VP));
      gl.uniformMatrix4fv(uM, false, new Float32Array(M));
      gl.enable(gl.BLEND);
      bind(shadow);
      gl.disable(gl.BLEND);
      gl.depthMask(true);
      for (var i = 0; i < parts.length; i++) bind(parts[i]);
      raf = requestAnimationFrame(frame);
    }
    function kick() {
      if (!shown || running || !st.visible || document.hidden) return;
      last = performance.now();
      raf = requestAnimationFrame(frame);
    }

    var outSize = mobile ? 1024 : 1536;
    var W = outSize;
    var HT = Math.round(W * (2 * h) / (2 * Math.PI * R));
    loadFonts().catch(function () { return undefined; }).then(function () {
      if (!alive) return;
      var t0 = performance.now();
      var wrap = buildWrap(W, HT, outSize);
      gl.bindTexture(gl.TEXTURE_2D, tex);
      gl.texImage2D(gl.TEXTURE_2D, 0, gl.RGBA, gl.RGBA, gl.UNSIGNED_BYTE, wrap);
      gl.generateMipmap(gl.TEXTURE_2D);
      gl.texParameteri(gl.TEXTURE_2D, gl.TEXTURE_MIN_FILTER, gl.LINEAR_MIPMAP_LINEAR);
      var an = gl.getExtension("EXT_texture_filter_anisotropic");
      if (an) gl.texParameterf(gl.TEXTURE_2D, an.TEXTURE_MAX_ANISOTROPY_EXT, Math.min(mobile ? 4 : 8, gl.getParameter(an.MAX_TEXTURE_MAX_ANISOTROPY_EXT)));
      root.dataset.canBuildMs = String(Math.round(performance.now() - t0));
      if (fallback) fallback.setAttribute("aria-hidden", "true");
      if (nav) nav.hidden = false;
      cv.removeAttribute("hidden");
      root.classList.add("is-live");
      shown = true;
      kick();
    });

    function onUser() {
      st.spin = false;
      if (nav) {
        nav.querySelectorAll("button").forEach(function (b) { b.setAttribute("aria-pressed", "false"); });
      }
    }
    function go(name) {
      st.spin = false;
      var yaw = name === "back" ? Math.PI : 0;
      st.aim = { yaw: yaw, pitch: 0.16 };
      if (nav) {
        nav.querySelectorAll("button").forEach(function (b) {
          b.setAttribute("aria-pressed", b.getAttribute("data-can-view") === name ? "true" : "false");
        });
      }
    }
    if (nav) {
      nav.addEventListener("click", function (e) {
        var btn = e.target.closest("button");
        if (!btn) return;
        go(btn.getAttribute("data-can-view"));
      });
    }

    cv.addEventListener("pointerdown", function (e) {
      if (e.pointerType === "mouse" && e.button !== 0) return;
      cv.setPointerCapture(e.pointerId);
      st.pts.set(e.pointerId, [e.clientX, e.clientY]);
      st.drag = true;
      st.lx = e.clientX;
      st.ly = e.clientY;
      st.pinch = 0;
      st.aim = null;
      onUser();
      cv.classList.add("is-grabbing");
    });
    cv.addEventListener("pointermove", function (e) {
      if (!st.drag || !st.pts.has(e.pointerId)) return;
      st.pts.set(e.pointerId, [e.clientX, e.clientY]);
      if (st.pts.size >= 2) {
        var pair = Array.from(st.pts.values());
        var dd = Math.hypot(pair[0][0] - pair[1][0], pair[0][1] - pair[1][1]);
        if (st.pinch > 0) st.dist = Math.min(11, Math.max(6.4, st.dist * (st.pinch / dd)));
        st.pinch = dd;
        return;
      }
      st.yaw += (e.clientX - st.lx) * 0.01;
      st.pitch = Math.max(-1.05, Math.min(1.05, st.pitch + (e.clientY - st.ly) * 0.008));
      st.lx = e.clientX;
      st.ly = e.clientY;
    });
    function endPointer(e) {
      st.pts.delete(e.pointerId);
      if (st.pts.size === 0) {
        st.drag = false;
        cv.classList.remove("is-grabbing");
      }
      st.pinch = 0;
      var rest = Array.from(st.pts.values())[0];
      if (rest) { st.lx = rest[0]; st.ly = rest[1]; }
    }
    cv.addEventListener("pointerup", endPointer);
    cv.addEventListener("pointercancel", endPointer);
    cv.addEventListener("wheel", function (e) {
      if (!e.ctrlKey && !e.metaKey) return;
      e.preventDefault();
      st.dist = Math.min(11, Math.max(6.4, st.dist * (1 + e.deltaY * 0.001)));
    }, { passive: false });

    var io = new IntersectionObserver(function (entries) {
      st.visible = entries.some(function (en) { return en.isIntersecting; });
      if (st.visible) kick();
    }, { rootMargin: "120px" });
    io.observe(root);
    document.addEventListener("visibilitychange", kick);

    root._maiStop = function () {
      alive = false;
      cancelAnimationFrame(raf);
      io.disconnect();
    };
  }

  function boot() {
    var root = document.querySelector("[data-can3d]");
    if (!root || root.dataset.canBoot) return;
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    root.dataset.canBoot = "1";
    var started = false;
    function start() {
      if (started) return;
      started = true;
      mount(root);
    }
    if (!("IntersectionObserver" in window)) {
      start();
      return;
    }
    var io = new IntersectionObserver(function (entries) {
      if (entries.some(function (en) { return en.isIntersecting; })) {
        io.disconnect();
        var idle = window.requestIdleCallback || function (fn) { setTimeout(fn, 1); };
        idle(start, { timeout: 400 });
      }
    }, { rootMargin: "200px" });
    io.observe(root);
  }

  if (document.readyState === "loading") document.addEventListener("DOMContentLoaded", boot);
  else boot();
})();

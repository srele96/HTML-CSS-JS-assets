var sliderRange = document.querySelector('.sliderRange');
var sliderThumb = document.querySelector('.sliderThumb');

/*
  ---------------IMPORTANT NOTES---------------
  IF YOU CHANGE SLIDERTHUMB WIDTH
      - adjust left and right edge in function moving
*/
var handler = (function() {
  // value is from 0 to range width
  var value = 0;
  // required in case of css width change
  var width = sliderRange.clientWidth;
  var percent = Math.round(value / width * 100);

  function setPercent() {
    percent = Math.round(value / width * 100);
    // use percent to set volume and what not
    document.querySelector('.value').innerHTML = percent;
  }

  function setVisualThumbRange() {
    sliderThumb.style.left = (value - 10) + 'px';
  }

  function moving(e) {
    // mouse position relative to element
    var xOffset = e.pageX - sliderRange.offsetLeft;
    
    if(xOffset < 0) {
      value = 0;
    }
    else if(xOffset >=0 && xOffset <= width) {
      value = xOffset;
    }
    else {
      value = width;
    }

    setVisualThumbRange();
    setPercent();
  }

  function endMoving(e) {
    removeSliderThumbPressedEffect();
    window.removeEventListener('mousemove', moving);
    window.removeEventListener('mouseup', endMoving);
  }

  function addSliderThumbPressedEffect() {
    sliderThumb.classList.add('sliderThumb--active');
  }

  function removeSliderThumbPressedEffect() {
    sliderThumb.classList.remove('sliderThumb--active');
  }

  return {
    mousedown: function(e) {
      addSliderThumbPressedEffect();

      var xOffset = e.pageX - sliderRange.offsetLeft;
      if(xOffset >= 0 && xOffset <= width) {
        value = xOffset;
      }
      setVisualThumbRange();
      setPercent();

      window.addEventListener('mousemove', moving);
      window.addEventListener('mouseup', endMoving);
    },
    getPercentOnce: function() {
      return percent;
    },
    // takes number between 0 and 100 (including them)
    setInitialPercent: function(val) {
      if((typeof(val) !== 'number')) {
        throw TypeError('arg must be a number');
      }
      if(val < 0 || val > 100) {
        throw RangeError('arg must be >=0 && <=100')
      }
      var newValue = Math.round(val / 100 * width);
      value = newValue;
      percent = val;
      setVisualThumbRange();
    }
  };
})();

sliderRange.addEventListener('mousedown', handler.mousedown);
window.onload = function() {
  handler.setInitialPercent(50);
  document.querySelector('.value').innerHTML = handler.getPercentOnce();
}
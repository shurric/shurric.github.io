window.onload = function() {
  var audioContext = new AudioContext()
  var audio = document.querySelector('audio')
  var audioBufferSouceNode = audioContext.createMediaElementSource(audio)
  var analyser = audioContext.createAnalyser()
  var animationId
  //connect the source to the analyser
  audioBufferSouceNode.connect(analyser)
  //connect the analyser to the destination(the speaker), or we won't hear the sound
  analyser.connect(audioContext.destination)
  //play the source
  audio.play()
  var canvas = document.getElementById('canvas')
  var cwidth = canvas.width
  var meterNum = 50 //count of the meters
  var meterWidth = window.innerWidth/(meterNum*1.2) //width of the meters in the spectrum
  var gap = meterWidth*0.2
  var ctx = canvas.getContext('2d')
  var gradient = ctx.createLinearGradient(0, 0, 0, 300)
  gradient.addColorStop(1, '#37474F')
  gradient.addColorStop(0.5, '#455A64')
  gradient.addColorStop(0, '#546E7A')
  canvas.width = window.innerWidth
  canvas.height = window.innerHeight/2
  var cheight = canvas.height
  var drawMeter = function() {
    var array = new Uint8Array(analyser.frequencyBinCount)
    analyser.getByteFrequencyData(array)
    var step = Math.round(array.length / (900 / (12))) //sample limited data from the total array
    console.log(step);
    ctx.clearRect(0, 0, canvas.width, cheight)
    for (var i = 0; i < meterNum; i++) {
      var value = array[i * step]
      ctx.fillStyle = gradient //set the filllStyle to gradient for a better look
      ctx.fillRect(i * (meterWidth + gap), cheight - value, meterWidth, cheight) //the meter
    }
    animationId = requestAnimationFrame(drawMeter)
  }
  animationId = requestAnimationFrame(drawMeter)
}

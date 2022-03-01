function init()
{
  this.config =
  {
    perspective: 3,
    star_color: '255, 255, 255',
    speed: 2,
    stars_count: 3
  }
  this.space = document.getElementById('welcomeBG');
  this.context = this.space.getContext('2d');
  start();
}

function start()
{
  const self = this;

  this.space.width = this.space.offsetWidth;
  this.space.height = this.space.offsetHeight;
  this.space_center_x = this.space.width / 2;
  this.space_center_y = this.space.height / 2;

  this.stars_count = this.space.width / this.config.stars_count;
  this.focal_length = this.space.width / this.config.perspective;
  this.speed = this.config.speed * this.space.width / 2000;

  this.stars = [];

  for (let i = 0; i < this.stars_count; i++)
  {
    this.stars.push({
      x: Math.random() * this.space.width,
      y: Math.random() * this.space.height,
      z: Math.random() * this.space.width,
    })
  }

  window.cancelAnimationFrame(this.animation_frame)
  {
    self.render();
  }
}

function render()
{
  const self = this;
  this.animation_frame = window.requestAnimationFrame(function ()
  {
    self.render();
  })
  this.context.clearRect(0, 0, this.space.width, this.space.height);
  for (let i = 0, length = this.stars.length; i < length; i += 1)
  {
    const star = this.stars[i];
    star.z -= this.speed;
    if (star.z <= 0)
    {
      this.stars[i] =
          {
        x: Math.random() * this.space.width,
        y: Math.random() * this.space.height,
        z: this.space.width,
      }
    }

    const star_x = (star.x - this.space_center_x) * (this.focal_length / star.z) + this.space_center_x;
    const star_y = (star.y - this.space_center_y) * (this.focal_length / star.z) + this.space_center_y;
    const star_radius = Math.max(0, 1.4 * (this.focal_length / star.z) / 2);
    const star_opacity = 1 - star.z / this.space.width;

    this.context.fillStyle = 'rgba(' + this.config.star_color + ',' + star_opacity + ')';
    this.context.beginPath();
    this.context.arc(star_x, star_y, star_radius, 0, Math.PI * 2);
    this.context.fill();
  }
}

window.onload = function()
{
  init();
}
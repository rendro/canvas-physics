/**
 * Vector 2D class
 */
class Vec2D {

	/**
	 * Create a new vector from the sum of n vectors
	 * @param  {Vec2D} vec2ds Vectors
	 * @return {Vec2D}        Sum vector
	 */
	static sum(...vec2ds) {
		let x = vec2ds.reduce((cur, vec) => cur + vec.x, 0);
		let y = vec2ds.reduce((cur, vec) => cur + vec.y, 0);
		return new Vec2D(x, y);
	}

	/**
	 * Create a new vector from the subtraction of n vectors of a vector
	 * @param  {Vec2D} vec2d  First Vector
	 * @param  {Vec2D} vec2ds Vectors
	 * @return {Vec2D}        Subtracted vector
	 */
	static diff(vec2d, ...vec2ds) {
		let x = vec2ds.reduce((cur, vec) => cur - vec.x, vec2d.x);
		let y = vec2ds.reduce((cur, vec) => cur - vec.y, vec2d.y);
		return new Vec2D(x, y);
	}

	/**
	 * Cretes a new Vec2D Object
	 * @param {Number} x x-coordinate
	 * @param {Number} y y-coordinate
	 */
	constructor(x=0, y=0) {
		this.x = x;
		this.y = y;
	}

	/**
	 * Add another Vec2D to this vector
	 * @param  {Vec2D} Vector to be added
	 * @return {Vec2D} This instance for method chaining
	 */
	add(vec2d) {
		this.x += vec2d.x;
		this.y += vec2d.y;
		return this;
	}

	/**
	 * Subtract another Vec2D from this vector
	 * @param  {Vec2D} vec2d Vector to be subtracted
	 * @return {Vec2D}       This instance for method chaining
	 */
	subtract(vec2d) {
		this.x -= vec2d.x;
		this.y -= vec2d.y;
		return this;
	}

	/**
	 * Multiply vector with scalar
	 * @param  {Number} i Multiplicator
	 * @return {Vec2D}    This instance for method chaining
	 */
	multiply(i) {
		this.x *= i;
		this.y *= i;
		return this;
	}

	/**
	 * Divide vecor by scalar
	 * @param  {Number} i Divisor
	 * @return {Vec2D}    This instance for method chaining
	 */
	divide(i) {
		this.x /= i;
		this.y /= i;
		return this;
	}

	limit(max) {
		if (this.magnitude() > max) {
			this.normalize().multiply(max);
		}
		return this;
	}

	/**
	 * Magnitude of the vector
	 */
	magnitude() {
		return Math.sqrt((this.x * this.x) + (this.y * this.y));
	}

	/**
	 * Normalize the vector to a length of 1
	 * @return {Vec2D} This instance for method chaining
	 */
	normalize() {
		let mag = this.magnitude();
		if (mag !== 0) {
			this.divide(mag);
		}
		return this;
	}

	/**
	 * Get the directon of the vector in radiants
	 * @return {Number} Direction of the vector in radiants
	 */
	direction() {
		return Math.atan2(this.y, this.x);
	}

	/**
	 * Calculate the dot product this vector with another vector
	 * @return {Number} Dot product
	 */
	dotProduct(vec2d) {
		return (vec2d.x * this.x) + (vec2d.y * this.y);
	}

	/**
	 *
	 */
	distance(vec2d) {
		return Math.sqrt((this.x - vec2d.x) * (this.x - vec2d.x) + (this.y - vec2d.y) * (this.y - vec2d.y));
	}

	/**
	 * Compare to another vector instance
	 * @param  {Vec2d}   vec2d Vector to compare to
	 * @return {Boolean}       Boolean if the vectors are the same
	 */
	equals(vec2d) {
		return this.x === vec2d.x && this.y === vec2d.y;
	}

	inRect(x, y, width, height) {
		return this.x > x && this.y > y && this.x < (x + width) && this.y < (y +height);
	}

	/**
	 * Clone Vector
	 * @return {Vec2D} Cloned vector
	 */
	clone() {
		return new Vec2D(this.x, this.y);
	}

	/**
	 * To string that outputs the vector in the format [x,y]
	 * @return {String} String representation of the vector
	 */
	toString() {
		return `[${this.x},${this.y}]`;
	}
}

module.exports = Vec2D;

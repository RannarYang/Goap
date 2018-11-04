class VGameObject extends eui.Component{
	public constructor() {
		super();
	}
	public moveTo(target: VGameObject, step:number) {
		if(this.distanceSquare(target) < step * step) {
			this.x = target.x;
			this.y = target.y;
		} else {
			let percent = 6/this.distance(target)
			this.x = this.x + percent * (target.x - this.x)
			this.y = this.y + percent * (target.y - this.y);
		}
	}
	public posEquip(gameObj: VGameObject) {
		return this.x == gameObj.x && this.y == gameObj.y;
	}
	/**距离的平方 */
	public distanceSquare(object: VGameObject) {
		return (object.x - this.x) * (object.x - this.x) + (object.y - this.y) * (object.y - this.y);
	}
	/**距离 */
	public distance(object){
		return Math.sqrt(this.distanceSquare(object))
	}
}
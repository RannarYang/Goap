class VGameObject extends eui.Component{
	public constructor() {
		super();
	}
	public moveTo(x: number, y:number) {

	}
	public posEquip(gameObj: VGameObject) {
		return this.x == gameObj.x && this.y == gameObj.y;
	}
	/**距离的平方 */
	public distanceSquare(object: VGameObject) {
		return (object.x - this.x) * (object.x - this.x) + (object.y - this.y) * (object.y - this.y);
	}
}
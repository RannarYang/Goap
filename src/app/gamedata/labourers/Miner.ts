/*
 * @Description: 矿工
 * @Author: Rannar.Yang 
 * @Date: 2018-09-05 20:40:44 
 * @Last Modified by: Rannar.Yang
 * @Last Modified time: 2018-09-05 20:56:37
 */
class Miner extends Labourer{
	public constructor() {
		super();
	}
	protected initAvaliableActions() {
		this.toInitAvaliableActions([PickUpToolAction, MineOreAction, DropOffOreAction]);
	}
	/**
	 * Our only goal will ever be to mine ore.
	 * The MineOreAction will be able to fulfill this goal.
	 */
	public createGoalState(): Map<string, Object> {
		let goal = new Map<string, Object>();
		goal.set("collectOre", true);
		return goal;
	}
}
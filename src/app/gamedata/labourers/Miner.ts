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
	/**
	 * Our only goal will ever be to mine ore.
	 * The MineOreAction will be able to fulfill this goal.
	 */
	public createGoalState() {
		return {"collectOre": true}
	}
}
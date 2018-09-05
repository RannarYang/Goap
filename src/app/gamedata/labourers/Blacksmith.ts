/*
 * @Description: 铁匠
 * @Author: Rannar.Yang 
 * @Date: 2018-09-05 20:40:44 
 * @Last Modified by: Rannar.Yang
 * @Last Modified time: 2018-09-05 20:54:55
 */
class Blacksmith extends Labourer{
	public constructor() {
		super();
	}
	/**
	 * Our only goal will ever be to make tools.
	 * The ForgeTooldAction will be able to fulfill this goal.
	 */
	public createGoalState() {
		return {"collectTools": true}
	}
}
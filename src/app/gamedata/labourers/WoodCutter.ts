/*
 * @Description: 伐木工
 * @Author: Rannar.Yang 
 * @Date: 2018-09-05 20:40:44 
 * @Last Modified by: Rannar.Yang
 * @Last Modified time: 2018-09-05 20:59:35
 */
class WoodCutter extends Labourer{
	public constructor() {
		super();
	}
	/**
	 * Our only goal will ever be to chop logs.
	 * The ChopFirewoodAction will be able to fulfill this goal.
	 */
	public createGoalState() {
		return {"collectFirewood": true}
	}
}
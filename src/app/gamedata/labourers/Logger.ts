/*
 * @Description: 樵夫
 * @Author: Rannar.Yang 
 * @Date: 2018-09-05 20:40:44 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-06 00:21:33
 */
class Logger extends Labourer{
	public constructor() {
		super();
	}
	/**
	 * Our only goal will ever be to chop trees.
	 * The ChopTreeAction will be able to fulfill this goal.
	 */
	public createGoalState() {
		return {"collectLogs": true}
	}
}
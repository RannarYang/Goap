/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:09:12 
 * @Last Modified by:   RannarYang 
 * @Last Modified time: 2018-09-06 00:09:12 
 */
class ChopTreeAction extends GoapAction{
	public constructor() {
		super();
		this.addPrecondition("hasTool", true); // we need a tool to do this
		this.addPrecondition("hasLogs", false); // if we have logs we don't want more
		this.addEffect("hasLogs", true);
	}
}
/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:09:09 
 * @Last Modified by:   RannarYang 
 * @Last Modified time: 2018-09-06 00:09:09 
 */
class ChopFirewoodAction extends GoapAction{
	public constructor() {
		super();
		this.addPrecondition("hasTool", true); // we need a tool to do this
		this.addPrecondition("hasFirewood", false); // if we have firewood we don't want more
		this.addEffect("hasFirewood", true);
	}
}
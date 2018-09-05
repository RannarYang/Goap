/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:09:17 
 * @Last Modified by:   RannarYang 
 * @Last Modified time: 2018-09-06 00:09:17 
 */
class DropOffFirewoodAction extends GoapAction {
	public constructor() {
		super();
		this.addPrecondition("hasFirewood", true); // can't drop off firewood if we don't already have some
		this.addEffect("hasFirewood", false); // we now have no firewood
		this.addEffect("collectFirewood", true); // we collected firewood
	}
}
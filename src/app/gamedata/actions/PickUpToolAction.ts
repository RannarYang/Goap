/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:15:38 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-06 00:16:12
 */
class PickUpToolAction extends GoapAction {
	public constructor() {
		super();
		this.addPrecondition ("hasTool", false); // don't get a tool if we already have one
		this.addEffect ("hasTool", true); // we now have a tool
	}
}
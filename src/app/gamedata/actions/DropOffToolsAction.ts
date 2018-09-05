/*
 * @Description: 
 * @Author: RannarYang 
 * @Date: 2018-09-06 00:11:39 
 * @Last Modified by: RannarYang
 * @Last Modified time: 2018-09-06 00:12:07
 */
class DropOffToolsAction extends GoapAction {
	public constructor() {
		super();
		this.addPrecondition ("hasNewTools", true); // can't drop off tools if we don't already have some
		this.addEffect ("hasNewTools", false); // we now have no tools
		this.addEffect ("collectTools", true); // we collected tools
	}
}